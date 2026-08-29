import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Eurowindow Ho Chi Minh City – Free Consultation & Quotation",
  description:
    "Contact Eurowindow in Ho Chi Minh City for total door and facade solutions. Instant quotation, 24/7 technical advisory, and professional site survey support.",
  alternates: {
    canonical: "https://www.eurowindowhcm.com/en/contact",
    languages: {
      vi: "https://www.eurowindowhcm.com/lien-he",
      en: "https://www.eurowindowhcm.com/en/contact",
    },
  },
  openGraph: {
    title: "Contact Eurowindow Ho Chi Minh City – Free Consultation & Quotation",
    description:
      "Contact Eurowindow in Ho Chi Minh City for total door and facade solutions. Instant quotation, 24/7 technical advisory, and professional site survey support.",
    url: "https://www.eurowindowhcm.com/en/contact",
    images: [
      {
        url: "/eurowindow/cuanhom.jpg.webp",
        width: 1200,
        height: 630,
        alt: "Contact Eurowindow Ho Chi Minh City",
      },
    ],
  },
};

export default function EnContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
