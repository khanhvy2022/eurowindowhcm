import { ArrowRight, Layers } from "lucide-react";
import { products } from "@/data/eurowindow";

export default function Services() {
  return (
    <section id="dich-vu" className="relative overflow-hidden bg-[#071523] py-24 text-white">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute left-1/3 top-1/3 h-96 w-96 rounded-full bg-[#1677FF]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-14 space-y-3 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E2C275]/30 bg-[#E2C275]/10 px-4 py-1.5 backdrop-blur-md">
            <Layers className="h-4 w-4 text-[#E2C275]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#E2C275]">
              DANH MỤC GIẢI PHÁP VẬT LIỆU
            </span>
          </div>
          <h2 className="text-3xl font-extrabold uppercase tracking-tight text-white md:text-5xl">
            SẢN PHẨM EUROWINDOW
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.title}
              className="glass-card glass-card-hover group relative min-h-[460px] overflow-hidden p-8 transition-transform duration-500 hover:-translate-y-2"
            >
              <img
                src={product.image}
                alt={product.title}
                className="absolute inset-0 h-full w-full object-cover opacity-40 transition duration-700 group-hover:scale-105 group-hover:opacity-55"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071523] via-[#071523]/70 to-[#071523]/20" />
              <div className="relative flex h-full flex-col justify-end">
                <h3 className="text-2xl font-extrabold leading-snug tracking-tight text-white transition group-hover:text-[#E2C275]">
                  {product.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#D2D8E3]">
                  {product.text}
                </p>
                <a
                  href={product.href}
                  className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E2C275] transition hover:text-white"
                >
                  Khám phá danh mục
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
