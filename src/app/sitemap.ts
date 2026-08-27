import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { projects } from "@/app/du-an/projects";

import { products } from "@/app/san-pham/products-data";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://eurowindowhcm.com";

function url(
  path: string,
  priority: number,
  changefreq: MetadataRoute.Sitemap[0]["changeFrequency"],
): MetadataRoute.Sitemap[0] {
  return {
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: changefreq,
    priority,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    url("/", 1.0, "weekly"),
    url("/gioi-thieu", 0.8, "monthly"),
    url("/san-pham", 0.9, "weekly"),
    url("/san-pham/cua-nhom", 0.85, "monthly"),
    url("/san-pham/cua-nhom/bai-viet", 0.7, "monthly"),
    url("/san-pham/cua-upvc", 0.85, "monthly"),
    url("/san-pham/cua-nhua-upvc", 0.85, "monthly"),
    url("/san-pham/cua-nhua-upvc/bai-viet", 0.7, "monthly"),
    url("/san-pham/cua-go", 0.85, "monthly"),
    url("/san-pham/cua-cuon", 0.85, "monthly"),
    url("/san-pham/cua-tu-dong", 0.85, "monthly"),
    url("/san-pham/san-pham-kinh", 0.85, "monthly"),
    url("/du-an", 0.9, "weekly"),
    url("/du-an/cong-trinh-quoc-gia", 0.8, "weekly"),
    url("/du-an/benh-vien", 0.8, "weekly"),
    url("/du-an/tru-so-co-quan", 0.8, "weekly"),
    url("/du-an/cong-trinh-dan-dung", 0.8, "weekly"),
    url("/du-an/tin-du-an", 0.8, "weekly"),
    url("/tin-tuc", 0.9, "daily"),
    url("/tin-tuc/du-an", 0.7, "weekly"),
    url("/dich-vu", 0.8, "monthly"),
    url("/thiet-ke-kien-truc", 0.8, "monthly"),
    // English pages
    url("/en", 0.8, "weekly"),
    url("/en/about", 0.7, "monthly"),
    url("/en/products", 0.8, "weekly"),
    url("/en/projects", 0.8, "weekly"),
    url("/en/projects/cong-trinh-quoc-gia", 0.7, "weekly"),
    url("/en/projects/benh-vien", 0.7, "weekly"),
    url("/en/projects/tru-so-co-quan", 0.7, "weekly"),
    url("/en/projects/cong-trinh-dan-dung", 0.7, "weekly"),
    url("/en/projects/tin-du-an", 0.7, "weekly"),
    url("/en/news", 0.8, "daily"),
    url("/en/services", 0.7, "monthly"),
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE}/san-pham/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/tin-tuc/${p.slug}`,
    lastModified: p.date
      ? (() => {
          try {
            const parts = p.date.split("/");
            if (parts.length === 3) return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
            return new Date(p.date);
          } catch {
            return new Date();
          }
        })()
      : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE}/du-an/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const enPostRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/en/news/${p.slug}`,
    lastModified: p.date
      ? (() => {
          try {
            const parts = p.date.split("/");
            if (parts.length === 3) return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
            return new Date(p.date);
          } catch {
            return new Date();
          }
        })()
      : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const enProjectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE}/en/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...productRoutes,
    ...postRoutes,
    ...projectRoutes,
    ...enPostRoutes,
    ...enProjectRoutes,
  ];
}
