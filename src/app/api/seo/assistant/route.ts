import { NextRequest } from "next/server";
import { checkPermission, unauthorized, forbidden } from "@/lib/auth";
import { answerSeoQuestion } from "@/lib/seo/assistant";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const auth = checkPermission(request, "seo:assistant:chat");
  if (!auth) return checkPermission(request, "seo:assistant:chat") === null ? unauthorized() : forbidden();

  let message = "";
  try {
    const body = await request.json();
    message = String(body?.message ?? "").trim();
  } catch {
    return Response.json({ ok: false, error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }

  if (!message) {
    return Response.json({ ok: false, error: "Thiếu câu hỏi" }, { status: 400 });
  }
  if (message.length > 2000) {
    return Response.json({ ok: false, error: "Câu hỏi quá dài (tối đa 2000 ký tự)" }, { status: 400 });
  }

  try {
    const answer = await answerSeoQuestion(message);
    return Response.json({ ok: true, ...answer });
  } catch (err) {
    return Response.json(
      { ok: false, error: err instanceof Error ? err.message : "Lỗi server" },
      { status: 500 },
    );
  }
}
