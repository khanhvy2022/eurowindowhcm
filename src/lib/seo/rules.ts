import { AuditIssue, PathData, UrlData } from "./types";

type RuleContext = {
  allUrls: UrlData[];
  duplicateTitle: Map<string, string[]>;
  duplicateDescription: Map<string, string[]>;
};

/**
 * Technical SEO rules. Mỗi rule nhận page + context, trả về issues.
 * Tách thuần (pure) để dễ unit test.
 */
export function auditPage(page: UrlData, ctx: RuleContext): AuditIssue[] {
  const issues: AuditIssue[] = [];
  const title = page.title?.trim();
  const desc = page.metaDescription?.trim();

  // Title
  if (!title) {
    issues.push({ code: "missing_title", severity: "error", message: "Thiếu thẻ <title>" });
  } else {
    const len = [...title].length;
    if (len > 60) {
      issues.push({ code: "title_too_long", severity: "warning", message: `Tiêu đề dài ${len} ký tự (nên ≤ 60)` });
    }
    if (len < 15) {
      issues.push({ code: "title_too_short", severity: "warning", message: `Tiêu đề quá ngắn (${len} ký tự)` });
    }
    const dups = ctx.duplicateTitle.get(title);
    if (dups && dups.length > 1) {
      issues.push({ code: "duplicate_title", severity: "warning", message: `Tiêu đề trùng với ${dups.length - 1} trang khác` });
    }
  }

  // Meta description
  if (!desc) {
    issues.push({ code: "missing_description", severity: "warning", message: "Thiếu meta description" });
  } else {
    const len = [...desc].length;
    if (len > 160) issues.push({ code: "description_too_long", severity: "info", message: `Mô tả dài ${len} ký tự` });
    if (len < 70) issues.push({ code: "description_too_short", severity: "info", message: `Mô tả ngắn (${len} ký tự)` });
    const dups = ctx.duplicateDescription.get(desc);
    if (dups && dups.length > 1) {
      issues.push({ code: "duplicate_description", severity: "warning", message: `Mô tả trùng với ${dups.length - 1} trang khác` });
    }
  }

  // Canonical
  if (!page.canonical) {
    issues.push({ code: "missing_canonical", severity: "info", message: "Thiếu thẻ canonical" });
  } else if (new URL(page.canonical, page.url).href !== new URL(page.url).href) {
    issues.push({ code: "canonical_mismatch", severity: "warning", message: `Canonical ${page.canonical} khác URL trang` });
  }

  // Indexability
  if (page.robots && /\bnoindex\b/i.test(page.robots)) {
    issues.push({ code: "noindex", severity: "info", message: "Trang bị noindex (chủ đích?)" });
  }

  // Social
  if (!page.ogTitle || !page.ogImage || !page.ogType) {
    issues.push({ code: "incomplete_og", severity: "warning", message: "OpenGraph thiếu title/image/type" });
  }
  if (!page.twitterCard) {
    issues.push({ code: "missing_twitter_card", severity: "info", message: "Thiếu Twitter Card" });
  }

  // Heading structure
  if (page.h1.length === 0) {
    issues.push({ code: "missing_h1", severity: "error", message: "Trang không có thẻ H1" });
  } else if (page.h1.length > 1) {
    issues.push({ code: "multiple_h1", severity: "warning", message: `Có ${page.h1.length} thẻ H1` });
  }
  if (page.headings.length === 0) {
    issues.push({ code: "no_headings", severity: "info", message: "Trang không có tiêu đề phụ (H2/H3)" });
  }

  // Images
  const noAlt = page.images.filter((i) => !i.hasAlt);
  if (noAlt.length > 0) {
    issues.push({ code: "missing_image_alt", severity: "warning", message: `${noAlt.length}/${page.images.length} ảnh thiếu alt text` });
  }

  // Thin content
  if (page.wordCount < 300) {
    issues.push({ code: "thin_content", severity: "warning", message: `Nội dung mỏng (~${page.wordCount} từ)` });
  }
  if (page.wordCount < 100) {
    issues.push({ code: "very_thin_content", severity: "error", message: `Nội dung rất mỏng (~${page.wordCount} từ)` });
  }

  // Links
  if (page.internalLinks.length === 0) {
    issues.push({ code: "no_internal_links", severity: "warning", message: "Trang không có liên kết nội bộ" });
  }

  // Schema
  const goodSchema = ["Organization", "LocalBusiness", "Product", "Article", "BreadcrumbList", "FAQPage", "WebSite", "Service"].some((t) =>
    page.schemaTypes.includes(t),
  );
  if (page.schemaTypes.length === 0) {
    issues.push({ code: "missing_schema", severity: "warning", message: "Trang không có structured data (JSON-LD)" });
  } else if (!goodSchema) {
    issues.push({ code: "unknown_schema", severity: "info", message: `Schema không rõ loại: ${page.schemaTypes.join(", ")}` });
  }

  // HTML lang
  if (!page.htmlLang) {
    issues.push({ code: "missing_lang", severity: "warning", message: "Thiếu thuộc tính lang trên <html>" });
  }

  // Redirects
  if (page.redirects.length > 0) {
    issues.push({
      code: "redirect_chain",
      severity: "info",
      message: `Chuỗi redirect: ${page.redirects.length} bước`,
    });
  }

  return issues;
}

