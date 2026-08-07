import type { EnterpriseConfig, ReviewResult, AuditReport, Finding } from "./types";
import { ProjectAnalyzer } from "./analyzer/project-analyzer";
import { DependencyGraphBuilder } from "./analyzer/dependency-graph";
import { RulesEngine } from "./reviewer/rules-engine";
import { OcrReviewer } from "./reviewer/ocr-reviewer";
import { AutoFixEngine } from "./verification/auto-fix";
import { Scorer } from "./scorer/scorer";
import { ReportGenerator } from "./reports/generator";
import { GitWorkflow } from "./git/workflow";
import { HermesOptimizer } from "./hermes/optimizer";
import { loadConfig } from "./config";
import { join } from "node:path";

export class EnterpriseOrchestrator {
  private config: EnterpriseConfig;
  private analyzer: ProjectAnalyzer;
  private depGraphBuilder: DependencyGraphBuilder;
  private rulesEngine: RulesEngine;
  private ocrReviewer: OcrReviewer;
  private fixEngine: AutoFixEngine;
  private scorer: Scorer;
  private reportGen: ReportGenerator;
  private git: GitWorkflow;
  private hermes: HermesOptimizer;

  constructor(config?: Partial<EnterpriseConfig>) {
    this.config = config ? { ...loadConfig(), ...config } : loadConfig();

    this.analyzer = new ProjectAnalyzer(this.config.projectPath);
    this.depGraphBuilder = new DependencyGraphBuilder();
    this.rulesEngine = new RulesEngine(this.config.projectPath);
    this.ocrReviewer = new OcrReviewer(this.config.projectPath);
    this.fixEngine = new AutoFixEngine(this.config);
    this.scorer = new Scorer();
    this.reportGen = new ReportGenerator(this.config.projectPath, this.config);
    this.git = new GitWorkflow(this.config.projectPath, this.config.commitAuthor, this.config.enableGitIntegration);
    this.hermes = new HermesOptimizer(this.config.projectPath);
  }

