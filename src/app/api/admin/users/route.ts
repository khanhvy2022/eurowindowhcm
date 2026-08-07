import { NextRequest } from "next/server";
import { checkAuth, unauthorized, createToken } from "@/lib/auth";
import { getUsers, createUser, deleteUser, updateUserRole } from "@/lib/users";
import { type Role, ALL_ROLES } from "@/lib/rbac";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!checkAuth(request)) return unauthorized();
  const users = await getUsers();
  return Response.json({ ok: true, users });
}

export async function POST(request: NextRequest) {
  if (!checkAuth(request)) return unauthorized();

  let body: { username?: string; password?: string; role?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }

  const username = String(body?.username ?? "").trim();
  const password = String(body?.password ?? "").trim();
  const role = String(body?.role ?? "viewer") as Role;

  if (!username || !password) {
    return Response.json({ ok: false, error: "Thiếu username hoặc password" }, { status: 400 });
  }
  if (!ALL_ROLES.includes(role)) {
    return Response.json({ ok: false, error: "Role không hợp lệ" }, { status: 400 });
  }

  const ok = await createUser(username, password, role);
  if (!ok) {
    return Response.json({ ok: false, error: "Username đã tồn tại hoặc lỗi DB" }, { status: 409 });
  }
  return Response.json({ ok: true, message: `Đã tạo user ${username} (${role})` });
}

export async function DELETE(request: NextRequest) {
  if (!checkAuth(request)) return unauthorized();

  const search = new URL(request.url).searchParams;
  const username = search.get("username");
  if (!username) {
    return Response.json({ ok: false, error: "Thiếu username" }, { status: 400 });
  }

  await deleteUser(username);
  return Response.json({ ok: true, message: `Đã xóa user ${username}` });
}

export async function PATCH(request: NextRequest) {
  if (!checkAuth(request)) return unauthorized();

  let body: { username?: string; role?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }

  const username = String(body?.username ?? "").trim();
  const role = String(body?.role ?? "") as Role;

  if (!username || !ALL_ROLES.includes(role)) {
    return Response.json({ ok: false, error: "Thiếu username hoặc role không hợp lệ" }, { status: 400 });
  }

  await updateUserRole(username, role);
  return Response.json({ ok: true, message: `Đã cập nhật ${username} → ${role}` });
}
