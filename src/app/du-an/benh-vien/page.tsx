import ProjectCategoryView from "@/components/ProjectCategoryView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dự Án Bệnh Viện & Cơ Sở Y Tế | Eurowindow",
  description: "Hệ thống cửa và vách nhôm kính cách âm, cách nhiệt, vô trùng tiêu chuẩn cho các bệnh viện quốc tế và cơ sở y tế hàng đầu.",
};

export default function BenhVienPage() {
  return (
    <ProjectCategoryView
      categorySlug="benh-vien"
      categoryName="Bệnh viện"
      bannerTitle="DỰ ÁN BỆNH VIỆN &amp; Y TẾ"
      bannerBg="/eurowindow/constructions/img-7105.jpg.webp"
      description="Giải pháp cửa và vách kính chuyên dụng cho môi trường y tế — tối ưu ánh sáng tự nhiên, cách âm tuyệt đối, sạch khuẩn và đáp ứng tiêu chuẩn nghiêm ngặt của các bệnh viện lớn."
    />
  );
}
