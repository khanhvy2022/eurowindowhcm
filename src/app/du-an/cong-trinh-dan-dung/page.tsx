import ProjectCategoryView from "@/components/ProjectCategoryView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dự Án Công Trình Dân Dụng & Biệt Thự | Eurowindow",
  description: "Hệ thống cửa và vách kính cao cấp cho các khu đô thị, biệt thự cao cấp, penthouse và nhà phố hiện đại.",
};

export default function CongTrinhDanDungPage() {
  return (
    <ProjectCategoryView
      categorySlug="cong-trinh-dan-dung"
      categoryName="Công trình dân dụng"
      bannerTitle="CÔNG TRÌNH DÂN DỤNG &amp; BIỆT THỰ"
      bannerBg="/eurowindow/constructions/dji-0155-large.jpg"
      description="Mang đến phong cách sống sang trọng, hiện đại với hệ cửa nhôm kính Cmech, uPVC Châu Âu, cửa xếp trượt và vách kính lớn cho biệt thự, penthouse và khu đô thị cao cấp."
    />
  );
}
