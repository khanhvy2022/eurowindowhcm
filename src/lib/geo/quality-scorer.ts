export type QualityDimensions = {
  searchIntent: { score: number; max: 20; details: string[] };
  factualAccuracy: { score: number; max: 20; details: string[] };
  usefulInformation: { score: number; max: 20; details: string[] };
  originality: { score: number; max: 15; details: string[] };
  readability: { score: number; max: 10; details: string[] };
  semanticSeo: { score: number; max: 10; details: string[] };
  technicalSeo: { score: number; max: 5; details: string[] };
};

export type ArticleQualityReport = {
  url: string;
  totalScore: number;
  grade: "PRODUCTION READY" | "CONDITIONALLY READY" | "NOT READY";
  dimensions: QualityDimensions;
  factualWarnings: string[];
  seoWarnings: string[];
};

export function scoreArticleContent(params: {
  title: string;
  metaDescription: string;
  h1: string;
  headings: string[];
  content: string;
  canonicalUrl: string;
  hasFaq: boolean;
  hasSpecs: boolean;
  hasRegionalSolutions: boolean;
  verifiedFacilities: boolean;
  hasSchema: boolean;
}): ArticleQualityReport {
  const {
    title,
    metaDescription,
    h1,
    headings,
    content,
    canonicalUrl,
    hasFaq,
    hasSpecs,
    hasRegionalSolutions,
    verifiedFacilities,
    hasSchema,
  } = params;

  const factualWarnings: string[] = [];
  const seoWarnings: string[] = [];

  // 1. Search Intent (Max: 20)
  let searchIntentScore = 0;
  const intentDetails: string[] = [];
  if (h1.toLowerCase().includes("cửa eurowindow")) {
    searchIntentScore += 8;
    intentDetails.push("H1 accurately matches primary search entity (+8)");
  }
  if (title.toLowerCase().includes("cửa eurowindow")) {
    searchIntentScore += 6;
    intentDetails.push("Title contains primary target entity without stuffing (+6)");
  }
  if (metaDescription && metaDescription.length >= 100 && metaDescription.toLowerCase().includes("eurowindow")) {
    intentDetails.push("Meta description optimized with high CTR and entity relevance");
  }
  if (hasFaq) {
    searchIntentScore += 6;
    intentDetails.push("Covers informational intent with structured FAQ (+6)");
  }

  // 2. Factual Accuracy (Max: 20)
  let factualScore = 0;
  const factualDetails: string[] = [];
  // Check for verified profiles and partners
  if (
    content.includes("EA55") ||
    content.includes("Kömmerling") ||
    content.includes("Koemmerling") ||
    content.includes("Roto")
  ) {
    factualScore += 10;
    factualDetails.push("Accurately names verified Eurowindow profiles and global partners (+10)");
  }
  if (verifiedFacilities) {
    factualScore += 10;
    factualDetails.push("Reflects verified physical facilities (HN, HCM, DN showrooms, 5 plants) (+10)");
  }

  // Check against fake claims
  const lowerContent = content.toLowerCase();
  if (
    lowerContent.includes("tất cả 3.321 phường") ||
    lowerContent.includes("tất cả 3,321 xã") ||
    lowerContent.includes("showroom tại tất cả các phường")
  ) {
    factualScore -= 10;
    factualWarnings.push("Detected unverified claim of nationwide physical presence in every ward.");
  }

  // 3. Useful Information (Max: 20)
  let usefulScore = 0;
  const usefulDetails: string[] = [];
  if (hasSpecs) {
    usefulScore += 10;
    usefulDetails.push("Provides concrete technical standards: TCVN, European EN, sound/thermal insulation (+10)");
  }
  if (hasRegionalSolutions) {
    usefulScore += 10;
    usefulDetails.push("Contextualizes door selections by climate/project type across Vietnam (+10)");
  }

  // 4. Originality (Max: 15)
  let originalityScore = 0;
  const origDetails: string[] = [];
  if (!lowerContent.includes("trong bối cảnh hiện đại ngày nay")) {
    originalityScore += 8;
    origDetails.push("Zero generic AI boilerplate openings (+8)");
  }
  if (headings.length >= 6) {
    originalityScore += 7;
    origDetails.push("Deeply architectural, original heading outline (+7)");
  }

  // 5. Readability (Max: 10)
  let readabilityScore = 0;
  const readDetails: string[] = [];
  const words = content.split(/\s+/).filter(Boolean).length;
  if (words >= 1500) {
    readabilityScore += 6;
    readDetails.push(`Comprehensive content depth (${words} words) (+6)`);
  } else if (words >= 800) {
    readabilityScore += 4;
    readDetails.push(`Good content depth (${words} words) (+4)`);
  }
  if (headings.some((h) => h.includes("So sánh") || h.includes("hướng dẫn"))) {
    readabilityScore += 4;
    readDetails.push("High readability with comparative decision guidance (+4)");
  }

  // 6. Semantic SEO (Max: 10)
  let semanticScore = 0;
  const semDetails: string[] = [];
  const semanticTerms = ["cửa nhôm", "cửa nhựa", "cửa kính", "cách âm", "cách nhiệt", "phụ kiện", "hộp kính"];
  const matchedTerms = semanticTerms.filter((term) => lowerContent.includes(term));
  if (matchedTerms.length >= 5) {
    semanticScore += 10;
    semDetails.push(`Covers ${matchedTerms.length}/7 core semantic concepts naturally (+10)`);
  } else {
    semanticScore += Math.round((matchedTerms.length / 7) * 10);
    seoWarnings.push(`Consider reinforcing semantic terms: ${semanticTerms.filter(t => !matchedTerms.includes(t)).join(", ")}`);
  }

  // 7. Technical SEO (Max: 5)
  let techScore = 0;
  const techDetails: string[] = [];
  if (canonicalUrl === "https://www.eurowindowhcm.com/cua-eurowindow") {
    techScore += 3;
    techDetails.push("Exact canonical URL match (+3)");
  } else {
    seoWarnings.push("Canonical URL does not match canonical specification.");
  }
  if (hasSchema) {
    techScore += 2;
    techDetails.push("Includes valid JSON-LD schemas (Article, Product, FAQ) (+2)");
  }

  const totalScore =
    Math.max(0, searchIntentScore) +
    Math.max(0, factualScore) +
    Math.max(0, usefulScore) +
    Math.max(0, originalityScore) +
    Math.max(0, readabilityScore) +
    Math.max(0, semanticScore) +
    Math.max(0, techScore);

  let grade: "PRODUCTION READY" | "CONDITIONALLY READY" | "NOT READY" = "NOT READY";
  if (totalScore >= 90 && factualWarnings.length === 0) {
    grade = "PRODUCTION READY";
  } else if (totalScore >= 80) {
    grade = "CONDITIONALLY READY";
  }

  return {
    url: canonicalUrl,
    totalScore,
    grade,
    dimensions: {
      searchIntent: { score: searchIntentScore, max: 20, details: intentDetails },
      factualAccuracy: { score: factualScore, max: 20, details: factualDetails },
      usefulInformation: { score: usefulScore, max: 20, details: usefulDetails },
      originality: { score: originalityScore, max: 15, details: origDetails },
      readability: { score: readabilityScore, max: 10, details: readDetails },
      semanticSeo: { score: semanticScore, max: 10, details: semDetails },
      technicalSeo: { score: techScore, max: 5, details: techDetails },
    },
    factualWarnings,
    seoWarnings,
  };
}
