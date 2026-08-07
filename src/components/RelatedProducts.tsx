import { products } from "@/data/eurowindow";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type RelatedProductsProps = {
  currentHref: string;
};

export default function RelatedProducts({ currentHref }: RelatedProductsProps) {
  const related = products.filter((p) => p.href !== currentHref);

  return (
    <section className="bg-[#0b1628] py-16 text-white">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <h2 className="mb-10 text-3xl font-bold uppercase tracking-[-0.04em] md:text-4xl">
          SẢN PHẨM LIÊN QUAN
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {related.map((product) => (
            <Link
              key={product.href}
              href={product.href}
              className="group relative overflow-hidden bg-[#14253f]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20" />
                <span className="absolute left-3 top-3 inline-block rounded-full bg-[#0066aa] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
                  {product.title}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold uppercase tracking-[-0.03em]">
                  {product.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {product.text.slice(0, 100)}...
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#4da6e0]">
                  Xem thêm <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}