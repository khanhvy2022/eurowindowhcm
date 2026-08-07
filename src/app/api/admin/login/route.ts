import { NextRequest } from "next/server";
import { createToken } from "@/lib/auth";
import { getUser } from "@/lib/users";
import { type Role } from "@/lib/rbac";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  let body: { username?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }

  const username = String(body?.username ?? "").trim();
  const password = String(body?.password ?? "").trim();

  if (!username || !password) {
    return Response.json({ ok: false, error: "Thiếu username hoặc password" }, { status: 400 });
  }

  // Kiểm tra user trong DB
  const user = await getUser(username);
  if (user && user.password === password) {
    const token = createToken(username, user.role);
    return Response.json({ ok: true, token, role: user.role, username });
  }

  // Legacy admin login (password-based)
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "eurowindow2026";
  if (password === ADMIN_PASSWORD) {
    const token = createToken(username || "admin", "admin");
    return Response.json({ ok: true, token, role: "admin" as Role, username: username || "admin" });
  }

  return Response.json({ ok: false, error: "Sai username hoặc password" }, { status: 401 });
}
