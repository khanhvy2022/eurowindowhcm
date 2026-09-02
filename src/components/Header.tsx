"use client";

import BrandLogo from "@/components/BrandLogo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Item = { label: string; href: string; children?: { label: string; href: string }[] };

const viItems: Item[] = [
  {
    label: "Sản phẩm",
    href: "/san-pham",
    children: [
      { label: "Cửa nhôm & vách kính", href: "/san-pham/cua-nhom" },
      { label: "Cửa uPVC Châu Âu", href: "/san-pham/cua-nhua-upvc" },
      { label: "Cửa gỗ & chống cháy", href: "/san-pham/cua-go" },
      { label: "Sản phẩm kính cao cấp", href: "/san-pham/san-pham-kinh" },
      { label: "Cửa tự động & xoay", href: "/san-pham/cua-tu-dong" },
      { label: "Cửa cuốn nhôm", href: "/san-pham/cua-cuon" },
    ],
  },
  {
    label: "Công trình",
    href: "/du-an",
    children: [
      { label: "Công trình cấp quốc gia", href: "/du-an/cong-trinh-quoc-gia" },
      { label: "Bệnh viện trọng điểm", href: "/du-an/benh-vien" },
      { label: "Trụ sở cơ quan", href: "/du-an/tru-so-co-quan" },
      { label: "Công trình dân dụng cao cấp", href: "/du-an/cong-trinh-dan-dung" },
      { label: "Tin tức dự án", href: "/du-an/tin-du-an" },
    ],
  },
  {
    label: "Về Eurowindow",
    href: "/gioi-thieu",
    children: [
      { label: "Giới thiệu thương hiệu", href: "/gioi-thieu" },
      { label: "Tầm nhìn & sứ mệnh", href: "/gioi-thieu#tam-nhin" },
    ],
  },
  { label: "Tin tức", href: "/tin-tuc" },
  { label: "Showroom", href: "/he-thong-showroom" },
];

const enItems: Item[] = [
  {
    label: "Products",
    href: "/en/products",
    children: [
      { label: "Aluminium & Facades", href: "/en/products/cua-nhom-vach-kinh" },
      { label: "European uPVC Doors", href: "/en/products/cua-upvc" },
      { label: "Wooden & Fire-rated Doors", href: "/en/products/cua-go-va-go-chong-chay" },
      { label: "High-Performance Glass", href: "/en/products/san-pham-kinh" },
      { label: "Automatic & Revolving Doors", href: "/en/products/cua-tu-dong-va-cua-xoay" },
      { label: "Roller Shutter Doors", href: "/en/products/cua-cuon-nhom-khe-thoang" },
    ],
  },
  {
    label: "Projects",
    href: "/en/projects",
    children: [
      { label: "National Landmarks", href: "/en/projects/cong-trinh-quoc-gia" },
      { label: "Medical Facilities", href: "/en/projects/benh-vien" },
      { label: "Government Headquarters", href: "/en/projects/tru-so-co-quan" },
      { label: "Civil & Residential", href: "/en/projects/cong-trinh-dan-dung" },
      { label: "Project News", href: "/en/projects/tin-du-an" },
    ],
  },
  {
    label: "About",
    href: "/en/about",
    children: [
      { label: "Brand Heritage", href: "/en/about" },
      { label: "Vision & Values", href: "/en/about#vision" },
    ],
  },
  { label: "News", href: "/en/news" },
  { label: "Showrooms", href: "/he-thong-showroom" },
];

