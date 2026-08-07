import type { Finding, FixPlan, ReviewResult, ScoreResult, TechnicalDebt, PriorityItem } from "../types";
import { Severity, Category } from "../types";

export class Scorer {
  calculateScores(findings: Finding[], reviewResult: ReviewResult): ScoreResult {
    const total = reviewResult.summary.total;

    const sevPenalty: Record<Severity, number> = {
      critical: 30,
      high: 15,
      medium: 5,
      low: 2,
    };

    let healthPenalty = 0;
    let securityPenalty = 0;
    let codeQualityPenalty = 0;
    let performancePenalty = 0;

    for (const f of findings) {
      const penalty = sevPenalty[f.severity];
      healthPenalty += penalty;

      const secCategories: Category[] = ["security", "xss", "csrf", "sql-injection"];
      if (secCategories.includes(f.category)) {
        securityPenalty += penalty;
      }

      const cqCategories: Category[] = ["bug", "dead-code", "unused-import", "typescript", "async-bug", "promise-bug", "race-condition"];
      if (cqCategories.includes(f.category)) {
        codeQualityPenalty += penalty;
      }

      const perfCategories: Category[] = ["performance", "memory-leak"];
      if (perfCategories.includes(f.category)) {
        performancePenalty += penalty;
      }
    }

    return {
      overall: clamp(100 - Math.round((healthPenalty + securityPenalty + codeQualityPenalty + performancePenalty) / Math.max(total, 1) / 4)),
      health: clamp(100 - Math.round(healthPenalty / Math.max(total, 1))),
      security: clamp(100 - Math.round(securityPenalty / Math.max(total, 1))),
      performance: clamp(100 - Math.round(performancePenalty / Math.max(total, 1))),
      seo: calculateSEOScore(findings),
      maintainability: clamp(100 - Math.round((codeQualityPenalty + healthPenalty * 0.5) / Math.max(total, 1))),
      codeQuality: clamp(100 - Math.round(codeQualityPenalty / Math.max(total, 1))),
      architecture: calculateArchitectureScore(findings),
    };
  }

  calculateTechnicalDebt(findings: Finding[], _fixPlans: FixPlan[]): TechnicalDebt {
    const hotspots: Record<string, number> = {};
    let totalMinutes = 0;

    for (const f of findings) {
      const mins = estimateFixTime(f);
      totalMinutes += mins;
      const file = f.file;
      hotspots[file] = (hotspots[file] ?? 0) + mins;
    }

    const sortedHotspots = Object.entries(hotspots).sort(([, a], [, b]) => b - a);
    const hotspotsList = sortedHotspots.slice(0, 10).map(([path]) => path);

    const totalHours = totalMinutes / 60;
    const complexity: "low" | "medium" | "high" = totalHours < 5 ? "low" : totalHours < 20 ? "medium" : "high";

    return { estimatedHours: Math.round(totalHours * 10) / 10, complexity, hotspots: hotspotsList };
  }

  calculatePriorityList(findings: Finding[]): PriorityItem[] {
    return findings
      .sort((a, b) => {
        const sevOrder: Record<Severity, number> = { critical: 4, high: 3, medium: 2, low: 1 };
        const sevDiff = sevOrder[b.severity] - sevOrder[a.severity];
        if (sevDiff !== 0) return sevDiff;
        return b.confidence - a.confidence;
      })
      .slice(0, 30)
      .map((f) => ({
        id: f.id,
        title: f.message,
        severity: f.severity,
        category: f.category,
        file: f.file,
        line: f.line,
        confidence: f.confidence,
        estimatedMinutes: estimateFixTime(f),
        recommendation: f.suggestion ?? "Review and fix",
      }));
  }

  generatePrSummary(findings: Finding[], scores: ScoreResult, debt: TechnicalDebt, plans: FixPlan[]): string {
    const critical = findings.filter((f) => f.severity === "critical").length;
    const high = findings.filter((f) => f.severity === "high").length;
    const autoFixed = plans.filter((p) => p.status === "completed" && p.autoFixable).length;

    return [
      `# Enterprise AI Code Review — Pull Request`,
      ``,
      `## Summary`,
      `- **Total findings**: ${findings.length}`,
      `- **Critical**: ${critical} | **High**: ${high}`,
      `- **Auto-fixed**: ${autoFixed} findings`,
      `- **Health Score**: ${scores.health}/100`,
      `- **Security Score**: ${scores.security}/100`,
      `- **Technical Debt**: ${debt.estimatedHours}h (${debt.complexity})`,
      ``,
      `## Key Findings`,
      ...findings
        .filter((f) => f.severity === "critical" || f.severity === "high")
        .slice(0, 5)
        .map((f) => `- **${f.severity.toUpperCase()}**: \`${f.file}:${f.line}\` — ${f.message} (confidence: ${(f.confidence * 100).toFixed(0)}%)`),
      ``,
      `## Fixes Applied`,
      ...plans
        .filter((p) => p.autoFixable && (p.status === "completed" || p.status === "rolled-back"))
        .map((p) => `- ${p.patches[0]?.description ?? p.findingId}: ${p.status === "completed" ? "✅ Applied" : "↩️ Rolled back"}`),
      ``,
      `## Next Steps`,
      `1. Review remaining findings marked as "manual review required"`,
      `2. Address security issues immediately`,
      `3. Consider scheduling follow-up review in 2 weeks`,
    ].join("\n");
  }
}

function calculateSEOScore(findings: Finding[]): number {
  const seoFindings = findings.filter((f) => f.category === "seo" || f.tags?.includes("seo")).length;
  const score = Math.max(0, 100 - seoFindings * 5);
  return score;
}

function calculateArchitectureScore(findings: Finding[]): number {
  const archIssues = findings.filter(
    (f) => f.category === "react-anti-pattern" || f.category === "next-anti-pattern" || (f.tags?.includes("architecture") ?? false),
  ).length;
  const score = Math.max(0, 100 - archIssues * 2);
  return score;
}

function clamp(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}

function estimateFixTime(f: Finding): number {
  const base: Record<Category, number> = {
    "bug": 20,
    "dead-code": 8,
    "duplicate-code": 10,
    "unused-import": 2,
    "memory-leak": 30,
    "async-bug": 15,
    "promise-bug": 15,
    "race-condition": 40,
    "security": 25,
    "xss": 30,
    "csrf": 35,
    "sql-injection": 40,
    "ssr-bug": 25,
    "hydration-mismatch": 20,
    "accessibility": 12,
    "performance": 20,
    "react-anti-pattern": 15,
    "next-anti-pattern": 15,
    "typescript": 5,
    "seo": 10,
  };
  return base[f.category] ?? 15;
}
