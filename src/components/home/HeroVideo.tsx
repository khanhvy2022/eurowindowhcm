"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

interface HeroVideoProps {
  videoSrc?: string;
  posterSrc?: string;
  badge?: string;
  headline?: string;
  subheadline?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  scrollHref?: string;
  scrollAriaLabel?: string;
}

export default function HeroVideo({
  videoSrc = "/videos/hero-video-optimized.mp4",
  posterSrc = "/videos/hero-poster.jpg",
  badge = "GIẢI PHÁP VẬT LIỆU KIẾN TRÚC CAO CẤP",
  headline = "Eurowindow - Kiến tạo không gian sống đẳng cấp",
  subheadline = "Eurowindow mang đến các giải pháp cửa, kính và vật liệu xây dựng cao cấp cho biệt thự, căn hộ và công trình hiện đại.",
  primaryCtaText = "Khám phá sản phẩm",
  primaryCtaHref = "/san-pham",
  secondaryCtaText = "Xem dự án tiêu biểu",
  secondaryCtaHref = "/du-an",
  scrollHref = "#gioi-thieu",
  scrollAriaLabel = "Cuộn xuống khám phá",
}: HeroVideoProps) {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);

    // Pause video when out of viewport to preserve 100% CPU/GPU for the rest of the site
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return;
        if (entry.isIntersecting) {
          videoRef.current.play().catch(() => {});
        } else {
          videoRef.current.pause();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#071523] flex items-center justify-center text-white"
      aria-label="Eurowindow Hero Section"
    >
      {/* 1. Video Background / Native Poster Fallback */}
      <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
        {isReducedMotion ? (
          <img
            src={posterSrc}
            alt="Eurowindow Architectural Glass & Aluminum Solutions"
            className="h-full w-full object-cover"
          />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={posterSrc}
            aria-hidden="true"
            className="h-full w-full object-cover pointer-events-none"
          >
            <source src="/videos/hero-video-optimized.mp4" type="video/mp4" />
            <img src={posterSrc} alt="Eurowindow" className="h-full w-full object-cover" />
          </video>
        )}
      </div>

      {/* 2. Mandatory Midnight Sapphire Gradient Overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(7,21,35,0.45) 0%, rgba(7,21,35,0.65) 40%, rgba(7,21,35,0.82) 100%)",
        }}
      />

      {/* 3. Hero Content Container */}
      <div className="relative z-20 mx-auto max-w-[860px] px-6 text-center animate-hero-enter">
        {/* Luxury Gold Badge */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#E2C275]/40 bg-[#E2C275]/10 px-4 py-1.5 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-[#E2C275]" />
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#E2C275]">
            {badge}
          </span>
        </div>

        {/* Hero Headline (Compact, elegant typography) */}
        <h1 className="text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold leading-[1.25] tracking-tight text-white drop-shadow-lg">
          {headline}
        </h1>

        {/* Subheadline */}
        <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-[17px] font-normal leading-[1.7] text-[#D2D8E3] max-w-[680px] mx-auto drop-shadow">
          {subheadline}
        </p>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
          <Link
            href={primaryCtaHref}
            className="btn-gold-luxury w-full sm:w-auto px-7 py-3.5 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
          >
            {primaryCtaText}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={secondaryCtaHref}
            className="btn-secondary-outline w-full sm:w-auto px-7 py-3.5 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
          >
            {secondaryCtaText}
          </Link>
        </div>
      </div>

      {/* 4. Animated Scroll Indicator */}
      <a
        href={scrollHref}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#D2D8E3]/80 transition hover:text-[#E2C275]"
        aria-label={scrollAriaLabel}
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/30 p-1.5 backdrop-blur-sm">
          <div className="h-2 w-1.5 rounded-full bg-[#E2C275] animate-scroll-dot" />
        </div>
        <span className="text-[10px] font-mono tracking-wider opacity-70">SCROLL</span>
      </a>
    </section>
  );
}
