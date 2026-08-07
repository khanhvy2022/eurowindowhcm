export type Severity = "critical" | "high" | "medium" | "low";

export type Category =
  | "bug"
  | "dead-code"
  | "duplicate-code"
  | "unused-import"
  | "memory-leak"
  | "async-bug"
  | "promise-bug"
  | "race-condition"
  | "security"
  | "xss"
  | "csrf"
  | "sql-injection"
  | "ssr-bug"
  | "hydration-mismatch"
  | "accessibility"
  | "performance"
  | "react-anti-pattern"
  | "next-anti-pattern"
  | "typescript"
  | "seo";

export type Finding = {
  id: string;
  ruleId: string;
  category: Category;
  severity: Severity;
  confidence: number;
  file: string;
  line: number;
  column?: number;
  endLine?: number;
  message: string;
  detail?: string;
  suggestion?: string;
  patch?: Patch;
  safeToAutoFix: boolean;
  tags?: string[];
};

export type Patch = {
  file: string;
  old: string;
  new: string;
  description: string;
};

export type FileAnalysis = {
  path: string;
  relativePath: string;
  extension: string;
  size: number;
  lines: number;
  lastModified: string;
  imports: ImportInfo[];
  exports: ExportInfo[];
  isClientComponent: boolean;
  isServerSide: boolean;
  isApiRoute: boolean;
  isTestFile: boolean;
};

export type ImportInfo = {
  source: string;
  specifiers: string[];
  line: number;
};

export type ExportInfo = {
  name: string;
  type: "function" | "class" | "const" | "type" | "interface" | "enum";
  line: number;
};

export type DependencyNode = {
  id: string;
  label: string;
  type: "file" | "module" | "external";
  path?: string;
  package?: string;
};

export type DependencyEdge = {
  source: string;
  target: string;
  type: "import" | "export" | "dynamic";
};

export type ArchitectureGraph = {
  nodes: DependencyNode[];
  edges: DependencyEdge[];
  layers: {
    name: string;
    files: string[];
  }[];
  entryPoints: string[];
  externalDependencies: string[];
};

export type ProjectInfo = {
  rootPath: string;
  name: string;
  version: string;
  framework: "nextjs" | "react" | "unknown";
  frameworkVersion: string;
  totalFiles: number;
  totalLines: number;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  scripts: Record<string, string>;
  hasTests: boolean;
  hasEslint: boolean;
  hasPrettier: boolean;
  hasBiome: boolean;
  hasDocker: boolean;
  hasVercelConfig: boolean;
  testFramework: string | null;
  packageManager: "npm" | "yarn" | "pnpm";
};

export type ReviewResult = {
  id: string;
  createdAt: string;
  project: ProjectInfo;
  findings: Finding[];
  summary: {
    total: number;
    bySeverity: Record<Severity, number>;
    byCategory: Record<string, number>;
    filesAffected: number;
    autoFixable: number;
  };
  config: EnterpriseConfig;
  durationMs: number;
  architectureGraph?: ArchitectureGraph;
  dependencyGraph?: ArchitectureGraph;
};

export type StepStatus = "pending" | "running" | "completed" | "failed" | "skipped";

export type PipelineStep = {
  name: string;
  status: StepStatus;
  durationMs?: number;
  result?: unknown;
  error?: string;
};

export type PatchResult = {
  success: boolean;
  path: Patch;
  error?: string;
  rolledBack?: boolean;
};

export type VerificationResult = {
  lint: { passed: boolean; output: string };
  typecheck: { passed: boolean; output: string };
  build: { passed: boolean; output: string };
  test: { passed: boolean; output: string; failureCount?: number };
  e2e: { passed: boolean; output: string };
};

export type ScoreResult = {
  overall: number;
  health: number;
  security: number;
  performance: number;
  seo: number;
  maintainability: number;
  codeQuality: number;
  architecture: number;
};

export type TechnicalDebt = {
  estimatedHours: number;
  complexity: "low" | "medium" | "high";
  hotspots: string[];
};

export type PriorityItem = {
  id: string;
  title: string;
  severity: Severity;
  category: Category;
  file: string;
  line: number;
  confidence: number;
  estimatedMinutes: number;
  recommendation: string;
};

export type EnterpriseConfig = {
  projectPath: string;
  autoFixThreshold: number;
  maxConcurrency: number;
  enableGitIntegration: boolean;
  enableOCR: boolean;
  enableHermes: boolean;
  enableSEOAudit: boolean;
  enableReports: boolean;
  generateHtmlReports: boolean;
  rollbackOnFailure: boolean;
  runE2E: boolean;
  excludePaths: string[];
  customRules: string[];
  commitAuthor: { name: string; email: string };
  prSummary: boolean;
  packageManager?: "npm" | "yarn" | "pnpm";
  _packageJson?: Record<string, unknown>;
};

export type FixPlan = {
  findingId: string;
  steps: PipelineStep[];
  patches: Patch[];
  confidence: number;
  autoFixable: boolean;
  gitBranch?: string;
  verification?: VerificationResult;
  status: "pending" | "planning" | "patching" | "verifying" | "committed" | "rolled-back" | "completed" | "failed";
  error?: string;
};

export type AuditReport = {
  healthScore: number;
  securityScore: number;
  performanceScore: number;
  seoScore: number;
  maintainabilityScore: number;
  codeQualityScore: number;
  architectureScore: number;
  technicalDebt: TechnicalDebt;
  estimatedFixTime: number;
  priorityList: PriorityItem[];
  patchFiles: Patch[];
  commitMessage: string;
  prSummary: string;
  findings: Finding[];
  reviewResult: ReviewResult;
  fixPlans: FixPlan[];
};
