"use client";

import { useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { achievements } from "@/data/eurowindow";
import { Award } from "lucide-react";

export default function StrategicPartners({ lang = "vi" }: { lang?: "vi" | "en" }) {
  const isEn = lang === "en";
  const [activeLogo, setActiveLogo] = useState<string | null>(null);

  return (
    <section className="bg-[#071523] overflow-hidden py-20 sm:py-28 text-white border-t border-b border-white/5">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 mb-12">
        <div className="space-y-3 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/40 bg-[#C9A227]/10 px-4 py-1.5 backdrop-blur-md">
            <Award className="h-4 w-4 text-[#C9A227]" />
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#C9A227]">
              {isEn ? "TRUSTED CREDENTIALS" : "ĐƯỢC TIN DÙNG & CÔNG NHẬN"}
            </span>
          </div>
          <h2 className="font-serif text-3xl font-bold uppercase tracking-tight text-white md:text-4xl">
            {isEn ? "NATIONAL AWARDS & CERTIFICATIONS" : "THÀNH TÍCH & CHỨNG NHẬN QUỐC GIA"}
          </h2>
        </div>
      </div>

      <div className="relative">
        {/* Soft edge gradient masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-[#071523] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-[#071523] to-transparent" />

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 1800, disableOnInteraction: false }}
          loop
          speed={1000}
          spaceBetween={24}
          slidesPerView={2.2}
          breakpoints={{
            640: { slidesPerView: 3.5, spaceBetween: 24 },
            1024: { slidesPerView: 5.2, spaceBetween: 32 },
            1440: { slidesPerView: 6.2, spaceBetween: 40 },
          }}
          className="!overflow-visible py-4"
        >
          {achievements.map((logo, idx) => {
            const isActive = activeLogo === logo;
            return (
              <SwiperSlide key={idx}>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveLogo((prev) => (prev === logo ? null : logo))}
                  onTouchStart={() => setActiveLogo(logo)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setActiveLogo((prev) => (prev === logo ? null : logo));
                    }
                  }}
                  className="group flex h-24 w-full cursor-pointer items-center justify-center rounded-2xl border border-white/5 bg-[#0c1c33]/40 p-4 transition-all duration-300 hover:border-[#C9A227]/30 hover:bg-[#0c1c33] focus:outline-none select-none"
                >
                  <img
                    src={logo}
                    alt="Thành tích chứng nhận Eurowindow"
                    className={`max-h-14 w-auto object-contain transition-all duration-500 ${
                      isActive
                        ? "grayscale-0 opacity-100 scale-105"
                        : "grayscale opacity-50"
                    } group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105`}
                    loading="lazy"
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
