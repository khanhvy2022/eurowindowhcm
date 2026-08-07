import { UrlData } from "./types";

export type LinkSuggestion = {
  fromUrl: string;
  toUrl: string;
  anchorText: string;
  reason: string;
};

export type InternalLinkReport = {
  totalPages: number;
  orphanPages: string[];
  linkDepthMap: Map<string, number>;
  suggestions: LinkSuggestion[];
  pillarCandidates: string[];
};

/**
 * Phân tích đồ thị liên kết nội bộ: orphan pages, độ sâu, gợp ý anchor text.
 * orphan = trang không có bất kỳ ai link tới.
 */
export function analyzeInternalLinks(pages: UrlData[]): InternalLinkReport {
  const indegree = new Map<string, number>();
  const allUrls = new Set<string>();
  for (const p of pages) {
    allUrls.add(p.url);
    indegree.set(p.url, 0);
  }
  for (const p of pages) {
    for (const link of p.internalLinks) {
      const normalized = normalizeForCompare(link, p.url);
      if (allUrls.has(normalized) || normalized === p.url) {
        // chỉ tính link tới trang trong tập crawl được
      }
      if (indegree.has(normalized)) {
        indegree.set(normalized, (indegree.get(normalized) ?? 0) + 1);
      }
    }
  }

  const orphanPages: string[] = [];
  for (const url of allUrls) {
    if ((indegree.get(url) ?? 0) === 0) orphanPages.push(url);
  }

  // độ sâu: BFS từ trang chủ (URL ngắn nhất / "/")
  const depth = new Map<string, number>();
  const start = [...allUrls].sort((a, b) => a.length - b.length)[0];
  if (start) {
    depth.set(start, 0);
    const queue = [start];
    const adj = buildAdjacency(pages);
    while (queue.length > 0) {
      const cur = queue.shift()!;
      for (const next of adj.get(cur) ?? []) {
        if (!depth.has(next)) {
          depth.set(next, (depth.get(cur) ?? 0) + 1);
          queue.push(next);
        }
      }
    }
  }

  // gợi ý liên kết: trang có nhiều từ khóa chung → link tới
  const suggestions: LinkSuggestion[] = [];
  const termToPages = buildTermIndex(pages);
  for (const p of pages) {
    const terms = termsOf(p);
    for (const term of terms) {
      for (const other of termToPages.get(term) ?? []) {
        if (other === p.url) continue;
        if (p.internalLinks.some((l) => normalizeForCompare(l, p.url) === other)) continue;
        suggestions.push({
          fromUrl: p.url,
          toUrl: other,
          anchorText: term,
          reason: `Cùng chủ đề "${term}"`,
        });
      }
    }
  }
  // loại trùng + giới hạn
  const dedupe = dedupeSuggestions(suggestions);
  const pillarCandidates = findPillars(pages);

  return {
    totalPages: allUrls.size,
    orphanPages,
    linkDepthMap: depth,
    suggestions: dedupe.slice(0, 25),
    pillarCandidates,
  };
}

function buildAdjacency(pages: UrlData[]): Map<string, string[]> {
  const adj = new Map<string, string[]>();
  for (const p of pages) {
    const targets = p.internalLinks.map((l) => normalizeForCompare(l, p.url)).filter(Boolean);
    adj.set(p.url, [...new Set(targets)]);
  }
  return adj;
}

function normalizeForCompare(link: string, base: string): string {
  try {
    const u = new URL(link, base);
    u.hash = "";
    return u.href.replace(/\/$/, "");
  } catch {
    return link;
  }
}

function termsOf(p: UrlData): string[] {
  const text = (p.title + " " + (p.metaDescription ?? "") + " " + p.h1.join(" "))
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/[^a-z0-9à-ỹ]+/)
    .filter((t) => t.length > 2);
  return [...new Set(text)];
}

function buildTermIndex(pages: UrlData[]): Map<string, string[]> {
  const idx = new Map<string, string[]>();
  for (const p of pages) {
    for (const t of termsOf(p)) {
      (idx.get(t) ?? idx.set(t, []).get(t)!).push(p.url);
    }
  }
  return idx;
}

function dedupeSuggestions(suggestions: LinkSuggestion[]): LinkSuggestion[] {
  const seen = new Set<string>();
  const out: LinkSuggestion[] = [];
  for (const s of suggestions) {
    const key = `${s.fromUrl}->${s.toUrl}|${s.anchorText}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(s);
  }
  return out;
}

function findPillars(pages: UrlData[]): string[] {
  const candidates = pages.filter((p) => (p.internalLinks.length ?? 0) >= 5 && (p.wordCount ?? 0) >= 300);
  return candidates
    .sort((a, b) => (b.wordCount ?? 0) - (a.wordCount ?? 0))
    .slice(0, 5)
    .map((p) => p.url);
}
