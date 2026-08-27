import { NextRequest } from "next/server";
import { readdirSync, readFileSync, statSync } from "fs";
import { join, relative } from "path";
import { articles } from "@/app/tin-tuc/articles";

type Frontmatter = {
  title: string;
  description: string;
  category: string;
  date: string;
  keywords: string[];
  image?: string;
};

type PostFromFile = {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  sections: { heading: string; id: string; body: string[] }[];
  faq: { q: string; a: string }[];
  filePath: string;
  source: "file";
};

function parseFrontmatter(content: string): { meta: Partial<Frontmatter>; body: string } {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) return { meta: {}, body: content };
  const raw = match[1];
  const body = content.slice(match[0].length);
  const meta: Partial<Frontmatter> = {};
  for (const line of raw.split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let val = line.slice(colonIdx + 1).trim();
    if (val.startsWith("[") && val.endsWith("]")) {
      try { val = JSON.parse(val); } catch { /* keep string */ }
    }
    if (key === "title") meta.title = String(val).replace(/^["']|["']$/g, "");
    else if (key === "description") meta.description = String(val).replace(/^["']|["']$/g, "");
    else if (key === "category") meta.category = String(val).replace(/^["']|["']$/g, "");
    else if (key === "date") meta.date = String(val).replace(/^["']|["']$/g, "");
    else if (key === "keywords") meta.keywords = Array.isArray(val) ? val : String(val).replace(/[\[\]"]/g, "").split(",").map((s) => s.trim()).filter(Boolean);
    else if (key === "image") meta.image = String(val).replace(/^["']|["']$/g, "");
  }
  return { meta, body };
}

function markdownToSections(md: string): { heading: string; id: string; body: string[] }[] {
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
      const id = text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      current = { heading: text, id, body: [] };
    } else if (current) {
      current.body.push(line);
    }
  }
  if (current) sections.push(current);
  return sections;
}

function extractFaq(md: string): { q: string; a: string }[] {
  const faqs: { q: string; a: string }[] = [];
  const lines = md.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const boldMatch = lines[i].match(/^\*\*(.+?)\*\*\s*$/);
    if (boldMatch) {
      const q = boldMatch[1].trim().replace(/^\?\s*/, "");
      if (q && (q.endsWith("?") || q.endsWith("？"))) {
        const aLines: string[] = [];
        for (let j = i + 1; j < lines.length; j++) {
          if (lines[j].startsWith("## ") || lines[j].startsWith("**")) break;
          aLines.push(lines[j]);
        }
        const a = aLines.join("\n").trim();
        if (a) faqs.push({ q, a });
      }
    }
  }
  return faqs;
}

const ARTICLES_DIR = join(process.cwd(), "docs", "articles");

function scanDir(dir: string): string[] {
  const results: string[] = [];
  try {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      try {
        const stat = statSync(full);
        if (stat.isDirectory()) {
          results.push(...scanDir(full));
        } else if (entry.endsWith(".md")) {
          results.push(full);
        }
      } catch { /* skip */ }
    }
  } catch { /* dir doesn't exist */ }
  return results;
}

export async function GET(_request: NextRequest) {
  try {
    const posts: PostFromFile[] = [];
    const seenSlugs = new Set<string>();

    // 1. Add all static & migrated articles from eurowindowhcm.com
    for (const article of articles) {
      if (!article.slug || seenSlugs.has(article.slug)) continue;
      seenSlugs.add(article.slug);
      posts.push({
        slug: article.slug,
        title: article.title || article.slug,
        category: article.category || "Tin tức",
        date: article.date || "",
        excerpt: article.excerpt || "",
        image: article.image || "",
        sections: article.sections || [],
        faq: article.faq || [],
        filePath: "src/data/migrated-articles.json",
        source: "file",
      });
    }

    // 2. Add any additional markdown articles from docs/articles
    const files = scanDir(ARTICLES_DIR);
    for (const filePath of files) {
      try {
        const raw = readFileSync(filePath, "utf-8");
        const { meta, body } = parseFrontmatter(raw);
        const relPath = relative(ARTICLES_DIR, filePath).replace(/\\/g, "/");
        const categoryDir = relPath.split("/")[0] || "khac";
        const categoryMap: Record<string, string> = {
          "du-an": "Dự án",
          "tin-tuc": "Tin tức",
          "san-pham": "Sản phẩm",
        };
        const fileSlug = relPath.replace(/\.md$/, "").split("/").pop() || "bai-viet";

        if (seenSlugs.has(fileSlug)) continue;
        seenSlugs.add(fileSlug);

        posts.push({
          slug: fileSlug,
          title: meta.title || fileSlug,
          category: meta.category || categoryMap[categoryDir] || categoryDir,
          date: meta.date || "",
          excerpt: meta.description || "",
          image: meta.image || "",
          sections: markdownToSections(body),
          faq: extractFaq(body),
          filePath: relPath,
          source: "file",
        });
      } catch { /* skip broken file */ }
    }

    posts.sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0));
    return Response.json({ ok: true, posts, total: posts.length });
  } catch (err) {
    return Response.json({ ok: false, error: err instanceof Error ? err.message : "Lỗi đọc file", posts: [] }, { status: 500 });
  }
}

