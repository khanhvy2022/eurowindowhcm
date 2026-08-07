import type { FileAnalysis, Finding, Patch, EnterpriseConfig } from "../types";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export type HermesOptimization = {
  type: "remove-unused-imports" | "reduce-bundle" | "lazy-load" | "memoize" | "simplify-logic" | "optimize-hooks" | "optimize-metadata";
  file: string;
  description: string;
  patch?: Patch;
  impact: "high" | "medium" | "low";
  effort: "low" | "medium" | "high";
  confidence: number;
};

export class HermesOptimizer {
  private projectRoot: string;

  constructor(projectRoot: string) {
    this.projectRoot = projectRoot;
  }

  async analyze(files: FileAnalysis[], _config: EnterpriseConfig): Promise<HermesOptimization[]> {
    const optimizations: HermesOptimization[] = [];

    for (const file of files) {
      if (file.isTestFile || file.relativePath.includes("enterprise")) continue;

      const fullPath = join(this.projectRoot, file.relativePath);
      let content: string;
      try {
        content = readFileSync(fullPath, "utf-8");
      } catch {
        continue;
      }

      const opts = await this.analyzeFile(file, content, _config);
      optimizations.push(...opts);
    }

    return optimizations.sort((a, b) => b.impact.localeCompare(a.impact) || b.confidence - a.confidence);
  }

  private async analyzeFile(file: FileAnalysis, content: string, _config: EnterpriseConfig): Promise<HermesOptimization[]> {
    const opts: HermesOptimization[] = [];

    // 1. Bundle size: detect heavy imports in client components
    if (file.isClientComponent && file.extension === ".tsx") {
      const heavyImports = this.detectHeavyImports(content);
      for (const imp of heavyImports) {
        opts.push({
          type: "reduce-bundle",
          file: file.relativePath,
          description: `Client component imports heavy library '${imp}' — consider dynamic import`,
          patch: {
            file: file.relativePath,
            old: imp.importLine,
            new: `const ${imp.defaultImport} = dynamic(() => import("${imp.source}"), { ssr: false });`,
            description: `Lazy load ${imp.source} in client component`,
          },
          impact: "high",
          effort: "medium",
          confidence: 0.85,
        });
      }
    }

    // 2. React Hooks optimization: detect expensive operations in render
    if (file.extension === ".tsx" && !file.isTestFile) {
      const expensiveOps = this.detectExpensiveInRender(content);
      for (const op of expensiveOps) {
        opts.push({
          type: "memoize",
          file: file.relativePath,
          description: `Potentially expensive operation '${op}' in render — consider useMemo/useCallback`,
          patch: undefined,
          impact: "medium",
          effort: "medium",
          confidence: 0.7,
        });
      }
    }

    // 3. Metadata optimization for Next.js pages
    if (file.relativePath.includes("/app/") && (file.relativePath.endsWith("page.tsx") || file.relativePath.endsWith("layout.tsx"))) {
      if (!content.includes("export const metadata") && !content.includes("export const generateMetadata")) {
        opts.push({
          type: "optimize-metadata",
          file: file.relativePath,
          description: "Page missing metadata export — add SEO metadata",
          patch: {
            file: file.relativePath,
            old: content.split("\n")[0],
            new: `export const metadata = { title: "...", description: "..." };\n${content.split("\n")[0]}`,
            description: "Add metadata export for SEO",
          },
          impact: "medium",
          effort: "low",
          confidence: 0.9,
        });
      }
    }

    // 4. Logic simplification: detect deeply nested ternaries
    const nestedTernaries = this.detectNestedTernaries(content);
    if (nestedTernaries > 2) {
      opts.push({
        type: "simplify-logic",
        file: file.relativePath,
        description: `${nestedTernaries} nested ternaries — consider extracting to helper function`,
        patch: undefined,
        impact: "low",
        effort: "medium",
        confidence: 0.6,
      });
    }

    // 5. Server vs Client component boundary optimization
    if (file.isClientComponent && file.relativePath.includes("/app/") && !file.relativePath.includes("/api/")) {
      const hasState = /useState|useReducer|useEffect/.test(content);
      if (!hasState) {
        opts.push({
          type: "optimize-hooks",
          file: file.relativePath,
          description: "Client component has no hooks — consider converting to Server Component",
          patch: {
            file: file.relativePath,
            old: content.startsWith('"use client"') ? '"use client"\n' : '',
            new: "",
            description: "Remove 'use client' directive, convert to Server Component",
          },
          impact: "medium",
          effort: "low",
          confidence: 0.75,
        });
      }
    }

    return opts;
  }

