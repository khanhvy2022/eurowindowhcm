import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactClient from "./ContactClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.eurowindowhcm.com";

export const metadata: Metadata = {
  title: "Liên Hệ Eurowindow – Hotline 0966 994 338 & Báo Giá Toàn Quốc",
  description:
    "Liên hệ Eurowindow tại TP. Hồ Chí Minh và toàn quốc. Hotline: 0966 994 338. Đăng ký khảo sát công trình, nhận bản vẽ thiết kế và bảng báo giá dự toán chi tiết trong 24h.",
  alternates: {
    canonical: `${SITE_URL}/lien-he`,
    languages: {
      vi: `${SITE_URL}/lien-he`,
      en: `${SITE_URL}/en/contact`,
      "x-default": `${SITE_URL}/lien-he`,
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Cửa Eurowindow Hồ Chí Minh",
    title: "Liên Hệ Eurowindow – Hotline 0966 994 338 & Báo Giá Toàn Quốc",
    description:
      "Tư vấn giải pháp cửa nhôm kính, cửa uPVC, cửa gỗ và vách kính tiêu chuẩn Châu Âu. Khảo sát hiện trường và báo giá chi tiết trong 24h.",
    url: `${SITE_URL}/lien-he`,
    images: [
      {
        url: `${SITE_URL}/eurowindow/cuanhom.jpg.webp`,
        width: 1200,
        height: 630,
        alt: "Liên hệ Eurowindow",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Liên Hệ Eurowindow – Hotline 0966 994 338 & Báo Giá Toàn Quốc",
    description:
      "Tư vấn giải pháp cửa nhôm kính, cửa uPVC, cửa gỗ và vách kính tiêu chuẩn Châu Âu.",
    images: [`${SITE_URL}/eurowindow/cuanhom.jpg.webp`],
  },
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${SITE_URL}/lien-he#webpage`,
  url: `${SITE_URL}/lien-he`,
  name: "Liên Hệ Eurowindow",
  description:
    "Trang liên hệ chính thức của Eurowindow tại TP. Hồ Chí Minh. Khảo sát công trình và tư vấn báo giá miễn phí trong 24h.",
  mainEntity: {
    "@type": "HomeAndConstructionBusiness",
    name: "Eurowindow Miền Nam",
    telephone: "+84966994338",
    email: "thangtq2@eurowindow.biz",
    address: {
      "@type": "PostalAddress",
      streetAddress: "39 Bis Mạc Đĩnh Chi, Phường Tân Định",
      addressLocality: "Thành phố Hồ Chí Minh",
      addressRegion: "Hồ Chí Minh",
      addressCountry: "VN",
    },
  },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#071523] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <Header />
      <main>
        <ContactClient />
      </main>
      <Footer />
    </div>
  );
}
