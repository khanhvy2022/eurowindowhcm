import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services & Warranty – Eurowindow Ho Chi Minh City",
  description:
    "End-to-end solutions: architectural consulting, engineering design, European-standard precision fabrication, professional installation, and lifetime genuine warranty.",
  alternates: {
    canonical: "https://eurowindowhcm.com/en/services",
    languages: {
      vi: "https://eurowindowhcm.com/dich-vu",
      en: "https://eurowindowhcm.com/en/services",
    },
  },
  openGraph: {
    title: "Services & Warranty – Eurowindow Ho Chi Minh City",
    description:
      "End-to-end solutions: architectural consulting, engineering design, European-standard precision fabrication, professional installation, and lifetime genuine warranty.",
    url: "https://eurowindowhcm.com/en/services",
    images: [
      {
        url: "/eurowindow/cuanhom.jpg.webp",
        width: 1200,
        height: 630,
        alt: "Eurowindow Services & Warranty",
      },
    ],
  },
};

export default function EnServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
