"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LanguageSwitcher({ lang = "vi" }: { lang?: "vi" | "en" }) {
  const pathname = usePathname() || (lang === "en" ? "/en" : "/");

  // Determine equivalent links for both languages
  let viHref = "/";
  let enHref = "/en";

  if (pathname.startsWith("/en")) {
    enHref = pathname;
    const sub = pathname.replace(/^\/en/, "");

    if (!sub || sub === "/") {
      viHref = "/";
    } else if (sub.startsWith("/about")) {
      viHref = "/gioi-thieu";
    } else if (sub.startsWith("/contact")) {
      viHref = "/lien-he";
    } else if (sub === "/products") {
      viHref = "/san-pham";
    } else if (sub.startsWith("/products/")) {
      const prodSlug = sub.replace("/products/", "");
      if (prodSlug === "cua-nhom-vach-kinh") viHref = "/san-pham/cua-nhom";
      else if (prodSlug === "cua-go-va-go-chong-chay") viHref = "/san-pham/cua-go";
      else if (prodSlug === "cua-tu-dong-va-cua-xoay") viHref = "/san-pham/cua-tu-dong";
      else if (prodSlug === "cua-cuon-nhom-khe-thoang") viHref = "/san-pham/cua-cuon";
      else viHref = `/san-pham/${prodSlug}`;
    } else if (sub === "/projects") {
      viHref = "/du-an";
    } else if (sub.startsWith("/projects/")) {
      viHref = `/du-an/${sub.replace("/projects/", "")}`;
    } else if (sub.startsWith("/news")) {
      viHref = "/tin-tuc";
    } else {
      viHref = "/";
    }
  } else {
    viHref = pathname;

    if (pathname === "/" || pathname === "") {
      enHref = "/en";
    } else if (pathname.startsWith("/gioi-thieu")) {
      enHref = "/en/about";
    } else if (pathname.startsWith("/lien-he")) {
      enHref = "/en/contact";
    } else if (pathname === "/san-pham") {
      enHref = "/en/products";
    } else if (pathname.startsWith("/san-pham/")) {
      const slug = pathname.replace("/san-pham/", "");
      if (slug === "cua-nhom") enHref = "/en/products/cua-nhom-vach-kinh";
      else if (slug === "cua-upvc" || slug === "cua-nhua-upvc") enHref = "/en/products/cua-upvc";
      else if (slug === "cua-go") enHref = "/en/products/cua-go-va-go-chong-chay";
      else if (slug === "cua-tu-dong") enHref = "/en/products/cua-tu-dong-va-cua-xoay";
      else if (slug === "cua-cuon") enHref = "/en/products/cua-cuon-nhom-khe-thoang";
      else if (slug === "san-pham-kinh") enHref = "/en/products/san-pham-kinh";
      else enHref = "/en/products";
    } else if (pathname === "/du-an") {
      enHref = "/en/projects";
    } else if (pathname.startsWith("/du-an/")) {
      enHref = `/en/projects/${pathname.replace("/du-an/", "")}`;
    } else if (pathname.startsWith("/tin-tuc")) {
      enHref = "/en/news";
    } else if (pathname.startsWith("/dich-vu")) {
      enHref = "/en/products";
    } else {
      enHref = "/en";
    }
  }

  const isCurrentVi = !pathname.startsWith("/en");
  const isCurrentEn = pathname.startsWith("/en");

  return (
    <div
      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur-md shadow-sm transition-all"
      aria-label="Language selector"
    >
      <Link
        href={viHref}
        prefetch={true}
        aria-current={isCurrentVi ? "true" : undefined}
        title="Tiếng Việt"
        className={`group relative flex items-center justify-center rounded-full p-1 transition-all duration-300 ease-out active:scale-95 ${
          isCurrentVi
            ? "border border-[#E2C275] bg-[#E2C275]/20 shadow-[0_0_12px_rgba(226,194,117,0.35)] ring-1 ring-[#E2C275]/40 opacity-100 scale-105"
            : "border border-transparent opacity-60 hover:opacity-100 hover:scale-105 hover:bg-white/10"
        }`}
      >
        <img
          src="/flags/vn.svg"
          alt="Tiếng Việt"
          className="h-[18px] w-7 rounded-[3px] object-cover shadow-sm transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <Link
        href={enHref}
        prefetch={true}
        aria-current={isCurrentEn ? "true" : undefined}
        title="English"
        className={`group relative flex items-center justify-center rounded-full p-1 transition-all duration-300 ease-out active:scale-95 ${
          isCurrentEn
            ? "border border-[#E2C275] bg-[#E2C275]/20 shadow-[0_0_12px_rgba(226,194,117,0.35)] ring-1 ring-[#E2C275]/40 opacity-100 scale-105"
            : "border border-transparent opacity-60 hover:opacity-100 hover:scale-105 hover:bg-white/10"
        }`}
      >
        <img
          src="/flags/gb.svg"
          alt="English"
          className="h-[18px] w-7 rounded-[3px] object-cover shadow-sm transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
    </div>
  );
}

