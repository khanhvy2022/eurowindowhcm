import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ArrowDownToLine,
  ArrowRight,
  ExternalLink,
  FileText,
  Phone,
  ShieldCheck,
  Sparkles,
  Layers,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { contact } from "@/data/eurowindow";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catalogue Eurowindow 2024 – Bản Gốc PDF & Danh Mục Sản Phẩm Mới Nhất",
  description:
    "Tải trực tiếp hoặc tra cứu trực tuyến Catalogue Eurowindow 2024 bản gốc PDF: thông số kỹ thuật cửa nhôm EA55–EA95i, cửa nhựa uPVC Châu Âu, cửa gỗ, kính an toàn và cửa thông minh.",
  alternates: {
    canonical: "https://www.eurowindowhcm.com/catalogue",
    languages: {
      vi: "https://www.eurowindowhcm.com/catalogue",
      "x-default": "https://www.eurowindowhcm.com/catalogue",
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Cửa Eurowindow Hồ Chí Minh",
    title: "Catalogue Eurowindow 2024 – Bản Gốc PDF & Danh Mục Sản Phẩm Mới Nhất",
    description:
      "Tải trực tiếp hoặc tra cứu trực tuyến Catalogue Eurowindow 2024 bản gốc PDF: cửa nhôm EA55–EA95i, cửa nhựa uPVC Châu Âu, cửa gỗ, kính an toàn.",
    url: "https://www.eurowindowhcm.com/catalogue",
    images: [
      {
        url: "https://www.eurowindowhcm.com/eurowindow/cuanhom.jpg.webp",
        width: 1200,
        height: 630,
        alt: "Catalogue Eurowindow 2024",
      },
    ],
  },
};

