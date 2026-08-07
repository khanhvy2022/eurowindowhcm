import { UrlData } from "./types";

export type SchemaType =
  | "Organization"
  | "LocalBusiness"
  | "Product"
  | "Article"
  | "BreadcrumbList"
  | "FAQPage"
  | "HowTo"
  | "Review"
  | "AggregateRating"
  | "WebSite"
  | "SearchAction"
  | "Service";

export type JsonLd = Record<string, unknown> & { "@context": "https://schema.org"; "@type": string };

type OrgPayload = { name: string; url: string; logo?: string; sameAs?: string[] };
type LocalBPayload = { name: string; address: string; telephone?: string; url?: string; geo?: { lat: number; lng: number } };
type ProductPayload = {
  name: string;
  description?: string;
  image?: string;
  sku?: string;
  offers?: { price: number | string; currency?: string; availability?: string };
};
type ArticlePayload = {
  headline: string;
  description?: string;
  image?: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
  publisher?: { name: string; logo?: string };
};
type WebSitePayload = { name: string; url: string; searchUrl?: string };

function base(type: string, extra: Record<string, unknown> = {}): JsonLd {
  return { "@context": "https://schema.org", "@type": type, ...extra };
}

export function organization(org: OrgPayload): JsonLd {
  return base("Organization", { name: org.name, url: org.url, logo: org.logo, sameAs: org.sameAs });
}

export function localBusiness(b: LocalBPayload): JsonLd {
  return base("LocalBusiness", {
    name: b.name,
    address: b.address,
    telephone: b.telephone,
    url: b.url,
    geo: b.geo,
  });
}

export function product(p: ProductPayload): JsonLd {
  const offers = p.offers
    ? base("Offer", {
        price: p.offers.price,
        priceCurrency: p.offers.currency ?? "VND",
        availability: p.offers.availability ?? "https://schema.org/InStock",
      })
    : undefined;
  return base("Product", {
    name: p.name,
    description: p.description,
    image: p.image,
    sku: p.sku,
    offers,
  });
}

export function article(a: ArticlePayload): JsonLd {
  const author = a.author ? base("Person", { name: a.author }) : undefined;
  const publisher = a.publisher ? base("Organization", { name: a.publisher.name, logo: a.publisher.logo }) : undefined;
  return base("Article", {
    headline: a.headline,
    description: a.description,
    image: a.image,
    author,
    datePublished: a.datePublished,
    dateModified: a.dateModified,
    publisher,
  });
}

export function breadcrumb(items: { name: string; url: string }[]): JsonLd {
  return base("BreadcrumbList", {
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  });
}

export function faq(questions: { question: string; answer: string }[]): JsonLd {
  return base("FAQPage", {
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  });
}

export function webSite(w: WebSitePayload): JsonLd {
  const site: JsonLd = base("WebSite", { name: w.name, url: w.url });
  if (w.searchUrl) {
    site.potentialAction = base("SearchAction", {
      target: w.searchUrl + "{search_term_string}",
      "query-input": "required name=search_term_string",
    });
  }
  return site;
}

export const generators: Record<string, (payload: unknown) => JsonLd> = {
  Organization: (p) => organization(p as OrgPayload),
  LocalBusiness: (p) => localBusiness(p as LocalBPayload),
  Product: (p) => product(p as ProductPayload),
  Article: (p) => article(p as ArticlePayload),
  BreadcrumbList: (p) => breadcrumb(p as { name: string; url: string }[]),
  FAQPage: (p) => faq(p as { question: string; answer: string }[]),
  WebSite: (p) => webSite(p as WebSitePayload),
};

export function validateJsonLd(json: JsonLd): string[] {
  const errors: string[] = [];
  if (!json["@context"]) errors.push("Thiếu @context");
  if (!json["@type"]) errors.push("Thiếu @type");
  const type = String(json["@type"] ?? "");
  const required: Record<string, string[]> = {
    Product: ["name"],
    Article: ["headline"],
    FAQPage: ["mainEntity"],
    BreadcrumbList: ["itemListElement"],
    WebSite: ["name", "url"],
    Organization: ["name", "url"],
  };
  for (const field of required[type] ?? []) {
    if (json[field] === undefined) errors.push("Thiếu trường " + field + " cho " + type);
  }
  return errors;
}

export function recommendedSchemas(page: UrlData): SchemaType[] {
  const out: SchemaType[] = ["Organization", "WebSite"];
  const haystack = (page.title ?? "") + " " + (page.metaDescription ?? "");
  if (/cửa|upvc|nhôm|kinh|sản phẩm/i.test(haystack)) out.push("Product");
  if (/trả lời|câu hỏi|faq/i.test(haystack.toLowerCase())) out.push("FAQPage");
  out.push("BreadcrumbList");
  if (page.url.includes("/tin-tuc")) out.push("Article");
  return [...new Set(out)];
}

export function geoEntityCoverage(page: UrlData): {
  score: number;
  present: SchemaType[];
  missing: SchemaType[];
} {
  const recommended = recommendedSchemas(page);
  const present = recommended.filter((t) => page.schemaTypes.includes(t));
  const missing = recommended.filter((t) => !page.schemaTypes.includes(t));
  const score = recommended.length ? Math.round((present.length / recommended.length) * 100) : 0;
  return { score, present, missing };
}
