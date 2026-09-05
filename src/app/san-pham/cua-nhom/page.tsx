import ProductArticlePage from "@/components/ProductArticlePage";
import { getSanPhamArticle } from "@/app/san-pham/data";
import { getCategoryByKey } from "@/app/san-pham/categories";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const SITE_URL = "https://www.eurowindowhcm.com";
const CATEGORY_KEY = "cua-nhom";
const SLUG = "cua-nhom";

const _CAT = getCategoryByKey(CATEGORY_KEY);
const LABEL = _CAT ? _CAT.label : "";
const CURRENT_HREF = _CAT ? _CAT.href : "";
const BANNER_IMG = _CAT ? _CAT.image : undefined;

export async function generateMetadata(): Promise<Metadata> {
  const a = await getSanPhamArticle(SLUG, LABEL);
  if (!a) notFound();

  const canonical = `${SITE_URL}/san-pham/${CATEGORY_KEY}`;
  const imageUrl = `${SITE_URL}${_CAT?.image ?? "/eurowindow/cuanhom.jpg.webp"}`;
  const title = `${a.title} | Eurowindow`;
  const description = a?.excerpt ?? "";

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        vi: canonical,
        en: `${SITE_URL}/en/products/cua-nhom-vach-kinh`,
        "x-default": canonical,
      },
    },
    openGraph: {
      type: "website",
      locale: "vi_VN",
      siteName: "Cửa Eurowindow Hồ Chí Minh",
      title,
      description,
      url: canonical,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: a.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ProductPage() {
  const article = await getSanPhamArticle(SLUG, LABEL);
  if (!article) notFound();

  const canonical = `${SITE_URL}/san-pham/${CATEGORY_KEY}`;
  const imageUrl = `${SITE_URL}${_CAT?.image ?? "/eurowindow/cuanhom.jpg.webp"}`;

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${canonical}#collection`,
    name: LABEL,
    url: canonical,
    description: article.excerpt,
    image: imageUrl,
    publisher: {
      "@type": "Organization",
      name: "Cửa Eurowindow Hồ Chí Minh",
      url: SITE_URL,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Sản phẩm", item: `${SITE_URL}/san-pham` },
        { "@type": "ListItem", position: 3, name: LABEL, item: canonical },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <ProductArticlePage
        article={article}
        label={LABEL}
        bgImage={BANNER_IMG}
        currentHref={CURRENT_HREF}
        categoryKey={CATEGORY_KEY}
      />
    </>
  );
}
