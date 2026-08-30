"use client";

import { useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { achievements } from "@/data/eurowindow";

export default function StrategicPartners({ lang = "vi" }: { lang?: "vi" | "en" }) {
  const isEn = lang === "en";
  const [activeLogo, setActiveLogo] = useState<string | null>(null);

  return (
    <section className="bg-[#071523] overflow-hidden py-16 text-white md:py-24">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <h2 className="mb-14 text-4xl font-bold uppercase tracking-[-0.055em] md:text-5xl">
          {isEn ? "OUTSTANDING ACHIEVEMENTS" : "THÀNH TÍCH NỔI BẬT"}
        </h2>
      </div>
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2400, disableOnInteraction: false }}
        loop
        speed={750}
        spaceBetween={18}
        slidesPerView={1.8}
        breakpoints={{ 640: { slidesPerView: 3.2 }, 1024: { slidesPerView: 5.2 }, 1440: { slidesPerView: 6.2 } }}
        className="!overflow-visible"
      >
        {achievements.map((logo) => {
          const isActive = activeLogo === logo;
          return (
            <SwiperSlide key={logo}>
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
                className="group flex h-28 w-full cursor-pointer items-center justify-center px-4 md:h-32 focus:outline-none select-none"
              >
                <img
                  src={logo}
                  alt="Thành tích Eurowindow"
                  className={`aspect-[12/7] w-[194px] max-w-full object-contain transition-all duration-500 ${
                    isActive
                      ? "grayscale-0 opacity-100 scale-105"
                      : "grayscale opacity-60"
                  } group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 group-active:grayscale-0 group-active:opacity-100 group-active:scale-105 group-focus:grayscale-0 group-focus:opacity-100 group-focus:scale-105 hover:grayscale-0 hover:opacity-100 hover:scale-105 active:grayscale-0 active:opacity-100 active:scale-105 focus:grayscale-0 focus:opacity-100 focus:scale-105`}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
