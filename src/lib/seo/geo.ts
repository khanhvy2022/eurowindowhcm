import { UrlData } from "./types";
import { geoEntityCoverage, recommendedSchemas } from "./schema";

export const AI_PROVIDERS = ["ChatGPT", "Gemini", "Claude", "Perplexity", "Copilot", "DeepSeek", "Kimi", "Qwen", "Mistral"];

export type GeoReport = {
  url: string;
  entityCompleteness: number;
  knowledgeCoverage: number;
  citationQuality: number;
  semanticRichness: number;
  structuredDataScore: number;
  answerQuality: number;
  aiVisibilityScore: number;
  providers: { name: string; likely: "high" | "medium" | "low" }[];
  recommendations: string[];
};

/**
 * AI visibility score = trung bình các chỉ số kết cấu nội dung + structured data.
 * Dựa trên heuristics; không gọi API AI thực (tránh chi phí), chỉ đánh giá khả năng.
 */
export function auditGEO(page: UrlData): GeoReport {
  const coverage = geoEntityCoverage(page);
  const entityCompleteness = coverage.score;

  // knowledge coverage: trang có đủ nội dung trả lời câu hỏi (FAQ + depth)
  let knowledgeCoverage = 0;
  if (page.wordCount > 300) knowledgeCoverage += 25;
  if (page.wordCount > 700) knowledgeCoverage += 25;
  if (coverage.present.includes("FAQPage") || /\b(câu hỏi|trả lời|faq)\b/i.test((page.metaDescription ?? "").toLowerCase()))
    knowledgeCoverage += 20;
  if (page.h1.length >= 1) knowledgeCoverage += 15;
  if (page.schemaTypes.length > 0) knowledgeCoverage += 15;
  knowledgeCoverage = Math.min(100, knowledgeCoverage);

  // citation quality: internal links đến tài liệu uy tín (được đếm)
  let citationQuality = 0;
  citationQuality += Math.min(40, page.externalLinks.length * 5);
  citationQuality += Math.min(30, page.internalLinks.length * 3);
  citationQuality = Math.min(100, citationQuality);

  // semantic richness: đa dạng heading + entity signals
  const headingDiversity = new Set(page.headings.map((h) => h.tag)).size >= 2 ? 30 : 0;
  const keywordSignals = (page.title ?? "").length + (page.metaDescription ?? "").length > 40 ? 30 : 0;
  const semanticRichness = Math.min(100, headingDiversity + keywordSignals + (page.wordCount > 300 ? 40 : 0));

  const structuredDataScore = entityCompleteness;

  // answer quality proxy
  let answerQuality = 0;
  if (page.wordCount > 200) answerQuality += 30;
  if (page.h1.length === 1) answerQuality += 20;
  if (coverage.present.includes("FAQPage")) answerQuality += 25;
  if (page.schemaTypes.length > 0) answerQuality += 25;
  answerQuality = Math.min(100, answerQuality);

  const aiVisibilityScore = Math.round(
    (entityCompleteness * 0.25 +
      knowledgeCoverage * 0.25 +
      citationQuality * 0.15 +
      semanticRichness * 0.2 +
      structuredDataScore * 0.15) /
      100,
  ) * 100;

  const providers = AI_PROVIDERS.map((name) => {
    const likely: "high" | "medium" | "low" =
      aiVisibilityScore >= 75 ? "high" : aiVisibilityScore >= 50 ? "medium" : "low";
    return { name, likely };
  });

  const recommendations: string[] = [];
  if (coverage.missing.includes("FAQPage")) recommendations.push("Thêm FAQ schema để tăng khả năng xuất hiện trong câu trả lời AI.");
  if (coverage.missing.includes("Article")) recommendations.push("Thêm Article schema cho nội dung tin tức.");
  if (page.wordCount < 700) recommendations.push("Mở rộng nội dung lên ≥ 700 từ để cung cấp thực thể phong phú.");
  if (page.internalLinks.length < 3) recommendations.push("Tăng số liên kết nội bộ để củng cố kiến thức.");
  if (recommendations.length === 0) recommendations.push("Nội dung đã tốt. Theo dõi index và FAQ mỗi tháng.");

  return {
    url: page.url,
    entityCompleteness,
    knowledgeCoverage,
    citationQuality,
    semanticRichness,
    structuredDataScore,
    answerQuality,
    aiVisibilityScore,
    providers,
    recommendations,
  };
}
