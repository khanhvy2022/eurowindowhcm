import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { introImage, introParagraphs } from "@/data/eurowindow";

const introParagraphsEn = [
  "In 2002, Eurowindow pioneered the introduction of modern European-standard uPVC doors into Vietnam, initiating a revolution in door systems and opening a new era of comfortable, energy-efficient living spaces.",
  "Over more than two decades, Eurowindow has continuously expanded into aluminium doors, large glass curtain walls, wooden doors, automatic systems, and high-performance glass for iconic landmarks and modern residences across Vietnam.",
  "Always leading demand and establishing architectural trends, Eurowindow contributes to shaping urban skylines. Eurowindow products are present at hundreds of thousands of projects nationwide — from villas, hotels, and hospitals to state-level landmarks like the National Assembly House and Government Headquarters.",
  "Accompanying clients from consultation, design to execution and warranty — Eurowindow strives to deliver distinctive experiences and prosperous spaces for society.",
];

export default function Ecosystem({ lang = "vi" }: { lang?: "vi" | "en" }) {
  const isEn = lang === "en";
  const paragraphs = isEn ? introParagraphsEn : introParagraphs;

  return (
    <section id="gioi-thieu" className="relative overflow-hidden bg-[#06101f] py-24 sm:py-32 text-white">
      {/* Subtle Ambient Glow */}
      <div className="pointer-events-none absolute left-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#1677FF]/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="mb-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/40 bg-[#C9A227]/10 px-4 py-1.5 backdrop-blur-md">
              <ShieldCheck className="h-4 w-4 text-[#C9A227]" />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#C9A227]">
                {isEn ? "VIETNAM NATIONAL BRAND" : "THƯƠNG HIỆU QUỐC GIA"}
              </span>
            </div>
            <h2 className="font-serif text-3xl font-bold uppercase tracking-tight text-white md:text-5xl">
              {isEn ? "CREATING TIMELESS SPACES" : "KIẾN TẠO NHỮNG KHÔNG GIAN CÓ GIÁ TRỊ LÂU DÀI"}
            </h2>
          </div>

          <Link
            href={isEn ? "/en/about" : "/gioi-thieu"}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#C9A227] transition hover:text-white"
          >
            {isEn ? "Brand Heritage" : "Tìm hiểu về Eurowindow"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Editorial 2-Column Showcase */}
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Text Narrative */}
          <div className="space-y-6 lg:col-span-7">
            <div className="space-y-5 text-sm sm:text-base leading-[1.8] text-[#D2D8E3]">
              {paragraphs.map((paragraph, idx) => (
                <p key={idx} className={idx === 0 ? "text-base sm:text-lg font-medium text-white/95" : ""}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Core Values Bullet Row */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#C9A227] shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">Tiên phong công nghệ</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#C9A227] shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">Kiến tạo giá trị</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#C9A227] shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">Đồng hành trọn đời</span>
              </div>
            </div>
          </div>

          {/* Right Image Frame */}
          <div className="lg:col-span-5">
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0c1c33] p-3 shadow-2xl backdrop-blur-2xl">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden rounded-2xl bg-[#06101f]">
                <img
                  src={introImage}
                  alt={isEn ? "Eurowindow – total architectural solutions" : "Eurowindow – nhà cung cấp giải pháp tổng thể về cửa và vật liệu xây dựng xanh"}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06101f]/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/10 bg-[#06101f]/80 p-3 backdrop-blur-md">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-[#C9A227]">
                    TIÊU CHUẨN CHÂU ÂU • CÔNG NGHỆ CHLB ĐỨC
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
