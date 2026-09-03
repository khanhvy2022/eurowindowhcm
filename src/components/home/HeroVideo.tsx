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
  posterSrc = "/videos/hero-poster.webp",
  badge = "THƯƠNG HIỆU QUỐC GIA • 23+ NĂM TIÊN PHONG",
  headline = "Eurowindow Kiến Tạo Không Gian Kiến Trúc Đẳng Cấp",
  subheadline = "Tiên phong cung cấp giải pháp tổng thể về cửa nhôm kính, cửa uPVC, cửa gỗ và vách kính tiêu chuẩn quốc tế cho các công trình biểu tượng và biệt thự hạng sang.",
  primaryCtaText = "Khám phá sản phẩm",
  primaryCtaHref = "/san-pham",
  secondaryCtaText = "Xem công trình",
  secondaryCtaHref = "/du-an",
  scrollHref = "#gioi-thieu",
  scrollAriaLabel = "Cuộn xuống khám phá",
}: HeroVideoProps) {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoMounted, setVideoMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setVideoMounted(true);

    // Check reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);

    // Pause video when out of viewport to preserve 100% CPU/GPU performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current || videoError) return;
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
  }, [videoError]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[92vh] lg:min-h-screen w-full overflow-hidden bg-[#06101f] flex items-center justify-center text-white pt-24 pb-16 lg:py-0"
      aria-label="Eurowindow Hero Architectural Showcase"
    >
      {/* 1. Cinematic Architectural Video Background / High-Res Poster Fallback */}
      <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
        {isReducedMotion || videoError || !videoMounted ? (
          <img
            src={posterSrc}
            alt="Eurowindow Architectural Glass & Aluminum Solutions"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={posterSrc}
            aria-hidden="true"
            onError={() => setVideoError(true)}
            className="h-full w-full object-cover pointer-events-none opacity-60 scale-[1.02] transition-transform duration-1000"
          >
            <source src={videoSrc} type="video/mp4" onError={() => setVideoError(true)} />
            <img
              src={posterSrc}
              alt="Eurowindow"
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </video>
        )}
      </div>

      {/* 2. Deep Architectural Navy Gradient Overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(6, 16, 31, 0.45) 0%, rgba(6, 16, 31, 0.78) 60%, rgba(6, 16, 31, 0.95) 100%)",
        }}
      />

      {/* Subtle Architectural Grid Lines */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-grid-dots opacity-15" />

      {/* 3. Hero Content Container */}
      <div className="relative z-20 mx-auto max-w-[960px] px-5 sm:px-8 text-center animate-hero-enter">
        {/* Luxury Gold National Brand Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C9A227]/40 bg-[#C9A227]/10 px-4 py-1.5 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-[#C9A227]" />
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#C9A227]">
            {badge}
          </span>
        </div>

        {/* Hero Architectural Serif Headline */}
        <h1 className="font-serif text-[28px] sm:text-[40px] md:text-[50px] lg:text-[58px] font-bold leading-[1.18] tracking-tight text-white drop-shadow-2xl">
          {headline}
        </h1>

        {/* Subheadline with Architectural Cadence */}
        <p className="mt-5 sm:mt-6 text-sm sm:text-base lg:text-[17px] font-normal leading-[1.75] text-[#D2D8E3] max-w-[760px] mx-auto drop-shadow-md">
          {subheadline}
        </p>

        {/* Action CTAs: Gold Primary + Transparent Secondary Outline */}
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link
            href={primaryCtaHref}
            className="btn-gold-luxury w-full sm:w-auto px-8 py-4 text-xs font-bold uppercase tracking-[0.16em] flex items-center justify-center gap-2.5 shadow-[0_4px_24px_rgba(201,162,39,0.35)]"
          >
            {primaryCtaText}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={secondaryCtaHref}
            className="btn-secondary-outline w-full sm:w-auto px-8 py-4 text-xs font-bold uppercase tracking-[0.16em] flex items-center justify-center gap-2 border-white/20 hover:border-[#C9A227]"
          >
            {secondaryCtaText}
          </Link>
        </div>
      </div>

      {/* 4. Minimalist Scroll Indicator */}
      <a
        href={scrollHref}
        className="hidden md:flex absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex-col items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#D2D8E3]/70 transition hover:text-[#C9A227]"
        aria-label={scrollAriaLabel}
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/25 p-1 backdrop-blur-sm">
          <div className="h-1.5 w-1 rounded-full bg-[#C9A227] animate-scroll-dot" />
        </div>
        <span className="text-[9px] font-mono tracking-[0.2em] opacity-60">CUỘN XUỐNG</span>
      </a>
    </section>
  );
}
