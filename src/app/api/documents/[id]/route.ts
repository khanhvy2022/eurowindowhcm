import { NextRequest } from "next/server";
import { checkAuth, unauthorized } from "@/lib/auth";
import { deleteDocument, toggleDocument, getAllDocuments } from "@/lib/documentStore";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(request)) return unauthorized();

  const { id } = await params;
  try {
    const docs = await getAllDocuments();
    const doc = docs.find((d: any) => d.id === id || d._id === id);
    if (!doc) return Response.json({ ok: false, error: "Không tìm thấy tài liệu" }, { status: 404 });

    return Response.json({
      ok: true,
      document: {
        id: doc.id || doc._id,
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
  try {
    const body = await request.json();
    if (typeof body.enabled === "boolean") {
      await toggleDocument(id, body.enabled);
    }
    return Response.json({ ok: true });
  } catch (err) {
    return Response.json(
      { ok: false, error: err instanceof Error ? err.message : "Lỗi cập nhật tài liệu" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(request)) return unauthorized();

  const { id } = await params;
  try {
    await deleteDocument(id);
    return Response.json({ ok: true, message: "Đã xóa tài liệu thành công" });
  } catch (err) {
    return Response.json(
      { ok: false, error: err instanceof Error ? err.message : "Lỗi xóa tài liệu" },
      { status: 500 }
    );
  }
}
