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
    text: "To keep asserting its position as the leading provider of total solutions for green building materials in Vietnam.",
  },
  {
    id: "mission",
    label: "Mission",
    text: "To pioneer new-technology products that are environmentally friendly and energy-saving. Eurowindow strives to elevate the quality of life for millions of customers and to modernise urban architecture.\n\nAlongside partners in a spirit of synergy to create long-term value for shareholders and employees, Eurowindow aligns corporate interests with the common good of society, joining hands with the community to promote the prosperity of the nation.",
  },
  {
    id: "core-values",
    label: "Core values",
    text: "QUALITY: Good products and services decide Eurowindow's reputation.\nPROFESSIONALISM: Our staff combine high professional expertise with a professional, devoted service style, contributing to the success of the Eurowindow brand.\nEFFICIENCY: In every activity we strive to maximise benefits for our customers and for Eurowindow.",
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

        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#E2C275]/30 bg-[#E2C275]/10 px-4 py-1.5 backdrop-blur-md">
                  <Award className="h-4 w-4 text-[#E2C275]" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#E2C275]">
                    OVER 20 YEARS OF PIONEERING
                  </span>
                </div>
                <h2 className="text-3xl font-extrabold uppercase tracking-tight text-white md:text-5xl">
                  EUROWINDOW OVERVIEW
                </h2>
                <p className="text-base leading-relaxed text-[#D2D8E3]">
                  In 2002, Eurowindow pioneered the introduction of modern European-standard uPVC doors into Vietnam, initiating a revolution in doors and opening a new era for modern living spaces.
                </p>
                <p className="text-base leading-relaxed text-[#D2D8E3]">
                  For over two decades, Eurowindow has continuously introduced new technologies and expanded its product portfolio, including uPVC doors, aluminium doors, large glass curtain walls, wooden doors, automatic doors, and high-tech glass products.
                </p>
                <Link href="/en/products" className="btn-gold-luxury inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider">
                  SEE OUR SOLUTIONS <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="glass-card p-3 backdrop-blur-2xl">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#102238]">
                  <img
                    src="/eurowindow/layer-211.png.webp"
                    alt="Eurowindow – leading green building material solutions provider"
                    className="h-full w-full object-cover transition duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#102238]/60 py-16 md:py-20">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <p className="mx-auto max-w-3xl text-center text-lg leading-8 text-[#D2D8E3]">
              For more than 20 years, Eurowindow has served with dedication, striving to create happy living spaces for customers…
            </p>
            <dl className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
              {stats.map(([num, label]) => (
                <div key={label} className="glass-card p-5 text-center backdrop-blur-xl">
                  <dd className="text-3xl font-extrabold tracking-tight text-[#E2C275] md:text-4xl">{num}</dd>
                  <dt className="mt-2 text-xs font-medium uppercase tracking-wider text-[#94A3B8]">{label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="overflow-hidden border-y border-[#E2C275]/30 bg-[#102238] py-5">
          <div className="animate-marquee flex w-max items-center gap-10">
            {[0, 1].map((dup) => (
              <span key={dup} className="flex items-center gap-10 whitespace-nowrap text-xl font-bold uppercase tracking-tight text-[#E2C275] md:text-2xl">
                {["Pioneer. Create. Accompany.", "Green building material solutions", "Present in hundreds of thousands of projects"].map((t) => (
                  <span key={t} className="flex items-center gap-10">{t}<span className="text-[#E2C275]/40">•</span></span>
                ))}
              </span>
            ))}
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="mx-auto grid max-w-[1320px] items-center gap-12 px-5 sm:px-8 md:grid-cols-2">
            <div className="order-2 md:order-1 space-y-6">
              <h2 className="text-3xl font-extrabold uppercase tracking-tight text-white md:text-4xl">Brand Journey</h2>
              <ul className="space-y-4">
                <li className="flex gap-4 items-start">
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#E2C275]" />
                  <p className="leading-relaxed text-[#D2D8E3]">2002 — Founded, pioneering European-standard uPVC doors in Vietnam.</p>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#E2C275]" />
                  <p className="leading-relaxed text-[#D2D8E3]">2012 — First achieved the Vietnam National Brand, starting 14 consecutive years of recognition.</p>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#E2C275]" />
                  <p className="leading-relaxed text-[#D2D8E3]">2020 — Expanded across aluminium, wood, automatic and roller door systems, glass products and interiors.</p>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#E2C275]" />
                  <p className="leading-relaxed text-[#D2D8E3]">Today — Products appear in hundreds of thousands of projects in Vietnam and abroad, from apartments and villas to key national landmarks.</p>
                </li>
              </ul>
            </div>
            <div className="order-1 glass-card p-3 md:order-2 backdrop-blur-2xl">
              <div className="overflow-hidden rounded-xl bg-[#102238]">
                <img src="/eurowindow/about-office.jpg.webp" alt="Eurowindow office building" className="aspect-[4/3] w-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#102238]/60 py-16 md:py-20">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <h2 className="text-3xl font-extrabold uppercase tracking-tight text-white md:text-4xl">Vision – Mission – Core Values</h2>
            <div className="mt-10 space-y-4">
              {accordions.map((item) => (
                <div key={item.id} className="glass-card overflow-hidden">
                  <button
                    type="button"
                    aria-expanded={open === item.id}
                    aria-controls={`panel-${item.id}`}
                    onClick={() => setOpen(open === item.id ? null : item.id)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-bold uppercase tracking-wide text-white transition hover:text-[#E2C275]"
                  >
                    {item.label}
                    <ChevronDown className={`h-5 w-5 shrink-0 text-[#E2C275] transition-transform ${open === item.id ? "rotate-180" : ""}`} />
                  </button>
                  {open === item.id ? (
                    <div id={`panel-${item.id}`} className="border-t border-white/10 px-6 py-5 text-[#D2D8E3] whitespace-pre-line leading-8">{item.text}</div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <h2 className="text-center text-3xl font-extrabold uppercase tracking-tight text-white md:text-4xl">Eurowindow Solutions</h2>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {services.map((service) => (
                <article key={service.title} className="glass-card glass-card-hover group relative min-h-[420px] overflow-hidden p-6">
                  <img src={service.image} alt={service.title} className="absolute inset-0 h-full w-full object-cover opacity-35 transition duration-700 group-hover:scale-105 group-hover:opacity-50" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071523] via-[#071523]/60 to-transparent" />
                  <div className="relative flex h-full flex-col justify-end">
                    <h3 className="text-xl font-extrabold leading-tight text-white transition group-hover:text-[#E2C275]">{service.title}</h3>
                    <p className="mt-3 text-sm font-normal leading-relaxed text-[#D2D8E3]">{service.text}</p>
                    <Link href="/en/products" className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E2C275] transition hover:text-white">View more <ArrowRight className="h-4 w-4" /></Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#102238]/60 py-16 md:py-20">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <h2 className="text-3xl font-extrabold uppercase tracking-tight text-white md:text-4xl">Awards &amp; Recognition</h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {awards.map(([year, title, org]) => (
                <div key={year} className="glass-card glass-card-hover p-8">
                  <Award className="h-8 w-8 text-[#E2C275]" />
                  <p className="mt-4 text-xs font-bold uppercase tracking-widest text-[#E2C275]">{year}</p>
                  <h3 className="mt-2 text-lg font-bold leading-snug text-white">{title}</h3>
                  <p className="mt-3 text-xs text-[#94A3B8]">{org}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <div className="mb-12 flex items-end justify-between gap-6">
              <h2 className="text-3xl font-extrabold uppercase tracking-tight text-white md:text-4xl">Featured Projects</h2>
              <Link href="/en/projects" className="hidden items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E2C275] md:inline-flex hover:text-[#F0D18A]">View all <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <article key={project.title} className="glass-card glass-card-hover group overflow-hidden p-5">
                  <div className="aspect-[16/10] overflow-hidden rounded-xl bg-[#102238]">
                    <img src={project.image} alt={project.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex items-end justify-between gap-4 pt-5">
                    <div>
                      <h3 className="text-lg font-bold text-white transition group-hover:text-[#E2C275]">{project.title}</h3>
                      <p className="mt-1 text-xs text-[#94A3B8]">{project.location}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 shrink-0 text-[#E2C275] transition-transform group-hover:translate-x-1" />
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
