import { existsSync, readdirSync, readFileSync } from "fs";
import { join } from "path";
import { getDb, COLLECTIONS } from "@/lib/db";

export type SanPhamSection = { heading: string; id: string; body: string[] };
export type SanPhamArticle = {
  slug: string;
  title: string;
  bannerTitle: string;
  label: string;
  date: string;
  excerpt: string;
  image?: string;
  sections: SanPhamSection[];
};

const ARTICLES = join(process.cwd(), "docs", "articles", "san-pham");

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function parseFrontmatter(content: string) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) return { meta: {} as Record<string, string>, body: content };
  const raw = match[1];
  const body = content.slice(match[0].length);
  const meta: Record<string, string> = {};
  for (const line of raw.split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const val = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, "");
    meta[key] = val;
  }
  return { meta, body };
}

function markdownToSections(md: string) {
  const lines = md.split("\n");
  const sections: { heading: string; id: string; body: string[] }[] = [];
  let current: { heading: string; id: string; body: string[] } | null = null;

  for (const line of lines) {
    const h2 = line.match(/^## (.+)$/);
    const h3 = line.match(/^### (.+)$/);
    const heading = h2 || h3;
    if (heading) {
      if (current) sections.push(current);
      const text = heading[1].trim();
      const id = slugify(text).replace(/^-|-$/g, "") || "section-" + sections.length;
      current = { heading: text, id, body: [] };
    } else if (current) {
      const t = line.trim();
      if (t) current.body.push(line.replace(/^\s*[-•]\s*/, "- ").trim());
    }
  }
  if (current) sections.push(current);
  return sections;
}

export function listSanPhamSlugs(): string[] {
  try {
    if (!existsSync(ARTICLES)) return [];
    return readdirSync(ARTICLES)
      .filter((f: string) => f.endsWith(".md"))
      .map((f: string) => f.replace(/\.md$/, ""));
  } catch {
    return [];
  }
}

export function readSanPhamFile(slug: string): SanPhamArticle | null {
  const file = join(ARTICLES, slug + ".md");
  if (!existsSync(file)) return null;
  try {
    const raw = readFileSync(file, "utf-8");
    const { meta, body } = parseFrontmatter(raw);
    const date = meta.date ?? "";
    const excerpt = meta.description ?? "";
    const image = meta.image || undefined;
    return {
      slug,
      title: meta.title || slug,
      bannerTitle: (meta.bannerTitle || meta.title || slug).toUpperCase(),
      label: meta.label || "",
      date,
      excerpt,
      image,
      sections: markdownToSections(body),
    };
  } catch {
    return null;
  }
}

export async function getSanPhamArticle(slug: string, label: string, defaultBannerTitle = slug.toUpperCase()): Promise<SanPhamArticle | null> {
  let article = readSanPhamFile(slug);
  if (!article) return null;

  article.label = label;
  article.bannerTitle = article.bannerTitle || defaultBannerTitle;

  try {
    const db = await getDb();
    if (db) {
      const doc = await db.collection(COLLECTIONS.posts).findOne({ slug }) as Record<string, unknown> | null;
      if (doc) {
        if (doc.title) article.title = String(doc.title);
        if (doc.excerpt && typeof doc.excerpt === "string") article.excerpt = doc.excerpt;
        if (Array.isArray(doc.sections)) article.sections = doc.sections as SanPhamSection[];
      }
    }
  } catch {
    // DB unavailable - dùng dữ liệu file
  }

  return article;
}