import { NextRequest } from "next/server";
import { checkPermission, unauthorized, forbidden } from "@/lib/auth";
import { getAuditById, getAudits } from "@/lib/seo/persistence";
import { auditToCsv, issuesToCsv, keywordsToCsv } from "@/lib/seo/export";

export const dynamic = "force-dynamic";

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 60) || "seo";
}

export async function GET(request: NextRequest) {
  const auth = checkPermission(request, "seo:export:write");
  if (!auth) return checkPermission(request, "seo:export:write") === null ? unauthorized() : forbidden();

  const search = new URL(request.url).searchParams;
  const id = search.get("id");
  const type = search.get("type") ?? "issues";

  const audit = id ? await getAuditById(id) : (await getAudits(1))[0];
  if (!audit) {
    return Response.json({ ok: false, error: "Không tìm thấy audit để xuất" }, { status: 404 });
  }

  let csv = "";
  let filename = `seo_${sanitizeFilename(audit.targetUrl)}_${audit.id.slice(0, 8)}`;
  switch (type) {
    case "summary":
      csv = auditToCsv(audit);
      filename += "_summary";
      break;
    case "keywords":
      csv = keywordsToCsv(audit.keywords ?? []);
      filename += "_keywords";
      break;
    case "issues":
    default:
      csv = issuesToCsv(audit);
      filename += "_issues";
      break;
  }

  return new Response("\uFEFF" + csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
