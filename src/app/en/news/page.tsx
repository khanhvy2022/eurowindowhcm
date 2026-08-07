import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageBanner from "@/components/PageBanner";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { articles } from "../articles-data";

const latest = articles.slice(0, 4);

function SectionHeader({ title, href }: { title: string; href: string }) {
  return (
    <div className="mb-10 flex items-end justify-between gap-6">
      <h2 className="text-3xl font-bold uppercase tracking-[-0.04em] md:text-4xl">{title}</h2>
      <Link href={href} className="hidden shrink-0 items-center gap-3 text-sm font-bold uppercase md:inline-flex">View all <ArrowRight className="h-4 w-4" /></Link>
    </div>
  );
}

function NewsCard({ slug, title, date, category, image }: { slug: string; title: string; date: string; category: string; image?: string }) {
  return (
    <Link href={`/en/news/${slug}`} className="group block">
      {image ? (
        <div className="aspect-[1.45] overflow-hidden bg-zinc-800">
          <img src={image} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        </div>
      ) : null}
      <p className="mt-4 text-xs font-bold uppercase tracking-wide text-[#4da6e0]">{category} · {date}</p>
      <h3 className="mt-2 text-lg font-bold leading-snug tracking-[-0.02em]">{title}</h3>
      <span className="mt-3 inline-flex items-center gap-2 text-sm font-bold uppercase">Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
    </Link>
  );
}

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-[#0b1628] text-white">
      <Header lang="en" />
      <main>
        <PageBanner title="NEWS" crumb="News" homeHref="/en" bgImage="/eurowindow/toa-dam-1.png.webp" />

        <section className="pb-20 pt-16">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <SectionHeader title="Latest news" href="/en/news" />
            <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {latest.map((article) => <NewsCard key={article.slug} slug={article.slug} title={article.title} date={article.date} category={article.category} image={article.image} />)}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#14253f] py-20">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <SectionHeader title="Knowledge sharing" href="/en/news" />
            <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => <NewsCard key={article.slug} slug={article.slug} title={article.title} date={article.date} category={article.category} image={article.image} />)}
            </div>
          </div>
        </section>
      </main>
      <Footer lang="en" />
    </div>
  );
}
