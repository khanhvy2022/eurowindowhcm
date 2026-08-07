import { NextRequest } from "next/server";
import { checkPermission, unauthorized, forbidden } from "@/lib/auth";
import { generateContent, type ContentRequest } from "@/lib/seo/content_gen";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const auth = checkPermission(request, "seo:audit:run");
  if (!auth) return checkPermission(request, "seo:audit:run") === null ? unauthorized() : forbidden();

  let body: ContentRequest;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }

  const topic = String(body?.topic ?? "").trim();
  if (!topic) {
    return Response.json({ ok: false, error: "Thiếu chủ đề" }, { status: 400 });
  }

  try {
    const result = await generateContent(body);
    return Response.json({ ok: true, ...result });
  } catch (err) {
    return Response.json(
      { ok: false, error: err instanceof Error ? err.message : "Lỗi server" },
      { status: 500 },
    );
  }
}
