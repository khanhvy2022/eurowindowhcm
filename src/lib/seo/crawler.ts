import { UrlData } from "./types";
import { parseHtml } from "./parser";

export type CrawlOptions = {
  startUrls: string[];
  maxPages?: number;
  delayMs?: number;
  concurrency?: number;
  fetchFn?: (url: string) => Promise<{ html: string; status: number; redirects: string[] }>;
};

/**
 * Crawl đơn giản: BFS theo link nội bộ, bỏ trùng, throttling mềm.
 * Mặc định dùng global fetch. Có thể inject fetchFn để test.
 */
export async function crawlSite(
  options: CrawlOptions,
): Promise<{ pages: Map<string, UrlData>; errors: { url: string; message: string }[] }> {
  const startUrls = [...new Set(options.startUrls)];
  const maxPages = options.maxPages ?? 50;
  const delayMs = options.delayMs ?? 150;
  const concurrency = options.concurrency ?? 4;
  const fetchFn = options.fetchFn ?? defaultFetch;

  const visited = new Map<string, UrlData>();
  const errors: { url: string; message: string }[] = [];
  const queue: string[] = startUrls;
  const enqueued = new Set<string>(startUrls);

  while (queue.length > 0 && visited.size < maxPages) {
    const batch = queue.splice(0, concurrency);
    await Promise.all(
      batch.map(async (url) => {
        if (visited.has(url)) return;
        try {
          const res = await fetchFn(url);
          const data = parseHtml(res.html, url);
          visited.set(url, { ...data, url, status: res.status, redirects: res.redirects, _html: res.html });
          // enqueue internal links chưa thăm để BFS sâu hơn
          if (visited.size < maxPages) {
            for (const link of data.internalLinks) {
              const normalized = normalizeUrl(link);
              if (!enqueued.has(normalized) && queue.length + visited.size < maxPages) {
                enqueued.add(normalized);
                queue.push(normalized);
              }
            }
          }
        } catch (err) {
          errors.push({ url, message: err instanceof Error ? err.message : String(err) });
        }
      }),
    );
    if (delayMs > 0 && visited.size < maxPages && queue.length > 0) {
      await sleep(delayMs);
    }
  }

  return { pages: visited, errors };
}

export function normalizeUrl(url: string): string {
  try {
    const u = new URL(url);
    u.hash = "";
    return u.href;
  } catch {
    return url;
  }
}

export function toAbsolute(url: string, base: string): string {
  try {
    return new URL(url, base).href;
  } catch {
    return url;
  }
}

export async function defaultFetch(
  url: string,
): Promise<{ html: string; status: number; redirects: string[] }> {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Eurowindow-SEO-Audit/1.0 (+https://eurowindowhcm.local)",
      Accept: "text/html",
    },
    redirect: "follow",
    signal: AbortSignal.timeout(15000),
  });
  const html = await res.text();
  return { html, status: res.status, redirects: [] };
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
