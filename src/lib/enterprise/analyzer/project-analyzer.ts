import type { FileAnalysis, ImportInfo, ExportInfo, ProjectInfo, ArchitectureGraph, DependencyNode, DependencyEdge } from "../types";
import { readdirSync, statSync, readFileSync, existsSync, Dirent } from "node:fs";
import { join, relative, extname, basename, dirname } from "node:path";

const SOURCE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"]);
const TEST_PATTERNS = [/test\./i, /\.test\./i, /\.spec\./i, /__tests__/i];
const CLIENT_COMPONENT_MARKER = '"use client"';
const SERVER_COMPONENT_MARKER = '"use server"';

export class ProjectAnalyzer {
  private rootPath: string;
  private fileCache: Map<string, FileAnalysis> = new Map();

  constructor(rootPath: string) {
    this.rootPath = rootPath;
  }

  analyze(): { project: ProjectInfo; files: FileAnalysis[]; graph: ArchitectureGraph } {
    const project = this.analyzeProject();
    const files = this.analyzeFiles();
    const graph = this.buildArchitectureGraph(files);

    return { project, files, graph };
  }

  private analyzeProject(): ProjectInfo {
    const packageJsonPath = join(this.rootPath, "package.json");
    const packageJson = existsSync(packageJsonPath)
      ? JSON.parse(readFileSync(packageJsonPath, "utf-8"))
      : { name: "unknown", version: "0.0.0" };

    const scripts = packageJson.scripts ?? {};
    const deps = packageJson.dependencies ?? {};
    const devDeps = packageJson.devDependencies ?? {};

    let framework: ProjectInfo["framework"] = "unknown";
    let frameworkVersion = "";
    if (deps.next || devDeps.next) {
      framework = "nextjs";
      frameworkVersion = deps.next ?? devDeps.next ?? "";
    } else if (deps.react || devDeps.react) {
      framework = "react";
      frameworkVersion = deps.react ?? devDeps.react ?? "";
    }

    const testFramework = scripts.test ? detectTestFramework(devDeps) : null;
    const packageManager = detectPackageManager(this.rootPath);

    return {
      rootPath: this.rootPath,
      name: packageJson.name ?? "unknown",
      version: packageJson.version ?? "0.0.0",
      framework,
      frameworkVersion,
      totalFiles: 0,
      totalLines: 0,
      dependencies: deps,
      devDependencies: devDeps,
      scripts,
      hasTests: !!testFramework,
      hasEslint: !!devDeps.eslint || !!deps.eslint,
      hasPrettier: !!devDeps.prettier || !!deps.prettier,
      hasBiome: !!devDeps.biome || !!deps.biome,
      hasDocker: existsSync(join(this.rootPath, "Dockerfile")) || existsSync(join(this.rootPath, "docker-compose.yml")),
      hasVercelConfig: existsSync(join(this.rootPath, "vercel.json")),
      testFramework,
      packageManager,
    };
  }

  private analyzeFiles(): FileAnalysis[] {
    const files: FileAnalysis[] = [];
    const excludeDirs = new Set(["node_modules", ".next", ".git", "public", "clone-wedsite", ".codegraph", ".codex", ".hallmark", ".playwright-mcp"]);

    const walk = (dir: string) => {
      let entries: Dirent[];
      try {
        entries = readdirSync(dir, { withFileTypes: true });
      } catch {
        return;
      }

      for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        if (entry.isDirectory()) {
          if (!excludeDirs.has(entry.name)) walk(fullPath);
        } else if (SOURCE_EXTENSIONS.has(extname(entry.name))) {
          const analysis = this.analyzeFile(fullPath);
          if (analysis) {
            files.push(analysis);
          }
        }
      }
    };

    walk(this.rootPath);

    return files;
  }

  private analyzeFile(filePath: string): FileAnalysis | null {
    let content: string;
    try {
      content = readFileSync(filePath, "utf-8");
    } catch {
      return null;
    }

    const relativePath = relative(this.rootPath, filePath);
    const ext = extname(filePath);
    const lines = content.split("\n");
    const isTestFile = TEST_PATTERNS.some((p) => p.test(relativePath));
    const isApiRoute = /src\/app\/api\//.test(relativePath) && ext === ".ts";

    const imports = parseImports(content);
    const exports = parseExports(content);
    const isClientComponent = content.trimStart().startsWith(CLIENT_COMPONENT_MARKER);
    const isServerSide = content.includes(SERVER_COMPONENT_MARKER);

    return {
      path: relativePath,
      relativePath,
      extension: ext,
      size: Buffer.byteLength(content, "utf-8"),
      lines: lines.length,
      lastModified: statSync(filePath).mtime.toISOString(),
      imports,
      exports,
      isClientComponent,
      isServerSide,
      isApiRoute,
      isTestFile,
    };
  }

  private buildArchitectureGraph(files: FileAnalysis[]): ArchitectureGraph {
    const nodes: DependencyNode[] = [];
    const edges: DependencyEdge[] = [];
    const nodeMap = new Map<string, string>();

    for (const file of files) {
      const id = file.relativePath;
      nodeMap.set(id, id);
      nodes.push({
        id,
        label: basename(file.relativePath),
        type: "file",
        path: file.relativePath,
      });
    }

    const externalPackages = new Set<string>();
    for (const file of files) {
      const sourceId = file.relativePath;
      for (const imp of file.imports) {
        const targetPath = resolveImport(imp.source, sourceId);
        if (targetPath) {
          edges.push({
            source: sourceId,
            target: targetPath,
            type: imp.specifiers.some((s) => s.startsWith("type ")) ? "export" : "import",
          });
        } else if (isExternalPackage(imp.source)) {
          const pkgName = extractPackageName(imp.source);
          externalPackages.add(pkgName);
          edges.push({
            source: sourceId,
            target: pkgName,
            type: "import",
          });
        }
      }
    }

    for (const pkg of externalPackages) {
      if (!nodeMap.has(pkg)) {
        nodeMap.set(pkg, pkg);
        nodes.push({ id: pkg, label: pkg, type: "external", package: pkg });
      }
    }

    const layers = computeLayers(files);
    const entryPoints = files
      .filter((f) => f.relativePath === "src/app/page.tsx" || f.relativePath === "src/app/layout.tsx" || f.relativePath === "src/app/head.tsx")
      .map((f) => f.relativePath);

    return {
      nodes,
      edges,
      layers,
      entryPoints,
      externalDependencies: [...externalPackages],
    };
  }
}

