import Header from "./Header";
import Footer from "./Footer";
import RelatedProducts from "./RelatedProducts";
import {
  Check,
  ShieldCheck,
  Layers,
  Sparkles,
  Phone,
  ArrowRight,
  Sliders,
  CheckCircle2,
  FileText,
  HelpCircle,
  Maximize2,
} from "lucide-react";
import type { SanPhamArticle } from "@/app/san-pham/data";
import { getArticlesByCategory, getCategoryByKey } from "@/app/san-pham/categories";
import Link from "next/link";
import JsonLd from "./JsonLd";
import { contact } from "@/data/eurowindow";

type ProductArticlePageProps = {
  article: SanPhamArticle;
  label: string;
  bgImage?: string;
  currentHref: string;
  categoryKey?: string;
};

function renderFormattedText(text: string) {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const [_, linkText, href] = match;
    parts.push(
      <Link
        key={match.index}
        href={href}
        className="font-semibold text-[#C9A227] underline decoration-[#C9A227]/40 hover:text-white transition"
      >
        {linkText}
      </Link>
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  return parts.length > 0 ? parts : text;
}

const CATEGORY_SPECS: Record<
  string,
  { label: string; value: string; desc: string }[]
> = {
  "cua-nhom": [
    { label: "Profile Nhôm", value: "EA55 – EA95i", desc: "Hợp kim 6063-T5 tiêu chuẩn quốc tế" },
    { label: "Cầu Cách Nhiệt", value: "Polyamide", desc: "Giảm 30% năng lượng điều hòa nhiệt độ" },
    { label: "Phụ Kiện Kim Khí", value: "Cmech / Roto", desc: "Nhập khẩu chính hãng CHLB Đức & Hoa Kỳ" },
    { label: "Cách Âm Tối Đa", value: "Tới 40 – 44 dB", desc: "Ngăn triệt để tiếng ồn đô thị" },
  ],
  "cua-nhua-upvc": [
    { label: "Profile uPVC", value: "Kömmerling (Đức)", desc: "Độc quyền phân phối tại Việt Nam từ 2002" },
    { label: "Lõi Thép Gia Cường", value: "Mạ Kẽm Chống Gỉ", desc: "Tăng cứng, chịu áp lực bão cấp 12+" },
    { label: "Hệ Gioăng Kép", value: "EPDM Chuyên Dụng", desc: "Kín nước, kín khí, không co ngót" },
    { label: "Bảo Hành Profile", value: "10 Năm Chính Hãng", desc: "Không ố vàng, không cong vênh" },
  ],
  "cua-go": [
    { label: "Chủng Loại", value: "Gỗ Tự Nhiên & Chống Cháy", desc: "Đạt kiểm định PCCC 60 – 120 phút" },
    { label: "Công Nghệ Sấy", value: "Độ Ẩm < 12%", desc: "Chuyển giao từ Ý, Tây Ban Nha, Nga" },
    { label: "Sơn Bề Mặt", value: "Phun Tự Động", desc: "Phẳng mịn, tôn vân gỗ tự nhiên" },
    { label: "Ứng Dụng", value: "Cửa Thông Phòng / Căn Hộ", desc: "Cách âm, đóng mở êm ái" },
  ],
  "san-pham-kinh": [
    { label: "Dòng Kính", value: "Low-E / Kính Hộp / Điện", desc: "Cản 99% tia UV bức xạ mặt trời" },
    { label: "Tiêu Chuẩn", value: "Châu Âu EN 12150", desc: "Chịu lực va đập gấp 5 lần kính thường" },
    { label: "Gia Công", value: "Phòng Kín Khí Trơ", desc: "Độ ẩm ≤46%, nhiệt độ kiểm soát 20–28°C" },
    { label: "Độ Bền", value: "An Toàn Tuyệt Đối", desc: "Mảnh vụn hạt ngô không gây sát thương" },
  ],
  "cua-tu-dong": [
    { label: "Cảm Biến", value: "Mắt Thần Radar / Quang", desc: "Tự động đóng mở thông minh" },
    { label: "Động Cơ Motor", value: "Âm Sàn / Treo 24V", desc: "Vận hành siêu êm, độ bền 1.000.000+ chu kỳ" },
    { label: "An Toàn", value: "Chống Kẹp Thông Minh", desc: "Tự đảo chiều khi gặp vật cản" },
    { label: "Ứng Dụng", value: "Tòa Nhà / Bệnh Viện / Villa", desc: "Sang trọng, hiện đại, tiện nghi" },
  ],
  "cua-cuon": [
    { label: "Vật Liệu Nan", value: "Hợp Kim Nhôm Cao Cấp", desc: "Sơn tĩnh điện ngoài trời cao cấp" },
    { label: "Cơ Chế An Toàn", value: "Cảm Biến Đảo Chiều", desc: "Chống xô nan, an toàn cho trẻ nhỏ" },
    { label: "Bảo Mật", value: "Mã Nhảy Rolling Code", desc: "Chống dò sóng, chống sao chép remote" },
    { label: "Vận Hành", value: "Êm Ái, Bền Bỉ", desc: "Hệ thống gioăng giảm chấn triệt tiêu tiếng ồn" },
  ],
};

const CATEGORY_KNOWLEDGE_LINKS: Record<string, { title: string; href: string }[]> = {
  "cua-nhom": [
    { title: "Cửa nhôm cầu cách nhiệt – Bí quyết tiết kiệm điện năng cho biệt thự hiện đại", href: "/tin-tuc/cua-nhom-cau-cach-nhiet-bi-quyet-tiet-kiem-dien" },
    { title: "So sánh cửa nhôm kính và cửa nhựa uPVC Eurowindow: Nên chọn loại nào?", href: "/tin-tuc/so-sanh-cua-nhom-va-cua-upvc" },
    { title: "Ưu đãi hệ cửa nhôm kính EA55–EA95i Eurowindow chính hãng", href: "/tin-tuc/uu-dai-cua-nhom-kinh" },
    { title: "Tổng hợp giải pháp cửa chống nóng Eurowindow mùa hè 2026", href: "/tin-tuc/giai-phap-cua-chong-nong-mua-he-2026" },
  ],
  "cua-nhua-upvc": [
    { title: "Ưu đãi cửa uPVC tiết kiệm năng lượng – Eurowindow HCM", href: "/tin-tuc/uu-dai-cua-upvc" },
    { title: "So sánh cửa nhôm kính và cửa nhựa uPVC Eurowindow: Nên chọn loại nào?", href: "/tin-tuc/so-sanh-cua-nhom-va-cua-upvc" },
    { title: "Tổng hợp giải pháp cửa chống nóng Eurowindow mùa hè 2026", href: "/tin-tuc/giai-phap-cua-chong-nong-mua-he-2026" },
  ],
  "san-pham-kinh": [
    { title: "Quy trình gia công kính cường lực và kính hộp cách nhiệt tiêu chuẩn Châu Âu", href: "/tin-tuc/quy-trinh-san-xuat-kinh-cuong-luc-eurowindow" },
    { title: "Nên chọn cửa gì cho mùa hè nắng nóng?", href: "/tin-tuc/nen-chon-cua-gi-cho-mua-he-nang-nong" },
    { title: "Chương trình ưu đãi kính điện đổi màu và cửa tự động Eurowindow 2026", href: "/tin-tuc/khuyen-mai-kinh-dien-doi-mau" },
  ],
  "cua-tu-dong": [
    { title: "Chương trình ưu đãi kính điện đổi màu và cửa tự động Eurowindow 2026", href: "/tin-tuc/khuyen-mai-kinh-dien-doi-mau" },
    { title: "Hướng dẫn bảo trì & vệ sinh hệ thống cửa nhôm kính luôn như mới", href: "/tin-tuc/bao-tri-he-thong-cua-dung-cach" },
  ],
  "cua-cuon": [
    { title: "Hướng dẫn bảo trì & vệ sinh hệ thống cửa luôn như mới", href: "/tin-tuc/bao-tri-he-thong-cua-dung-cach" },
    { title: "Phong thủy cửa sổ và cửa chính: Kích thước Lỗ Ban đón tài lộc cho gia chủ", href: "/tin-tuc/phong-thuy-cua-so-va-cua-chinh" },
  ],
  "cua-go": [
    { title: "Phong thủy cửa sổ và cửa chính: Kích thước Lỗ Ban đón tài lộc cho gia chủ", href: "/tin-tuc/phong-thuy-cua-so-va-cua-chinh" },
    { title: "So sánh cửa nhôm kính và cửa nhựa uPVC Eurowindow: Nên chọn loại nào?", href: "/tin-tuc/so-sanh-cua-nhom-va-cua-upvc" },
  ],
};

export default function ProductArticlePage({
  article,
  label,
  bgImage,
  currentHref,
  categoryKey,
}: ProductArticlePageProps) {
  const siblings = categoryKey ? getArticlesByCategory(categoryKey) : [];
  const currentCat = categoryKey ? getCategoryByKey(categoryKey) : undefined;
  const related = siblings.filter((a) => a.slug !== article.slug);

  const heroImage = bgImage || article.image || "/eurowindow/cuanhom.jpg.webp";
  const specs = (categoryKey && CATEGORY_SPECS[categoryKey]) || CATEGORY_SPECS["cua-nhom"];

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.eurowindowhcm.com";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt || "",
    image: article.image ? `${SITE_URL}${article.image}` : undefined,
    author: { "@type": "Organization", name: "Cửa Eurowindow Hồ Chí Minh" },
    publisher: {
      "@type": "Organization",
      name: "Cửa Eurowindow Hồ Chí Minh",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Sản phẩm", item: `${SITE_URL}/san-pham` },
      {
        "@type": "ListItem",
        position: 3,
        name: label,
        item: currentCat ? `${SITE_URL}${currentCat.href}` : `${SITE_URL}/san-pham`,
      },
      { "@type": "ListItem", position: 4, name: article.title },
    ],
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: article.title,
    description: article.excerpt || "",
    image: article.image ? `${SITE_URL}${article.image}` : undefined,
    brand: {
      "@type": "Brand",
      name: "Eurowindow",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Cửa Eurowindow Hồ Chí Minh",
      url: SITE_URL,
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "VND",
      seller: {
        "@type": "Organization",
        name: "Cửa Eurowindow Hồ Chí Minh",
        url: SITE_URL,
      },
    },
  };

  const categoryFaqs: Record<string, { q: string; a: string }[]> = {
    "cua-nhom": [
      {
        q: "Cửa nhôm Eurowindow có ưu điểm gì nổi bật?",
        a: "Cửa nhôm Eurowindow sử dụng hợp kim nhôm 6063-T5 tiêu chuẩn quốc tế kết hợp dải cầu cách nhiệt Polyamide và phụ kiện đồng bộ Roto/Cmech giúp cách âm tới 40dB, cách nhiệt vượt trội và chịu áp lực gió bão lớn.",
      },
      {
        q: "Thời gian bảo hành cửa nhôm Eurowindow là bao lâu?",
        a: "Eurowindow bảo hành bề mặt sơn tĩnh điện và Anodize từ 10 đến 25 năm, cùng dịch vụ bảo dưỡng định kỳ chính hãng trên toàn quốc.",
      },
    ],
    "cua-nhua-upvc": [
      {
        q: "Cửa nhựa uPVC Eurowindow có bị ố vàng hay cong vênh không?",
        a: "Thanh profile uPVC Eurowindow chứa chất ổn định nhiệt và phụ gia chống tia cực tím UV cao cấp, cam kết không cong vênh, không co ngót và không ố vàng sau hàng chục năm sử dụng.",
      },
      {
        q: "Khả năng cách âm và tiết kiệm điện của cửa uPVC Eurowindow như thế nào?",
        a: "Nhờ cấu trúc khoang rỗng đa buồng và hệ gioăng EPDM kép kín khít, cửa uPVC giảm độ ồn lên tới 44dB và cắt giảm khoảng 30% chi phí tiền điện điều hòa cho gia đình.",
      },
    ],
    "san-pham-kinh": [
      {
        q: "Các loại kính Eurowindow đạt những tiêu chuẩn an toàn nào?",
        a: "Kính cường lực, kính dán an toàn và kính hộp Eurowindow được tôi nhiệt và gia công tự động đạt tiêu chuẩn Châu Âu EN 12150, chịu va đập gấp 5 lần kính thông thường và an toàn tuyệt đối.",
      },
    ],
    "cua-tu-dong": [
      {
        q: "Cửa tự động Eurowindow phù hợp cho những công trình nào?",
        a: "Hệ thống cửa tự động Eurowindow chuyên dụng cho sảnh tòa nhà, văn phòng, bệnh viện và biệt thự với cảm biến thông minh, hoạt động êm ái và an toàn.",
      },
    ],
    "cua-cuon": [
      {
        q: "Cửa cuốn Eurowindow có tính năng an toàn gì đặc biệt?",
        a: "Cửa cuốn Eurowindow tích hợp cảm biến chống xô, tự động đảo chiều khi gặp vật cản, nan thép siêu bền và điều khiển mã nhảy chống sao chép.",
      },
    ],
    "cua-go": [
      {
        q: "Cửa gỗ Eurowindow có chống cong vênh và chống cháy không?",
        a: "Cửa gỗ Eurowindow được sấy công nghiệp đạt độ ẩm tiêu chuẩn dưới 12%, chống cong vênh co ngót, đồng thời có dòng cửa gỗ chống cháy đạt kiểm định PCCC 60-90-120 phút.",
      },
    ],
  };

  const defaultFaqs = (categoryKey && categoryFaqs[categoryKey]) || [
    {
      q: `Làm thế nào để nhận tư vấn báo giá ${article.title}?`,
      a: "Quý khách có thể liên hệ hotline 0966 994 338 hoặc gửi thông tin qua trang liên hệ để chuyên viên kỹ thuật Eurowindow tư vấn giải pháp và báo giá miễn phí tận nơi.",
    },
    {
      q: "Eurowindow có hỗ trợ thi công lắp đặt trọn gói không?",
      a: "Eurowindow cung cấp dịch vụ trọn gói từ khảo sát, thiết kế, gia công sản xuất đến thi công lắp đặt chuẩn Châu Âu và bảo hành chính hãng.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: defaultFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-[#06101f] text-white">
      <Header />
      <main id="main-content">
        <JsonLd data={articleSchema} />
        <JsonLd data={productSchema} />
        <JsonLd data={breadcrumbSchema} />
        <JsonLd data={faqSchema} />

        {/* 1. European Luxury Architectural 2-Column Hero */}
        <section className="relative overflow-hidden bg-[#06101f] pt-32 pb-20 sm:pt-40 sm:pb-28 border-b border-white/10">
          <div className="pointer-events-none absolute -left-40 top-0 h-[600px] w-[600px] rounded-full bg-[#1677FF]/5 blur-[140px]" />
          <div className="pointer-events-none absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-[#C9A227]/5 blur-[140px]" />

          <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-[#94A3B8]">
              <Link href="/" className="hover:text-white transition">Trang chủ</Link>
              <span>/</span>
              <Link href="/san-pham" className="hover:text-white transition">Sản phẩm</Link>
              <span>/</span>
              <span className="text-[#C9A227] font-medium">{label}</span>
            </nav>

            <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
              {/* Left Column: Text & Meta (7 Cols) */}
              <div className="space-y-6 lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/40 bg-[#C9A227]/10 px-4 py-1.5 backdrop-blur-md">
                  <ShieldCheck className="h-4 w-4 text-[#C9A227]" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A227]">
                    GIẢI PHÁP KIẾN TRÚC CAO CẤP EUROWINDOW
                  </span>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.18] tracking-tight text-white">
                  {article.title}
                </h1>

                {article.excerpt && (
                  <p className="text-base sm:text-lg leading-relaxed text-[#D2D8E3] max-w-2xl">
                    {renderFormattedText(article.excerpt)}
                  </p>
                )}

                {/* Direct Hero CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <Link
                    href="/lien-he"
                    className="btn-gold-luxury px-7 py-3.5 text-xs font-bold uppercase tracking-[0.16em]"
                  >
                    Nhận báo giá &amp; Tư vấn
                  </Link>
                  <a
                    href={`tel:${contact.hotline.replace(/\s+/g, "")}`}
                    className="btn-secondary-outline px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] flex items-center gap-2"
                  >
                    <Phone className="h-4 w-4 text-[#C9A227]" />
                    <span>Hotline: {contact.hotline}</span>
                  </a>
                </div>
              </div>

              {/* Right Column: High-End Architectural Photo (5 Cols) */}
              <div className="lg:col-span-5">
                <div className="group relative overflow-hidden rounded-3xl border border-white/15 bg-[#0c1c33] p-3 shadow-2xl backdrop-blur-2xl">
                  <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden rounded-2xl bg-[#06101f]">
                    <img
                      src={heroImage}
                      alt={article.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06101f]/75 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/10 bg-[#06101f]/85 p-3 backdrop-blur-md">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white uppercase tracking-wider">{label}</span>
                        <span className="font-semibold text-[#C9A227]">Tiêu chuẩn Châu Âu</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Technical Specifications Cards */}
        <section className="py-16 sm:py-20 bg-[#071523] border-b border-white/10">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-10 space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#C9A227]">
                <Sliders className="h-4 w-4" />
                <span>THÔNG SỐ &amp; ĐẶC TÍNH KỸ THUẬT</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Tiêu Chuẩn Kỹ Thuật Đạt Chuẩn Châu Âu
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {specs.map((spec, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-[#0c1c33]/80 p-6 backdrop-blur-xl shadow-lg transition duration-300 hover:border-[#C9A227]/40 hover:-translate-y-1"
                >
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
                    {spec.label}
                  </span>
                  <div className="mt-2 font-serif text-xl font-bold text-[#C9A227]">
                    {spec.value}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[#D2D8E3]">
                    {spec.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Detailed Article Sections */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <div className="space-y-16">
              {article.sections.map((section) => (
                <section key={section.id} className="space-y-6 leading-relaxed text-[#D2D8E3]">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white border-b border-white/10 pb-4">
                    {section.heading}
                  </h2>
                  <div className="space-y-4 text-sm sm:text-base leading-[1.8]">
                    {section.body.map((line, i) => {
                      if (/^-\s/.test(line)) {
                        return (
                          <div key={i} className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                            <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#C9A227]" strokeWidth={2.5} />
                            <span>{renderFormattedText(line.replace(/^-\s/, ""))}</span>
                          </div>
                        );
                      }
                      return (
                        <p key={i} className="text-[#D2D8E3]">
                          {renderFormattedText(line)}
                        </p>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>

            {/* 4. Quick Comparison Block */}
            <div className="mt-20 overflow-hidden rounded-3xl border border-[#C9A227]/30 bg-[#0c1c33] p-8 sm:p-10 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-6 mb-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A227]">
                    HƯỚNG DẪN LỰA CHỌN GIẢI PHÁP
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                    So Sánh &amp; Ứng Dụng Tối Ưu Cho Không Gian
                  </h3>
                </div>
                <Link href="/lien-he" className="btn-gold-luxury text-xs font-bold uppercase tracking-wider shrink-0">
                  Tư Vấn Miễn Phí
                </Link>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-xs sm:text-sm text-[#D2D8E3]">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-2">
                  <div className="font-bold text-white uppercase text-xs text-[#C9A227]">Mặt Ngoài &amp; Ban Công</div>
                  <p>Ưu tiên Cửa nhôm cầu cách nhiệt hoặc uPVC Châu Âu để chống ồn, chống bức xạ nhiệt và bão gió.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-2">
                  <div className="font-bold text-white uppercase text-xs text-[#C9A227]">Thông Phòng &amp; Nội Thất</div>
                  <p>Ưu tiên Cửa gỗ cao cấp hoặc cửa gỗ chống cháy để kiến tạo không gian ấm cúng, sang trọng.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-2 sm:col-span-2 lg:col-span-1">
                  <div className="font-bold text-white uppercase text-xs text-[#C9A227]">Sảnh &amp; Giếng Trời</div>
                  <p>Kết hợp Cửa tự động thông minh và Mái kính Low-E cảm biến mưa tự đóng ngắt.</p>
                </div>
              </div>
            </div>

            {/* 5. FAQs Section */}
            <div className="mt-20 space-y-8">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#C9A227]">
                  <HelpCircle className="h-4 w-4" />
                  <span>CÂU HỎI THƯỜNG GẶP</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Giải Đáp Thắc Mắc Về {label}
                </h3>
              </div>

              <div className="space-y-4">
                {defaultFaqs.map((faq, i) => (
                  <div key={i} className="rounded-2xl border border-white/10 bg-[#0c1c33]/60 p-6 backdrop-blur-md">
                    <h4 className="font-serif text-base font-bold text-white text-[#C9A227]">
                      Q: {faq.q}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-[#D2D8E3]">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Related Articles & Knowledge Links */}
            {related.length > 0 && currentCat && (
              <div className="mt-20 pt-10 border-t border-white/10">
                <h3 className="mb-6 font-serif text-xl font-bold text-white">
                  Các Bài Viết Cùng Danh Mục {currentCat.label}
                </h3>
                <ul className="grid gap-4 sm:grid-cols-2">
                  {related.map((r) => (
                    <li key={r.slug} className="group rounded-xl border border-white/10 bg-[#0c1c33]/70 p-4 transition hover:border-[#C9A227]/40">
                      <Link
                        href={`/san-pham/${currentCat.key}/bai-viet/${r.slug}`}
                        className="text-sm font-semibold text-white group-hover:text-[#C9A227] transition flex items-center justify-between"
                      >
                        <span className="line-clamp-1">{r.title || r.slug}</span>
                        <ArrowRight className="h-4 w-4 shrink-0 transition group-hover:translate-x-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {categoryKey && CATEGORY_KNOWLEDGE_LINKS[categoryKey] && (
              <div className="mt-12">
                <h3 className="mb-6 font-serif text-xl font-bold text-white">
                  Cẩm Nang Kỹ Thuật &amp; Tin Tức Liên Quan
                </h3>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {CATEGORY_KNOWLEDGE_LINKS[categoryKey].map((k) => (
                    <li key={k.href} className="rounded-xl border border-white/10 bg-[#0c1c33]/50 p-4 border-l-2 border-l-[#C9A227]">
                      <Link href={k.href} className="text-xs sm:text-sm font-medium text-[#D2D8E3] hover:text-[#C9A227] transition line-clamp-2">
                        → {k.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* 7. Bottom Showcase CTA */}
        <section className="bg-[#0c1c33] py-20 border-t border-white/10 text-center">
          <div className="mx-auto max-w-4xl px-5 space-y-6">
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Cần Báo Giá &amp; Khảo Sát {label} Tận Nơi?
            </h3>
            <p className="text-sm sm:text-base text-[#D2D8E3] max-w-2xl mx-auto">
              Chuyên viên kỹ thuật Eurowindow sẵn sàng khảo sát thực tế công trình, tư vấn giải pháp phong thủy và lập dự toán chi tiết hoàn toàn miễn phí.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link href="/lien-he" className="btn-gold-luxury px-8 py-4 text-xs font-bold uppercase tracking-widest">
                ĐĂNG KÝ TƯ VẤN NGAY
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

        <RelatedProducts currentHref={currentHref} />
      </main>
      <Footer />
    </div>
  );
}