/**
 * Tạo context: tính trùng title/description trên toàn bộ tập trang.
 */
export function buildContext(allUrls: UrlData[]): RuleContext {
  const duplicateTitle = new Map<string, string[]>();
  const duplicateDescription = new Map<string, string[]>();
  for (const u of allUrls) {
    const t = u.title?.trim();
    const d = u.metaDescription?.trim();
    if (t) addToMap(duplicateTitle, t, u.url);
    if (d) addToMap(duplicateDescription, d, u.url);
  }
  return { allUrls, duplicateTitle, duplicateDescription };
}

function addToMap(map: Map<string, string[]>, key: string, val: string) {
  const arr = map.get(key) ?? [];
  arr.push(val);
  map.set(key, arr);
}

/**
 * Score một trang dựa trên issues. Trừ điểm theo mức độ.
 */
export function scorePage(issues: AuditIssue[]): { score: number; contentIssues: number; technicalIssues: number } {
  let score = 100;
  let contentIssues = 0;
  let technicalIssues = 0;
  for (const issue of issues) {
    const penalty = issue.severity === "error" ? 10 : issue.severity === "warning" ? 5 : 1;
    score -= penalty;
    const isContent = /title|description|h1|heading|word_count|thin_content|alt|hover/i.test(issue.code);
    if (isContent) contentIssues++; else technicalIssues++;
  }
  return { score: Math.max(0, Math.min(100, score)), contentIssues, technicalIssues };
}

export function auditAll(
  pages: UrlData[],
): { paths: PathData[]; seoScore: number; technicalScore: number; contentScore: number; issueCounts: { error: number; warning: number; info: number } } {
  const ctx = buildContext(pages);
  const paths: PathData[] = [];
  let total = 0;
  let techSum = 0;
  let contentSum = 0;
  const issueCounts = { error: 0, warning: 0, info: 0 };

  for (const page of pages) {
    const issues = auditPage(page, ctx);
    const { score, contentIssues, technicalIssues } = scorePage(issues);
    paths.push({ url: page.url, issues });
    for (const i of issues) issueCounts[i.severity]++;
    total++;
    techSum += 100 - technicalIssues * 4;
    contentSum += score;
  }

  return {
    paths,
    seoScore: total ? Math.round(contentSum / total) : 0,
    technicalScore: total ? Math.max(0, Math.round(techSum / total)) : 0,
    contentScore: total ? Math.max(0, Math.round(contentSum / total)) : 0,
    issueCounts,
  };
}
