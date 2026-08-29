import ProjectCategoryViewEn from "@/components/ProjectCategoryViewEn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Government Buildings – Eurowindow HCM",
  description: "Curtain wall and architectural door systems for government headquarters, corporate towers, and public institutions.",
  alternates: {
    canonical: "/en/projects/tru-so-co-quan",
    languages: { vi: "/du-an/tru-so-co-quan", en: "/en/projects/tru-so-co-quan" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Eurowindow HCM",
    title: "Government Buildings – Eurowindow HCM",
    description: "Curtain wall and architectural door systems for government headquarters, corporate towers.",
    images: [{ url: "/eurowindow/constructions/img-7172.jpg.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Government Buildings – Eurowindow HCM",
    description: "Curtain wall and door systems for government buildings.",
  },
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
