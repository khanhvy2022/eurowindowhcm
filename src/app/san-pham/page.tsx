import type { Metadata } from "next";
import SanPhamClient from "./SanPhamClient";

export const metadata: Metadata = {
  title: "Sản Phẩm Cửa Eurowindow Chính Hãng – Cửa Nhôm, uPVC, Cửa Gỗ, Kính Cao Cấp",
  description: "Tổng hợp các dòng sản phẩm cửa cao cấp Eurowindow: Cửa nhôm cầu cách nhiệt, cửa nhựa uPVC, cửa gỗ, kính an toàn, cửa cuốn, cửa tự động đạt tiêu chuẩn châu Âu.",
  alternates: {
    canonical: "https://eurowindowhcm.com/san-pham",
    languages: {
      vi: "https://eurowindowhcm.com/san-pham",
      en: "https://eurowindowhcm.com/en/products",
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Cửa Eurowindow Hồ Chí Minh",
    title: "Sản Phẩm Cửa Eurowindow Chính Hãng – Cửa Nhôm, uPVC, Cửa Gỗ, Kính Cao Cấp",
    description: "Tổng hợp các dòng sản phẩm cửa cao cấp Eurowindow: Cửa nhôm cầu cách nhiệt, cửa nhựa uPVC, cửa gỗ, kính an toàn, cửa cuốn, cửa tự động đạt tiêu chuẩn châu Âu.",
    url: "https://eurowindowhcm.com/san-pham",
    images: [{ url: "https://eurowindowhcm.com/eurowindow/cuanhom.jpg.webp", width: 1200, height: 630, alt: "Sản phẩm Eurowindow" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sản Phẩm Cửa Eurowindow Chính Hãng – Cửa Nhôm, uPVC, Cửa Gỗ, Kính Cao Cấp",
    description: "Tổng hợp các dòng sản phẩm cửa cao cấp Eurowindow: Cửa nhôm cầu cách nhiệt, cửa nhựa uPVC, cửa gỗ, kính an toàn.",
    images: ["https://eurowindowhcm.com/eurowindow/cuanhom.jpg.webp"],
  },
};

export default function SanPhamPage() {
  return <SanPhamClient />;
}
