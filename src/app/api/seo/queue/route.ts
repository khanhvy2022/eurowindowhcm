import { NextRequest } from "next/server";
import { checkPermission, unauthorized, forbidden } from "@/lib/auth";
import { createJob, getJob, getJobs } from "@/lib/seo/queue";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const auth = checkPermission(request, "dashboard:view");
  if (!auth) return checkPermission(request, "dashboard:view") === null ? unauthorized() : forbidden();

  const search = new URL(request.url).searchParams;
  const id = search.get("id");
  if (id) {
    const job = await getJob(id);
    if (!job) return Response.json({ ok: false, error: "Không tìm thấy job" }, { status: 404 });
    return Response.json({ ok: true, job });
  }
  const jobs = await getJobs(20);
  return Response.json({ ok: true, jobs });
}

export async function POST(request: NextRequest) {
  const auth = checkPermission(request, "seo:audit:run");
  if (!auth) return checkPermission(request, "seo:audit:run") === null ? unauthorized() : forbidden();

  let body: { urls?: string[]; maxPages?: number };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }

  const urls = Array.isArray(body?.urls)
    ? body.urls.filter((u: unknown) => typeof u === "string").map((s: string) => s.trim()).filter(Boolean)
    : [];
  const maxPages = typeof body?.maxPages === "number" ? Math.min(Math.max(1, body.maxPages), 100) : 30;

  if (urls.length === 0) {
    return Response.json({ ok: false, error: "Thiếu danh sách URL" }, { status: 400 });
  }

  const jobId = await createJob(urls, maxPages, auth.username);
  return Response.json({ ok: true, jobId, message: "Job đã được tạo và đang chạy nền" });
}
