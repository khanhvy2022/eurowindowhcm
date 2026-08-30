"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  Play,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Building2,
  MapPin,
  Clock,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Film,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

function YoutubeIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export interface ProjectVideo {
  id: string;
  youtubeId: string;
  title: string;
  titleEn: string;
  category: string;
  categoryEn: string;
  categoryId: string;
  location: string;
  locationEn: string;
  duration: string;
  thumbnail: string;
  description: string;
  descriptionEn: string;
  projectHref: string;
  projectHrefEn?: string;
}

export const projectVideos: ProjectVideo[] = [
  {
    id: "nhom-cau-cach-nhiet",
    youtubeId: "6QQiQ_QF5tE",
    title: "GIỚI THIỆU CỬA NHÔM CÓ CẦU CÁCH NHIỆT EUROWINDOW",
    titleEn: "INTRODUCTION TO EUROWINDOW THERMAL-BREAK ALUMINUM DOORS",
    category: "CỬA NHÔM CÁCH NHIỆT",
    categoryEn: "THERMAL-BREAK ALUMINUM",
    categoryId: "cua-nhom",
    location: "Giải pháp kiến trúc xanh",
    locationEn: "Green Architecture Solution",
    duration: "03:20",
    thumbnail: "/eurowindow/videos/cover-video-web-ew-6-1-06.jpg.webp",
    description:
      "Dòng sản phẩm cửa nhôm có cầu cách nhiệt cao cấp Eurowindow với profile EA55–EA95i, dải polyamide cản nhiệt, giúp giảm tới 30% chi phí điện năng điều hòa và cách âm vượt trội.",
    descriptionEn:
      "Eurowindow premium thermal-break aluminum doors and windows featuring polyamide barrier, delivering up to 30% HVAC energy savings and superior acoustic insulation.",
    projectHref: "/san-pham/cua-nhom",
    projectHrefEn: "/en/products/cua-nhom-vach-kinh",
  },
  {
    id: "ban-le-san-tu-dong",
    youtubeId: "HapB4msG6NA",
    title: "CỬA BẢN LỀ SÀN TỰ ĐỘNG",
    titleEn: "AUTOMATIC FLOOR HINGE GLASS DOORS",
    category: "CỬA TỰ ĐỘNG",
    categoryEn: "AUTOMATIC DOORS",
    categoryId: "cua-tu-dong",
    location: "Tòa nhà & Biệt thự hiện đại",
    locationEn: "Commercial & Luxury Villas",
    duration: "02:15",
    thumbnail: "/eurowindow/videos/cover-video-web-ew-13.jpg.webp",
    description:
      "Cửa bản lề sàn tự động Eurowindow đóng mở 2 chiều linh hoạt với mắt thần hồng ngoại cảm biến chuyển động, motor âm sàn siêu êm và tính năng an toàn chống kẹp thông minh.",
    descriptionEn:
      "Eurowindow 2-way automatic floor hinge doors with smart motion radar sensors, concealed silent motors, and intelligent anti-pinch safety features.",
    projectHref: "/san-pham/cua-tu-dong",
    projectHrefEn: "/en/products/cua-tu-dong-va-cua-xoay",
  },
  {
    id: "gap-truot-doc-tu-dong",
    youtubeId: "5taI1-fi2Xg",
    title: "CỬA GẤP TRƯỢT DỌC TỰ ĐỘNG",
    titleEn: "AUTOMATIC VERTICAL FOLDING SLIDING DOORS",
    category: "CỬA THÔNG MINH",
    categoryEn: "SMART DOORS",
    categoryId: "thong-minh",
    location: "Biệt thự & Resort nghỉ dưỡng",
    locationEn: "Luxury Estates & Resorts",
    duration: "02:40",
    thumbnail: "/eurowindow/videos/cover-video-web-ew-14.jpg.webp",
    description:
      "Đột phá với thiết kế công năng “2 trong 1”, vừa là cửa sổ đón gió tầm nhìn panorama vừa nâng lên thành mái che hiên sang trọng, điều khiển nút bấm hoặc remote từ xa.",
    descriptionEn:
      "Breakthrough 2-in-1 multi-functional design transforming from a panoramic window into a modern sun awning canopy, motorized with smart remote controls.",
    projectHref: "/san-pham/cua-tu-dong",
    projectHrefEn: "/en/products/cua-tu-dong-va-cua-xoay",
  },
  {
    id: "dieu-khien-giong-noi",
    youtubeId: "iwpTPrCayUo",
    title: "CỬA SỔ ĐIỀU KHIỂN BẰNG GIỌNG NÓI",
    titleEn: "VOICE-CONTROLLED SMART WINDOWS",
    category: "CÔNG NGHỆ 4.0",
    categoryEn: "AI & 4.0 TECH",
    categoryId: "thong-minh",
    location: "Smart Home & Căn hộ cao cấp",
    locationEn: "Smart Living Residences",
    duration: "03:10",
    thumbnail: "/eurowindow/videos/cover-video-web-ew-17.jpg.webp",
    description:
      "Cửa sổ thông minh thế hệ mới nhận diện khẩu lệnh tiếng Việt, cho phép đóng mở rảnh tay hoặc qua smartphone, tự động đóng chặt khi cảm biến thời tiết nhận diện mưa bão.",
    descriptionEn:
      "Next-generation voice-operated smart windows with Vietnamese speech recognition, hands-free operation, and auto-shutting environmental rain sensors.",
    projectHref: "/san-pham/cua-nhom",
    projectHrefEn: "/en/products/cua-nhom-vach-kinh",
  },
  {
    id: "mai-kinh-skylight",
    youtubeId: "TR67mxig7XQ",
    title: "CỬA MÁI KÍNH SKYLIGHT CẢM BIẾN THỜI TIẾT",
    titleEn: "WEATHER-SENSING SMART SKYLIGHT ROOFS",
    category: "MÁI KÍNH THÔNG MINH",
    categoryEn: "SMART SKYLIGHTS",
    categoryId: "kinh-thong-minh",
    location: "Giếng trời biệt thự & Penthouse",
    locationEn: "Skylights & Penthouses",
    duration: "02:55",
    thumbnail: "/eurowindow/videos/cover-video-web-ew-18-18.jpg.webp",
    description:
      "Mái kính giếng trời cao cấp trang bị cảm biến đa tầng: tự đóng ngay khi mưa bão, tự mở thoát khói khi có hỏa hoạn và kính Low-E cản 99% tia cực tím gây hại.",
    descriptionEn:
      "Premium glass skylights with intelligent multi-sensors: auto-closing upon rain, auto-venting smoke during fire alarms, and 99% UV radiation blocking.",
    projectHref: "/san-pham/san-pham-kinh",
    projectHrefEn: "/en/products/san-pham-kinh",
  },
  {
    id: "cua-thong-minh-the-he-moi",
    youtubeId: "P0lKV7LMW9M",
    title: "CỬA THÔNG MINH THẾ HỆ MỚI",
    titleEn: "NEXT-GEN SMART INTEGRATED DOORS & GLASS",
    category: "HỆ SINH THÁI 4.0",
    categoryEn: "SMART ECOSYSTEM",
    categoryId: "thong-minh",
    location: "Biệt thự thông minh & Villa",
    locationEn: "Smart Villas & Modern Homes",
    duration: "03:45",
    thumbnail: "/eurowindow/videos/cover-video-web-ew-16.jpg.webp",
    description:
      "Hệ sinh thái cửa thông minh toàn diện: tích hợp khóa nhận diện khuôn mặt FaceID 3D, mở khóa từ xa qua App và đồng bộ hoàn hảo cùng hệ thống Smarthome chuẩn quốc tế.",
    descriptionEn:
      "Comprehensive smart door ecosystem featuring 3D FaceID biometric security, remote smartphone unlocking, and full smart home integration.",
    projectHref: "/san-pham/cua-nhom",
    projectHrefEn: "/en/products/cua-nhom-vach-kinh",
  },
  {
    id: "ban-tin-tai-chinh",
    youtubeId: "WtzD3aX2mNU",
    title: "ỨNG DỤNG CỬA THÔNG MINH THẾ HỆ MỚI BẢN TIN TÀI CHÍNH - KINH DOANH 08/09/23",
    titleEn: "SMART DOOR TECHNOLOGY FEATURED ON NATIONAL BUSINESS NEWS (08/09/23)",
    category: "TRUYỀN THÔNG - VTV",
    categoryEn: "NEWS & MEDIA",
    categoryId: "truyen-thong",
    location: "Đài Truyền Hình Việt Nam (VTV)",
    locationEn: "Vietnam National Television",
    duration: "04:15",
    thumbnail: "/eurowindow/videos/cover-video-web-ew-01.jpg.webp",
    description:
      "Phóng sự VTV đưa tin về xu hướng công nghệ cửa thông minh của Eurowindow, đón đầu lối sống tiện nghi, an toàn và tiết kiệm năng lượng cho người tiêu dùng Việt.",
    descriptionEn:
      "VTV national news report spotlighting Eurowindow's revolutionary smart door innovations setting new standards for secure, energy-efficient living.",
    projectHref: "/tin-tuc",
    projectHrefEn: "/en/news",
  },
  {
    id: "phong-su-eurowindow",
    youtubeId: "q8uRfhneDhI",
    title: "PHÓNG SỰ EUROWINDOW 2025",
    titleEn: "EUROWINDOW BRAND DOCUMENTARY 2025",
    category: "PHÓNG SỰ DOANH NGHIỆP",
    categoryEn: "BRAND STORY",
    categoryId: "thuong-hieu",
    location: "Trụ sở chính & Nhà máy Eurowindow",
    locationEn: "Eurowindow Headquarters & Plants",
    duration: "06:30",
    thumbnail: "/eurowindow/videos/phong-su-eurowindow.jpg.webp",
    description:
      "Thước phim phóng sự toàn cảnh hành trình hơn 20 năm Eurowindow tiên phong mở lối công nghệ cửa và vật liệu xanh, kiến tạo hàng trăm nghìn công trình biểu tượng.",
    descriptionEn:
      "Comprehensive corporate documentary on Eurowindow's 20+ year legacy pioneering advanced architectural doors and green building materials in Vietnam.",
    projectHref: "/gioi-thieu",
    projectHrefEn: "/en/about",
  },
];


