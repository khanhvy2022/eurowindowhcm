import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutClient from "./AboutClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.eurowindowhcm.com";

export const metadata: Metadata = {
  title: "About Eurowindow – 23+ Years Pioneering European Standard Doors & Glass",
  description:
    "Explore Eurowindow's history, production capacity, and over two decades of leading Vietnam's architectural doors, uPVC, aluminium and safety glass industry.",
  alternates: {
    canonical: `${SITE_URL}/en/about`,
    languages: {
      vi: `${SITE_URL}/gioi-thieu`,
      en: `${SITE_URL}/en/about`,
      "x-default": `${SITE_URL}/gioi-thieu`,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Eurowindow Ho Chi Minh City",
    title: "About Eurowindow – 23+ Years Pioneering European Standard Doors & Glass",
    description:
      "Explore Eurowindow's history, production capacity, and over two decades of leading Vietnam's architectural doors and facade industry.",
    url: `${SITE_URL}/en/about`,
    images: [
      {
        url: `${SITE_URL}/eurowindow/cuanhom.jpg.webp`,
        width: 1200,
        height: 630,
        alt: "About Eurowindow",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Eurowindow – 23+ Years Pioneering Doors & Glass in Vietnam",
    description:
      "Explore Eurowindow's history, production capacity, and prestigious national landmarks.",
    images: [`${SITE_URL}/eurowindow/cuanhom.jpg.webp`],
  },
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}/en/about#webpage`,
  url: `${SITE_URL}/en/about`,
  name: "About Eurowindow",
  description:
    "Company overview, vision, mission, and achievements of Eurowindow.",
  mainEntity: {
    "@type": "Organization",
    name: "Eurowindow",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    foundingDate: "2002",
  },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#0b1628] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <Header lang="en" />
      <main>
        <AboutClient />
      </main>
      <Footer lang="en" />
    </div>
  );
}
