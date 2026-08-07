import type { Finding, FileAnalysis, FixPlan, PipelineStep } from "../types";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export class DeepAgentsPlanner {
  private projectRoot: string;
  private steps: PipelineStep[] = [];

  constructor(projectRoot: string) {
    this.projectRoot = projectRoot;
  }

  async plan(finding: Finding, files: FileAnalysis[]): Promise<FixPlan> {
    this.steps = [];
    const plan: FixPlan = {
      findingId: finding.id,
      steps: [],
      patches: finding.patch ? [finding.patch] : [],
      confidence: finding.confidence,
      autoFixable: finding.safeToAutoFix && finding.confidence >= 0.9,
      status: "pending",
    };

    // Step 1: Analyze
    const analyzeStep = await this.step("analyze", async () => {
      const content = readFileSync(join(this.projectRoot, finding.file), "utf-8");
      const lines = content.split("\n");
      const targetLine = lines[finding.line - 1] ?? "";
      return {
        file: finding.file,
        line: finding.line,
        targetLine,
        surrounding: lines.slice(Math.max(0, finding.line - 3), finding.line + 3),
        fullPath: join(this.projectRoot, finding.file),
      };
    });
    plan.steps.push(analyzeStep);

    // Step 2: Reason
    const reasonStep = await this.step("reason", async () => {
      return {
        severity: finding.severity,
        category: finding.category,
        confidence: finding.confidence,
        rootCause: finding.detail ?? "N/A",
        suggestion: finding.suggestion ?? "N/A",
        ruleId: finding.ruleId,
      };
    });
    plan.steps.push(reasonStep);

    // Step 3: Search (find related files)
    const searchStep = await this.step("search", async () => {
      const related = files.filter((f) => {
        const dist = this.pathDistance(f.relativePath, finding.file);
        return dist <= 2 || f.imports.some((imp) => finding.file.endsWith(imp.source));
      });
      return { relatedFiles: related.map((f) => f.relativePath), count: related.length };
    });
    plan.steps.push(searchStep);

    // Step 4: Debug (determine fix strategy)
    const debugStep = await this.step("debug", async () => {
      const strategy = await this.determineFixStrategy(finding);
      return strategy;
    });
    plan.steps.push(debugStep);

    // Step 5: Patch (if applicable)
    if (finding.patch && plan.autoFixable) {
      const patchStep = await this.step("patch", async () => {
        return { patch: finding.patch, action: "apply", strategy: debugStep.result };
      });
      plan.steps.push(patchStep);
    }

    // Step 6: Run Test (will be executed by pipeline runner)
    const testStep: PipelineStep = {
      name: "run_test",
      status: "pending",
      result: { description: "Will run lint, typecheck, build, and tests after patch", strategy: debugStep.result },
    };
    plan.steps.push(testStep);

    // Step 7: Verify (will be executed by pipeline runner)
    const verifyStep: PipelineStep = {
      name: "verify",
      status: "pending",
      result: { description: "Verify all checks pass after fix", strategy: debugStep.result },
    };
    plan.steps.push(verifyStep);

    // Step 8: Commit (will be executed by pipeline runner)
    const commitStep: PipelineStep = {
      name: "commit",
      status: "pending",
      result: { description: "Create branch and commit with conventional messages", branch: `fix/${finding.ruleId}-${finding.file.replace(/[/.]/g, "-")}-${finding.line}` },
    };
    plan.steps.push(commitStep);

    // Step 9: Report
    const reportStep = await this.step("report", async () => {
      return {
        summary: `Fix for ${finding.ruleId}: ${finding.message}`,
        estimatedMinutes: this.estimateFixTime(finding),
        rollbackCondition: "lint, typecheck, build, or test failures",
      };
    });
    plan.steps.push(reportStep);

    return plan;
  }

  private async step(name: string, fn: () => Promise<unknown>): Promise<PipelineStep> {
    const start = Date.now();
    this.steps.push({ name, status: "running" });

    try {
      const result = await fn();
      const step = this.steps[this.steps.length - 1];
      step.status = "completed";
      step.durationMs = Date.now() - start;
      step.result = result;
      return step;
    } catch (err) {
      const step = this.steps[this.steps.length - 1];
      step.status = "failed";
      step.durationMs = Date.now() - start;
      step.error = err instanceof Error ? err.message : String(err);
      throw err;
    }
  }

  private async determineFixStrategy(finding: Finding): Promise<Record<string, unknown>> {
    const strategy: Record<string, unknown> = { type: "manual", confidence: finding.confidence };

    if (finding.suggestion && finding.patch) {
      strategy.type = "auto-patch";
      strategy.description = finding.suggestion;
      strategy.patch = finding.patch;
    }

    if (finding.category === "security") {
      strategy.priority = "immediate";
      strategy.reviewRequired = finding.confidence < 0.95;
    }

    if (finding.category === "typescript") {
      strategy.type = "type-fix";
      strategy.description = "Replace type with proper TypeScript types";
    }

    if (finding.category === "unused-import") {
      strategy.type = "auto-patch";
      strategy.atomic = true;
    }

    return strategy;
  }

  private pathDistance(a: string, b: string): number {
    const aParts = a.split("/");
    const bParts = b.split("/");
    let dist = 0;
    const minLen = Math.min(aParts.length, bParts.length);
    for (let i = 0; i < minLen; i++) {
      if (aParts[i] !== bParts[i]) dist++;
    }
    dist += Math.abs(aParts.length - bParts.length);
    return dist;
  }

  private estimateFixTime(finding: Finding): number {
    const baseTime: Record<string, number> = {
      "unused-import": 2,
      "dead-code": 8,
      "security": 25,
      "xss": 30,
      "typescript": 5,
      "performance": 20,
      "react-anti-pattern": 15,
      "next-anti-pattern": 15,
      "bug": 20,
      "async-bug": 12,
      "promise-bug": 15,
    };
    return baseTime[finding.category] ?? 15;
  }
}
