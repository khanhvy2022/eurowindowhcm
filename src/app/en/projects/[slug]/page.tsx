import Footer from "@/components/Footer";
import Header from "@/components/Header";
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
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header lang="en" />
      <main>
        <section className="border-b border-white/10 py-16 md:py-20">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-light text-zinc-400">
              <Link href="/en" className="-my-2.5 py-2.5 transition hover:text-white">Home</Link>
              <ArrowRight className="h-3.5 w-3.5 opacity-50" />
              <Link href="/en/projects" className="-my-2.5 py-2.5 transition hover:text-white">Projects</Link>
              <ArrowRight className="h-3.5 w-3.5 opacity-50" />
              <span className="text-white">{project.title}</span>
            </nav>
            <h1 className="mt-8 max-w-3xl text-4xl font-bold uppercase leading-[1.05] tracking-[-0.04em] md:text-6xl">
              {project.title}
            </h1>
            <p className="mt-6 flex items-center gap-2 text-lg text-zinc-300"><MapPin className="h-5 w-5 text-[#4da6e0]" />{project.location}</p>
          </div>
        </section>

        <section className="py-14">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {project.images.map((src, i) => (
                <div key={i} className={`overflow-hidden bg-zinc-900 ${i === 0 ? "sm:col-span-2" : ""}`}>
                  <img src={src} alt={`${project.title} – photo ${i + 1}`} loading={i === 0 ? undefined : "lazy"} className="aspect-[16/9] w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#14253f] py-16">
          <div className="mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="text-2xl font-bold uppercase tracking-[-0.03em]">Project information</h2>
              <dl className="mt-8 space-y-5">
                {[
                  ["INVESTOR", "Eurowindow"],
                  ["CATEGORY", project.category],
                  ["COMPLETED", project.year],
                  ["AREA", project.area],
                  ["LOCATION", project.location],
                  ["SCOPE", project.scope],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-6 border-b border-white/10 pb-4">
                    <dt className="text-sm font-bold text-zinc-400">{k}</dt>
                    <dd className="text-right font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h2 className="text-2xl font-bold uppercase tracking-[-0.03em]">About the project</h2>
              <p className="mt-8 text-lg leading-8 text-zinc-300">{project.intro}</p>
              <p className="mt-6 leading-8 text-zinc-400">
                Eurowindow accompanies each project from site survey and solution consulting through
                production and installation — ensuring every item meets quality standards on schedule.
                Products are controlled to European standards, answering the acoustic, thermal, safety
                and aesthetic requirements of every building.
              </p>
              <Link href="#lien-he" className="mt-10 inline-flex items-center gap-2 bg-[#0066aa] px-8 py-4 text-sm font-bold uppercase text-white transition hover:bg-[#005088]">
                Contact us for advice <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <div className="mb-12 flex items-end justify-between gap-6">
              <h2 className="text-3xl font-bold uppercase tracking-[-0.04em] md:text-4xl">Related projects</h2>
              <Link href="/en/projects" className="hidden items-center gap-3 text-sm font-bold uppercase md:inline-flex">View all <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((project) => (
                <Link key={project.slug} href={`/en/projects/${project.slug}`} className="group overflow-hidden bg-zinc-900">
                  <div className="aspect-[1.2] overflow-hidden bg-zinc-800">
                    <img src={project.images[0]} alt={project.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold tracking-[-0.035em]">{project.title}</h3>
                    <p className="mt-2 flex items-center gap-1.5 text-sm text-zinc-400"><MapPin className="h-4 w-4" />{project.location}</p>
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
