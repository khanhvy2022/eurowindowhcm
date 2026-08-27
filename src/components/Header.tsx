"use client";

import BrandLogo from "@/components/BrandLogo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Item = { label: string; href: string; children?: { label: string; href: string }[] };

const viItems: Item[] = [
  { label: "Giới thiệu", href: "/gioi-thieu", children: [{ label: "Về Eurowindow", href: "/gioi-thieu" }, { label: "Tầm nhìn & sứ mệnh", href: "/gioi-thieu#tam-nhin" }] },
  {
    label: "Công trình",
    href: "/du-an",
    children: [
      { label: "Công trình cấp quốc gia", href: "/du-an/cong-trinh-quoc-gia" },
      { label: "Bệnh viện", href: "/du-an/benh-vien" },
      { label: "Trụ sở cơ quan", href: "/du-an/tru-so-co-quan" },
      { label: "Công trình dân dụng", href: "/du-an/cong-trinh-dan-dung" },
      { label: "Tin dự án", href: "/du-an/tin-du-an" },
    ],
  },
  { label: "Sản phẩm", href: "/san-pham", children: [{ label: "Cửa nhôm & vách kính", href: "/san-pham/cua-nhom" }, { label: "Cửa uPVC", href: "/san-pham/cua-nhua-upvc" }, { label: "Cửa gỗ & chống cháy", href: "/san-pham/cua-go" }, { label: "Sản phẩm kính", href: "/san-pham/san-pham-kinh" }, { label: "Cửa tự động", href: "/san-pham/cua-tu-dong" }, { label: "Cửa cuốn", href: "/san-pham/cua-cuon" }] },
  { label: "Tin tức", href: "/tin-tuc" },
  { label: "Liên hệ", href: "/lien-he" },
];

const enItems: Item[] = [
  { label: "About us", href: "/en/about", children: [{ label: "About Eurowindow", href: "/en/about" }, { label: "Vision & mission", href: "/en/about#vision" }] },
  {
    label: "Projects",
    href: "/en/projects",
    children: [
      { label: "National landmarks", href: "/en/projects/cong-trinh-quoc-gia" },
      { label: "Hospitals", href: "/en/projects/benh-vien" },
      { label: "Government buildings", href: "/en/projects/tru-so-co-quan" },
      { label: "Civil construction", href: "/en/projects/cong-trinh-dan-dung" },
      { label: "Project news", href: "/en/projects/tin-du-an" },
    ],
  },
  { label: "Products", href: "/en/products", children: [{ label: "Aluminium doors", href: "/en/products/cua-nhom-vach-kinh" }, { label: "uPVC doors", href: "/en/products/cua-upvc" }, { label: "Wooden doors", href: "/en/products/cua-go-va-go-chong-chay" }, { label: "Glass products", href: "/en/products/san-pham-kinh" }, { label: "Automatic doors", href: "/en/products/cua-tu-dong-va-cua-xoay" }, { label: "Roller doors", href: "/en/products/cua-cuon-nhom-khe-thoang" }] },
  { label: "News", href: "/en/news" },
  { label: "Contact", href: "/en/contact" },
];