export default function Header({ lang = "vi" }: { lang?: "vi" | "en" }) {
  const pathname = usePathname();
  const isEn = pathname?.startsWith("/en") || lang === "en";
  const currentLang = isEn ? "en" : "vi";
  const items = isEn ? enItems : viItems;
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

  // Keyboard navigation: Close menu on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#06101f]/85 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_12px_32px_rgba(0,0,0,0.55)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-4 sm:h-[86px] sm:px-6 lg:h-[96px] lg:px-8">
        <BrandLogo lang={currentLang} />

        {/* Desktop Navigation */}
        <nav
          className="hidden h-full items-center lg:flex lg:gap-3 xl:gap-6 2xl:gap-8"
          aria-label={currentLang === "en" ? "Main navigation" : "Điều hướng chính"}
        >
          <Link
            href={currentLang === "en" ? "/en" : "/"}
            className="group relative flex min-h-11 items-center px-1.5 py-1 whitespace-nowrap text-[13px] font-medium tracking-wide text-[#D2D8E3] transition hover:text-white uppercase xl:text-[14px]"
          >
            {currentLang === "en" ? "Home" : "Trang chủ"}
            <span className="absolute bottom-1 left-0 h-[1.5px] w-0 bg-[#C9A227] transition-all duration-300 group-hover/link:w-full" />
          </Link>

          {items.map((item) => (
            <div key={item.label} className="group relative flex h-full items-center">
              <Link
                href={item.href}
                className="group/link relative flex min-h-11 items-center gap-1 px-1.5 py-1 whitespace-nowrap text-[13px] font-medium tracking-wide text-[#D2D8E3] transition hover:text-white uppercase xl:gap-1.5 xl:text-[14px]"
              >
                {item.label}
                {item.children ? (
                  <ChevronDown className="h-3.5 w-3.5 shrink-0 text-[#C9A227] transition-transform duration-300 group-hover:rotate-180" />
                ) : null}
                <span className="absolute bottom-1 left-0 h-[1.5px] w-0 bg-[#C9A227] transition-all duration-300 group-hover/link:w-full" />
              </Link>

              {item.children ? (
                <div className="invisible absolute left-0 top-[85%] min-w-64 translate-y-3 rounded-2xl border border-white/10 border-t-2 border-t-[#C9A227] bg-[#0c1c33]/98 p-2.5 backdrop-blur-2xl opacity-0 shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="block rounded-xl px-4 py-3 text-[13px] font-medium text-[#D2D8E3] transition duration-200 hover:bg-white/10 hover:text-[#C9A227]"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}

          <div className="shrink-0 pl-2">
            <LanguageSwitcher lang={currentLang} />
          </div>
        </nav>

        {/* Primary Header CTA */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href={currentLang === "en" ? "/en/contact" : "/lien-he"}
            className="btn-gold-luxury shrink-0 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] whitespace-nowrap xl:px-6 xl:py-3 xl:text-xs"
          >
            {currentLang === "en" ? "CONTACT NOW" : "LIÊN HỆ NGAY"}
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 bg-white/5 text-white backdrop-blur-md transition hover:border-[#C9A227] lg:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
          aria-label={open ? (lang === "en" ? "Close menu" : "Đóng menu") : (lang === "en" ? "Open menu" : "Mở menu")}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {open ? (
        <nav
          className="border-t border-white/10 bg-[#06101f]/98 px-5 pb-8 pt-4 backdrop-blur-2xl max-h-[calc(100vh-80px)] overflow-y-auto no-scrollbar shadow-2xl lg:hidden"
          aria-label={lang === "en" ? "Mobile navigation" : "Điều hướng di động"}
        >
          <Link
            href={lang === "en" ? "/en" : "/"}
            onClick={() => setOpen(false)}
            className="block border-b border-white/10 py-3.5 text-sm font-semibold uppercase tracking-wider text-white"
          >
            {lang === "en" ? "Home" : "Trang chủ"}
          </Link>

          {items.map((item) => (
            <div key={item.label} className="border-b border-white/10">
              <div className="flex items-center">
                <Link
                  href={item.href}
                  onClick={() => {
                    if (!item.children) setOpen(false);
                  }}
                  className="flex-1 py-3.5 text-sm font-semibold uppercase tracking-wider text-white"
                >
                  {item.label}
                </Link>
                {item.children ? (
                  <button
                    type="button"
                    className="p-3 text-[#C9A227]"
                    aria-label={lang === "en" ? `Open ${item.label}` : `Mở ${item.label}`}
                    onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        expanded === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ) : null}
              </div>

              {item.children && expanded === item.label ? (
                <div className="mb-3 space-y-1 border-l-2 border-[#C9A227] pl-4">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      onClick={() => setOpen(false)}
                      className="block py-2.5 text-xs font-medium text-[#D2D8E3] hover:text-[#C9A227]"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}

          <div className="flex items-center justify-between py-4 border-b border-white/10">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
              {currentLang === "en" ? "Language" : "Ngôn ngữ"}
            </span>
            <LanguageSwitcher lang={currentLang} />
          </div>

          <Link
            href={currentLang === "en" ? "/en/contact" : "/lien-he"}
            onClick={() => setOpen(false)}
            className="btn-gold-luxury mt-5 block w-full text-center text-xs font-bold uppercase tracking-widest py-3.5"
          >
            {currentLang === "en" ? "CONTACT NOW" : "LIÊN HỆ NGAY"}
          </Link>
        </nav>
      ) : null}
    </header>
  );
}