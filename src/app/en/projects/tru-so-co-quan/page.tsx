import ProjectCategoryViewEn from "@/components/ProjectCategoryViewEn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Government & Office Building Projects | Eurowindow",
  description: "Curtain wall and architectural door systems for government headquarters, corporate towers, and public institutions.",
};

export default function GovernmentBuildingsPage() {
  return (
    <ProjectCategoryViewEn
      categorySlug="tru-so-co-quan"
      categoryName="Government buildings"
      bannerTitle="GOVERNMENT &amp; OFFICE BUILDINGS"
      bannerBg="/eurowindow/constructions/img-7172.jpg.webp"
      description="Advanced unitised aluminium curtain walls and high-security acoustic door systems engineered for government headquarters, corporate centers, and broadcast towers."
    />
  );
}
