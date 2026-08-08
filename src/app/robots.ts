import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/admin/"],
      },
    ],
    sitemap: "https://eurowindowhcm.vn/sitemap.xml",
    host: "https://eurowindowhcm.vn",
  };
}
