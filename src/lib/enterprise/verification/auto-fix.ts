import type { Finding, FixPlan, EnterpriseConfig, FileAnalysis } from "../types";
import { Patcher, BuildVerifier } from "../verification/build-verifier";
import { DeepAgentsPlanner } from "../deepagents/planner";
import { GitWorkflow } from "../git/workflow";
import { existsSync } from "node:fs";
import { join } from "node:path";

export class AutoFixEngine {
  private config: EnterpriseConfig;
  private patcher: Patcher;
  private verifier: BuildVerifier;
  private planner: DeepAgentsPlanner;
  private git: GitWorkflow;

  constructor(config: EnterpriseConfig) {
    this.config = config;
    this.patcher = new Patcher(config.projectPath);
    const pkgManager = config.packageManager ?? detectPackageManager(config.projectPath);
    this.verifier = new BuildVerifier(config.projectPath, pkgManager, config.runE2E);
    this.planner = new DeepAgentsPlanner(config.projectPath);
    this.git = new GitWorkflow(config.projectPath, config.commitAuthor, config.enableGitIntegration);
  }

  async processFinding(finding: Finding, files: FileAnalysis[]): Promise<FixPlan> {
    const plan = await this.planner.plan(finding, files);
    plan.status = "planning";

    if (plan.autoFixable && finding.patch) {
      plan.status = "patching";

      if (this.config.enableGitIntegration) {
        const branchName = `fix/${finding.ruleId}-${finding.file.replace(/[/.]/g, "-")}-${finding.line}`;
        const branchResult = await this.git.createBranch(branchName);
        if (branchResult.success) plan.gitBranch = branchResult.branch;
      }

      const patchResult = await this.patcher.applyPatch(finding.patch, finding);
      plan.steps.push({
        name: "apply_patch",
        status: patchResult.success ? "completed" : "failed",
        result: patchResult,
        error: patchResult.error,
      });

      if (!patchResult.success) {
        plan.status = "failed";
        plan.error = patchResult.error;
        await this.rollback(plan, finding);
        return plan;
      }

      plan.status = "verifying";
      const verification = await this.verifier.verify();
      plan.verification = verification;

      const allPassed = verification.lint.passed && verification.typecheck.passed && verification.build.passed && verification.test.passed;

      if (!allPassed) {
        plan.status = "rolled-back";
        await this.rollback(plan, finding);
        return plan;
      }

      plan.status = "committed";
      if (this.config.enableGitIntegration && plan.gitBranch) {
        const commitMsg = generateCommitMessage(finding);
        await this.git.commit([finding.file], commitMsg);
      }

      plan.status = "completed";
    } else {
      plan.status = "completed";
      plan.error = "Confidence below threshold or not auto-fixable — manual review required";
    }

    return plan;
  }

  async processBatch(findings: Finding[], files: FileAnalysis[]): Promise<FixPlan[]> {
    const plans: FixPlan[] = [];
    const toFix = findings.filter((f) => f.safeToAutoFix && f.confidence >= this.config.autoFixThreshold && f.patch);
    const toSkip = findings.filter((f) => !(f.safeToAutoFix && f.confidence >= this.config.autoFixThreshold && f.patch));

    for (const finding of toSkip) {
      const plan = await this.planner.plan(finding, files);
      plan.status = "completed";
      plan.error = "Confidence below threshold or not auto-fixable — manual review required";
      plans.push(plan);
    }

    if (toFix.length === 0) {
      return plans;
    }

    if (this.config.enableGitIntegration) {
      const branchResult = await this.git.createBranch("fix/enterprise-auto-fixes");
      for (const finding of toFix) {
        const plan = await this.planner.plan(finding, files);
        plan.gitBranch = branchResult.branch;
        plan.status = "planning";
        plans.push(plan);
      }
    } else {
      for (const finding of toFix) {
        const plan = await this.planner.plan(finding, files);
        plan.status = "planning";
        plans.push(plan);
      }
    }

    const batchResults = this.patcher.applyMultiple(toFix.map((f) => f.patch!));
    let allSuccessful = true;
    for (let i = 0; i < toFix.length; i++) {
      const finding = toFix[i]!;
      const result = batchResults[i]!;
      const plan = plans.find((p) => p.findingId === finding.id);
      if (!plan) continue;

      plan.status = "patching";
      plan.steps.push({
        name: "apply_patch",
        status: result.success ? "completed" : "failed",
        result: result,
        error: result.error,
      });

      if (!result.success) {
        plan.status = "failed";
        allSuccessful = false;
      }
    }

    if (!allSuccessful) {
      for (const finding of toFix) {
        const plan = plans.find((p) => p.findingId === finding.id);
        if (plan && plan.status === "failed") {
          plan.status = "rolled-back";
          await this.patcher.rollbackPatch(finding.patch!);
        }
      }
      return plans;
    }

    const verification = await this.verifier.verify();
    for (const finding of toFix) {
      const plan = plans.find((p) => p.findingId === finding.id);
      if (plan) {
        plan.verification = verification;
        plan.status = "verifying";
        plan.steps.push({
          name: "verify",
          status: "completed",
        });
      }
    }

    const allPassed = verification.lint.passed && verification.typecheck.passed && verification.build.passed && verification.test.passed;

    if (!allPassed && this.config.rollbackOnFailure) {
      for (const finding of toFix) {
        const plan = plans.find((p) => p.findingId === finding.id);
        if (plan) {
          plan.status = "rolled-back";
          await this.patcher.rollbackPatch(finding.patch!);
          plan.steps.push({
            name: "rollback",
            status: "completed",
            result: { reason: "Verification failed" },
          });
        }
      }
      return plans;
    }

    for (const finding of toFix) {
      const plan = plans.find((p) => p.findingId === finding.id);
      if (plan) {
        plan.status = "completed";
        if (this.config.enableGitIntegration && plan.gitBranch) {
          const commitMsg = generateCommitMessage(finding);
          await this.git.commit([finding.file], commitMsg);
        }
      }
    }

    return plans;
  }

  private async rollback(plan: FixPlan, finding: Finding): Promise<void> {
    if (finding.patch) {
      this.patcher.rollbackPatch(finding.patch);
    }
    plan.steps.push({
      name: "rollback",
      status: "completed",
      result: { reason: plan.error ?? "Build verification failed" },
    });
  }
}

function generateCommitMessage(finding: Finding): string {
  const category = finding.category;
  const type = category === "security" ? "security" : category === "performance" ? "perf" : category === "typescript" ? "refactor" : "fix";
  const scope = finding.file.replace("src/", "").replace(/\/[^/]+$/, "");
  const subject = finding.message.slice(0, 60);
  return `${type}(${scope}): ${subject}`;
}

function detectPackageManager(root: string): "npm" | "yarn" | "pnpm" {
  if (existsSync(join(root, "pnpm-lock.yaml"))) return "pnpm";
  if (existsSync(join(root, "yarn.lock"))) return "yarn";
  return "npm";
}
