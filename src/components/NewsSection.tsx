"use client";

import { ArrowLeft, ArrowRight, Newspaper } from "lucide-react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { news } from "@/data/eurowindow";
import Link from "next/link";

export default function NewsSection() {
  // Slide 5 bài viết mới nhất
  const displayNews = news.slice(0, 5);

  return (
    <section id="tin-tuc" className="relative overflow-hidden bg-[#071523] py-24 text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute right-1/3 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#1677FF]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E2C275]/30 bg-[#E2C275]/10 px-4 py-1.5 backdrop-blur-md">
              <Newspaper className="h-4 w-4 text-[#E2C275]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#E2C275]">
                TIN TỨC &amp; SỰ KIỆN NỔI BẬT
              </span>
            </div>
            <h2 className="text-3xl font-extrabold uppercase tracking-tight text-white md:text-5xl">
              TIN TỨC EUROWINDOW
            </h2>
          </div>
          <Link
            href="/tin-tuc"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E2C275] transition hover:text-[#F0D18A]"
          >
            Xem tất cả bài viết
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="slider-nav-wrapper group relative">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{ prevEl: ".news-prev", nextEl: ".news-next" }}
            pagination={{ el: ".news-pagination", clickable: true }}
            spaceBetween={24}
            slidesPerView={1.1}
            breakpoints={{ 640: { slidesPerView: 2.1 }, 1024: { slidesPerView: 3 } }}
          >
            {displayNews.map((article) => (
              <SwiperSlide key={article.title}>
                <article className="glass-card glass-card-hover group flex flex-col overflow-hidden p-5 h-full">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#102238]">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071523]/80 via-transparent to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between pt-5">
                    <h3 className="text-base font-bold leading-snug tracking-tight text-white transition group-hover:text-[#E2C275] line-clamp-3">
                      {article.title}
                    </h3>
                    <Link
                      href={article.href}
                      className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E2C275] transition hover:text-white"
                    >
                      Đọc chi tiết
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
          <button type="button" className="news-prev slider-nav-btn slider-nav-prev" aria-label="Tin trước">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button type="button" className="news-next slider-nav-btn slider-nav-next" aria-label="Tin tiếp theo">
            <ArrowRight className="h-5 w-5" />
          </button>
          <div className="news-pagination mt-10 flex justify-center" />
        </div>

        {/* Action Button: Xem tất cả bài viết */}
        <div className="mt-12 text-center">
          <Link
            href="/tin-tuc"
            className="btn-gold-luxury inline-flex items-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-widest"
          >
            Xem tất cả bài viết
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
