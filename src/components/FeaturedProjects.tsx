import { ArrowRight, MapPin, Building2 } from "lucide-react";
import Link from "next/link";
import { featuredProjects } from "@/data/eurowindow";
import { projects as projectsEn } from "@/app/en/projects-data";

export default function FeaturedProjects({ lang = "vi" }: { lang?: "vi" | "en" }) {
  const isEn = lang === "en";

  const displayProjects = isEn
    ? projectsEn.slice(0, 6).map((p) => ({
        title: p.title,
        location: p.location,
        image: p.images[0],
        href: `/en/projects/${p.slug}`,
      }))
    : featuredProjects;

  return (
    <section id="du-an" className="relative overflow-hidden bg-[#071523] py-24 text-white">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute left-1/4 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#1677FF]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E2C275]/30 bg-[#E2C275]/10 px-4 py-1.5 backdrop-blur-md">
              <Building2 className="h-4 w-4 text-[#E2C275]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#E2C275]">
                {isEn ? "VIETNAMESE ARCHITECTURAL LANDMARKS" : "BIỂU TƯỢNG KIẾN TRÚC VIỆT NAM"}
              </span>
            </div>
            <h2 className="text-3xl font-extrabold uppercase tracking-tight text-white md:text-5xl">
              {isEn ? "FEATURED PROJECTS" : "CÔNG TRÌNH TIÊU BIỂU"}
            </h2>
          </div>
          <Link
            href={isEn ? "/en/projects" : "/du-an"}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E2C275] transition hover:text-[#F0D18A]"
          >
            {isEn ? "View all projects" : "Xem tất cả dự án"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {displayProjects.map((project) => (
            <Link
              key={project.title}
              href={project.href}
              className="group block h-full"
            >
              <article className="glass-card glass-card-hover flex h-full flex-col overflow-hidden p-5">
                <div className="relative aspect-[16/11] overflow-hidden rounded-xl bg-[#102238]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071523]/80 via-transparent to-transparent" />
                </div>
                <div className="flex flex-1 items-end justify-between gap-4 pt-5">
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-white transition group-hover:text-[#E2C275]">
                      {project.title}
                    </h3>
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-[#94A3B8]">
                      <MapPin className="h-3.5 w-3.5 text-[#E2C275]" />
                      {project.location}
                    </p>
                  </div>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 transition duration-300 group-hover:border-[#E2C275] group-hover:bg-[#E2C275] group-hover:text-[#071523]">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

