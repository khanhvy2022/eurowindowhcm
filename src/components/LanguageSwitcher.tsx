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
      className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.04] p-1 shadow-inner backdrop-blur-xl transition-all"
      aria-label="Language selector"
    >
      <Link
        href={viHref}
        prefetch={true}
        aria-current={isCurrentVi ? "true" : undefined}
        title="Tiếng Việt"
        className={`group relative flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wider transition-all duration-300 ease-out active:scale-95 ${
          isCurrentVi
            ? "border border-[#C9A227]/40 bg-[#C9A227]/15 text-[#C9A227] shadow-[0_2px_10px_rgba(201,162,39,0.2)]"
            : "border border-transparent text-[#94A3B8] opacity-70 hover:bg-white/10 hover:text-white hover:opacity-100"
        }`}
      >
        <span className="relative flex h-4 w-4 shrink-0 overflow-hidden rounded-full ring-1 ring-white/20">
          <img
            src="/flags/vn.svg"
            alt="Tiếng Việt"
            className="h-full w-full object-cover"
          />
        </span>
        <span>VI</span>
      </Link>
      <Link
        href={enHref}
        prefetch={true}
        aria-current={isCurrentEn ? "true" : undefined}
        title="English"
        className={`group relative flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wider transition-all duration-300 ease-out active:scale-95 ${
          isCurrentEn
            ? "border border-[#C9A227]/40 bg-[#C9A227]/15 text-[#C9A227] shadow-[0_2px_10px_rgba(201,162,39,0.2)]"
            : "border border-transparent text-[#94A3B8] opacity-70 hover:bg-white/10 hover:text-white hover:opacity-100"
        }`}
      >
        <span className="relative flex h-4 w-4 shrink-0 overflow-hidden rounded-full ring-1 ring-white/20">
          <img
            src="/flags/gb.svg"
            alt="English"
            className="h-full w-full object-cover"
          />
        </span>
        <span>EN</span>
      </Link>
    </div>
  );
}

