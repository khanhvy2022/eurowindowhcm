import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Featured Projects – Architectural Landmarks by Eurowindow",
  description:
    "Explore iconic architectural landmarks, international airports, hospitals, government headquarters, and luxury residences crafted by Eurowindow across Vietnam.",
  openGraph: {
    title: "Featured Projects – Architectural Landmarks by Eurowindow",
    description:
      "Explore iconic architectural landmarks, international airports, hospitals, government headquarters, and luxury residences crafted by Eurowindow across Vietnam.",
    url: "https://www.eurowindowhcm.com/en/projects",
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

export default function EnProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
