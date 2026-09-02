import { getDb, COLLECTIONS } from "@/lib/db";
import { articles, type Article } from "@/app/tin-tuc/articles";

export function resolveArticleImage(image?: string | null, title = "", category = "", slug = ""): string {
  if (image && image.trim()) return image;
  const text = `${title} ${category} ${slug}`.toLowerCase();
  if (text.includes("gỗ") || text.includes("wood")) return "/uploads/diem-noi-bat-cua-cua-go-eurowindow.png";
  if (text.includes("cuốn") || text.includes("rolling")) return "/uploads/cua-cuon-eurowindow.jpg";
  if (text.includes("tự động") || text.includes("automatic")) return "/eurowindow/cua-tu-dong.jpg.webp";
  if (text.includes("upvc") || text.includes("nhựa")) return "/eurowindow/cuanhua1.jpg.webp";
  if (text.includes("kính") || text.includes("glass") || text.includes("low-e")) return "/eurowindow/san-pham-kinh.jpg.webp";
  if (text.includes("dự án") || text.includes("công trình") || text.includes("thi công")) return "/eurowindow/img-0344.jpeg.webp";
  if (text.includes("khuyến mãi") || text.includes("ưu đãi")) return "/eurowindow/ctkm-ea65ea68i-169-at-3x-large.png.webp";
  if (text.includes("nhôm") || text.includes("aluminium")) return "/uploads/cua-va-vach-nhom-kinh-eurowindow.jpg";
  return "/eurowindow/toa-dam-1.png.webp";
}

function cleanStyleAttr(styleVal: string): string {
  const protectedVal = styleVal.replace(/&quot;/g, "'");
  const declarations = protectedVal.split(";").map((d) => d.trim()).filter(Boolean);
  const kept: string[] = [];
  for (const d of declarations) {
    const colonIdx = d.indexOf(":");
    if (colonIdx === -1) continue;
    const prop = d.slice(0, colonIdx).trim().toLowerCase();
    const val = d.slice(colonIdx + 1).trim().toLowerCase();

    // Remove white or light backgrounds
    if (prop === "background" || prop === "background-color") {
      if (/white|#fff|rgb\(255|#f2|#e4|transparent|rgba\(255|0px 0px rgb\(255/i.test(val)) {
        continue;
      }
    }

    // Remove legacy font families
    if (prop === "font-family") {
      continue;
    }

    // Convert dark color to white or gold
    if (prop === "color") {
      if (/#1458a8|#1559a8|#0070c0/i.test(val)) {
        kept.push("color: #E2C275");
        continue;
      }
      if (/#000|#050505|#111|#131313|#1c1e21|#202020|#222|#252525|#272727|#333|#444|#505050|#555|#5f5f5f|#646464|#666|black|windowtext|rgb\(\s*(?:[0-9]{1,2}|100)\s*,\s*(?:[0-9]{1,2}|100)\s*,\s*(?:[0-9]{1,2}|100)\s*\)/i.test(val)) {
        kept.push("color: #ffffff");
        continue;
      }
    }

    kept.push(d);
  }
  return kept.join("; ");
}

export function cleanArticleHtml(html?: string): string | undefined {
  if (!html) return html;
  return html
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/\bstyle="([^"]*)"/gi, (_, val) => {
      const cleaned = cleanStyleAttr(val);
      return cleaned ? `style="${cleaned}"` : "";
    });
}

export function parseArticleDateToTimestamp(dateStr?: string | null): number {
  if (!dateStr || !dateStr.trim()) return 0;
  const s = dateStr.trim();

  // Try DD/MM/YYYY or DD-MM-YYYY (Vietnamese standard format)
  const dmyMatch = s.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})/);
  if (dmyMatch) {
    const day = parseInt(dmyMatch[1], 10);
    const month = parseInt(dmyMatch[2], 10) - 1;
    const year = parseInt(dmyMatch[3], 10);
    return new Date(Date.UTC(year, month, day)).getTime();
  }

  // Try YYYY-MM-DD or YYYY/MM/DD
  const ymdMatch = s.match(/^(\d{4})[/-](\d{1,2})[/-](\d{1,2})/);
  if (ymdMatch) {
    const year = parseInt(ymdMatch[1], 10);
    const month = parseInt(ymdMatch[2], 10) - 1;
    const day = parseInt(ymdMatch[3], 10);
    return new Date(Date.UTC(year, month, day)).getTime();
  }

  // Try standard ISO parse
  const isoTime = Date.parse(s);
  if (!isNaN(isoTime)) return isoTime;

  // Try Year only e.g. "2026"
  const yearMatch = s.match(/^(\d{4})$/);
  if (yearMatch) {
    return new Date(Date.UTC(parseInt(yearMatch[1], 10), 0, 1)).getTime();
  }

  return 0;
}

export function resolveArticleTimestamp(a: Partial<Article>): number {
  // STRICT RULE: Prioritize publishedAt, then date, then createdAt. NEVER updatedAt!
  if (a.publishedAt) {
    const t = parseArticleDateToTimestamp(a.publishedAt);
    if (t > 0) return t;
  }
  if (a.date) {
    const t = parseArticleDateToTimestamp(a.date);
    if (t > 0) return t;
  }
  if (a.createdAt) {
    const t = parseArticleDateToTimestamp(a.createdAt);
    if (t > 0) return t;
  }
  return 0;
}

