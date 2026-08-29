import { NextRequest } from "next/server";
import { checkAuth, unauthorized } from "@/lib/auth";
import { parseDocument, chunkText } from "@/lib/documentParser";
import { getAllDocuments, saveDocument } from "@/lib/documentStore";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!checkAuth(request)) return unauthorized();

  try {
    const docs = await getAllDocuments();
    return Response.json({
      ok: true,
      documents: docs.map((d) => ({
        id: d.id || d._id,
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
      { ok: false, error: err instanceof Error ? err.message : "Lỗi tải danh sách tài liệu" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!checkAuth(request)) return unauthorized();

  try {
    const contentType = request.headers.get("content-type") || "";

    let fileName = "";
    let fileSize = 0;
    let fileType = "";
    let customTitle: string | undefined = undefined;
    let rawText = "";
    let buffer: Buffer | null = null;

    if (contentType.includes("application/json")) {
      const body = await request.json();
      fileName = String(body.fileName || "tai-lieu.txt");
      fileSize = Number(body.fileSize || 0);
      fileType = String(body.fileType || fileName.split(".").pop() || "txt");
      customTitle = (body.title ? String(body.title).trim() : undefined);
      rawText = String(body.text || "").trim();
    } else {
      const formData = await request.formData();
      const file = formData.get("file") as File | null;
      customTitle = (formData.get("title") as string | null) || undefined;

      if (!file) {
        return Response.json({ ok: false, error: "Vui lòng chọn file tài liệu" }, { status: 400 });
      }

      fileName = file.name;
      fileSize = file.size;
      fileType = file.name.split(".").pop()?.toLowerCase() || "";

      const arrayBuffer = await file.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    }

    let parsed;
    if (rawText) {
      const chunks = chunkText(rawText);
      parsed = {
        fileName,
        fileSize: fileSize || rawText.length,
        fileType: fileType || "txt",
        title: customTitle?.trim() || fileName.replace(/\.[^/.]+$/, ""),
        chunks,
        totalChunks: chunks.length,
        extractedChars: rawText.length,
      };
    } else if (buffer) {
      parsed = await parseDocument(buffer, fileName, customTitle);
    } else {
      return Response.json({ ok: false, error: "Không tìm thấy dữ liệu file" }, { status: 400 });
    }

    if (parsed.totalChunks === 0 || parsed.extractedChars === 0) {
      return Response.json(
        { ok: false, error: "Không tìm thấy nội dung văn bản hợp lệ trong file (hoặc file PDF quét dạng ảnh/bị khóa)" },
        { status: 400 }
      );
    }

    // Lưu vào documentStore (tự động lưu vào MongoDB hoặc memory cache)
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

    const insertedId = await saveDocument(docData);

    return Response.json({
      ok: true,
      id: insertedId,
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
