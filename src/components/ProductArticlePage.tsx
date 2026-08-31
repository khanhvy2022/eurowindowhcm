import Header from "./Header";
import Footer from "./Footer";
import PageBanner from "./PageBanner";
import RelatedProducts from "./RelatedProducts";
import { Check } from "lucide-react";
import type { SanPhamArticle } from "@/app/san-pham/data";
import { getArticlesByCategory, getCategoryByKey } from "@/app/san-pham/categories";
import Link from "next/link";
import JsonLd from "./JsonLd";

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
      <Link key={match.index} href={href} className="font-semibold text-[#E2C275] underline hover:text-white transition">
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

export default function ProductArticlePage({ article, label, bgImage, currentHref, categoryKey }: ProductArticlePageProps) {
  const siblings = categoryKey ? getArticlesByCategory(categoryKey) : [];
  const currentCat = categoryKey ? getCategoryByKey(categoryKey) : undefined;
  const related = siblings.filter((a) => a.slug !== article.slug);

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
      { "@type": "ListItem", position: 3, name: label, item: currentCat ? `${SITE_URL}${currentCat.href}` : `${SITE_URL}/san-pham` },
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
    <div className="min-h-screen bg-[#071523] text-white">
      <Header />
      <main>
        <JsonLd data={articleSchema} />
        <JsonLd data={productSchema} />
        <JsonLd data={breadcrumbSchema} />
        <JsonLd data={faqSchema} />
        <PageBanner title={article.bannerTitle} crumb={label} bgImage={bgImage} />

        <section className="pb-24 pt-14">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            {/* 2 Labels trên 1 bài viết */}
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <span className="inline-block rounded-full border border-[#E2C275]/40 bg-[#E2C275]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#E2C275]">
                Sản phẩm
              </span>
              <span className="inline-block rounded-full bg-[#1677FF] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow-md">
                {label}
              </span>
            </div>

            {article.excerpt ? (
              <p className="mb-12 max-w-3xl text-lg leading-8 text-[#D2D8E3]">
                {renderFormattedText(article.excerpt)}
              </p>
            ) : null}

            <div className="space-y-16">
              {article.sections.map((section) => (
                <section key={section.id} className="space-y-5 leading-8 text-[#D2D8E3]">
                  <h2 className="text-2xl font-extrabold uppercase tracking-tight text-white md:text-3xl">
                    {section.heading}
                  </h2>
                  {section.body.map((line, i) => {
                    if (/^-\s/.test(line)) {
                      return (
                        <div key={i} className="flex items-start gap-3">
                          <Check className="mt-1 h-5 w-5 shrink-0 text-[#E2C275]" strokeWidth={3} />
                          <span>{renderFormattedText(line.replace(/^-\s/, ""))}</span>
                        </div>
                      );
                    }
                    return <p key={i} className="space-y-5">{renderFormattedText(line)}</p>;
                  })}
                </section>
              ))}
            </div>

            {/* Khối CTA Liên kết nội bộ */}
            <div className="glass-card border-[#E2C275]/30 bg-[#102238]/80 mt-16 p-8 text-center sm:text-left shadow-2xl">
              <h3 className="text-xl font-extrabold uppercase tracking-wide text-white">
                Bạn cần tư vấn chi tiết về {label} Eurowindow?
              </h3>
              <p className="mt-2 text-sm text-[#D2D8E3]">
                Liên hệ ngay hotline hoặc tham khảo chi tiết sản phẩm chính hãng Eurowindow để nhận báo giá ưu đãi tốt nhất.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                {currentCat ? (
                  <Link
                    href={currentCat.href}
                    className="btn-gold-luxury text-xs uppercase tracking-wider"
                  >
                    Xem sản phẩm {currentCat.label}
                  </Link>
                ) : null}
                <Link
                  href="/lien-he"
                  className="btn-secondary-outline text-xs uppercase tracking-wider"
                >
                  Nhận báo giá &amp; Tư vấn
                </Link>
              </div>
            </div>

            {related.length > 0 && currentCat && (
              <div className="mt-20">
                <h2 className="mb-8 text-xl font-extrabold uppercase tracking-tight text-white">
                  Các bài viết cùng danh mục {currentCat.label}
                </h2>
                <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                  {related.map((r) => (
                    <li key={r.slug} className="glass-card glass-card-hover p-6">
                      <Link href={`/san-pham/${currentCat.key}/bai-viet/${r.slug}`} className="text-base font-bold text-white hover:text-[#E2C275] transition">
                        {r.title || r.slug}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {categoryKey && CATEGORY_KNOWLEDGE_LINKS[categoryKey] && (
              <div className="mt-16">
                <h2 className="mb-8 text-xl font-extrabold uppercase tracking-tight text-white">
                  Kiến thức &amp; Cẩm nang chuyên môn về {label}
                </h2>
                <ul className="grid gap-4 sm:grid-cols-2">
                  {CATEGORY_KNOWLEDGE_LINKS[categoryKey].map((k) => (
                    <li key={k.href} className="glass-card glass-card-hover p-5 border-l-2 border-l-[#E2C275]">
                      <Link href={k.href} className="text-sm font-semibold text-[#D2D8E3] hover:text-[#E2C275] transition line-clamp-2">
                        → {k.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      </main>
      <RelatedProducts currentHref={currentHref} />
      <Footer />
    </div>
  );
}