import ProjectCategoryView from "@/components/ProjectCategoryView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dự Án Công Trình Dân Dụng – Eurowindow HCM",
  description: "Hệ thống cửa và vách kính cao cấp cho các khu đô thị, biệt thự cao cấp, penthouse và nhà phố hiện đại.",
  alternates: {
    canonical: "/du-an/cong-trinh-dan-dung",
    languages: { vi: "/du-an/cong-trinh-dan-dung", en: "/en/projects/cong-trinh-dan-dung" },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Cửa Eurowindow Hồ Chí Minh",
    title: "Dự Án Công Trình Dân Dụng – Eurowindow HCM",
    description: "Hệ thống cửa và vách kính cao cấp cho các khu đô thị, biệt thự, nhà phố hiện đại.",
    images: [{ url: "/eurowindow/constructions/dji-0155-large.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dự Án Công Trình Dân Dụng – Eurowindow HCM",
    description: "Hệ thống cửa và vách kính cao cấp cho biệt thự, nhà phố hiện đại.",
  },
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
