import { NextRequest } from "next/server";
import { checkPermission, unauthorized, forbidden } from "@/lib/auth";
import { runAudit } from "@/lib/seo/audit";
import { saveAudit } from "@/lib/seo/persistence";

const ISOLATED = true; // nếu true: chỉ audit URL user truyền, không BFS lan ra (an toàn)

export async function POST(request: NextRequest) {
  const auth = checkPermission(request, "seo:audit:run");
  if (!auth) return checkPermission(request, "seo:audit:run") === null ? unauthorized() : forbidden();

  let urls: string[] = [];
  let maxPages = 30;
  try {
    const body = await request.json();
    if (Array.isArray(body?.urls)) urls = body.urls.filter((u: unknown) => typeof u === "string").map((s: string) => s.trim()).filter(Boolean);
    if (typeof body?.maxPages === "number") maxPages = Math.min(Math.max(1, body.maxPages), 100);
  } catch {
    return Response.json({ ok: false, error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }

  if (urls.length === 0) {
    return Response.json({ ok: false, error: "Thiếu danh sách URL cần audit" }, { status: 400 });
  }

  try {
    const result = await runAudit(urls, {
      maxPages,
      delayMs: 150,
      concurrency: 4,
    });
    // lưu nền (không chặn response)
    void saveAudit(result);
    return Response.json({ ok: true, result });
  } catch (err) {
    return Response.json(
      { ok: false, error: err instanceof Error ? err.message : "Lỗi khi chạy audit" },
      { status: 500 },
    );
  }
}
