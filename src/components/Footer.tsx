"use client";

import BrandLogo from "@/components/BrandLogo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp, Building2, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { contact, partnerLinks } from "@/data/eurowindow";

type FooterProps = { lang?: "vi" | "en" };

export default function Footer({ lang = "vi" }: FooterProps) {
  const pathname = usePathname();
  const isEn = pathname?.startsWith("/en") || lang === "en";
  const currentLang = isEn ? "en" : "vi";
  const t = isEn
    ? {
        tagline: "Eurowindow delivers total European-standard solutions for doors, aluminium facades, and premium architectural materials across Vietnam.",
        contactTitle: "Contact Information",
        exploreTitle: "Navigation",
        partnersTitle: "Affiliated Platforms",
        branchSouthLabel: "Southern Branch",
        branchSouthVal: "39 Bis Mac Dinh Chi, Tan Dinh Ward, District 1, HCMC",
        factorySouthLabel: "Southern Manufacturing Plant",
        factorySouthVal: "DT745, Tan Uyen, Ho Chi Minh City Region",
        headquartersLabel: "Headquarters",
        headquartersVal: "Eurowindow Office Building, 02 Ton That Tung, Kim Lien, Dong Da, Hanoi",
        about: "About Eurowindow",
        projects: "Landmark Projects",
        products: "Architectural Systems",
        showrooms: "Showroom Network",
        services: "Consulting & Services",
        news: "News & Events",
      }
    : {
        tagline: "Eurowindow cung cấp giải pháp tổng thể về cửa, vách nhôm kính tiêu chuẩn Châu Âu và vật liệu kiến trúc cao cấp cho các công trình hiện đại.",
        contactTitle: "Thông Tin Liên Hệ",
        exploreTitle: "Khám Phá",
        partnersTitle: "Trang Liên Kết",
        branchSouthLabel: "Eurowindow Miền Nam",
        branchSouthVal: "39 Bis Mạc Đĩnh Chi, Phường Tân Định, TP. Hồ Chí Minh",
        factorySouthLabel: "Nhà Máy Sản Xuất Phía Nam",
        factorySouthVal: "ĐT745, P. Tân Uyên, TP. Hồ Chí Minh",
        headquartersLabel: "Trụ Sở Chính",
        headquartersVal: "Tòa nhà Văn phòng Eurowindow Office Building, Số 02 Tôn Thất Tùng, Kim Liên, Đống Đa, Hà Nội",
        about: "Về Eurowindow",
        projects: "Công trình tiêu biểu",
        products: "Danh mục sản phẩm",
        showrooms: "Hệ thống Showroom",
        services: "Dịch vụ & Thi công",
        news: "Tin tức & Sự kiện",
      };

  const aboutHref = isEn ? "/en/about" : "/gioi-thieu";
  const projectsHref = isEn ? "/en/projects" : "/du-an";
  const productsHref = isEn ? "/en/products" : "/san-pham";
  const showroomsHref = "/he-thong-showroom";
  const servicesHref = isEn ? "/en/services" : "/dich-vu";
  const newsHref = isEn ? "/en/news" : "/tin-tuc";

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer id="lien-he" className="border-t border-white/10 bg-[#06101f] text-white">
      <div className="mx-auto max-w-[1360px] px-5 py-16 sm:px-8 lg:py-24">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Column 1: Brand Info & Socials (4 cols) */}
          <div className="space-y-6 lg:col-span-4">
            <BrandLogo lang={currentLang} />
            <p className="text-sm sm:text-base leading-relaxed text-[#D2D8E3] max-w-sm">
              {t.tagline}
            </p>

            <div className="pt-2">
              <span className="block text-xs font-bold uppercase tracking-[0.16em] text-[#C9A227]">
                {isEn ? "Hotline 24/7" : "Hotline tư vấn dự án"}
              </span>
              <a
                href={`tel:${contact.hotline.replace(/\s+/g, "")}`}
                className="mt-1 inline-flex items-center gap-2 text-2xl font-bold text-[#C9A227] transition hover:text-white"
              >
                <Phone className="h-5 w-5" />
                {contact.hotline}
              </a>
            </div>

            {/* Social Media Channels */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.facebook.com/eurowindow.biz"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Eurowindow"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 backdrop-blur-md transition hover:border-[#C9A227] hover:bg-[#C9A227]/10 hover:scale-105"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  <path fill="#FFFFFF" d="M16.671 15.469l.532-3.47h-3.328V9.75c0-.949.465-1.874 1.956-1.874h1.491V4.922s-1.374-.235-2.686-.235c-2.741 0-4.533 1.662-4.533 4.669v2.648H7.078v3.47h3.047v8.385a12.09 12.09 0 001.875.146c.636 0 1.26-.05 1.875-.146v-8.385h2.796z" />
                </svg>
              </a>
              <a
                href="https://zalo.me/0966994338"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Zalo Eurowindow"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 backdrop-blur-md transition hover:border-[#C9A227] hover:bg-[#C9A227]/10 hover:scale-105"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#0068FF" d="M12.49 10.2722v-.4496h1.3467v6.3218h-.7704a.576.576 0 01-.5763-.5729l-.0006.0005a3.273 3.273 0 01-1.9372.6321c-1.8138 0-3.2844-1.4697-3.2844-3.2823 0-1.8125 1.4706-3.2822 3.2844-3.2822a3.273 3.273 0 011.9372.6321l.0006.0005zM6.9188 7.7896v.205c0 .3823-.051.6944-.2995 1.0605l-.03.0343c-.0542.0615-.1815.206-.2421.2843L2.024 14.8h4.8948v.7682a.5764.5764 0 01-.5767.5761H0v-.3622c0-.4436.1102-.6414.2495-.8476L4.8582 9.23H.1922V7.7896h6.7266zm8.5513 8.3548a.4805.4805 0 01-.4803-.4798v-7.875h1.4416v8.3548H15.47zM20.6934 9.6C22.52 9.6 24 11.0807 24 12.9044c0 1.8252-1.4801 3.306-3.3066 3.306-1.8264 0-3.3066-1.4808-3.3066-3.306 0-1.8237 1.4802-3.3044 3.3066-3.3044zm-10.1412 5.253c1.0675 0 1.9324-.8645 1.9324-1.9312 0-1.065-.865-1.9295-1.9324-1.9295s-1.9324.8644-1.9324 1.9295c0 1.0667.865 1.9312 1.9324 1.9312zm10.1412-.0033c1.0737 0 1.945-.8707 1.945-1.9453 0-1.073-.8713-1.9436-1.945-1.9436-1.0753 0-1.945.8706-1.945 1.9453 0 1.0746.8697 1.9453 1.945 1.9453z" />
                </svg>
              </a>
              <a
                href="https://youtube.com/eurowindow"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube Eurowindow"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 backdrop-blur-md transition hover:border-[#C9A227] hover:bg-[#C9A227]/10 hover:scale-105"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
                  <path fill="#FFFFFF" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Full Contact Info & Facilities (4 cols) */}
          <div className="space-y-4 lg:col-span-4">
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#C9A227]">
              {t.contactTitle}
            </h3>
            <div className="space-y-4 text-sm leading-relaxed text-[#D2D8E3]">
              <div className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#C9A227]" />
                <div>
                  <span className="font-semibold text-white">Hotline Miền Nam: </span>
                  <a href={`tel:${contact.hotline.replace(/\s+/g, "")}`} className="hover:text-[#C9A227] transition font-bold text-[#C9A227]">
                    {contact.hotline}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#C9A227]" />
                <div>
                  <span className="font-semibold text-white">Email: </span>
                  <a href={`mailto:${contact.email}`} className="hover:text-[#C9A227] transition">
                    {contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#C9A227]" />
                <div>
                  <span className="font-bold text-white block">{t.branchSouthLabel}:</span>
                  <span>{t.branchSouthVal}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-[#C9A227]" />
                <div>
                  <span className="font-bold text-white block">{t.headquartersLabel}:</span>
                  <span>{t.headquartersVal}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Navigation Links (2 cols) */}
          <div className="space-y-4 lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#C9A227]">
              {t.exploreTitle}
            </h3>
            <ul className="space-y-3.5 text-sm text-[#D2D8E3]">
              <li>
                <Link href={aboutHref} className="transition hover:text-[#C9A227]">
                  {t.about}
                </Link>
              </li>
              <li>
                <Link href={projectsHref} className="transition hover:text-[#C9A227]">
                  {t.projects}
                </Link>
              </li>
              <li>
                <Link href={productsHref} className="transition hover:text-[#C9A227]">
                  {t.products}
                </Link>
              </li>
              <li>
                <Link href={showroomsHref} className="transition hover:text-[#C9A227]">
                  {t.showrooms}
                </Link>
              </li>
              <li>
                <Link href={servicesHref} className="transition hover:text-[#C9A227]">
                  {t.services}
                </Link>
              </li>
              <li>
                <Link href={newsHref} className="transition hover:text-[#C9A227]">
                  {t.news}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Affiliated Platforms (2 cols) */}
          <div className="space-y-4 lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#C9A227]">
              {t.partnersTitle}
            </h3>
            <ul className="space-y-3.5 text-sm text-[#D2D8E3]">
              {(isEn
                ? [
                    { label: "Eurowindow - Leading Door Provider", href: "https://www.euroowindow.com/" },
                    { label: "Eurowindow Southern Branch", href: "https://www.eurowindowvn.com/" },
                    { label: "Eurowindow JSC Corporate", href: "https://www.eurowindowdoor.com/" },
                    { label: "Eurowindow Top Doors", href: "https://www.eurowindow.top/" },
                  ]
                : partnerLinks
              ).map((p, idx) => (
                <li key={idx}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 transition hover:text-[#C9A227]"
                  >
                    <span>{p.label}</span>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-60 transition group-hover:opacity-100 group-hover:text-[#C9A227]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Sub-footer Copyright */}
      <div className="border-t border-white/10 bg-[#040a14] px-5 py-6 text-center text-sm text-[#94A3B8]">
        <div className="mx-auto flex max-w-[1360px] flex-col items-center justify-between gap-3 sm:flex-row">
          <p>© {new Date().getFullYear()} Eurowindow HCM. All rights reserved.</p>
          <p className="text-xs text-[#64748B]">
            {isEn ? "Pioneering total European architectural door & facade systems in Vietnam" : "Thương hiệu tiên phong giải pháp cửa & vách nhôm kính tiêu chuẩn Châu Âu"}
          </p>
        </div>
      </div>

      {/* Back to Top Floating Button */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#0c1c33]/90 text-[#C9A227] shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:border-[#C9A227] hover:bg-[#C9A227] hover:text-[#06101f]"
      >
        <ArrowUp className="h-4 w-4" />
      </button>
    </footer>
  );
}
