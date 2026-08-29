import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liên Hệ Cửa Eurowindow Hồ Chí Minh – Báo Giá & Tư Vấn Kỹ Thuật",
  description:
    "Liên hệ Eurowindow tại TP. Hồ Chí Minh. Nhận tư vấn giải pháp cửa nhôm kính, cửa uPVC, cửa gỗ, báo giá nhanh, hỗ trợ khảo sát công trình miễn phí 24/7.",
  alternates: {
    canonical: "https://eurowindowhcm.com/lien-he",
    languages: {
      vi: "https://eurowindowhcm.com/lien-he",
      en: "https://eurowindowhcm.com/en/contact",
    },
  },
  openGraph: {
    title: "Liên Hệ Cửa Eurowindow Hồ Chí Minh – Báo Giá & Tư Vấn Kỹ Thuật",
    description:
      "Liên hệ Eurowindow tại TP. Hồ Chí Minh. Nhận tư vấn giải pháp cửa nhôm kính, cửa uPVC, cửa gỗ, báo giá nhanh, hỗ trợ khảo sát công trình miễn phí 24/7.",
    url: "https://eurowindowhcm.com/lien-he",
    images: [
      {
        url: "/eurowindow/cuanhom.jpg.webp",
        width: 1200,
        height: 630,
        alt: "Liên hệ Cửa Eurowindow Hồ Chí Minh",
      },
    ],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
