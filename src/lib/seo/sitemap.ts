import { defaultFetch, normalizeUrl } from "./crawler";

export type SitemapUrl = {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
};

/**
 * Parse sitemap.xml (urlset) hoặc sitemap-index. Trả về danh sách URL.
 * Hỗ trợ cả gzip (.xml.gz) – dùng fetch bản thường (node 18+ tự giải nén qua fetch).
 */
export function parseSitemap(xml: string): SitemapUrl[] {
  const out: SitemapUrl[] = [];
  for (const m of xml.matchAll(/<url\b[^>]*>([\s\S]*?)<\/url>/gi)) {
    const block = m[1];
    const loc = (block.match(/<loc[^>]*>([^<]+)<\/loc>/i) ?? [])[1];
    if (!loc) continue;
    out.push({
      loc: loc.trim(),
      lastmod: (block.match(/<lastmod[^>]*>([^<]+)<\/lastmod>/i) ?? [])[1]?.trim(),
      changefreq: (block.match(/<changefreq[^>]*>([^<]+)<\/changefreq>/i) ?? [])[1]?.trim(),
      priority: (block.match(/<priority[^>]*>([^<]+)<\/priority>/i) ?? [])[1]?.trim(),
    });
  }
  return out;
}

export function isSitemapIndex(xml: string): boolean {
  return /<sitemapindex/i.test(xml);
}

/** Trích xuất URL sitemap con từ sitemap-index. */
export function parseSitemapIndex(xml: string): string[] {
  const out: string[] = [];
  for (const m of xml.matchAll(/<sitemap\b[^>]*>([\s\S]*?)<\/sitemap>/gi)) {
    const loc = (m[1].match(/<loc[^>]*>([^<]+)<\/loc>/i) ?? [])[1];
    if (loc) out.push(loc.trim());
  }
  return out;
}

/** Parse robots.txt tìm tham chiếu sitemap. */
export function parseRobotsSitemaps(robots: string): string[] {
  const out: string[] = [];
  for (const line of robots.split(/\r?\n/)) {
    const m = line.match(/^sitemap:\s*(.+)$/i);
    if (m) out.push(m[1].trim());
  }
  return out;
}

export type DiscoverOptions = {
  maxUrls?: number;
  fetchFn?: (url: string) => Promise<{ text: string; status: number }>;
};

const DEFAULT_FETCH = async (url: string) => {
  const res = await defaultFetch(url);
  return { text: res.html, status: res.status };
};

/**
 * Khám phá URL từ sitemap.xml và/hoặc robots.txt của một domain.
 * Trả về danh sách URL đã normalize + duy nhất.
 */
export async function discoverUrls(
  origin: string,
  options: DiscoverOptions = {},
): Promise<{ urls: string[]; sitemap: string[] }> {
  const maxUrls = options.maxUrls ?? 200;
  const fetchFn = options.fetchFn ?? DEFAULT_FETCH;
  const found: string[] = [];

  // 1) robots.txt
  try {
    const robots = await fetchFn(`${origin.replace(/\/$/, "")}/robots.txt`);
    const sitemaps = parseRobotsSitemaps(robots.text);
    for (const sm of sitemaps) {
      const urls = await fetchSitemap(sm, fetchFn, maxUrls);
      pushDedupe(found, urls, maxUrls);
      if (found.length >= maxUrls) break;
    }
  } catch {
    // robots không có / lỗi → bỏ qua
  }

  // 2) sitemap.xml mặc định
  if (found.length < maxUrls) {
    const urls = await fetchSitemap(`${origin.replace(/\/$/, "")}/sitemap.xml`, fetchFn, maxUrls);
    pushDedupe(found, urls, maxUrls);
  }

  // 3) sitemap-index mặc định (dạng sitemap-index.xml)
  if (found.length < maxUrls) {
    const idx = await safeFetch(`${origin.replace(/\/$/, "")}/sitemap-index.xml`, fetchFn);
    if (idx) {
      const children = parseSitemapIndex(idx.text);
      for (const child of children) {
        const urls = await fetchSitemap(child, fetchFn, maxUrls);
        pushDedupe(found, urls, maxUrls);
        if (found.length >= maxUrls) break;
      }
    }
  }

  return { urls: found, sitemap: await sitemapIndexList(origin, fetchFn) };
}

function pushDedupe(target: string[], items: string[], max: number) {
  for (const item of items) {
    const url = normalizeUrl(item);
    if (!target.includes(url) && target.length < max) target.push(url);
  }
}

async function safeFetch(url: string, fetchFn: (u: string) => Promise<{ text: string; status: number }>): Promise<{ text: string; status: number } | null> {
  try {
    const res = await fetchFn(url);
    return res.status === 200 ? res : null;
  } catch {
    return null;
  }
}

async function fetchSitemap(
  url: string,
  fetchFn: (u: string) => Promise<{ text: string; status: number }>,
  maxUrls: number,
): Promise<string[]> {
  const res = await safeFetch(url, fetchFn);
  if (!res) return [];
  // nếu là index, đệ quy lấy sitemap con
  if (isSitemapIndex(res.text)) {
    const out: string[] = [];
    for (const child of parseSitemapIndex(res.text)) {
      const urls = await fetchSitemap(child, fetchFn, maxUrls);
      pushDedupe(out, urls, maxUrls);
      if (out.length >= maxUrls) break;
    }
    return out;
  }
  return parseSitemap(res.text).map((s) => s.loc);
}

/** Trả về danh sách sitemap (đọc từ robots + mặc định) — dùng để render UI. */
async function sitemapIndexList(origin: string, fetchFn: (u: string) => Promise<{ text: string; status: number }>): Promise<string[]> {
  const list: string[] = [];
  try {
    const robots = await fetchFn(`${origin.replace(/\/$/, "")}/robots.txt`);
    list.push(...parseRobotsSitemaps(robots.text));
  } catch {}
  list.push(`${origin.replace(/\/$/, "")}/sitemap.xml`);
  return [...new Set(list)];
}