  private detectHeavyImports(content: string): { source: string; importLine: string; defaultImport: string }[] {
    const heavyPackages = ["framer-motion", "swiper", "lodash", "moment", "date-fns", "@tensorflow", "three"];
    const results: { source: string; importLine: string; defaultImport: string }[] = [];

    for (const pkg of heavyPackages) {
      if (content.includes(pkg)) {
        const line = content.split("\n").find((l) => l.includes(pkg)) ?? "";
        const defaultMatch = line.match(/import\s+(\w+)/);
        results.push({
          source: pkg,
          importLine: line.trim(),
          defaultImport: defaultMatch ? defaultMatch[1] : "",
        });
      }
    }
    return results;
  }

  private detectExpensiveInRender(content: string): string[] {
    const patterns = [/\.sort\s*\(/g, /new (Map|Set|ArrayBuffer|BigInt)/g];
    const ops: string[] = [];
    for (const p of patterns) {
      const matches = content.match(p);
      if (matches && matches.length > 0) {
        ops.push(...matches);
      }
    }
    return [...new Set(ops)];
  }

  private detectNestedTernaries(content: string): number {
    const ternaries = content.match(/\?.*:\s*/g);
    if (!ternaries) return 0;
    let maxDepth = 0;
    for (const t of ternaries) {
      let depth = 0;
      for (const ch of t) {
        if (ch === "?") depth++;
        else if (ch === ":") depth--;
        maxDepth = Math.max(maxDepth, depth);
      }
    }
    return maxDepth;
  }

  applyOptimizations(opts: HermesOptimization[]): Patch[] {
    const patches: Patch[] = [];
    for (const opt of opts) {
      if (opt.patch && opt.confidence >= 0.9) {
        try {
          const fullPath = join(this.projectRoot, opt.patch.file);
          const content = readFileSync(fullPath, "utf-8");
          if (content.includes(opt.patch.old)) {
            const patched = content.replace(opt.patch.old, opt.patch.new);
            writeFileSync(fullPath, patched, "utf-8");
            patches.push(opt.patch);
          }
        } catch (err) {
          console.warn(`[hermes] Failed to apply optimization ${opt.type} on ${opt.file}:`, err);
        }
      }
    }
    return patches;
  }

  generateFindingsFromOpts(opts: HermesOptimization[]): Finding[] {
    return opts.map((opt) => ({
      id: `hermes-${opt.type}-${opt.file}-${Date.now()}`,
      ruleId: `hermes-${opt.type}`,
      category: this.mapToCategory(opt.type),
      severity: opt.impact === "high" ? "high" : opt.impact === "medium" ? "medium" : "low",
      confidence: opt.confidence,
      file: opt.file,
      line: 1,
      message: opt.description,
      suggestion: opt.patch?.description ?? opt.description,
      patch: opt.patch,
      safeToAutoFix: opt.confidence >= 0.95 && !!opt.patch,
      tags: ["hermes", opt.type],
    }));
  }

  private mapToCategory(type: string) {
    const map: Record<string, import("../types").Category> = {
      "reduce-bundle": "performance",
      "lazy-load": "performance",
      "memoize": "performance",
      "optimize-hooks": "react-anti-pattern",
      "optimize-metadata": "seo",
      "simplify-logic": "performance",
      "remove-unused-imports": "unused-import",
    };
    return map[type] ?? "performance";
  }
}
