import ProjectCategoryViewEn from "@/components/ProjectCategoryViewEn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Civil & Residential Projects | Eurowindow",
  description: "Premium architectural door and glass systems for luxury villas, urban townships, penthouses, and modern residences.",
};

export default function CivilProjectsPage() {
  return (
    <ProjectCategoryViewEn
      categorySlug="cong-trinh-dan-dung"
      categoryName="Civil construction"
      bannerTitle="CIVIL &amp; RESIDENTIAL PROJECTS"
      bannerBg="/eurowindow/constructions/dji-0155-large.jpg"
      description="Delivering luxurious, comfortable living spaces with Cmech aluminium doors, European uPVC windows, sliding systems, and panoramic glass walls for luxury villas and residential townships."
    />
  );
}
