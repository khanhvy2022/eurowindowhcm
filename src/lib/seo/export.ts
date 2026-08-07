import { AuditResult } from "./types";
import { KeywordOpportunity } from "./keyword";
import { InternalLinkReport } from "./internal_link";
import { GeoReport } from "./geo";

function csvCell(value: unknown): string {
  const s = value === null || value === undefined ? "" : String(value);
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function csvRow(values: unknown[]): string {
  return values.map(csvCell).join(",");
}

/** Xuất danh sách issue theo trang thành CSV. */
export function issuesToCsv(audit: AuditResult): string {
  const rows: string[] = [csvRow(["URL", "Mức độ", "Mã", "Thông báo"])];
  for (const page of audit.pages) {
    for (const issue of page.issues) {
      rows.push(csvRow([page.url, issue.severity, issue.code, issue.message]));
    }
  }
  return rows.join("\n");
}

/** Xuất keyword opportunities thành CSV. */
export function keywordsToCsv(keywords: KeywordOpportunity[]): string {
  const rows: string[] = [csvRow(["Từ khóa", "Volume proxy", "Intent", "Độ khó", "Gap", "Nhóm"])];
  for (const k of keywords) {
    rows.push(csvRow([k.keyword, k.volume, k.intent, k.difficulty, k.gap, k.cluster]));
  }
  return rows.join("\n");
}

/** Xuất internal link report thành CSV. */
export function internalLinksToCsv(link: InternalLinkReport): string {
  const rows: string[] = [csvRow(["Loại", "URL", "Thông tin"])];
  rows.push(...link.pillarCandidates.map((p) => csvRow(["pillar", p, ""])));
  rows.push(...link.orphanPages.map((u) => csvRow(["orphan", u, ""])));
  for (const s of link.suggestions) {
    rows.push(csvRow(["suggestion", `${s.fromUrl} → ${s.toUrl}`, `${s.anchorText} (${s.reason})`]));
  }
  return rows.join("\n");
}

/** Xuất GEO report theo trang thành CSV. */
export function geoToCsv(geo: Record<string, GeoReport>): string {
  const rows: string[] = [csvRow(["URL", "AI Visibility", "Entity", "Knowledge", "Citation", "Semantic", "Structured Data"])];
  for (const g of Object.values(geo)) {
    rows.push(csvRow([g.url, g.aiVisibilityScore, g.entityCompleteness, g.knowledgeCoverage, g.citationQuality, g.semanticRichness, g.structuredDataScore]));
  }
  return rows.join("\n");
}

/** Xuất tổng hợp toàn audit thành CSV (1 bảng). */
export function auditToCsv(audit: AuditResult): string {
  const s = audit.summary;
  const parts = [
    csvRow(["Mã audit", audit.id]),
    csvRow(["Thời điểm", audit.checkedAt]),
    csvRow(["Trang đích", audit.targetUrl]),
    csvRow(["Số trang", s.totalPages]),
    csvRow(["Điểm SEO", s.seoScore]),
    csvRow(["Điểm kỹ thuật", s.technicalScore]),
    csvRow(["Điểm nội dung", s.contentScore]),
    csvRow(["Lỗi", s.issueCounts.error]),
    csvRow(["Cảnh báo", s.issueCounts.warning]),
    csvRow(["Gợi ý", s.issueCounts.info]),
    csvRow(["Thời gian (ms)", audit.tookMs]),
    "",
    issuesToCsv(audit),
  ];
  if (audit.keywords?.length) parts.push("", keywordsToCsv(audit.keywords));
  if (audit.internalLinks) parts.push("", internalLinksToCsv(audit.internalLinks));
  if (audit.geo && Object.keys(audit.geo).length) parts.push("", geoToCsv(audit.geo));
  return parts.join("\n");
}
