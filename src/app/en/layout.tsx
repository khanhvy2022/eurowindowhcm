import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eurowindow Ho Chi Minh City – Leading Total Door & Facade Solutions",
  description: "Total solutions for aluminum glass doors, uPVC doors, wooden doors, security glass, and facade systems meeting European standards in Vietnam.",
  alternates: {
    canonical: "https://eurowindowhcm.com/en",
    languages: {
      "vi": "https://eurowindowhcm.com",
      "en": "https://eurowindowhcm.com/en",
    },
  },
  openGraph: {
    title: "Eurowindow Ho Chi Minh City – Leading Total Door & Facade Solutions",
    description: "Total solutions for aluminum glass doors, uPVC doors, wooden doors, security glass, and facade systems meeting European standards in Vietnam.",
    url: "https://eurowindowhcm.com/en",
    locale: "en_US",
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
