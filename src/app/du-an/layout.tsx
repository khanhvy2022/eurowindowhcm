import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dự Án Tiêu Biểu Eurowindow – Công Trình Quốc Gia, Biệt Thự & Tòa Nhà Hiện Đại",
  description: "Khám phá các dự án quy mô quốc tế và công trình dân dụng tiêu biểu sử dụng cửa và vách kính Eurowindow trên toàn quốc.",
  alternates: {
    canonical: "https://eurowindowhcm.com/du-an",
  },
  openGraph: {
    title: "Dự Án Tiêu Biểu Eurowindow – Công Trình Quốc Gia, Biệt Thự & Tòa Nhà Hiện Đại",
    description: "Khám phá các dự án quy mô quốc tế và công trình dân dụng tiêu biểu sử dụng cửa và vách kính Eurowindow trên toàn quốc.",
    url: "https://eurowindowhcm.com/du-an",
    images: [{ url: "/eurowindow/img-0344.jpeg.webp", width: 1200, height: 630, alt: "Dự án Eurowindow" }],
  },
};

export default function DuAnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
