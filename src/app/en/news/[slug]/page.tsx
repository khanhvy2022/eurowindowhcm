import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageBanner from "@/components/PageBanner";
import { ArrowRight, ChevronDown } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "../../articles-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Article not found" };
  return { title: `${article.title} – Eurowindow News`, description: article.excerpt };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = articles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#071523] text-white">
      <Header lang="en" />
      <main>
        <PageBanner title={article.category} crumb={article.title} homeHref="/en" bgImage={article.image} />

        <section className="pb-16 pt-12">
          <div className="mx-auto max-w-[900px] px-5 sm:px-8">
            <p className="text-xs font-bold uppercase tracking-widest text-[#E2C275]">{article.category} · {article.date}</p>
            <h1 className="mt-4 text-3xl font-extrabold leading-snug tracking-tight text-white md:text-5xl">{article.title}</h1>
            <p className="mt-6 text-lg leading-relaxed text-[#D2D8E3]">{article.excerpt}</p>
          </div>
        </section>

        {article.image ? (
          <section className="pb-12">
            <div className="mx-auto max-w-[900px] px-5 sm:px-8">
              <div className="glass-card p-3 backdrop-blur-2xl">
                <div className="overflow-hidden rounded-xl bg-[#102238]">
                  <img src={article.image} alt={article.title} className="aspect-[16/9] w-full object-cover" />
                </div>
              </div>
            </div>
          </section>
        ) : null}

        <section className="pb-24 pt-4">
          <div className="mx-auto max-w-[900px] px-5 sm:px-8">
            <details className="glass-card overflow-hidden group">
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-base font-bold uppercase tracking-wide text-white">
                Table of contents
                <ChevronDown className="h-5 w-5 shrink-0 text-[#E2C275] transition-transform group-open:rotate-180" />
              </summary>
              <ol className="border-t border-white/10 px-6 py-5 space-y-3">
                {article.sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="text-sm font-medium text-[#D2D8E3] transition hover:text-[#E2C275]">{s.heading}</a>
                  </li>
                ))}
                {article.faq ? <li><a href="#faq" className="text-sm font-medium text-[#D2D8E3] transition hover:text-[#E2C275]">Frequently asked questions</a></li> : null}
              </ol>
            </details>

            <div className="mt-14 space-y-16">
              {article.sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-24">
                  <h2 className="text-2xl font-extrabold uppercase tracking-tight text-white md:text-3xl">{section.heading}</h2>
                  <div className="mt-6 space-y-6">
                    {section.body.map((p, i) => (
                      <p key={i} className="text-base leading-relaxed text-[#D2D8E3]">{p}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {article.faq ? (
              <section id="faq" className="mt-20 scroll-mt-24 border-t border-white/10 pt-16">
                <h2 className="text-2xl font-extrabold uppercase tracking-tight text-white md:text-3xl">Frequently asked questions</h2>
                <div className="mt-8 space-y-4">
                  {article.faq.map((item) => (
                    <details key={item.q} className="glass-card overflow-hidden group">
                      <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-base font-semibold text-white">
                        {item.q}
                        <ChevronDown className="h-5 w-5 shrink-0 text-[#E2C275] transition-transform group-open:rotate-180" />
                      </summary>
                      <p className="border-t border-white/10 px-6 py-5 text-sm leading-relaxed text-[#D2D8E3]">{item.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}

            <div className="mt-16 border-t border-white/10 pt-10">
              <Link href="/en/news" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E2C275] transition hover:text-white">
                <ArrowRight className="h-4 w-4 rotate-180" /> Back to news
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#102238]/60 py-20">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <div className="mb-12 flex items-end justify-between gap-6">
              <h2 className="text-3xl font-extrabold uppercase tracking-tight text-white md:text-4xl">Related articles</h2>
              <Link href="/en/news" className="hidden items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E2C275] md:inline-flex hover:text-[#F0D18A]">View all <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Link key={item.slug} href={`/en/news/${item.slug}`} className="glass-card glass-card-hover group flex flex-col overflow-hidden p-5">
                  {item.image ? (
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#102238]">
                      <img src={item.image} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                    </div>
                  ) : null}
                  <div className="pt-4 flex flex-1 flex-col justify-between">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-[#E2C275]">{item.category} · {item.date}</p>
                      <h3 className="mt-2 text-base font-bold text-white transition group-hover:text-[#E2C275] line-clamp-2">{item.title}</h3>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E2C275] transition group-hover:text-white">Read more <ArrowRight className="h-4 w-4" /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer lang="en" />
    </div>
  );
}
