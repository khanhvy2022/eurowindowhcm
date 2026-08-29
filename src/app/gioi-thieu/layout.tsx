import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giới Thiệu Eurowindow Hồ Chí Minh – 23+ Năm Tiên Phong & Kiến Tạo",
  description: "Tìm hiểu lịch sử hình thành, năng lực sản xuất, quy mô nhà máy và tầm nhìn sứ mệnh của Eurowindow – Thương hiệu Quốc gia hàng đầu Việt Nam.",
  alternates: {
    canonical: "https://eurowindowhcm.com/gioi-thieu",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Cửa Eurowindow Hồ Chí Minh",
    title: "Giới Thiệu Eurowindow Hồ Chí Minh – 23+ Năm Tiên Phong & Kiến Tạo",
    description: "Tìm hiểu lịch sử hình thành, năng lực sản xuất, quy mô nhà máy và tầm nhìn sứ mệnh của Eurowindow – Thương hiệu Quốc gia hàng đầu Việt Nam.",
    url: "https://eurowindowhcm.com/gioi-thieu",
    images: [{ url: "https://eurowindowhcm.com/eurowindow/cuanhom.jpg.webp", width: 1200, height: 630, alt: "Giới thiệu Eurowindow" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Giới Thiệu Eurowindow Hồ Chí Minh – 23+ Năm Tiên Phong & Kiến Tạo",
    description: "Tìm hiểu lịch sử hình thành, năng lực sản xuất, quy mô nhà máy và tầm nhìn sứ mệnh của Eurowindow.",
    images: ["https://eurowindowhcm.com/eurowindow/cuanhom.jpg.webp"],
  },
};

export default function GioiThieuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
