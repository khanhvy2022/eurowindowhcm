"use client";

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
    desc: "Commitment to profile quality, synchronized hardware accessories, and periodic maintenance.",
  },
];

export default function ContactClient() {
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
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    if (!form.fullName.trim() || !form.phone.trim()) {
      setErrorMessage("Please enter your name and phone number.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.error || "An error occurred while submitting. Please try again.");
      }
    } catch {
      setErrorMessage("Unable to connect to server. Please call hotline 0966 994 338.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageBanner
        title="Contact Eurowindow"
        sub="Partnering with clients to create modern, secure, and world-class living spaces across Vietnam."
        crumb="Contact"
        homeHref="/en"
      />

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          {/* Quick Contact Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#E2C275]/15 text-[#E2C275]">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                Southern Hotline
              </h3>
              <p className="mt-2 text-lg font-bold text-white">
                <a href={`tel:${contact.hotline.replace(/\s+/g, "")}`} className="hover:text-[#E2C275]">
                  {contact.hotline}
                </a>
              </p>
              <p className="mt-1 text-xs text-[#94A3B8]">(84 - 28) 6278 8124</p>
            </div>

            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#E2C275]/15 text-[#E2C275]">
                <Headphones className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                Northern Hotline
              </h3>
              <p className="mt-2 text-lg font-bold text-white">
                <a href={`tel:${contact.hotlineNorth.replace(/\s+/g, "")}`} className="hover:text-[#E2C275]">
                  {contact.hotlineNorth}
                </a>
              </p>
              <p className="mt-1 text-xs text-[#94A3B8]">(84 - 24) 37 47 47 00</p>
            </div>

            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#E2C275]/15 text-[#E2C275]">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                Email Inquiries
              </h3>
              <p className="mt-2 text-sm font-bold text-white">
                <a href={`mailto:${contact.email}`} className="hover:text-[#E2C275]">
                  {contact.email}
                </a>
              </p>
              <p className="mt-1 text-xs text-[#94A3B8]">Response within 24h</p>
            </div>

            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#E2C275]/15 text-[#E2C275]">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                HCM Showroom
              </h3>
              <p className="mt-2 text-sm font-bold text-white">
                39 Bis Mạc Đĩnh Chi, P. Tân Định, TP.HCM
              </p>
              <p className="mt-1 text-xs text-[#94A3B8]">Hours: 08:00 - 18:00</p>
            </div>
          </div>

          {/* Form + Information */}
          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left: Contact Form (7 cols) */}
            <div className="glass-card rounded-3xl p-8 sm:p-10 lg:col-span-7">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E2C275]">
                <Sparkles className="h-4 w-4" />
                <span>Online Consultation</span>
              </div>
              <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
                Send Us Your Project Inquiry
              </h2>
              <p className="mt-2 text-xs text-[#D2D8E3]">
                Provide your details below; an Eurowindow engineer will contact you for survey and optimal quotation within 24h.
              </p>

              {submitted ? (
                <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-white">
                    Inquiry Submitted Successfully!
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#D2D8E3]">
                    Thank you for trusting Eurowindow. Our technical consultant will contact you via{" "}
                    <strong className="text-[#E2C275]">{form.phone}</strong> shortly.
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
                    className="btn-primary mt-6 px-6 py-2.5 text-xs uppercase tracking-wider"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  {errorMessage && (
                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-300">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        placeholder="John Doe"
                        className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-[#E2C275] focus:bg-white/10"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                        Phone Number <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="09xx xxx xxx"
                        className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-[#E2C275] focus:bg-white/10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="email@example.com"
                        className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-[#E2C275] focus:bg-white/10"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                        Project Location
                      </label>
                      <input
                        type="text"
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        placeholder="District, City..."
                        className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-[#E2C275] focus:bg-white/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                      Product of Interest
                    </label>
                    <select
                      value={form.product}
                      onChange={(e) => setForm({ ...form, product: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-[#071523] px-4 py-3 text-sm text-white outline-none transition focus:border-[#E2C275]"
                    >
                      {productOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#071523] text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                      Project Requirements / Message
                    </label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Brief overview of your project, requirements, or drawings..."
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-[#E2C275] focus:bg-white/10"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary flex w-full items-center justify-center gap-2 py-4 text-xs font-bold uppercase tracking-wider"
                  >
                    {submitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        <Send className="h-4 w-4" /> Request Free Consultation
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-[#94A3B8]">
                    100% data privacy guaranteed according to international standards.
                  </p>
                </form>
              )}
            </div>

            {/* Right: Commitments & Network info (5 cols) */}
            <div className="space-y-6 lg:col-span-5">
              {/* Commitments */}
              <div className="glass-card rounded-3xl p-8">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#E2C275]">
                  Our Quality Commitment
                </h3>
                <div className="mt-6 space-y-6">
                  {commitments.map((c, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E2C275]/15 text-[#E2C275]">
                        <c.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{c.title}</h4>
                        <p className="mt-1 text-xs leading-relaxed text-[#D2D8E3]">{c.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Office Details */}
              <div className="glass-card rounded-3xl p-8">
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#E2C275]">
                  <Building2 className="h-4 w-4" />
                  <span>Headquarters &amp; Branches</span>
                </h3>

                <div className="mt-6 space-y-6 text-sm">
                  <div className="border-l-2 border-[#E2C275] pl-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#E2C275]">
                      Southern Region
                    </div>
                    <div className="mt-1 font-bold text-white">
                      Eurowindow Miền Nam
                    </div>
                    <div className="mt-1 text-xs text-[#D2D8E3]">
                      39 Bis Mạc Đĩnh Chi, Phường Tân Định, TP. Hồ Chí Minh
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-[#E2C275]">
                      <Phone className="h-3.5 w-3.5" /> Hotline: 0966 994 338 &bull; (84 - 28) 6278 8124
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
                    <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-[#94A3B8]">
                      <Phone className="h-3.5 w-3.5" /> Hotline: 0909 888 000 &bull; (84 - 24) 37 47 47 00
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
                      152 Phan Dang Luu, Hoa Cuong Ward, Da Nang
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-[#94A3B8]">
                      <Phone className="h-3.5 w-3.5" /> Hotline: 0906 000 111 &bull; (84 - 236) 3 582 877
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
