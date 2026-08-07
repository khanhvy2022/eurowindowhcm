import { UrlData, AuditIssue } from "./types";
import { chatWithRotation } from "@/lib/llm";

export type ContentAudit = {
  url: string;
  wordCount: number;
  paragraphCount: number;
  sentenceCount: number;
  headingDepth: number;
  h1ToH2Balance: string;
  internalLinks: number;
  externalLinks: number;
  listOrTable: boolean;
  avgSentenceLength: number;
  eeatScore: number;
  readability: "good" | "ok" | "hard";
  helpfulness: "yes" | "no";
  issues: AuditIssue[];
};

const EEAT_KEYWORDS = [
  "kinh nghiệm", "chuyên gia", "theo đó", "nghiên cứu", "khẳng định",
  "được chứng minh", "theo", "giới thiệu", "tại sao", "vì sao",
];

function splitSentences(text: string): string[] {
  // tách câu dựa trên dấu câu tiếng Việt/Anh
  return text
    .split(/(?<=[.!?…])\s+(?=[A-ZÀ-Ỹ])/g)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function extractSentencesFromHtml(html: string): string[] {
  const body = html
    .replace(/<(script|style|noscript)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  const paragraphs = body
    .split("</p>")
    .map((p) => p.replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/gi, " ").replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const out: string[] = [];
  for (const p of paragraphs) {
    out.push(...splitSentences(p));
  }
  return out;
}

function readabilityScore(avgWordPerSentence: number, complex: number, total: number): "good" | "ok" | "hard" {
  // proxy: trung bình < 20 từ/câu và % từ phức < 40% → good
  if (total === 0) return "hard";
  const ratio = complex / total;
  if (avgWordPerSentence < 22 && ratio < 0.35) return "good";
  if (avgWordPerSentence < 28 && ratio < 0.5) return "ok";
  return "hard";
}

function eeatProxy(text: string): number {
  let score = 50;
  const lower = text.toLowerCase();
  for (const kw of EEAT_KEYWORDS) {
    if (lower.includes(kw)) score += 3;
  }
  if (text.length > 2000) score += 5;
  if (text.length < 500) score -= 10;
  // từ "chúng tôi/tôi" là dấu author presence
  const firstPerson = (lower.match(/\b(tôi|chúng tôi|bọn mình)\b/g) || []).length;
  if (firstPerson >= 1) score += 5;
  return Math.max(0, Math.min(100, score));
}

export function auditContent(url: UrlData, html: string): ContentAudit {
  const sentences = extractSentencesFromHtml(html);
  const sentenceCount = sentences.length;
  const wordCount = url.wordCount;

  // độ dài câu trung bình (tính theo từ)
  const avgSentenceLength = sentenceCount
    ? Math.round(sentences.reduce((sum, s) => sum + s.split(/\s+/).length, 0) / sentenceCount)
    : wordCount;

  // từ phức (>2 syllable-ish proxy bằng độ dài từ trung bình)
  const allWords = html
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/[^A-Za-zÀ-Ỹ\s]/gi, " ")
    .split(/\s+/)
    .filter((w) => w.length > 6);
  const complex = allWords.length;
  const totalWords = wordCount <= 0 ? 1 : wordCount;

  const readability = readabilityScore(avgSentenceLength, complex, sentenceCount || 1);
  const eeatScore = eeatProxy(
    html
      .replace(/<(script|style|noscript)[\s\S]*?<\/\1>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&[a-z]+;/gi, " "),
  );

  const headingDepth = Math.max(0, ...url.headings.map((h) => parseInt(h.tag.slice(1), 10) || 0));
  const paragraphCount = html.split("</p>").length - 1;
  const listOrTable = /<(ul|ol|table)\b/i.test(html);
  const helpfulness: "yes" | "no" = wordCount >= 300 && sentenceCount >= 3 && url.h1.length >= 1 ? "yes" : "no";

  const issues: AuditIssue[] = [];
  if (wordCount < 300) issues.push({ code: "thin_content", severity: "warning", message: `Nội dung mỏng (~${wordCount} từ), nên ≥ 300 từ` });
  if (url.h1.length === 0) issues.push({ code: "missing_h1", severity: "error", message: "Thiếu H1" });
  if (sentenceCount < 3) issues.push({ code: "short_content", severity: "warning", message: `Chỉ ${sentenceCount} câu, nên phong phú hơn` });
  if (readability === "hard") issues.push({ code: "readability_hard", severity: "warning", message: `Độ khó đọc cao (avg ${avgSentenceLength} từ/câu)` });
  if (url.internalLinks.length < 3) issues.push({ code: "few_internal_links", severity: "info", message: `${url.internalLinks.length} liên kết nội bộ, nên ≥ 3` });
  if (!listOrTable) issues.push({ code: "no_list_table", severity: "info", message: "Nên dùng danh sách/bảng để cấu trúc thông tin" });

  return {
    url: url.url,
    wordCount,
    paragraphCount: Math.max(0, paragraphCount),
    sentenceCount,
    headingDepth,
    h1ToH2Balance: `H1: ${url.h1.length}, H2: ${url.headings.filter((h) => h.tag === "h2").length}`,
    internalLinks: url.internalLinks.length,
    externalLinks: url.externalLinks.length,
    listOrTable,
    avgSentenceLength,
    eeatScore,
    readability,
    helpfulness,
    issues,
  };
}

const CONTENT_PROMPT = `Bạn là chuyên gia Content SEO. Dưới đây là bản tóm tắt audit nội dung của một trang Eurowindow.
Hãy sinh Phiên bản tối ưu của tiêu đề (meta title ≤60 ký tự), mô tả ngắn (≤155 ký tự), và gợp ý cải thiện nội dung: thêm mục H2, đề xuất thêm 2-3 câu hỏi thường gặp (FAQ), gợi ý từ khóa liên quan. Giữ đúng ngữ cảnh sản phẩm Eurowindow. Trả kết quả bằng tiếng Việt, định dạng ngắn gọn.`;

export async function suggestOptimizedContent(
  page: UrlData,
  html: string,
  llmOverride?: (system: string, user: string) => Promise<{ content: string; provider: string | null }>,
): Promise<{ title: string; description: string; suggestions: string[] }> {
  const audit = auditContent(page, html);
  const llm = llmOverride ?? (await import("@/lib/llm")).chatWithRotation;
  const user = `Trang: ${page.url}
Từ: ${audit.wordCount} | Câu: ${audit.sentenceCount} | Độ khó: ${audit.readability} | EEAT: ${audit.eeatScore}
H1: ${page.h1.join("; ")}
Title hiện tại: ${page.title ?? "(trống)"}
Description hiện tại: ${page.metaDescription ?? "(trống)"}
Internal links: ${audit.internalLinks} | External links: ${audit.externalLinks}
Vấn đề: ${audit.issues.map((i) => i.code).join(", ")}`;

  try {
    const res = await llm(CONTENT_PROMPT, user);
    const text = res.content;
    const title = (text.match(/(?:Title|Tiêu đề)[:\s]+[^\n]*/i)?.[0]?.split(/[:\s]/).slice(1).join(" ").trim()) ??
      (page.title ?? "").slice(0, 55);
    const description = (text.match(/(?:Description|Mô tả)[:\s]+[^\n]*/i)?.[0]?.split(/[:\s]/).slice(1).join(" ").trim()) ??
      (page.metaDescription ?? "").slice(0, 150);
    const suggestions = text
      .split("\n")
      .map((l) => l.replace(/^\s*[-*•]\s*/, "").trim())
      .filter((l) => l.length > 5 && !l.toLowerCase().startsWith("title") && !l.toLowerCase().startsWith("mô tả"));
    return { title: title.slice(0, 60), description: description.slice(0, 155), suggestions: suggestions.slice(0, 6) };
  } catch {
    return {
      title: (page.title ?? "").slice(0, 60),
      description: (page.metaDescription ?? "").slice(0, 155),
      suggestions: ["Đảm bảo H1 duy nhất và phản ánh rõ nội dung trang.", "Thêm FAQ để tăng rich snippets.", "Chèn từ khóa mục tiêu tự nhiên."],
    };
  }
}
