import ProjectCategoryView from "@/components/ProjectCategoryView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dự Án Công Trình Quốc Gia – Eurowindow HCM",
  description: "Các dự án giao thông, cảng hàng không, Nhà Quốc hội, Tòa nhà Chính phủ và công trình trọng điểm cấp quốc gia do Eurowindow thi công.",
  alternates: {
    canonical: "/du-an/cong-trinh-quoc-gia",
    languages: { vi: "/du-an/cong-trinh-quoc-gia", en: "/en/projects/cong-trinh-quoc-gia" },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Cửa Eurowindow Hồ Chí Minh",
    title: "Dự Án Công Trình Quốc Gia – Eurowindow HCM",
    description: "Các dự án giao thông, cảng hàng không, Nhà Quốc hội, Tòa nhà Chính phủ do Eurowindow thi công.",
    images: [{ url: "/eurowindow/constructions/viber-image-2025-02-05-13-33-24-065.png.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dự Án Công Trình Quốc Gia – Eurowindow HCM",
    description: "Các dự án giao thông, cảng hàng không, Nhà Quốc hội do Eurowindow thi công.",
  },
};

export default function CongTrinhQuocGiaPage() {
  return (
    <ProjectCategoryView
      categorySlug="cong-trinh-quoc-gia"
      categoryName="Công trình quốc gia"
      bannerTitle="CÔNG TRÌNH CẤP QUỐC GIA"
      bannerBg="/eurowindow/constructions/viber-image-2025-02-05-13-33-24-065.png.webp"
      description="Eurowindow tự hào đồng hành cùng các công trình giao thông trọng điểm, Nhà Quốc hội, văn phòng Chính phủ, các bộ ngành và cảng hàng không quốc tế trên toàn quốc."
    />
  );
}
