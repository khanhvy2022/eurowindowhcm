import { UrlData } from "./types";

/**
 * Bộ phân tích HTML tối giản (không phụ thuộc DOM thư viện bên ngoài).
 * Đủ dữ liệu cho Technical SEO Audit: meta, heading, ảnh, link, schema.
 */

function attrValue(attrs: string, name: string): string | undefined {
  const re = new RegExp(`(?:^|\\s)${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i");
  const m = attrs.match(re);
  return m ? (m[1] ?? m[2] ?? m[3]) : undefined;
}

export function parseHtml(html: string, baseUrl: string): Omit<UrlData, "url" | "status"> {
  const lower = html;

  const titleMatch = lower.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? clean(titleMatch[1]) : undefined;

  const descMatch = lower.match(
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>|<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["'][^>]*>/i,
  );
  const metaDescription = descMatch ? clean(descMatch[1] ?? descMatch[2]) : undefined;

  const canonicalMatch = lower.match(/<link[^>]+rel=["']canonical["'][^>]*>|<link[^>]*canonical[^>]*>/i);
  let canonical: string | undefined;
  if (canonicalMatch) {
    const abs = canonicalMatch[0].match(/href=["']([^"']+)["']/i);
    canonical = abs ? abs[1] : undefined;
  }

  const robots = meta(lower, "robots");
  const relPrev = linkRelHref(lower, "prev");
  const relNext = linkRelHref(lower, "next");

  const ogTitle = metaProperty(lower, "og:title");
  const ogImage = metaProperty(lower, "og:image");
  const ogType = metaProperty(lower, "og:type");
  const twitterCard = meta(lower, "twitter:card");

  const htmlLang = (lower.match(/<html[^>]*lang=["']([^"']+)["']/i) ?? [])[1];

  const h1 = [...lower.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)]
    .map((m) => clean(m[1]))
    .filter(Boolean);

  const headings: UrlData["headings"] = [];
  for (const tag of ["h1", "h2", "h3", "h4", "h5", "h6"]) {
    const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi");
    for (const m of lower.matchAll(re)) headings.push({ tag, text: clean(m[1]) });
  }

  // word count: đếm từ trong toàn bộ text
  const bodyText = lower
    .replace(/<(script|style|noscript)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ");
  const wordCount = bodyText.split(" ").filter((w) => /[a-zA-Z0-9\u00C0-\u1EF9]/.test(w)).length;

  const images: UrlData["images"] = [];
  for (const m of lower.matchAll(/<img[^>]*>/gi)) {
    const tag = m[0];
    const src = attrValue(tag, "src");
    const alt = attrValue(tag, "alt");
    if (!src || src.startsWith("data:")) continue;
    images.push({ src, alt: alt ?? "", hasAlt: Boolean(alt && alt.trim()) });
  }

  const schemaTypes = [...lower.matchAll(/"@type"\s*:\s*"([^"]+)"/g)].map((x) => x[1]);

  const internalLinks: string[] = [];
  const externalLinks: string[] = [];
  const u = new URL(baseUrl);
  for (const m of lower.matchAll(/<a[^>]+href=["']([^"']+)["'][^>]*>/gi)) {
    const href = m[1];
    if (!href || href.startsWith("#") || href.startsWith("tel:") || href.startsWith("mailto:")) continue;
    if (href.startsWith("javascript:")) continue;
    const resolved = new URL(href, baseUrl).href;
    if (resolved.startsWith(u.origin)) {
      internalLinks.push(resolved);
    } else {
      externalLinks.push(resolved);
    }
  }

  return {
    title,
    metaDescription,
    canonical,
    robots,
    relPrev,
    relNext,
    ogTitle,
    ogImage,
    ogType,
    twitterCard,
    h1,
    headings,
    wordCount,
    htmlLang,
    schemaTypes,
    images,
    internalLinks,
    externalLinks,
    redirects: [],
  };
}

function clean(s: string): string {
  return s
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function meta(lower: string, name: string): string | undefined {
  const re = new RegExp(
    `<meta[^>]+(?:name|property)=["']${name}["'][^>]+content=["']([^"']*)["'][^>]*>|<meta[^>]+content=["']([^"']*)["'][^>]+(?:name|property)=["']${name}["'][^>]*>`,
    "i",
  );
  const m = lower.match(re);
  return m ? clean(m[1] ?? m[2]) : undefined;
}

function metaProperty(lower: string, prop: string): string | undefined {
  return meta(lower, prop);
}

function linkRelHref(lower: string, rel: string): string | undefined {
  const re = new RegExp(`<link[^>]+rel=["']${rel}["'][^>]+href=["']([^"']+)["']`, "i");
  const m = lower.match(re);
  return m ? m[1] : undefined;
}
