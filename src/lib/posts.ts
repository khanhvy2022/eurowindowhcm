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
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
      posts = docs.map((d) => toArticle(d as unknown as Record<string, unknown>));
    }
  } catch {
    // DB lỗi → dùng bài tĩnh
  }

  // ghép: DB trước, bài tĩnh bổ sung những slug chưa có
  const slugs = new Set(posts.map((p) => p.slug));
  const merged = [...posts, ...articles.filter((a) => !slugs.has(a.slug))];
  cache = merged;
  cacheTime = now;
  return merged;
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
