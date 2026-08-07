import type { Severity, Category, Finding, Patch } from "../types";

export function createFinding(
  ruleId: string,
  category: Category,
  severity: Severity,
  confidence: number,
  file: string,
  line: number,
  message: string,
  detail?: string,
  suggestion?: string,
  patch?: Patch,
  safeToAutoFix = true,
  tags?: string[],
): Finding {
  return {
    id: `${ruleId}-${file}-${line}-${Date.now()}`,
    ruleId,
    category,
    severity,
    confidence,
    file,
    line,
    message,
    detail,
    suggestion,
    patch,
    safeToAutoFix: confidence > 0.9 && safeToAutoFix,
    tags,
  };
}
