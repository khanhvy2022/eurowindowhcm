import { describe, it, expect } from "vitest";
import { Scorer } from "../../src/lib/enterprise/scorer/scorer";
import { createFinding } from "../../src/lib/enterprise/reviewer/findings";
import { ProjectAnalyzer } from "../../src/lib/enterprise/analyzer/project-analyzer";
import { DependencyGraphBuilder } from "../../src/lib/enterprise/analyzer/dependency-graph";
import type { Finding } from "../../src/lib/enterprise/types";

describe("enterprise — findings & scorer", () => {
  it("createFinding sets safeToAutoFix based on confidence", () => {
    const f = createFinding("TEST", "bug", "high", 0.98, "test.ts", 1, "test");
    expect(f.safeToAutoFix).toBe(true);
    expect(f.confidence).toBe(0.98);
  });

  it("createFinding marks low confidence as not safe to autofix", () => {
    const f = createFinding("TEST", "bug", "high", 0.5, "test.ts", 1, "test");
    expect(f.safeToAutoFix).toBe(false);
  });

  it("scorer penalizes critical findings more than low", () => {
    const criticalF = createFinding("A", "security", "critical", 0.9, "a.ts", 1, "x");
    const lowF = createFinding("B", "typescript", "low", 0.5, "b.ts", 1, "x");
    const scorer = new Scorer();
    const result = scorer.calculateScores([criticalF, lowF], {
      summary: { total: 2, bySeverity: { critical: 1, high: 0, medium: 0, low: 1 }, byCategory: {}, filesAffected: 2, autoFixable: 1 },
    } as any);
    expect(result.security).toBeLessThan(100);
    expect(result.codeQuality).toBeLessThan(100);
  });

  it("calculatePriorityList sorts by severity then confidence", () => {
    const scorer = new Scorer();
    const findings: Finding[] = [
      createFinding("R1", "typescript", "low", 0.9, "a.ts", 1, "low issue"),
      createFinding("R2", "security", "critical", 0.5, "b.ts", 2, "critical issue"),
      createFinding("R3", "performance", "medium", 0.7, "c.ts", 3, "medium issue"),
    ];
    const priority = scorer.calculatePriorityList(findings);
    expect(priority[0].severity).toBe("critical");
    expect(priority[1].severity).toBe("medium");
    expect(priority[2].severity).toBe("low");
  });
});

describe("enterprise — project analyzer", () => {
  it("analyzes project structure", () => {
    const analyzer = new ProjectAnalyzer(process.cwd());
    const { project, files } = analyzer.analyze();
    expect(project.name).toBe("eurowindowhcm");
    expect(project.framework).toBe("nextjs");
    expect(files.length).toBeGreaterThan(0);
    expect(files.some((f) => f.isTestFile)).toBe(true);
  });

  it("detects client/server components", () => {
    const analyzer = new ProjectAnalyzer(process.cwd());
    const { files } = analyzer.analyze();
    const clientComponents = files.filter((f) => f.isClientComponent);
    expect(clientComponents.length).toBeGreaterThan(0);
  });
});

describe("enterprise — dependency graph", () => {
  it("builds graph and finds external deps", () => {
    const analyzer = new ProjectAnalyzer(process.cwd());
    const { files } = analyzer.analyze();
    const graph = new DependencyGraphBuilder().build(files);
    expect(graph.nodes.length).toBeGreaterThan(0);
    expect(graph.edges.length).toBeGreaterThan(0);
    expect(graph.externalDependencies.length).toBeGreaterThan(0);
    expect(graph.externalDependencies).toContain("next");
    expect(graph.externalDependencies).toContain("react");
  });
});
