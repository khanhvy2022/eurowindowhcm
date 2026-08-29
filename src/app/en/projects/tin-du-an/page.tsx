import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import { articles } from "@/app/en/articles-data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project News – Eurowindow HCM",
  description: "Stay updated with the latest news, milestone sign-offs, and construction updates on Eurowindow's featured projects.",
  alternates: {
    canonical: "/en/projects/tin-du-an",
    languages: { vi: "/du-an/tin-du-an", en: "/en/projects/tin-du-an" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Eurowindow HCM",
    title: "Project News – Eurowindow HCM",
    description: "Latest news, milestone sign-offs, and construction updates on Eurowindow's projects.",
    images: [{ url: "/eurowindow/toa-dam-1.png.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Project News – Eurowindow HCM",
    description: "Latest project news and construction updates.",
  },
};

const categoryLinksEn = [
  { label: "All Projects", href: "/en/projects", slug: "tat-ca" },
  { label: "National Landmarks", href: "/en/projects/cong-trinh-quoc-gia", slug: "cong-trinh-quoc-gia" },
  { label: "Hospitals", href: "/en/projects/benh-vien", slug: "benh-vien" },
  { label: "Government Buildings", href: "/en/projects/tru-so-co-quan", slug: "tru-so-co-quan" },
  { label: "Civil Construction", href: "/en/projects/cong-trinh-dan-dung", slug: "cong-trinh-dan-dung" },
  { label: "Project News", href: "/en/projects/tin-du-an", slug: "tin-du-an" },
];

export default function ProjectNewsPageEn() {
  return (
    <div className="min-h-screen bg-[#071523] text-[#FFFFFF]">
      <Header lang="en" />
      <main>
        <PageBanner
          title="PROJECT NEWS"
          crumb="Project news"
          homeHref="/en"
          bgImage="/eurowindow/toa-dam-1.png.webp"
        />

        <section className="pb-24 pt-14">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <p className="mb-10 max-w-3xl text-base leading-relaxed text-[#D2D8E3]">
              Read the latest news on Eurowindow&apos;s key contract wins, construction progress, strategic partnerships, and project completion milestones.
            </p>

            <div className="flex flex-wrap gap-2.5 mb-12">
              {categoryLinksEn.map((item) => (
                <Link
                  key={item.slug}
                  href={item.href}
                  className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider backdrop-blur-md transition ${
                    item.slug === "tin-du-an"
                      ? "bg-[#E2C275] text-[#071523] shadow-lg"
                      : "border border-white/10 bg-white/5 text-[#D2D8E3] hover:border-[#E2C275] hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <h2 className="mb-6 text-xl font-extrabold uppercase tracking-tight text-white">Latest Project News</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/en/news/${article.slug}`}
                  className="glass-card glass-card-hover group flex flex-col overflow-hidden p-5"
                >
                  {article.image ? (
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#102238]">
                      <img
                        src={article.image}
                        alt={article.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#071523]/80 via-transparent to-transparent" />
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col justify-between pt-4">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-[#E2C275]">
                        {article.category} · {article.date}
                      </p>
                      <h3 className="mt-2 text-base font-bold leading-snug tracking-tight text-[#FFFFFF] transition group-hover:text-[#E2C275] line-clamp-3">
                        {article.title}
                      </h3>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E2C275] transition group-hover:text-[#FFFFFF]">
                      Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
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
