import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tư Vấn Thiết Kế Kiến Trúc Cửa & Mặt Dựng Kính Eurowindow",
  description: "Giải pháp thiết kế kiến trúc cửa nhôm kính, vách kính mặt dựng tối ưu ánh sáng, cách âm, cách nhiệt cho công trình và biệt thự cao cấp.",
  alternates: {
    canonical: "https://eurowindowhcm.com/thiet-ke-kien-truc",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Cửa Eurowindow Hồ Chí Minh",
    title: "Tư Vấn Thiết Kế Kiến Trúc Cửa & Mặt Dựng Kính Eurowindow",
    description: "Giải pháp thiết kế kiến trúc cửa nhôm kính, vách kính mặt dựng tối ưu ánh sáng, cách âm, cách nhiệt cho công trình và biệt thự cao cấp.",
    url: "https://eurowindowhcm.com/thiet-ke-kien-truc",
    images: [{ url: "https://eurowindowhcm.com/eurowindow/cuanhom.jpg.webp", width: 1200, height: 630, alt: "Thiết kế kiến trúc Eurowindow" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tư Vấn Thiết Kế Kiến Trúc Cửa & Mặt Dựng Kính Eurowindow",
    description: "Giải pháp thiết kế kiến trúc cửa nhôm kính, vách kính mặt dựng tối ưu.",
    images: ["https://eurowindowhcm.com/eurowindow/cuanhom.jpg.webp"],
  },
};

export default function ThietKeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
