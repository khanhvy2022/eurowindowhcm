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

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) return { title: "Product Not Found" };
  return { title: `${product.title} | Eurowindow`, description: product.text.slice(0, 160) };
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  return (
    <div className="min-h-screen bg-[#0b1628] text-white">
      <Header lang="en" />
      <main>
        <PageBanner title={product.tab} crumb={product.title} bgImage={product.image} />

        <section className="pb-20 pt-12">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <div className="mb-8 flex items-center gap-3">
              <span className="inline-block rounded-full bg-[#0066aa] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white">{product.tab}</span>
            </div>

            <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1a2e4d]">
                <Image src={product.image} alt={product.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/20" />
              </div>

              <div className="flex flex-col justify-center gap-6">
                <h2 className="text-3xl font-bold uppercase tracking-[-0.04em]">{product.title}</h2>
                <p className="max-w-xl leading-8 text-zinc-300">{product.text}</p>
                <ul className="mt-2 space-y-3">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm leading-6 text-zinc-200">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-[#4da6e0]" strokeWidth={3} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-16 border-t border-white/10 pt-14">
              <h3 className="text-2xl font-bold uppercase tracking-[-0.04em]">Introduction</h3>
              <div className="mt-6 space-y-5 leading-8 text-zinc-300">
                {product.intro.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <h3 className="mt-10 text-2xl font-bold uppercase tracking-[-0.04em]">Product Structure</h3>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {product.structure.map((s) => (
                  <div key={s.title} className="border-l-2 border-[#0066aa] pl-5">
                    <h4 className="font-bold">{s.title}</h4>
                    <p className="mt-2 text-sm leading-7 text-zinc-400">{s.text}</p>
                  </div>
                ))}
              </div>

              <h3 className="mt-10 text-2xl font-bold uppercase tracking-[-0.04em]">Advantages</h3>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {product.advantages.map((a) => (
                  <div key={a.title} className="border border-white/10 bg-[#14253f] p-6">
                    <h4 className="flex items-start gap-3 font-bold">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-[#4da6e0]" strokeWidth={3} />
                      {a.title}
                    </h4>
                    <p className="mt-3 text-sm leading-6 text-zinc-400">{a.text}</p>
                  </div>
                ))}
              </div>

              <h3 className="mt-10 text-2xl font-bold uppercase tracking-[-0.04em]">Product Lines</h3>
              <div className="mt-6 flex flex-wrap gap-2">
                {product.systems.map((s) => (
                  <span key={s} className="rounded-full border border-white/20 bg-[#14253f] px-4 py-2 text-sm text-zinc-300">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}