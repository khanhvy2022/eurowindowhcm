import { NextRequest } from "next/server";
import { getDb, COLLECTIONS } from "@/lib/db";
import { checkAuth, unauthorized } from "@/lib/auth";
import { parseDocument } from "@/lib/documentParser";

export async function GET(request: NextRequest) {
  if (!checkAuth(request)) return unauthorized();

  const db = await getDb();
  if (!db) return Response.json({ ok: true, documents: [] });

  try {
    const docs = await db
      .collection(COLLECTIONS.documents)
      .find({})
      .sort({ uploadedAt: -1 })
      .project({ chunks: 0 }) // Không tải mảng chunks lớn khi chỉ lấy danh sách
      .toArray();

    return Response.json({
      ok: true,
      documents: docs.map((d) => ({
        id: String(d._id),
        fileName: d.fileName,
        fileSize: d.fileSize,
        fileType: d.fileType,
        title: d.title,
        totalChunks: d.totalChunks,
        extractedChars: d.extractedChars,
        enabled: d.enabled !== false,
        uploadedAt: d.uploadedAt,
      })),
    });
  } catch (err) {
    return Response.json(
      { ok: false, error: err instanceof Error ? err.message : "Lỗi server" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!checkAuth(request)) return unauthorized();

  const db = await getDb();
  if (!db) {
    return Response.json({ ok: false, error: "Chưa cấu hình cơ sở dữ liệu MongoDB" }, { status: 500 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const customTitle = (formData.get("title") as string | null) || undefined;

    if (!file) {
      return Response.json({ ok: false, error: "Vui lòng chọn file tài liệu" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Bóc tách nội dung và chia nhỏ thành các chunks
    const parsed = await parseDocument(buffer, file.name, customTitle);

    if (parsed.totalChunks === 0 || parsed.extractedChars === 0) {
      return Response.json(
        { ok: false, error: "Không tìm thấy nội dung văn bản hợp lệ trong file" },
        { status: 400 }
      );
    }

    // Lưu vào collection documents
    const docData = {
      fileName: parsed.fileName,
      fileSize: parsed.fileSize,
      fileType: parsed.fileType,
      title: parsed.title,
      chunks: parsed.chunks,
      totalChunks: parsed.totalChunks,
      extractedChars: parsed.extractedChars,
      enabled: true,
      uploadedAt: new Date().toISOString(),
    };

    const result = await db.collection(COLLECTIONS.documents).insertOne(docData);

    return Response.json({
      ok: true,
      id: String(result.insertedId),
      fileName: parsed.fileName,
      title: parsed.title,
      totalChunks: parsed.totalChunks,
      extractedChars: parsed.extractedChars,
    });
  } catch (err) {
    console.error("[documents POST] Upload error:", err);
    return Response.json(
      { ok: false, error: err instanceof Error ? err.message : "Lỗi xử lý file tài liệu" },
      { status: 500 }
    );
  }
}
