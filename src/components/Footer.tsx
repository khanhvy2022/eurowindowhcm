"use client";

import BrandLogo from "@/components/BrandLogo";
import Link from "next/link";
import { ArrowUp, Building2, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { contact, partnerLinks } from "@/data/eurowindow";

type FooterProps = { lang?: "vi" | "en" };

export default function Footer({ lang = "vi" }: FooterProps) {
  const isEn = lang === "en";
  const t = isEn
    ? {
        tagline: "Eurowindow provides complete solutions for doors, aluminium-glass partitions and finishing materials for modern buildings.",
        contactTitle: "Contact Info",
        exploreTitle: "Explore",
        partnersTitle: "Related Websites",
        branchSouthLabel: "Southern Branch",
        branchSouthVal: "39 Bis Mac Dinh Chi, Tan Dinh Ward, District 1, HCMC",
        headquartersLabel: "Headquarters",
        headquartersVal: "Eurowindow Office Building, 02 Ton That Tung, Kim Lien, Hanoi",
        about: "About Us",
        projects: "Projects",
        products: "Products",
        services: "Services",
        news: "News",
      }
    : {
        tagline: "Eurowindow cung cấp giải pháp tổng thể về cửa, vách nhôm kính và vật liệu hoàn thiện cho các công trình hiện đại.",
        contactTitle: "Thông Tin Liên Hệ",
        exploreTitle: "Khám Phá",
        partnersTitle: "Trang Liên Kết",
        branchSouthLabel: "Chi Nhánh Miền Nam",
        branchSouthVal: "39 Bis Mạc Đĩnh Chi, Phường Tân Định, TP.HCM",
        headquartersLabel: "Trụ Sở Chính",
        headquartersVal: "Tòa nhà Văn phòng Eurowindow Office Building, Số 02 Tôn Thất Tùng, Kim Liên, Hà Nội",
        about: "Giới thiệu",
        projects: "Dự án",
        products: "Sản phẩm",
        services: "Dịch vụ",
        news: "Tin tức",
      };

  const aboutHref = isEn ? "/en/about" : "/gioi-thieu";
  const projectsHref = isEn ? "/en/projects" : "/du-an";
  const productsHref = isEn ? "/en/products" : "/san-pham";
  const servicesHref = isEn ? "/en/services" : "/dich-vu";
  const newsHref = isEn ? "/en/news" : "/tin-tuc";

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer id="lien-he" className="border-t border-white/10 bg-[#071523] text-white">
      <div className="mx-auto max-w-[1320px] px-5 py-14 sm:px-8 lg:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Brand Info & Socials */}
          <div className="space-y-5">
            <BrandLogo />
            <p className="text-sm leading-6 text-[#D2D8E3]/90">
              {t.tagline}
            </p>
            <div className="pt-2">
              <span className="block text-xs font-semibold uppercase tracking-wider text-[#E2C275]">
                {isEn ? "Hotline 24/7" : "Hotline tư vấn"}
              </span>
              <a
                href={`tel:${contact.hotline.replace(/\s+/g, "")}`}
                className="mt-1 inline-flex items-center gap-2 text-lg font-extrabold text-[#E2C275] transition hover:text-white"
              >
                <Phone className="h-4 w-4" />
                {contact.hotline}
              </a>
            </div>
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://www.facebook.com/eurowindow"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-xs font-bold text-[#D2D8E3] backdrop-blur-md transition hover:border-[#E2C275] hover:bg-[#E2C275] hover:text-[#071523]"
              >
                FB
              </a>
              <a
                href="https://zalo.me/eurowindow"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Zalo"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-xs font-bold text-[#D2D8E3] backdrop-blur-md transition hover:border-[#E2C275] hover:bg-[#E2C275] hover:text-[#071523]"
              >
                Z
              </a>
              <a
                href="https://youtube.com/eurowindow"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-xs font-bold text-[#D2D8E3] backdrop-blur-md transition hover:border-[#E2C275] hover:bg-[#E2C275] hover:text-[#071523]"
              >
                YT
              </a>
            </div>
          </div>

          {/* Column 2: Contact Info */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#E2C275]">
              {t.contactTitle}
            </h2>
            <div className="space-y-3.5 text-xs leading-relaxed text-[#D2D8E3]/90">
              <div className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#E2C275]" />
                <div>
                  <span className="font-semibold text-white">Hotline: </span>
                  <a href={`tel:${contact.hotline.replace(/\s+/g, "")}`} className="hover:text-[#E2C275] transition font-bold text-[#E2C275]">
                    {contact.hotline}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#E2C275]" />
                <div>
                  <span className="font-semibold text-white">Email: </span>
                  <a href={`mailto:${contact.email}`} className="hover:text-[#E2C275] transition">
                    {contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#E2C275]" />
                <div>
                  <span className="font-bold text-white block">{t.branchSouthLabel}:</span>
                  <span>{t.branchSouthVal}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-[#E2C275]" />
                <div>
                  <span className="font-bold text-white block">{t.headquartersLabel}:</span>
                  <span>{t.headquartersVal}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Explore / Navigation */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#E2C275]">
              {t.exploreTitle}
            </h2>
            <ul className="space-y-2.5 text-xs text-[#D2D8E3]/90">
              <li>
                <Link href={aboutHref} className="transition hover:text-[#E2C275] hover:underline">
                  {t.about}
                </Link>
              </li>
              <li>
                <Link href={projectsHref} className="transition hover:text-[#E2C275] hover:underline">
                  {t.projects}
                </Link>
              </li>
              <li>
                <Link href={productsHref} className="transition hover:text-[#E2C275] hover:underline">
                  {t.products}
                </Link>
              </li>
              <li>
                <Link href={servicesHref} className="transition hover:text-[#E2C275] hover:underline">
                  {t.services}
                </Link>
              </li>
              <li>
                <Link href={newsHref} className="transition hover:text-[#E2C275] hover:underline">
                  {t.news}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Partner Websites */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#E2C275]">
              {t.partnersTitle}
            </h2>
            <ul className="space-y-2.5 text-xs text-[#D2D8E3]/90">
              {partnerLinks.map((p, idx) => (
                <li key={idx}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 transition hover:text-[#E2C275]"
                  >
                    <span className="group-hover:underline">{p.label}</span>
                    <ExternalLink className="h-3 w-3 shrink-0 opacity-70 transition group-hover:opacity-100 group-hover:text-[#E2C275]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Sub-footer */}
      <div className="border-t border-white/10 bg-[#040d16] px-5 py-5 text-center text-xs text-[#94A3B8]">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-3 sm:flex-row">
          <p>© {new Date().getFullYear()} Eurowindow HCM. All rights reserved.</p>
          <p className="text-[11px] text-[#64748B]">
            Giải pháp cửa & vách nhôm kính hàng đầu Việt Nam
          </p>
        </div>
      </div>

      {/* Back to Top */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#102238]/90 text-[#E2C275] shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:border-[#E2C275] hover:bg-[#E2C275] hover:text-[#071523]"
      >
        <ArrowUp className="h-4 w-4" />
      </button>
    </footer>
  );
}
