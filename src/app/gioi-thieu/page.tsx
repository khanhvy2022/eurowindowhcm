"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageBanner from "@/components/PageBanner";
import { introImage, introParagraphs } from "@/data/eurowindow";
import { ArrowRight, Award } from "lucide-react";
import Link from "next/link";

const stats = [
  ["2002", "năm thành lập"],
  ["20+", "năm kinh nghiệm"],
  ["100.000+", "công trình phủ sóng"],
  ["14", "năm Thương hiệu Quốc gia"],
  ["6+", "hệ sản phẩm chính"],
  ["2", "nhà máy hiện đại"],
] as const;

const services = [
  {
    title: "CỬA uPVC TIÊU CHUẨN CHÂU ÂU",
    text: "Hệ cửa nhựa uPVC cách âm, cách nhiệt vượt trội — dòng sản phẩm làm nên tên tuổi Eurowindow từ năm 2002.",
    image: "/eurowindow/cuanhua1.jpg.webp",
  },
  {
    title: "CỬA NHÔM & VÁCH KÍNH LỚN",
    text: "Cửa và vách nhôm cao cấp, phụ kiện chính hãng Cmech, Roto, Hafele — khắc phục triệt để nhược điểm nhôm thông thường.",
    image: "/eurowindow/cuanhom.jpg.webp",
  },
  {
    title: "CỬA GỖ & GỖ CHỐNG CHÁY",
    text: "Cửa gỗ tự nhiên, gỗ công nghiệp và gỗ chống cháy — sang trọng, bền bỉ và an toàn cho mọi công trình.",
    image: "/eurowindow/cuagotrangchu.jpg.webp",
  },
] as const;

const awards = [
  ["14", "năm liên tiếp Thương hiệu Quốc gia", "Bộ Công Thương"],
  ["2026", "Top 10 doanh nghiệp xanh Việt Nam", "Vietnam Report"],
  ["2024", "Giải thưởng chất lượng sản phẩm Việt Nam", "Vietnam Quality Award"],
] as const;