interface ProjectCategoriesProps {
  lang?: "vi" | "en";
}

export default function ProjectCategories({ lang = "vi" }: ProjectCategoriesProps) {
  const isEn = lang === "en";
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const swiperRef = useRef<SwiperType | null>(null);

  const filteredVideos =
    activeCategory === "all"
      ? projectVideos
      : projectVideos.filter((v) => v.categoryId === activeCategory);

  const currentVideo = filteredVideos[activeIndex] || filteredVideos[0] || projectVideos[0];

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    setActiveIndex(0);
    setIsPlaying(false);
    if (swiperRef.current) {
      swiperRef.current.slideTo(0);
    }
  };

  const handleSelectVideo = (index: number) => {
    setActiveIndex(index);
    setIsPlaying(true);
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  const categoriesList = isEn
    ? [
        { id: "all", label: "All 8 Videos" },
        { id: "thong-minh", label: "Smart 4.0 Doors" },
        { id: "cua-nhom", label: "Thermal Aluminum" },
        { id: "cua-tu-dong", label: "Auto Glass Doors" },
        { id: "kinh-thong-minh", label: "Skylights" },
        { id: "truyen-thong", label: "News & Media" },
        { id: "thuong-hieu", label: "Brand Documentary" },
      ]
    : [
        { id: "all", label: "Tất cả 8 Video" },
        { id: "thong-minh", label: "Cửa Thông Minh 4.0" },
        { id: "cua-nhom", label: "Cửa Nhôm Cách Nhiệt" },
        { id: "cua-tu-dong", label: "Cửa Tự Động" },
        { id: "kinh-thong-minh", label: "Mái Kính Skylight" },
        { id: "truyen-thong", label: "Truyền hình VTV" },
        { id: "thuong-hieu", label: "Phóng sự Doanh nghiệp" },
      ];

  return (
    <section
      id="video-cong-trinh"
      className="relative overflow-hidden bg-[#071523] py-20 text-white md:py-28"
      aria-label="Danh mục công trình qua video YouTube"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-[#1677FF]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[500px] w-[500px] rounded-full bg-[#E2C275]/10 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-20" />

      <div className="relative z-10 mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E2C275]/40 bg-[#E2C275]/10 px-4 py-1.5 backdrop-blur-md">
              <YoutubeIcon className="h-4 w-4 text-[#FF0000]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#E2C275]">
                {isEn ? "OFFICIAL PROJECT VIDEO SHOWCASE" : "VIDEO VỀ EUROWINDOW"}
              </span>
            </div>
            <h2 className="text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
              {isEn ? "FEATURED PROJECTS & VIDEO GALLERY" : "VIDEO SẢN PHẨM"}
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-[#94A3B8] sm:text-base">
              {isEn
                ? "Experience Vietnam's iconic architectural landmarks, luxury high-rises, and advanced building solutions through Eurowindow's official video documentation."
                : "Khám phá các video sản phẩm cao cấp và giải pháp cửa nhôm kính đột phá của Eurowindow qua từng thước phim chân thực."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://www.youtube.com/@eurowindow"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-600/10 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-red-400 backdrop-blur-sm transition duration-300 hover:border-red-500 hover:bg-red-600 hover:text-white"
            >
              <YoutubeIcon className="h-4 w-4 fill-current text-red-500" />
              <span>{isEn ? "YouTube Channel" : "Kênh YouTube"}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <Link
              href={isEn ? "/en/projects" : "/du-an"}
              className="inline-flex items-center gap-2 rounded-xl border border-[#E2C275]/30 bg-[#E2C275]/10 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#E2C275] transition duration-300 hover:border-[#E2C275] hover:bg-[#E2C275] hover:text-[#071523]"
            >
              <span>{isEn ? "View All Projects" : "Xem tất cả công trình"}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categoriesList.map((cat) => {
            const count =
              cat.id === "all"
                ? projectVideos.length
                : projectVideos.filter((v) => v.categoryId === cat.id).length;

            if (count === 0 && cat.id !== "all") return null;

            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`group flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? "border border-[#E2C275] bg-[#E2C275] text-[#071523] shadow-[0_0_20px_rgba(226,194,117,0.3)]"
                    : "border border-white/10 bg-white/5 text-[#D2D8E3] hover:border-white/20 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold transition ${
                    isActive
                      ? "bg-[#071523] text-[#E2C275]"
                      : "bg-white/10 text-[#94A3B8] group-hover:bg-white/20 group-hover:text-white"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Cinema Showcase Area */}
        <div className="relative mb-10 overflow-hidden rounded-3xl border border-white/10 bg-[#0c1c33]/90 shadow-2xl backdrop-blur-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left/Main Player Frame (8 cols) */}
            <div className="relative aspect-video w-full bg-black lg:col-span-8">
              {isPlaying ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${currentVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={isEn ? currentVideo.titleEn : currentVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              ) : (
                <div className="group relative h-full w-full cursor-pointer overflow-hidden" onClick={() => setIsPlaying(true)}>
                  {/* High Quality Thumbnail Poster */}
                  <img
                    src={currentVideo.thumbnail}
                    alt={isEn ? currentVideo.titleEn : currentVideo.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071523] via-[#071523]/40 to-black/30 transition-opacity duration-300 group-hover:opacity-75" />

                  {/* Top Badges */}
                  <div className="absolute left-5 top-5 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#E2C275]/40 bg-[#071523]/80 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#E2C275] backdrop-blur-md">
                      <Building2 className="h-3.5 w-3.5" />
                      {isEn ? currentVideo.categoryEn : currentVideo.category}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-lg bg-black/70 px-2.5 py-1.5 text-xs font-mono text-white/90 backdrop-blur-md">
                      <Clock className="h-3 w-3 text-[#E2C275]" />
                      {currentVideo.duration}
                    </span>
                  </div>

                  {/* Center Luxury Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative flex items-center justify-center">
                      <div className="absolute h-24 w-24 rounded-full bg-[#E2C275]/30 animate-pulse-ring" />
                      <button
                        type="button"
                        className="group/btn relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#E2C275] bg-gradient-to-tr from-[#E2C275] to-[#F0D18A] text-[#071523] shadow-[0_0_35px_rgba(226,194,117,0.6)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_50px_rgba(226,194,117,0.8)]"
                        aria-label={isEn ? "Play video" : "Phát video"}
                      >
                        <Play className="ml-1 h-8 w-8 fill-current transition-transform duration-300 group-hover/btn:scale-110" />
                      </button>
                    </div>
                  </div>

                  {/* Bottom Quick Play Hint */}
                  <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E2C275]">
                      <Sparkles className="h-4 w-4" />
                      <span>{isEn ? "Click to play in 4K / HD" : "Nhấn để xem video chuẩn HD"}</span>
                    </div>
                    <span className="rounded-md bg-red-600 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                      YouTube 1080p
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Right Info & Specs Panel (4 cols) */}
            <div className="flex flex-col justify-between border-t border-white/10 p-6 sm:p-8 lg:col-span-4 lg:border-l lg:border-t-0 bg-[#0e2139]/80">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#E2C275]">
                    <ShieldCheck className="h-4 w-4" />
                    {isEn ? "Verified Project" : "Công trình thực tế"}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-[#94A3B8]">
                    <MapPin className="h-3.5 w-3.5 text-[#E2C275]" />
                    <span>{isEn ? currentVideo.locationEn : currentVideo.location}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold leading-snug text-white sm:text-2xl">
                  {isEn ? currentVideo.titleEn : currentVideo.title}
                </h3>

                <p className="text-sm leading-relaxed text-[#D2D8E3]/90">
                  {isEn ? currentVideo.descriptionEn : currentVideo.description}
                </p>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between text-xs text-[#94A3B8]">
                    <span>{isEn ? "Production" : "Đơn vị thi công"}:</span>
                    <span className="font-bold text-white">Eurowindow</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-[#94A3B8]">
                    <span>{isEn ? "Standards" : "Tiêu chuẩn kỹ thuật"}:</span>
                    <span className="font-semibold text-[#E2C275]">{isEn ? "European Standards (EN / DIN)" : "Châu Âu (EN / DIN)"}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-[#94A3B8]">
                    <span>{isEn ? "Video Source" : "Nguồn phát"}:</span>
                    <span className="font-semibold text-red-400">YouTube 1080p60</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#E2C275] px-5 py-3.5 text-xs font-bold uppercase tracking-widest text-[#071523] shadow-[0_4px_20px_rgba(226,194,117,0.3)] transition hover:bg-[#F0D18A] hover:scale-[1.02]"
                >
                  <Play className="h-4 w-4 fill-current" />
                  <span>{isPlaying ? (isEn ? "Close Player" : "Đóng Trình Phát") : (isEn ? "Play Video Now" : "Phát Video Ngay")}</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href={isEn ? (currentVideo.projectHrefEn || "/en/products") : currentVideo.projectHref}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-[11px] font-bold uppercase tracking-wider text-white transition hover:border-[#E2C275] hover:text-[#E2C275]"
                  >
                    <span>{isEn ? "Details" : "Chi tiết"}</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                  <a
                    href={`https://www.youtube.com/watch?v=${currentVideo.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-[11px] font-bold uppercase tracking-wider text-red-400 transition hover:border-red-500 hover:bg-red-500/10 hover:text-red-300"
                  >
                    <YoutubeIcon className="h-3.5 w-3.5" />
                    <span>YouTube</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Slider Thumbnails Carousel */}
        <div className="relative">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#E2C275]">
              {isEn ? "Select Video to Play" : "Danh sách Video Công Trình"}
            </h4>

            {/* Carousel Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="video-prev-btn flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:border-[#E2C275] hover:bg-[#E2C275] hover:text-[#071523]"
                aria-label={isEn ? "Previous video" : "Video trước"}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="video-next-btn flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:border-[#E2C275] hover:bg-[#E2C275] hover:text-[#071523]"
                aria-label={isEn ? "Next video" : "Video tiếp"}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            navigation={{ prevEl: ".video-prev-btn", nextEl: ".video-next-btn" }}
            pagination={{ clickable: true, el: ".video-pagination" }}
            spaceBetween={16}
            slidesPerView={1.2}
            breakpoints={{
              640: { slidesPerView: 2.2, spaceBetween: 16 },
              1024: { slidesPerView: 3.3, spaceBetween: 20 },
              1280: { slidesPerView: 4, spaceBetween: 24 },
            }}
            className="!pb-12"
          >
            {filteredVideos.map((video, idx) => {
              const isSelected = idx === activeIndex;

              return (
                <SwiperSlide key={video.id}>
                  <div
                    onClick={() => handleSelectVideo(idx)}
                    className={`group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border p-3.5 transition-all duration-300 ${
                      isSelected
                        ? "border-[#E2C275] bg-[#102744] shadow-[0_0_25px_rgba(226,194,117,0.25)] ring-1 ring-[#E2C275]"
                        : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                    }`}
                  >
                    {/* Thumbnail Frame */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-black">
                      <img
                        src={video.thumbnail}
                        alt={isEn ? video.titleEn : video.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Video Category Badge */}
                      <span className="absolute left-2.5 top-2.5 rounded-md bg-[#071523]/80 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#E2C275] backdrop-blur-md">
                        {isEn ? video.categoryEn : video.category}
                      </span>

                      {/* Duration Tag */}
                      <span className="absolute bottom-2.5 right-2.5 flex items-center gap-1 rounded bg-black/80 px-2 py-0.5 font-mono text-[10px] text-white">
                        <Clock className="h-2.5 w-2.5 text-[#E2C275]" />
                        {video.duration}
                      </span>

                      {/* Small Play Button */}
                      <div
                        className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                          isSelected ? "opacity-100 scale-100" : "opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100"
                        }`}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E2C275] text-[#071523] shadow-lg">
                          <Play className="ml-0.5 h-4 w-4 fill-current" />
                        </div>
                      </div>
                    </div>

                    {/* Meta info */}
                    <div className="flex flex-1 flex-col justify-between pt-3">
                      <div>
                        <p className="flex items-center gap-1 text-[11px] text-[#94A3B8]">
                          <MapPin className="h-3 w-3 text-[#E2C275]" />
                          <span>{isEn ? video.locationEn : video.location}</span>
                        </p>
                        <h4
                          className={`mt-1.5 line-clamp-2 text-xs font-bold leading-snug transition ${
                            isSelected ? "text-[#E2C275]" : "text-white group-hover:text-[#E2C275]"
                          }`}
                        >
                          {isEn ? video.titleEn : video.title}
                        </h4>
                      </div>

                      <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2 text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
                        <span className={isSelected ? "text-[#E2C275]" : ""}>
                          {isSelected ? (isEn ? "▶ Now Playing" : "▶ Đang phát") : (isEn ? "Watch Video" : "Xem video")}
                        </span>
                        <ArrowRight className="h-3 w-3 transition group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div className="video-pagination mt-4 flex justify-center" />
        </div>
      </div>
    </section>
  );
}

