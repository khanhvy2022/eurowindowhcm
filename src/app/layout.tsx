import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import ChatWidget from "@/components/ChatWidget";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import QuickContactButtons from "@/components/QuickContactButtons";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.eurowindowhcm.com";

export const metadata: Metadata = {
  title: {
    default: "Cửa Eurowindow Hồ Chí Minh – Cửa Nhôm Kính & uPVC Cao Cấp",
    template: "%s | Eurowindow HCM",
  },
  description:
    "Eurowindow HCM – phân phối chính hãng cửa nhôm kính, cửa uPVC, cửa gỗ, kính an toàn tại TP.HCM. Chuẩn quốc tế, bảo hành dài hạn. Hotline: 0966 994 338.",
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
    canonical: "https://www.eurowindowhcm.com",
    languages: {
      "vi-VN": "https://www.eurowindowhcm.com",
      "en-US": "https://www.eurowindowhcm.com/en",
      "x-default": "https://www.eurowindowhcm.com",
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
    site: "@EurowindowHo",
    creator: "@EurowindowHo",
  },
  verification: {
    google: "0FTA2xkzXcpAYDDeQ-XJSUUEe9S0vA1sBBjq7jNfPlo",
    yandex: "08aca8c1b7c7d334",
    other: {
      "msvalidate.01": "20AECD452BC31C72DFFDD7A0D4EFD759",
      "p:domain_verify": "808c7f59f5b55c7a3a28e7f19d5f55f9",
      "dmca-site-verification": "SGpDM1ZpY1N5Y2R3WXRHMHRHdkFISGI4RlRQa1ZCS0RhMkx3NlFlOXFLYz01",
    },
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


const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": `${SITE_URL}/#localbusiness`,
  name: "Cửa Eurowindow Hồ Chí Minh",
  legalName: "Công ty Cổ phần Eurowindow",
  alternateName: "Eurowindow HCM",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/eurowindow/cuanhom.jpg.webp`,
  description:
    "Nhà phân phối chính hãng cửa nhôm kính, cửa uPVC, cửa gỗ, kính an toàn và vách kính cao cấp Eurowindow tại TP. Hồ Chí Minh và khu vực miền Nam.",
  telephone: "+84966994338",
  email: "thangtq2@eurowindow.biz",
  priceRange: "$$$",
  currenciesAccepted: "VND",
  paymentAccepted: "Cash, Credit Card, Bank Transfer",
  hasMap: "https://www.google.com/maps/place/Eurowindow/@10.7851608,106.6965552,17z/data=!3m1!4b1!4m5!3m4!1s0x31752f359420bf6f:0xd21ebe21b390b760!8m2!3d10.7851608!4d106.6987439?hl=vi-VN",
  address: {
    "@type": "PostalAddress",
    streetAddress: "39 Bis Mạc Đĩnh Chi, Phường Tân Định",
    addressLocality: "Thành phố Hồ Chí Minh",
    addressRegion: "Hồ Chí Minh",
    postalCode: "700000",
    addressCountry: "VN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 10.7851608,
    longitude: 106.6965552,
  },
  areaServed: [
    "Hồ Chí Minh",
    "Bình Dương",
    "Đồng Nai",
    "Long An",
    "Bà Rịa - Vũng Tàu",
    "Miền Nam Việt Nam",
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:30",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "08:30",
      closes: "11:30",
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+84966994338",
      contactType: "sales",
      areaServed: "VN",
      availableLanguage: ["Vietnamese", "English"],
    },
  ],
  sameAs: [
    "https://www.facebook.com/EurowindowMN/",
    "https://www.youtube.com/channel/UCF7zxKNLO071ssSAP1Y4zUA",
    "https://twitter.com/EurowindowHo",
    "https://www.instagram.com/thang.tranquyet.961/",
    "https://www.pinterest.com/quyetthang87dl/pins/",
    "https://www.facebook.com/eurowindow.biz",
    "https://www.youtube.com/@eurowindow",
  ],
};

const authorPersonSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#author`,
  name: "Eurowindow Ho Chi Minh",
  jobTitle: "Chuyên viên tư vấn giải pháp cửa & vách nhôm kính Eurowindow",
  worksFor: {
    "@type": "Organization",
    name: "Cửa Eurowindow Hồ Chí Minh",
    url: SITE_URL,
  },
  url: `${SITE_URL}/gioi-thieu`,
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "Cao Đẳng Giao Thông Vận Tải 3",
    },
    {
      "@type": "EducationalOrganization",
      name: "RMIT University",
    },
  ],
  sameAs: [
    "https://www.facebook.com/EurowindowMN/",
    "https://www.instagram.com/thang.tranquyet.961/",
    "https://www.youtube.com/channel/UCF7zxKNLO071ssSAP1Y4zUA",
    "https://www.pinterest.com/quyetthang87dl/pins/",
    "https://twitter.com/EurowindowHo",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "39 Bis Mạc Đĩnh Chi, Phường Tân Định",
    addressLocality: "Thành phố Hồ Chí Minh",
    addressRegion: "Hồ Chí Minh",
    addressCountry: "VN",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Cửa Eurowindow Hồ Chí Minh",
  alternateName: "Eurowindow HCM",
  description: "Nhà cung cấp tổng thể giải pháp cửa và vách kính hàng đầu Việt Nam",
  inLanguage: ["vi", "en"],
  publisher: {
    "@type": "Organization",
    name: "Cửa Eurowindow Hồ Chí Minh",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/tin-tuc?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
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
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <meta property="fb:app_id" content="1184893731898959" />
        <meta property="fb:admins" content="1820683361594975" />
        <meta property="article:author" content="https://www.facebook.com/EurowindowMN/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(authorPersonSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`${spaceGrotesk.className} min-h-full selection:bg-[#E2C275]/30 selection:text-white`}>
        <GoogleAnalytics gaId="G-BBMNYWJ8WN" />
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
          itemType="https://schema.org/HomeAndConstructionBusiness"
        >
          <meta itemProp="name" content="Cửa Eurowindow Hồ Chí Minh" />
          <meta itemProp="url" content={SITE_URL} />
          <meta itemProp="image" content={`${SITE_URL}/eurowindow/cuanhom.jpg.webp`} />
          <meta itemProp="priceRange" content="$$" />
          <meta itemProp="telephone" content="+84966994338" />
          <meta itemProp="email" content="contact@eurowindowhcm.com" />
          <a
            className="url fn org u-url u-uid p-name"
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
              39 Bis Mạc Đĩnh Chi, Phường Tân Định
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
          <span className="tel p-tel">
            +84 966 994 338
          </span>
          <a className="email u-email" href="mailto:contact@eurowindowhcm.com">
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

