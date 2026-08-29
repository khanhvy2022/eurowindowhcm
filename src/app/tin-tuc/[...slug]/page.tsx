import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ArrowRight, ChevronDown } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect, RedirectType } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { articles } from "../articles";

type Props = { params: Promise<{ slug: string[] }> };

const BASE_URL = "https://eurowindowhcm.com";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug.split("/").filter(Boolean) }));
}

const EN_NEWS_SLUGS = new Set([
  "toa-dam-xu-huong-nguon-nhan-luc",
  "cua-vach-kinh-vinhomes-global-gate",
  "giai-phap-cua-chong-nong-mua-he-2026",
  "nen-chon-cua-gi-cho-mua-he-nang-nong",
]);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const slugStr = Array.isArray(slug) ? slug.join("/") : String(slug);
  const article = await getPostBySlug(slugStr);
  if (!article) return { title: "Không tìm thấy bài viết" };

  const canonicalUrl = `${BASE_URL}/tin-tuc/${article.slug}`;
  const title = `${article.title} | Eurowindow HCM`;
  const description = article.excerpt || article.title;
  const hasEn = EN_NEWS_SLUGS.has(article.slug);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      ...(hasEn
        ? {
            languages: {
              vi: `${BASE_URL}/tin-tuc/${article.slug}`,
              en: `${BASE_URL}/en/news/${article.slug}`,
            },
          }
        : {}),
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      publishedTime: article.date,
      authors: [article.author || "Eurowindow HCM"],
      images: article.image ? [{ url: article.image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: article.image ? [article.image] : undefined,
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const slugStr = Array.isArray(slug) ? slug.join("/") : String(slug);
  const article = await getPostBySlug(slugStr);
  if (!article) notFound();

  // Consolidate Link Equity & prevent duplicate content by permanently redirecting legacy slugs/aliases
  if (slugStr !== article.slug) {
    redirect(`/tin-tuc/${article.slug}`, RedirectType.replace);
  }

  const all = await getAllPosts();
  const related = all.filter((a) => a.slug !== article.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.image ? [article.image] : undefined,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Organization",
      name: article.author || "Eurowindow HCM",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Eurowindow HCM",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/tin-tuc/${article.slug}`,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Trang chủ",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tin tức",
        item: `${BASE_URL}/tin-tuc`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `${BASE_URL}/tin-tuc/${article.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#071523] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <main>
        <section className="border-b border-white/10 py-16 md:py-20">
          <div className="mx-auto max-w-[900px] px-5 sm:px-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-light text-[#94A3B8]">
              <Link href="/" className="-my-2.5 py-2.5 transition hover:text-white">Trang chủ</Link>
              <ArrowRight className="h-3.5 w-3.5 opacity-50" />
              <Link href="/tin-tuc" className="-my-2.5 py-2.5 transition hover:text-white">Tin tức</Link>
              <ArrowRight className="h-3.5 w-3.5 opacity-50" />
              <span className="text-white">{article.category}</span>
            </nav>
            <p className="mt-8 text-sm font-bold uppercase tracking-wide text-[#E2C275]">{article.category} · {article.date}</p>
            <h1 className="mt-4 text-3xl font-bold leading-[1.1] tracking-[-0.03em] md:text-5xl">{article.title}</h1>
            <p className="mt-6 text-lg leading-8 text-[#D2D8E3]">{article.excerpt}</p>
          </div>
        </section>

        {article.image && (!article.contentHtml || !/<img/i.test(article.contentHtml.slice(0, 400))) ? (
          <section className="py-12">
            <div className="mx-auto max-w-[900px] px-5 sm:px-8">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#102238] shadow-2xl">
                <img src={article.image} alt={article.title} className="aspect-[16/9] w-full object-cover" />
              </div>
            </div>
          </section>
        ) : null}

        <section className="pb-20 pt-6">
          <div className="mx-auto max-w-[900px] px-5 sm:px-8">
            {article.sections && article.sections.length > 1 ? (
              <details className="group mb-12 border border-white/15 bg-[#102238]">
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-lg font-bold uppercase tracking-[-0.02em]">
                  Mục lục
                  <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <ol className="border-t border-white/10 px-6 py-6 space-y-3">
                  {article.sections.map((s) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className="leading-7 text-[#D2D8E3] transition hover:text-[#E2C275]">{s.heading}</a>
                    </li>
                  ))}
                  {article.faq ? <li><a href="#faq" className="leading-7 text-[#D2D8E3] transition hover:text-[#E2C275]">Câu hỏi thường gặp</a></li> : null}
                </ol>
              </details>
            ) : null}

            {article.contentHtml ? (
              <div
                className="article-body text-[#D2D8E3] text-lg leading-relaxed space-y-6 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-white [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:leading-8 [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:my-6 [&_a]:text-[#E2C275] [&_a]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-white/20 [&_th]:p-3 [&_td]:border [&_td]:border-white/10 [&_td]:p-3"
                dangerouslySetInnerHTML={{ __html: article.contentHtml }}
              />
            ) : (
              <div className="mt-14 space-y-16">
                {article.sections.map((section) => (
                  <section key={section.id} id={section.id} className="scroll-mt-24">
                    <h2 className="text-2xl font-bold tracking-[-0.03em] md:text-3xl">{section.heading}</h2>
                    <div className="mt-6 space-y-6">
                      {section.body.map((p, i) => (
                        <p key={i} className="text-lg leading-8 text-[#D2D8E3]">{p}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}

            {article.faq ? (
              <section id="faq" className="mt-20 scroll-mt-24 border-t border-white/10 pt-16">
                <h2 className="text-2xl font-bold tracking-[-0.03em] md:text-3xl">Câu hỏi thường gặp</h2>
                <div className="mt-10 space-y-4">
                  {article.faq.map((item) => (
                    <details key={item.q} className="group border border-white/15 bg-[#102238]">
                      <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-semibold">
                        {item.q}
                        <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
                      </summary>
                      <p className="border-t border-white/10 px-6 py-5 leading-8 text-[#D2D8E3]">{item.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}

            <div className="mt-20 border-t border-white/10 pt-12">
              <Link href="/tin-tuc" className="inline-flex items-center gap-2 py-3 text-sm font-bold uppercase text-[#E2C275] transition hover:text-white">
                <ArrowRight className="h-4 w-4 rotate-180" /> Quay lại tin tức
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#102238] py-20">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <div className="mb-12 flex items-end justify-between gap-6">
              <h2 className="text-3xl font-bold uppercase tracking-[-0.04em] md:text-4xl">Bài viết liên quan</h2>
              <Link href="/tin-tuc" className="hidden items-center gap-3 text-sm font-bold uppercase md:inline-flex">Xem tất cả <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Link key={item.slug} href={`/tin-tuc/${item.slug}`} className="group block">
                  {item.image ? (
                    <div className="aspect-[1.45] overflow-hidden bg-[#102238]">
                      <img src={item.image} alt={item.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                    </div>
                  ) : null}
                  <p className="mt-4 text-xs font-bold uppercase tracking-wide text-[#E2C275]">{item.category} · {item.date}</p>
                  <h3 className="mt-2 text-lg font-bold leading-snug tracking-[-0.02em]">{item.title}</h3>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-bold uppercase">Đọc thêm <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
