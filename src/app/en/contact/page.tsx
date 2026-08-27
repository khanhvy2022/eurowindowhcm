"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageBanner from "@/components/PageBanner";
import { contact } from "@/data/eurowindow";
import {
  Building2,
  CheckCircle2,
  Clock,
  Headphones,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const productOptions = [
  "Aluminium doors & curtain walls (EA55 - EA95i)",
  "European standard uPVC doors",
  "Natural & engineered wood doors",
  "Fire-resistant wood doors (60 - 120 mins)",
  "Glass products (Laminated, Tempered, Low-E, Insulated)",
  "Smart automatic sliding & revolving doors",
  "Aluminium roller doors",
  "Complete architectural solutions",
];

const commitments = [
  {
    icon: Headphones,
    title: "24/7 Free Consultation",
    desc: "Our experienced engineering team is always ready to advise on the optimal design solutions.",
  },
  {
    icon: Clock,
    title: "Fast Quotation Within 24H",
    desc: "On-site survey and transparent cost estimation with detailed CAD drawings.",
  },
  {
    icon: ShieldCheck,
    title: "Up to 10-Year Genuine Warranty",
    desc: "Commitment to profile quality, synchronized hardware and on-site periodic maintenance.",
  },
];

export default function EnContactPage() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    product: productOptions[0],
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.phone.trim()) {
      alert("Please enter your full name and phone number.");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#071523] text-white">
      <Header lang="en" />

      <PageBanner
        title="Contact Eurowindow"
        sub="Partnering with clients to create modern, secure and world-class architectural spaces nationwide."
        crumb="Contact"
        homeHref="/en"
        bgImage="/eurowindow/banner-02-1.png.webp"
      />

      <main className="mx-auto max-w-[1320px] px-5 py-14 sm:px-8 lg:py-20">
        {/* Top Feature Cards */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-[#E2C275]/50 hover:bg-white/[0.08]">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E2C275]/10 text-[#E2C275] transition group-hover:scale-110">
              <Phone className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
              24/7 Hotline
            </h3>
            <a
              href={`tel:${contact.hotline.replace(/\s+/g, "")}`}
              className="mt-1 block text-xl font-extrabold text-[#E2C275] hover:underline"
            >
              {contact.hotline}
            </a>
            <p className="mt-2 text-xs text-[#D2D8E3]">
              Technical consultation & prompt quotation for all projects.
            </p>
          </div>

          <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-[#E2C275]/50 hover:bg-white/[0.08]">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E2C275]/10 text-[#E2C275] transition group-hover:scale-110">
              <Mail className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
              Official Email
            </h3>
            <a
              href={`mailto:${contact.email}`}
              className="mt-1 block text-base font-bold text-white hover:text-[#E2C275]"
            >
              {contact.email}
            </a>
            <p className="mt-2 text-xs text-[#D2D8E3]">
              Feedback on design dossiers & BOQ within 2 working hours.
            </p>
          </div>

          <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-[#E2C275]/50 hover:bg-white/[0.08]">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E2C275]/10 text-[#E2C275] transition group-hover:scale-110">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
              Southern Branch
            </h3>
            <p className="mt-1 text-sm font-semibold leading-snug text-white">
              39 Bis Mac Dinh Chi, Tan Dinh Ward, HCMC
            </p>
            <p className="mt-2 text-xs text-[#D2D8E3]">
              Experience showroom for premium architectural door systems.
            </p>
          </div>

          <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-[#E2C275]/50 hover:bg-white/[0.08]">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E2C275]/10 text-[#E2C275] transition group-hover:scale-110">
              <Building2 className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
              Headquarters
            </h3>
            <p className="mt-1 text-sm font-semibold leading-snug text-white">
              Eurowindow Office, 02 Ton That Tung, Hanoi
            </p>
            <p className="mt-2 text-xs text-[#D2D8E3]">
              Executive operations & nationwide project management center.
            </p>
          </div>
        </section>

        {/* Main Grid: Form + Address Info */}
        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/15 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-2xl sm:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#E2C275]/30 bg-[#E2C275]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#E2C275]">
                <Sparkles className="h-3.5 w-3.5" /> Request Quotation
              </div>
              <h2 className="mt-4 text-2xl font-black uppercase text-white sm:text-3xl">
                On-site Survey & Consultation
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#D2D8E3]">
                Please leave your project information below. An Eurowindow technical specialist will get in touch and provide a tailored proposal.
              </p>

              {submitted ? (
                <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-8 text-center backdrop-blur-xl">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-white">
                    Request submitted successfully!
                  </h3>
                  <p className="mt-2 text-sm text-emerald-200/90">
                    Thank you. Our technical engineering team will reach out to you via <strong>{form.phone}</strong> shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        fullName: "",
                        phone: "",
                        email: "",
                        address: "",
                        product: productOptions[0],
                        message: "",
                      });
                    }}
                    className="mt-6 rounded-xl border border-emerald-500/40 px-5 py-2 text-xs font-bold uppercase tracking-wider text-emerald-300 hover:bg-emerald-500/20 transition"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#D2D8E3]">
                        Full name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        placeholder="John Doe"
                        className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none backdrop-blur-md transition focus:border-[#E2C275] focus:ring-1 focus:ring-[#E2C275]/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#D2D8E3]">
                        Phone number <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+84 966 994 338"
                        className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none backdrop-blur-md transition focus:border-[#E2C275] focus:ring-1 focus:ring-[#E2C275]/50"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#D2D8E3]">
                        Email (optional)
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="john@example.com"
                        className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none backdrop-blur-md transition focus:border-[#E2C275] focus:ring-1 focus:ring-[#E2C275]/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#D2D8E3]">
                        Project address / Location
                      </label>
                      <input
                        type="text"
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        placeholder="District 1, HCMC / Da Nang / Hanoi"
                        className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none backdrop-blur-md transition focus:border-[#E2C275] focus:ring-1 focus:ring-[#E2C275]/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#D2D8E3]">
                      Product line of interest
                    </label>
                    <select
                      value={form.product}
                      onChange={(e) => setForm({ ...form, product: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-white/15 bg-[#102238] px-4 py-3 text-sm text-white outline-none backdrop-blur-md transition focus:border-[#E2C275] focus:ring-1 focus:ring-[#E2C275]/50"
                    >
                      {productOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#071523] text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#D2D8E3]">
                      Message / Estimated dimensions
                    </label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="e.g., 3-storey villa project, requiring quote for 12 swing aluminium doors and 8 glass curtain panels..."
                      className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none backdrop-blur-md transition focus:border-[#E2C275] focus:ring-1 focus:ring-[#E2C275]/50"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-gold-luxury flex w-full items-center justify-center gap-2 py-3.5 text-sm font-extrabold uppercase tracking-wider"
                  >
                    {submitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        <Send className="h-4 w-4" /> Request Consultation
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Office info & Commitments (5 cols) */}
          <div className="space-y-8 lg:col-span-5">
            <div className="rounded-3xl border border-white/15 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#E2C275]">
                Headquarters & Branch Network
              </h3>

              <div className="mt-6 space-y-6 text-sm">
                <div className="border-l-2 border-[#E2C275] pl-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#E2C275]">
                    Southern Region
                  </div>
                  <div className="mt-1 font-bold text-white">
                    Ho Chi Minh City Branch
                  </div>
                  <div className="mt-1 text-xs text-[#D2D8E3]">
                    39 Bis Mac Dinh Chi, Tan Dinh Ward, District 1, HCMC
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-[#E2C275]">
                    <Phone className="h-3.5 w-3.5" /> Hotline: 0966 994 338
                  </div>
                </div>

                <div className="border-l-2 border-white/30 pl-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                    Northern Region (Headquarters)
                  </div>
                  <div className="mt-1 font-bold text-white">
                    Eurowindow Office Building
                  </div>
                  <div className="mt-1 text-xs text-[#D2D8E3]">
                    02 Ton That Tung, Kim Lien, Dong Da, Hanoi
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-[#D2D8E3]">
                    <Phone className="h-3.5 w-3.5" /> Hotline: 0966 994 338
                  </div>
                </div>

                <div className="border-l-2 border-white/30 pl-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                    Central Region
                  </div>
                  <div className="mt-1 font-bold text-white">
                    Da Nang Branch
                  </div>
                  <div className="mt-1 text-xs text-[#D2D8E3]">
                    02 Nguyen Huu Tho, Hai Chau Dist, Da Nang City
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-[#D2D8E3]">
                    <Phone className="h-3.5 w-3.5" /> Hotline: 0966 994 338
                  </div>
                </div>
              </div>
            </div>

            {/* Commitments Box */}
            <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-[#102238] to-[#071523] p-6 backdrop-blur-xl sm:p-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#E2C275]">
                Eurowindow Commitments
              </h3>
              <div className="mt-5 space-y-4">
                {commitments.map((c, i) => {
                  const Icon = c.icon;
                  return (
                    <div key={i} className="flex items-start gap-3.5">
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E2C275]/10 text-[#E2C275]">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wide text-white">
                          {c.title}
                        </h4>
                        <p className="mt-0.5 text-xs leading-5 text-[#D2D8E3]">
                          {c.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer lang="en" />
    </div>
  );
}
