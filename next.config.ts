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
      // Promo & Campaign URLs
      {
        source: "/uu-dai-cua-upvc",
        destination: "/tin-tuc/uu-dai-cua-upvc",
        permanent: true,
      },
      {
        source: "/uu-dai-cua-upvc.html",
        destination: "/tin-tuc/uu-dai-cua-upvc",
        permanent: true,
      },
      {
        source: "/uu-dai-cua-nhom-kinh",
        destination: "/tin-tuc/uu-dai-cua-nhom-kinh",
        permanent: true,
      },
      {
        source: "/uu-dai-cua-nhom-kinh.html",
        destination: "/tin-tuc/uu-dai-cua-nhom-kinh",
        permanent: true,
      },
      {
        source: "/khuyen-mai-kinh-dien",
        destination: "/tin-tuc/khuyen-mai-kinh-dien-doi-mau",
        permanent: true,
      },
      {
        source: "/khuyen-mai-kinh-dien.html",
        destination: "/tin-tuc/khuyen-mai-kinh-dien-doi-mau",
        permanent: true,
      },
      {
        source: "/khuyen-mai-kinh-dien-doi-mau",
        destination: "/tin-tuc/khuyen-mai-kinh-dien-doi-mau",
        permanent: true,
      },
      {
        source: "/tin-tuc/khuyen-mai-kinh-dien",
        destination: "/tin-tuc/khuyen-mai-kinh-dien-doi-mau",
        permanent: true,
      },
      {
        source: "/tin-tuc/top-10-doanh-nghiep-xanh",
        destination: "/tin-tuc/eurowindow-top-10-doanh-nghiep-xanh-2026",
        permanent: true,
      },
      {
        source: "/tin-tuc/thuong-hieu-quoc-gia",
        destination: "/tin-tuc/eurowindow-12-nam-lien-tiep-dat-thuong-hieu-quoc-gia",
        permanent: true,
      },
      {
        source: "/tin-tuc/hang-viet-nam-chat-luong-cao",
        destination: "/tin-tuc/eurowindow-tu-hao-hang-viet-nam-chat-luong-cao-2023",
        permanent: true,
      },
      // Root product slugs to canonical /san-pham/ category URLs
      {
        source: "/cua-nhom",
        destination: "/san-pham/cua-nhom",
        permanent: true,
      },
      {
        source: "/cua-nhom.html",
        destination: "/san-pham/cua-nhom",
        permanent: true,
      },
      {
        source: "/cua-nhua-upvc",
        destination: "/san-pham/cua-nhua-upvc",
        permanent: true,
      },
      {
        source: "/cua-nhua-upvc.html",
        destination: "/san-pham/cua-nhua-upvc",
        permanent: true,
      },
      {
        source: "/cua-upvc",
        destination: "/san-pham/cua-nhua-upvc",
        permanent: true,
      },
      {
        source: "/cua-upvc.html",
        destination: "/san-pham/cua-nhua-upvc",
        permanent: true,
      },
      {
        source: "/cua-go",
        destination: "/san-pham/cua-go",
        permanent: true,
      },
      {
        source: "/cua-go.html",
        destination: "/san-pham/cua-go",
        permanent: true,
      },
      {
        source: "/cua-cuon",
        destination: "/san-pham/cua-cuon",
        permanent: true,
      },
      {
        source: "/cua-cuon.html",
        destination: "/san-pham/cua-cuon",
        permanent: true,
      },
      {
        source: "/cua-tu-dong",
        destination: "/san-pham/cua-tu-dong",
        permanent: true,
      },
      {
        source: "/cua-tu-dong.html",
        destination: "/san-pham/cua-tu-dong",
        permanent: true,
      },
      {
        source: "/san-pham-kinh",
        destination: "/san-pham/san-pham-kinh",
        permanent: true,
      },
      {
        source: "/san-pham-kinh.html",
        destination: "/san-pham/san-pham-kinh",
        permanent: true,
      },
      // Broken internal links from migrated articles
      {
        source: "/tin-tuc/cua-di-hai-mo-quay-eurowindow",
        destination: "/tin-tuc/cua-di-hai-canh-mo-quay",
        permanent: true,
      },
      {
        source: "/tin-tuc/kinh-cach-nhiet-eurowindow",
        destination: "/tin-tuc/kinh-cach-nhiet-toan-act",
        permanent: true,
      },
      {
        source: "/tin-tuc/gioi-thieu-ve-cua-nhua-eurowindow",
        destination: "/tin-tuc/gioi-thieu-ve-cua-nhua-upvc",
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
      // Root Blogger .html URLs: /slug.html -> /tin-tuc/slug
      {
        source: "/:slug([a-zA-Z0-9_-]+).html",
        destination: "/tin-tuc/:slug",
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

