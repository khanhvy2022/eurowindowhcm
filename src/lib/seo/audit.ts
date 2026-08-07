import { AuditResult, PathData, Severity } from "./types";
import { crawlSite, type CrawlOptions } from "./crawler";
import { auditAll } from "./rules";
import { auditContent } from "./content";
import { analyzeKeywords } from "./keyword";
import { analyzeInternalLinks } from "./internal_link";
import { auditGEO } from "./geo";
import { chatWithRotation, type ChatFn } from "@/lib/llm";

export type AuditOverrides = {
  llm?: ChatFn;
};

const WEIGHT: Record<Severity, number> = { error: 3, warning: 2, info: 1 };

/**
 * Chạy Technical SEO Audit cho một tập URL.
 * override.llm cho phép test (tránh gọi LLM thật).
 */
export async function runAudit(
  startUrls: string[],
  options: Pick<CrawlOptions, "maxPages" | "delayMs" | "concurrency" | "fetchFn"> = {},
  override: AuditOverrides = {},
): Promise<AuditResult> {
  const started = Date.now();
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `audit-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  const { pages, errors } = await crawlSite({ startUrls, ...options });

  const urlData = [...pages.values()];
  const { paths, seoScore, technicalScore, contentScore, issueCounts } = auditAll(urlData);

  for (const url of pages.keys()) {
    const err = errors.find((e) => e.url === url);
    if (err) {
      const p = paths.find((p) => p.url === url);
      if (p) p.issues.push({ code: "fetch_error", severity: "error", message: `Không lấy được trang: ${err.message}` });
    }
  }

  // Gộp: lỗi crawl ảnh hưởng điểm
  if (urlData.length > 0) {
    for (const p of paths) {
      if (p.issues.some((i) => i.code === "fetch_error")) {
        p.issues.push({ code: "crawl_failed", severity: "error", message: "Trang không thể crawl được" });
      }
    }
  }

  // AI sinh checklist ưu tiên (dựa vào issues gộp, top critical)
  const priorityChecklist = await generatePriorityChecklist(paths, override.llm);

  // Content audit + GEO + keyword + internal links (dựa trên html + parsed data)
  const contentAudits: Record<string, ReturnType<typeof auditContent>> = {};
  const geo: Record<string, ReturnType<typeof auditGEO>> = {};
  for (const page of urlData) {
    if (!page._html) continue;
    contentAudits[page.url] = auditContent(page, page._html);
    geo[page.url] = auditGEO(page);
  }

  const keywords = analyzeKeywords(urlData);
  const internalLinks = analyzeInternalLinks(urlData);

  return {
    id,
    targetUrl: startUrls[0] ?? "",
    checkedAt: new Date().toISOString(),
    pages: paths.map((p) => ({ url: p.url, issues: p.issues })),
    summary: { seoScore, technicalScore, contentScore, totalPages: paths.length, issueCounts },
    priorityChecklist,
    contentAudits,
    keywords,
    internalLinks,
    geo,
    tookMs: Date.now() - started,
  };
}

/**
 * Gọi LLM (rotation 5 providers) để sinh checklist ưu tiên sửa lỗi từ issues.
 * Luôn trả về mảng — fallback heuristic nếu LLM không khả dụng.
 */
export async function generatePriorityChecklist(paths: PathData[], llm: ChatFn = chatWithRotation): Promise<string[]> {
  const grouped = new Map<
    string,
    { code: string; severity: Severity; message: string; pages: number }
  >();
  for (const path of paths) {
    for (const issue of path.issues) {
      const key = issue.code;
      const cur = grouped.get(key);
      if (cur) cur.pages++;
      else grouped.set(key, { code: issue.code, severity: issue.severity, message: issue.message, pages: 1 });
    }
  }

  const ranked = [...grouped.values()].sort(
    (a, b) => b.pages * WEIGHT[b.severity] - a.pages * WEIGHT[a.severity],
  );

  const fallback = ranked.slice(0, 10).map(
    (g) => `[${g.severity.toUpperCase()}] ${g.message} (ảnh hưởng ${g.pages} trang)`,
  );

  if (ranked.length === 0) return ["Không phát hiện vấn đề SEO kỹ thuật nào."];

  try {
    const system = `Bạn là chuyên gia Technical SEO. Dựa vào danh sách lỗi phát hiện khi audit website Eurowindow, hãy sinh MỘT checklist ưu tiên sửa lỗi, tối đa 10 mục, mỗi mục là một câu ngắn gọn, hành động cụ thể, sắp xếp theo mức độ ảnh hưởng. Không thêm chú thích, không đánh số đầu dòng quá dài. Chỉ trả về checklist.`;

    const user = ranked
      .slice(0, 20)
      .map((g) => `- [${g.severity}] ${g.code}: ${g.message} (${g.pages} trang)`)
      .join("\n");

    const result = await chatWithRotation(system, user);
    if (result.provider && result.content) {
      const lines = result.content
        .split("\n")
        .map((l) => l.replace(/^\s*[-*•\d.)]\s*/, "").trim())
        .filter(Boolean);
      if (lines.length > 0) return lines.slice(0, 12);
    }
  } catch {
    // fallback bên dưới
  }

  return fallback;
}
