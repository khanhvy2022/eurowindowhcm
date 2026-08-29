import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Script from "next/script";
import ChatWidget from "@/components/ChatWidget";
import QuickContactButtons from "@/components/QuickContactButtons";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://eurowindowhcm.com";

export const metadata: Metadata = {
  title: {
    default: "Cửa Eurowindow Hồ Chí Minh",
    template: "%s | Cửa Eurowindow Hồ Chí Minh",
  },
  description:
    "Eurowindow HCM – nhà phân phối chính hãng cửa nhôm kính, cửa uPVC, cửa gỗ, kính an toàn tại TP.HCM. Hơn 23 năm kinh nghiệm, chuẩn quốc tế, bảo hành dài hạn. Hotline: 0966 994 338.",
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
    "cửa nhôm kính HCM",
    "cửa nhà ở",
    "cửa biệt thự",
    "cửa sổ nhôm kính",
  ],
  authors: [{ name: "Cửa Eurowindow Hồ Chí Minh", url: SITE_URL }],
  creator: "Cửa Eurowindow Hồ Chí Minh",
  publisher: "Cửa Eurowindow Hồ Chí Minh",
  category: "Xây dựng & Vật liệu",
  applicationName: "Cửa Eurowindow Hồ Chí Minh",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/favicon.png" },
    ],
  },

  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
    languages: {
      "vi": SITE_URL,
      "en": `${SITE_URL}/en`,
      "x-default": SITE_URL,
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    alternateLocale: "en_US",
    siteName: "Cửa Eurowindow Hồ Chí Minh",
    title: "Cửa Eurowindow Hồ Chí Minh",
    description:
      "Nhà phân phối chính hãng Eurowindow tại TP.HCM – cửa nhôm kính, cửa uPVC, kính an toàn cho biệt thự, căn hộ và công trình hiện đại. Hơn 23 năm kinh nghiệm.",
    images: [
      {
        url: `${SITE_URL}/eurowindow/cuanhom.jpg.webp`,
        width: 1200,
        height: 630,
        alt: "Cửa Eurowindow Hồ Chí Minh – Cửa nhôm kính, uPVC cao cấp",
        type: "image/webp",
      },
    ],
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Cửa Eurowindow Hồ Chí Minh",
    description:
      "Nhà phân phối chính hãng Eurowindow tại TP.HCM – cửa nhôm kính, cửa uPVC, kính an toàn. Hotline: 0966 994 338.",
    images: [`${SITE_URL}/eurowindow/cuanhom.jpg.webp`],
    site: "@eurowindow_hcm",
    creator: "@eurowindow_hcm",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};


const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#organization`,
      name: "Cửa Eurowindow Hồ Chí Minh",
      alternateName: "Eurowindow HCM",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      image: `${SITE_URL}/eurowindow/cuanhom.jpg.webp`,
      description:
        "Nhà cung cấp tổng thể các giải pháp cửa nhôm kính, cửa uPVC, cửa gỗ cao cấp Eurowindow tại TP. Hồ Chí Minh và khu vực miền Nam.",
      telephone: "+84 966 994 338",
      email: "contact@eurowindowhcm.com",
      additionalType: "https://schema.org/HomeAndConstructionBusiness",
      address: {
        "@type": "PostalAddress",
        streetAddress: "TP. Hồ Chí Minh",
        addressLocality: "Hồ Chí Minh",
        addressRegion: "Hồ Chí Minh",
        addressCountry: "VN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 10.7769,
        longitude: 106.7009,
      },
      areaServed: [
        "Hồ Chí Minh",
        "Bình Dương",
        "Đồng Nai",
        "Long An",
        "Bà Rịa - Vũng Tàu",
        "Miền Nam Việt Nam",
      ],
      priceRange: "$$",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "08:00",
          closes: "18:00",
        },
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+84 966 994 338",
          contactType: "sales",
          areaServed: "VN",
          availableLanguage: ["Vietnamese", "English"],
        },
      ],
      sameAs: [
        "https://www.facebook.com/eurowindow.biz",
        "https://www.youtube.com/@eurowindow",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Cửa Eurowindow Hồ Chí Minh",
      description: "Nhà cung cấp tổng thể giải pháp cửa và vách kính hàng đầu Việt Nam",
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
      inLanguage: ["vi", "en"],
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/tin-tuc?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="vi"
      prefix="og: https://ogp.me/ns# fb: https://ogp.me/ns/fb#"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${spaceGrotesk.className} min-h-full`}>
        {/* Google Analytics GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BBMNYWJ8WN"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BBMNYWJ8WN');
          `}
        </Script>
        <ScrollProgressBar />
        {children}
        <QuickContactButtons />
        <ChatWidget />

        {/* Microformats (h-card / vcard) & Schema.org Microdata for SEO Parsers */}
        <div
          className="vcard h-card hidden"
          aria-hidden="true"
          style={{ display: "none" }}
          itemScope
          itemType="https://schema.org/LocalBusiness"
        >
          <meta itemProp="image" content={`${SITE_URL}/eurowindow/cuanhom.jpg.webp`} />
          <meta itemProp="priceRange" content="$$" />
          <a
            className="url fn org u-url u-uid p-name"
            itemProp="url name"
            href={SITE_URL}
          >
            Cửa Eurowindow Hồ Chí Minh
          </a>
          <p className="note p-note" itemProp="description">
            Nhà cung cấp tổng thể giải pháp cửa nhôm kính, cửa uPVC và vách kính hàng đầu Việt Nam
          </p>
          <div
            className="adr h-adr p-adr"
            itemProp="address"
            itemScope
            itemType="https://schema.org/PostalAddress"
          >
            <span className="street-address p-street-address" itemProp="streetAddress">
              TP. Hồ Chí Minh
            </span>,
            <span className="locality p-locality" itemProp="addressLocality">
              Hồ Chí Minh
            </span>,
            <span className="region p-region" itemProp="addressRegion">
              Hồ Chí Minh
            </span>,
            <span className="country-name p-country-name" itemProp="addressCountry">
              VN
            </span>
          </div>
          <span className="tel p-tel" itemProp="telephone">
            +84 966 994 338
          </span>
          <a className="email u-email" itemProp="email" href="mailto:contact@eurowindowhcm.com">
            contact@eurowindowhcm.com
          </a>
          <span className="category p-category">
            Cửa nhôm kính, cửa uPVC, cửa gỗ, kính an toàn
          </span>
        </div>
      </body>
    </html>
  );
}

