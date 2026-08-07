import type { Finding, Patch, PatchResult, VerificationResult } from "../types";
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";

export class Patcher {
  private projectRoot: string;
  private backups: Map<string, string> = new Map();

  constructor(projectRoot: string) {
    this.projectRoot = projectRoot;
  }

  async applyPatch(patch: Patch, _finding: Finding): Promise<PatchResult> {
    const result: PatchResult = {
      success: false,
      path: patch,
    };

    const fullPath = join(this.projectRoot, patch.file);
    if (!existsSync(fullPath)) {
      result.error = `File not found: ${patch.file}`;
      return result;
    }

    let content: string;
    try {
      content = readFileSync(fullPath, "utf-8");
    } catch (err) {
      result.error = err instanceof Error ? err.message : "Failed to read file";
      return result;
    }

    // Backup
    this.backups.set(patch.file, content);

    try {
      let patched = content;

      if (patch.old.trim() === "") {
        // Remove the import line entirely
        const lines = content.split("\n");
        const lineIdx = lines.findIndex((l) => l.trim() === patch.old.trim() || (patch.old === "" && false));
        if (lineIdx >= 0) {
          lines.splice(lineIdx, 1);
          patched = lines.join("\n");
        }
      } else {
        // Replace old with new
        if (content.includes(patch.old)) {
          patched = content.replace(patch.old, patch.new);
        } else {
          // Try line-based replacement
          const lines = content.split("\n");
          const oldLines = patch.old.split("\n");
          for (let i = 0; i <= lines.length - oldLines.length; i++) {
            let match = true;
            for (let j = 0; j < oldLines.length; j++) {
              if (lines[i + j] !== oldLines[j]) {
                match = false;
                break;
              }
            }
            if (match) {
              lines.splice(i, oldLines.length, ...patch.new.split("\n"));
              patched = lines.join("\n");
              break;
            }
          }
        }
      }

      if (patched === content) {
        result.error = "Patch did not change file content";
        return result;
      }

      writeFileSync(fullPath, patched, "utf-8");
      result.success = true;
    } catch (err) {
      result.error = err instanceof Error ? err.message : "Failed to apply patch";
      // Restore from backup
      if (this.backups.has(patch.file)) {
        writeFileSync(fullPath, this.backups.get(patch.file)!, "utf-8");
        result.rolledBack = true;
      }
    }

    return result;
  }

  async rollbackPatch(patch: Patch): Promise<boolean> {
    const fullPath = join(this.projectRoot, patch.file);
    const backup = this.backups.get(patch.file);
    if (backup === undefined) return false;

    try {
      writeFileSync(fullPath, backup, "utf-8");
      this.backups.delete(patch.file);
      return true;
    } catch {
      return false;
    }
  }

  hasBackup(file: string): boolean {
    return this.backups.has(file);
  }

  applyMultiple(patches: Patch[]): PatchResult[] {
    const results: PatchResult[] = [];
    const appliedPatches: Patch[] = [];

    for (const patch of patches) {
      const result = this.applyPatchSync(patch);
      results.push(result);
      if (result.success) {
        appliedPatches.push(patch);
      } else {
        // Rollback all previously applied patches
        for (const applied of appliedPatches.reverse()) {
          this.rollbackPatchSync(applied);
        }
        results[results.length - 1]!.rolledBack = true;
        break;
      }
    }

    return results;
  }

