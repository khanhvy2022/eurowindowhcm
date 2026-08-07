#!/usr/bin/env node

import { EnterpriseOrchestrator } from "../lib/enterprise/orchestrator";
import { loadConfig } from "../lib/enterprise/config";
import { existsSync, mkdirSync, appendFileSync } from "node:fs";
import { join } from "node:path";

const args = process.argv.slice(2);
const help = args.includes("--help") || args.includes("-h");

if (help) {
  console.log(`
Enterprise AI Code Review & Auto Fix System
Usage: enterprise-cli [options]

Options:
  --path <dir>       Project path (default: cwd)
  --no-ocr           Disable Alibaba OCR review
  --no-git           Disable Git integration
  --no-fix           Analysis only, no auto-fix
  --e2e              Run E2E tests after fixes
  --html             Generate HTML reports (default: true)
  --config <file>    Use custom config file
  --help, -h         Show this help

Example:
  npx tsx src/cli/enterprise-cli.ts --path /path/to/project --e2e
`);
  process.exit(0);
}

const projectPath = args.includes("--path") ? args[args.indexOf("--path") + 1] : process.cwd();
const config = loadConfig(projectPath);

if (args.includes("--no-ocr")) config.enableOCR = false;
if (args.includes("--no-git")) config.enableGitIntegration = false;
if (args.includes("--e2e")) config.runE2E = true;
if (args.includes("--no-fix")) {
  config.autoFixThreshold = 2; // impossible threshold = disable all auto-fix
  config.enableGitIntegration = false;
}

const outputDir = join(projectPath, ".enterprise", "reports");
if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });

const logFile = join(outputDir, `session-${Date.now()}.log`);
const log = (msg: string) => {
  const line = `[${new Date().toISOString()}] ${msg}`;
  console.log(line);
  try {
    appendFileSync(logFile, line + "\n");
  } catch {}
};

log("[enterprise] Starting Enterprise AI Code Review & Auto Fix System");
log(`[enterprise] Project: ${projectPath}`);
log(`[enterprise] Configuration: OCR=${config.enableOCR}, Git=${config.enableGitIntegration}, AutoFix threshold=${config.autoFixThreshold}`);

const orchestrator = new EnterpriseOrchestrator(config);

orchestrator
  .run()
  .then((report) => {
    log("[enterprise] === RESULTS ===");
    log(`  Overall: ${report.healthScore}/100`);
    log(`  Security: ${report.securityScore}/100`);
    log(`  Performance: ${report.performanceScore}/100`);
    log(`  SEO: ${report.seoScore}/100`);
    log(`  Maintainability: ${report.maintainabilityScore}/100`);
    log(`  Code Quality: ${report.codeQualityScore}/100`);
    log(`  Architecture: ${report.architectureScore}/100`);
    log(`  Technical Debt: ${report.technicalDebt.estimatedHours}h (${report.technicalDebt.complexity})`);
    log(`  Priority Items: ${report.priorityList.length}`);
    log(`  Fix Plans: ${report.fixPlans.filter((p) => p.status === "completed").length} applied`);
    log(`  Log saved to: ${logFile}`);
    process.exit(0);
  })
  .catch((err) => {
    log(`[enterprise] FAILED: ${err instanceof Error ? err.message : err}`);
    process.exit(1);
  });
