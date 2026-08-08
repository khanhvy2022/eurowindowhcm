import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Eurowindow | Premium Door & Building Material Solutions",
    template: "%s | Eurowindow",
  },
  description:
    "Eurowindow – complete solutions for aluminium & glass doors, uPVC doors, wooden doors, safety glass and premium building materials meeting international standards. 23+ years of expertise, Vietnam's No.1 door brand.",
  metadataBase: new URL("https://eurowindowhcm.vn"),
  alternates: {
    canonical: "https://eurowindowhcm.vn/en",
    languages: {
      "vi": "https://eurowindowhcm.vn",
      "en": "https://eurowindowhcm.vn/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "vi_VN",
    siteName: "Eurowindow HCM",
    title: "Eurowindow | Premium Door & Building Material Solutions",
    description:
      "Complete solutions for aluminium-glass doors, uPVC, wooden doors, and safety glass for villas, apartments, and modern constructions.",
    images: [
      {
        url: "/eurowindow/cuanhom.jpg.webp",
        width: 1200,
        height: 630,
        alt: "Eurowindow – Premium Door & Construction Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eurowindow | Premium Door & Building Material Solutions",
    description:
      "Complete solutions for aluminium-glass doors, uPVC, wooden doors and safety glass meeting international standards.",
    images: ["/eurowindow/cuanhom.jpg.webp"],
  },
  robots: { index: true, follow: true },
};

export default function EnLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
