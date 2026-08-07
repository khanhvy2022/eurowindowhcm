import { AuditResult } from "./types";
import { chatWithRotation, type ChatFn } from "@/lib/llm";
import { runAudit } from "./audit";
import { crawlSite } from "./crawler";
import { suggestOptimizedContent } from "./content";

export type SeoAssistantOptions = {
  llm?: ChatFn;
  audit?: (urls: string[], maxPages?: number) => Promise<AuditResult>;
};

export type AssistantResponse = {
  text: string;
  source: "command" | "llm" | "fallback";
  provider: string | null;
  ranAudit?: AuditResult;
};

const HELP = `Lệnh SEO khả dụng:
- /seo audit <url> — chạy audit kỹ thuật cho trang/domain
- /seo suggest <url> — đề xuất tối ưu tiêu đề, mô tả, nội dung cho 1 trang
- /seo checklist — xem checklist ưu tiên của lần audit gần nhất
- /seo help — danh sách lệnh này

Ví dụ: /seo audit https://eurowindow.vn/san-pham/cua-upvc`;

function summarizeAudit(a: AuditResult): string {
  const s = a.summary;
  const topIssues = a.priorityChecklist.slice(0, 5).map((i, idx) => `${idx + 1}. ${i}`);
  const keywords = a.keywords ?? [];
  const kwTop = keywords.slice(0, 5).map((k) => k.keyword).join(", ");
  const orphanCount = a.internalLinks?.orphanPages?.length ?? 0;
  const pillarCount = a.internalLinks?.pillarCandidates?.length ?? 0;
  return [
    `**Kết quả audit (${s.totalPages} trang):**`,
    `- SEO: ${s.seoScore}/100 | Kỹ thuật: ${s.technicalScore}/100 | Nội dung: ${s.contentScore}/100`,
    `- Lỗi: ${s.issueCounts.error} | Cảnh báo: ${s.issueCounts.warning} | Gợi ý: ${s.issueCounts.info}`,
    ``,
    `**Checklist ưu tiên:**`,
    ...(topIssues.length ? topIssues : ["Không có vấn đề nghiêm trọng."]),
    ``,
    `**Từ khóa tiềm năng (top 5):** ${kwTop || "chưa phân tích"}`,
    `**Internal link:** ${pillarCount} pillar đề xuất, ${orphanCount} trang mồ côi`,
  ].join("\n");
}

/**
 * AI SEO Assistant: hiểu câu hỏi tự nhiên + lệnh `/seo ...`.
 * Không cần DB — chạy audit theo yêu cầu (độc lập API route).
 */
export async function answerSeoQuestion(
  raw: string,
  opts: SeoAssistantOptions = {},
): Promise<AssistantResponse> {
  const message = raw.trim();
  const llm = opts.llm ?? chatWithRotation;
  const doAudit = opts.audit ?? ((urls: string[], maxPages = 20) => runAudit(urls, { maxPages, delayMs: 150, concurrency: 4 }, { llm }));

  // ---- Lệnh khai báo ----
  if (/^(\/seo\s+)?(help|\?)($|\s)/i.test(message) || (/^\/seo\b/i.test(message) && /\bhelp\b/i.test(message))) {
    return { text: HELP, source: "command", provider: null };
  }

  // ---- /seo suggest <url> ----
  const suggestMatch = message.match(/^\/seo\s+suggest\s+(.+)$/i) || message.match(/suggest\s+(https?:\/\/\S+)/i);
  if (suggestMatch) {
    const url = suggestMatch[1].trim().replace(/^["']|["']$/g, "");
    try {
      const { pages } = await crawlSite({ startUrls: [url], maxPages: 1, delayMs: 0, concurrency: 1 });
      const page = pages.get(url) ?? [...pages.values()][0];
      if (!page?._html) {
        return { text: `Không lấy được nội dung ${url}. Kiểm tra lại URL.`, source: "fallback", provider: null };
      }
      const suggestion = await suggestOptimizedContent(page, page._html, llm);
      return {
        text: [
          `**Đề xuất tối ưu cho ${url}**`,
          `- Tiêu đề: ${suggestion.title}`,
          `- Mô tả: ${suggestion.description}`,
          ``,
          `**Gợi ý nội dung:**`,
          ...suggestion.suggestions.map((s) => `- ${s}`),
        ].join("\n"),
        source: "llm",
        provider: null,
      };
    } catch (err) {
      return { text: `Lỗi khi tối ưu: ${err instanceof Error ? err.message : String(err)}`, source: "fallback", provider: null };
    }
  }

  // ---- /seo audit <url> ----
  const auditMatch = message.match(/^\/seo\s+audit\s+(.+)$/i) || message.match(/^audit\s+(https?:\/\/\S+)/i);
  if (auditMatch) {
    const url = auditMatch[1].trim().replace(/^["']|["']$/g, "");
    try {
      const audit = await doAudit([url]);
      return { text: summarizeAudit(audit), source: "command", provider: null, ranAudit: audit };
    } catch (err) {
      return { text: `Lỗi khi audit: ${err instanceof Error ? err.message : String(err)}`, source: "fallback", provider: null };
    }
  }

  // ---- Câu hỏi tự nhiên về SEO ----
  const system = `Bạn là chuyên gia SEO kỹ thuật cho website Eurowindow (cửa, vách kính, nội thất uPVC).
Trả lời ngắn gọn, hành động cụ thể bằng tiếng Việt. Nếu người dùng muốn chạy audit, hãy hướng dẫn dùng lệnh /seo audit <url>.
Nếu hỏi về cách cải thiện điểm SEO, đưa checklist ngắn gọn 5-7 mục.`;
  try {
    const res = await llm(system, message);
    if (res.provider && res.content) {
      return { text: res.content, source: "llm", provider: res.provider };
    }
  } catch {
    // fallback dưới
  }
  return {
    text: `Tôi chưa trả lời được câu hỏi SEO này. Thử dùng một lệnh:\n\n${HELP}`,
    source: "fallback",
    provider: null,
  };
}
