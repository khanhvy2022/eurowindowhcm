import { describe, it, expect } from "vitest";
import { hasPermission, getPermissions, ALL_ROLES, type Role, type Permission } from "../src/lib/rbac";

describe("rbac", () => {
  describe("hasPermission", () => {
    it("admin has all permissions", () => {
      const perms: Permission[] = [
        "seo:audit:run",
        "seo:export:write",
        "seo:assistant:chat",
        "users:manage",
        "audit:view",
        "dashboard:view",
      ];
      for (const p of perms) {
        expect(hasPermission("admin", p)).toBe(true);
      }
    });

    it("editor cannot manage users", () => {
      expect(hasPermission("editor", "users:manage")).toBe(false);
    });

    it("editor can run audit and export", () => {
      expect(hasPermission("editor", "seo:audit:run")).toBe(true);
      expect(hasPermission("editor", "seo:export:write")).toBe(true);
      expect(hasPermission("editor", "seo:assistant:chat")).toBe(true);
    });

    it("viewer can only view", () => {
      expect(hasPermission("viewer", "dashboard:view")).toBe(true);
      expect(hasPermission("viewer", "audit:view")).toBe(true);
      expect(hasPermission("viewer", "seo:audit:run")).toBe(false);
      expect(hasPermission("viewer", "seo:export:write")).toBe(false);
      expect(hasPermission("viewer", "seo:assistant:chat")).toBe(false);
      expect(hasPermission("viewer", "users:manage")).toBe(false);
    });

    it("unknown role returns false", () => {
      expect(hasPermission("hacker" as Role, "dashboard:view")).toBe(false);
    });
  });

  describe("getPermissions", () => {
    it("admin gets 6 permissions", () => {
      expect(getPermissions("admin")).toHaveLength(6);
    });

    it("editor gets 5 permissions", () => {
      expect(getPermissions("editor")).toHaveLength(5);
    });

    it("viewer gets 2 permissions", () => {
      expect(getPermissions("viewer")).toHaveLength(2);
    });

    it("unknown role returns empty", () => {
      expect(getPermissions("hacker" as Role)).toEqual([]);
    });
  });

  describe("ALL_ROLES", () => {
    it("contains 3 roles", () => {
      expect(ALL_ROLES).toEqual(["admin", "editor", "viewer"]);
    });
  });
});
