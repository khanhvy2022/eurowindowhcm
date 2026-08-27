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
    default: "Cửa Eurowindow Hồ Chí Minh",
    template: "%s | Cửa Eurowindow Hồ Chí Minh",
  },
  description:
    "Eurowindow – giải pháp tổng thể về cửa nhôm kính, cửa uPVC, cửa gỗ, kính an toàn và vật liệu xây dựng cao cấp chuẩn quốc tế. Hơn 23 năm kinh nghiệm, Top 1 thương hiệu cửa Việt Nam.",
  keywords: [
    "cửa nhôm kính",
    "cửa uPVC",
    "cửa gỗ",
    "kính an toàn",
    "vách kính",
    "cửa cuốn",
    "cửa tự động",
    "eurowindow",
    "cửa eurowindow hồ chí minh",
    "eurowindow HCM",
    "cửa cao cấp",
    "vật liệu xây dựng",
  ],
  authors: [{ name: "Cửa Eurowindow Hồ Chí Minh", url: "https://eurowindowhcm.vn" }],
  creator: "Cửa Eurowindow Hồ Chí Minh",
  publisher: "Cửa Eurowindow Hồ Chí Minh",
  category: "Xây dựng & Vật liệu",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  metadataBase: new URL("https://eurowindowhcm.vn"),
  alternates: {
    canonical: "https://eurowindowhcm.vn",
    languages: {
      "vi": "https://eurowindowhcm.vn",
      "en": "https://eurowindowhcm.vn/en",
      "x-default": "https://eurowindowhcm.vn",
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    alternateLocale: "en_US",
    siteName: "Cửa Eurowindow Hồ Chí Minh",
    title: "Cửa Eurowindow Hồ Chí Minh",
    description:
      "Cung cấp giải pháp tổng thể về cửa nhôm kính, cửa uPVC, cửa gỗ, kính an toàn cho biệt thự, căn hộ và công trình hiện đại.",
    images: [{ url: "/eurowindow/cuanhom.jpg.webp", width: 1200, height: 630, alt: "Eurowindow - Kiến tạo không gian sống đẳng cấp" }],
    url: "https://eurowindowhcm.vn",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cửa Eurowindow Hồ Chí Minh",
    description:
      "Cung cấp giải pháp tổng thể về cửa nhôm kính, cửa uPVC, cửa gỗ và kính an toàn chuẩn quốc tế.",
    images: ["/eurowindow/cuanhom.jpg.webp"],
    site: "@eurowindow_hcm",
    creator: "@eurowindow_hcm",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-placeholder",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi" data-scroll-behavior="smooth" className={`${spaceGrotesk.variable} h-full antialiased scroll-smooth`}><body className={`${spaceGrotesk.className} min-h-full`}><ScrollProgressBar />{children}<ChatWidget /></body></html>;
}
