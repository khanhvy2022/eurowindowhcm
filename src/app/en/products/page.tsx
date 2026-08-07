import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageBanner from "@/components/PageBanner";
import { products } from "@/app/en/products/products-data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Products | Eurowindow",
  description: "Explore Eurowindow's premium product range: aluminium doors, uPVC doors, wooden doors, glass products, automatic doors, and roller doors.",
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#0b1628] text-white">
      <Header lang="en" />
      <main>
        <PageBanner title="PRODUCTS" crumb="Products" bgImage="/eurowindow/products-hero.jpg.webp" />

        <section className="pb-20 pt-12">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <h2 className="mb-10 text-3xl font-bold uppercase tracking-[-0.04em] md:text-4xl">Our Products</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <Link key={product.slug} href={`/en/products/${product.slug}`} className="group overflow-hidden bg-[#14253f]">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={product.image} alt={product.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/30" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold uppercase tracking-[-0.03em]">{product.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-zinc-400">{product.text.slice(0, 120)}...</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#4da6e0]">View details <ArrowRight className="h-4 w-4" /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}