import type { Finding, FileAnalysis, Severity, Category } from "../types";
import { createFinding } from "./findings";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export interface Rule {
  id: string;
  name: string;
  category: Category;
  severity: Severity;
  description: string;
  check(file: FileAnalysis, content: string, projectRoot: string): Promise<Finding[]>;
}

export class RulesEngine {
  private rules: Rule[] = [];
  private projectRoot: string;

  constructor(projectRoot: string) {
    this.projectRoot = projectRoot;
    this.registerDefaultRules();
  }

  registerRule(rule: Rule) { this.rules.push(rule); }

  private registerDefaultRules() {
    this.rules.push(
      new RuleUnusedImports(),
      new RuleEmptyCatch(),
      new RuleAnyType(),
      new RuleConsoleInProduction(),
      new RuleHardcodedSecrets(),
      new RuleInsecureAuth(),
      new RuleUnsafePromise(),
      new RuleAsyncWithoutAwait(),
      new RuleDangerouslySetInnerHtml(),
      new RuleMissingImageAlt(),
      new RuleNoServerActionValidation(),
      new RuleMissingErrorBoundary(),
      new RuleHardcodedPassword(),
      new RuleNoCacheRevalidation(),
      new RuleDangerousRedirect(),
    );
  }

  async run(files: FileAnalysis[]): Promise<Finding[]> {
    const findings: Finding[] = [];
    for (const file of files) {
      const fullPath = join(this.projectRoot, file.relativePath);
      let content: string;
      try { content = readFileSync(fullPath, "utf-8"); } catch { continue; }
      for (const rule of this.rules) {
        try {
          const rf = await rule.check(file, content, this.projectRoot);
          findings.push(...rf);
        } catch { /* rule failed, continue */ }
      }
    }
    return findings;
  }

  getRules(): Rule[] { return [...this.rules]; }
}

function lineOf(content: string, idx: number): number {
  return content.slice(0, idx).split("\n").length;
}

function extractBlock(content: string, braceIdx: number): string | null {
  let depth = 1;
  let i = braceIdx + 1;
  while (i < content.length && depth > 0) {
    if (content[i] === "{") depth++;
    else if (content[i] === "}") depth--;
    i++;
  }
  return depth === 0 ? content.slice(braceIdx + 1, i - 1) : null;
}

class RuleUnusedImports implements Rule {
  id = "UNUSED_IMPORTS"; name = "Unused Imports";   category: Category = "unused-import"; severity: Severity = "medium";
  description = "Imports declared but never used";
  async check(file: FileAnalysis, content: string): Promise<Finding[]> {
    if (![".ts",".tsx"].includes(file.extension)) return [];
    const findings: Finding[] = [];
    const importRegex = /import\s+(?:type\s+)?(?:(?![{,};])([^]*?)\s+from\s+)?["']([^"']+)["']/g;
    for (const m of content.matchAll(importRegex)) {
      const source = m[2];
      const line = lineOf(content, m.index!);
      const specPart = m[0].split("from")[0];
      const specifiers: string[] = [];
      const defaultMatch = specPart.match(/import\s+(?:type\s+)?(\w+)/);
      if (defaultMatch) specifiers.push(defaultMatch[1]);
      const namedMatch = specPart.match(/\{([^}]+)\}/);
      if (namedMatch) {
        for (const s of namedMatch[1].split(",")) {
          const name = s.trim().replace(/^type\s+/, "");
          if (name) specifiers.push(name);
        }
      }
      for (const spec of specifiers) {
        if (spec === "*" || spec === "type") continue;
        const usageCount = (content.match(new RegExp(`\\b${spec}\\b`, "g"))?.length ?? 0);
        if (usageCount <= 1) {
          const old = content.split("\n")[line - 1];
          findings.push(createFinding(
            this.id, this.category, this.severity, 0.98, file.relativePath, line,
            `Unused import: '${spec}'`, `Import '${spec}' from '${source}' is never used`,
            "Remove the unused import", { file: file.relativePath, old, new: "", description: `Remove unused import ${spec}` },
            true, ["cleanup"],
          ));
        }
      }
    }
    return findings;
  }
}

