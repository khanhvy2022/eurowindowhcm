import ProjectCategoryView from "@/components/ProjectCategoryView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dự Án Trụ Sở Cơ Quan – Eurowindow HCM",
  description: "Hệ giải pháp cửa, vách kính mặt dựng cho các tòa nhà trụ sở cơ quan nhà nước, tập đoàn và văn phòng chính phủ.",
  alternates: {
    canonical: "/du-an/tru-so-co-quan",
    languages: { vi: "/du-an/tru-so-co-quan", en: "/en/projects/tru-so-co-quan" },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Cửa Eurowindow Hồ Chí Minh",
    title: "Dự Án Trụ Sở Cơ Quan – Eurowindow HCM",
    description: "Hệ giải pháp cửa, vách kính mặt dựng cho các tòa nhà trụ sở cơ quan nhà nước, tập đoàn.",
    images: [{ url: "/eurowindow/constructions/img-7172.jpg.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dự Án Trụ Sở Cơ Quan – Eurowindow HCM",
    description: "Hệ giải pháp cửa, vách kính cho các tòa nhà trụ sở, cơ quan, tập đoàn.",
  },
};

export default function TruSoCoQuanPage() {
  return (
    <ProjectCategoryView
      categorySlug="tru-so-co-quan"
      categoryName="Trụ sở cơ quan"
      bannerTitle="TRỤ SỞ CƠ QUAN &amp; VĂN PHÒNG"
      bannerBg="/eurowindow/constructions/img-7172.jpg.webp"
      description="Thi công lắp đặt hệ thống mặt dựng nhôm kính lớn, cửa cách âm cao cấp cho các trụ sở bộ ngành, Viện kiểm sát, trung tâm truyền hình và tòa nhà văn phòng cao tầng."
    />
  );
}
