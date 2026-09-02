"use client";

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
    title: "ALUMINIUM DOORS & CURTAIN WALLS",
    text: "Premium aluminium systems, genuine Cmech, Roto, Hafele hardware — overcoming all limitations of conventional aluminium.",
    image: "/eurowindow/cuanhom.jpg.webp",
  },
  {
    title: "WOOD & FIRE-RATED WOOD DOORS",
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

export default function AboutClient() {
  const [open, setOpen] = useState<string | null>("vision");

  return (
    <>
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
            <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              <img
                src="/eurowindow/gioithieu.jpg.webp"
                alt="Eurowindow Headquarters"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/10 bg-[#071523] py-16">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
            {stats.map(([val, label]) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-extrabold text-[#E2C275] md:text-4xl">{val}</div>
                <div className="mt-2 text-xs uppercase tracking-wider text-[#94A3B8]">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission Accordion */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold uppercase text-white md:text-4xl">
              VISION, MISSION &amp; CORE VALUES
            </h2>
          </div>
          <div className="mx-auto max-w-3xl space-y-4">
            {accordions.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-[#071523]"
              >
                <button
                  type="button"
                  onClick={() => setOpen(open === item.id ? null : item.id)}
                  className="flex w-full items-center justify-between p-6 text-left font-bold text-white transition hover:text-[#E2C275]"
                >
                  <span className="text-lg uppercase">{item.label}</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform duration-300 ${
                      open === item.id ? "rotate-180 text-[#E2C275]" : ""
                    }`}
                  />
                </button>
                {open === item.id && (
                  <div className="border-t border-white/5 p-6 pt-2 text-sm leading-relaxed text-[#D2D8E3] whitespace-pre-line">
                    {item.text}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="bg-[#071523] py-16 md:py-24">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold uppercase text-white md:text-4xl">
              PRODUCT ECOSYSTEM
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {services.map((s, idx) => (
              <div key={idx} className="group overflow-hidden rounded-3xl border border-white/10 bg-[#0b1628]">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white group-hover:text-[#E2C275]">{s.title}</h3>
                  <p className="mt-3 text-xs leading-relaxed text-[#D2D8E3]">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold uppercase text-white md:text-4xl">
              RECOGNITION &amp; AWARDS
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {awards.map(([metric, title, org], idx) => (
              <div key={idx} className="glass-card rounded-2xl p-8 text-center">
                <div className="text-3xl font-black text-[#E2C275]">{metric}</div>
                <h4 className="mt-3 text-base font-bold text-white">{title}</h4>
                <p className="mt-1 text-xs text-[#94A3B8]">{org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Landmark Projects */}
      <section className="bg-[#071523] py-16 md:py-24">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold uppercase text-white md:text-4xl">
              SIGNATURE PROJECTS
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, idx) => (
              <div key={idx} className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0b1628]">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#E2C275]">{p.location}</span>
                    <h4 className="text-sm font-bold text-white">{p.title}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
