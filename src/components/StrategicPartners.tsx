"use client";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { achievements } from "@/data/eurowindow";

export default function StrategicPartners({ lang = "vi" }: { lang?: "vi" | "en" }) {
  const isEn = lang === "en";
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
        {achievements.map((logo) => (
          <SwiperSlide key={logo}>
            <div className="flex h-28 items-center justify-center px-4 md:h-32">
              <img
                src={logo}
                alt=""
                role="presentation"
                aria-hidden="true"
                className="aspect-[12/7] w-[194px] max-w-full object-contain grayscale opacity-60 transition-all duration-500 hover:grayscale-0 hover:opacity-100 hover:scale-105"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
