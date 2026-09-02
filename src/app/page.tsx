import Ecosystem from "@/components/Ecosystem";
import FeaturedProjects from "@/components/FeaturedProjects";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HeroStats from "@/components/home/HeroStats";
import FinalCTA from "@/components/home/FinalCTA";
import NewsSection from "@/components/NewsSection";
import ProjectCategories from "@/components/ProjectCategories";
import Services from "@/components/Services";
import StrategicPartners from "@/components/StrategicPartners";
import { getLatestProjects } from "@/lib/projects";
import { getLatestNews } from "@/lib/posts";

import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: {
    absolute: "Cửa Eurowindow Hồ Chí Minh – Cửa Nhôm Kính & uPVC Cao Cấp",
  },
  description:
    "Cung cấp giải pháp tổng thể về cửa nhôm kính, cửa uPVC, cửa gỗ, kính an toàn và vách nhôm kính cao cấp Eurowindow tại TP. Hồ Chí Minh.",
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
    description:
      "Cung cấp giải pháp tổng thể về cửa nhôm kính, cửa uPVC, cửa gỗ, kính an toàn và vách nhôm kính cao cấp Eurowindow tại TP. Hồ Chí Minh.",
    url: "https://www.eurowindowhcm.com",
    images: [
      {
        url: "https://www.eurowindowhcm.com/eurowindow/cuanhom.jpg.webp",
        width: 1200,
        height: 630,
        alt: "Cửa Eurowindow Hồ Chí Minh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cửa Eurowindow Hồ Chí Minh",
    description:
      "Cung cấp giải pháp tổng thể về cửa nhôm kính, cửa uPVC, cửa gỗ, kính an toàn và vách nhôm kính cao cấp Eurowindow tại TP. Hồ Chí Minh.",
    images: ["https://www.eurowindowhcm.com/eurowindow/cuanhom.jpg.webp"],
  },
};

export default async function Home() {
  // Dynamic Content Fetching: strictly sorted by publishedAt DESC
  const [latestProjects, latestNews] = await Promise.all([
    getLatestProjects({ limit: 6 }),
    getLatestNews({ limit: 4 }),
  ]);

  return (
    <div className="min-h-screen bg-[#06101f] text-white">
      <Header />
      <main id="main-content">
        <Hero />
        <HeroStats />
        <Ecosystem />
        <Services />
        <FeaturedProjects initialProjects={latestProjects} />
        <ProjectCategories />
        <StrategicPartners />
        <NewsSection initialArticles={latestNews} />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
