import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://eurowindowhcm.com";

type ProductArticleMetaInput = {
  title: string;
  excerpt: string;
  categoryKey: string;
  slug: string;
  image?: string;
  categoryLabel: string;
};

/**
 * Build full SEO metadata for a product article page (/san-pham/{cat}/bai-viet/{slug}).
 * Includes canonical, OpenGraph, Twitter Card.
 */
export function buildProductArticleMetadata(input: ProductArticleMetaInput): Metadata {
  const { title, excerpt, categoryKey, slug, image, categoryLabel } = input;
  const path = `/san-pham/${categoryKey}/bai-viet/${slug}`;
  const fullUrl = `${SITE_URL}${path}`;
  const ogImage = image ? `${SITE_URL}${image}` : `${SITE_URL}/eurowindow/cuanhom.jpg.webp`;

  return {
    title: `${title} | Eurowindow`,
    description: excerpt || `${title} - ${categoryLabel} Eurowindow chính hãng tại TP.HCM. Hotline: 0966 994 338.`,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "article",
      locale: "vi_VN",
      siteName: "Cửa Eurowindow Hồ Chí Minh",
      title,
      description: excerpt || `${title} - ${categoryLabel} Eurowindow`,
      url: fullUrl,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: excerpt || `${title} - ${categoryLabel} Eurowindow`,
      images: [ogImage],
    },
  };
}

type ProjectCategoryMetaInput = {
  title: string;
  description: string;
  path: string;
  enPath?: string;
  image?: string;
};

/**
 * Build metadata for project category pages (/du-an/benh-vien, etc.)
 */
export function buildProjectCategoryMetadata(input: ProjectCategoryMetaInput): Metadata {
  const { title, description, path, enPath, image } = input;
  const fullUrl = `${SITE_URL}${path}`;
  const ogImage = image ? `${SITE_URL}${image}` : `${SITE_URL}/eurowindow/cuanhom.jpg.webp`;

  const languages: Record<string, string> = { vi: path };
  if (enPath) languages.en = enPath;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages,
    },
    openGraph: {
      type: "website",
      locale: "vi_VN",
      siteName: "Cửa Eurowindow Hồ Chí Minh",
      title,
      description,
      url: fullUrl,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

type EnDetailMetaInput = {
  title: string;
  description: string;
  path: string;
  viPath: string;
  image?: string;
  type?: "website" | "article";
};

/**
 * Build metadata for English detail pages with hreflang alternates.
 */
export function buildEnDetailMetadata(input: EnDetailMetaInput): Metadata {
  const { title, description, path, viPath, image, type = "article" } = input;
  const fullUrl = `${SITE_URL}${path}`;
  const ogImage = image ? `${SITE_URL}${image}` : `${SITE_URL}/eurowindow/cuanhom.jpg.webp`;

  return {
    title: `${title} | Eurowindow HCM`,
    description,
    alternates: {
      canonical: path,
      languages: {
        vi: viPath,
        en: path,
      },
    },
    openGraph: {
      type,
      locale: "en_US",
      alternateLocale: "vi_VN",
      siteName: "Eurowindow Ho Chi Minh",
      title,
      description,
      url: fullUrl,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
