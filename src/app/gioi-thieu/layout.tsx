import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giới thiệu Eurowindow – 23 năm dẫn đầu ngành cửa & vật liệu xây dựng Việt Nam",
  description:
    "Tìm hiểu về Eurowindow – thương hiệu cửa hàng đầu Việt Nam với 23 năm kinh nghiệm, 14 lần liên tiếp đạt Thương hiệu Quốc gia, hơn 100.000 công trình phủ sóng trên toàn quốc.",
  alternates: {
    canonical: "https://eurowindowhcm.vn/gioi-thieu",
  },
  openGraph: {
    title: "Giới thiệu Eurowindow – 23 năm dẫn đầu ngành cửa Việt Nam",
    description:
      "Eurowindow – thương hiệu cửa hàng đầu Việt Nam với 23+ năm kinh nghiệm, 14 lần Thương hiệu Quốc gia, phủ sóng hơn 100.000 công trình.",
    url: "https://eurowindowhcm.vn/gioi-thieu",
    images: [{ url: "/eurowindow/upvc4.png.webp", width: 1200, height: 630, alt: "Eurowindow – Giới thiệu thương hiệu" }],
  },
};

export default function GioiThieuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
