import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroVideo from "@/components/home/HeroVideo";
import Ecosystem from "@/components/Ecosystem";
import FeaturedProjects from "@/components/FeaturedProjects";
import Services from "@/components/Services";
import ProjectCategories from "@/components/ProjectCategories";
import NewsSection from "@/components/NewsSection";
import StrategicPartners from "@/components/StrategicPartners";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eurowindow Ho Chi Minh City – Leading Total Door & Facade Solutions",
  description: "Total solutions for aluminum glass doors, uPVC doors, wooden doors, security glass, and facade systems meeting European standards in Vietnam.",
  alternates: {
    canonical: "https://eurowindowhcm.com/en",
    languages: {
      vi: "https://eurowindowhcm.com",
      en: "https://eurowindowhcm.com/en",
      "x-default": "https://eurowindowhcm.com",
    },
  },
  openGraph: {
    title: "Eurowindow Ho Chi Minh City – Leading Total Door & Facade Solutions",
    description: "Total solutions for aluminum glass doors, uPVC doors, wooden doors, security glass, and facade systems meeting European standards in Vietnam.",
    url: "https://eurowindowhcm.com/en",
    locale: "en_US",
  },
};

export default function HomeEn() {
  return (
    <div className="min-h-screen bg-[#071523] text-white">
      <Header lang="en" />
      <main>
        <HeroVideo
          badge="PREMIUM ARCHITECTURAL MATERIAL SOLUTIONS"
          headline="Creating World-Class Living Spaces"
          subheadline="Eurowindow delivers premium door, glass, and building material solutions for villas, luxury apartments, and modern architectural landmarks."
          primaryCtaText="Explore Products"
          primaryCtaHref="/en/products"
          secondaryCtaText="View Featured Projects"
          secondaryCtaHref="/en/projects"
          scrollHref="#gioi-thieu"
          scrollAriaLabel="Scroll down to explore"
        />
        <Ecosystem lang="en" />
        <FeaturedProjects lang="en" />
        <Services lang="en" />
        <ProjectCategories lang="en" />
        <NewsSection lang="en" />
        <StrategicPartners lang="en" />
      </main>
      <Footer lang="en" />
    </div>
  );
}
