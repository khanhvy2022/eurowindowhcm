import type { FileAnalysis, ArchitectureGraph, DependencyNode, DependencyEdge } from "../types";
import { join, dirname } from "node:path";

export class DependencyGraphBuilder {
  private nodes: Map<string, DependencyNode> = new Map();
  private edges: Map<string, DependencyEdge> = new Map();

  build(files: FileAnalysis[]): ArchitectureGraph {
    this.nodes.clear();
    this.edges.clear();

    for (const file of files) {
      const node: DependencyNode = {
        id: file.relativePath,
        label: file.relativePath,
        type: "file",
        path: file.relativePath,
      };
      this.nodes.set(file.relativePath, node);
    }

    const externalDeps = new Set<string>();
    const edgeKey = (src: string, tgt: string, type: string) => `${src}->${tgt}:${type}`;

    for (const file of files) {
      const sourceId = file.relativePath;
      for (const imp of file.imports) {
        const targetPath = this.resolveImport(imp.source, sourceId);
        if (targetPath) {
          if (!this.nodes.has(targetPath)) {
            this.nodes.set(targetPath, {
              id: targetPath,
              label: targetPath,
              type: "file",
              path: targetPath,
            });
          }
          const key = edgeKey(sourceId, targetPath, "import");
          if (!this.edges.has(key)) {
            this.edges.set(key, { source: sourceId, target: targetPath, type: "import" });
          }
        } else if (this.isExternalPackage(imp.source)) {
          const pkg = this.extractPackageName(imp.source);
          externalDeps.add(pkg);
          if (!this.nodes.has(pkg)) {
            this.nodes.set(pkg, { id: pkg, label: pkg, type: "external", package: pkg });
          }
          const key = edgeKey(sourceId, pkg, "import");
          if (!this.edges.has(key)) {
            this.edges.set(key, { source: sourceId, target: pkg, type: "import" });
          }
        }
      }
    }

    const layers = this.computeLayers(files);
    const entryPoints = files
      .filter((f) => f.relativePath === "src/app/page.tsx" || f.relativePath === "src/app/layout.tsx" || f.relativePath === "src/app/head.tsx")
      .map((f) => f.relativePath);

    return {
      nodes: [...this.nodes.values()],
      edges: [...this.edges.values()],
      layers,
      entryPoints,
      externalDependencies: [...externalDeps],
    };
  }

  getDependents(filePath: string): string[] {
    const dependents: string[] = [];
    for (const edge of this.edges.values()) {
      if (edge.target === filePath) {
        dependents.push(edge.source);
      }
    }
    return dependents;
  }

  getDependencies(filePath: string): string[] {
    const deps: string[] = [];
    for (const edge of this.edges.values()) {
      if (edge.source === filePath) {
        deps.push(edge.target);
      }
    }
    return deps;
  }

  findCycles(): string[][] {
    const visited = new Set<string>();
    const recStack = new Set<string>();
    const cycles: string[][] = [];
    const path: string[] = [];

    const dfs = (node: string) => {
      visited.add(node);
      recStack.add(node);
      path.push(node);

      const neighbors = this.getDependencies(node);
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          dfs(neighbor);
        } else if (recStack.has(neighbor)) {
          const cycleStart = path.indexOf(neighbor);
          if (cycleStart !== -1) {
            cycles.push([...path.slice(cycleStart), neighbor]);
          }
        }
      }

      path.pop();
      recStack.delete(node);
    };

    for (const node of this.nodes.keys()) {
      if (!visited.has(node)) {
        dfs(node);
      }
    }

    return cycles;
  }

  private resolveImport(source: string, fromPath: string): string | null {
    if (source.startsWith("@/")) {
      return source.replace("@/", "src/");
    }
    if (source.startsWith("./") || source.startsWith("../")) {
      const fromDir = dirname(fromPath);
      return join(fromDir, source);
    }
    return null;
  }

  private isExternalPackage(source: string): boolean {
    return !source.startsWith("@/") && !source.startsWith("./") && !source.startsWith("../") && !source.startsWith("/");
  }

  private extractPackageName(source: string): string {
    if (source.startsWith("@")) {
      const parts = source.split("/");
      return parts.slice(0, 2).join("/");
    }
    return source.split("/")[0];
  }

  private computeLayers(files: FileAnalysis[]): ArchitectureGraph["layers"] {
    const layerMap: Record<string, string[]> = {
      "API Routes": [],
      "Server Components": [],
      "Client Components": [],
      "Utils/Lib": [],
      "Types": [],
    };

    for (const f of files) {
      if (f.isApiRoute) layerMap["API Routes"].push(f.relativePath);
      else if (f.isClientComponent) layerMap["Client Components"].push(f.relativePath);
      else if (f.relativePath.startsWith("src/app/") && f.extension === ".tsx") layerMap["Server Components"].push(f.relativePath);
      else if (f.relativePath.startsWith("src/lib/")) layerMap["Utils/Lib"].push(f.relativePath);
      else layerMap["Server Components"].push(f.relativePath);
    }

    return Object.entries(layerMap)
      .filter(([, fs]) => fs.length > 0)
      .map(([name, fs]) => ({ name, files: fs }));
  }
}
