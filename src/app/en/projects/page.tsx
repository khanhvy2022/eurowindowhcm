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
    <div className="min-h-screen bg-[#0b1628] text-white">
      <Header lang="en" />
      <main>
        <PageBanner title="EUROWINDOW PROJECTS" crumb="Projects" homeHref="/en" bgImage="/eurowindow/constructions/viber-image-2025-02-05-13-33-24-065.png.webp" />

        <section className="pb-20 pt-12">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <form role="search" onSubmit={(e) => e.preventDefault()} className="flex w-full max-w-md items-center border border-white/15 bg-[#1a2e4d]">
                <Search className="ml-4 h-5 w-5 shrink-0 text-zinc-400" />
                <input
                  type="search"
                  aria-label="Search projects"
                  placeholder="Search"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setVisible(PAGE_SIZE); }}
                  className="w-full bg-transparent px-3 py-3.5 text-sm outline-none placeholder:text-zinc-500"
                />
              </form>
               <nav aria-label="Project categories" className="flex flex-wrap gap-2">
                 <button
                   type="button"
                   aria-pressed={active === null}
                   onClick={() => { setActive(null); setVisible(PAGE_SIZE); }}
                   className="border border-white/15 px-4 py-2.5 text-sm font-medium transition-colors duration-200 text-zinc-400 hover:text-white aria-pressed:border-[#0066aa] aria-pressed:bg-[#0066aa] aria-pressed:text-white"
                 >
                   All
                 </button>
                 {categories.map((category) => (
                   <button
                     key={category}
                     type="button"
                     aria-pressed={active === category}
                     onClick={() => { setActive(category); setVisible(PAGE_SIZE); }}
                     className="border border-white/15 px-4 py-2.5 text-sm font-medium transition-colors duration-200 text-zinc-400 hover:text-white aria-pressed:border-[#0066aa] aria-pressed:bg-[#0066aa] aria-pressed:text-white"
                   >
                     {category}
                   </button>
                 ))}
               </nav>
            </div>

            <div className="mt-12 grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((project) => (
                <Link key={project.slug} href={`/en/projects/${project.slug}`} className="group overflow-hidden bg-[#152238]">
                  <div className="aspect-[1.2] overflow-hidden bg-[#1a2e4d] relative">
                    <img src={project.images[0]} alt={project.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/30 transition duration-500 group-hover:bg-black/20" />
                  </div>
                  <div className="p-5">
                    <h2 className="text-xl font-bold tracking-[-0.035em]">{project.title}</h2>
                    <p className="mt-2 flex items-center gap-1.5 text-sm text-zinc-400"><MapPin className="h-4 w-4" />{project.location}</p>
                  </div>
                </Link>
              ))}
            </div>

            {shown.length === 0 ? (
              <p className="mt-16 text-center text-zinc-400">No projects match your search &quot;{query}&quot;.</p>
            ) : null}

            {filtered.length > visible ? (
              <div className="mt-14 text-center">
                <button type="button" onClick={() => setVisible((v) => v + PAGE_SIZE)} className="border border-white/20 px-10 py-3.5 text-sm font-bold uppercase tracking-wide transition hover:bg-white hover:text-[#111]">
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