function toArticle(doc: Record<string, unknown>): Article {
  const title = String(doc.title ?? "");
  const category = String(doc.category ?? "");
  const slug = String(doc.slug ?? "");
  const rawImage = doc.image ? String(doc.image) : undefined;
  return {
    slug,
    title,
    category,
    date: String(doc.date ?? ""),
    excerpt: String(doc.excerpt ?? ""),
    image: resolveArticleImage(rawImage, title, category, slug),
    sections: Array.isArray(doc.sections) ? (doc.sections as Article["sections"]) : [],
    faq: doc.faq ? (doc.faq as Article["faq"]) : undefined,
    contentHtml: doc.contentHtml ? cleanArticleHtml(String(doc.contentHtml)) : undefined,
    author: doc.author ? String(doc.author) : undefined,
    tags: Array.isArray(doc.tags) ? (doc.tags as string[]) : undefined,
    oldUrl: doc.oldUrl ? String(doc.oldUrl) : undefined,
    status: (doc.status as Article["status"]) || "published",
    publishedAt: doc.publishedAt ? String(doc.publishedAt) : doc.date ? String(doc.date) : doc.createdAt ? String(doc.createdAt) : undefined,
    createdAt: doc.createdAt ? String(doc.createdAt) : undefined,
    updatedAt: doc.updatedAt ? String(doc.updatedAt) : undefined,
    featured: Boolean(doc.featured),
  };
}

let cache: Article[] | null = null;
let cacheTime = 0;

/**
 * Danh sách bài viết: DB posts (nếu có) ghép với bài viết tĩnh có sẵn.
 * Có cache 60s để tránh gọi DB liên tục trên trang công khai.
 */
export async function getAllPosts(): Promise<Article[]> {
  const now = Date.now();
  if (cache && now - cacheTime < 60_000) return cache;

  let posts: Article[] = [];
  try {
    const db = await getDb();
    if (db) {
      const docs = await db
        .collection(COLLECTIONS.posts)
        .find({
          $or: [{ status: "published" }, { status: { $exists: false } }],
        })
        .sort({ publishedAt: -1, createdAt: -1 })
        .toArray();
      posts = docs.map((d) => toArticle(d as unknown as Record<string, unknown>));
    }
  } catch {
    // DB lỗi → dùng bài tĩnh
  }

  // ghép: DB trước, bài tĩnh bổ sung những slug chưa có
  const slugs = new Set(posts.map((p) => p.slug));
  const merged = [...posts, ...articles.filter((a) => !slugs.has(a.slug))];

  // Filter valid published articles
  const currentTime = Date.now();
  const publishedOnly = merged.filter((a) => {
    if (a.status === "draft" || a.status === "archived") return false;
    if (a.status === "scheduled" && a.publishedAt) {
      const pubTime = parseArticleDateToTimestamp(a.publishedAt);
      if (pubTime > currentTime) return false;
    }
    return true;
  });

  // Sort strictly by publishedAt/date DESC (NEVER updatedAt)
  publishedOnly.sort((a, b) => resolveArticleTimestamp(b) - resolveArticleTimestamp(a));

  cache = publishedOnly;
  cacheTime = now;
  return publishedOnly;
}

export interface GetLatestNewsOptions {
  limit?: number;
  category?: string;
  excludeSlug?: string;
}

export async function getLatestNews(options: GetLatestNewsOptions = {}): Promise<Article[]> {
  const { limit = 4, category, excludeSlug } = options;
  const all = await getAllPosts();

  let filtered = all;
  if (category && category !== "all") {
    filtered = filtered.filter((a) => a.category.toLowerCase().includes(category.toLowerCase()));
  }
  if (excludeSlug) {
    filtered = filtered.filter((a) => a.slug !== excludeSlug);
  }

  return filtered.slice(0, limit);
}

function normalizeSlug(s: string): string {
  return s
    .toLowerCase()
    .replace(/^(\/?p\/|\/?\d{4}\/\d{2}\/)?/, "")
    .replace(/\.html$/, "")
    .replace(/^\/+|\/+$/g, "")
    .replace(/^-+|-+$/g, "")
    .trim();
}

export async function getPostBySlug(rawSlug: string): Promise<Article | null> {
  const cleanSlug = normalizeSlug(rawSlug);
  try {
    const db = await getDb();
    if (db) {
      const doc = await db.collection(COLLECTIONS.posts).findOne({
        $or: [
          { slug: rawSlug },
          { slug: cleanSlug },
          { originalSlug: rawSlug },
          { originalSlug: cleanSlug },
          { oldUrl: { $regex: cleanSlug, $options: "i" } },
        ],
      });
      if (doc) return toArticle(doc as unknown as Record<string, unknown>);
    }
  } catch {
    // fallback static
  }

  // 1. Exact match on slug
  let match = articles.find((a) => a.slug === cleanSlug || a.slug === rawSlug);
  if (match) return match;

  // 2. Match on aliases / originalSlug / oldUrl / prefixes
  match = articles.find((a) => {
    const orig = (a as unknown as { originalSlug?: string }).originalSlug;
    if (orig && (orig === rawSlug || orig === cleanSlug || normalizeSlug(orig) === cleanSlug)) return true;
    const aliases = (a as unknown as { aliases?: string[] }).aliases;
    if (aliases && aliases.some((al) => al === rawSlug || al === cleanSlug || normalizeSlug(al) === cleanSlug)) return true;
    if (a.oldUrl && (a.oldUrl.includes(cleanSlug) || a.oldUrl.includes(rawSlug))) return true;
    if (cleanSlug.length > 5 && a.slug.includes(cleanSlug)) return true;
    if (cleanSlug.length > 5 && cleanSlug.includes(a.slug)) return true;
    return false;
  });

  return match ?? null;
}
