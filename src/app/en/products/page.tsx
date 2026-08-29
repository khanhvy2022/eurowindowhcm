import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageBanner from "@/components/PageBanner";
import { products } from "@/app/en/products/products-data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products & Solutions – Eurowindow HCM",
  description: "Explore Eurowindow's premium product range: aluminium doors, uPVC doors, wooden doors, glass products, automatic doors, and roller doors.",
  alternates: {
    canonical: "/en/products",
    languages: { vi: "/san-pham", en: "/en/products" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Eurowindow HCM",
    title: "Products & Solutions – Eurowindow HCM",
    description: "Explore Eurowindow's premium product range.",
    images: [{ url: "/eurowindow/cuanhom.jpg.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Products & Solutions – Eurowindow HCM",
    description: "Explore Eurowindow's premium product range.",
  },
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#071523] text-white">
      <Header lang="en" />
      <main>
        <PageBanner title="PRODUCTS &amp; SOLUTIONS" crumb="Products" homeHref="/en" bgImage="/eurowindow/cuanhom.jpg.webp" />

        <section className="pb-24 pt-16">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <h2 className="mb-10 text-3xl font-extrabold uppercase tracking-tight text-white md:text-4xl">Our Products</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <Link key={product.slug} href={`/en/products/${product.slug}`} className="glass-card glass-card-hover group overflow-hidden p-5 flex flex-col justify-between">
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#102238]">
                      <img src={product.image} alt={product.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#071523]/80 via-transparent to-transparent" />
                    </div>
                    <div className="pt-5">
                      <h3 className="text-xl font-extrabold uppercase tracking-wide text-white transition group-hover:text-[#E2C275]">{product.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-[#D2D8E3]">{product.text.slice(0, 120)}...</p>
                    </div>
                  </div>
                  <div className="pt-4">
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E2C275] transition group-hover:text-white">View details <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer lang="en" />
    </div>
  );
}