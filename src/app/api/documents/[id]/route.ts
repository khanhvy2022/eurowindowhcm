import { NextRequest } from "next/server";
import { ObjectId } from "mongodb";
import { getDb, COLLECTIONS } from "@/lib/db";
import { checkAuth, unauthorized } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(request)) return unauthorized();

  const { id } = await params;
  const db = await getDb();
  if (!db) return Response.json({ ok: false, error: "Chưa kết nối DB" }, { status: 500 });

  try {
    const doc = await db.collection(COLLECTIONS.documents).findOne({ _id: new ObjectId(id) });
    if (!doc) return Response.json({ ok: false, error: "Không tìm thấy tài liệu" }, { status: 404 });

    return Response.json({
      ok: true,
      document: {
        id: String(doc._id),
        fileName: doc.fileName,
        fileSize: doc.fileSize,
        fileType: doc.fileType,
        title: doc.title,
        chunks: doc.chunks || [],
        totalChunks: doc.totalChunks || 0,
        extractedChars: doc.extractedChars || 0,
        enabled: doc.enabled !== false,
        uploadedAt: doc.uploadedAt,
      },
    });
  } catch (err) {
    return Response.json(
      { ok: false, error: err instanceof Error ? err.message : "ID tài liệu không hợp lệ" },
      { status: 400 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(request)) return unauthorized();

  const { id } = await params;
  const db = await getDb();
  if (!db) return Response.json({ ok: false, error: "Chưa kết nối DB" }, { status: 500 });

  try {
    const body = await request.json();
    const updateData: Record<string, unknown> = {};

    if (typeof body.enabled === "boolean") {
      updateData.enabled = body.enabled;
    }
    if (typeof body.title === "string" && body.title.trim()) {
      updateData.title = body.title.trim();
    }

    if (Object.keys(updateData).length === 0) {
      return Response.json({ ok: false, error: "Không có dữ liệu cập nhật" }, { status: 400 });
    }

    await db.collection(COLLECTIONS.documents).updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    return Response.json({ ok: true });
  } catch (err) {
    return Response.json(
      { ok: false, error: err instanceof Error ? err.message : "Lỗi cập nhật tài liệu" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(request)) return unauthorized();

  const { id } = await params;
  const db = await getDb();
  if (!db) return Response.json({ ok: false, error: "Chưa kết nối DB" }, { status: 500 });

  try {
    const res = await db.collection(COLLECTIONS.documents).deleteOne({ _id: new ObjectId(id) });
    if (res.deletedCount === 0) {
      return Response.json({ ok: false, error: "Tài liệu không tồn tại" }, { status: 404 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    return Response.json(
      { ok: false, error: err instanceof Error ? err.message : "Lỗi xóa tài liệu" },
      { status: 400 }
    );
  }
}
