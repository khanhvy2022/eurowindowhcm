import { NextRequest } from "next/server";
import { checkPermission, unauthorized, forbidden } from "@/lib/auth";
import { runPsi, isPsiConfigured } from "@/lib/seo/psi";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const auth = checkPermission(request, "dashboard:view");
  if (!auth) return checkPermission(request, "dashboard:view") === null ? unauthorized() : forbidden();

  if (!isPsiConfigured()) {
    return Response.json({
      ok: false,
      error: "PageSpeed Insights chưa cấu hình. Cần set PAGESPEED_API_KEY trong .env.local",
    }, { status: 503 });
  }

  const search = new URL(request.url).searchParams;
  const url = search.get("url");
  if (!url) {
    return Response.json({ ok: false, error: "Thiếu ?url=" }, { status: 400 });
  }

  const strategy = (search.get("strategy") ?? "mobile") as "mobile" | "desktop";

  try {
    const result = await runPsi(url, strategy);
    return Response.json({ ok: true, result });
  } catch (err) {
    return Response.json(
      { ok: false, error: err instanceof Error ? err.message : "Lỗi PSI" },
      { status: 500 },
    );
  }
}
