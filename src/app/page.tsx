import Ecosystem from "@/components/Ecosystem";
import FeaturedProjects from "@/components/FeaturedProjects";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NewsSection from "@/components/NewsSection";
import ProjectCategories from "@/components/ProjectCategories";
import Services from "@/components/Services";
import StrategicPartners from "@/components/StrategicPartners";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cửa Eurowindow Hồ Chí Minh",
  description: "Cung cấp giải pháp tổng thể về cửa nhôm kính, cửa uPVC, cửa gỗ, kính an toàn và vách nhôm kính cao cấp Eurowindow tại TP. Hồ Chí Minh.",
  alternates: {
    canonical: "https://www.eurowindowhcm.com",
    languages: {
      vi: "https://www.eurowindowhcm.com",
      en: "https://www.eurowindowhcm.com/en",
      "x-default": "https://www.eurowindowhcm.com",
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Cửa Eurowindow Hồ Chí Minh",
    title: "Cửa Eurowindow Hồ Chí Minh",
    description: "Cung cấp giải pháp tổng thể về cửa nhôm kính, cửa uPVC, cửa gỗ, kính an toàn và vách nhôm kính cao cấp Eurowindow tại TP. Hồ Chí Minh.",
    url: "https://www.eurowindowhcm.com",
    images: [{ url: "https://www.eurowindowhcm.com/eurowindow/cuanhom.jpg.webp", width: 1200, height: 630, alt: "Cửa Eurowindow Hồ Chí Minh" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cửa Eurowindow Hồ Chí Minh",
    description: "Cung cấp giải pháp tổng thể về cửa nhôm kính, cửa uPVC, cửa gỗ, kính an toàn và vách nhôm kính cao cấp Eurowindow tại TP. Hồ Chí Minh.",
    images: ["https://www.eurowindowhcm.com/eurowindow/cuanhom.jpg.webp"],
  },
};

export default function Home() {
  return <div className="min-h-screen bg-[#071523] text-white"><Header /><main><Hero /><Ecosystem /><FeaturedProjects /><Services /><ProjectCategories /><NewsSection /><StrategicPartners /></main><Footer /></div>;
}
