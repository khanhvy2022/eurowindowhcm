import ProductArticlePage from "@/components/ProductArticlePage";
import { getSanPhamArticle } from "@/app/san-pham/data";
import { getCategoryByKey } from "@/app/san-pham/categories";
import { notFound } from "next/navigation";

const CATEGORY_KEY = "cua-go";
const SLUG = "cua-go";

const _CAT = getCategoryByKey(CATEGORY_KEY);
const LABEL = _CAT ? _CAT.label : "";
const CURRENT_HREF = _CAT ? _CAT.href : "";
const BANNER_IMG = _CAT ? _CAT.image : undefined;

export async function generateMetadata() {
  const a = await getSanPhamArticle(SLUG, LABEL);
  if (!a) notFound();
  return {
    title: `${a.title} | Eurowindow`,
    description: a?.excerpt ?? "",
  };
}

export default async function ProductPage() {
  const article = await getSanPhamArticle(SLUG, LABEL);
  if (!article) notFound();
  return (
    <ProductArticlePage
      article={article}
      label={LABEL}
      bgImage={BANNER_IMG}
      currentHref={CURRENT_HREF}
      categoryKey={CATEGORY_KEY}
    />
  );
}
