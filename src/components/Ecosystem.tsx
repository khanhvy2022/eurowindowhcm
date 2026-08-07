import { ArrowRight, ShieldCheck } from "lucide-react";
import { introImage, introParagraphs } from "@/data/eurowindow";

export default function Ecosystem() {
  return (
    <section id="gioi-thieu" className="relative overflow-hidden bg-[#071523] py-24 text-white">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute left-1/4 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#1677FF]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E2C275]/30 bg-[#E2C275]/10 px-4 py-1.5 backdrop-blur-md">
              <ShieldCheck className="h-4 w-4 text-[#E2C275]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#E2C275]">
                THƯƠNG HIỆU THƯƠNG HIỆU QUỐC GIA
              </span>
            </div>
            <h2 className="text-3xl font-extrabold uppercase tracking-tight text-white md:text-5xl">
              GIỚI THIỆU EUROWINDOW
            </h2>
          </div>
          <a
            href="/gioi-thieu"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E2C275] transition hover:text-[#F0D18A]"
          >
            Tìm hiểu thêm về Eurowindow
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left Description */}
          <div className="glass-card p-8 lg:col-span-7 backdrop-blur-2xl">
            <div className="space-y-5 text-sm leading-relaxed text-[#D2D8E3] sm:text-base">
              {introParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-4 sm:divide-x sm:divide-white/10">
              <div className="sm:pr-2">
                <div className="text-2xl font-extrabold text-[#E2C275] sm:text-3xl">23+ Năm</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wider text-[#94A3B8]">Tiên Phong Thị Trường</div>
              </div>
              <div className="sm:px-4">
                <div className="text-2xl font-extrabold text-[#E2C275] sm:text-3xl">5 Nhà Máy</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wider text-[#94A3B8]">Công Nghệ Châu Âu</div>
              </div>
              <div className="sm:pl-4">
                <div className="text-2xl font-extrabold text-[#E2C275] sm:text-3xl">Top 1</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wider text-[#94A3B8]">Thị Phần Cửa &amp; Vách Kính</div>
              </div>
            </div>
          </div>

          {/* Right Image Display */}
          <div className="glass-card p-3 lg:col-span-5 backdrop-blur-2xl">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#102238]">
              <img
                src={introImage}
                alt="Eurowindow – nhà cung cấp giải pháp tổng thể về vật liệu xây dựng xanh"
                className="h-full w-full object-cover transition duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
