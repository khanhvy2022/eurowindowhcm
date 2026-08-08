import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sản phẩm Eurowindow – Cửa Nhôm, uPVC, Gỗ, Cuốn, Tự Động & Kính",
  description:
    "Danh mục sản phẩm Eurowindow: cửa nhôm kính EA55–EA95i, cửa uPVC tiêu chuẩn châu Âu, cửa gỗ & chống cháy, cửa cuốn, cửa tự động và các giải pháp kính an toàn cao cấp.",
  alternates: {
    canonical: "https://eurowindowhcm.vn/san-pham",
  },
  openGraph: {
    title: "Sản phẩm Eurowindow – Cửa Nhôm, uPVC, Gỗ, Cuốn, Tự Động & Kính",
    description:
      "Khám phá toàn bộ dòng sản phẩm cao cấp của Eurowindow: cửa nhôm kính, uPVC, cửa gỗ, cửa cuốn và kính an toàn tiêu chuẩn quốc tế.",
    url: "https://eurowindowhcm.vn/san-pham",
    images: [{ url: "/eurowindow/cuanhom.jpg.webp", width: 1200, height: 630, alt: "Sản phẩm Eurowindow" }],
  },
};

export default function SanPhamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
