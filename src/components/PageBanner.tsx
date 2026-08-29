"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type PageBannerProps = {
  title: string;
  crumb: string;
  sub?: string;
  homeHref?: string;
  homeLabel?: string;
  bgImage?: string;
  headingAs?: "h1" | "h2" | "div";
};

export default function PageBanner({ title, crumb, sub, homeHref = "/", homeLabel, bgImage, headingAs = "h1" }: PageBannerProps) {
  const isEn = homeHref.startsWith("/en");
  const displayHome = homeLabel || (isEn ? "Home" : "Trang chủ");
  const bannerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(0);

  useEffect(() => {
    const el = bannerRef.current;
    if (!el) return;
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect();
          const offset = Math.max(0, -rect.top);
          setScrolled(offset);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const imageOffset = bgImage ? scrolled * 0.3 : 0;
  const contentOpacity = Math.min(1, Math.max(0.3, 1 - scrolled / 300));
  const contentTranslateY = scrolled * 0.15;

  const HeadingTag = headingAs;

  return (
    <section ref={bannerRef} className="relative overflow-hidden bg-[#071523] text-white">
      {bgImage ? (
        <>
          <img
            src={bgImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 scale-105"
            style={{ transform: `translateY(${imageOffset}px)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#071523]/80 via-[#071523]/70 to-[#071523]" />
        </>
      ) : (
        <>
          <div className="pointer-events-none absolute inset-0 bg-ambient-glow" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#071523]/40 via-transparent to-[#071523]" />
        </>
      )}
      <div
        className="relative mx-auto flex min-h-[300px] max-w-[1320px] flex-col items-center justify-center px-5 pt-[72px] pb-20 text-center sm:px-8 sm:pt-[86px] md:min-h-[380px] md:pb-24 lg:pt-[96px]"
        style={{ opacity: contentOpacity, transform: `translateY(${contentTranslateY}px)` }}
      >
        <HeadingTag className="max-w-4xl text-3xl font-extrabold uppercase leading-[1.1] tracking-[-0.03em] text-white sm:text-5xl md:text-[54px]">
          {title}
        </HeadingTag>
        {sub ? (
          <p className="mt-4 max-w-2xl text-base leading-8 text-[#D2D8E3] md:text-lg">
            {sub}
          </p>
        ) : null}
        <nav
          aria-label="Breadcrumb"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs font-semibold text-[#D2D8E3] backdrop-blur-md"
        >
          <Link href={homeHref} className="transition hover:text-[#E2C275]">
            {displayHome}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-[#E2C275]" />
          <span className="text-white">{crumb}</span>
        </nav>
      </div>
    </section>
  );
}