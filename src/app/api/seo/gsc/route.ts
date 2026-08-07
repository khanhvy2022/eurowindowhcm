import { NextRequest } from "next/server";
import { checkPermission, unauthorized, forbidden } from "@/lib/auth";
import { getGscReport, isGscConfigured } from "@/lib/seo/gsc";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const auth = checkPermission(request, "dashboard:view");
  if (!auth) return checkPermission(request, "dashboard:view") === null ? unauthorized() : forbidden();

  if (!isGscConfigured()) {
    return Response.json({
      ok: false,
      error: "GSC chưa cấu hình. Cần set GSC_SITE_URL, GSC_CLIENT_ID, GSC_CLIENT_SECRET, GSC_REFRESH_TOKEN trong .env.local",
    }, { status: 503 });
  }

  const search = new URL(request.url).searchParams;
  const days = Math.min(Math.max(1, parseInt(search.get("days") ?? "28")), 90);

  try {
    const report = await getGscReport(days);
    if (!report) {
      return Response.json({ ok: false, error: "Không lấy được dữ liệu GSC" }, { status: 500 });
    }
    return Response.json({ ok: true, report });
  } catch (err) {
    return Response.json(
      { ok: false, error: err instanceof Error ? err.message : "Lỗi GSC API" },
      { status: 500 },
    );
  }
}
