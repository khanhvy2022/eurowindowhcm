import ProjectCategoryView from "@/components/ProjectCategoryView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dự Án Công Trình Cấp Quốc Gia | Eurowindow",
  description: "Các dự án giao thông, cảng hàng không, Nhà Quốc hội, Tòa nhà Chính phủ và công trình trọng điểm cấp quốc gia do Eurowindow thi công.",
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