function resolveImport(source: string, fromPath: string): string | null {
  if (source.startsWith("@/")) {
    return source.replace("@/", "src/");
  }
  if (source.startsWith("./") || source.startsWith("../")) {
    const fromDir = dirname(fromPath);
    const resolved = join(fromDir, source);
    return resolved;
  }
  return null;
}

function isExternalPackage(source: string): boolean {
  return !source.startsWith("@/") && !source.startsWith("./") && !source.startsWith("../") && !source.startsWith("/");
}

function extractPackageName(source: string): string {
  if (source.startsWith("@")) {
    const parts = source.split("/");
    return parts.slice(0, 2).join("/");
  }
  return source.split("/")[0];
}

function parseImports(content: string): ImportInfo[] {
  const imports: ImportInfo[] = [];
  const importRegex = /import\s+(?:type\s+)?(?:(?![{,};])[^]*?\s+from\s+)?["']([^"']+)["']/g;
  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const matches = [...line.matchAll(importRegex)];
    for (const m of matches) {
      const source = m[1];
      const specifiers = extractSpecifiers(line, source);
      imports.push({ source, specifiers, line: i + 1 });
    }
  }

  return imports;
}

function extractSpecifiers(line: string, _source: string): string[] {
  const beforeFrom = line.split("from")[0];
  const importMatch = beforeFrom.match(/import\s+(?:type\s+)?([{,}\]]?.+?[}\]])/);
  if (!importMatch) return [];

  const specStr = importMatch[1].trim();
  if (specStr.startsWith("{")) {
    const inside = specStr.slice(1, -1);
    return inside
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  if (specStr === "*") return ["*"];
  return [specStr];
}

function parseExports(content: string): ExportInfo[] {
  const exports: ExportInfo[] = [];
  const lines = content.split("\n");
  const exportRegex = /export\s+(?:default\s+)?(function|class|const|type|interface|enum|async\s+function)\s+(\w+)/g;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const m = exportRegex.exec(line);
    if (m) {
      let type: ExportInfo["type"] = "const";
      if (m[1].includes("function")) type = "function";
      else if (m[1] === "class") type = "class";
      else if (m[1] === "type") type = "type";
      else if (m[1] === "interface") type = "interface";
      else if (m[1] === "enum") type = "enum";
      exports.push({ name: m[2], type, line: i + 1 });
    }
  }

  return exports;
}

function computeLayers(files: FileAnalysis[]): ArchitectureGraph["layers"] {
  const layers: Record<string, string[]> = {
    "API Routes": [],
    "Server Components": [],
    "Client Components": [],
    "Utils/Lib": [],
    "Types": [],
  };

  for (const f of files) {
    if (f.isApiRoute) layers["API Routes"].push(f.relativePath);
    else if (f.isClientComponent) layers["Client Components"].push(f.relativePath);
    else if (f.relativePath.startsWith("src/app/") && f.extension === ".tsx") layers["Server Components"].push(f.relativePath);
    else if (f.relativePath.startsWith("src/lib/")) layers["Utils/Lib"].push(f.relativePath);
    else layers["Server Components"].push(f.relativePath);
  }

  return Object.entries(layers)
    .filter(([, files]) => files.length > 0)
    .map(([name, files]) => ({ name, files }));
}

function detectTestFramework(devDeps: Record<string, string>): string | null {
  if (devDeps.vitest || devDeps.jest || devDeps.mocha) return devDeps.vitest ? "vitest" : devDeps.jest ? "jest" : "mocha";
  return null;
}

function detectPackageManager(root: string): "npm" | "yarn" | "pnpm" {
  if (existsSync(join(root, "pnpm-lock.yaml"))) return "pnpm";
  if (existsSync(join(root, "yarn.lock"))) return "yarn";
  return "npm";
}
