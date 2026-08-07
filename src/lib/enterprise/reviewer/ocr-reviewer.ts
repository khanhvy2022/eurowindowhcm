import type { Finding } from "../types";
import { createFinding } from "./findings";
import { execFileSync } from "node:child_process";

export class OcrReviewer {
  private projectRoot: string;
  private available: boolean;

  constructor(projectRoot: string) {
    this.projectRoot = projectRoot;
    this.available = this.checkAvailable();
  }

  private checkAvailable(): boolean {
    try {
      execFileSync("npx", ["--no-install", "ocr", "--help"], {
        cwd: this.projectRoot,
        timeout: 5000,
        stdio: "pipe",
      });
      return true;
    } catch {
      return false;
    }
  }

  isAvailable(): boolean {
    return this.available;
  }

  async review(): Promise<Finding[]> {
    if (!this.available) return [];

    const findings: Finding[] = [];
    try {
      const output = execFileSync("npx", ["--no-install", "ocr", "--format", "json"], {
        cwd: this.projectRoot,
        timeout: 120000,
        encoding: "utf-8",
        stdio: ["pipe", "pipe", "pipe"],
      });

      const parsed = JSON.parse(output);
      if (parsed.findings && Array.isArray(parsed.findings)) {
        for (const f of parsed.findings) {
          const severity = mapSeverity(f.level ?? f.severity);
          const confidence = clamp(f.confidence ?? f.score ?? 0.7, 0, 1);
          findings.push(
            createFinding(
              f.rule_id ?? f.rule ?? "OCR",
              mapCategory(f.category),
              severity,
              confidence,
              f.file ?? f.path ?? "unknown",
              f.line ?? 0,
              f.message ?? f.description ?? "OCR finding",
              f.detail ?? f.suggestion,
              f.suggestion ?? f.advice,
              undefined,
              severity === "critical" || severity === "high",
              ["ocr", ...(f.tags ?? [])],
            ),
          );
        }
      }
    } catch (err) {
      console.warn("[enterprise] OCR review failed:", err instanceof Error ? err.message : err);
    }

    return findings;
  }
}

function mapSeverity(level: string): Finding["severity"] {
  const l = level?.toLowerCase() ?? "";
  if (l.includes("critical")) return "critical";
  if (l.includes("error") || l.includes("high")) return "high";
  if (l.includes("medium") || l.includes("warning")) return "medium";
  return "low";
}

function mapCategory(cat: string): Finding["category"] {
  const c = cat?.toLowerCase() ?? "";
  if (c.includes("security")) return "security";
  if (c.includes("performance")) return "performance";
  if (c.includes("maintainability") || c.includes("code")) return "dead-code";
  if (c.includes("reliability")) return "bug";
  return "bug";
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}
