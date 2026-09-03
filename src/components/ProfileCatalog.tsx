"use client";
import React, { useState } from "react";
import { BookOpen, Download, ChevronLeft, ChevronRight } from "lucide-react";

export default function ProfileCatalog() {
  const [activePage, setActivePage] = useState(1);
  const totalPages = 6;

  const catalogPages = [
    {
      page: 1,
      title: "Trang Bìa Catalogue Eurowindow 2026",
      image: "/catalogue/bia-eurowindow.jpg",
      caption: "Hồ Sơ Năng Lực & Giải Pháp Vật Liệu Xây Dựng Xanh Eurowindow",
    },
    {
      page: 2,
      title: "Hệ Thống Cửa Nhôm Cao Cấp Eurowindow",
      image: "/catalogue/cua-nhom-eurowindow.jpg",
      caption: "Cửa nhôm sơn tĩnh điện & nhôm Anode cao cấp tiêu chuẩn Châu Âu",
    },
    {
      page: 3,
      title: "Vách Kính Biệt Thự & Mặt Dựng Khổ Lớn",
      image: "/catalogue/vach-kinh-eurowindow.jpg",
      caption: "Vách kính mặt dựng Unitized, Semi-Unitized cách âm cách nhiệt hoàn hảo",
    },
    {
      page: 4,
      title: "Hệ Thống Cửa Nhựa uPVC & Cửa Cuốn",
      image: "/catalogue/cua-upvc-eurowindow.jpg",
      caption: "Giải pháp cửa nhựa uPVC chống ồn vượt trội bảo hành tới 10 năm",
    },
    {
      page: 5,
      title: "Cửa Gỗ Tự Nhiên & Cửa Chống Cháy",
      image: "/catalogue/cua-go-eurowindow.jpg",
      caption: "Hệ cửa gỗ công nghiệp & cửa gỗ chống cháy đạt chứng nhận PCCC",
    },
    {
      page: 6,
      title: "Chứng Nhận Quốc Tế & Dự Án Biểu Tượng",
      image: "/catalogue/du-an-eurowindow.jpg",
      caption: "Hơn 50.000+ công trình tiêu biểu trên toàn quốc & khu vực",
    },
  ];

  const nextPage = () => {
    setActivePage((prev) => (prev < totalPages ? prev + 1 : 1));
  };

  const prevPage = () => {
    setActivePage((prev) => (prev > 1 ? prev - 1 : totalPages));
  };

  return (
    <section id="profile-brochure" className="relative overflow-hidden bg-[#071523] py-24 text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute right-1/4 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#1677FF]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E2C275]/30 bg-[#E2C275]/10 px-4 py-1.5 backdrop-blur-md">
            <BookOpen className="h-4 w-4 text-[#E2C275]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#E2C275]">
              E-CATALOGUE INTERACTIVE
            </span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            CATALOGUE GIẢI PHÁP VẬT LIỆU EUROWINDOW
          </h2>
          <p className="text-sm text-[#D2D8E3] sm:text-base">
            Trải nghiệm catalogue điện tử 3D tương tác giới thiệu toàn bộ dòng sản phẩm cửa &amp; vách kính Eurowindow cao cấp.
          </p>
        </div>

        {/* 3D Flipbook Viewer Frame */}
        <div className="glass-card mt-12 max-w-4xl mx-auto p-6 sm:p-8 backdrop-blur-2xl">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#102238] shadow-inner flex items-center justify-center border border-white/10">
            <img
              src={catalogPages[activePage - 1].image}
              alt={catalogPages[activePage - 1].title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-opacity duration-500"
              onError={(e) => {
                // Fallback image if local path is missing
                (e.target as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071523]/90 via-transparent to-transparent" />

            {/* Navigation Overlay Buttons */}
            <button
              onClick={prevPage}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-[#071523]/80 p-3 text-white backdrop-blur-md transition hover:border-[#E2C275] hover:bg-[#E2C275] hover:text-[#071523]"
              title="Trang trước"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={nextPage}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-[#071523]/80 p-3 text-white backdrop-blur-md transition hover:border-[#E2C275] hover:bg-[#E2C275] hover:text-[#071523]"
              title="Trang tiếp"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Page Caption */}
            <div className="absolute bottom-4 left-6 right-6 text-center text-white">
              <span className="block text-xs font-bold uppercase tracking-widest text-[#E2C275]">
                {catalogPages[activePage - 1].title}
              </span>
              <p className="mt-1 text-xs text-[#D2D8E3]">
                {catalogPages[activePage - 1].caption}
              </p>
            </div>
          </div>

          {/* Controls & Thumbnail Pages */}
          <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-4 sm:flex-row">
            <div className="flex items-center space-x-2 text-xs font-bold text-[#D2D8E3]">
              <span>Trang {activePage} / {totalPages}</span>
            </div>

            {/* Thumbnails */}
            <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
              {catalogPages.map((p) => (
                <button
                  key={p.page}
                  onClick={() => setActivePage(p.page)}
                  className={`h-8 w-12 overflow-hidden rounded-md border-2 transition ${
                    activePage === p.page
                      ? "border-[#E2C275] scale-105"
                      : "border-white/10 opacity-50 hover:opacity-100"
                  }`}
                >
                  <img
                    src={p.image}
                    alt="Thumbnail"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80";
                    }}
                  />
                </button>
              ))}
            </div>

            <a
              href="#lien-he"
              className="btn-gold-luxury text-xs uppercase tracking-wider"
            >
              <Download className="h-4 w-4" />
              Tải Catalogue PDF
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
