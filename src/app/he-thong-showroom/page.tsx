import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageBanner from "@/components/PageBanner";
import { getPostBySlug, cleanArticleHtml } from "@/lib/posts";
import { Building2, Clock, Headphones, MapPin, Phone, ShieldCheck, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const BASE_URL = "https://www.eurowindowhcm.com";

export const metadata: Metadata = {
  title: "Hệ Thống Showroom Cửa Eurowindow Toàn Quốc | Eurowindow HCM",
  description:
    "Danh sách hệ thống showroom Eurowindow trên toàn quốc tại Hà Nội, TP. Hồ Chí Minh, Đà Nẵng, Bình Dương, Cần Thơ, Nha Trang... Trải nghiệm thực tế các dòng cửa nhôm, cửa uPVC, cửa gỗ cao cấp.",
  alternates: {
    canonical: `${BASE_URL}/he-thong-showroom`,
  },
  openGraph: {
    title: "Hệ Thống Showroom Cửa Eurowindow Toàn Quốc",
    description:
      "Trải nghiệm trực tiếp các giải pháp cửa nhôm kính, cửa uPVC, cửa gỗ và vách nhôm kính tại hệ thống showroom Eurowindow trên toàn quốc.",
    url: `${BASE_URL}/he-thong-showroom`,
    type: "website",
    images: [{ url: "/uploads/eurowindow-hcm-82.png", width: 960, height: 640, alt: "Hệ thống showroom Eurowindow" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hệ Thống Showroom Cửa Eurowindow Toàn Quốc",
    description: "Mạng lưới showroom Eurowindow chính hãng trên toàn quốc.",
    images: ["/uploads/eurowindow-hcm-82.png"],
  },
};

export default async function ShowroomPage() {
  const article = await getPostBySlug("he-thong-showroom");
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Eurowindow - Hệ Thống Showroom Toàn Quốc",
    image: `${BASE_URL}/uploads/eurowindow-hcm-82.png`,
    telephone: "0966 994 338",
    url: `${BASE_URL}/he-thong-showroom`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "39 Bis Mạc Đĩnh Chi, Phường Tân Định",
      addressLocality: "Quận 1",
      addressRegion: "Hồ Chí Minh",
      addressCountry: "VN",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Trang chủ",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Hệ thống showroom",
        item: `${BASE_URL}/he-thong-showroom`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#071523] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <main>
        <PageBanner
          title="HỆ THỐNG SHOWROOM"
          sub="Mạng lưới showroom trải nghiệm sản phẩm cửa và vách nhôm kính Eurowindow trên toàn quốc"
          crumb="Hệ thống showroom"
          bgImage="/eurowindow/about-office.jpg.webp"
        />

        {/* Highlight Key Branches */}
        <section className="border-b border-white/10 py-12 lg:py-16">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <div className="mb-10 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#E2C275]/40 bg-[#E2C275]/10 px-4 py-1.5 backdrop-blur-md">
                <Sparkles className="h-4 w-4 text-[#E2C275]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#E2C275]">
                  Mạng Lưới Toàn Quốc
                </span>
              </div>
              <h2 className="mt-3 text-2xl font-black uppercase tracking-tight text-white sm:text-3xl lg:text-4xl">
                Địa Chỉ Showroom & Văn Phòng Đại Diện
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-[#94A3B8] sm:text-base">
                Quý khách có thể đến trực tiếp các showroom để trải nghiệm vận hành thực tế các mẫu cửa cao cấp và nhận tư vấn giải pháp bóc tách dự toán chi tiết.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Chi nhánh Miền Nam */}
              <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-[#E2C275]/50 hover:bg-white/[0.08]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E2C275]/10 text-[#E2C275] transition group-hover:scale-110">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-sm font-bold uppercase tracking-wider text-[#E2C275]">
                  Eurowindow Miền Nam
                </h3>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-white">
                  39 Bis Mạc Đĩnh Chi, Phường Tân Định, TP. Hồ Chí Minh
                </p>
                <div className="mt-4 space-y-1.5 text-xs text-[#D2D8E3]">
                  <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
                    <Phone className="h-4 w-4 text-[#E2C275]" />
                    <span>Hotline: <strong className="text-white">0966 994 338</strong> &bull; (84 - 28) 6278 8124</span>
                  </div>
                  <p className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-[#E2C275]" />
                    <span>Giờ làm việc: 8h00 - 18h00 (Tất cả các ngày)</span>
                  </p>
                </div>
              </div>

              {/* Trụ sở chính Hà Nội */}
              <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-[#E2C275]/50 hover:bg-white/[0.08]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E2C275]/10 text-[#E2C275] transition group-hover:scale-110">
                  <Building2 className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-sm font-bold uppercase tracking-wider text-[#E2C275]">
                  Trụ Sở Chính (Hà Nội)
                </h3>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-white">
                  Eurowindow Office Building, Số 02 Tôn Thất Tùng, P. Kim Liên, Q. Đống Đa, Hà Nội
                </p>
                <div className="mt-4 space-y-1.5 text-xs text-[#D2D8E3]">
                  <p className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-[#E2C275]" />
                    <span>Hotline: <strong className="text-white">0909 888 000</strong> &bull; (84 - 24) 37 47 47 00</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-[#E2C275]" />
                    <span>Giờ làm việc: 8h00 - 17h30 (Thứ 2 - Thứ 7)</span>
                  </p>
                </div>
              </div>

              {/* Chi nhánh Miền Trung */}
              <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-[#E2C275]/50 hover:bg-white/[0.08]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E2C275]/10 text-[#E2C275] transition group-hover:scale-110">
                  <Building2 className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-sm font-bold uppercase tracking-wider text-[#E2C275]">
                  Chi Nhánh Miền Trung (Đà Nẵng)
                </h3>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-white">
                  152 Phan Đăng Lưu, Phường Hòa Cường, TP. Đà Nẵng
                </p>
                <div className="mt-4 space-y-1.5 text-xs text-[#D2D8E3]">
                  <p className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-[#E2C275]" />
                    <span>Hotline: <strong className="text-white">0906 000 111</strong> &bull; (84 - 236) 3 582 877</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-[#E2C275]" />
                    <span>Giờ làm việc: 8h00 - 17h30 (Thứ 2 - Thứ 7)</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Showroom Listing */}
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-[1000px] px-5 sm:px-8">
            <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-6">
              <h2 className="text-2xl font-bold uppercase tracking-tight text-white md:text-3xl">
                Danh Sách Chi Tiết Các Showroom Toàn Quốc
              </h2>
            </div>

            {article.contentHtml ? (
              <div
                className="article-body text-[#D2D8E3] text-lg leading-relaxed space-y-6 [&_*]:bg-transparent! [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-white [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:leading-8 [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:my-6 [&_a]:text-[#E2C275] [&_a]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6"
                dangerouslySetInnerHTML={{ __html: cleanArticleHtml(article.contentHtml) || "" }}
              />
            ) : null}

            {/* Bottom Call to Action Card */}
            <div className="mt-16 rounded-3xl border border-[#E2C275]/30 bg-gradient-to-br from-[#102238] to-[#071523] p-8 shadow-2xl backdrop-blur-2xl sm:p-12 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#E2C275]/30 bg-[#E2C275]/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#E2C275]">
                <Headphones className="h-4 w-4" /> Hỗ Trợ Khách Hàng 24/7
              </div>
              <h3 className="mt-4 text-2xl font-black uppercase text-white sm:text-3xl">
                Cần Tư Vấn Chọn Showroom Gần Bạn Nhất?
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#D2D8E3] sm:text-base">
                Liên hệ ngay hotline kỹ thuật của Eurowindow để nhận chỉ dẫn đường đi, đặt lịch trải nghiệm hoặc{" "}
                <Link href="/lien-he" className="font-semibold text-[#E2C275] underline hover:text-white transition">
                  liên hệ tư vấn báo giá
                </Link>{" "}
                để chuyên viên tới khảo sát đo đạc tận nơi miễn phí.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="tel:0966994338"
                  className="btn-gold-luxury px-8 py-3.5 text-sm font-bold uppercase tracking-wider"
                >
                  Gọi Ngay: 0966 994 338
                </a>
                <Link
                  href="/lien-he"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-md transition hover:border-[#E2C275] hover:bg-white/10"
                >
                  Gửi Yêu Cầu Báo Giá
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
