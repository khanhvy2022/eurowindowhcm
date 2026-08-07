import { describe, it, expect } from "vitest";
import { runAudit } from "../src/lib/seo/audit";

const goodPage = `<!doctype html>
<html lang="vi">
<head>
  <title>Eurowindow - Cửa uPVC chất lượng cao</title>
  <meta name="description" content="Eurowindow cung cấp cửa uPVC, cửa nhôm, vách kính tiêu chuẩn Châu Âu với giá tốt nhất Việt Nam. Bảo hành 5 năm." />
  <link rel="canonical" href="https://eurowindow.biz/san-pham" />
  <meta property="og:title" content="Eurowindow - Cửa uPVC chất lượng cao" />
  <meta property="og:image" content="/og.jpg" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <script type="application/ld+json">{"@type":"Organization","name":"Eurowindow"}</script>
</head>
<body>
  <h1>Cửa uPVC Eurowindow</h1>
  <h2>Tại sao chọn uPVC?</h2>
  <p>${"Lorem ipsum dolor sit amet, ".repeat(60)}</p>
  <img src="/cua.jpg" alt="cửa uPVC" />
  <a href="/gioi-thieu">Giới thiệu</a>
</body>
</html>`;

const badPage = `<!doctype html><html><head><title>Tr</title></head>
<body><h1>Bad</h1><img src="/x.jpg"><p>x</p></body></html>`;

const fakeFetch = (url: string) => {
  if (url.includes("/san-pham")) return Promise.resolve({ html: goodPage, status: 200, redirects: [] });
  if (url.includes("/gioi-thieu")) return Promise.resolve({ html: badPage, status: 200, redirects: [] });
  return Promise.resolve({ html: goodPage, status: 200, redirects: [] });
};

const fakeLlm = async (_system: string, _user: string) => ({ content: "Fake checklist\n- Fix issues", provider: "fake" });

describe("runAudit (integration, mock fetch)", () => {
  it("audit 2 trang, phát hiện issue và tính score", async () => {
    const result = await runAudit(
      ["https://eurowindow.biz/san-pham", "https://eurowindow.biz/gioi-thieu"],
      { fetchFn: fakeFetch, maxPages: 10, delayMs: 0, concurrency: 2 },
      { llm: fakeLlm },
    );
    expect(result.summary.totalPages).toBe(2);
    // trang san-pham chuẩn, trang gioi-thieu nhiều lỗi
    const bad = result.pages.find((p) => p.url.includes("/gioi-thieu"));
    expect(bad).toBeDefined();
    expect(bad!.issues.some((i) => i.code === "missing_description")).toBe(true);
    expect(bad!.issues.some((i) => i.code === "missing_canonical")).toBe(true);
    expect(bad!.issues.some((i) => i.code === "missing_image_alt")).toBe(true);
    expect(bad!.issues.some((i) => i.code === "thin_content")).toBe(true);
    expect(result.priorityChecklist.length).toBeGreaterThan(0);
    expect(typeof result.id).toBe("string");
    expect(result.summary.issueCounts.error).toBeGreaterThanOrEqual(0);
  });

  it("trả về result hợp lệ ngay cả khi LLM lỗi", async () => {
    const badLlm = async () => { throw new Error("boom"); };
    const result = await runAudit(["https://eurowindow.biz/san-pham"], { fetchFn: fakeFetch, maxPages: 1 }, { llm: badLlm });
    expect(result.priorityChecklist.length).toBeGreaterThan(0);
    expect(result.summary.totalPages).toBe(1);
  });
});
