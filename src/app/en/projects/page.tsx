import type { Metadata } from "next";
import ProjectsClientEn from "./ProjectsClientEn";

export const metadata: Metadata = {
  title: "Featured Projects – Architectural Landmarks by Eurowindow",
  description:
    "Explore iconic architectural landmarks, international airports, hospitals, government headquarters, and luxury residences crafted by Eurowindow across Vietnam.",
  alternates: {
    canonical: "https://eurowindowhcm.com/en/projects",
    languages: {
      vi: "https://eurowindowhcm.com/du-an",
      en: "https://eurowindowhcm.com/en/projects",
    },
  },
  openGraph: {
    title: "Featured Projects – Architectural Landmarks by Eurowindow",
    description:
      "Explore iconic architectural landmarks, international airports, hospitals, government headquarters, and luxury residences crafted by Eurowindow across Vietnam.",
    url: "https://eurowindowhcm.com/en/projects",
    images: [
      {
        url: "/eurowindow/cuanhom.jpg.webp",
        width: 1200,
        height: 630,
        alt: "Eurowindow Architectural Projects",
      },
    ],
  },
};

export default function ProjectsPage() {
  return <ProjectsClientEn />;
}
