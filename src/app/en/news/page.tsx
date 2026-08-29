import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageBanner from "@/components/PageBanner";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { articles } from "../articles-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eurowindow News – Events, Offers & Construction Insights",
  description:
    "Stay updated with the latest Eurowindow news: highlights, promotions on aluminium glass doors, uPVC windows, and expert construction knowledge.",
  alternates: {
    canonical: "https://www.eurowindowhcm.com/en/news",
    languages: { vi: "https://www.eurowindowhcm.com/tin-tuc", en: "https://www.eurowindowhcm.com/en/news" },
  },
  openGraph: {
    title: "Eurowindow News – Events, Offers & Construction Insights",
    description: "Latest Eurowindow news, events and building material knowledge.",
    url: "https://www.eurowindowhcm.com/en/news",
  },
};


function SectionHeader({ title, href }: { title: string; href: string }) {
  return (
    <div className="mb-10 flex items-end justify-between gap-6">
      <h2 className="text-3xl font-extrabold uppercase tracking-tight text-white md:text-4xl">{title}</h2>
      <Link href={href} className="hidden shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E2C275] md:inline-flex hover:text-[#F0D18A]">View all <ArrowRight className="h-4 w-4" /></Link>
    </div>
  );
}

function NewsCard({ slug, title, date, category, image }: { slug: string; title: string; date: string; category: string; image?: string }) {
  return (
    <Link href={`/en/news/${slug}`} className="glass-card glass-card-hover group flex flex-col overflow-hidden p-5">
      {image ? (
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#102238]">
          <img src={image} alt={title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071523]/80 via-transparent to-transparent" />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col justify-between pt-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#E2C275]">{category} · {date}</p>
          <h3 className="mt-2 text-base font-bold leading-snug tracking-tight text-white transition group-hover:text-[#E2C275] line-clamp-3">{title}</h3>
        </div>
        <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E2C275] transition group-hover:text-white">
          Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-[#071523] text-white">
      <Header lang="en" />
      <main>
        <PageBanner title="NEWS &amp; EVENTS" crumb="News" homeHref="/en" bgImage="/eurowindow/toa-dam-1.png.webp" />

        <section className="pb-24 pt-16">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <SectionHeader title="Latest news" href="/en/news" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => <NewsCard key={article.slug} slug={article.slug} title={article.title} date={article.date} category={article.category} image={article.image} />)}
            </div>
          </div>
        </section>
      </main>
      <Footer lang="en" />
    </div>
  );
}
