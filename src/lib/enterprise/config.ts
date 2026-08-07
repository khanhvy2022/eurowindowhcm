import type { EnterpriseConfig } from "./types";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const DEFAULT_CONFIG: EnterpriseConfig = {
  projectPath: process.cwd(),
  autoFixThreshold: 0.95,
  maxConcurrency: 4,
  enableGitIntegration: true,
  enableOCR: true,
  enableHermes: true,
  enableSEOAudit: true,
  enableReports: true,
  generateHtmlReports: true,
  rollbackOnFailure: true,
  runE2E: false,
  excludePaths: ["node_modules", ".next", ".git", "public", "clone-wedsite", ".codegraph", ".codex", ".hallmark", ".playwright-mcp"],
  customRules: [],
  commitAuthor: {
    name: "Enterprise AI Review Bot",
    email: "ai-review@bot.local",
  },
  prSummary: true,
};

export function loadConfig(projectPath?: string): EnterpriseConfig {
  const root = projectPath ?? DEFAULT_CONFIG.projectPath;
  const configFile = join(root, "enterprise.config.json");

  if (existsSync(configFile)) {
    try {
      const raw = JSON.parse(readFileSync(configFile, "utf-8"));
      return { ...DEFAULT_CONFIG, ...raw, projectPath: root };
    } catch {
      console.warn("[enterprise] Failed to parse enterprise.config.json, using defaults");
    }
  }

  const packageJsonPath = join(root, "package.json");
  let packageJson: Record<string, unknown> = {};
  if (existsSync(packageJsonPath)) {
    try {
      packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
    } catch {
      // ignore
    }
  }

  const packageManager = detectPackageManager(root);

  return {
    ...DEFAULT_CONFIG,
    projectPath: root,
    packageManager,
    _packageJson: packageJson,
  };
}

function detectPackageManager(root: string): "npm" | "yarn" | "pnpm" {
  if (existsSync(join(root, "pnpm-lock.yaml"))) return "pnpm";
  if (existsSync(join(root, "yarn.lock"))) return "yarn";
  return "npm";
}
