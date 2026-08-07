export type Role = "admin" | "editor" | "viewer";

export type Permission =
  | "seo:audit:run"
  | "seo:export:write"
  | "seo:assistant:chat"
  | "users:manage"
  | "audit:view"
  | "dashboard:view";

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  admin: [
    "seo:audit:run",
    "seo:export:write",
    "seo:assistant:chat",
    "users:manage",
    "audit:view",
    "dashboard:view",
  ],
  editor: [
    "seo:audit:run",
    "seo:export:write",
    "seo:assistant:chat",
    "audit:view",
    "dashboard:view",
  ],
  viewer: ["audit:view", "dashboard:view"],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function getPermissions(role: Role): Permission[] {
  return ROLE_PERMISSIONS[role] ?? [];
}

export const ALL_ROLES: Role[] = ["admin", "editor", "viewer"];