  async run(): Promise<AuditReport> {
    const startedAt = Date.now();
    console.log("[enterprise] Starting full enterprise code review...");

    // Save starting commit hash for rollback
    const startCommit = this.git.isRepo() ? await this.git.getCommitHash() : null;

    // Phase 1: Project Analysis
    console.log("[enterprise] Phase 1: Project Analysis");
    const { project, files, graph } = this.analyzer.analyze();
    const depGraph = this.depGraphBuilder.build(files);
    project.totalFiles = files.length;
    project.totalLines = files.reduce((sum, f) => sum + f.lines, 0);

    console.log(`  - ${project.totalFiles} source files analyzed`);
    console.log(`  - ${files.filter((f) => f.isTestFile).length} test files`);
    console.log(`  - ${depGraph.externalDependencies.length} external dependencies`);

    // Phase 2: Code Review
    console.log("[enterprise] Phase 2: Rules Engine Review");
    const rulesFindings = await this.rulesEngine.run(files);
    console.log(`  - ${rulesFindings.length} findings from rules engine`);

    // Phase 3: OCR Review (if available)
    console.log("[enterprise] Phase 3: Alibaba OCR Review");
    let ocrFindings: Awaited<ReturnType<OcrReviewer["review"]>> = [];
    if (this.config.enableOCR && this.ocrReviewer.isAvailable()) {
      ocrFindings = await this.ocrReviewer.review();
      console.log(`  - ${ocrFindings.length} findings from OCR`);
    } else {
      console.log("  - OCR not available, skipping");
    }

    // Phase 3b: Hermes Optimization Analysis
    console.log("[enterprise] Phase 3b: Hermes Optimization");
    let hermesFindings: Finding[] = [];
    if (this.config.enableHermes) {
      const opts = await this.hermes.analyze(files, this.config);
      hermesFindings = this.hermes.generateFindingsFromOpts(opts);
      console.log(`  - ${opts.length} optimization opportunities, ${hermesFindings.length} findings`);
    }

    const allFindings = [...rulesFindings, ...ocrFindings, ...hermesFindings];

    // Build review result
    const reviewResult: ReviewResult = {
      id: `review-${Date.now()}`,
      createdAt: new Date().toISOString(),
      project,
      findings: allFindings,
      summary: {
        total: allFindings.length,
        bySeverity: {
          critical: allFindings.filter((f) => f.severity === "critical").length,
          high: allFindings.filter((f) => f.severity === "high").length,
          medium: allFindings.filter((f) => f.severity === "medium").length,
          low: allFindings.filter((f) => f.severity === "low").length,
        },
        byCategory: computeByCategory(allFindings),
        filesAffected: new Set(allFindings.map((f) => f.file)).size,
        autoFixable: allFindings.filter((f) => f.safeToAutoFix).length,
      },
      config: this.config,
      durationMs: Date.now() - startedAt,
    };

    reviewResult.architectureGraph = graph;
    reviewResult.dependencyGraph = depGraph;

    // Phase 4: DeepAgents Auto-Fix
    console.log("[enterprise] Phase 4: DeepAgents Auto-Fix Pipeline");
    const fixPlans = await this.fixEngine.processBatch(allFindings, files);
    const autoFixed = fixPlans.filter((p) => p.status === "completed" && p.verification).length;
    const rolledBack = fixPlans.filter((p) => p.status === "rolled-back").length;
    const manual = fixPlans.filter((p) => !p.autoFixable || p.error?.includes("manual")).length;
    console.log(`  - Auto-fixed: ${autoFixed}, Rolled back: ${rolledBack}, Manual: ${manual}`);

    // Phase 5: Scoring
    console.log("[enterprise] Phase 5: Scoring");
    const scores = this.scorer.calculateScores(allFindings, reviewResult);
    const technicalDebt = this.scorer.calculateTechnicalDebt(allFindings, fixPlans);
    const priorityList = this.scorer.calculatePriorityList(allFindings);

    reviewResult.durationMs = Date.now() - startedAt;

    // Phase 6: Git Integration (PR creation)
    let prSummary = "";
    let commitMessage = "";
    if (this.config.enableGitIntegration && startCommit && this.git.isRepo()) {
      prSummary = this.scorer.generatePrSummary(allFindings, scores, technicalDebt, fixPlans);
      commitMessage = `chore: enterprise AI code review — ${autoFixed} fixes applied, ${allFindings.length} findings\n\nHealth: ${scores.health}/100 | Security: ${scores.security}/100`;

      // If we made fixes, optionally create a PR
      if (autoFixed > 0) {
        const status = this.git.execOrEmpty(["status", "--porcelain"]);
        if (status) {
          // Create a summary commit
          this.git.execOrEmpty(["add", "-A"]);
          this.git.execOrEmpty(["commit", "-m", commitMessage, `--author=${this.config.commitAuthor.name} <${this.config.commitAuthor.email}>`]);
        }
      }
    }

    // Phase 7: Reports
    console.log("[enterprise] Phase 7: Report Generation");
    const archive = new AuditReportBuilder({
      healthScore: scores.health,
      securityScore: scores.security,
      performanceScore: scores.performance,
      seoScore: scores.seo,
      maintainabilityScore: scores.maintainability,
      codeQualityScore: scores.codeQuality,
      architectureScore: scores.architecture,
      technicalDebt,
      estimatedFixTime: technicalDebt.estimatedHours,
      priorityList,
      patchFiles: fixPlans.filter((p) => p.patches.length > 0).flatMap((p) => p.patches),
      commitMessage,
      prSummary,
      findings: allFindings,
      reviewResult,
      fixPlans,
    });

    const report = archive.build();
    this.reportGen.generateFullReport(report);

    const duration = Date.now() - startedAt;
    console.log(`[enterprise] Review complete in ${duration}ms`);
    console.log(`  - Health: ${scores.health}/100`);
    console.log(`  - Security: ${scores.security}/100`);
    console.log(`  - Architecture: ${scores.architecture}/100`);
    console.log(`  - Technical Debt: ${technicalDebt.estimatedHours}h`);
    console.log(`  - Reports saved to: ${join(this.config.projectPath, ".enterprise", "reports")}`);

    return report;
  }
}

  function computeByCategory(findings: Finding[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const f of findings) {
    counts[f.category] = (counts[f.category] ?? 0) + 1;
  }
  return counts;
}

class AuditReportBuilder {
  private data: Partial<AuditReport>;

  constructor(data: Partial<AuditReport>) {
    this.data = data;
  }

  build(): AuditReport {
    return {
      healthScore: this.data.healthScore ?? 0,
      securityScore: this.data.securityScore ?? 0,
      performanceScore: this.data.performanceScore ?? 0,
      seoScore: this.data.seoScore ?? 0,
      maintainabilityScore: this.data.maintainabilityScore ?? 0,
      codeQualityScore: this.data.codeQualityScore ?? 0,
      architectureScore: this.data.architectureScore ?? 0,
      technicalDebt: this.data.technicalDebt!,
      estimatedFixTime: this.data.estimatedFixTime ?? 0,
      priorityList: this.data.priorityList ?? [],
      patchFiles: this.data.patchFiles ?? [],
      commitMessage: this.data.commitMessage ?? "",
      prSummary: this.data.prSummary ?? "",
      findings: this.data.findings ?? [],
      reviewResult: this.data.reviewResult!,
      fixPlans: this.data.fixPlans ?? [],
    };
  }
}
