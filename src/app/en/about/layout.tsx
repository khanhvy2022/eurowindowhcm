import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Eurowindow – Leading Door & Facade Solutions Provider in Vietnam",
  description:
    "Over 23 years pioneering European-standard door, glass, and facade systems in Vietnam. Discover Eurowindow's manufacturing power, European technology, and national brand heritage.",
  alternates: {
    canonical: "https://www.eurowindowhcm.com/en/about",
    languages: {
      vi: "https://www.eurowindowhcm.com/gioi-thieu",
      en: "https://www.eurowindowhcm.com/en/about",
    },
  },
  openGraph: {
    title: "About Eurowindow – Leading Door & Facade Solutions Provider in Vietnam",
    description:
      "Over 23 years pioneering European-standard door, glass, and facade systems in Vietnam. Discover Eurowindow's manufacturing power, European technology, and national brand heritage.",
    url: "https://www.eurowindowhcm.com/en/about",
    images: [
      {
        url: "/eurowindow/gioi-thieu.jpg.webp",
        width: 1200,
        height: 630,
        alt: "About Eurowindow Vietnam",
      },
    ],
  },
};

export default function EnAboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
