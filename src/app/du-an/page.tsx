import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Dự Án Tiêu Biểu – Biệt Thự & Tòa Nhà Hiện Đại",
  description: "Khám phá các dự án quy mô quốc tế và công trình dân dụng tiêu biểu sử dụng cửa và vách kính Eurowindow trên toàn quốc.",
  alternates: {
    canonical: "https://www.eurowindowhcm.com/du-an",
    languages: {
      vi: "https://www.eurowindowhcm.com/du-an",
      en: "https://www.eurowindowhcm.com/en/projects",
      "x-default": "https://www.eurowindowhcm.com/du-an",
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Cửa Eurowindow Hồ Chí Minh",
    title: "Dự Án Tiêu Biểu Eurowindow – Công Trình Quốc Gia, Biệt Thự & Tòa Nhà Hiện Đại",
    description: "Khám phá các dự án quy mô quốc tế và công trình dân dụng tiêu biểu sử dụng cửa và vách kính Eurowindow trên toàn quốc.",
    url: "https://www.eurowindowhcm.com/du-an",
    images: [{ url: "https://www.eurowindowhcm.com/eurowindow/img-0344.jpeg.webp", width: 1200, height: 630, alt: "Dự án Eurowindow" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dự Án Tiêu Biểu Eurowindow – Công Trình Quốc Gia, Biệt Thự & Tòa Nhà Hiện Đại",
    description: "Khám phá các dự án quy mô quốc tế và công trình dân dụng tiêu biểu sử dụng cửa và vách kính Eurowindow.",
    images: ["https://www.eurowindowhcm.com/eurowindow/img-0344.jpeg.webp"],
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
