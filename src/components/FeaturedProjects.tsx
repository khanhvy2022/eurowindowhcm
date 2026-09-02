import { ArrowRight, Building2, Calendar, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";
import { getLatestProjects, type ProjectItem } from "@/lib/projects";
import { projects as projectsEn } from "@/app/en/projects-data";

interface FeaturedProjectsProps {
  lang?: "vi" | "en";
  initialProjects?: ProjectItem[];
}

export default async function FeaturedProjects({ lang = "vi", initialProjects }: FeaturedProjectsProps) {
  const isEn = lang === "en";

  // If initial projects not provided, fetch dynamically server-side
  const projects = initialProjects || (await getLatestProjects({ limit: 6 }));

  const displayProjects = isEn
    ? projectsEn.slice(0, 6).map((p) => ({
        slug: p.slug,
        title: p.title,
        location: p.location,
        category: p.category,
        image: p.images[0],
        href: `/en/projects/${p.slug}`,
        isNew: false,
      }))
    : projects.map((p) => {
        // Calculate if project is within 30 days of publish
        let isNew = false;
        if (p.publishedAt) {
          const pubTime = new Date(p.publishedAt).getTime();
          const diffDays = (Date.now() - pubTime) / (1000 * 3600 * 24);
          if (diffDays >= 0 && diffDays <= 60) {
            isNew = true;
          }
        }
        return {
          slug: p.slug,
          title: p.title,
          location: p.location,
          category: p.category,
          image: p.image,
          href: `/du-an/${p.slug}`,
          year: p.year,
          isNew,
        };
      });

  const featuredHero = displayProjects[0];
  const supportingProjects = displayProjects.slice(1);

  return (
    <section id="du-an" className="relative overflow-hidden bg-[#06101f] py-24 sm:py-32 text-white">
      {/* Ambient background light */}
      <div className="pointer-events-none absolute left-1/3 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#1677FF]/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="mb-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/40 bg-[#C9A227]/10 px-4 py-1.5 backdrop-blur-md">
              <Building2 className="h-4 w-4 text-[#C9A227]" />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#C9A227]">
                {isEn ? "ICONIC ARCHITECTURE" : "BIỂU TƯỢNG KIẾN TRÚC VIỆT NAM"}
              </span>
            </div>
            <h2 className="font-serif text-3xl font-bold uppercase tracking-tight text-white md:text-5xl">
              {isEn ? "FEATURED PROJECTS" : "CÔNG TRÌNH TIÊU BIỂU"}
            </h2>
          </div>

          <Link
            href={isEn ? "/en/projects" : "/du-an"}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#C9A227] transition hover:text-white"
          >
            {isEn ? "View all projects" : "Xem tất cả công trình"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Dynamic Architectural Grid: 1 Landmark Hero + Supporting Grid */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Main Landmark Hero Card (7 Cols) */}
          {featuredHero && (
            <div className="lg:col-span-7">
              <Link href={featuredHero.href} className="group block h-full">
                <article className="relative flex h-full min-h-[440px] sm:min-h-[540px] flex-col justify-end overflow-hidden rounded-3xl border border-white/10 bg-[#0c1c33] p-6 sm:p-10 shadow-2xl transition-all duration-500 hover:border-[#C9A227]/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
                  {/* High Quality Project Photo */}
                  <img
                    src={featuredHero.image}
                    alt={featuredHero.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06101f] via-[#06101f]/60 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute left-6 top-6 flex items-center gap-2">
                    <span className="rounded-full border border-[#C9A227]/50 bg-[#06101f]/80 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#C9A227] backdrop-blur-md">
                      {featuredHero.category}
                    </span>
                    {featuredHero.isNew && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#C9A227] px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#06101f]">
                        <Sparkles className="h-3 w-3" /> MỚI
                      </span>
                    )}
                  </div>

                  {/* Bottom Info */}
                  <div className="relative z-10 space-y-3">
                    <p className="flex items-center gap-2 text-xs font-semibold text-[#D2D8E3]">
                      <MapPin className="h-3.5 w-3.5 text-[#C9A227]" />
                      {featuredHero.location}
                    </p>
                    <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white transition group-hover:text-[#C9A227]">
                      {featuredHero.title}
                    </h3>
                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#C9A227] pt-2">
                      <span>{isEn ? "View landmark details" : "Xem chi tiết công trình"}</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </article>
              </Link>
            </div>
          )}

          {/* Supporting Landmark Grid (5 Cols, 2x2 or Vertical Stack) */}
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {supportingProjects.slice(0, 3).map((project) => (
              <Link key={project.slug} href={project.href} className="group block">
                <article className="relative flex min-h-[160px] sm:min-h-[170px] flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-[#0c1c33] p-5 shadow-lg transition-all duration-300 hover:border-[#C9A227]/40 hover:-translate-y-1">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-75"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06101f] via-[#06101f]/70 to-transparent" />

                  <div className="relative z-10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A227]">
                      {project.category}
                    </span>
                    <h3 className="mt-1 font-serif text-base font-bold text-white transition group-hover:text-[#C9A227] line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-[#94A3B8]">
                      <MapPin className="h-3 w-3 text-[#C9A227]" />
                      {project.location}
                    </p>
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
