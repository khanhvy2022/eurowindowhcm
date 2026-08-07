import { NextRequest } from "next/server";
import { checkPermission, unauthorized, forbidden } from "@/lib/auth";
import { getAudits, getAuditById } from "@/lib/seo/persistence";

export async function GET(request: NextRequest) {
  const auth = checkPermission(request, "dashboard:view");
  if (!auth) return checkPermission(request, "dashboard:view") === null ? unauthorized() : forbidden();
  const id = new URL(request.url).searchParams.get("id");
  if (id) {
    const audit = await getAuditById(id);
    if (!audit) return Response.json({ ok: false, error: "Không tìm thấy audit" }, { status: 404 });
    return Response.json({ ok: true, audit });
  }
  const audits = await getAudits(20);
  return Response.json({ ok: true, audits });
}
