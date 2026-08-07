"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageBanner from "@/components/PageBanner";
import { ArrowRight, Award, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const stats = [
  ["2002", "year of founding"],
  ["20+", "years of experience"],
  ["100,000+", "projects delivered"],
  ["14", "consecutive National Brand years"],
  ["6+", "core product systems"],
  ["2", "modern factories"],
] as const;

const accordions = [
  {
    id: "vision",
    label: "Vision",
    text: "To become the leading Vietnamese brand in door, aluminium-glass partition and finishing material solutions — creating civilised living spaces that harmonise function and aesthetics.",
  },
  {
    id: "mission",
    label: "Mission",
    text: "To put people and the environment at the centre of every decision, so each project is not only beautiful today but sustainable for tomorrow.",
  },
  {
    id: "quan-niem",
    label: "Our design philosophy",
    text: "\"We do not sell doors. We guarantee the boundary between your home and the outside world\" — where light, air and privacy are reconciled with precision.",
  },
  {
    id: "phuong-cham",
    label: "Operating motto",
    text: "Clear consulting, synchronised execution and after-handover support so every project retains lasting value over time.",
  },
] as const;

const services = [
  {
    title: "EUROPEAN-STANDARD uPVC DOORS",
    text: "Acoustic and thermal uPVC door systems — the product that made Eurowindow famous since 2002.",
    image: "/eurowindow/cuanhua1.jpg.webp",
  },
  {
    title: "ALUMINIUM DOORS & LARGE PARTITIONS",
    text: "Premium aluminium door and partition systems in EA55–EA95i profiles with genuine Cmech, Roto and Hafele hardware.",
    image: "/eurowindow/cuanhom.jpg.webp",
  },
  {
    title: "WOODEN & FIRE-RESISTANT DOORS",
    text: "Natural, engineered and fire-resistant wooden doors — luxurious, durable and safe for every project.",
    image: "/eurowindow/cuagotrangchu.jpg.webp",
  },
] as const;

const awards = [
  ["14 years", "consecutive Vietnam National Brand", "Ministry of Industry and Trade"],
  ["2026", "Top 10 green enterprises in Vietnam", "Vietnam Report"],
  ["2024", "Vietnam Product Quality Award", "Vietnam Quality Award"],
] as const;

const projects = [
  { title: "Phu Bai International Airport", location: "National landmark", image: "/eurowindow/constructions/viber-image-2025-02-05-13-33-24-065.png.webp" },
  { title: "Hospital Francais de Hanoi", location: "Hospital", image: "/eurowindow/constructions/img-7105.jpg.webp" },
  { title: "Da Nang Oncology Hospital", location: "Hospital", image: "/eurowindow/constructions/benh-vien-ung-buou-da-nang-17.jpg.webp" },
  { title: "Children's Hospital 2 Ho Chi Minh City", location: "Hospital", image: "/eurowindow/constructions/dji-0090-1.jpg.webp" },
  { title: "Vietnam News Agency TV Centre", location: "Government building", image: "/eurowindow/constructions/img-7172.jpg.webp" },
  { title: "Supreme People's Procuracy", location: "Government building", image: "/eurowindow/constructions/20191115-vien-kiem-soat-nhan-dan-toi-cao-0038.jpg.webp" },
] as const;

export default function AboutPage() {
  const [open, setOpen] = useState<string | null>("vision");
  return (
    <div className="min-h-screen bg-[#0b1628] text-white">
      <Header lang="en" />
      <main>
        <PageBanner title="ABOUT US" crumb="About us" homeHref="/en" bgImage="/eurowindow/upvc4.png.webp" />

        <section className="pb-20 pt-16 md:pt-24">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <h2 className="text-center text-3xl font-bold uppercase tracking-[-0.04em] md:text-4xl">
              ABOUT EUROWINDOW
            </h2>
            <div className="mt-14 grid items-center gap-10 md:grid-cols-2 md:gap-14">
              <div>
                <p className="leading-8 text-zinc-300">
                  In 2002, Eurowindow pioneered the introduction of modern European-standard uPVC
                  doors into the domestic market — a revolution in doors that opened a "new era" for
                  Vietnamese homes.
                </p>
                <p className="mt-6 leading-8 text-zinc-300">
                  For over two decades, Eurowindow has kept pioneering new technology and expanded
                  across uPVC, aluminium, wood, glass, automatic doors, roller doors and finishing
                  materials. Every product system answers the same question: how does it help people
                  live better?
                </p>
                <Link href="/en/products" className="mt-8 inline-flex items-center gap-2 py-3 text-sm font-bold uppercase text-white transition hover:text-[#4da6e0]">
                  SEE OUR SOLUTIONS <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="overflow-hidden">
                <img
                  src="/eurowindow/layer-211.png.webp"
                  alt="Eurowindow – leading green building material solutions provider"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#14253f] py-16 md:py-20">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <p className="mx-auto max-w-3xl text-center text-lg leading-8 text-zinc-300">
              For more than 20 years, Eurowindow has served with dedication, striving to create
              happy living spaces for customers…
            </p>
            <dl className="mt-14 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
              {stats.map(([num, label]) => (
                <div key={label} className="text-center">
                  <dd className="text-3xl font-bold tracking-[-0.04em] text-[#4da6e0] md:text-4xl">{num}</dd>
                  <dt className="mt-2 text-xs font-medium uppercase tracking-wide text-zinc-400">{label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="overflow-hidden border-y border-white/10 bg-[#0066aa] py-4">
          <div className="animate-marquee flex w-max items-center gap-10">
            {[0, 1].map((dup) => (
              <span key={dup} className="flex items-center gap-10 whitespace-nowrap text-xl font-bold uppercase tracking-[-0.03em] text-white md:text-2xl">
                {["Pioneer. Create. Accompany.", "Green building material solutions", "Present in hundreds of thousands of projects"].map((t) => (
                  <span key={t} className="flex items-center gap-10">{t}<span className="text-white/50">•</span></span>
                ))}
              </span>
            ))}
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-5 sm:px-8 md:grid-cols-2 md:gap-14">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold uppercase tracking-[-0.04em]">Brand journey</h2>
              <ul className="mt-8 space-y-5">
                <li className="flex gap-4">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#0066aa]" />
                  <p className="leading-7 text-zinc-300">2002 — founded, pioneering European-standard uPVC doors in Vietnam.</p>
                </li>
                <li className="flex gap-4">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#0066aa]" />
                  <p className="leading-7 text-zinc-300">2012 — first achieved the Vietnam National Brand, starting 14 consecutive years of recognition.</p>
                </li>
                <li className="flex gap-4">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#0066aa]" />
                  <p className="leading-7 text-zinc-300">2020 — expanded across aluminium, wood, automatic and roller door systems, glass products and interiors.</p>
                </li>
                <li className="flex gap-4">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#0066aa]" />
                  <p className="leading-7 text-zinc-300">Today — products appear in hundreds of thousands of projects in Vietnam and abroad, from apartments and villas to key national landmarks.</p>
                </li>
              </ul>
            </div>
            <div className="order-1 overflow-hidden md:order-2">
              <img src="/eurowindow/about-office.jpg.webp" alt="Eurowindow office building" className="aspect-[4/3] w-full object-cover" />
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#14253f] py-16 md:py-20">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <h2 className="text-3xl font-bold uppercase tracking-[-0.04em]">Core values</h2>
            <div className="mt-12 space-y-3">
              {accordions.map((item) => (
                <div key={item.id} className="border border-white/10 bg-[#0b1628]">
                  <button
                    type="button"
                    aria-expanded={open === item.id}
                    aria-controls={`panel-${item.id}`}
                    onClick={() => setOpen(open === item.id ? null : item.id)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-lg font-bold uppercase tracking-[-0.02em] transition hover:text-[#4da6e0]"
                  >
                    {item.label}
                    <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${open === item.id ? "rotate-180" : ""}`} />
                  </button>
                  {open === item.id ? (
                    <div id={`panel-${item.id}`} className="border-t border-white/10 px-6 py-6 leading-8 text-zinc-300">{item.text}</div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <h2 className="text-center text-3xl font-bold uppercase tracking-[-0.04em]">Eurowindow services</h2>
            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {services.map((service) => (
                <article key={service.title} className="group relative min-h-[430px] overflow-hidden bg-zinc-800">
                  <img src={service.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50 transition duration-700 group-hover:scale-105 group-hover:opacity-65" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10" />
                  <div className="relative flex h-full flex-col justify-end p-7">
                    <h3 className="max-w-[280px] text-2xl font-bold leading-tight">{service.title}</h3>
                    <p className="mt-4 max-w-sm text-sm font-medium leading-7 text-zinc-200">{service.text}</p>
                    <Link href="/en/products" className="mt-7 inline-flex items-center gap-2 py-3 text-sm font-bold uppercase">View more <ArrowRight className="h-4 w-4" /></Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#14253f] py-16 md:py-20">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <h2 className="text-3xl font-bold uppercase tracking-[-0.04em]">Awards</h2>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {awards.map(([year, title, org]) => (
                <div key={year} className="border border-white/10 bg-[#0b1628] p-8">
                  <Award className="h-7 w-7 text-[#4da6e0]" />
                  <p className="mt-5 text-sm font-bold uppercase text-[#4da6e0]">{year}</p>
                  <h3 className="mt-2 text-lg font-bold leading-snug">{title}</h3>
                  <p className="mt-3 text-sm text-zinc-400">{org}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <div className="mb-12 flex items-end justify-between gap-6">
              <h2 className="text-3xl font-bold uppercase tracking-[-0.04em] md:text-4xl">Featured projects</h2>
              <Link href="/en/projects" className="hidden items-center gap-3 text-sm font-bold uppercase md:inline-flex">View all <ArrowRight className="h-5 w-5" /></Link>
            </div>
            <div className="grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <article key={project.title} className="group overflow-hidden bg-zinc-900">
                  <div className="aspect-[1.2] overflow-hidden bg-zinc-800">
                    <img src={project.image} alt={project.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex items-end justify-between gap-4 p-5">
                    <div>
                      <h3 className="text-xl font-bold tracking-[-0.035em]">{project.title}</h3>
                      <p className="mt-2 text-sm text-zinc-400">{project.location}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 shrink-0 text-[#4da6e0] transition-transform group-hover:translate-x-1" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer lang="en" />
    </div>
  );
}
