# Enterprise AI Code Review & Auto Fix System

Tích hợp OpenCode làm **Agent Orchestrator** với các thành phần:
- **Alibaba Open Code Review (OCR)** — AI-powered code review
- **DeepAgents** — Multi-step planning & debugging pipeline
- **Hermes** — Reasoning & optimization agent

## Quick Start

```bash
# Dry-run (analysis only, no auto-fix)
npx tsx src/cli/enterprise-cli.ts

# Full run with auto-fix
npx tsx src/cli/enterprise-cli.ts

# With E2E tests
npx tsx src/cli/enterprise-cli.ts --e2e

# Disable Git
npx tsx src/cli/enterprise-cli.ts --no-git

# Using npm script
npm run enterprise
npm run enterprise:dry-run
```

## CLI Options

| Option | Description |
|--------|-------------|
| `--path <dir>` | Project path (default: cwd) |
| `--no-ocr` | Disable Alibaba OCR review |
| `--no-git` | Disable Git integration |
| `--no-fix` | Analysis only, no auto-fix |
| `--e2e` | Run E2E tests after fixes |
| `--html` | Generate HTML reports (default) |
| `--config <file>` | Custom config file |

## Architecture

```
src/lib/enterprise/
├── config.ts              # Configuration loader (enterprise.config.json)
├── types.ts               # Shared types
├── orchestrator.ts        # Main orchestrator — runs all phases
├── analyzer/
│   ├── project-analyzer.ts  # Folder structure, file analysis, architecture graph
│   └── dependency-graph.ts  # Dependency graph + cycle detection
├── reviewer/
│   ├── rules-engine.ts      # 15 built-in static analysis rules
│   ├── ocr-reviewer.ts     # Alibaba OCR CLI integration
│   └── findings.ts          # Finding/patch types & factories
├── deepagents/
│   └── planner.ts           # 9-step pipeline: analyze→reason→search→debug→patch→test→verify→commit→report
├── hermes/
│   └── optimizer.ts         # 6 optimization types: bundle, lazy-load, memoize, hooks, metadata, logic
├── verification/
│   ├── build-verifier.ts    # Runs lint, typecheck, build, test, e2e
│   └── auto-fix.ts          # Batch auto-fix engine with rollback
├── reports/
│   └── generator.ts         # Markdown + HTML report generator
├── git/
│   └── workflow.ts          # Git branch/commit/rollback/PR
└── scorer/
    └── scorer.ts            # 7-category scoring + technical debt
```

## Pipeline Phases

1. **Project Analysis** — Walk source tree, parse imports/exports, build architecture graph & dependency graph
2. **Rules Engine Review** — 15 static analysis rules checking for bugs, security issues, anti-patterns
3. **Alibaba OCR Review** — Optional: runs `ocr` CLI if available
4. **Hermes Optimization** — Detects bundle size, memoization, lazy-loading, metadata, hook violations
5. **DeepAgents Auto-Fix** — For each finding: plan → patch → verify → commit → rollback on failure
6. **Scoring** — Health, Security, Performance, SEO, Maintainability, Code Quality, Architecture
7. **Reports** — Markdown + HTML with priority list, technical debt, patch files

## Auto-Fix Policy

| Confidence | Severity | Action |
|------------|----------|--------|
| ≥ 95% + patch | Any | **Auto-fix** |
| 90–95% + patch | Critical/High | **Suggest** |
| < 90% | Any | **Manual** |

All auto-fixes create a Git branch, apply patches, run full verification (`lint` → `typecheck` → `build` → `test` → `e2e`), and rollback if any step fails.

## Output Location

Reports are saved to `.enterprise/reports/`:
```
.enterprise/
├── reports/
│   ├── review-report-{timestamp}.md
│   ├── review-report-{timestamp}.html
│   └── session-{timestamp}.log
```

## Configuration

Copy `enterprise.config.example.json` to `enterprise.config.json` and customize:

```json
{
  "autoFixThreshold": 0.95,
  "enableGitIntegration": true,
  "enableOCR": true,
  "enableHermes": true,
  "rollbackOnFailure": true,
  "runE2E": false,
  "commitAuthor": { "name": "...", "email": "..." }
}
```
