import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageBanner from "@/components/PageBanner";
import { ArrowRight, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "../../projects-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return { title: `${project.title} – Eurowindow Projects`, description: project.intro };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = projects.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#071523] text-white">
      <Header lang="en" />
      <main>
        <PageBanner title={project.category} crumb={project.title} homeHref="/en" bgImage={project.images[0]} />

        <section className="pb-16 pt-12">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <h1 className="max-w-4xl text-3xl font-extrabold uppercase leading-tight tracking-tight text-white md:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 flex items-center gap-2 text-base font-semibold text-[#E2C275]">
              <MapPin className="h-5 w-5 text-[#E2C275]" />
              {project.location}
            </p>
          </div>
        </section>

        <section className="pb-16">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {project.images.map((src, i) => (
                <div key={i} className={`glass-card p-3 backdrop-blur-2xl ${i === 0 ? "sm:col-span-2" : ""}`}>
                  <div className="overflow-hidden rounded-xl bg-[#102238]">
                    <img src={src} alt={`${project.title} – photo ${i + 1}`} loading={i === 0 ? undefined : "lazy"} className="aspect-[16/9] w-full object-cover" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#102238]/60 py-16">
          <div className="mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="glass-card p-8 backdrop-blur-2xl">
              <h2 className="text-xl font-extrabold uppercase tracking-wide text-white">Project information</h2>
              <dl className="mt-6 space-y-4">
                {[
                  ["INVESTOR", "Eurowindow"],
                  ["CATEGORY", project.category],
                  ["COMPLETED", project.year],
                  ["AREA", project.area],
                  ["LOCATION", project.location],
                  ["SCOPE", project.scope],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-6 border-b border-white/10 pb-3 text-sm">
                    <dt className="font-bold text-[#94A3B8]">{k}</dt>
                    <dd className="text-right font-extrabold text-white">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl font-extrabold uppercase tracking-tight text-white">About the project</h2>
              <p className="text-lg leading-relaxed text-[#D2D8E3]">{project.intro}</p>
              <p className="text-sm leading-relaxed text-[#94A3B8]">
                Eurowindow accompanies each project from site survey and solution consulting through
                production and installation — ensuring every item meets quality standards on schedule.
                Products are controlled to European standards, answering the acoustic, thermal, safety
                and aesthetic requirements of every building.
              </p>
              <Link href="/en/about#lien-he" className="btn-gold-luxury inline-flex items-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-widest">
                Contact us for advice <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <div className="mb-12 flex items-end justify-between gap-6">
              <h2 className="text-3xl font-extrabold uppercase tracking-tight text-white md:text-4xl">Related projects</h2>
              <Link href="/en/projects" className="hidden items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E2C275] md:inline-flex hover:text-[#F0D18A]">View all <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((project) => (
                <Link key={project.slug} href={`/en/projects/${project.slug}`} className="glass-card glass-card-hover group overflow-hidden p-5">
                  <div className="aspect-[16/10] overflow-hidden rounded-xl bg-[#102238]">
                    <img src={project.images[0]} alt={project.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <div className="pt-5">
                    <h3 className="text-lg font-bold text-white transition group-hover:text-[#E2C275]">{project.title}</h3>
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-[#94A3B8]"><MapPin className="h-4 w-4 text-[#E2C275]" />{project.location}</p>
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
