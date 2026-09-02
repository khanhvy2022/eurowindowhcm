import { ArrowRight, Phone, Sparkles } from "lucide-react";
import Link from "next/link";
import { contact } from "@/data/eurowindow";

interface FinalCTAProps {
  lang?: "vi" | "en";
}

export default function FinalCTA({ lang = "vi" }: FinalCTAProps) {
  const isEn = lang === "en";

  return (
    <section className="relative overflow-hidden bg-[#06101f] py-24 sm:py-32 text-white border-t border-white/10">
      {/* Background Architectural Atmosphere */}
      <div className="absolute inset-0 z-0">
        <img
          src="/eurowindow/cuanhom.jpg.webp"
          alt="Eurowindow architectural glass systems"
          className="h-full w-full object-cover opacity-20 filter grayscale"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06101f] via-[#06101f]/90 to-[#06101f]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8 text-center space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/40 bg-[#C9A227]/10 px-4 py-1.5 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-[#C9A227]" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A227]">
            {isEn ? "ELEVATE YOUR ARCHITECTURAL VISION" : "ĐỒNG HÀNH CÙNG CÔNG TRÌNH CỦA BẠN"}
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
          {isEn
            ? "Creating Distinctive Living & Architectural Spaces"
            : "Kiến Tạo Không Gian Khác Biệt Cùng Eurowindow"}
        </h2>

        <p className="mx-auto max-w-2xl text-sm sm:text-base leading-relaxed text-[#D2D8E3]">
          {isEn
            ? "Connect with Eurowindow architectural specialists for bespoke door and facade consulting, showroom demonstrations, and certified technical estimations."
            : "Liên hệ ngay đội ngũ chuyên gia Eurowindow để nhận tư vấn giải pháp cửa nhôm kính, trải nghiệm showroom thực tế và dự toán kỹ thuật chuẩn quốc tế."}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4">
          <Link
            href={isEn ? "/en/contact" : "/lien-he"}
            className="btn-gold-luxury w-full sm:w-auto px-8 py-4 text-xs font-bold uppercase tracking-[0.16em] flex items-center justify-center gap-2.5 shadow-[0_4px_25px_rgba(201,162,39,0.35)]"
          >
            <span>{isEn ? "GET IN TOUCH" : "LIÊN HỆ NGAY"}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <a
            href={`tel:${contact.hotline.replace(/\s+/g, "")}`}
            className="btn-secondary-outline w-full sm:w-auto px-8 py-4 text-xs font-bold uppercase tracking-[0.16em] flex items-center justify-center gap-2.5 border-white/20 hover:border-[#C9A227]"
          >
            <Phone className="h-4 w-4 text-[#C9A227]" />
            <span>HOTLINE: {contact.hotline}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
