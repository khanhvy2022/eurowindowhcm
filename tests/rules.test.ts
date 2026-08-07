import { describe, it, expect } from "vitest";
import { auditAll, auditPage, buildContext, scorePage } from "../src/lib/seo/rules";
import { UrlData } from "../src/lib/seo/types";

function makePage(over: Partial<UrlData> = {}): UrlData {
  return {
    url: "https://eurowindow.biz/trang",
    title: "Tiêu đề chuẩn 60 ký tự",
    metaDescription: "Mô tả meta chuẩn cho trang, đủ dài từ 70 ký tự trở lên để vượt ngưỡng kiểm tra.",
    canonical: "https://eurowindow.biz/trang",
    robots: "index",
    relPrev: undefined,
    relNext: undefined,
    ogTitle: "OG Title",
    ogImage: "https://eurowindow.biz/og.jpg",
    ogType: "website",
    twitterCard: "summary_large_image",
    h1: ["Tiêu đề H1"],
    headings: [{ tag: "h2", text: "Phần 1" }],
    wordCount: 500,
    htmlLang: "vi",
    schemaTypes: ["Organization"],
    images: [{ src: "/a.jpg", alt: "anh", hasAlt: true }],
    internalLinks: ["https://eurowindow.biz/san-pham"],
    externalLinks: [],
    status: 200,
    redirects: [],
    ...over,
  };
}

const emptyCtx = buildContext([]);

describe("auditPage - issues", () => {
  it("không phát hiện issue trên trang chuẩn", () => {
    expect(auditPage(makePage(), emptyCtx)).toEqual([]);
  });

  it("phát hiện thiếu title", () => {
    const issues = auditPage(makePage({ title: undefined }), emptyCtx);
    expect(issues.some((i) => i.code === "missing_title")).toBe(true);
  });

  it("phát hiện thiếu meta description", () => {
    const issues = auditPage(makePage({ metaDescription: undefined }), emptyCtx);
    expect(issues.some((i) => i.code === "missing_description")).toBe(true);
  });

  it("phát hiện thiếu H1", () => {
    const issues = auditPage(makePage({ h1: [] }), emptyCtx);
    expect(issues.some((i) => i.code === "missing_h1")).toBe(true);
  });

  it("phát hiện ảnh thiếu alt", () => {
    const issues = auditPage(makePage({ images: [{ src: "/x.jpg", alt: "", hasAlt: false }] }), emptyCtx);
    expect(issues.some((i) => i.code === "missing_image_alt")).toBe(true);
  });

  it("phát hiện thin content", () => {
    const issues = auditPage(makePage({ wordCount: 100 }), emptyCtx);
    expect(issues.some((i) => i.code === "thin_content")).toBe(true);
  });

  it("phát hiện thiếu schema", () => {
    const issues = auditPage(makePage({ schemaTypes: [] }), emptyCtx);
    expect(issues.some((i) => i.code === "missing_schema")).toBe(true);
  });
});

describe("duplicate detection", () => {
  it("phát hiện duplicate title giữa 2 trang", () => {
    const a = makePage({ url: "https://eurowindow.biz/a", title: "Trùng tiêu đề" });
    const b = makePage({ url: "https://eurowindow.biz/b", title: "Trùng tiêu đề" });
    const ctx = buildContext([a, b]);
    const issuesB = auditPage(b, ctx);
    expect(issuesB.some((i) => i.code === "duplicate_title")).toBe(true);
  });
});

describe("scorePage / auditAll", () => {
  it("trang chuẩn đạt điểm cao", () => {
    const { score } = scorePage(auditPage(makePage(), emptyCtx));
    expect(score).toBe(100);
  });

  it("auditAll tính điểm tổng hợp và đếm issue", () => {
    const bad = makePage({ title: undefined, h1: [], schemaTypes: [] });
    const res = auditAll([makePage(), bad]);
    expect(res.paths).toHaveLength(2);
    expect(res.issueCounts.error).toBeGreaterThanOrEqual(2);
    expect(res.seoScore).toBeTypeOf("number");
  });
});
