import Ecosystem from "@/components/Ecosystem";
import FeaturedProjects from "@/components/FeaturedProjects";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NewsSection from "@/components/NewsSection";
import ProjectCategories from "@/components/ProjectCategories";
import Services from "@/components/Services";
import StrategicPartners from "@/components/StrategicPartners";

export default function Home() {
  return <div className="min-h-screen bg-[#071523] text-white"><Header /><main><Hero /><Ecosystem /><FeaturedProjects /><Services /><ProjectCategories /><NewsSection /><StrategicPartners /></main><Footer /></div>;
}
