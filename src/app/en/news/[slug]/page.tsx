import Footer from "@/components/Footer";
import Header from "@/components/Header";
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
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header lang="en" />
      <main>
        <section className="border-b border-white/10 py-16 md:py-20">
          <div className="mx-auto max-w-[900px] px-5 sm:px-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-light text-zinc-400">
              <Link href="/en" className="-my-2.5 py-2.5 transition hover:text-white">Home</Link>
              <ArrowRight className="h-3.5 w-3.5 opacity-50" />
              <Link href="/en/news" className="-my-2.5 py-2.5 transition hover:text-white">News</Link>
              <ArrowRight className="h-3.5 w-3.5 opacity-50" />
              <span className="text-white">{article.category}</span>
            </nav>
            <p className="mt-8 text-sm font-bold uppercase tracking-wide text-[#4da6e0]">{article.category} · {article.date}</p>
            <h1 className="mt-4 text-3xl font-bold leading-[1.1] tracking-[-0.03em] md:text-5xl">{article.title}</h1>
            <p className="mt-6 text-lg leading-8 text-zinc-300">{article.excerpt}</p>
          </div>
        </section>

        {article.image ? (
          <section className="py-12">
            <div className="mx-auto max-w-[900px] px-5 sm:px-8">
              <div className="overflow-hidden bg-zinc-900">
                <img src={article.image} alt={article.title} className="aspect-[16/8] w-full object-cover" />
              </div>
            </div>
          </section>
        ) : null}

        <section className="pb-20 pt-6">
          <div className="mx-auto max-w-[900px] px-5 sm:px-8">
            <details className="group border border-white/15 bg-[#14253f]">
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-lg font-bold uppercase tracking-[-0.02em]">
                Table of contents
                <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <ol className="border-t border-white/10 px-6 py-6 space-y-3">
                {article.sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="leading-7 text-zinc-300 transition hover:text-[#4da6e0]">{s.heading}</a>
                  </li>
                ))}
                {article.faq ? <li><a href="#faq" className="leading-7 text-zinc-300 transition hover:text-[#4da6e0]">Frequently asked questions</a></li> : null}
              </ol>
            </details>

            <div className="mt-14 space-y-16">
              {article.sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold tracking-[-0.03em] md:text-3xl">{section.heading}</h2>
                  <div className="mt-6 space-y-6">
                    {section.body.map((p, i) => (
                      <p key={i} className="text-lg leading-8 text-zinc-300">{p}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {article.faq ? (
              <section id="faq" className="mt-20 scroll-mt-24 border-t border-white/10 pt-16">
                <h2 className="text-2xl font-bold tracking-[-0.03em] md:text-3xl">Frequently asked questions</h2>
                <div className="mt-10 space-y-4">
                  {article.faq.map((item) => (
                    <details key={item.q} className="group border border-white/15 bg-[#14253f]">
                      <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-semibold">
                        {item.q}
                        <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
                      </summary>
                      <p className="border-t border-white/10 px-6 py-5 leading-8 text-zinc-300">{item.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}

            <div className="mt-20 border-t border-white/10 pt-12">
              <Link href="/en/news" className="inline-flex items-center gap-2 py-3 text-sm font-bold uppercase text-[#4da6e0] transition hover:text-white">
                <ArrowRight className="h-4 w-4 rotate-180" /> Back to news
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#14253f] py-20">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <div className="mb-12 flex items-end justify-between gap-6">
              <h2 className="text-3xl font-bold uppercase tracking-[-0.04em] md:text-4xl">Related articles</h2>
              <Link href="/en/news" className="hidden items-center gap-3 text-sm font-bold uppercase md:inline-flex">View all <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Link key={item.slug} href={`/en/news/${item.slug}`} className="group block">
                  {item.image ? (
                    <div className="aspect-[1.45] overflow-hidden bg-zinc-800">
                      <img src={item.image} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                    </div>
                  ) : null}
                  <p className="mt-4 text-xs font-bold uppercase tracking-wide text-[#4da6e0]">{item.category} · {item.date}</p>
                  <h3 className="mt-2 text-lg font-bold leading-snug tracking-[-0.02em]">{item.title}</h3>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-bold uppercase">Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
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
