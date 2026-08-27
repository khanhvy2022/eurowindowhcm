import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@zvec/zvec"],
  async redirects() {
    return [
      // Static Blogger pages
      {
        source: "/p/lien-he.html",
        destination: "/dich-vu",
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
      // Blogger Feeds
      {
        source: "/feeds/:path*",
        destination: "/sitemap.xml",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

