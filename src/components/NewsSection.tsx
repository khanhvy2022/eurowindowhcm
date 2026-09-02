import { ArrowRight, Calendar, Newspaper, Sparkles } from "lucide-react";
import Link from "next/link";
import { getLatestNews } from "@/lib/posts";
import { type Article } from "@/app/tin-tuc/articles";
import { articles as articlesEn } from "@/app/en/articles-data";

interface NewsSectionProps {
  lang?: "vi" | "en";
  initialArticles?: Article[];
}

export default async function NewsSection({ lang = "vi", initialArticles }: NewsSectionProps) {
  const isEn = lang === "en";

  // Fetch dynamic news server-side if not provided
  const newsList = initialArticles || (await getLatestNews({ limit: 4 }));

  const displayNews = isEn
    ? articlesEn.slice(0, 4).map((a) => ({
        slug: a.slug,
        title: a.title,
        category: "News",
        date: "2026",
        image: a.image || "/eurowindow/toa-dam-1.png.webp",
        href: `/en/news/${a.slug}`,
        excerpt: a.excerpt || "",
      }))
    : newsList.map((a) => ({
        slug: a.slug,
        title: a.title,
        category: a.category || "Tin tức",
        date: a.date || a.publishedAt || "2026",
        image: a.image || "/eurowindow/toa-dam-1.png.webp",
        href: `/tin-tuc/${a.slug}`,
        excerpt: a.excerpt || "",
      }));

  const spotlightArticle = displayNews[0];
  const supportingNews = displayNews.slice(1);

  return (
    <section id="tin-tuc" className="relative overflow-hidden bg-[#06101f] py-24 sm:py-32 text-white">
      {/* Ambient background light */}
      <div className="pointer-events-none absolute right-1/4 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#1677FF]/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="mb-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/40 bg-[#C9A227]/10 px-4 py-1.5 backdrop-blur-md">
              <Newspaper className="h-4 w-4 text-[#C9A227]" />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#C9A227]">
                {isEn ? "PRESS & EDITORIAL" : "TIN TỨC & SỰ KIỆN NỔI BẬT"}
              </span>
            </div>
            <h2 className="font-serif text-3xl font-bold uppercase tracking-tight text-white md:text-5xl">
              {isEn ? "EUROWINDOW NEWS" : "TIN TỨC EUROWINDOW"}
            </h2>
          </div>

          <Link
            href={isEn ? "/en/news" : "/tin-tuc"}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#C9A227] transition hover:text-white"
          >
            {isEn ? "All articles" : "Xem tất cả bài viết"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Editorial News Layout: 1 Large Spotlight Hero + 3 Compact Editorial Rows */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Spotlight Hero Article (7 cols) */}
          {spotlightArticle && (
            <div className="lg:col-span-7">
              <Link href={spotlightArticle.href} className="group block h-full">
                <article className="relative flex h-full min-h-[440px] sm:min-h-[500px] flex-col justify-end overflow-hidden rounded-3xl border border-white/10 bg-[#0c1c33] p-6 sm:p-10 shadow-2xl transition-all duration-500 hover:border-[#C9A227]/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
                  <img
                    src={spotlightArticle.image}
                    alt={spotlightArticle.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06101f] via-[#06101f]/70 to-transparent" />

                  {/* Top Badge */}
                  <div className="absolute left-6 top-6 flex items-center gap-2">
                    <span className="rounded-full border border-[#C9A227]/50 bg-[#06101f]/80 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#C9A227] backdrop-blur-md">
                      {spotlightArticle.category}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#C9A227] px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#06101f]">
                      <Sparkles className="h-3 w-3" /> MỚI NHẤT
                    </span>
                  </div>

                  {/* Bottom Info */}
                  <div className="relative z-10 space-y-3">
                    <p className="flex items-center gap-2 text-xs text-[#94A3B8]">
                      <Calendar className="h-3.5 w-3.5 text-[#C9A227]" />
                      {spotlightArticle.date}
                    </p>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white transition group-hover:text-[#C9A227] line-clamp-2">
                      {spotlightArticle.title}
                    </h3>
                    {spotlightArticle.excerpt && (
                      <p className="text-xs sm:text-sm leading-relaxed text-[#D2D8E3] line-clamp-2">
                        {spotlightArticle.excerpt}
                      </p>
                    )}
                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#C9A227] pt-2">
                      <span>{isEn ? "Read full article" : "Đọc toàn bộ bài viết"}</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </article>
              </Link>
            </div>
          )}

          {/* Supporting News Editorial Rows (5 cols) */}
          <div className="space-y-4 lg:col-span-5">
            {supportingNews.map((article) => (
              <Link key={article.slug} href={article.href} className="group block">
                <article className="flex gap-4 sm:gap-5 rounded-2xl border border-white/10 bg-[#0c1c33]/80 p-4 sm:p-5 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-[#C9A227]/40 hover:-translate-y-1">
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/11] w-28 sm:w-36 shrink-0 overflow-hidden rounded-xl bg-[#06101f]">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Meta & Title */}
                  <div className="flex flex-1 flex-col justify-between py-0.5">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-[11px] text-[#94A3B8]">
                        <span className="font-semibold text-[#C9A227] uppercase tracking-wider">{article.category}</span>
                        <span>•</span>
                        <span>{article.date}</span>
                      </div>
                      <h4 className="font-serif text-sm sm:text-base font-bold text-white transition group-hover:text-[#C9A227] line-clamp-2">
                        {article.title}
                      </h4>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#C9A227]">
                      <span>{isEn ? "Details" : "Chi tiết"}</span>
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
