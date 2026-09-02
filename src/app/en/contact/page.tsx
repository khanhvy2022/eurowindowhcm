import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactClient from "./ContactClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.eurowindowhcm.com";

export const metadata: Metadata = {
  title: "Contact Eurowindow – National Hotline 0966 994 338 & Free Estimation",
  description:
    "Contact Eurowindow in Ho Chi Minh City and nationwide. Hotline: 0966 994 338. Inquire about European-standard aluminium, uPVC, wood doors, and architectural glass solutions.",
  alternates: {
    canonical: `${SITE_URL}/en/contact`,
    languages: {
      vi: `${SITE_URL}/lien-he`,
      en: `${SITE_URL}/en/contact`,
      "x-default": `${SITE_URL}/lien-he`,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Eurowindow Ho Chi Minh City",
    title: "Contact Eurowindow – National Hotline 0966 994 338 & Free Estimation",
    description:
      "Consultation on European-standard aluminium doors, uPVC, wooden doors, and facade glass. On-site survey and CAD drawings in 24 hours.",
    url: `${SITE_URL}/en/contact`,
    images: [
      {
        url: `${SITE_URL}/eurowindow/cuanhom.jpg.webp`,
        width: 1200,
        height: 630,
        alt: "Contact Eurowindow",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Eurowindow – National Hotline 0966 994 338",
    description:
      "Consultation on European-standard aluminium doors, uPVC, wooden doors, and facade glass.",
    images: [`${SITE_URL}/eurowindow/cuanhom.jpg.webp`],
  },
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${SITE_URL}/en/contact#webpage`,
  url: `${SITE_URL}/en/contact`,
  name: "Contact Eurowindow",
  description:
    "Official contact channel for Eurowindow in Ho Chi Minh City, Vietnam.",
  mainEntity: {
    "@type": "HomeAndConstructionBusiness",
    name: "Eurowindow Miền Nam",
    telephone: "+84966994338",
    email: "thangtq2@eurowindow.biz",
    address: {
      "@type": "PostalAddress",
      streetAddress: "39 Bis Mạc Đĩnh Chi, Phường Tân Định",
      addressLocality: "Ho Chi Minh City",
      addressRegion: "Ho Chi Minh City",
      addressCountry: "VN",
    },
  },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#071523] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <Header />
      <main>
        <ContactClient />
      </main>
      <Footer />
    </div>
  );
}
