import { existsSync, readdirSync } from "fs";
import { join } from "path";
import { readSanPhamFile, listSanPhamSlugs, SanPhamArticle } from "./data";

export type SanPhamCategory = {
  key: string;
  label: string;
  image: string;
  href: string;
};

export const sanPhamCategories: SanPhamCategory[] = [
  { key: "cua-nhom", label: "Cửa nhôm", image: "/eurowindow/cuanhom.jpg.webp", href: "/san-pham/cua-nhom" },
  { key: "cua-nhua-upvc", label: "Cửa nhựa uPVC", image: "/eurowindow/cuanhua1.jpg.webp", href: "/san-pham/cua-nhua-upvc" },
  { key: "cua-go", label: "Cửa gỗ", image: "/eurowindow/cuago.png.webp", href: "/san-pham/cua-go" },
  { key: "san-pham-kinh", label: "Sản phẩm kính", image: "/eurowindow/san-pham-kinh.jpg.webp", href: "/san-pham/san-pham-kinh" },
  { key: "cua-tu-dong", label: "Cửa tự động", image: "/eurowindow/cua-tu-dong.jpg.webp", href: "/san-pham/cua-tu-dong" },
  { key: "cua-cuon", label: "Cửa cuốn", image: "/eurowindow/cua-cuon.jpg.webp", href: "/san-pham/cua-cuon" },
];

export function getCategoryByKey(key: string): SanPhamCategory | undefined {
  return sanPhamCategories.find((c) => c.key === key);
}

export function getCategoryByLabel(label: string): SanPhamCategory | undefined {
  return sanPhamCategories.find((c) => c.label.toLowerCase() === label.toLowerCase());
}

const SAN_PHAM_DIR = join(process.cwd(), "src", "app", "san-pham");

function buildArticleIndex(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const cat of sanPhamCategories) {
    const baiVietDir = join(SAN_PHAM_DIR, cat.key, "bai-viet");
    if (!existsSync(baiVietDir)) continue;
    const slugs = readdirSync(baiVietDir).filter((d) => existsSync(join(baiVietDir, d, "page.tsx")));
    for (const slug of slugs) {
      map[slug] = cat.key;
    }
  }
  return map;
}

const articleIndex = buildArticleIndex();

export function getArticleCategoryKey(slug: string): string | null {
  if (articleIndex[slug]) return articleIndex[slug];
  for (const cat of sanPhamCategories) {
    if (cat.key === slug) return cat.key;
  }
  return null;
}

export function getArticleLabel(slug: string): string {
  const catKey = getArticleCategoryKey(slug);
  if (catKey) {
    const cat = getCategoryByKey(catKey);
    if (cat) return cat.label;
  }
  return "";
}

export function getArticlesByCategory(categoryKey: string): SanPhamArticle[] {
  const slugs = Object.entries(articleIndex)
    .filter(([, k]) => k === categoryKey)
    .map(([s]) => s);
  const articles: SanPhamArticle[] = [];
  for (const slug of slugs) {
    const article = readSanPhamFile(slug);
    if (article) {
      const cat = getCategoryByKey(categoryKey);
      article.label = cat?.label ?? "";
      articles.push(article);
    }
  }
  return articles;
}

export function getAllArticleMetas(): Array<{ slug: string; categoryKey: string; label: string; title: string; excerpt: string; image?: string; date: string }> {
  const allSlugs = listSanPhamSlugs();
  const result: Array<{ slug: string; categoryKey: string; label: string; title: string; excerpt: string; image?: string; date: string }> = [];
  for (const slug of allSlugs) {
    const article = readSanPhamFile(slug);
    if (article) {
      const catKey = getArticleCategoryKey(slug);
      const cat = catKey ? getCategoryByKey(catKey) : undefined;
      result.push({
        slug,
        categoryKey: catKey ?? "",
        label: cat?.label ?? "",
        title: article.title,
        excerpt: article.excerpt,
        image: article.image,
        date: article.date,
      });
    }
  }
  return result;
}

export function getCategoryArticleCount(categoryKey: string): number {
  return Object.values(articleIndex).filter((k) => k === categoryKey).length;
}