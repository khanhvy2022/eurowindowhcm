import { NextRequest } from "next/server";
import { sanPhamCategories, getAllArticleMetas } from "@/app/san-pham/categories";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const label = searchParams.get("label");
    const categoryKey = searchParams.get("category");

    let articles = getAllArticleMetas();

    if (label) {
      const match = label.toLowerCase();
      articles = articles.filter(
        (a) =>
          a.label.toLowerCase() === match ||
          a.categoryKey.toLowerCase() === match
      );
    }

    if (categoryKey) {
      articles = articles.filter((a) => a.categoryKey === categoryKey);
    }

    const categories = sanPhamCategories.map((c) => ({
      key: c.key,
      label: c.label,
      image: c.image,
      href: c.href,
    }));

    return Response.json({ categories, articles });
  } catch {
    return Response.json({ categories: sanPhamCategories, articles: [] });
  }
}
