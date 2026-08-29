import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageBanner from "@/components/PageBanner";
import { getProduct } from "@/app/en/products/products-data";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import Image from "next/image";

export async function generateStaticParams() {
  const { products } = await import("@/app/en/products/products-data");
  return products.map((p) => ({ slug: p.slug }));
}

import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.title} – Eurowindow HCM`,
    description: product.text.slice(0, 160),
    alternates: {
      canonical: `/en/products/${slug}`,
      languages: { vi: `/san-pham/${slug}`, en: `/en/products/${slug}` },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "Eurowindow HCM",
      title: `${product.title} – Eurowindow HCM`,
      description: product.text.slice(0, 160),
      images: [{ url: product.image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} – Eurowindow HCM`,
      description: product.text.slice(0, 160),
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <div className="min-h-screen bg-[#071523] text-white">
      <Header lang="en" />
      <main>
        <PageBanner title={product.tab} crumb={product.title} homeHref="/en" bgImage={product.image} />

        <section className="pb-24 pt-14">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <div className="mb-8 flex items-center gap-3">
              <span className="inline-block rounded-full border border-[#E2C275]/40 bg-[#E2C275]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#E2C275]">
                {product.tab}
              </span>
            </div>

            <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
              <div className="glass-card p-3 backdrop-blur-2xl">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#102238]">
                  <Image src={product.image} alt={product.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                </div>
              </div>

              <div className="flex flex-col justify-center gap-6">
                <h2 className="text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl">{product.title}</h2>
                <p className="max-w-xl text-base leading-relaxed text-[#D2D8E3]">{product.text}</p>
                <ul className="mt-2 space-y-3">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm leading-relaxed text-[#D2D8E3]">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-[#E2C275]" strokeWidth={3} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-16 border-t border-white/10 pt-14">
              <h3 className="text-2xl font-extrabold uppercase tracking-tight text-white">Introduction</h3>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-[#D2D8E3]">
                {product.intro.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <h3 className="mt-12 text-2xl font-extrabold uppercase tracking-tight text-white">Product Structure</h3>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {product.structure.map((s) => (
                  <div key={s.title} className="glass-card p-6 border-l-4 border-l-[#E2C275]">
                    <h4 className="font-bold text-white text-lg">{s.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-[#D2D8E3]">{s.text}</p>
                  </div>
                ))}
              </div>

              <h3 className="mt-12 text-2xl font-extrabold uppercase tracking-tight text-white">Advantages</h3>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {product.advantages.map((a) => (
                  <div key={a.title} className="glass-card glass-card-hover p-6">
                    <h4 className="flex items-start gap-3 font-bold text-white text-base">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-[#E2C275]" strokeWidth={3} />
                      {a.title}
                    </h4>
                    <p className="mt-3 text-xs leading-relaxed text-[#94A3B8]">{a.text}</p>
                  </div>
                ))}
              </div>

              <h3 className="mt-12 text-2xl font-extrabold uppercase tracking-tight text-white">Product Lines</h3>
              <div className="mt-6 flex flex-wrap gap-3">
                {product.systems.map((s) => (
                  <span key={s} className="rounded-full border border-[#E2C275]/30 bg-[#E2C275]/10 px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#E2C275]">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer lang="en" />
    </div>
  );
}