class RuleEmptyCatch implements Rule {
  id = "EMPTY_CATCH"; name = "Empty Catch Block";   category: Category = "async-bug"; severity: Severity = "medium";
  description = "Catch blocks that silently swallow errors";
  async check(file: FileAnalysis, content: string): Promise<Finding[]> {
    if (![".ts",".tsx",".js",".jsx"].includes(file.extension)) return [];
    const findings: Finding[] = [];
    const catchRegex = /catch\s*\(([^)]*)\)\s*\{/g;
    for (const m of content.matchAll(catchRegex)) {
      const line = lineOf(content, m.index!);
      const after = content.slice(m.index! + m[0].length);
      const closeIdx = after.indexOf("}");
      const inside = after.slice(0, closeIdx).trim();
      if (inside === "" || inside === ";" || inside === "// pass") {
        findings.push(createFinding(
          this.id, this.category, this.severity, 0.95, file.relativePath, line,
          "Empty catch block silently swallows errors", "Error is not handled or logged",
          "Log the error or handle it appropriately", undefined, true, ["error-handling"],
        ));
      }
    }
    return findings;
  }
}

class RuleAnyType implements Rule {
  id = "ANY_TYPE"; name = "Use of any Type";   category: Category = "typescript"; severity: Severity = "low";
  description = "Usage of 'any' defeats TypeScript's type safety";
  async check(file: FileAnalysis, content: string): Promise<Finding[]> {
    if (![".ts",".tsx"].includes(file.extension)) return [];
    const findings: Finding[] = [];
    const anyRegex = /:\s*any\b(?!\?\s*[=;,\)])/g;
    for (const m of content.matchAll(anyRegex)) {
      const line = lineOf(content, m.index!);
      findings.push(createFinding(
        this.id, this.category, this.severity, 0.9, file.relativePath, line,
        "Use of 'any' type reduces type safety", "Consider using 'unknown' or a specific type",
        "Replace 'any' with a proper type", undefined, false, ["typescript"],
      ));
    }
    return findings;
  }
}

class RuleConsoleInProduction implements Rule {
  id = "CONSOLE_LOG"; name = "Console Log";   category: Category = "performance"; severity: Severity = "low";
  description = "console.log calls should be removed or guarded";
  async check(file: FileAnalysis, content: string): Promise<Finding[]> {
    if (![".ts",".tsx"].includes(file.extension)) return [];
    if (file.isTestFile || file.relativePath.includes("enterprise")) return [];
    const findings: Finding[] = [];
    const consoleRegex = /console\.(log|info|warn|error|debug)\s*\(/g;
    for (const m of content.matchAll(consoleRegex)) {
      const line = lineOf(content, m.index!);
      const lineContent = content.split("\n")[line - 1];
      if (lineContent?.trim().startsWith("//")) continue;
      findings.push(createFinding(
        this.id, this.category, this.severity, 0.8, file.relativePath, line,
        `console.${m[1]}() found`, "Console output in production code",
        "Replace with structured logging or remove", undefined, false, ["perf"],
      ));
    }
    return findings;
  }
}

class RuleHardcodedSecrets implements Rule {
  id = "HARDCODED_SECRETS"; name = "Hardcoded Secrets";   category: Category = "security"; severity: Severity = "critical";
  description = "Hardcoded secrets, passwords, and API keys";
  async check(file: FileAnalysis, content: string): Promise<Finding[]> {
    if (![".ts",".tsx"].includes(file.extension)) return [];
    if (file.relativePath.includes("enterprise")) return [];
    const findings: Finding[] = [];
    const patterns = [
      /password\s*[:=]\s*["']([^"']{4,})["']/gi,
      /secret\s*[:=]\s*["']([^"']{8,})["']/gi,
      /api[_-]?key\s*[:=]\s*["']([^"']{8,})["']/gi,
      /token\s*[:=]\s*["']([^"']{10,})["']/gi,
    ];
    for (const pattern of patterns) {
      for (const m of content.matchAll(pattern)) {
        const line = lineOf(content, m.index!);
        const varName = m[0].split(/[:=]/)[0].trim();
        findings.push(createFinding(
          this.id, this.category, "critical", 0.9, file.relativePath, line,
          `Potential hardcoded secret: '${varName}'`, `Value '${m[1]}' may be exposed`,
          "Move to environment variables", undefined, false, ["security", "secrets"],
        ));
      }
    }
    return findings;
  }
}

class RuleInsecureAuth implements Rule {
  id = "INSECURE_AUTH"; name = "Insecure Authentication";   category: Category = "security"; severity: Severity = "high";
  description = "Weak authentication patterns";
  async check(file: FileAnalysis, content: string): Promise<Finding[]> {
    if (!file.relativePath.includes("auth") && !file.relativePath.includes("login")) return [];
    const findings: Finding[] = [];
    if (/password\s*===\s*["']([^"']+)["']/g.test(content)) {
      const line = lineOf(content, content.indexOf("password"));
      findings.push(createFinding(
        this.id, this.category, "high", 0.85, file.relativePath, line,
        "Plain text password comparison without hashing", "Passwords should be compared with hashing",
        "Use bcrypt.compare() for password verification", undefined, false, ["security", "auth"],
      ));
    }
    return findings;
  }
}

class RuleUnsafePromise implements Rule {
  id = "UNSAFE_PROMISE"; name = "Unsafe Promise";   category: Category = "promise-bug"; severity: Severity = "high";
  description = ".then() without .catch()";
  async check(file: FileAnalysis, content: string): Promise<Finding[]> {
    if (![".ts",".tsx"].includes(file.extension)) return [];
    const findings: Finding[] = [];
    const lines = content.split("\n");
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes(".then(") && !lines[i].includes(".catch(")) {
        const next = lines[i + 1]?.trim() ?? "";
        if (!next.startsWith(".catch") && !next.startsWith(".then")) {
          findings.push(createFinding(
            this.id, this.category, "high", 0.8, file.relativePath, i + 1,
            "Promise .then() without .catch()", "Can lead to unhandled rejections",
            "Add .catch() or use async/await with try-catch", undefined, false, ["promise"],
          ));
        }
      }
    }
    return findings;
  }
}

