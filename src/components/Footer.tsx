"use client";

import BrandLogo from "@/components/BrandLogo";
import Link from "next/link";
import { ArrowUp, Mail, Phone } from "lucide-react";
import { contact } from "@/data/eurowindow";
import { useState } from "react";

type FooterProps = { lang?: "vi" | "en" };

export default function Footer({ lang = "vi" }: FooterProps) {
  const t = lang === "en"
    ? {
        tagline: "Eurowindow provides complete solutions for doors, aluminium-glass partitions and finishing materials for modern buildings.",
        contact: "Contact",
        explore: "Explore",
        about: "About us",
        projects: "Projects",
        services: "Services",
        news: "News",
        newsletter: "Subscribe to our newsletter",
        newsletterPlaceholder: "Your email address",
        subscribe: "Subscribe",
        followUs: "Follow us",
      }
    : {
        tagline: "Eurowindow cung cấp giải pháp tổng thể về cửa, vách nhôm kính và vật liệu hoàn thiện cho các công trình hiện đại.",
        contact: "Liên hệ",
        explore: "Khám phá",
        about: "Giới thiệu",
        projects: "Dự án",
        services: "Dịch vụ",
        news: "Tin tức",
        newsletter: "Đăng ký nhận tin",
        newsletterPlaceholder: "Email của bạn",
        subscribe: "Đăng ký",
        followUs: "Theo dõi chúng tôi",
      };
  const base = lang === "en" ? "/en" : "";
  const aboutHref = lang === "en" ? "/en/about" : "/gioi-thieu";
  const projectsHref = lang === "en" ? "/en/projects" : "/du-an";
  const servicesHref = lang === "en" ? "/en/products" : "/san-pham";
  const newsHref = lang === "en" ? "/en/news" : "/tin-tuc";
  const [email, setEmail] = useState("");
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setEmail("");
  };
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <footer id="lien-he" className="border-t border-white/10 bg-[#071523] text-white">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.5fr_minmax(0,1fr)_minmax(0,1fr)] lg:py-24">
        <div>
          <BrandLogo />
          <p className="mt-6 max-w-md text-sm leading-7 text-[#D2D8E3]">
            {t.tagline}
          </p>
          <form onSubmit={handleSubscribe} className="mt-8 flex max-w-sm gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.newsletterPlaceholder}
              aria-label={t.newsletterPlaceholder}
              className="flex-1 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-[#94A3B8] outline-none backdrop-blur-md transition focus:border-[#E2C275] focus:ring-1 focus:ring-[#E2C275]/40"
            />
            <button
              type="submit"
              className="btn-gold-luxury px-5 py-3 text-xs uppercase tracking-wider"
            >
              {t.subscribe}
            </button>
          </form>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#E2C275]">
            {t.contact}
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-7 text-[#D2D8E3]">
            <p className="flex items-start gap-3">
              <Phone className="mt-1 h-4 w-4 shrink-0 text-[#E2C275]" />
              <span className="font-semibold">{contact.hotline}</span>
            </p>
            <p className="flex items-start gap-3">
              <Mail className="mt-1 h-4 w-4 shrink-0 text-[#E2C275]" />
              <span>{contact.email}</span>
            </p>
            <p className="flex items-start gap-3 text-[#D2D8E3]">
              {contact.address}
            </p>
          </div>
          <div className="mt-8 flex items-center gap-3">
            <a
              href="https://www.facebook.com/eurowindow"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-xs font-bold text-[#D2D8E3] backdrop-blur-md transition hover:border-[#E2C275] hover:bg-[#E2C275] hover:text-[#071523]"
            >
              FB
            </a>
            <a
              href="https://zalo.me/eurowindow"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Zalo"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-xs font-bold text-[#D2D8E3] backdrop-blur-md transition hover:border-[#E2C275] hover:bg-[#E2C275] hover:text-[#071523]"
            >
              Z
            </a>
            <a
              href="https://youtube.com/eurowindow"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-xs font-bold text-[#D2D8E3] backdrop-blur-md transition hover:border-[#E2C275] hover:bg-[#E2C275] hover:text-[#071523]"
            >
              YT
            </a>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#E2C275]">
            {t.explore}
          </h2>
          <div className="mt-6 space-y-3.5 text-sm text-[#D2D8E3]">
            <Link href={aboutHref} className="block transition hover:text-[#E2C275]">
              {t.about}
            </Link>
            <Link href={projectsHref} className="block transition hover:text-[#E2C275]">
              {t.projects}
            </Link>
            <Link href={servicesHref} className="block transition hover:text-[#E2C275]">
              {t.services}
            </Link>
            <Link href={newsHref} className="block transition hover:text-[#E2C275]">
              {t.news}
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-6 text-center text-xs text-[#94A3B8]">
        © {new Date().getFullYear()} Eurowindow HCM. All rights reserved.
      </div>
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#102238]/90 text-[#E2C275] shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-[#E2C275] hover:bg-[#E2C275] hover:text-[#071523]"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  );
}
