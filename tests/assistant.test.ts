import { describe, expect, it } from "vitest";
import { answerSeoQuestion } from "@/lib/seo/assistant";
import { issuesToCsv, keywordsToCsv, auditToCsv, internalLinksToCsv, geoToCsv } from "@/lib/seo/export";
import { AuditResult } from "@/lib/seo/types";

function fakeAudit(overrides: Partial<AuditResult> = {}): AuditResult {
  return {
    id: "a1",
    targetUrl: "https://eurowindow.biz/",
    checkedAt: "2026-01-01T00:00:00.000Z",
    pages: [
      {
        url: "https://eurowindow.biz/",
        issues: [
          { code: "missing_title", severity: "error", message: "Thiếu title" },
          { code: "short_description", severity: "warning", message: "Mô tả ngắn" },
        ],
      },
    ],
    summary: {
      seoScore: 78,
      technicalScore: 83,
      contentScore: 60,
      totalPages: 1,
      issueCounts: { error: 1, warning: 1, info: 0 },
    },
    priorityChecklist: ["Thêm title cho trang chủ"],
    tookMs: 100,
    ...overrides,
  };
}

describe("answerSeoQuestion - assistant", () => {
  it("trả về help khi hỏi /seo help", async () => {
    const r = await answerSeoQuestion("/seo help", { llm: fakeLlm });
    expect(r.source).toBe("command");
    expect(r.text).toContain("/seo audit");
  });

  it("trả về fallback khi không có LLM cho câu hỏi tự nhiên", async () => {
    const r = await answerSeoQuestion("làm sao cải thiện SEO?", { llm: fakeLlm });
    expect(["llm", "fallback"]).toContain(r.source);
  });

  it("chạy audit khi dùng /seo audit <url>", async () => {
    const audit = fakeAudit();
    const r = await answerSeoQuestion("/seo audit https://eurowindow.biz/", {
      llm: fakeLlm,
      audit: async () => audit,
    });
    expect(r.source).toBe("command");
    expect(r.text).toContain("Kết quả audit");
    expect(r.text).toContain("78");
    expect(r.ranAudit?.id).toBe("a1");
  });

  it("không gọi audit khi chỉ hỏi tự nhiên", async () => {
    let called = false;
    await answerSeoQuestion("kỹ thuật SEO là gì?", {
      llm: fakeLlm,
      audit: async () => {
        called = true;
        return fakeAudit();
      },
    });
    expect(called).toBe(false);
  });
});

describe("export CSV", () => {
  it("issuesToCsv xuất header + dòng lỗi", () => {
    const csv = issuesToCsv(fakeAudit());
    expect(csv).toContain("URL,Mức độ,Mã,Thông báo");
    expect(csv).toContain("missing_title");
    expect(csv).toContain("Thiếu title");
  });

  it("keywordsToCsv xuất các cột từ khóa", () => {
    const csv = keywordsToCsv([
      { keyword: 'cửa "uPVC"', intent: "informational", volume: 5, difficulty: 30, pages: [], cluster: "cửa", gap: "weak" },
    ]);
    expect(csv).toContain('"cửa ""uPVC"""');
    expect(csv).toContain("informational");
    expect(csv).toContain("weak");
  });

  it("internalLinksToCsv xuất pillar + orphan + suggestion", () => {
    const csv = internalLinksToCsv({
      totalPages: 2,
      orphanPages: ["https://x/y"],
      linkDepthMap: new Map(),
      suggestions: [{ fromUrl: "https://x/a", toUrl: "https://x/b", anchorText: "cửa", reason: "liên quan" }],
      pillarCandidates: ["https://x/p"],
    });
    expect(csv).toContain("pillar");
    expect(csv).toContain("orphan");
    expect(csv).toContain("suggestion");
  });

  it("geoToCsv xuất điểm theo trang", () => {
    const csv = geoToCsv({
      "https://x/": { url: "https://x/", entityCompleteness: 20, knowledgeCoverage: 65, citationQuality: 10, semanticRichness: 40, structuredDataScore: 20, answerQuality: 50, aiVisibilityScore: 30, providers: [], recommendations: [] },
    });
    expect(csv).toContain("AI Visibility");
    expect(csv).toContain("30");
  });

  it("auditToCsv gộp summary + issues + keywords", () => {
    const audit = fakeAudit({
      keywords: [{ keyword: "cửa", intent: "informational", volume: 1, difficulty: 10, pages: [], cluster: "cửa", gap: "covered" }],
    });
    const csv = auditToCsv(audit);
    expect(csv).toContain("Điểm SEO");
    expect(csv).toContain("missing_title");
    expect(csv).toContain("Từ khóa");
  });
});

const fakeLlm = async () => ({ content: "trả lời mẫu", provider: "test" });
