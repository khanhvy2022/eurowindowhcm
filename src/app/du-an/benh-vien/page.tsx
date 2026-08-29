import ProjectCategoryView from "@/components/ProjectCategoryView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dự Án Bệnh Viện – Eurowindow HCM",
  description: "Các dự án cửa nhôm kính, vách kính Eurowindow cho bệnh viện lớn tại Việt Nam. Giải pháp cửa kính an toàn, cách âm cho công trình y tế.",
  alternates: {
    canonical: "/du-an/benh-vien",
    languages: { vi: "/du-an/benh-vien", en: "/en/projects/benh-vien" },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Cửa Eurowindow Hồ Chí Minh",
    title: "Dự Án Bệnh Viện – Eurowindow HCM",
    description: "Các dự án cửa nhôm kính, vách kính Eurowindow cho bệnh viện lớn tại Việt Nam.",
    images: [{ url: "/eurowindow/constructions/viber-image-2025-02-05-13-33-24-065.png.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dự Án Bệnh Viện – Eurowindow HCM",
    description: "Các dự án cửa nhôm kính Eurowindow cho bệnh viện tại Việt Nam.",
  },
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
