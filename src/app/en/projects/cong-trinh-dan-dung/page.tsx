import ProjectCategoryViewEn from "@/components/ProjectCategoryViewEn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Residential Projects – Eurowindow HCM",
  description: "Premium architectural door and glass systems for luxury villas, urban townships, penthouses, and modern residences.",
  alternates: {
    canonical: "/en/projects/cong-trinh-dan-dung",
    languages: { vi: "/du-an/cong-trinh-dan-dung", en: "/en/projects/cong-trinh-dan-dung" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Eurowindow HCM",
    title: "Residential Projects – Eurowindow HCM",
    description: "Premium architectural door and glass systems for luxury villas, urban townships, penthouses.",
    images: [{ url: "/eurowindow/constructions/dji-0155-large.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Residential Projects – Eurowindow HCM",
    description: "Architectural door and glass systems for luxury villas and residences.",
  },
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