export default function Header({ lang = "vi" }: { lang?: "vi" | "en" }) {
  const items = lang === "en" ? enItems : viItems;
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#071523]/75 backdrop-blur-[20px] border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between px-5 sm:h-[86px] sm:px-8 lg:h-[96px]">
        <BrandLogo />
        <nav className="hidden h-full items-center gap-6 lg:flex xl:gap-8" aria-label={lang === "en" ? "Main navigation" : "Điều hướng chính"}>
          <Link
            href={lang === "en" ? "/en" : "/"}
            className="group relative flex min-h-11 items-center whitespace-nowrap text-[15px] font-medium text-[#D2D8E3] transition hover:text-white xl:text-[16px]"
          >
            {lang === "en" ? "Home" : "Trang chủ"}
            <span className="absolute bottom-1 left-0 h-[2px] w-0 bg-[#E2C275] transition-all duration-300 group-hover:w-full" />
          </Link>
          {items.map((item) => (
            <div key={item.label} className="group relative flex h-full items-center">
              <Link
                href={item.href}
                className="group/link relative flex min-h-11 items-center gap-1.5 whitespace-nowrap text-[15px] font-medium text-[#D2D8E3] transition hover:text-white xl:text-[16px]"
              >
                {item.label}
                {item.children ? <ChevronDown className="h-3.5 w-3.5 text-[#E2C275] transition-transform duration-200 group-hover:rotate-180" /> : null}
                <span className="absolute bottom-1 left-0 h-[2px] w-0 bg-[#E2C275] transition-all duration-300 group-hover/link:w-full" />
              </Link>
              {item.children ? (
                <div className="invisible absolute left-0 top-[80%] min-w-64 translate-y-3 rounded-2xl border border-white/10 border-t-2 border-t-[#E2C275] bg-[#102238]/95 p-2 backdrop-blur-2xl opacity-0 shadow-2xl transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="block rounded-xl px-4 py-3 text-sm text-[#D2D8E3] transition hover:bg-white/10 hover:text-white"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
          <LanguageSwitcher lang={lang} />
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={lang === "en" ? "/en/contact" : "/lien-he"}
            className="btn-gold-luxury text-sm font-bold uppercase tracking-wider"
          >
            {lang === "en" ? "Contact now" : "Liên hệ ngay"}
          </Link>
        </div>
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 bg-white/5 text-white backdrop-blur-md transition hover:border-[#E2C275] lg:hidden"
          aria-label={open ? (lang === "en" ? "Close menu" : "Đóng menu") : (lang === "en" ? "Open menu" : "Mở menu")}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open ? (
        <nav
          className="border-t border-white/10 bg-[#071523]/98 px-5 pb-8 pt-4 backdrop-blur-2xl max-h-[calc(100vh-80px)] overflow-y-auto no-scrollbar shadow-2xl lg:hidden"
          aria-label={lang === "en" ? "Mobile navigation" : "Điều hướng di động"}
        >
          <Link
            href={lang === "en" ? "/en" : "/"}
            onClick={() => setOpen(false)}
            className="block border-b border-white/10 py-3.5 text-base font-medium text-white"
          >
            {lang === "en" ? "Home" : "Trang chủ"}
          </Link>
          {items.map((item) => (
            <div key={item.label} className="border-b border-white/10">
              <div className="flex items-center">
                <Link
                  href={item.href}
                  onClick={() => { if (!item.children) setOpen(false); }}
                  className="flex-1 py-3.5 text-base font-medium text-white"
                >
                  {item.label}
                </Link>
                {item.children ? (
                  <button
                    type="button"
                    className="p-3 text-[#E2C275]"
                    aria-label={lang === "en" ? `Open ${item.label}` : `Mở ${item.label}`}
                    onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                  >
                    <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${expanded === item.label ? "rotate-180" : ""}`} />
                  </button>
                ) : null}
              </div>
              {item.children && expanded === item.label ? (
                <div className="mb-3 space-y-1 border-l-2 border-[#E2C275] pl-4">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      onClick={() => setOpen(false)}
                      className="block py-2 text-sm text-[#D2D8E3] hover:text-white"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
          <div className="flex items-center justify-between py-4">
            <span className="text-sm text-[#94A3B8]">{lang === "en" ? "Language" : "Ngôn ngữ"}</span>
            <LanguageSwitcher lang={lang} />
          </div>
          <Link
            href={lang === "en" ? "/en/contact" : "/lien-he"}
            onClick={() => setOpen(false)}
            className="btn-gold-luxury mt-3 block w-full text-center text-sm font-bold uppercase tracking-wider"
          >
            {lang === "en" ? "Contact now" : "Liên hệ ngay"}
          </Link>
        </nav>
      ) : null}
    </header>
  );
}