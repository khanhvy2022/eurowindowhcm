import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import ChatWidget from "@/components/ChatWidget";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: {
    default: "Eurowindow HCM | Giải pháp cửa & vật liệu xây dựng cao cấp",
    template: "%s | Eurowindow HCM",
  },
  description:
    "Eurowindow – giải pháp tổng thể về cửa nhôm kính, cửa uPVC, cửa gỗ, kính an toàn và vật liệu xây dựng cao cấp chuẩn quốc tế. Hơn 23 năm kinh nghiệm, Top 1 thương hiệu cửa Việt Nam.",
  icons: { icon: "/favicon.ico" },
  metadataBase: new URL("https://eurowindowhcm.vn"),
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Eurowindow HCM",
    title: "Eurowindow HCM | Giải pháp cửa & vật liệu xây dựng cao cấp",
    description:
      "Cung cấp giải pháp tổng thể về cửa nhôm kính, cửa uPVC, cửa gỗ, kính an toàn cho biệt thự, căn hộ và công trình hiện đại.",
    images: [{ url: "/eurowindow/cuanhom.jpg.webp", width: 1200, height: 630, alt: "Eurowindow - Kiến tạo không gian sống đẳng cấp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eurowindow HCM | Giải pháp cửa & vật liệu xây dựng cao cấp",
    description:
      "Cung cấp giải pháp tổng thể về cửa nhôm kính, cửa uPVC, cửa gỗ và kính an toàn chuẩn quốc tế.",
    images: ["/eurowindow/cuanhom.jpg.webp"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi" data-scroll-behavior="smooth" className={`${spaceGrotesk.variable} h-full antialiased scroll-smooth`}><body className={`${spaceGrotesk.className} min-h-full`}><ScrollProgressBar />{children}<ChatWidget /></body></html>;
}
