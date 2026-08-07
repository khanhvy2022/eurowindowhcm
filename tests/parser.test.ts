import { describe, it, expect } from "vitest";
import { parseHtml } from "../src/lib/seo/parser";

describe("parseHtml - Technical SEO metadata extraction", () => {
  const html = `<!doctype html>
  <html lang="vi">
    <head>
      <title>Eurowindow - Cửa nhôm kính hàng đầu Việt Nam</title>
      <meta name="description" content="Eurowindow cung cấp cửa uPVC, cửa nhôm, vách kính tiêu chuẩn châu Âu." />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://eurowindow.biz/gioi-thieu" />
      <meta property="og:title" content="Giới thiệu Eurowindow" />
      <meta property="og:image" content="https://eurowindow.biz/og.jpg" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <script type="application/ld+json">{"@type":"Organization","name":"Eurowindow"}</script>
    </head>
    <body>
      <h1>Giới thiệu Eurowindow</h1>
      <h2>Lịch sử</h2>
      <p>Eurowindow thành lập năm 2002 với hơn 20 năm kinh nghiệm sản xuất cửa và vách kính.</p>
      <h2>Sản phẩm</h2>
      <img src="/cua-upvc.jpg" alt="Cửa uPVC Eurowindow" />
      <img src="/kinh.jpg" />
      <a href="/san-pham">Sản phẩm</a>
      <a href="https://google.com">Google</a>
    </body>
  </html>`;

  const data = parseHtml(html, "https://eurowindow.biz/gioi-thieu");

  it("trích xuất title", () => {
    expect(data.title).toContain("Eurowindow");
  });

  it("trích xuất meta description", () => {
    expect(data.metaDescription).toContain("uPVC");
  });

  it("trích xuất canonical", () => {
    expect(data.canonical).toBe("https://eurowindow.biz/gioi-thieu");
  });

  it("đọc html lang", () => {
    expect(data.htmlLang).toBe("vi");
  });

  it("trích xuất H1 và headings", () => {
    expect(data.h1).toHaveLength(1);
    expect(data.h1[0]).toBe("Giới thiệu Eurowindow");
    expect(data.headings.filter((h) => h.tag === "h2").length).toBe(2);
  });

  it("nhận diện ảnh thiếu alt", () => {
    expect(data.images).toHaveLength(2);
    expect(data.images.find((i) => i.src.includes("kinh"))?.hasAlt).toBe(false);
    expect(data.images.find((i) => i.src.includes("upvc"))?.alt).toBe("Cửa uPVC Eurowindow");
  });

  it("tách internal vs external links", () => {
    expect(data.internalLinks.some((l) => l.includes("/san-pham"))).toBe(true);
    expect(data.externalLinks.some((l) => l.includes("google.com"))).toBe(true);
  });

  it("trích xuất schema types", () => {
    expect(data.schemaTypes).toContain("Organization");
  });

  it("đếm số từ (word count)", () => {
    expect(data.wordCount).toBeGreaterThan(5);
  });
});

describe("parseHtml - edge cases", () => {
  it("trả về rỗng sạch khi không có head", () => {
    const d = parseHtml("<html><body><h1>X</h1>abc</body></html>", "https://x.com/a");
    expect(d.title).toBeUndefined();
    expect(d.metaDescription).toBeUndefined();
    expect(d.images).toEqual([]);
    expect(d.schemaTypes).toEqual([]);
  });

  it("đếm nhiều H1", () => {
    const d = parseHtml("<h1>A</h1><h1>B</h1>", "https://x.com/a");
    expect(d.h1).toHaveLength(2);
  });
});