  private applyPatchSync(patch: Patch): PatchResult {
    const result: PatchResult = { success: false, path: patch };
    const fullPath = join(this.projectRoot, patch.file);
    if (!existsSync(fullPath)) {
      result.error = `File not found: ${patch.file}`;
      return result;
    }

    let content: string;
    try {
      content = readFileSync(fullPath, "utf-8");
    } catch (err) {
      result.error = err instanceof Error ? err.message : "Failed to read file";
      return result;
    }

    this.backups.set(patch.file, content);

    try {
      let patched = content;
      if (patch.old.trim() === "") {
        const lines = content.split("\n");
        const oldLine = patch.old.split("\n")[0];
        if (oldLine) {
          const idx = lines.findIndex((l) => l.includes(oldLine.trim()));
          if (idx >= 0) lines.splice(idx, 1);
        }
        patched = lines.join("\n");
      } else if (content.includes(patch.old)) {
        patched = content.replace(patch.old, patch.new);
      }

      if (patched === content) {
        result.error = "Patch did not change file content";
        return result;
      }

      writeFileSync(fullPath, patched, "utf-8");
      result.success = true;
    } catch (err) {
      result.error = err instanceof Error ? err.message : "Failed to apply patch";
      if (this.backups.has(patch.file)) {
        writeFileSync(fullPath, this.backups.get(patch.file)!, "utf-8");
        result.rolledBack = true;
      }
    }

    return result;
  }

  private rollbackPatchSync(patch: Patch): boolean {
    const fullPath = join(this.projectRoot, patch.file);
    const backup = this.backups.get(patch.file);
    if (backup === undefined) return false;
    try {
      writeFileSync(fullPath, backup, "utf-8");
      this.backups.delete(patch.file);
      return true;
    } catch {
      return false;
    }
  }
}

export class BuildVerifier {
  private projectRoot: string;
  private packageManager: "npm" | "yarn" | "pnpm";
  private runE2E: boolean;

  constructor(projectRoot: string, packageManager: "npm" | "yarn" | "pnpm", runE2E = false) {
    this.projectRoot = projectRoot;
    this.packageManager = packageManager;
    this.runE2E = runE2E;
  }

  async verify(): Promise<VerificationResult> {
    const lockPrefix: string[] = [];
    if (this.packageManager === "pnpm") lockPrefix.push("pnpm", "run");
    else if (this.packageManager === "yarn") lockPrefix.push("yarn");
    else lockPrefix.push("npm", "run");

    const result: VerificationResult = {
      lint: { passed: false, output: "" },
      typecheck: { passed: false, output: "" },
      build: { passed: false, output: "" },
      test: { passed: false, output: "" },
      e2e: { passed: false, output: "" },
    };

    result.typecheck = this.runCommand([...lockPrefix, "typecheck"], 120);
    result.lint = this.runCommand([...lockPrefix, "lint"], 60);
    result.build = this.runCommand([...lockPrefix, "build"], 180);
    result.test = this.runCommand([...lockPrefix, "test"], 120);

    if (this.runE2E && this.hasE2ETests()) {
      result.e2e = this.runCommand([...lockPrefix, "test:e2e"], 180);
    } else {
      result.e2e = { passed: true, output: "Skipped (no e2e tests or disabled)" };
    }

    return result;
  }

  private runCommand(args: string[], timeoutSec: number): { passed: boolean; output: string; failureCount?: number } {
    try {
      const output = execFileSync(args[0]!, args.slice(1), {
        cwd: this.projectRoot,
        timeout: timeoutSec * 1000,
        encoding: "utf-8",
        stdio: ["pipe", "pipe", "pipe"],
      });
      return { passed: true, output: output.trim() };
    } catch (err: unknown) {
      const output = String(err).trim();
      const failureCount = extractFailureCount(output);
      return { passed: false, output, failureCount };
    }
  }

  private hasE2ETests(): boolean {
    const playwrightDir = join(this.projectRoot, "tests");
    if (!existsSync(playwrightDir)) return false;
    try {
      const files = readdirSync(playwrightDir);
      return files.some((f: string) => f.includes("e2e") || f.includes("spec."));
    } catch {
      return false;
    }
  }
}

function extractFailureCount(output: string): number | undefined {
  const failMatch = output.match(/(\d+)\s*failed/i);
  if (failMatch) return parseInt(failMatch[1], 10);
  const failMatch2 = output.match(/failures:\s*(\d+)/i);
  if (failMatch2) return parseInt(failMatch2[1], 10);
  return undefined;
}
