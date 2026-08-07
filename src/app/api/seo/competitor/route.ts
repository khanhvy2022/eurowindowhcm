import { NextRequest } from "next/server";
import { checkPermission, unauthorized, forbidden } from "@/lib/auth";
import { analyzeCompetitors } from "@/lib/seo/competitor";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const auth = checkPermission(request, "seo:audit:run");
  if (!auth) return checkPermission(request, "seo:audit:run") === null ? unauthorized() : forbidden();

  let body: { targetUrl?: string; competitors?: { url: string; title?: string; metaDescription?: string; h1?: string[]; wordCount?: number; schemaTypes?: string[] }[] };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }

  const targetUrl = String(body?.targetUrl ?? "").trim();
  if (!targetUrl) {
    return Response.json({ ok: false, error: "Thiếu targetUrl" }, { status: 400 });
  }

  const competitors = (body?.competitors ?? []).map((c) => ({
    url: c.url,
    title: c.title,
    metaDescription: c.metaDescription,
    h1: c.h1 ?? [],
    wordCount: c.wordCount ?? 0,
    schemaTypes: c.schemaTypes ?? [],
  }));

  try {
    const report = await analyzeCompetitors(targetUrl, competitors);
    return Response.json({ ok: true, report });
  } catch (err) {
    return Response.json(
      { ok: false, error: err instanceof Error ? err.message : "Lỗi server" },
      { status: 500 },
    );
  }
}
