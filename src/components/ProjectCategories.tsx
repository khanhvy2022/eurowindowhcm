import { ArrowRight } from "lucide-react";
import { categories } from "@/data/eurowindow";

export default function ProjectCategories() {
  return (
    <section className="bg-[#0b1628] py-20 text-white md:py-28">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="mb-12 flex items-end justify-between gap-6">
          <h2 className="text-4xl font-bold uppercase tracking-[-0.055em] md:text-5xl">DANH MỤC CÔNG TRÌNH</h2>
          <a href="/du-an" className="hidden items-center gap-3 text-sm font-bold uppercase md:inline-flex">Xem tất cả <ArrowRight className="h-5 w-5" /></a>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {categories.map(([title, image]) => (
            <a key={title} href="/du-an" className="group relative aspect-[1.08] overflow-hidden bg-zinc-800">
              <img src={image} alt="" className="h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-90" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-5 pb-5 pt-14 text-base font-bold uppercase sm:text-xl">{title}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