export default function CataloguePage() {
  const pdfUrl = "/Catalogue%20Eurowindow%202024.pdf";
  const pdfFileName = "Catalogue Eurowindow 2024.pdf";

  const catalogueHighlights = [
    {
      number: "01",
      title: "Hệ Cửa Nhôm & Vách Kính Lớn",
      desc: "Profile nhôm cao cấp EA55, EA65, EA95i có cầu cách nhiệt Polyamide, phụ kiện Cmech, Roto, Hafele đạt chuẩn Châu Âu.",
      href: "/san-pham/cua-nhom",
    },
    {
      number: "02",
      title: "Cửa Nhựa uPVC Tiêu Chuẩn Châu Âu",
      desc: "Profile Kömmerling (CHLB Đức) đa khoang cách âm tới 44dB, lõi thép gia cường mạ kẽm và hệ gioăng EPDM kín nước.",
      href: "/san-pham/cua-nhua-upvc",
    },
    {
      number: "03",
      title: "Cửa Gỗ & Gỗ Chống Cháy",
      desc: "Gỗ tự nhiên, ghép thanh công nghệ biến tính sấy ẩm <12%, cửa gỗ chống cháy kiểm định PCCC 60 – 120 phút.",
      href: "/san-pham/cua-go",
    },
    {
      number: "04",
      title: "Sản Phẩm Kính Kiến Trúc Cao Cấp",
      desc: "Kính Low-E cản bức xạ mặt trời, hộp kính khí trơ Argon, kính dán an toàn EN 12150 và kính điện đổi màu thông minh.",
      href: "/san-pham/san-pham-kinh",
    },
    {
      number: "05",
      title: "Cửa Tự Động & Cửa Cuốn Nhôm",
      desc: "Cửa trượt, cửa xoay tự động cảm biến radar và cửa cuốn khe thoáng EASD45 tích hợp cảm biến đảo chiều an toàn.",
      href: "/san-pham/cua-tu-dong",
    },
    {
      number: "06",
      title: "Công Trình & Landmark Tiêu Biểu",
      desc: "Hồ sơ năng lực thi công Nhà Quốc hội, Văn phòng Chính phủ, Cảng hàng không quốc tế Phú Bài, Bệnh viện Việt Pháp...",
      href: "/du-an",
    },
  ];

  return (
    <div className="min-h-screen bg-[#06101f] text-white">
      <Header />
      <main id="main-content">
        {/* 1. European Luxury Hero Section */}
        <section className="relative overflow-hidden bg-[#06101f] pt-32 pb-20 sm:pt-40 sm:pb-28 border-b border-white/10">
          <div className="pointer-events-none absolute -left-40 top-0 h-[600px] w-[600px] rounded-full bg-[#1677FF]/5 blur-[140px]" />
          <div className="pointer-events-none absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-[#C9A227]/5 blur-[140px]" />

          <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 text-center space-y-6">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/40 bg-[#C9A227]/10 px-4 py-1.5 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-[#C9A227]" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#C9A227]">
                TÀI LIỆU KỸ THUẬT &amp; DANH MỤC CHÍNH THỨC
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              Catalogue Eurowindow 2024
            </h1>

            <p className="mx-auto max-w-3xl text-sm sm:text-base lg:text-lg leading-relaxed text-[#D2D8E3]">
              Tài liệu kỹ thuật tổng hợp toàn bộ các hệ giải pháp cửa nhôm kính, cửa uPVC tiêu chuẩn Châu Âu, cửa gỗ, kính an toàn và cửa thông minh mới nhất từ thương hiệu Eurowindow.
            </p>

            {/* Action Buttons: Download PDF & Open Fullscreen */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4">
              <a
                href={pdfUrl}
                download={pdfFileName}
                className="btn-gold-luxury w-full sm:w-auto px-8 py-4 text-xs font-bold uppercase tracking-[0.16em] flex items-center justify-center gap-2.5 shadow-[0_4px_25px_rgba(201,162,39,0.35)]"
              >
                <ArrowDownToLine className="h-4 w-4" />
                <span>TẢI CATALOGUE PDF (8.4 MB)</span>
              </a>

              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-outline w-full sm:w-auto px-8 py-4 text-xs font-bold uppercase tracking-[0.16em] flex items-center justify-center gap-2.5 border-white/20 hover:border-[#C9A227]"
              >
                <ExternalLink className="h-4 w-4 text-[#C9A227]" />
                <span>XEM TOÀN MÀN HÌNH</span>
              </a>
            </div>

            {/* Quick Meta Info */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-[#94A3B8]">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#C9A227]" />
                <span>Định dạng: <strong>PDF Chất Lượng Cao</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#C9A227]" />
                <span>Bản quyền: <strong>Công ty CP Eurowindow</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-[#C9A227]" />
                <span>Phiên bản: <strong>Năm 2024 (Mới nhất)</strong></span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Embedded Interactive PDF Viewer */}
        <section className="py-16 sm:py-24 bg-[#071523] border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#C9A227]">
                  TRA CỨU TRỰC TUYẾN
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Xem Trực Tiếp Bản Catalogue 2024
                </h2>
              </div>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#C9A227] hover:text-white transition"
              >
                <span>Mở trong tab mới</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            {/* PDF Viewer Frame */}
            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#0c1c33] shadow-2xl">
              <iframe
                src={`${pdfUrl}#toolbar=1&navpanes=1`}
                title="Catalogue Eurowindow 2024 Viewer"
                className="w-full h-[600px] sm:h-[750px] lg:h-[900px] border-0"
              />
              <div className="p-4 bg-[#06101f]/90 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#94A3B8]">
                <span>Nếu trình duyệt không tự động tải khung xem trước, vui lòng nhấn nút bên phải:</span>
                <a
                  href={pdfUrl}
                  download={pdfFileName}
                  className="btn-gold-luxury px-4 py-2 text-[11px] font-bold uppercase tracking-wider shrink-0"
                >
                  Tải file PDF về máy
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Catalogue Content Highlights Grid */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-14 space-y-3 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/40 bg-[#C9A227]/10 px-4 py-1.5 backdrop-blur-md">
                <Layers className="h-4 w-4 text-[#C9A227]" />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#C9A227]">
                  DANH MỤC TRONG CATALOGUE
                </span>
              </div>
              <h2 className="font-serif text-3xl font-bold uppercase tracking-tight text-white md:text-4xl">
                Nội Dung Trọng Tâm Catalogue 2024
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {catalogueHighlights.map((item) => (
                <article
                  key={item.number}
                  className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0c1c33]/70 p-7 backdrop-blur-xl transition-all duration-300 hover:border-[#C9A227]/40 hover:-translate-y-1.5 shadow-lg"
                >
                  <div className="space-y-3">
                    <span className="font-serif text-3xl font-bold text-[#C9A227]">
                      {item.number}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-white transition group-hover:text-[#C9A227]">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-[#D2D8E3]">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/5">
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#C9A227] transition hover:text-white"
                    >
                      <span>Xem sản phẩm</span>
                      <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Consultation & Quote Booking CTA */}
        <section className="bg-[#0c1c33] py-20 border-t border-white/10 text-center">
          <div className="mx-auto max-w-4xl px-5 space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Cần Báo Giá Chi Tiết Theo Catalogue Eurowindow 2024?
            </h2>
            <p className="text-sm sm:text-base text-[#D2D8E3] max-w-2xl mx-auto">
              Đội ngũ kỹ sư Eurowindow HCM sẵn sàng tư vấn cấu hình profile, bản vẽ CAD và lên dự toán chi phí trọn gói cho công trình của quý khách.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/lien-he"
                className="btn-gold-luxury px-8 py-4 text-xs font-bold uppercase tracking-widest"
              >
                YÊU CẦU BÁO GIÁ DỰ TOÁN
              </Link>
              <a
                href={`tel:${contact.hotline.replace(/\s+/g, "")}`}
                className="btn-secondary-outline px-8 py-4 text-xs font-bold uppercase tracking-widest flex items-center gap-2"
              >
                <Phone className="h-4 w-4 text-[#C9A227]" />
                <span>HOTLINE: {contact.hotline}</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
