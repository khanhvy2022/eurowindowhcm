import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";

const stages = [
  ["1.0", "Tư vấn giải pháp", "Phân tích công năng, điều kiện công trình và nhu cầu sử dụng để lựa chọn hệ sản phẩm phù hợp. Chúng tôi lắng nghe trước, đề xuất sau."],
  ["2.0", "Thiết kế & triển khai", "Phối hợp với kiến trúc sư, chủ đầu tư và đội ngũ thi công — từ ý tưởng đến hồ sơ kỹ thuật, khớp nối đúng chuẩn công trình."],
  ["3.0", "Sản xuất & thi công", "Sản xuất theo hệ chuẩn, lắp đặt bởi đội ngũ kinh nghiệm, kiểm tra nghiệm thu từng hạng mục trước khi bàn giao."],
  ["4.0", "Bảo hành & chăm sóc", "Đồng hành sau bàn giao với quy trình hỗ trợ rõ ràng và dịch vụ bảo hành theo chính sách sản phẩm."],
] as const;

export const metadata: Metadata = {
  title: "Dịch Vụ Thi Công & Bảo Hành Cửa Eurowindow Hồ Chí Minh",
  description: "Quy trình tư vấn giải pháp, thiết kế kỹ thuật, sản xuất lắp đặt và bảo hành chính hãng cửa Eurowindow chuẩn châu Âu tại TP.HCM.",
  alternates: {
    canonical: "https://eurowindowhcm.com/dich-vu",
    languages: {
      vi: "/dich-vu",
      en: "/en/services",
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Cửa Eurowindow Hồ Chí Minh",
    title: "Dịch Vụ Thi Công & Bảo Hành Cửa Eurowindow Hồ Chí Minh",
    description: "Quy trình tư vấn giải pháp, thiết kế kỹ thuật, sản xuất lắp đặt và bảo hành chính hãng cửa Eurowindow chuẩn châu Âu tại TP.HCM.",
    url: "https://eurowindowhcm.com/dich-vu",
    images: [{ url: "https://eurowindowhcm.com/eurowindow/cuanhom.jpg.webp", width: 1200, height: 630, alt: "Dịch vụ Eurowindow" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dịch Vụ Thi Công & Bảo Hành Cửa Eurowindow Hồ Chí Minh",
    description: "Quy trình tư vấn, sản xuất lắp đặt và bảo hành chính hãng cửa Eurowindow.",
    images: ["https://eurowindowhcm.com/eurowindow/cuanhom.jpg.webp"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Dịch vụ tư vấn, thi công và lắp đặt cửa Eurowindow",
  provider: {
    "@type": "HomeAndConstructionBusiness",
    name: "Cửa Eurowindow Hồ Chí Minh",
    url: "https://eurowindowhcm.com",
    telephone: "+84966994338",
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Thành phố Hồ Chí Minh và khu vực miền Nam",
  },
  description: "Dịch vụ trọn gói từ tư vấn giải pháp, đo đạc thiết kế, sản xuất đến thi công lắp đặt cửa nhôm kính, cửa uPVC Eurowindow chính hãng.",
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Quy trình 4 bước thi công cửa Eurowindow tiêu chuẩn châu Âu",
  step: stages.map(([num, name, text], idx) => ({
    "@type": "HowToStep",
    position: idx + 1,
    name: `${num} ${name}`,
    text,
  })),
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#071523] text-white">
      <JsonLd data={serviceSchema} />
      <JsonLd data={howToSchema} />
      <Header />
      <main>
        <section className="relative overflow-hidden mx-auto max-w-[1320px] px-5 pb-16 pt-28 sm:px-8 sm:pt-32 md:pt-40">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E2C275]/30 bg-[#E2C275]/10 px-4 py-1.5 backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E2C275]">
              DỊCH VỤ · QUY TRÌNH 4 BƯỚC CHÂU ÂU
            </span>
          </div>
          <h1 className="mt-8 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Chọn Đúng Giải Pháp, Hoàn Thiện Đúng Chuẩn.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#D2D8E3]">
            Eurowindow đồng hành cùng khách hàng từ tư vấn, thiết kế đến triển khai và chăm sóc sau bàn giao — theo một quy trình chuyên nghiệp, minh bạch và có thể theo dõi từng bước.
          </p>
        </section>

        <section className="mx-auto max-w-[1320px] px-5 pb-24 sm:px-8 md:pb-32">
          <ol className="space-y-6">
            {stages.map(([num, title, text]) => (
              <li
                key={num}
                className="glass-card glass-card-hover grid gap-6 p-8 md:grid-cols-[140px_minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center md:gap-10 md:p-10"
              >
                <p className="font-mono text-3xl font-extrabold text-[#E2C275]">{num}</p>
                <h2 className="text-2xl font-extrabold uppercase tracking-tight text-white md:text-3xl">{title}</h2>
                <p className="text-sm leading-relaxed text-[#D2D8E3] sm:text-base">{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="relative overflow-hidden border-t border-white/10 bg-[#102238]/80 py-20 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-[1320px] flex-col items-start gap-8 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E2C275]">Bắt đầu dự án</span>
              <h2 className="max-w-2xl text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl">
                Chia sẻ nhu cầu của bạn — chúng tôi sẽ tư vấn giải pháp tối ưu nhất.
              </h2>
            </div>
            <Link href="/lien-he" className="btn-gold-luxury shrink-0 px-8 py-4 text-xs uppercase tracking-widest">
              Bắt đầu tư vấn ngay →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
