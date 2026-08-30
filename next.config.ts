import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@zvec/zvec", "pdf-parse", "mammoth"],
  async redirects() {
    return [
      // Duplicate product category listing pages
      {
        source: "/san-pham/cua-nhom/bai-viet",
        destination: "/san-pham/cua-nhom",
        permanent: true,
      },
      {
        source: "/san-pham/cua-nhua-upvc/bai-viet",
        destination: "/san-pham/cua-nhua-upvc",
        permanent: true,
      },
      // Static Blogger pages
      {
        source: "/p/lien-he.html",
        destination: "/lien-he",
        permanent: true,
      },
      {
        source: "/p/anh-du-an.html",
        destination: "/du-an",
        permanent: true,
      },
      {
        source: "/p/hinh-anh-cua-eurowindow.html",
        destination: "/san-pham",
        permanent: true,
      },
      {
        source: "/p/anh-baner.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/p/banner-eurowindow.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/p/si.html",
        destination: "/san-pham",
        permanent: true,
      },
      {
        source: "/p/lien-he-2.html",
        destination: "/lien-he",
        permanent: true,
      },
      {
        source: "/tin-tuc/lien-he-2",
        destination: "/lien-he",
        permanent: true,
      },
      {
        source: "/tin-tuc/he-thong-showroom",
        destination: "/he-thong-showroom",
        permanent: true,
      },
      {
        source: "/tin-tuc/he-thong-showroom.html",
        destination: "/he-thong-showroom",
        permanent: true,
      },
      {
        source: "/2019/11/he-thong-showroom.html",
        destination: "/he-thong-showroom",
        permanent: true,
      },
      {
        source: "/tin-tuc/eurowindow-tu-hao-5-lan-lien-tiep-at-2",
        destination: "/tin-tuc/eurowindow-tu-hao-5-lan-lien-tiep-at",
        permanent: true,
      },
      {
        source: "/tin-tuc/cong-trinh-cua-eurowindow-vung-tau-2",
        destination: "/tin-tuc/cong-trinh-cua-eurowindow-vung-tau",
        permanent: true,
      },
      {
        source: "/tin-tuc/san-pham-cua-nhom-eurowindow",
        destination: "/tin-tuc/cua-nhom-eurowindow",
        permanent: true,
      },
      {
        source: "/p/anh-cua-ep.html",
        destination: "/tin-tuc/anh-cua-dep",
        permanent: true,
      },
      {
        source: "/p/anh-cua-ep",
        destination: "/tin-tuc/anh-cua-dep",
        permanent: true,
      },
      {
        source: "/tin-tuc/anh-cua-ep",
        destination: "/tin-tuc/anh-cua-dep",
        permanent: true,
      },
      {
        source: "/tin-tuc/p/anh-cua-ep.html",
        destination: "/tin-tuc/anh-cua-dep",
        permanent: true,
      },
      {
        source: "/anh-cua-ep",
        destination: "/tin-tuc/anh-cua-dep",
        permanent: true,
      },
      {
        source: "/anh-cua-dep",
        destination: "/tin-tuc/anh-cua-dep",
        permanent: true,
      },
      {
        source: "/p/:slug*.html",
        destination: "/tin-tuc/:slug*",
        permanent: true,
      },
      {
        source: "/p/:slug*",
        destination: "/tin-tuc/:slug*",
        permanent: true,
      },
      // Tin-tuc legacy path redirects (/tin-tuc/p/..., /tin-tuc/YYYY/MM/..., /tin-tuc/*.html)
      {
        source: "/tin-tuc/p/:slug*.html",
        destination: "/tin-tuc/:slug*",
        permanent: true,
      },
      {
        source: "/tin-tuc/p/:slug*",
        destination: "/tin-tuc/:slug*",
        permanent: true,
      },
      {
        source: "/tin-tuc/:year(\\d{4})/:month(\\d{2})/:slug*.html",
        destination: "/tin-tuc/:slug*",
        permanent: true,
      },
      {
        source: "/tin-tuc/:year(\\d{4})/:month(\\d{2})/:slug*",
        destination: "/tin-tuc/:slug*",
        permanent: true,
      },
      {
        source: "/tin-tuc/:slug*.html",
        destination: "/tin-tuc/:slug*",
        permanent: true,
      },
      // Blogger Post URLs: /YYYY/MM/slug.html -> /tin-tuc/slug
      {
        source: "/:year(\\d{4})/:month(\\d{2})/:slug*.html",
        destination: "/tin-tuc/:slug*",
        permanent: true,
      },
      {
        source: "/:year(\\d{4})/:month(\\d{2})/:slug*",
        destination: "/tin-tuc/:slug*",
        permanent: true,
      },
      // Blogger Labels & Search
      {
        source: "/search/label/:label*",
        destination: "/tin-tuc",
        permanent: true,
      },
      {
        source: "/search",
        destination: "/tin-tuc",
        permanent: true,
      },
      // Blogger Feeds & Legacy Sitemaps
      {
        source: "/feeds/:path*",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/sitemap-pages.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/sitemap-posts.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/atom.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/rss.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/b/:path*",
        destination: "/tin-tuc",
        permanent: true,
      },
      {
        source: "/:year(\\d{4})",
        destination: "/tin-tuc",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

