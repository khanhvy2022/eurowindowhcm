import { NextRequest } from "next/server";
import { getDb, COLLECTIONS } from "@/lib/db";
import { checkAuth, unauthorized } from "@/lib/auth";
import { ObjectId } from "mongodb";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!checkAuth(request)) return unauthorized();
  const db = await getDb();
  if (!db) return Response.json({ ok: false, error: "Chưa cấu hình MONGODB_URI" }, { status: 500 });
  try {
    const { slug } = await params;
    const body = await request.json();
    const update: Record<string, unknown> = {};
    for (const field of ["title", "category", "subCategory", "date", "excerpt", "image", "sections", "faq", "contentHtml"]) {
      if (body[field] !== undefined) update[field] = body[field];
    }
    update.updatedAt = new Date().toISOString();
    const result = await db
      .collection(COLLECTIONS.posts)
      .updateOne({ slug }, { $set: { ...update, slug } }, { upsert: true });
    return Response.json({ ok: true, id: result.upsertedId ? String(result.upsertedId) : undefined });
  } catch (err) {
    return Response.json({ ok: false, error: err instanceof Error ? err.message : "Lỗi server" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!checkAuth(request)) return unauthorized();
  const db = await getDb();
  if (!db) return Response.json({ ok: false, error: "Chưa cấu hình MONGODB_URI" }, { status: 500 });
  try {
    const { slug } = await params;
    const result = await db.collection(COLLECTIONS.posts).deleteOne({
      $or: [
        { slug },
        ...(ObjectId.isValid(slug) ? [{ _id: new ObjectId(slug) }] : []),
      ],
    });
    if (result.deletedCount === 0)
      return Response.json({ ok: false, error: "Không tìm thấy bài viết" }, { status: 404 });
    return Response.json({ ok: true });
  } catch (err) {
    return Response.json({ ok: false, error: err instanceof Error ? err.message : "Lỗi server" }, { status: 500 });
  }
}
