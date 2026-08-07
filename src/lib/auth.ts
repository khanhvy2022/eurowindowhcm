import { NextRequest } from "next/server";
import { type Role, hasPermission, type Permission } from "./rbac";
import { getDb } from "./db";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "eurowindow2026";

export type AuthToken = {
  role: Role;
  username: string;
};

/**
 * Tạo token mới (base64 JSON).
 * Token format: base64({ u: username, r: role })
 * Legacy token (base64 `ew:${password}`) → admin role.
 */
export function createToken(username: string, role: Role): string {
  return Buffer.from(JSON.stringify({ u: username, r: role })).toString("base64");
}

/** Phân tích token, trả về AuthToken hoặc null. */
export function parseToken(token: string): AuthToken | null {
  if (!token) return null;

  // Legacy admin token: base64(`ew:${ADMIN_PASSWORD}`)
  const legacyExpected = Buffer.from(`ew:${ADMIN_PASSWORD}`).toString("base64");
  if (token === legacyExpected) {
    return { username: "admin", role: "admin" };
  }

  // New token format: base64({ u, r })
  try {
    const decoded = JSON.parse(Buffer.from(token, "base64").toString());
    if (decoded && typeof decoded.u === "string" && typeof decoded.r === "string") {
      return { username: decoded.u, role: decoded.r as Role };
    }
  } catch {
    // not a valid token
  }

  return null;
}

/** Kiểm tra request có authenticated + có permission cần thiết không. */
export function checkAuth(request: NextRequest): boolean {
  const auth = request.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  const pwdHeader = request.headers.get("x-admin-password") ?? "";
  if (pwdHeader === ADMIN_PASSWORD || token === ADMIN_PASSWORD) return true;
  return parseToken(token) !== null;
}

/** Kiểm tra permission trên request. */
export function checkPermission(request: NextRequest, permission: Permission): AuthToken | null {
  const auth = request.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  const parsed = parseToken(token);
  if (!parsed) return null;
  if (!hasPermission(parsed.role, permission)) return null;
  return parsed;
}

export function unauthorized() {
  return Response.json({ ok: false, error: "Chưa xác thực" }, { status: 401 });
}

export function forbidden() {
  return Response.json({ ok: false, error: "Không có quyền truy cập" }, { status: 403 });
}
