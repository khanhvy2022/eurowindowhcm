import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tư Vấn Thiết Kế Kiến Trúc Cửa & Mặt Dựng Kính Eurowindow",
  description: "Giải pháp thiết kế kiến trúc cửa nhôm kính, vách kính mặt dựng tối ưu ánh sáng, cách âm, cách nhiệt cho công trình và biệt thự cao cấp.",
  alternates: {
    canonical: "https://eurowindowhcm.com/thiet-ke-kien-truc",
  },
  openGraph: {
    title: "Tư Vấn Thiết Kế Kiến Trúc Cửa & Mặt Dựng Kính Eurowindow",
    description: "Giải pháp thiết kế kiến trúc cửa nhôm kính, vách kính mặt dựng tối ưu ánh sáng, cách âm, cách nhiệt cho công trình và biệt thự cao cấp.",
    url: "https://eurowindowhcm.com/thiet-ke-kien-truc",
  },
};

export default function ThietKeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
