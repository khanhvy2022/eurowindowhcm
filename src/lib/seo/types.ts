export type Severity = "error" | "warning" | "info";

import type { ContentAudit } from "./content";
import type { InternalLinkReport } from "./internal_link";
import type { KeywordOpportunity } from "./keyword";
import type { GeoReport } from "./geo";

export type AuditIssue = {
  code: string;
  severity: Severity;
  message: string;
  detail?: string;
};

export type UrlData = {
  url: string;
  title?: string;
  metaDescription?: string;
  canonical?: string;
  robots?: string;
  relPrev?: string;
  relNext?: string;
  ogTitle?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  h1: string[];
  headings: { tag: string; text: string }[];
  wordCount: number;
  htmlLang?: string;
  schemaTypes: string[];
  images: { src: string; alt: string; hasAlt: boolean }[];
  internalLinks: string[];
  externalLinks: string[];
  status: number;
  redirects: string[];
  contentType?: string;
  _html?: string;
};

export type PathData = {
  url: string;
  issues: AuditIssue[];
};

export type CategoryScores = {
  technical: number;
  content: number;
};

export type AuditSummary = {
  totalPages: number;
  issueCounts: { error: number; warning: number; info: number };
  seoScore: number;
  technicalScore: number;
  contentScore: number;
  duplicates: {
    title: Map<string, string[]>;
    description: Map<string, string[]>;
  } | null;
  hits: Record<string, number>;
};

export type AuditResult = {
  id: string;
  targetUrl: string;
  checkedAt: string;
  pages: PathData[];
  summary: {
    seoScore: number;
    technicalScore: number;
    contentScore: number;
    totalPages: number;
    issueCounts: { error: number; warning: number; info: number };
  };
  priorityChecklist: string[];
  contentAudits?: Record<string, ContentAudit>;
  keywords?: KeywordOpportunity[];
  internalLinks?: InternalLinkReport;
  geo?: Record<string, GeoReport>;
  tookMs: number;
};
