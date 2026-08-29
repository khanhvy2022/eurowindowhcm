"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import { projects } from "@/app/en/projects-data";
import { MapPin, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export type ProjectCategoryViewEnProps = {
  categorySlug: string;
  categoryName: string;
  bannerTitle: string;
  bannerBg?: string;
  description?: string;
};

const categoryLinksEn = [
  { label: "All Projects", href: "/en/projects", slug: "tat-ca" },
  { label: "National Landmarks", href: "/en/projects/cong-trinh-quoc-gia", slug: "cong-trinh-quoc-gia" },
  { label: "Hospitals", href: "/en/projects/benh-vien", slug: "benh-vien" },
  { label: "Government Buildings", href: "/en/projects/tru-so-co-quan", slug: "tru-so-co-quan" },
  { label: "Civil Construction", href: "/en/projects/cong-trinh-dan-dung", slug: "cong-trinh-dan-dung" },
  { label: "Project News", href: "/en/projects/tin-du-an", slug: "tin-du-an" },
];

export default function ProjectCategoryViewEn({
  categorySlug,
  categoryName,
  bannerTitle,
  bannerBg = "/eurowindow/constructions/viber-image-2025-02-05-13-33-24-065.png.webp",
  description,
}: ProjectCategoryViewEnProps) {
  const [query, setQuery] = useState("");
  const PAGE_SIZE = 9;
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      let matchCat = true;
      if (categorySlug === "cong-trinh-quoc-gia") {
        matchCat = p.category.toLowerCase().includes("national");
      } else if (categorySlug === "benh-vien") {
        matchCat = p.category.toLowerCase().includes("hospital");
      } else if (categorySlug === "tru-so-co-quan") {
        matchCat = p.category.toLowerCase().includes("government");
      } else if (categorySlug === "cong-trinh-dan-dung") {
        matchCat = p.category.toLowerCase().includes("residential") || p.category.toLowerCase().includes("civil");
      } else if (categoryName) {
        const catNorm = categoryName.toLowerCase().replace(/s$/, "");
        matchCat = p.category.toLowerCase().includes(catNorm);
      }

      const matchQuery = q ? p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q) : true;
      return matchCat && matchQuery;
    });
  }, [categorySlug, categoryName, query]);

  const shown = filteredProjects.slice(0, visible);

  return (
    <div className="min-h-screen bg-[#071523] text-white">
      <Header lang="en" />
      <main>
        <PageBanner title={bannerTitle} crumb={categoryName} homeHref="/en" bgImage={bannerBg} />

        <section className="pb-24 pt-14">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            {description ? (
              <p className="mb-10 max-w-3xl text-base leading-relaxed text-[#D2D8E3]">
                {description}
              </p>
            ) : null}

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <form role="search" onSubmit={(e) => e.preventDefault()} className="glass-card flex w-full max-w-md items-center border border-white/15 bg-white/5 p-1 backdrop-blur-md">
                <Search className="ml-4 h-5 w-5 shrink-0 text-[#E2C275]" />
                <input
                  type="search"
                  aria-label="Search projects"
                  placeholder="Search projects in this category..."
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setVisible(PAGE_SIZE); }}
                  className="w-full bg-transparent px-3 py-3 text-sm outline-none text-white placeholder:text-[#94A3B8]"
                />
              </form>

              <nav aria-label="Project categories" className="flex flex-wrap gap-2.5">
                {categoryLinksEn.map((item) => (
                  <Link
                    key={item.slug}
                    href={item.href}
                    className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider backdrop-blur-md transition ${
                      item.slug === categorySlug
                        ? "bg-[#E2C275] text-[#071523] shadow-lg"
                        : "border border-white/10 bg-white/5 text-[#D2D8E3] hover:border-[#E2C275] hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((project) => (
                <Link key={project.slug} href={`/en/projects/${project.slug}`} className="glass-card glass-card-hover group flex flex-col overflow-hidden p-5">
                  <div className="relative aspect-[16/11] overflow-hidden rounded-xl bg-[#102238]">
                    <img src={project.images[0]} alt={project.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071523]/80 via-transparent to-transparent" />
                  </div>
                  <div className="pt-5">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#E2C275]">
                      {project.category}
                    </span>
                    <h2 className="mt-1 text-lg font-bold tracking-tight text-white transition group-hover:text-[#E2C275]">{project.title}</h2>
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-[#94A3B8]"><MapPin className="h-3.5 w-3.5 text-[#E2C275]" />{project.location}</p>
                  </div>
                </Link>
              ))}
            </div>

            {shown.length === 0 ? (
              <p className="mt-16 text-center text-[#94A3B8]">No projects match your search in this category.</p>
            ) : null}

            {filteredProjects.length > visible ? (
              <div className="mt-16 text-center">
                <button type="button" onClick={() => setVisible((v) => v + PAGE_SIZE)} className="btn-gold-luxury px-10 py-3.5 text-xs uppercase tracking-widest">
                  Load more projects
                </button>
              </div>
            ) : null}
          </div>
        </section>
      </main>
      <Footer lang="en" />
    </div>
  );
}
