"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { news, newsCategories } from "@/data/eurowindow";
import { useState } from "react";

export default function NewsSlide() {
  const [activeCategory, setActiveCategory] = useState("su-kien");

  const filteredNews = activeCategory === "su-kien"
    ? news
    : news.filter((n) => n.category === activeCategory);

  return (
    <section id="tin-tuc" className="bg-[#0b1628] py-20 text-white md:py-28">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="mb-8 flex items-end justify-between gap-6">
          <h2 className="text-4xl font-bold uppercase tracking-[-0.055em] md:text-5xl">TIN TỨC</h2>
          <a href="/tin-tuc" className="hidden items-center gap-2 py-3 text-sm font-bold uppercase text-[#4da6e0] transition hover:text-white md:flex">
            Xem tất cả
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
          {newsCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 rounded-full px-5 py-2 text-sm font-bold uppercase tracking-wide transition ${activeCategory === cat.id ? "bg-[#0066aa] text-white" : "border border-white/20 text-zinc-300 hover:border-[#4da6e0] hover:text-[#4da6e0]"}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="slider-nav-wrapper group relative">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{ prevEl: ".news-prev", nextEl: ".news-next" }}
            pagination={{ el: ".news-pagination", clickable: true }}
            spaceBetween={20}
            slidesPerView={1.1}
            breakpoints={{ 640: { slidesPerView: 2.1 }, 1024: { slidesPerView: 3 } }}
          >
            {filteredNews.map((article) => (
              <SwiperSlide key={article.title}>
                <article className="group">
                  <div className="aspect-[1.45] overflow-hidden bg-[#152238] relative">
                    <img src={article.image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/20 transition duration-500 group-hover:bg-black/10" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold leading-snug tracking-[-0.03em]">{article.title}</h3>
                  <a href={article.href} className="mt-4 inline-flex items-center gap-2 py-3 text-sm font-bold uppercase group/link">
                    Đọc thêm
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </a>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
          <button type="button" className="news-prev slider-nav-btn slider-nav-prev" aria-label="Tin trước"><ArrowLeft className="h-5 w-5" /></button>
          <button type="button" className="news-next slider-nav-btn slider-nav-next" aria-label="Tin tiếp theo"><ArrowRight className="h-5 w-5" /></button>
          <div className="news-pagination mt-8 flex justify-center" />
        </div>
      </div>
    </section>
  );
}