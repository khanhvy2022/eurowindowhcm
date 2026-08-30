import SetHtmlLang from "@/components/SetHtmlLang";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Eurowindow Ho Chi Minh – Doors & Facade Solutions",
    template: "%s | Eurowindow HCM",
  },
  description: "Total solutions for aluminum glass doors, uPVC doors, wooden doors, security glass, and facade systems meeting European standards in Vietnam.",
  openGraph: {
    title: "Eurowindow Ho Chi Minh – Doors & Facade Solutions",
    description: "Total solutions for aluminum glass doors, uPVC doors, wooden doors, security glass, and facade systems meeting European standards in Vietnam.",
    url: "https://www.eurowindowhcm.com/en",
    locale: "en_US",
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SetHtmlLang />
      {children}
    </>
  );
}

