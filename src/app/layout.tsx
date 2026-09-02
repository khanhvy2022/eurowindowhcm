import type { Metadata } from "next";
import { headers } from "next/headers";
import { Be_Vietnam_Pro, Playfair_Display } from "next/font/google";
import Script from "next/script";
import ChatWidget from "@/components/ChatWidget";
import QuickContactButtons from "@/components/QuickContactButtons";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-be-vietnam-pro",
});

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-playfair",
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
  telephone: "+84903118888",
  email: "infoew@eurowindow.biz",
  priceRange: "$$",
  currenciesAccepted: "VND",
  paymentAccepted: "Cash, Credit Card, Bank Transfer",
  address: {
    "@type": "PostalAddress",
    streetAddress: "39 Bis Mạc Đĩnh Chi, Phường Tân Định, Quận 1",
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
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+84903118888",
      contactType: "sales",
      areaServed: "VN",
      availableLanguage: ["Vietnamese", "English"],
    },
  ],
  sameAs: [
    "https://www.facebook.com/eurowindow.biz",
    "https://www.youtube.com/@eurowindow",
  ],
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

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const headersList = await headers();
  const locale = headersList.get("x-locale") || "vi";

  return (
    <html
      lang={locale}
      prefix="og: https://ogp.me/ns# fb: https://ogp.me/ns/fb#"
      data-scroll-behavior="smooth"
      className={`${beVietnamPro.variable} ${playfair.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`${beVietnamPro.className} min-h-full selection:bg-[#E2C275]/30 selection:text-white`}>
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
              39 Bis Mạc Đĩnh Chi, Phường Đa Kao, Quận 1
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

