import { getDb, COLLECTIONS } from "@/lib/db";
import { articles, type Article } from "@/app/tin-tuc/articles";

function toArticle(doc: Record<string, unknown>): Article {
  return {
    slug: String(doc.slug ?? ""),
    title: String(doc.title ?? ""),
    category: String(doc.category ?? ""),
    date: String(doc.date ?? ""),
    excerpt: String(doc.excerpt ?? ""),
    image: doc.image ? String(doc.image) : undefined,
    sections: Array.isArray(doc.sections) ? (doc.sections as Article["sections"]) : [],
    faq: doc.faq ? (doc.faq as Article["faq"]) : undefined,
    contentHtml: doc.contentHtml ? String(doc.contentHtml) : undefined,
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

export async function getPostBySlug(slug: string): Promise<Article | null> {
  try {
    const db = await getDb();
    if (db) {
      const doc = await db.collection(COLLECTIONS.posts).findOne({ slug });
      if (doc) return toArticle(doc as unknown as Record<string, unknown>);
    }
  } catch {
    // fallback static
  }
  return articles.find((a) => a.slug === slug) ?? null;
}
