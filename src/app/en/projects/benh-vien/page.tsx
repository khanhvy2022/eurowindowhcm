import ProjectCategoryViewEn from "@/components/ProjectCategoryViewEn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hospital & Healthcare Projects | Eurowindow",
  description: "Acoustic, thermal, hygienic door and glass partition systems for leading international hospitals and healthcare facilities.",
};

export default function HospitalsPage() {
  return (
    <ProjectCategoryViewEn
      categorySlug="benh-vien"
      categoryName="Hospitals"
      bannerTitle="HOSPITAL &amp; HEALTHCARE PROJECTS"
      bannerBg="/eurowindow/constructions/img-7105.jpg.webp"
      description="Specialised door and glass solutions engineered for healthcare environments — offering acoustic isolation, natural daylighting, hygiene protection, and compliance with hospital standards."
    />
  );
}
