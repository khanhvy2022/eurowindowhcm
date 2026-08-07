import { execFileSync } from "node:child_process";
import { relative } from "node:path";

export class GitWorkflow {
  private projectRoot: string;
  private author: { name: string; email: string };
  private enabled: boolean;

  constructor(projectRoot: string, author: { name: string; email: string }, enabled: boolean) {
    this.projectRoot = projectRoot;
    this.author = author;
    this.enabled = enabled;
  }

  private exec(args: string[], cwd?: string): string {
    if (!this.enabled) return "";
    return execFileSync("git", args, {
      cwd: cwd ?? this.projectRoot,
      timeout: 30000,
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "pipe"],
    }).trim();
  }

  execOrEmpty(args: string[], cwd?: string): string {
    try {
      return this.exec(args, cwd);
    } catch {
      return "";
    }
  }

  isRepo(): boolean {
    try {
      this.exec(["rev-parse", "--is-inside-work-tree"]);
      return true;
    } catch {
      return false;
    }
  }

  getCurrentBranch(): string {
    return this.execOrEmpty(["branch", "--show-current"]);
  }

  async createBranch(branchName: string): Promise<{ success: boolean; branch: string }> {
    if (!this.enabled) return { success: false, branch: branchName };

    try {
      const safeBranch = `fix/${Date.now()}-${sanitizeBranch(branchName)}`;
      this.exec(["checkout", "-b", safeBranch]);
      return { success: true, branch: safeBranch };
    } catch (err) {
      console.warn(`[enterprise] Failed to create branch: ${err instanceof Error ? err.message : err}`);
      return { success: false, branch: branchName };
    }
  }

  async commit(files: string[], message: string): Promise<{ success: boolean; hash: string }> {
    if (!this.enabled) return { success: false, hash: "" };

    try {
      const relFiles = files.map((f) => relative(this.projectRoot, f));
      this.exec(["add", ...relFiles]);
      this.exec(["commit", "-m", message, `--author=${this.author.name} <${this.author.email}>`]);
      const hash = this.exec(["rev-parse", "HEAD"]);
      return { success: true, hash };
    } catch (err) {
      console.warn(`[enterprise] Commit failed: ${err instanceof Error ? err.message : err}`);
      return { success: false, hash: "" };
    }
  }

  async checkout(branchOrCommit: string): Promise<boolean> {
    try {
      this.exec(["checkout", branchOrCommit]);
      return true;
    } catch {
      return false;
    }
  }

  async rollback(commitHash: string): Promise<boolean> {
    try {
      this.exec(["reset", "--hard", commitHash]);
      return true;
    } catch {
      return false;
    }
  }

  async getCommitHash(): Promise<string> {
    return this.execOrEmpty(["rev-parse", "HEAD"]);
  }

  async getStatus(): Promise<{ modified: string[]; staged: string[]; untracked: string[] }> {
    try {
      const status = this.exec(["status", "--porcelain"]);
      const modified: string[] = [];
      const staged: string[] = [];
      const untracked: string[] = [];
      for (const line of status.split("\n")) {
        if (!line.trim()) continue;
        const [a, b] = [line[0], line[1]];
        const file = line.slice(3);
        if (a === "M" && b === "M") modified.push(file);
        else if (a === "M" || a === "A") staged.push(file);
        else if (a === "?") untracked.push(file);
      }
      return { modified, staged, untracked };
    } catch {
      return { modified: [], staged: [], untracked: [] };
    }
  }

  async createPullRequest(summary: string): Promise<{ success: boolean; url?: string }> {
    try {
      const currentBranch = this.getCurrentBranch();
      const baseBranch = this.execOrEmpty(["rev-parse", "--abbrev-ref", "origin/HEAD"]).replace("origin/", "");
      if (!baseBranch) return { success: false };

      const ghOutput = execFileSync("gh", ["pr", "create", "--title", "Enterprise AI Review: Auto-fix", "--body", summary, "--head", currentBranch, "--base", baseBranch], {
        cwd: this.projectRoot,
        timeout: 30000,
        encoding: "utf-8",
        stdio: ["pipe", "pipe", "pipe"],
      });

      const urlMatch = ghOutput.match(/https?:\/\/[^\s]+/);
      return { success: true, url: urlMatch?.[0] };
    } catch (err) {
      console.warn("[enterprise] PR creation skipped/failed:", err instanceof Error ? err.message : err);
      return { success: false };
    }
  }

  async deleteBranch(branch: string): Promise<boolean> {
    try {
      this.exec(["branch", "-D", branch]);
      return true;
    } catch {
      return false;
    }
  }
}

function sanitizeBranch(name: string): string {
  return name.replace(/[^a-zA-Z0-9-_]/g, "-").replace(/--+/g, "-").slice(0, 50);
}
