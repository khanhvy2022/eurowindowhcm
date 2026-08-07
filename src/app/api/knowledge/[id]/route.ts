import { NextRequest } from "next/server";
import { getDb, COLLECTIONS } from "@/lib/db";
import { checkAuth, unauthorized } from "@/lib/auth";
import { ObjectId } from "mongodb";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAuth(request)) return unauthorized();
  const db = await getDb();
  if (!db) return Response.json({ ok: false, error: "Chưa cấu hình MONGODB_URI" }, { status: 500 });
  try {
    const { id } = await params;
    const body = await request.json();
    const update: Record<string, unknown> = {};
    for (const field of ["category", "keywords", "question", "answer"]) {
      if (body[field] !== undefined) update[field] = body[field];
    }
    const result = await db
      .collection(COLLECTIONS.knowledge)
      .updateOne({ _id: new ObjectId(id) }, { $set: update });
    if (result.matchedCount === 0)
      return Response.json({ ok: false, error: "Không tìm thấy mục" }, { status: 404 });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "Lỗi server" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAuth(request)) return unauthorized();
  const db = await getDb();
  if (!db) return Response.json({ ok: false, error: "Chưa cấu hình MONGODB_URI" }, { status: 500 });
  try {
    const { id } = await params;
    const result = await db.collection(COLLECTIONS.knowledge).deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0)
      return Response.json({ ok: false, error: "Không tìm thấy mục" }, { status: 404 });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "Lỗi server" }, { status: 500 });
  }
}
