"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroVideo from "@/components/home/HeroVideo";
import Ecosystem from "@/components/Ecosystem";
import FeaturedProjects from "@/components/FeaturedProjects";
import Services from "@/components/Services";
import ProjectCategories from "@/components/ProjectCategories";
import NewsSection from "@/components/NewsSection";
import StrategicPartners from "@/components/StrategicPartners";

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
        />
        <Ecosystem />
        <FeaturedProjects />
        <Services />
        <ProjectCategories />
        <NewsSection />
        <StrategicPartners />
      </main>
      <Footer lang="en" />
    </div>
  );
}
