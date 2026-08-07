import { UrlData } from "./types";

export type Intent = "informational" | "commercial" | "transactional" | "navigational";

export type KeywordOpportunity = {
  keyword: string;
  intent: Intent;
  volume: number; // proxy (tần suất trên site, 0 = unknown)
  difficulty: number; // 0-100 proxy
  pages: string[]; // trang có liên quan
  cluster: string;
  gap: "missing" | "weak" | "covered";
};

const VIETNAMESE_STOPWORDS = new Set(
  "và|của|cho|được|với|hơn|này|là|ở|trên|để|theo|tại|trong|khi|một|như|đã|các|không|từ|f|để|tại".split("|"),
);

const INTSET_KEYWORDS = new Set(["mua", "giá", "báo giá", "mua ngay", "mua sắm", "mua tại", "mua online"]);
const COMMKEY_KEYWORDS = new Set(["so sánh", "so sánh", "lợi thế", "đánh giá", "review", "ưu điểm", "nhược điểm", "chọn"]);
const NAV_KEYWORDS = new Set(["giới thiệu", "về chúng tôi", "contact", "liên hệ", "địa chỉ", "showroom", "chi nhánh"]);

export function classifyIntent(keyword: string): Intent {
  const lower = keyword.toLowerCase();
  if ([...NAV_KEYWORDS].some((k) => lower.includes(k))) return "navigational";
  if ([...INTSET_KEYWORDS].some((k) => lower.includes(k))) return "transactional";
  if ([...COMMKEY_KEYWORDS].some((k) => lower.includes(k))) return "commercial";
  if (lower.includes("?") || ["tại sao", "làm sao", "cách", "như nào", "ai", "khi nào"].some((k) => lower.includes(k)))
    return "informational";
  return "informational";
}

/**
 * Phân tích từ khóa từ nội dung trang (proxy term frequency).
 * Dùng cho site chưa có GSC — khi có GSC sẽ gộp dữ liệu queries thực tế.
 */
export function analyzeKeywords(pages: UrlData[]): KeywordOpportunity[] {
  const termPages = new Map<string, Set<string>>();
  const termFreq = new Map<string, number>();

  for (const page of pages) {
    const tokens = tokenize(page.title + " " + (page.metaDescription ?? "") + " " + page.h1.join(" "));
    for (const token of tokens) {
      if (token.length < 3 || VIETNAMESE_STOPWORDS.has(token)) continue;
      termFreq.set(token, (termFreq.get(token) ?? 0) + 1);
      const set = termPages.get(token) ?? new Set();
      set.add(page.url);
      termPages.set(token, set);
    }
  }

  // cụm từ 2-3 từ (bigrams/trigrams) quan trọng hơn
  for (const page of pages) {
    const joined = (page.title + " " + page.metaDescription).toLowerCase();
    const tokens = joined.split(/[^a-z0-9à-ỹ\s]/).filter((t) => t.length > 1);
    for (let i = 0; i < tokens.length - 1; i++) {
      const bigram = [tokens[i], tokens[i + 1]].join(" ");
      if (VIETNAMESE_STOPWORDS.has(tokens[i]) || VIETNAMESE_STOPWORDS.has(tokens[i + 1])) continue;
      const freq = (termFreq.get(bigram) ?? 0) + 1;
      termFreq.set(bigram, freq);
      const set = termPages.get(bigram) ?? new Set();
      set.add(page.url);
      termPages.set(bigram, set);
    }
  }

  const ranked = [...termFreq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 40);
  return ranked.map(([term, freq]) => {
    const pages_ = [...(termPages.get(term) ?? new Set())];
    const intent = classifyIntent(term);
    const cluster = clusterTerm(term, intent);
    return {
      keyword: term,
      intent,
      volume: freq * 10, // proxy
      difficulty: clamp(100 - freq * 5, 5, 95),
      pages: pages_,
      cluster,
      gap: pages_.length >= 2 ? "covered" : pages_.length === 1 ? "weak" : "missing",
    };
  });
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

function clusterTerm(term: string, _intent: Intent): string {
  const lower = term.toLowerCase();
  if (lower.includes("cửa") || lower.includes("upvc") || lower.includes("nhôm") || lower.includes("kinh")) return "Sản phẩm";
  if (lower.includes("giá") || lower.includes("mua") || lower.includes("báo giá")) return "Thương mại";
  if (lower.includes("liên hệ") || lower.includes("hotline") || lower.includes("showroom")) return "Liên hệ";
  return "Chung";
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}
