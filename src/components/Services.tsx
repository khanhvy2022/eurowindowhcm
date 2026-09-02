import { ArrowRight, Layers } from "lucide-react";
import Link from "next/link";
import { products } from "@/data/eurowindow";
import { products as productsEn } from "@/app/en/products/products-data";

export default function Services({ lang = "vi" }: { lang?: "vi" | "en" }) {
  const isEn = lang === "en";

  const displayProducts = isEn
    ? productsEn.map((p) => ({
        title: p.title,
        text: p.text.slice(0, 140) + "...",
        image: p.image,
        href: `/en/products/${p.slug}`,
      }))
    : products;

  return (
    <section id="dich-vu" className="relative overflow-hidden bg-[#071523] py-24 sm:py-32 text-white">
      {/* Background Accent */}
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-96 w-96 rounded-full bg-[#C9A227]/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="mb-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/40 bg-[#C9A227]/10 px-4 py-1.5 backdrop-blur-md">
              <Layers className="h-4 w-4 text-[#C9A227]" />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#C9A227]">
                {isEn ? "PORTFOLIO & SOLUTIONS" : "DANH MỤC GIẢI PHÁP VẬT LIỆU"}
              </span>
            </div>
            <h2 className="font-serif text-3xl font-bold uppercase tracking-tight text-white md:text-5xl">
              {isEn ? "ARCHITECTURAL SYSTEMS" : "SẢN PHẨM EUROWINDOW"}
            </h2>
          </div>

          <Link
            href={isEn ? "/en/products" : "/san-pham"}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#C9A227] transition hover:text-white"
          >
            {isEn ? "View all products" : "Xem toàn bộ sản phẩm"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Editorial Grid: 3 columns */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayProducts.map((product, idx) => (
            <article
              key={product.title}
              className="group relative flex min-h-[480px] flex-col justify-end overflow-hidden rounded-3xl border border-white/10 bg-[#0c1c33] p-8 shadow-xl transition-all duration-500 hover:border-[#C9A227]/40 hover:-translate-y-1.5"
            >
              {/* Background Architectural Image */}
              <img
                src={product.image}
                alt={product.title}
                className="absolute inset-0 h-full w-full object-cover opacity-45 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-60"
                loading="lazy"
              />

              {/* Multi-layer Dark Gradient for Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#06101f] via-[#06101f]/75 to-transparent" />

              {/* Number Tag */}
              <div className="absolute top-6 right-6 font-serif text-2xl font-bold text-white/20 transition group-hover:text-[#C9A227]/40">
                0{idx + 1}
              </div>

              {/* Card Content */}
              <div className="relative z-10 space-y-3">
                <div className="h-[2px] w-8 bg-[#C9A227] transition-all duration-300 group-hover:w-16" />
                <h3 className="font-serif text-2xl font-bold tracking-tight text-white transition group-hover:text-[#C9A227]">
                  {product.title}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-[#D2D8E3] line-clamp-3">
                  {product.text}
                </p>
                <Link
                  href={product.href}
                  className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#C9A227] transition hover:text-white pt-2"
                >
                  {isEn ? "Explore specification" : "Khám phá chi tiết"}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
