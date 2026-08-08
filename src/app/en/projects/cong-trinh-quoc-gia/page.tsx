import ProjectCategoryViewEn from "@/components/ProjectCategoryViewEn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "National Landmark Projects | Eurowindow",
  description: "Explore Eurowindow's landmark national projects including airports, National Assembly, government offices, and major infrastructure.",
};

export default function NationalLandmarksPage() {
  return (
    <ProjectCategoryViewEn
      categorySlug="cong-trinh-quoc-gia"
      categoryName="National landmarks"
      bannerTitle="NATIONAL LANDMARK PROJECTS"
      bannerBg="/eurowindow/constructions/viber-image-2025-02-05-13-33-24-065.png.webp"
      description="Eurowindow is proud to deliver architectural glass and door solutions for national landmarks, international airports, parliamentary halls, and key infrastructure across Vietnam."
    />
  );
}
