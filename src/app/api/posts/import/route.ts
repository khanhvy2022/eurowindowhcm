import { NextRequest } from "next/server";
import { getDb, COLLECTIONS } from "@/lib/db";
import { checkAuth, unauthorized } from "@/lib/auth";
import { readdirSync, readFileSync, statSync } from "fs";
import { join, relative } from "path";

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

const ARTICLES_DIR = join(process.cwd(), "docs", "articles");

function scanDir(dir: string): string[] {
  const results: string[] = [];
  try {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      try {
        const stat = statSync(full);
        if (stat.isDirectory()) results.push(...scanDir(full));
        else if (entry.endsWith(".md")) results.push(full);
      } catch { /* skip */ }
    }
  } catch { /* dir doesn't exist */ }
  return results;
}

export async function POST(request: NextRequest) {
  if (!checkAuth(request)) return unauthorized();
  const db = await getDb();
  if (!db) return Response.json({ ok: false, error: "Chưa cấu hình MONGODB_URI" }, { status: 500 });

  try {
    const files = scanDir(ARTICLES_DIR);
    let imported = 0;
    let skipped = 0;
    let errors = 0;

    const categoryMap: Record<string, string> = {
      "du-an": "Dự án",
      "tin-tuc": "Tin tức",
      "san-pham": "Sản phẩm",
    };

    for (const filePath of files) {
      try {
        const raw = readFileSync(filePath, "utf-8");
        const { meta, body } = parseFrontmatter(raw);
        const relPath = relative(ARTICLES_DIR, filePath).replace(/\\/g, "/");
        const categoryDir = relPath.split("/")[0] || "khac";
        const fileSlug = relPath.replace(/\.md$/, "").split("/").pop() || "bai-viet";

        const slug = fileSlug;
        const title = meta.title || fileSlug;
        const category = meta.category || categoryMap[categoryDir] || categoryDir;
        const date = meta.date || "";
        const excerpt = meta.description || "";
        const image = meta.image || null;
        const sections = markdownToSections(body);

        const existing = await db.collection(COLLECTIONS.posts).findOne({ slug });
        if (existing) {
          skipped++;
          continue;
        }

        await db.collection(COLLECTIONS.posts).insertOne({
          slug,
          title,
          category,
          date,
          excerpt,
          image,
          sections,
          filePath: relPath,
          source: "file",
          createdAt: new Date().toISOString(),
        });
        imported++;
      } catch {
        errors++;
      }
    }

    return Response.json({ ok: true, imported, skipped, errors, total: files.length });
  } catch (err) {
    return Response.json({ ok: false, error: err instanceof Error ? err.message : "Lỗi import" }, { status: 500 });
  }
}