class RuleAsyncWithoutAwait implements Rule {
  id = "ASYNC_NO_AWAIT"; name = "Async Without Await";   category: Category = "async-bug"; severity: Severity = "low";
  description = "async functions without await";
  async check(file: FileAnalysis, content: string): Promise<Finding[]> {
    if (![".ts",".tsx"].includes(file.extension)) return [];
    const findings: Finding[] = [];
    const asyncRegex = /async\s+(?:function\s+)?(\w+)?\s*\([^)]*\)\s*\{/g;
    for (const m of content.matchAll(asyncRegex)) {
      const funcName = m[1] ?? "anonymous";
      const line = lineOf(content, m.index!);
      const braceIdx = content.indexOf("{", m.index! + m[0].length - 1);
      const body = extractBlock(content, braceIdx);
      if (body && !/\bawait\b/.test(body)) {
        findings.push(createFinding(
          this.id, this.category, "low", 0.75, file.relativePath, line,
          `async function '${funcName}' has no await`, "No await used",
          "Remove 'async' keyword if not needed", undefined, false, ["async"],
        ));
      }
    }
    return findings;
  }
}

class RuleDangerouslySetInnerHtml implements Rule {
  id = "DANGER_HTML"; name = "XSS Risk";   category: Category = "xss"; severity: Severity = "critical";
  description = "dangerouslySetInnerHTML can cause XSS";
  async check(file: FileAnalysis, content: string): Promise<Finding[]> {
    if (file.extension !== ".tsx") return [];
    const findings: Finding[] = [];
    const regex = /dangerouslySetInnerHTML\s*=\s*\{/g;
    for (const m of content.matchAll(regex)) {
      const line = lineOf(content, m.index!);
      findings.push(createFinding(
        this.id, this.category, "critical", 0.9, file.relativePath, line,
        "dangerouslySetInnerHTML may cause XSS", "HTML should be sanitized",
        "Use DOMPurify.sanitize() before setting innerHTML", undefined, false, ["xss"],
      ));
    }
    return findings;
  }
}

class RuleMissingImageAlt implements Rule {
  id = "IMG_ALT"; name = "Missing Image Alt";   category: Category = "accessibility"; severity: Severity = "high";
  description = "Images without alt text";
  async check(file: FileAnalysis, content: string): Promise<Finding[]> {
    if (file.extension !== ".tsx") return [];
    const findings: Finding[] = [];
    const regex = /<img[^>]*>/gi;
    for (const m of content.matchAll(regex)) {
      const line = lineOf(content, m.index!);
      if (!/\salt\s*=/.test(m[0])) {
        findings.push(createFinding(
          this.id, this.category, "high", 0.95, file.relativePath, line,
          "Image missing alt attribute", "Alt text needed for accessibility",
          "Add alt=\"description\" attribute", undefined, true, ["a11y"],
        ));
      }
    }
    return findings;
  }
}

class RuleNoServerActionValidation implements Rule {
  id = "SERVER_ACTION_NO_VALIDATION"; name = "Server Action Missing Validation";   category: Category = "security"; severity: Severity = "high";
  description = "Server actions without input validation";
  async check(file: FileAnalysis, content: string): Promise<Finding[]> {
    if (!file.relativePath.includes("/api/") && !content.includes("use server")) return [];
    if (![".ts"].includes(file.extension)) return [];
    const findings: Finding[] = [];
    if (/export\s+async\s+function\s+(GET|POST|PUT|DELETE|PATCH)/.test(content)) {
      if (!/validate|trim|body\.json|\.catch/.test(content)) {
        const line = lineOf(content, content.indexOf("export async function"));
        findings.push(createFinding(
          this.id, this.category, "high", 0.7, file.relativePath, line,
          "API route may lack input validation", "Input from clients should be validated",
          "Add input validation and error handling", undefined, false, ["security"],
        ));
      }
    }
    return findings;
  }
}

class RuleMissingErrorBoundary implements Rule {
  id = "NO_ERROR_BOUNDARY"; name = "Missing Error Boundary";   category: Category = "react-anti-pattern"; severity: Severity = "medium";
  description = "React components without error boundaries";
  async check(file: FileAnalysis, content: string): Promise<Finding[]> {
    if (file.extension !== ".tsx" || file.isTestFile) return [];
    const findings: Finding[] = [];
    const isPageComponent = file.relativePath.includes("/app/") && file.relativePath.endsWith("page.tsx");
    if (isPageComponent) {
      if (!/errorBoundary|ErrorBoundary|componentDidCatch|error:/i.test(content)) {
        findings.push(createFinding(
          this.id, this.category, "medium", 0.6, file.relativePath, 1,
          "Page component may lack error boundary", "Runtime errors can crash the UI",
          "Wrap with error boundary component", undefined, false, ["react"],
        ));
      }
    }
    return findings;
  }
}

class RuleHardcodedPassword implements Rule {
  id = "HARDCODED_PASSWORD"; name = "Hardcoded Default Password";   category: Category = "security"; severity: Severity = "high";
  description = "Default password fallback in source";
  async check(file: FileAnalysis, content: string): Promise<Finding[]> {
    if (![".ts",".tsx"].includes(file.extension)) return [];
    const findings: Finding[] = [];
    if (/ADMIN_PASSWORD.*=\s*["']([^"']+)["']/g.test(content) && !content.includes("process.env")) {
      const line = lineOf(content, content.indexOf("ADMIN_PASSWORD"));
      findings.push(createFinding(
        this.id, this.category, "high", 0.8, file.relativePath, line,
        "Hardcoded password default", "Should use env var only",
        "Remove default password, require env var", undefined, false, ["security"],
      ));
    }
    return findings;
  }
}

class RuleNoCacheRevalidation implements Rule {
  id = "NO_CACHE_REVALIDATION"; name = "Missing Cache Revalidation";   category: Category = "next-anti-pattern"; severity: Severity = "medium";
  description = "No revalidation config on dynamic routes";
  async check(file: FileAnalysis, content: string): Promise<Finding[]> {
    if (!file.relativePath.includes("/app/") || file.isApiRoute) return [];
    if (![".tsx",".ts"].includes(file.extension)) return [];
    const findings: Finding[] = [];
    if (/export\s+async\s+function\s+GET|fetch\(/.test(content)) {
      if (!/revalidate|cache.*no-store|next:\s*\{/.test(content)) {
        findings.push(createFinding(
          this.id, this.category, "medium", 0.7, file.relativePath, 1,
          "Missing cache/revalidation config", "May serve stale data",
          "Add revalidate or cache control headers", undefined, false, ["nextjs"],
        ));
      }
    }
    return findings;
  }
}

class RuleDangerousRedirect implements Rule {
  id = "DANGEROUS_REDIRECT"; name = "Dangerous Redirect";   category: Category = "security"; severity: Severity = "high";
  description = "Redirects using user input without validation";
  async check(file: FileAnalysis, content: string): Promise<Finding[]> {
    if (!file.isApiRoute) return [];
    const findings: Finding[] = [];
    if (/searchParams|\.get\(/.test(content) && /redirect|302|307/.test(content)) {
      if (!/url\.hostname|ALLOWED_HOSTS|whitelist/.test(content)) {
        findings.push(createFinding(
          this.id, this.category, "high", 0.7, file.relativePath, 1,
          "Open redirect risk", "User input used in redirect without hostname check",
          "Validate redirect target against allowlist", undefined, false, ["security", "ssrf"],
        ));
      }
    }
    return findings;
  }
}
