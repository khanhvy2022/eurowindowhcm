import { describe, it, expect } from "vitest";
import {
  resolveGeographicQuery,
  removeVietnameseTones,
  stripAdminPrefix,
  getGeographicCoverageStats,
  CANONICAL_ARTICLE_URL,
} from "../resolver";
import { scoreArticleContent } from "../quality-scorer";

describe("Geographic Entity Resolver & Search Engine", () => {
  it("validates imported dataset statistics and metadata", () => {
    const stats = getGeographicCoverageStats();
    expect(stats.version).toBe("v4.2.0");
    expect(stats.retrievalDate).toBe("2026-08-31");
    expect(stats.stats.totalProvinces).toBe(34);
    expect(stats.stats.totalWards).toBe(3321);
    expect(stats.legacyAliasesCount).toBeGreaterThanOrEqual(30);
  });

  it("normalizes Vietnamese tones and prefixes accurately", () => {
    expect(removeVietnameseTones("Tân Định")).toBe("tan dinh");
    expect(removeVietnameseTones("Bến Thành")).toBe("ben thanh");
    expect(removeVietnameseTones("Đà Nẵng")).toBe("da nang");

    expect(stripAdminPrefix("phuong tan dinh")).toBe("tan dinh");
    expect(stripAdminPrefix("xa binh thanh")).toBe("binh thanh");
    expect(stripAdminPrefix("thanh pho ha noi")).toBe("ha noi");
    expect(stripAdminPrefix("quan 1")).toBe("quan 1");
  });

  it("maps generic commercial queries to canonical /cua-eurowindow", () => {
    const res1 = resolveGeographicQuery("cửa Eurowindow");
    expect(res1.canonicalUrl).toBe(CANONICAL_ARTICLE_URL);
    expect(res1.intent).toBe("generic_commercial");

    const res2 = resolveGeographicQuery("báo giá cửa nhôm eurowindow");
    expect(res2.canonicalUrl).toBe(CANONICAL_ARTICLE_URL);
    expect(res2.intent).toBe("generic_commercial");
  });

  it("resolves ward queries with prefix or without prefix to the same entity and canonical URL", () => {
    const q1 = resolveGeographicQuery("cửa Eurowindow Tân Định");
    expect(q1.matched).toBe(true);
    expect(q1.entity?.name).toBe("Tân Định");
    expect(q1.entity?.code).toBe("26737");
    expect(q1.entity?.parentName).toContain("Hồ Chí Minh");
    expect(q1.intent).toBe("ward_intent");
    expect(q1.canonicalUrl).toBe(CANONICAL_ARTICLE_URL);

    const q2 = resolveGeographicQuery("cửa Eurowindow phường Tân Định");
    expect(q2.matched).toBe(true);
    expect(q2.entity?.name).toBe("Tân Định");
    expect(q2.canonicalUrl).toBe(CANONICAL_ARTICLE_URL);

    const q3 = resolveGeographicQuery("cửa Eurowindow Bến Thành");
    expect(q3.matched).toBe(true);
    expect(q3.entity?.name).toBe("Bến Thành");
    expect(q3.entity?.code).toBe("26743");
    expect(q3.canonicalUrl).toBe(CANONICAL_ARTICLE_URL);
  });

  it("resolves provinces and municipalities queries", () => {
    const qHanoi = resolveGeographicQuery("cửa Eurowindow Hà Nội");
    expect(qHanoi.matched).toBe(true);
    expect(qHanoi.entity?.code).toBe("01");
    expect(qHanoi.intent).toBe("municipality_intent");
    expect(qHanoi.canonicalUrl).toBe(CANONICAL_ARTICLE_URL);

    const qDanang = resolveGeographicQuery("cửa Eurowindow Đà Nẵng");
    expect(qDanang.matched).toBe(true);
    expect(qDanang.entity?.code).toBe("48");
    expect(qDanang.intent).toBe("municipality_intent");
    expect(qDanang.canonicalUrl).toBe(CANONICAL_ARTICLE_URL);

    const qHaiphong = resolveGeographicQuery("cửa Eurowindow Hải Phòng");
    expect(qHaiphong.matched).toBe(true);
    expect(qHaiphong.entity?.code).toBe("31");
    expect(qHaiphong.intent).toBe("municipality_intent");
    expect(qHaiphong.canonicalUrl).toBe(CANONICAL_ARTICLE_URL);

    const qDongnai = resolveGeographicQuery("cửa Eurowindow Đồng Nai");
    expect(qDongnai.matched).toBe(true);
    expect(qDongnai.entity?.code).toBe("75");
    expect(qDongnai.canonicalUrl).toBe(CANONICAL_ARTICLE_URL);
  });

  it("resolves legacy administrative aliases to canonical article", () => {
    const qQ1 = resolveGeographicQuery("cửa Eurowindow quận 1");
    expect(qQ1.matched).toBe(true);
    expect(qQ1.intent).toBe("legacy_intent");
    expect(qQ1.entity?.parentCode).toBe("79");
    expect(qQ1.canonicalUrl).toBe(CANONICAL_ARTICLE_URL);

    const qCauGiay = resolveGeographicQuery("cửa Eurowindow Cầu Giấy");
    expect(qCauGiay.matched).toBe(true);
    expect(qCauGiay.intent).toBe("legacy_intent");
    expect(qCauGiay.entity?.parentCode).toBe("01");
    expect(qCauGiay.canonicalUrl).toBe(CANONICAL_ARTICLE_URL);
  });

  it("scores article content quality and factual accuracy >= 95", () => {
    const report = scoreArticleContent({
      title: "Cửa Eurowindow | Bảng Giá & Giải Pháp Cửa Cho Công Trình Hiện Đại",
      metaDescription:
        "Khám phá các giải pháp cửa Eurowindow chính hãng: cửa nhôm EA55-EA95i, cửa nhựa uPVC Kömmerling, cửa cuốn, vách kính cách âm cách nhiệt tiêu chuẩn Châu Âu cho công trình toàn quốc.",
      h1: "Cửa Eurowindow – Giải Pháp Cửa Hiện Đại Cho Mọi Công Trình",
      headings: [
        "Cửa Eurowindow Là Gì?",
        "Các Dòng Cửa Eurowindow Chủ Lực",
        "Các Yếu Tố Kỹ Thuật Cần Quan Tâm",
        "Giải Pháp Cửa Eurowindow Phục Vụ Nhu Cầu Công Trình Tại Việt Nam",
        "Mạng Lưới Showroom & Năng Lực Sản Xuất",
        "Quy Trình Tư Vấn Kỹ Thuật",
        "So sánh & hướng dẫn lựa chọn cửa phù hợp",
        "Câu Hỏi Thường Gặp (FAQ)",
      ],
      content:
        "Cửa Eurowindow cửa nhôm EA55 EA70 EA95i cửa nhựa uPVC Kömmerling Roto Cmech cách âm cách nhiệt phụ kiện kính hộp showroom Hà Nội TP.HCM Đà Nẵng 5 nhà máy sản xuất vật liệu xây dựng. " +
        "Hệ thống cửa nhôm kính cao cấp, cửa nhựa uPVC Kömmerling và vách kính kiến trúc Eurowindow mang đến giải pháp cách âm, cách nhiệt, tiết kiệm năng lượng vượt trội cho biệt thự, nhà phố, khách sạn và các công trình dự án trên toàn lãnh thổ Việt Nam. ".repeat(
          35
        ),
      canonicalUrl: "https://www.eurowindowhcm.com/cua-eurowindow",
      hasFaq: true,
      hasSpecs: true,
      hasRegionalSolutions: true,
      verifiedFacilities: true,
      hasSchema: true,
    });

    expect(report.totalScore).toBeGreaterThanOrEqual(95);
    expect(report.grade).toBe("PRODUCTION READY");
    expect(report.factualWarnings).toHaveLength(0);
  });
});
