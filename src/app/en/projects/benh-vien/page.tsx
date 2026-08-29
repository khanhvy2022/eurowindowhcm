import ProjectCategoryViewEn from "@/components/ProjectCategoryViewEn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hospital Projects – Eurowindow HCM",
  description: "Acoustic, thermal, hygienic door and glass partition systems for leading international hospitals and healthcare facilities.",
  alternates: {
    canonical: "/en/projects/benh-vien",
    languages: { vi: "/du-an/benh-vien", en: "/en/projects/benh-vien" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Eurowindow HCM",
    title: "Hospital Projects – Eurowindow HCM",
    description: "Acoustic, thermal, hygienic door and glass partition systems for leading international hospitals.",
    images: [{ url: "/eurowindow/constructions/img-7105.jpg.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hospital Projects – Eurowindow HCM",
    description: "Eurowindow door and glass partition systems for hospitals.",
  },
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
