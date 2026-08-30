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
        showrooms: "Showrooms",
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
        showrooms: "Showroom",
        services: "Dịch vụ",
        news: "Tin tức",
      };

  const aboutHref = isEn ? "/en/about" : "/gioi-thieu";
  const projectsHref = isEn ? "/en/projects" : "/du-an";
  const productsHref = isEn ? "/en/products" : "/san-pham";
  const showroomsHref = "/he-thong-showroom";
  const servicesHref = isEn ? "/en/services" : "/dich-vu";
  const newsHref = isEn ? "/en/news" : "/tin-tuc";

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer id="lien-he" className="border-t border-white/10 bg-[#071523] text-white">
      <div className="mx-auto max-w-[1320px] px-5 py-14 sm:px-8 lg:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Brand Info & Socials */}
          <div className="space-y-5">
            <BrandLogo lang={currentLang} />
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
                href="https://www.facebook.com/eurowindow.biz"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Eurowindow"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 backdrop-blur-md transition hover:border-[#E2C275] hover:bg-[#E2C275]/10 hover:scale-105"
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
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 backdrop-blur-md transition hover:border-[#E2C275] hover:bg-[#E2C275]/10 hover:scale-105"
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
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 backdrop-blur-md transition hover:border-[#E2C275] hover:bg-[#E2C275]/10 hover:scale-105"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
                  <path fill="#FFFFFF" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
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
                <Link href={showroomsHref} className="transition hover:text-[#E2C275] hover:underline">
                  {t.showrooms}
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
              {(isEn
                ? [
                    { label: "Eurowindow - Leading Total Door Provider in Vietnam", href: "https://www.euroowindow.com/" },
                    { label: "Eurowindow - Southern Branch", href: "https://www.eurowindowvn.com/" },
                    { label: "Eurowindow JSC Corporate", href: "https://www.eurowindowdoor.com/" },
                    { label: "Eurowindow Southern Doors", href: "https://www.eurowindow.top/" },
                  ]
                : partnerLinks
              ).map((p, idx) => (
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
            {isEn ? "Leading total door & glass facade solutions in Vietnam" : "Giải pháp cửa & vách nhôm kính hàng đầu Việt Nam"}
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
