import { describe, it, expect } from "vitest";
import { createToken, parseToken } from "../src/lib/auth";

describe("auth token", () => {
  describe("createToken + parseToken roundtrip", () => {
    it("admin token decodes correctly", () => {
      const token = createToken("admin", "admin");
      const parsed = parseToken(token);
      expect(parsed).toEqual({ username: "admin", role: "admin" });
    });

    it("editor token decodes correctly", () => {
      const token = createToken("editor1", "editor");
      const parsed = parseToken(token);
      expect(parsed).toEqual({ username: "editor1", role: "editor" });
    });

    it("viewer token decodes correctly", () => {
      const token = createToken("viewer1", "viewer");
      const parsed = parseToken(token);
      expect(parsed).toEqual({ username: "viewer1", role: "viewer" });
    });
  });

  describe("parseToken edge cases", () => {
    it("empty token returns null", () => {
      expect(parseToken("")).toBeNull();
    });

    it("invalid base64 returns null", () => {
      expect(parseToken("not-a-token!!!")).toBeNull();
    });

    it("valid base64 but not JSON returns null", () => {
      const token = Buffer.from("hello world").toString("base64");
      expect(parseToken(token)).toBeNull();
    });

    it("JSON without u/r fields returns null", () => {
      const token = Buffer.from(JSON.stringify({ x: 1 })).toString("base64");
      expect(parseToken(token)).toBeNull();
    });

    it("JSON with wrong types returns null", () => {
      const token = Buffer.from(JSON.stringify({ u: 123, r: true })).toString("base64");
      expect(parseToken(token)).toBeNull();
    });
  });
});