const projects = [
  { title: "Cảng hàng không Phú Bài Huế", location: "Công trình quốc gia", image: "/eurowindow/constructions/viber-image-2025-02-05-13-33-24-065.png.webp" },
  { title: "Bệnh viện Việt Pháp", location: "Bệnh viện", image: "/eurowindow/constructions/img-7105.jpg.webp" },
  { title: "Bệnh viện ung bướu Đà Nẵng", location: "Bệnh viện", image: "/eurowindow/constructions/benh-vien-ung-buou-da-nang-17.jpg.webp" },
  { title: "Bệnh viện Nhi đồng TP. Hồ Chí Minh", location: "Bệnh viện", image: "/eurowindow/constructions/dji-0090-1.jpg.webp" },
  { title: "TT Truyền hình Thông tấn xã Việt Nam", location: "Trụ sở cơ quan", image: "/eurowindow/constructions/img-7172.jpg.webp" },
  { title: "Trụ sở Viện KSND Tối cao", location: "Trụ sở cơ quan", image: "/eurowindow/constructions/20191115-vien-kiem-soat-nhan-dan-toi-cao-0038.jpg.webp" },
] as const;

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#071523] text-white">
      <Header />
      <main>
        <PageBanner title="VỀ CHÚNG TÔI" crumb="Giới thiệu" bgImage="/eurowindow/upvc4.png.webp" />

        <section className="pb-24 pt-16 md:pt-24">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <h2 className="text-center text-3xl font-extrabold uppercase tracking-tight text-white md:text-5xl">
              VỀ EUROWINDOW
            </h2>
            <div className="mt-14 grid items-center gap-12 md:grid-cols-2">
              <div className="glass-card p-8 backdrop-blur-2xl">
                {introParagraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className="mt-5 text-sm leading-relaxed text-[#D2D8E3] first:mt-0 sm:text-base">{paragraph}</p>
                ))}
                <div className="mt-8">
                  <Link href="/san-pham" className="btn-gold-luxury inline-flex items-center gap-2 px-6 py-3.5 text-xs uppercase tracking-widest">
                    XEM THÊM GIẢI PHÁP <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div className="glass-card overflow-hidden p-3 backdrop-blur-2xl">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#102238]">
                  <img
                    src={introImage}
                    alt="Eurowindow – nhà cung cấp giải pháp tổng thể về vật liệu xây dựng xanh"
                    className="h-full w-full object-cover transition duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-t border-white/10 bg-[#102238]/60 py-20">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-[#D2D8E3]">
              Hơn 20 năm, Eurowindow luôn tận tụy phục vụ, nỗ lực kiến tạo không gian sống hạnh phúc cho hàng triệu ngôi nhà Việt…
            </p>
            <dl className="mt-14 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
              {stats.map(([num, label]) => (
                <div key={label} className="glass-card p-5 text-center">
                  <dd className="text-3xl font-extrabold tracking-tight text-[#E2C275] md:text-4xl">{num}</dd>
                  <dt className="mt-2 text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">{label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="overflow-hidden border-y border-white/10 bg-[#1677FF]/90 py-4 backdrop-blur-md">
          <div className="animate-marquee flex w-max items-center gap-10">
            {[0, 1].map((dup) => (
              <span key={dup} className="flex items-center gap-10 whitespace-nowrap text-xl font-extrabold uppercase tracking-wider text-white md:text-2xl">
                {["Tiên phong. Kiến tạo. Đồng hành.", "Giải pháp vật liệu xây dựng xanh", "Hiện diện ở hàng trăm nghìn công trình"].map((t) => (
                  <span key={t} className="flex items-center gap-10">{t}<span className="text-[#E2C275]">•</span></span>
                ))}
              </span>
            ))}
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto grid max-w-[1320px] items-center gap-12 px-5 sm:px-8 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-extrabold uppercase tracking-tight text-white md:text-4xl">Hành trình thương hiệu</h2>
              <ul className="mt-8 space-y-6">
                <li className="flex gap-4">
                  <span className="mt-1.5 h-3 w-3 shrink-0 rounded-full bg-[#E2C275]" />
                  <p className="leading-relaxed text-[#D2D8E3] text-sm sm:text-base"><strong className="text-white">2002</strong> — thành lập, tiên phong đưa cửa hiện đại uPVC tiêu chuẩn Châu Âu vào thị trường Việt Nam.</p>
                </li>
                <li className="flex gap-4">
                  <span className="mt-1.5 h-3 w-3 shrink-0 rounded-full bg-[#E2C275]" />
                  <p className="leading-relaxed text-[#D2D8E3] text-sm sm:text-base"><strong className="text-white">2012</strong> — Eurowindow lần đầu đạt Thương hiệu Quốc gia, mở đầu chuỗi 14 năm liên tiếp được vinh danh.</p>
                </li>
                <li className="flex gap-4">
                  <span className="mt-1.5 h-3 w-3 shrink-0 rounded-full bg-[#E2C275]" />
                  <p className="leading-relaxed text-[#D2D8E3] text-sm sm:text-base"><strong className="text-white">2020</strong> — phát triển đa dạng hệ giải pháp: cửa nhôm, cửa gỗ, cửa tự động, cửa cuốn và kính an toàn khổ lớn.</p>
                </li>
                <li className="flex gap-4">
                  <span className="mt-1.5 h-3 w-3 shrink-0 rounded-full bg-[#E2C275]" />
                  <p className="leading-relaxed text-[#D2D8E3] text-sm sm:text-base"><strong className="text-white">Hôm nay</strong> — sản phẩm hiện diện ở hàng trăm nghìn công trình tại Việt Nam và khu vực quốc tế.</p>
                </li>
              </ul>
            </div>
            <div className="glass-card order-1 overflow-hidden p-3 md:order-2 backdrop-blur-2xl">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#102238]">
                <img src="/eurowindow/about-office.jpg.webp" alt="Tòa nhà văn phòng Eurowindow" className="h-full w-full object-cover transition duration-700 hover:scale-105" />
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#0c1c33]/80 py-20">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <div className="relative overflow-hidden rounded-3xl border border-[#C9A227]/30 bg-[#06101f] p-8 sm:p-12 shadow-2xl backdrop-blur-2xl">
              <div className="grid items-center gap-8 md:grid-cols-12">
                <div className="space-y-4 md:col-span-8">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/40 bg-[#C9A227]/10 px-4 py-1.5">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A227]">
                      TÀI LIỆU KỸ THUẬT CHÍNH HÃNG
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                    Catalogue Eurowindow 2024 Mới Nhất
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed text-[#D2D8E3]">
                    Khám phá trọn bộ tài liệu kỹ thuật, mặt cắt profile nhôm EA55–EA95i, thông số cách âm cửa uPVC Kömmerling và các hệ sản phẩm kiến trúc cao cấp của Eurowindow.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 md:col-span-4 md:justify-end">
                  <Link
                    href="/catalogue"
                    className="btn-gold-luxury px-6 py-3.5 text-center text-xs font-bold uppercase tracking-widest inline-flex items-center justify-center gap-2"
                  >
                    <span>Xem &amp; Tải Catalogue</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <h2 className="text-center text-3xl font-extrabold uppercase tracking-tight text-white md:text-4xl">Sản Phẩm &amp; Dịch Vụ Nổi Bật</h2>
            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {services.map((service) => (
                <article key={service.title} className="glass-card glass-card-hover group relative min-h-[460px] overflow-hidden p-8">
                  <img src={service.image} alt={service.title} className="absolute inset-0 h-full w-full object-cover opacity-40 transition duration-700 group-hover:scale-105 group-hover:opacity-55" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071523] via-[#071523]/70 to-[#071523]/20" />
                  <div className="relative flex h-full flex-col justify-end">
                    <h3 className="text-xl font-extrabold leading-snug tracking-tight text-white transition group-hover:text-[#E2C275]">{service.title}</h3>
                    <p className="mt-3 text-xs leading-relaxed text-[#D2D8E3]">{service.text}</p>
                    <Link href="/san-pham" className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E2C275] transition hover:text-white">Xem thêm <ArrowRight className="h-4 w-4" /></Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#102238]/60 py-24">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <h2 className="text-3xl font-extrabold uppercase tracking-tight text-white md:text-4xl">Giải thưởng &amp; Chứng nhận</h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {awards.map(([year, title, org]) => (
                <div key={year} className="glass-card glass-card-hover p-8">
                  <Award className="h-8 w-8 text-[#E2C275]" />
                  <p className="mt-5 text-xs font-bold uppercase tracking-widest text-[#E2C275]">{year}</p>
                  <h3 className="mt-2 text-lg font-bold leading-snug text-white">{title}</h3>
                  <p className="mt-3 text-xs text-[#94A3B8]">{org}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <div className="mb-12 flex items-end justify-between gap-6">
              <h2 className="text-3xl font-extrabold uppercase tracking-tight text-white md:text-4xl">Dự án tiêu biểu</h2>
              <Link href="/du-an" className="hidden items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E2C275] md:inline-flex hover:text-[#F0D18A]">Xem tất cả <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <article key={project.title} className="glass-card glass-card-hover group flex flex-col overflow-hidden p-5">
                  <div className="relative aspect-[16/11] overflow-hidden rounded-xl bg-[#102238]">
                    <img src={project.image} alt={project.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex items-end justify-between gap-4 pt-5">
                    <div>
                      <h3 className="text-base font-bold tracking-tight text-white transition group-hover:text-[#E2C275]">{project.title}</h3>
                      <p className="mt-1.5 text-xs text-[#94A3B8]">{project.location}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-[#E2C275] transition-transform group-hover:translate-x-1" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
