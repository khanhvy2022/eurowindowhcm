import { describe, it, expect } from "vitest";
import {
  issuesToCsv,
  keywordsToCsv,
  internalLinksToCsv,
  geoToCsv,
  auditToCsv,
} from "../src/lib/seo/export";
import type { AuditResult } from "../src/lib/seo/types";
import type { KeywordOpportunity } from "../src/lib/seo/keyword";
import type { InternalLinkReport } from "../src/lib/seo/internal_link";
import type { GeoReport } from "../src/lib/seo/geo";

const mockAudit: AuditResult = {
  id: "test-1",
  targetUrl: "https://eurowindow.biz",
  checkedAt: "2026-08-03T00:00:00Z",
  pages: [
    {
      url: "https://eurowindow.biz/",
      issues: [
        { code: "MISSING_META_DESC", severity: "warning", message: "Thiếu meta description" },
        { code: "OK_TITLE", severity: "info", message: "Title OK" },
      ],
    },
  ],
  summary: {
    seoScore: 80,
    technicalScore: 85,
    contentScore: 75,
    totalPages: 1,
    issueCounts: { error: 0, warning: 1, info: 1 },
  },
  priorityChecklist: [],
  tookMs: 500,
};

const mockKeywords: KeywordOpportunity[] = [
  {
    keyword: "cửa uPVC",
    volume: 42,
    intent: "commercial",
    difficulty: 35,
    pages: [],
    gap: "covered",
    cluster: "sản phẩm",
  },
];

const mockInternalLinks: InternalLinkReport = {
  totalPages: 1,
  pillarCandidates: ["https://eurowindow.biz/san-pham"],
  orphanPages: ["https://eurowindow.biz/lien-he"],
  linkDepthMap: new Map([["https://eurowindow.biz/", 0]]),
  suggestions: [
    {
      fromUrl: "https://eurowindow.biz/",
      toUrl: "https://eurowindow.biz/san-pham",
      anchorText: "Xem sản phẩm",
      reason: "thiếu internal link",
    },
  ],
};

const mockGeo: Record<string, GeoReport> = {
  "https://eurowindow.biz/": {
    url: "https://eurowindow.biz/",
    aiVisibilityScore: 70,
    entityCompleteness: 65,
    knowledgeCoverage: 60,
    citationQuality: 75,
    semanticRichness: 72,
    structuredDataScore: 80,
    answerQuality: 68,
    providers: [],
    recommendations: ["Thêm Organization schema"],
  },
};

describe("export", () => {
  it("issuesToCsv has header + rows", () => {
    const csv = issuesToCsv(mockAudit);
    const lines = csv.split("\n");
    expect(lines[0]).toContain("URL");
    expect(lines[0]).toContain("Mức độ");
    expect(lines.length).toBe(3); // header + 2 issues
  });

  it("keywordsToCsv has header + data", () => {
    const csv = keywordsToCsv(mockKeywords);
    const lines = csv.split("\n");
    expect(lines[0]).toContain("Từ khóa");
    expect(lines[1]).toContain("cửa uPVC");
  });

  it("internalLinksToCsv includes pillar, orphan, suggestions", () => {
    const csv = internalLinksToCsv(mockInternalLinks);
    expect(csv).toContain("pillar");
    expect(csv).toContain("orphan");
    expect(csv).toContain("suggestion");
    expect(csv).toContain("Xem sản phẩm");
  });

  it("geoToCsv has header + data", () => {
    const csv = geoToCsv(mockGeo);
    const lines = csv.split("\n");
    expect(lines[0]).toContain("AI Visibility");
    expect(lines[1]).toContain("70");
  });

  it("auditToCsv combines everything", () => {
    const csv = auditToCsv(mockAudit);
    expect(csv).toContain("Mã audit");
    expect(csv).toContain("test-1");
    expect(csv).toContain("Điểm SEO");
    expect(csv).toContain("80");
  });

  it("handles empty data gracefully", () => {
    const emptyAudit: AuditResult = {
      ...mockAudit,
      pages: [],
      summary: { ...mockAudit.summary, issueCounts: { error: 0, warning: 0, info: 0 } },
    };
    const csv = issuesToCsv(emptyAudit);
    expect(csv.split("\n")).toHaveLength(1); // header only
  });

  it("csvCell escapes commas and quotes", () => {
    const csv = keywordsToCsv([
      { keyword: 'hello, "world"', volume: 0, intent: "informational", difficulty: 0, pages: [], gap: "missing", cluster: "" },
    ]);
    expect(csv).toContain('"hello, ""world"""');
  });
});
