import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ArrowRight, Building2, Home, Layers, Newspaper, PhoneCall, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 – Trang không tìm thấy | Eurowindow HCM",
  description:
    "Trang bạn đang tìm kiếm có thể đã thay đổi hoặc không tồn tại. Khám phá các giải pháp cửa nhôm kính, uPVC, cửa gỗ và dự án cao cấp của Eurowindow.",
  robots: { index: false, follow: true },
};

const quickLinks = [
  {
    title: "Trang chủ",
    desc: "Khám phá giải pháp tổng thể về cửa và vách kính cao cấp.",
    href: "/",
    icon: Home,
  },
  {
    title: "Sản phẩm cao cấp",
    desc: "Cửa nhôm, uPVC, cửa gỗ, cửa cuốn, cửa tự động và kính an toàn.",
    href: "/san-pham",
    icon: Layers,
  },
  {
    title: "Dự án tiêu biểu",
    desc: "Hàng trăm nghìn công trình quốc gia, bệnh viện, trụ sở và nhà ở.",
    href: "/du-an",
    icon: Building2,
  },
  {
    title: "Tin tức & Sự kiện",
    desc: "Cập nhật ưu đãi mới nhất, báo chí và kiến thức xây dựng.",
    href: "/tin-tuc",
    icon: Newspaper,
  },
];

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#071523] text-white flex flex-col justify-between selection:bg-[#E2C275] selection:text-[#071523]">
      <Header />

      <main className="relative overflow-hidden py-16 sm:py-24">
        {/* Ambient Glow */}
        <div className="pointer-events-none absolute inset-0 bg-ambient-glow" />
        <div className="pointer-events-none absolute -top-40 right-1/4 h-[500px] w-[500px] rounded-full bg-[#1677FF]/10 blur-[140px]" />
        <div className="pointer-events-none absolute -bottom-40 left-1/4 h-[500px] w-[500px] rounded-full bg-[#E2C275]/10 blur-[140px]" />

        <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8">
          {/* Top 404 Hero */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#E2C275]/30 bg-[#E2C275]/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-[#E2C275] backdrop-blur-md">
              <ShieldCheck className="h-4 w-4" />
              <span>Lỗi 404 · Trang không tồn tại</span>
            </div>

            <h1 className="mt-8 text-7xl font-extrabold tracking-tight text-white sm:text-9xl md:text-[140px] leading-none">
              <span className="bg-gradient-to-r from-white via-[#E2C275] to-white bg-clip-text text-transparent">
                404
              </span>
            </h1>

            <h2 className="mt-4 text-2xl font-extrabold uppercase tracking-tight text-white sm:text-3xl md:text-4xl">
              TRANG BẠN TÌM KIẾM KHÔNG TỒN TẠI
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#D2D8E3] sm:text-lg">
              Đường dẫn truy cập có thể đã được đổi tên, chuyển sang vị trí mới hoặc không còn tồn tại. Vui lòng chọn một trong các danh mục dưới đây để tiếp tục khám phá Eurowindow.
            </p>

            {/* Main Action Buttons */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/"
                className="btn-gold-luxury inline-flex items-center gap-3 px-8 py-4 text-xs font-extrabold uppercase tracking-widest"
              >
                <Home className="h-4 w-4" />
                VỀ TRANG CHỦ
              </Link>
              <Link
                href="/san-pham"
                className="glass-card glass-card-hover inline-flex items-center gap-3 border border-white/20 px-8 py-4 text-xs font-extrabold uppercase tracking-widest text-white backdrop-blur-md transition hover:border-[#E2C275]"
              >
                XEM SẢN PHẨM <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Quick Navigation Cards */}
          <div className="mt-20">
            <h3 className="mb-8 text-center text-xs font-bold uppercase tracking-widest text-[#94A3B8]">
              Danh mục khám phá gợi ý
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {quickLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="glass-card glass-card-hover group flex flex-col justify-between p-6 transition duration-300"
                  >
                    <div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1677FF]/15 text-[#E2C275] border border-[#E2C275]/20 transition group-hover:scale-110 group-hover:border-[#E2C275] group-hover:bg-[#E2C275] group-hover:text-[#071523]">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h4 className="mt-5 text-lg font-bold tracking-tight text-white transition group-hover:text-[#E2C275]">
                        {item.title}
                      </h4>
                      <p className="mt-2 text-xs leading-relaxed text-[#94A3B8]">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E2C275] transition group-hover:text-white">
                      <span>Truy cập</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Hotline Contact Banner */}
          <div className="glass-card mt-16 overflow-hidden p-8 text-center backdrop-blur-2xl md:p-10">
            <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-6 md:flex-row md:text-left">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#E2C275]">
                  Cần hỗ trợ trực tiếp từ chuyên gia?
                </p>
                <h4 className="mt-1 text-xl font-extrabold uppercase tracking-tight text-white md:text-2xl">
                  Liên hệ Hotline tư vấn giải pháp Eurowindow
                </h4>
              </div>
              <a
                href="tel:0909000000"
                className="btn-gold-luxury inline-flex shrink-0 items-center gap-3 px-7 py-4 text-xs font-extrabold uppercase tracking-widest"
              >
                <PhoneCall className="h-4 w-4" />
                HOTLINE DỰ ÁN
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}