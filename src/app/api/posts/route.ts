import { NextRequest } from "next/server";
import { getDb, COLLECTIONS } from "@/lib/db";
import { checkAuth, unauthorized } from "@/lib/auth";

type PostBody = {
  slug?: string;
  title?: string;
  category?: string;
  subCategory?: string;
  date?: string;
  excerpt?: string;
  image?: string;
  sections?: { heading: string; id: string; body: string[] }[];
  faq?: { q: string; a: string }[];
  contentHtml?: string;
};

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

function validate(body: PostBody): { ok: true; data: Record<string, unknown> } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "Dữ liệu không hợp lệ" };
  const title = (body.title ?? "").trim();
  if (!title) return { ok: false, error: "Thiếu tiêu đề bài viết" };
  const category = (body.category ?? "").trim() || "Tin tức";
  const subCategory = (body.subCategory ?? "").trim();
  const slug = (body.slug ?? "").trim() || slugify(title);
  if (!/^[a-z0-9-]+$/.test(slug)) return { ok: false, error: "Slug chỉ gồm chữ thường, số và dấu gạch ngang" };
  const date = (body.date ?? "").trim() || new Date().toLocaleDateString("vi-VN");
  const sections = Array.isArray(body.sections)
    ? body.sections
        .filter((s) => s?.heading && Array.isArray(s?.body))
        .map((s) => ({ heading: s.heading, id: s.id || slugify(s.heading), body: s.body }))
    : [];
  const faq = Array.isArray(body.faq)
    ? body.faq.filter((f) => f?.q && f?.a).map((f) => ({ q: f.q, a: f.a }))
    : undefined;
  const contentHtml = body.contentHtml ? String(body.contentHtml) : undefined;
  return {
    ok: true,
    data: {
      slug,
      title,
      category,
      subCategory: subCategory || undefined,
      date,
      excerpt: (body.excerpt ?? "").trim(),
      image: (body.image ?? "").trim() || null,
      sections,
      faq: faq && faq.length > 0 ? faq : undefined,
      contentHtml,
      updatedAt: new Date().toISOString(),
    },
  };
}

import { getAllPosts } from "@/lib/posts";

export async function GET(request: NextRequest) {
  try {
    const posts = await getAllPosts();
    const result = posts.map((p) => ({
      slug: p.slug,
      title: p.title,
      category: p.category,
      date: p.date,
      excerpt: p.excerpt,
      image: p.image,
      sections: p.sections,
      faq: p.faq,
      contentHtml: p.contentHtml,
      author: p.author,
    }));
    return Response.json({ posts: result, total: result.length });
  } catch (err) {
    return Response.json({ posts: [], error: err instanceof Error ? err.message : "Lỗi tải bài viết" });
  }
}

export async function POST(request: NextRequest) {
  if (!checkAuth(request)) return unauthorized();
  const db = await getDb();
  if (!db) return Response.json({ ok: false, error: "Chưa cấu hình MONGODB_URI" }, { status: 500 });
  try {
    const body = (await request.json()) as PostBody;
    const v = validate(body);
    if (!v.ok) return Response.json({ ok: false, error: v.error }, { status: 400 });
    const existing = await db.collection(COLLECTIONS.posts).findOne({ slug: v.data.slug });
    if (existing) return Response.json({ ok: false, error: `Slug "${v.data.slug}" đã tồn tại` }, { status: 409 });
    const result = await db.collection(COLLECTIONS.posts).insertOne({
      ...v.data,
      createdAt: new Date().toISOString(),
    });
    return Response.json({ ok: true, id: String(result.insertedId), slug: v.data.slug });
  } catch (err) {
    return Response.json({ ok: false, error: err instanceof Error ? err.message : "Lỗi server" }, { status: 500 });
  }
}
