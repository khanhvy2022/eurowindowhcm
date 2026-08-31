import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  CheckCircle2,
  Phone,
  Layers,
  Sparkles,
  MapPin,
  FileCheck,
  Cpu,
  Compass,
  ArrowRight,
  HelpCircle,
  Clock,
  Award,
} from "lucide-react";
import GeographicSelectorLeadForm from "@/components/geo/GeographicSelectorLeadForm";
import JsonLd from "@/components/JsonLd";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const params = await searchParams;
  const hasGeoParams = Boolean(
    params && (params.location || params.province || params.ward || params.q)
  );

  return {
    title: "Cửa Eurowindow | Bảng Giá & Giải Pháp Cửa Cho Công Trình Hiện Đại",
    description:
      "Khám phá các giải pháp cửa Eurowindow chính hãng: cửa nhôm EA55-EA95i, cửa nhựa uPVC Kömmerling, cửa cuốn, vách kính cách âm cách nhiệt tiêu chuẩn Châu Âu cho công trình toàn quốc.",
    alternates: {
      canonical: "https://www.eurowindowhcm.com/cua-eurowindow",
    },
    openGraph: {
      title: "Cửa Eurowindow | Bảng Giá & Giải Pháp Cửa Cho Công Trình Hiện Đại",
      description:
        "Giải pháp cửa nhôm, cửa nhựa uPVC Kömmerling, vách kính Eurowindow đạt chuẩn cách âm, cách nhiệt Châu Âu, đồng hành cùng hàng nghìn công trình trên cả nước.",
      url: "https://www.eurowindowhcm.com/cua-eurowindow",
      siteName: "Eurowindow HCM",
      locale: "vi_VN",
      type: "article",
      images: [
        {
          url: "https://www.eurowindowhcm.com/uploads/cua-dep-ew/cong-trinh-su-dung-ew-1.jpg",
          width: 1500,
          height: 1500,
          alt: "Cửa nhôm kính cao cấp và vách kính kiến trúc Eurowindow cho biệt thự hiện đại",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Cửa Eurowindow | Bảng Giá & Giải Pháp Cửa Cho Công Trình Hiện Đại",
      description:
        "Khám phá các giải pháp cửa nhôm, uPVC, cửa cuốn, vách kính Eurowindow đạt chuẩn cách âm cách nhiệt Châu Âu.",
      images: ["https://www.eurowindowhcm.com/uploads/cua-dep-ew/cong-trinh-su-dung-ew-1.jpg"],
    },
    robots: hasGeoParams
      ? { index: false, follow: true }
      : { index: true, follow: true },
  };
}

const FAQ_ITEMS = [
  {
    q: "Cửa Eurowindow có những dòng sản phẩm chính nào?",
    a: "Eurowindow cung cấp 5 hệ sản phẩm cốt lõi: Cửa nhôm và vách nhôm kính lớn (profile EA55 - EA95i, hợp tác cùng Schüco, Technal), Cửa nhựa uPVC tiêu chuẩn Châu Âu (profile Kömmerling từ Đức), Cửa gỗ và cửa gỗ chống cháy, Cửa cuốn nhôm khe thoáng công nghệ Đức, cùng hệ thống sản phẩm Kính an toàn, kính hộp Low-E cách âm cách nhiệt.",
  },
  {
    q: "Tại sao cửa Eurowindow nổi tiếng về khả năng cách âm và cách nhiệt?",
    a: "Khả năng cách âm giảm tới 40-45 dB và cách nhiệt vượt trội nhờ thiết kế đồng bộ: thanh profile có cấu trúc khoang rỗng và cầu cách nhiệt polyamide, kết hợp hộp kính bơm khí trơ argon, hệ gioăng kép EPDM chống lão hóa và phụ kiện kim khí chốt đa điểm ép chặt cánh vào khuôn.",
  },
  {
    q: "Eurowindow có nhận thi công công trình ở các tỉnh thành ngoài Hà Nội và TP.HCM không?",
    a: "Có. Eurowindow sở hữu 5 nhà máy sản xuất vật liệu xây dựng quy mô lớn tại Hà Nội, Hưng Yên, Đà Nẵng và nhà máy phía Nam (ĐT745, P. Tân Uyên, TP. Hồ Chí Minh), cùng hệ thống chi nhánh và showroom trên toàn quốc, sẵn sàng khảo sát, sản xuất và vận chuyển lắp đặt cho các công trình dân dụng, biệt thự, dự án cao ốc trên cả nước.",
  },
  {
    q: "Chính sách bảo hành cửa Eurowindow chính hãng như thế nào?",
    a: "Cửa Eurowindow chính hãng được bảo hành dài hạn: thanh profile uPVC bảo hành lên tới 10 năm không biến dạng phai màu, thanh profile nhôm bảo hành bề mặt sơn tĩnh điện 5-20 năm tùy hệ sơn (Powder Coating hoặc PVDF), hệ phụ kiện kim khí và kính hộp được bảo hành chính hãng theo tiêu chuẩn của nhà sản xuất.",
  },
  {
    q: "Làm thế nào để nhận báo giá chi tiết cho công trình của tôi?",
    a: "Quý khách có thể lựa chọn địa bàn công trình ở form khảo sát bên dưới hoặc liên hệ trực tiếp Điện Thoại kỹ thuật 0966994338. Kỹ sư Eurowindow sẽ tiếp nhận kích thước, phân tích bản vẽ và xuất dự toán chi tiết hoàn toàn miễn phí.",
  },
];

export default function CuaEurowindowPage() {
  const publishDate = "2026-01-15T08:00:00+07:00";
  const modifyDate = "2026-08-31T08:00:00+07:00";

  // Structured Data Schemas
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Cửa Eurowindow – Giải Pháp Kỹ Thuật & Báo Giá Cho Mọi Công Trình",
    description:
      "Tổng quan giải pháp cửa Eurowindow chính hãng: profile nhôm EA55-EA95i, cửa nhựa uPVC Kömmerling, vách kính cách âm cản nhiệt tiêu chuẩn Châu Âu cho công trình tại Việt Nam.",
    image: [
      "https://www.eurowindowhcm.com/uploads/cua-dep-ew/cong-trinh-su-dung-ew-1.jpg",
      "https://www.eurowindowhcm.com/uploads/cua-dep-ew/cua-ew-2.jpg",
      "https://www.eurowindowhcm.com/uploads/cua-dep-ew/cong-trinh-su-dung-ew-3.jpg",
      "https://www.eurowindowhcm.com/uploads/cua-dep-ew/cua-tu-dong.jpg"
    ],
    datePublished: publishDate,
    dateModified: modifyDate,
    mainEntityOfPage: "https://www.eurowindowhcm.com/cua-eurowindow",
    author: {
      "@type": "Organization",
      name: "Eurowindow",
      url: "https://www.eurowindowhcm.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Eurowindow",
      logo: {
        "@type": "ImageObject",
        url: "https://www.eurowindowhcm.com/logo-eurowindow.png",
      },
    },
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Cửa Eurowindow",
    description:
      "Hệ thống cửa nhôm kính cao cấp, cửa nhựa uPVC Kömmerling và vách kính Eurowindow đạt chuẩn Châu Âu về cách âm, cách nhiệt và độ kín khít.",
    image: [
      "https://www.eurowindowhcm.com/uploads/cua-dep-ew/cong-trinh-su-dung-ew-1.jpg",
      "https://www.eurowindowhcm.com/uploads/cua-dep-ew/cua-ew-2.jpg",
      "https://www.eurowindowhcm.com/uploads/cua-dep-ew/cua-ew-1.jpg"
    ],
    brand: {
      "@type": "Brand",
      name: "Eurowindow",
    },
    category: "Cửa & Vách kính xây dựng",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "VND",
      lowPrice: "1800000",
      highPrice: "9500000",
      offerCount: "50",
      availability: "https://schema.org/InStock",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Trang chủ",
        item: "https://www.eurowindowhcm.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Cửa Eurowindow",
        item: "https://www.eurowindowhcm.com/cua-eurowindow",
      },
    ],
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Eurowindow HCM",
    url: "https://www.eurowindowhcm.com",
    telephone: "0966 994 338",
    address: {
      "@type": "PostalAddress",
      streetAddress: "39 Bis Mạc Đĩnh Chi, Phường Tân Định, Quận 1",
      addressLocality: "Thành phố Hồ Chí Minh",
      addressCountry: "VN",
    },
  };

  return (
    <div className="min-h-screen bg-[#071523] text-white flex flex-col justify-between">
      <Header />
      <article className="flex-1 bg-[#071523] text-white">
        {/* Schema Injection */}
        <JsonLd data={articleSchema} />
      <JsonLd data={productSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={organizationSchema} />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#0c1d33] via-[#071523] to-[#071523] py-20 lg:py-24">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#1677FF]/15 blur-[120px]" />
        
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-[#D2D8E3]/70">
            <Link href="/" className="hover:text-[#E2C275] transition">
              Trang chủ
            </Link>
            <span>/</span>
            <span className="font-semibold text-[#E2C275]">Cửa Eurowindow</span>
          </nav>

          {/* Trust Badges */}
          <div className="mb-6 flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E2C275]/40 bg-[#E2C275]/10 px-3 py-1 text-xs font-semibold text-[#E2C275]">
              <Award className="h-3.5 w-3.5" />
              Thương Hiệu Quốc Gia 24+ Năm
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              Tiêu Chuẩn Châu Âu &amp; TCVN
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
              <Clock className="h-3.5 w-3.5 text-[#1677FF]" />
              Cập nhật: 31/08/2026
            </span>
          </div>

          {/* Primary H1 */}
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
            Cửa Eurowindow – Giải Pháp Kỹ Thuật &amp; Báo Giá Cho Mọi Công Trình
          </h1>

          <p className="mt-6 max-w-3xl text-base text-[#D2D8E3] sm:text-lg leading-relaxed">
            Tổng hợp dữ liệu kỹ thuật về kết cấu profile nhôm EA55–EA95i, cửa nhựa uPVC Kömmerling, vách kính cản nhiệt và phụ kiện kim khí đồng bộ. Hướng dẫn tính toán cấu hình cửa đạt chuẩn cách âm 35–45 dB, chống ngấm nước và chịu áp lực gió bão cho công trình thực tế tại Việt Nam.
          </p>

          {/* CTA Quick Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#tu-van-khu-vuc"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#E2C275] to-[#c9a756] px-6 py-3.5 text-sm font-bold text-[#071523] shadow-lg transition duration-200 hover:opacity-95"
            >
              <Compass className="h-4 w-4" />
              Tư Vấn Dự Toán Theo Khu Vực
            </a>
            <a
              href="tel:0966994338"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-[#E2C275]/50 hover:bg-white/10"
            >
              <Phone className="h-4 w-4 text-[#E2C275]" />
              Điện Thoại: 0966994338
            </a>
          </div>
        </div>
      </section>

      {/* Main Editorial Content Container */}
      <main className="mx-auto max-w-5xl px-5 py-12 sm:px-8 lg:py-16">
        
        {/* Section 1: Technical Structure & Quality */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl border-l-4 border-[#E2C275] pl-4">
            Cấu Tạo Kỹ Thuật &amp; Nguyên Lý Kín Khít Của Cửa Eurowindow
          </h2>
          <p className="text-base text-[#D2D8E3] leading-relaxed">
            Điểm khác biệt lớn nhất giữa <strong>cửa Eurowindow</strong> và các dòng cửa gia công thủ công trên thị trường nằm ở quy trình đồng bộ vật tư và công nghệ tự động hóa. Cửa gia công nhỏ lẻ thường xệ cánh, hở góc sau 1–2 năm và thấm nước mưa qua các mối nối. Ngược lại, một bộ cửa Eurowindow hoàn chỉnh được cấu thành từ 4 thành phần kỹ thuật đạt chuẩn kiểm định:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-[#D2D8E3]">
            <div className="rounded-xl border border-white/10 bg-[#102238]/70 p-4 space-y-1.5">
              <strong className="text-white text-sm block flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#E2C275]" /> 1. Thanh Profile Định Hình Chuẩn Kỹ Thuật
              </strong>
              <p>Hợp kim nhôm 6063-T5 độ cứng cao hoặc nhựa uPVC Kömmerling (CHLB Đức) gia cường lõi thép mạ kẽm dày 1.4–2.0 mm, nhiều khoang rỗng triệt tiêu đường truyền âm và nhiệt.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#102238]/70 p-4 space-y-1.5">
              <strong className="text-white text-sm block flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#E2C275]" /> 2. Hệ Gioăng Cao Su EPDM Lưu Hóa
              </strong>
              <p>Gioăng kép EPDM nhập khẩu giữ nguyên độ đàn hồi theo chu kỳ đóng mở, không chai cứng trước tia bức xạ UV hay thời tiết nồm ẩm nhiệt đới, đạt độ kín khí Class 4 (EN 12207).</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#102238]/70 p-4 space-y-1.5">
              <strong className="text-white text-sm block flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#E2C275]" /> 3. Hộp Kính Cách Âm, Cản Nhiệt Cao Cấp
              </strong>
              <p>Kính dán an toàn 2 lớp hoặc kính hộp nạp khí trơ Argon, kết hợp hạt hút ẩm và lớp phủ Low-E cản tới 96% tia hồng ngoại truyền nhiệt vào phòng.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#102238]/70 p-4 space-y-1.5">
              <strong className="text-white text-sm block flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#E2C275]" /> 4. Phụ Kiện Kim Khí Đồng Bộ (Roto / Cmech)
              </strong>
              <p>Chốt khóa đa điểm, bản lề chịu tải 130–180 kg và thanh truyền động phân bố lực ép đều lên 4 cạnh khung cửa, ngăn chặn triệt để hiện tượng lọt gió và cạy phá từ bên ngoài.</p>
            </div>
          </div>

          {/* Featured Editorial Photo: Real Project Installation */}
          <figure className="my-8 overflow-hidden rounded-2xl border border-white/15 bg-[#102238] shadow-2xl">
            <div className="relative aspect-square sm:aspect-[16/10] w-full overflow-hidden">
              <Image
                src="/uploads/cua-dep-ew/cong-trinh-su-dung-ew-1.jpg"
                alt="Công trình biệt thự hiện đại sử dụng hệ thống cửa nhôm kính cao cấp Eurowindow"
                fill
                sizes="(max-width: 1024px) 100vw, 960px"
                className="object-cover transition-transform duration-500 hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071523]/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-xs sm:text-sm text-white/90">
                <span className="inline-block rounded-md bg-[#E2C275] px-2.5 py-0.5 text-[11px] font-bold text-[#071523] mb-1.5">
                  Dự Án Thực Tế
                </span>
                <p className="font-semibold text-white sm:text-base">
                  Biệt thự kiến trúc hiện đại ứng dụng giải pháp cửa nhôm kính và vách kính Eurowindow đồng bộ
                </p>
              </div>
            </div>
            <figcaption className="px-5 py-3 text-xs text-[#D2D8E3]/80 border-t border-white/10 bg-[#0c1c30]">
              Hình 1: Hệ thống cửa nhôm kính Eurowindow cao cấp được lắp đặt đồng bộ tại công trình biệt thự, tối ưu ánh sáng tự nhiên và đảm bảo độ kín khít, cách âm, chống chịu thời tiết vượt trội.
            </figcaption>
          </figure>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 pt-2">
            <div className="rounded-2xl border border-white/10 bg-[#102238]/60 p-5 backdrop-blur">
              <Sparkles className="h-6 w-6 text-[#E2C275] mb-3" />
              <h3 className="text-base font-bold text-white">Cách Âm &amp; Cách Nhiệt</h3>
              <p className="mt-2 text-xs text-[#D2D8E3] leading-relaxed">
                Giảm thiểu tiếng ồn lên đến 40-45 dB, cản nhiệt hiệu quả giúp tiết kiệm đến 30% chi phí điện năng làm mát cho công trình.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#102238]/60 p-5 backdrop-blur">
              <ShieldCheck className="h-6 w-6 text-emerald-400 mb-3" />
              <h3 className="text-base font-bold text-white">Độ Bền &amp; Chống Chịu Gió</h3>
              <p className="mt-2 text-xs text-[#D2D8E3] leading-relaxed">
                Thanh profile thiết kế gân gia cường, chịu áp lực gió bão cấp 12-14 (lên đến 2000 Pa), đạt chuẩn TCVN 7452 và Châu Âu EN 12210.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#102238]/60 p-5 backdrop-blur">
              <FileCheck className="h-6 w-6 text-[#1677FF] mb-3" />
              <h3 className="text-base font-bold text-white">Đồng Bộ Chính Hãng</h3>
              <p className="mt-2 text-xs text-[#D2D8E3] leading-relaxed">
                Hợp tác chiến lược độc quyền với tập đoàn Profine (profile Kömmerling Đức), Technal (Pháp), phụ kiện Roto, Cmech, Hafele.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Core Product Lines */}
        <section className="mt-16 space-y-8">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl border-l-4 border-[#E2C275] pl-4">
            Các Dòng Cửa Eurowindow Chủ Lực Hiện Nay
          </h2>

          {/* Product 1: Cửa nhôm */}
          <div className="rounded-2xl border border-white/10 bg-[#0d1e33] p-6 sm:p-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xl font-bold text-white">
                1. Cửa Nhôm &amp; Vách Nhôm Kính Lớn Eurowindow
              </h3>
              <span className="rounded-full bg-[#E2C275]/15 px-3 py-1 text-xs font-semibold text-[#E2C275]">
                Profile EA55 &bull; EA70 &bull; EA95i
              </span>
            </div>
            <p className="text-sm sm:text-base text-[#D2D8E3] leading-relaxed">
              Cửa nhôm Eurowindow được phát triển trên các hệ profile nhôm định hình <strong>EA55, EA70, EA95i</strong> và các hệ nhôm nhập khẩu từ Technal (Pháp), Schüco (CHLB Đức). Điểm cốt lõi trong thiết kế là thanh <strong>cầu cách nhiệt (thermal break)</strong> bằng vật liệu polyamide, ngăn chặn dẫn nhiệt trực tiếp qua khung nhôm, kết hợp cùng hộp kính bơm khí trơ giúp nhiệt độ trong phòng chênh lệch từ 5–7 độ C so với ngoài trời.
            </p>

            {/* Real Installation Image: Bi-fold Sliding Doors with Integrated Blinds */}
            <figure className="my-5 overflow-hidden rounded-xl border border-white/10 bg-[#071523]">
              <div className="relative aspect-square sm:aspect-[16/10] w-full overflow-hidden">
                <Image
                  src="/uploads/cua-dep-ew/cua-ew-2.jpg"
                  alt="Cửa đi nhôm kính xếp trượt Eurowindow tích hợp rèm trong hộp kính cách âm cách nhiệt"
                  fill
                  sizes="(max-width: 1024px) 100vw, 900px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3 rounded-lg bg-[#071523]/85 px-3 py-1 text-xs text-[#E2C275] backdrop-blur border border-white/10">
                  Cửa nhôm xếp trượt đa cánh &bull; Hộp kính tích hợp nan rèm
                </div>
              </div>
              <figcaption className="p-3 text-xs text-[#D2D8E3]/80 bg-[#091829]">
                Hình 2: Hệ cửa đi nhôm kính xếp trượt Eurowindow tích hợp nan rèm trong hộp kính cách nhiệt, mở rộng tối đa khẩu độ thông thủy và linh hoạt chắn nắng theo nhu cầu sử dụng.
              </figcaption>
            </figure>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-white/90">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#E2C275] shrink-0" />
                <span>Quy cách: Mở quay, mở hất, mở trượt, xếp trượt đa cánh</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#E2C275] shrink-0" />
                <span>Bề mặt: Sơn tĩnh điện cao cấp hoặc sơn phủ PVDF chống muối biển</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#E2C275] shrink-0" />
                <span>Ứng dụng: Biệt thự nghỉ dưỡng, penthouse, mặt dựng kính tòa nhà</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#E2C275] shrink-0" />
                <span>Liên kết nội bộ: <Link href="/san-pham/cua-nhom" className="text-[#E2C275] hover:underline font-semibold">Xem chi tiết hệ cửa nhôm Eurowindow</Link></span>
              </li>
            </ul>
          </div>

          {/* Product 2: Cửa nhựa uPVC */}
          <div className="rounded-2xl border border-white/10 bg-[#0d1e33] p-6 sm:p-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xl font-bold text-white">
                2. Cửa Nhựa uPVC Kömmerling Châu Âu
              </h3>
              <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-400">
                Tiêu Chuẩn CHLB Đức
              </span>
            </div>
            <p className="text-sm sm:text-base text-[#D2D8E3] leading-relaxed">
              Cửa nhựa uPVC Eurowindow sử dụng thanh profile định hình đa khoang của tập đoàn <strong>Kömmerling</strong> (Profine Group – CHLB Đức), bên trong lồng lõi thép gia cường mạ kẽm chống rỉ sét dày 1.4–2.0 mm. Bốn góc khung cửa được hàn nhiệt tự động liền khối, loại bỏ hoàn toàn khe hở cơ học so với nhôm bắt vít, kết hợp gioăng cao su kép EPDM tạo nên khả năng cách âm giảm ồn từ 35–42 dB.
            </p>

            {/* Real Installation Image: Acoustic Glass Partition & Sliding Door */}
            <figure className="my-5 overflow-hidden rounded-xl border border-white/10 bg-[#071523]">
              <div className="relative aspect-square sm:aspect-[16/10] w-full overflow-hidden">
                <Image
                  src="/uploads/cua-dep-ew/cua-ew-1.jpg"
                  alt="Vách kính và cửa trượt Eurowindow cách âm tiêu chuẩn Châu Âu cho không gian văn phòng làm việc"
                  fill
                  sizes="(max-width: 1024px) 100vw, 900px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3 rounded-lg bg-[#071523]/85 px-3 py-1 text-xs text-emerald-400 backdrop-blur border border-white/10">
                  Vách kính ngăn phòng &bull; Cách âm 40-45 dB
                </div>
              </div>
              <figcaption className="p-3 text-xs text-[#D2D8E3]/80 bg-[#091829]">
                Hình 3: Vách kính kết hợp cửa trượt Eurowindow cách âm đạt chuẩn kiểm định ISO 140-5, hạn chế tiếng ồn giao thông đô thị và giữ nhiệt độ phòng ổn định.
              </figcaption>
            </figure>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-white/90">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Khả năng cách âm: Giảm 35 - 42 dB tiếng ồn đô thị</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Bảo hành profile: Lên tới 10 năm chính hãng không phai màu</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Quy cách: Cửa sổ mở quay lật 3 chế độ, cửa đi mở trượt, vách kính</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Liên kết nội bộ: <Link href="/san-pham/cua-nhua-upvc" className="text-emerald-400 hover:underline font-semibold">Xem chi tiết hệ cửa uPVC Eurowindow</Link></span>
              </li>
            </ul>
          </div>

          {/* Product 3: Cửa gỗ & cửa cuốn & kính an toàn */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl border border-white/10 bg-[#0d1e33] p-5 space-y-2">
              <h4 className="font-bold text-white text-base">Cửa Gỗ &amp; Chống Cháy</h4>
              <p className="text-xs text-[#D2D8E3] leading-relaxed">
                Gỗ tự nhiên ghép thanh tẩm sấy tiêu chuẩn độ ẩm 12-14% chống cong vênh, kết hợp vật liệu chống cháy đạt chuẩn kiểm định PCCC 60 - 90 - 120 phút.
              </p>
              <Link href="/san-pham/cua-go" className="inline-flex items-center gap-1 text-xs text-[#E2C275] font-semibold hover:underline pt-2">
                Khám phá cửa gỗ <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0d1e33] p-5 space-y-2">
              <h4 className="font-bold text-white text-base">Cửa Cuốn Khe Thoáng</h4>
              <p className="text-xs text-[#D2D8E3] leading-relaxed">
                Nan nhôm hợp kim 6063 sơn tĩnh điện ngoài trời, trang bị cảm biến tự dừng khi gặp vật cản và còi báo động chống cạy cửa.
              </p>
              <Link href="/san-pham/cua-cuon" className="inline-flex items-center gap-1 text-xs text-[#E2C275] font-semibold hover:underline pt-2">
                Khám phá cửa cuốn <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0d1e33] p-5 space-y-2">
              <h4 className="font-bold text-white text-base">Kính Hộp &amp; Kính An Toàn</h4>
              <p className="text-xs text-[#D2D8E3] leading-relaxed">
                Gia công trực tiếp tại nhà máy kính Eurowindow: Kính dán an toàn PVB, kính tôi nhiệt cường lực và kính hộp phủ Low-E giảm tải nhiệt điều hòa.
              </p>
              <Link href="/san-pham/san-pham-kinh" className="inline-flex items-center gap-1 text-xs text-[#E2C275] font-semibold hover:underline pt-2">
                Khám phá hệ kính <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Product 4: Cửa tự động & Vách kính thông minh */}
          <div className="rounded-2xl border border-white/10 bg-[#0d1e33] p-6 sm:p-8 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xl font-bold text-white">
                3. Cửa Tự Động &amp; Vách Kính Điều Khiển Điện
              </h3>
              <span className="rounded-full bg-[#1677FF]/20 px-3 py-1 text-xs font-semibold text-[#1677FF]">
                Hệ Thống Tự Động Hóa
              </span>
            </div>
            <p className="text-sm sm:text-base text-[#D2D8E3] leading-relaxed">
              Giải pháp <strong>cửa sổ mở hất tự động</strong> và <strong>vách kính trượt nâng hạ (guillotine glass)</strong> của Eurowindow sử dụng động cơ điện tử tải trọng 150–300 kg/cánh. Hệ thống tích hợp cảm biến khí tượng (tự động đóng khi mưa gió lớn) và cảm biến chống kẹp an toàn photocell, dễ dàng kết nối vào bộ điều khiển trung tâm của ngôi nhà.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <figure className="overflow-hidden rounded-xl border border-white/10 bg-[#071523]">
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src="/uploads/cua-dep-ew/cua-tu-dong.jpg"
                    alt="Cửa sổ mở hất tự động Eurowindow cảm biến thông minh kết nối sân vườn"
                    fill
                    sizes="(max-width: 768px) 100vw, 450px"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2 left-2 rounded bg-[#071523]/85 px-2.5 py-1 text-[11px] text-[#E2C275] border border-white/10">
                    Cửa sổ hất tự động &bull; Cảm biến mưa
                  </div>
                </div>
                <figcaption className="p-2.5 text-xs text-[#D2D8E3]/80 bg-[#091829]">
                  Hình 4: Cửa sổ mở hất tự động Eurowindow lấy gió đối lưu và tự thu cánh khi phát hiện mưa dông.
                </figcaption>
              </figure>

              <figure className="overflow-hidden rounded-xl border border-white/10 bg-[#071523]">
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src="/uploads/cua-dep-ew/cua-tu-dong-1.jpg"
                    alt="Vách kính trượt tự động Eurowindow toàn cảnh sân vườn biệt thự sinh thái"
                    fill
                    sizes="(max-width: 768px) 100vw, 450px"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2 left-2 rounded bg-[#071523]/85 px-2.5 py-1 text-[11px] text-[#1677FF] border border-white/10">
                    Vách kính trượt nâng hạ Panorama
                  </div>
                </div>
                <figcaption className="p-2.5 text-xs text-[#D2D8E3]/80 bg-[#091829]">
                  Hình 5: Vách kính trượt nâng hạ điều khiển điện mở trọn tầm nhìn ra cảnh quan sân vườn.
                </figcaption>
              </figure>
            </div>
          </div>

          {/* Practical Decision Matrix: Comparison Table */}
          <div className="rounded-2xl border border-white/10 bg-[#0d1e33] p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="h-5 w-5 text-[#E2C275]" />
              So Sánh &amp; Hướng Dẫn Lựa Chọn Hệ Cửa Phù Hợp Cho Từng Vị Trí
            </h3>
            <p className="text-xs sm:text-sm text-[#D2D8E3]">
              Bảng đối chiếu kỹ thuật thực tế giữa các hệ vật liệu cửa Eurowindow giúp chủ đầu tư cân đối giữa công năng sử dụng và ngân sách đầu tư:
            </p>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-left text-xs text-[#D2D8E3]">
                <thead className="bg-[#102238] text-white border-b border-white/10 uppercase text-[11px]">
                  <tr>
                    <th className="p-3">Hệ cửa</th>
                    <th className="p-3">Khả năng cách âm</th>
                    <th className="p-3">Chống chịu thời tiết</th>
                    <th className="p-3">Khẩu độ tối đa</th>
                    <th className="p-3">Vị trí lắp đặt đề xuất</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="p-3 font-bold text-white">Cửa nhôm cầu cách nhiệt (EA95i)</td>
                    <td className="p-3 text-[#E2C275] font-semibold">38 – 44 dB</td>
                    <td className="p-3">Chịu gió bão cấp 14, sơn PVDF chống muối biển</td>
                    <td className="p-3">Rất lớn (chiều cao tới 3.2m/cánh)</td>
                    <td className="p-3">Mặt tiền, cửa ban công biệt thự, cao ốc ven biển</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">Cửa nhựa uPVC Kömmerling</td>
                    <td className="p-3 text-emerald-400 font-semibold">40 – 45 dB (Tốt nhất)</td>
                    <td className="p-3">Không oxy hóa, không rỉ sét, chịu nồm ẩm</td>
                    <td className="p-3">Trung bình - lớn (chiều cao tới 2.5m/cánh)</td>
                    <td className="p-3">Phòng ngủ, cửa sổ nhà phố cần cách âm đô thị</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">Cửa gỗ công nghiệp / tự nhiên</td>
                    <td className="p-3">30 – 35 dB</td>
                    <td className="p-3">Chỉ dùng trong nhà có mái che, chống cháy 60-120p</td>
                    <td className="p-3">Tiêu chuẩn cửa phòng (2.2 - 2.4m)</td>
                    <td className="p-3">Cửa chính chung cư, cửa phòng ngủ, phòng họp</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 3: Technical Standards */}
        <section className="mt-16 space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl border-l-4 border-[#E2C275] pl-4">
            Các Yếu Tố Kỹ Thuật Cần Quan Tâm Khi Chọn Cửa
          </h2>
          <p className="text-base text-[#D2D8E3] leading-relaxed">
            Để đảm bảo chất lượng công trình bền vững theo thời gian, khi lựa chọn hệ thống cửa, chủ đầu tư và kiến trúc sư cần kiểm tra các thông số kỹ thuật đã được kiểm định độc lập:
          </p>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0d1e33]">
            <table className="w-full text-left text-xs sm:text-sm text-[#D2D8E3]">
              <thead className="bg-[#102238] text-white border-b border-white/10 uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="p-4">Tiêu chí kỹ thuật</th>
                  <th className="p-4">Tiêu chuẩn kiểm định</th>
                  <th className="p-4">Chỉ số đạt được của Eurowindow</th>
                  <th className="p-4">Ý nghĩa thực tế cho công trình</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="p-4 font-semibold text-white">Độ kín khí (Air Permeability)</td>
                  <td className="p-4">TCVN 7452-1 / EN 12207</td>
                  <td className="p-4 text-[#E2C275] font-bold">Class 4 (Cấp cao nhất)</td>
                  <td className="p-4">Ngăn ngừa bụi mịn lọt vào nhà, giữ nhiệt điều hòa tuyệt đối.</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Độ kín nước (Watertightness)</td>
                  <td className="p-4">TCVN 7452-2 / EN 12208</td>
                  <td className="p-4 text-[#E2C275] font-bold">Class 9A (Áp lực nước 600 Pa)</td>
                  <td className="p-4">Không rò rỉ nước mưa ngay cả trong điều kiện mưa dông lớn.</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Chịu áp lực gió (Wind Load)</td>
                  <td className="p-4">TCVN 7452-3 / EN 12210</td>
                  <td className="p-4 text-[#E2C275] font-bold">Class C5 (Áp lực 2000 Pa)</td>
                  <td className="p-4">Chịu được gió bão giật cấp 12-14 trên các tầng cao ốc.</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Khả năng cách âm (Sound Insulation)</td>
                  <td className="p-4">ISO 140-5 / TCVN 7451</td>
                  <td className="p-4 text-[#E2C275] font-bold">Rw = 35 dB – 45 dB</td>
                  <td className="p-4">Biến không gian sống gần đường lộ ồn ào thành không gian yên tĩnh.</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Hệ số truyền nhiệt (U-Value)</td>
                  <td className="p-4">EN ISO 10077-1/2</td>
                  <td className="p-4 text-[#E2C275] font-bold">Uf &le; 1.4 – 2.0 W/m²K</td>
                  <td className="p-4">Giảm truyền nhiệt mặt trời, tối ưu hiệu suất xanh cho tòa nhà.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Natural Regional Climate Solutions */}
        <section className="mt-16 space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl border-l-4 border-[#E2C275] pl-4">
            Giải Pháp Cửa Eurowindow Phục Vụ Nhu Cầu Công Trình Tại Việt Nam
          </h2>
          <p className="text-base text-[#D2D8E3] leading-relaxed">
            Việt Nam có chiều dài địa lý trải dài với các đặc thù khí hậu phân hóa rõ rệt: từ miền Bắc có mùa đông lạnh nồm ẩm, miền Trung thường xuyên đón bão biển gió giật, đến miền Nam quanh năm nắng nóng với mật độ giao thông đô thị dày đặc. Do đó, việc lựa chọn cấu hình cửa cần tương thích chính xác với điều kiện môi trường từng khu vực.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Region 1: North */}
            <div className="rounded-2xl border border-white/10 bg-[#0d1e33] p-6 space-y-3">
              <span className="inline-block rounded-md bg-[#1677FF]/20 px-2.5 py-1 text-xs font-bold text-[#1677FF]">
                KHU VỰC MIỀN BẮC
              </span>
              <h3 className="text-lg font-bold text-white">Chống Nồm Ẩm &amp; Giữ Nhiệt Mùa Đông</h3>
              <p className="text-xs text-[#D2D8E3] leading-relaxed">
                Đặc thù độ ẩm cao vào mùa xuân và rét buốt vào mùa đông đòi hỏi hệ cửa có gioăng kép kín khít tuyệt đối và kính hộp cách nhiệt. Cửa nhựa uPVC Kömmerling hoặc nhôm có cầu cách nhiệt giúp ngăn chặn đọng sương trên bề mặt kính và thất thoát nhiệt sưởi ấm.
              </p>
            </div>

            {/* Region 2: Central */}
            <div className="rounded-2xl border border-white/10 bg-[#0d1e33] p-6 space-y-3">
              <span className="inline-block rounded-md bg-amber-500/20 px-2.5 py-1 text-xs font-bold text-amber-400">
                KHU VỰC MIỀN TRUNG
              </span>
              <h3 className="text-lg font-bold text-white">Chống Gió Bão Biển &amp; Ăn Mòn Muối</h3>
              <p className="text-xs text-[#D2D8E3] leading-relaxed">
                Các công trình ven biển tại Đà Nẵng, Nha Trang, Quảng Ninh chịu tác động ăn mòn mặn và áp lực gió bão lớn. Giải pháp tối ưu là hệ nhôm EA95i chịu tải trọng gió cao kết hợp sơn PVDF chống ăn mòn muối biển và phụ kiện inox 316 hoặc Cmech chính hãng.
              </p>
            </div>

            {/* Region 3: South */}
            <div className="rounded-2xl border border-white/10 bg-[#0d1e33] p-6 space-y-3">
              <span className="inline-block rounded-md bg-emerald-500/20 px-2.5 py-1 text-xs font-bold text-emerald-400">
                KHU VỰC PHÍA NAM &amp; TP.HCM
              </span>
              <h3 className="text-lg font-bold text-white">Cách Âm Đô Thị &amp; Chống Nóng Quanh Năm</h3>
              <p className="text-xs text-[#D2D8E3] leading-relaxed">
                TP.HCM và các tỉnh lân cận có cường độ bức xạ nhiệt cao và mức độ tiếng ồn giao thông lớn. Cấu hình cửa kính hộp Low-E kết hợp gioăng EPDM mang lại hiệu quả cản nhiệt tia hồng ngoại, giữ không gian mát mẻ và yên tĩnh tuyệt đối cho gia đình.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Architectural Project Gallery & Guidance */}
        <section className="mt-16 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#E2C275]">
                Thư Viện Thực Tế
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl border-l-4 border-[#E2C275] pl-4 mt-1">
                Bộ Sưu Tập &amp; Hướng Dẫn Hình Ảnh Công Trình Cửa Eurowindow Thực Tế
              </h2>
            </div>
            <p className="text-xs text-[#D2D8E3]/70 sm:text-right">
              Hình ảnh thực tế từ các công trình biệt thự, dinh thự bàn giao trên toàn quốc
            </p>
          </div>

          <p className="text-base text-[#D2D8E3] leading-relaxed">
            Để giúp chủ đầu tư và kiến trúc sư lựa chọn cấu hình cửa tương thích với từng phong cách mặt đứng, dưới đây là hình ảnh và thông số kỹ thuật thực tế tại các công trình đã bàn giao của Eurowindow:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {/* Project 1: Biệt thự tân cổ điển vòm cong */}
            <figure className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0d1e33] transition-all hover:border-[#E2C275]/40 hover:shadow-xl">
              <div className="relative aspect-square w-full overflow-hidden bg-[#071523]">
                <Image
                  src="/uploads/cua-dep-ew/cong-trinh-su-dung-ew-3.jpg"
                  alt="Biệt thự tân cổ điển Châu Âu ứng dụng hệ thống cửa nhôm kính uốn vòm cong Eurowindow"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 rounded-full bg-[#071523]/85 px-3 py-1 text-[11px] font-semibold text-[#E2C275] border border-white/10 backdrop-blur">
                  Tân Cổ Điển Châu Âu
                </div>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="text-sm font-bold text-white group-hover:text-[#E2C275] transition">
                  Biệt Thự Trắng Tân Cổ Điển
                </h3>
                <p className="text-xs text-[#D2D8E3] line-clamp-2 leading-relaxed">
                  Cửa nhôm uốn vòm bán nguyệt hệ EA70 kết hợp kính dán an toàn 8.38mm cản tia UV và lấy sáng tự nhiên.
                </p>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/60">
                  <span>Hệ nhôm: EA70 uốn vòm</span>
                  <span className="text-[#E2C275]">Kính an toàn 8.38mm</span>
                </div>
              </div>
            </figure>

            {/* Project 2: Lâu đài dinh thự Pháp */}
            <figure className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0d1e33] transition-all hover:border-[#E2C275]/40 hover:shadow-xl">
              <div className="relative aspect-square w-full overflow-hidden bg-[#071523]">
                <Image
                  src="/uploads/cua-dep-ew/cong-trinh-su-dung-ew-6.jpg"
                  alt="Lâu đài dinh thự cổ điển Pháp lắp đặt hệ cửa vòm nhôm kính và nan hoa đồng Eurowindow"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 rounded-full bg-[#071523]/85 px-3 py-1 text-[11px] font-semibold text-amber-400 border border-white/10 backdrop-blur">
                  Kiến Trúc Cổ Điển Pháp
                </div>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="text-sm font-bold text-white group-hover:text-[#E2C275] transition">
                  Dinh Thự Cổ Điển Mái Mansard
                </h3>
                <p className="text-xs text-[#D2D8E3] line-clamp-2 leading-relaxed">
                  Hệ cửa sổ vòm nan trang trí, sơn tĩnh điện màu ghi xám Qualicoat Class 2 chống oxy hóa muối biển.
                </p>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/60">
                  <span>Quy cách: Cửa sổ vòm mở hất</span>
                  <span className="text-amber-400">Bản lề ma sát 304</span>
                </div>
              </div>
            </figure>

            {/* Project 3: Trụ sở tập đoàn Lan Huệ Group */}
            <figure className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0d1e33] transition-all hover:border-[#E2C275]/40 hover:shadow-xl">
              <div className="relative aspect-square w-full overflow-hidden bg-[#071523]">
                <Image
                  src="/uploads/cua-dep-ew/cong-trinh-su-dung-ew-7.jpg"
                  alt="Trụ sở doanh nghiệp Lan Huệ Group với mặt dựng kính kiến trúc và cửa sảnh Eurowindow"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 rounded-full bg-[#071523]/85 px-3 py-1 text-[11px] font-semibold text-[#1677FF] border border-white/10 backdrop-blur">
                  Trụ Sở Doanh Nghiệp
                </div>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="text-sm font-bold text-white group-hover:text-[#E2C275] transition">
                  Tòa Nhà Lan Huệ Group
                </h3>
                <p className="text-xs text-[#D2D8E3] line-clamp-2 leading-relaxed">
                  Mặt dựng kính khung nhôm giấu đố kết hợp hệ cửa sảnh đón tự động đóng mở cảm biến radar.
                </p>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/60">
                  <span>Mặt dựng: Hệ Stick chịu bão</span>
                  <span className="text-[#1677FF]">Kính Low-E cản nhiệt</span>
                </div>
              </div>
            </figure>

            {/* Project 4: Dinh thự hoàng gia */}
            <figure className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0d1e33] transition-all hover:border-[#E2C275]/40 hover:shadow-xl">
              <div className="relative aspect-square w-full overflow-hidden bg-[#071523]">
                <Image
                  src="/uploads/cua-dep-ew/cong-trinh-su-dung-ew-9.jpg"
                  alt="Dinh thự hoàng gia tân cổ điển 4 tầng với vách kính cong và cửa nhôm kính Eurowindow"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 rounded-full bg-[#071523]/85 px-3 py-1 text-[11px] font-semibold text-[#E2C275] border border-white/10 backdrop-blur">
                  Biệt Thự Tân Cổ Điển
                </div>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="text-sm font-bold text-white group-hover:text-[#E2C275] transition">
                  Dinh Thự 4 Tầng Ốp Đá
                </h3>
                <p className="text-xs text-[#D2D8E3] line-clamp-2 leading-relaxed">
                  Vách kính uốn cong bán kính R theo thiết kế kiến trúc mặt tiền, gia công tôi nhiệt an toàn tại nhà máy.
                </p>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/60">
                  <span>Hệ nhôm: EA95i tải trọng gió</span>
                  <span className="text-[#E2C275]">Sơn tĩnh điện 20 năm</span>
                </div>
              </div>
            </figure>

            {/* Project 5: Biệt thự vườn nhiệt đới */}
            <figure className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0d1e33] transition-all hover:border-[#E2C275]/40 hover:shadow-xl">
              <div className="relative aspect-square w-full overflow-hidden bg-[#071523]">
                <Image
                  src="/uploads/cua-dep-ew/cong-trinh-su-dung-ew-4.jpg"
                  alt="Biệt thự vườn hiện đại với cửa trượt nhôm kính và vách kính mở rộng view cảnh quan Eurowindow"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 rounded-full bg-[#071523]/85 px-3 py-1 text-[11px] font-semibold text-emerald-400 border border-white/10 backdrop-blur">
                  Biệt Thự Vườn Sinh Thái
                </div>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="text-sm font-bold text-white group-hover:text-[#E2C275] transition">
                  Biệt Thự Vườn Sinh Thái
                </h3>
                <p className="text-xs text-[#D2D8E3] line-clamp-2 leading-relaxed">
                  Cửa đi mở trượt nhôm kính 2 cánh kết hợp ray dẫn hướng âm sàn, giúp đóng mở nhẹ nhàng và an toàn ra sân vườn.
                </p>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/60">
                  <span>Cửa đi trượt: 2 cánh lùa êm</span>
                  <span className="text-emerald-400">Kính hộp cản nhiệt</span>
                </div>
              </div>
            </figure>

            {/* Project 6: Nhà phố kiến trúc hiện đại */}
            <figure className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0d1e33] transition-all hover:border-[#E2C275]/40 hover:shadow-xl">
              <div className="relative aspect-square w-full overflow-hidden bg-[#071523]">
                <Image
                  src="/uploads/cua-dep-ew/cong-trinh-su-dung-ew-5.jpg"
                  alt="Nhà phố hiện đại 4 tầng với hệ thống cửa sổ mở hất và cửa nhôm thanh mảnh Eurowindow"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 rounded-full bg-[#071523]/85 px-3 py-1 text-[11px] font-semibold text-cyan-400 border border-white/10 backdrop-blur">
                  Nhà Phố Mặt Tiền
                </div>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="text-sm font-bold text-white group-hover:text-[#E2C275] transition">
                  Nhà Phố 4 Tầng Mặt Tiền
                </h3>
                <p className="text-xs text-[#D2D8E3] line-clamp-2 leading-relaxed">
                  Cửa sổ mở hất góc 45 độ đón gió tươi đối lưu và ngăn nước mưa tạt trực tiếp vào phòng ngủ các tầng trên.
                </p>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/60">
                  <span>Hệ nhôm: EA55 vát cạnh</span>
                  <span className="text-cyan-400">Gioăng EPDM kép</span>
                </div>
              </div>
            </figure>
          </div>

          {/* Project 7: Featured Wide Villa Showcase */}
          <figure className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1e33] p-5 sm:p-6 transition-all hover:border-[#E2C275]/40">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-6 relative aspect-square sm:aspect-[16/11] w-full overflow-hidden rounded-xl bg-[#071523]">
                <Image
                  src="/uploads/cua-dep-ew/cua-tu-dong-2.jpg"
                  alt="Biệt thự nghỉ dưỡng cao cấp lắp đặt hệ thống lan can kính và cửa nhôm kính toàn diện Eurowindow"
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 rounded-full bg-[#071523]/85 px-3 py-1 text-[11px] font-semibold text-[#E2C275] border border-white/10 backdrop-blur">
                  Công Trình Tiêu Biểu
                </div>
              </div>
              <div className="lg:col-span-6 space-y-4">
                <span className="inline-block rounded-md bg-[#E2C275]/15 px-2.5 py-1 text-xs font-bold text-[#E2C275]">
                  Biệt Thự Đơn Lập 3 Tầng Hiện Đại
                </span>
                <h3 className="text-xl font-bold text-white">
                  Đồng Bộ Toàn Diện Cửa Nhôm, Vách Kính &amp; Lan Can Kính An Toàn
                </h3>
                <p className="text-xs sm:text-sm text-[#D2D8E3] leading-relaxed">
                  Công trình ứng dụng trọn bộ giải pháp Eurowindow từ hệ cửa đi mở trượt 4 cánh rộng thoáng ra sân vườn, cửa sổ mở quay lật chống mưa dông, cho đến lan can kính cường lực an toàn cho toàn bộ ban công các tầng.
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-lg border border-white/10 bg-[#071523] p-3">
                    <p className="text-white/60 text-[11px]">Hệ profile</p>
                    <p className="font-bold text-white">Nhôm EA55 &amp; EA70</p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-[#071523] p-3">
                    <p className="text-white/60 text-[11px]">Hệ phụ kiện</p>
                    <p className="font-bold text-[#E2C275]">Roto Frank (CHLB Đức)</p>
                  </div>
                </div>
              </div>
            </div>
            <figcaption className="mt-4 pt-3 border-t border-white/10 text-xs text-[#D2D8E3]/70 text-center sm:text-left">
              Hình 6: Toàn cảnh biệt thự đơn lập hoàn thiện lắp đặt trọn gói hệ thống cửa và vách kính kiến trúc Eurowindow chính hãng.
            </figcaption>
          </figure>
        </section>

        {/* Section 5: Verified Facilities & Showroom Network */}
        <section className="mt-16 space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl border-l-4 border-[#E2C275] pl-4">
            Mạng Lưới Showroom &amp; Năng Lực Sản Xuất Eurowindow
          </h2>
          <p className="text-base text-[#D2D8E3] leading-relaxed">
            Eurowindow vận hành hệ thống hạ tầng đồng bộ bao gồm <strong>5 nhà máy sản xuất vật liệu xây dựng quy mô lớn</strong> cùng hệ thống showroom và chi nhánh tại các đô thị trọng điểm:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/10 bg-[#102238] p-5 space-y-2">
              <div className="flex items-center gap-2 text-[#E2C275] font-bold text-sm">
                <MapPin className="h-4 w-4" />
                Showroom &amp; Văn Phòng TP. Hồ Chí Minh
              </div>
              <p className="text-xs text-[#D2D8E3]">
                Địa chỉ: 39 Bis Mạc Đĩnh Chi, Phường Tân Định, Quận 1, TP. Hồ Chí Minh.
              </p>
              <p className="text-xs text-white/70 font-mono">Hotline: 0966 994 338 &bull; Tel: (84 - 28) 6278 8124</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#102238] p-5 space-y-2">
              <div className="flex items-center gap-2 text-[#E2C275] font-bold text-sm">
                <MapPin className="h-4 w-4" />
                Trụ Sở Chính Eurowindow Hà Nội
              </div>
              <p className="text-xs text-[#D2D8E3]">
                Địa chỉ: Tòa nhà Eurowindow Office Building, Số 02 Tôn Thất Tùng, Kim Liên, Quận Đống Đa, Hà Nội.
              </p>
              <p className="text-xs text-white/70 font-mono">Hotline: 0909 888 000 &bull; Tel: (84 - 24) 37 47 47 00</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#102238] p-5 space-y-2">
              <div className="flex items-center gap-2 text-[#E2C275] font-bold text-sm">
                <MapPin className="h-4 w-4" />
                Showroom &amp; Chi Nhánh Đà Nẵng (Miền Trung)
              </div>
              <p className="text-xs text-[#D2D8E3]">
                Địa chỉ: 152 Phan Đăng Lưu, Phường Hòa Cường, TP. Đà Nẵng.
              </p>
              <p className="text-xs text-white/70 font-mono">Hotline: 0906 000 111 &bull; Tel: (84 - 236) 3 582 877</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#102238] p-5 space-y-2">
              <div className="flex items-center gap-2 text-[#E2C275] font-bold text-sm">
                <MapPin className="h-4 w-4" />
                Nhà Máy Sản Xuất Phía Nam
              </div>
              <p className="text-xs text-[#D2D8E3]">
                Địa chỉ: ĐT745, P. Tân Uyên, TP. Hồ Chí Minh (trực tiếp gia công cửa nhôm kính, uPVC và kính hộp).
              </p>
              <p className="text-xs text-white/70 font-mono">Hotline: 0966 994 338</p>
            </div>
          </div>

          <p className="text-xs text-white/60 italic pt-1">
            * Để tham khảo vị trí và thông tin cập nhật chi tiết của toàn bộ hệ thống đại diện, Quý khách có thể xem tại trang <Link href="/he-thong-showroom" className="text-[#E2C275] hover:underline">Hệ thống Showroom Eurowindow</Link>.
          </p>
        </section>

        {/* Section 6: Consultation and Workflow */}
        <section className="mt-16 space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl border-l-4 border-[#E2C275] pl-4">
            Quy Trình Tư Vấn Kỹ Thuật &amp; Thi Công Lắp Đặt Cửa
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="rounded-xl border border-white/10 bg-[#0d1e33] p-5 text-center space-y-2">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#E2C275] text-sm font-extrabold text-[#071523]">
                1
              </div>
              <h4 className="text-sm font-bold text-white">Khảo Sát &amp; Đo Đạc</h4>
              <p className="text-xs text-[#D2D8E3]">
                Kỹ sư tiếp nhận bản vẽ hoặc đến hiện trường công trình đo đạc kích thước lọt lòng, kiểm tra hướng gió và độ ồn.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0d1e33] p-5 text-center space-y-2">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#E2C275] text-sm font-extrabold text-[#071523]">
                2
              </div>
              <h4 className="text-sm font-bold text-white">Lên Phương Án &amp; Báo Giá</h4>
              <p className="text-xs text-[#D2D8E3]">
                Tư vấn hệ profile, loại kính và phụ kiện tương thích với kiến trúc; xuất bảng dự toán chi tiết, minh bạch vật tư.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0d1e33] p-5 text-center space-y-2">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#E2C275] text-sm font-extrabold text-[#071523]">
                3
              </div>
              <h4 className="text-sm font-bold text-white">Sản Xuất Tại Nhà Máy</h4>
              <p className="text-xs text-[#D2D8E3]">
                Gia công trên dây chuyền tự động CNC nhập khẩu từ Đức, kiểm tra chất lượng KCS nghiêm ngặt trước khi xuất xưởng.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0d1e33] p-5 text-center space-y-2">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#E2C275] text-sm font-extrabold text-[#071523]">
                4
              </div>
              <h4 className="text-sm font-bold text-white">Lắp Đặt &amp; Bàn Giao</h4>
              <p className="text-xs text-[#D2D8E3]">
                Đội ngũ kỹ thuật viên chuyên nghiệp lắp đặt, bơm keo silicon chuyên dụng, căn chỉnh êm ái và kích hoạt bảo hành chính hãng.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7: FAQ */}
        <section className="mt-16 space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl border-l-4 border-[#E2C275] pl-4">
            Câu Hỏi Thường Gặp Về Cửa Eurowindow (FAQ)
          </h2>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => (
              <div key={idx} className="rounded-xl border border-white/10 bg-[#0d1e33] p-5 space-y-2">
                <h3 className="flex items-center gap-2 text-base font-bold text-[#E2C275]">
                  <HelpCircle className="h-4 w-4 shrink-0" />
                  {item.q}
                </h3>
                <p className="text-xs sm:text-sm text-[#D2D8E3] leading-relaxed pl-6">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 8: Interactive Geographic Selector & Lead Form */}
        <GeographicSelectorLeadForm />

        {/* Related Internal Navigation Links */}
        <section className="mt-16 border-t border-white/10 pt-8">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-4">
            Các chuyên mục giải pháp liên quan:
          </h3>
          <div className="flex flex-wrap gap-2 text-xs">
            <Link
              href="/san-pham/cua-nhom"
              className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-white/80 hover:border-[#E2C275] hover:text-white transition"
            >
              Cửa nhôm kính Eurowindow
            </Link>
            <Link
              href="/san-pham/cua-nhua-upvc"
              className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-white/80 hover:border-[#E2C275] hover:text-white transition"
            >
              Cửa nhựa uPVC Châu Âu
            </Link>
            <Link
              href="/san-pham/cua-cuon"
              className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-white/80 hover:border-[#E2C275] hover:text-white transition"
            >
              Cửa cuốn nhôm khe thoáng
            </Link>
            <Link
              href="/san-pham/cua-go"
              className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-white/80 hover:border-[#E2C275] hover:text-white transition"
            >
              Cửa gỗ chống cháy
            </Link>
            <Link
              href="/du-an"
              className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-white/80 hover:border-[#E2C275] hover:text-white transition"
            >
              Dự án tiêu biểu
            </Link>
            <Link
              href="/he-thong-showroom"
              className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-white/80 hover:border-[#E2C275] hover:text-white transition"
            >
              Hệ thống Showroom
            </Link>
            <Link
              href="/lien-he"
              className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-white/80 hover:border-[#E2C275] hover:text-white transition"
            >
              Liên hệ tư vấn
            </Link>
          </div>
        </section>
      </main>
    </article>
    <Footer />
  </div>
  );
}
