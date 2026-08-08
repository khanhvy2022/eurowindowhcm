"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageBanner from "@/components/PageBanner";
import { MapPin, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { projects } from "../projects-data";

const PAGE_SIZE = 9;

const categories = [...new Set(projects.map((p) => p.category))] as const;

export default function ProjectsPage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string | null>(null);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchCat = active ? p.category === active : true;
      const matchQ = q ? p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q) : true;
      return matchCat && matchQ;
    });
  }, [query, active]);

  const shown = filtered.slice(0, visible);

  return (
    <div className="min-h-screen bg-[#071523] text-white">
      <Header lang="en" />
      <main>
        <PageBanner title="EUROWINDOW PROJECTS" crumb="Projects" homeHref="/en" bgImage="/eurowindow/constructions/viber-image-2025-02-05-13-33-24-065.png.webp" />

        <section className="pb-24 pt-14">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <form role="search" onSubmit={(e) => e.preventDefault()} className="glass-card flex w-full max-w-md items-center overflow-hidden px-4 py-2 backdrop-blur-md">
                <Search className="h-5 w-5 shrink-0 text-[#94A3B8]" />
                <input
                  type="search"
                  aria-label="Search projects"
                  placeholder="Search projects..."
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setVisible(PAGE_SIZE); }}
                  className="w-full bg-transparent px-3 py-2 text-sm font-semibold text-white outline-none placeholder:text-[#94A3B8]"
                />
              </form>
               <nav aria-label="Project categories" className="flex flex-wrap gap-2.5 overflow-x-auto no-scrollbar">
                 <button
                   type="button"
                   aria-pressed={active === null}
                   onClick={() => { setActive(null); setVisible(PAGE_SIZE); }}
                   className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition backdrop-blur-md ${
                     active === null
                       ? "bg-[#E2C275] text-[#071523] shadow-md"
                       : "border border-white/10 bg-white/5 text-[#D2D8E3] hover:border-white/30"
                   }`}
                 >
                   All
                 </button>
                 {categories.map((category) => (
                   <button
                     key={category}
                     type="button"
                     aria-pressed={active === category}
                     onClick={() => { setActive(category); setVisible(PAGE_SIZE); }}
                     className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition backdrop-blur-md ${
                       active === category
                         ? "bg-[#E2C275] text-[#071523] shadow-md"
                         : "border border-white/10 bg-white/5 text-[#D2D8E3] hover:border-white/30"
                     }`}
                   >
                     {category}
                   </button>
                 ))}
               </nav>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((project) => (
                <Link key={project.slug} href={`/en/projects/${project.slug}`} className="glass-card glass-card-hover group overflow-hidden p-5">
                  <div className="aspect-[16/10] overflow-hidden rounded-xl bg-[#102238] relative">
                    <img src={project.images[0]} alt={project.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071523]/80 via-transparent to-transparent" />
                  </div>
                  <div className="pt-5">
                    <h2 className="text-lg font-bold text-white transition group-hover:text-[#E2C275]">{project.title}</h2>
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-[#94A3B8]"><MapPin className="h-4 w-4 text-[#E2C275]" />{project.location}</p>
                  </div>
                </Link>
              ))}
            </div>

            {shown.length === 0 ? (
              <p className="mt-16 text-center text-[#94A3B8]">No projects match your search &quot;{query}&quot;.</p>
            ) : null}

            {filtered.length > visible ? (
              <div className="mt-14 text-center">
                <button type="button" onClick={() => setVisible((v) => v + PAGE_SIZE)} className="btn-gold-luxury px-10 py-4 text-xs uppercase tracking-widest">
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
