"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { achievements, heroBg, introImage } from "@/data/eurowindow";
import { ArrowLeft, ArrowRight, ChevronRight, MapPin } from "lucide-react";
import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const statistics = [
  ["2002", "YEAR OF FOUNDING"],
  ["20+", "YEARS OF EXPERIENCE"],
  ["100,000+", "PROJECTS DELIVERED"],
  ["14", "CONSECUTIVE NATIONAL BRAND YEARS"],
] as const;

const featuredProjects = [
  { title: "Phu Bai International Airport", location: "National landmark", image: "/eurowindow/constructions/viber-image-2025-02-05-13-33-24-065.png.webp" },
  { title: "Hospital Francais de Hanoi", location: "Hospital", image: "/eurowindow/constructions/img-7105.jpg.webp" },
  { title: "Da Nang Oncology Hospital", location: "Hospital", image: "/eurowindow/constructions/benh-vien-ung-buou-da-nang-17.jpg.webp" },
  { title: "Children's Hospital 2 Ho Chi Minh City", location: "Hospital", image: "/eurowindow/constructions/dji-0090-1.jpg.webp" },
  { title: "Vietnam News Agency TV Centre", location: "Government building", image: "/eurowindow/constructions/img-7172.jpg.webp" },
  { title: "Supreme People's Procuracy", location: "Government building", image: "/eurowindow/constructions/20191115-vien-kiem-soat-nhan-dan-toi-cao-0038.jpg.webp" },
] as const;

const services = [
  { title: "ALUMINIUM DOORS", text: "Premium aluminium door and partition systems in EA55–EA95i profiles with genuine Cmech, Roto and Hafele hardware.", image: "/eurowindow/cuanhom.jpg.webp", href: "/en/products/cua-nhom-vach-kinh" },
  { title: "uPVC DOORS", text: "European-standard uPVC doors with outstanding acoustic and thermal insulation — the product that made Eurowindow famous since 2002.", image: "/eurowindow/cuanhua1.jpg.webp", href: "/en/products/cua-upvc" },
  { title: "WOODEN DOORS", text: "Natural, engineered and fire-resistant wooden doors — luxurious, durable and safe for every project.", image: "/eurowindow/cuagotrangchu.jpg.webp", href: "/en/products/cua-go-va-go-chong-chay" },
  { title: "GLASS PRODUCTS", text: "Insulated glazing, Low-E glass, switchable smart glass and automatic sliding glass partitions.", image: "/eurowindow/san-pham-kinh.jpg.webp", href: "/en/products/san-pham-kinh" },
  { title: "AUTOMATIC DOORS", text: "Sliding, revolving and vertical-lift automatic door systems for modern commercial buildings.", image: "/eurowindow/cua-tu-dong.jpg.webp", href: "/en/products/cua-tu-dong-va-cua-xoay" },
  { title: "ROLLER DOORS", text: "Safe, smooth-operating roller doors for shops, warehouses and homes to Eurowindow standards.", image: "/eurowindow/cua-cuon.jpg.webp", href: "/en/products/cua-cuon-nhom-khe-thoang" },
] as const;

const categoriesEn = [
  ["NATIONAL LANDMARKS", "/eurowindow/constructions/viber-image-2025-02-05-13-33-24-065.png.webp"],
  ["OFFICE & RESIDENCE TOWERS", "/eurowindow/constructions/img-7172.jpg.webp"],
  ["RESIDENTIAL", "/eurowindow/constructions/dji-0090-1.jpg.webp"],
  ["HOSPITALS", "/eurowindow/constructions/img-7105.jpg.webp"],
  ["AIRPORTS & TERMINALS", "/eurowindow/upvc4.png.webp"],
  ["GOVERNMENT BUILDINGS", "/eurowindow/constructions/20191115-vien-kiem-soat-nhan-dan-toi-cao-0038.jpg.webp"],
] as const;

const articles = [
  { slug: "toa-dam-xu-huong-nguon-nhan-luc", title: "Eurowindow hosted a talk on human-resource trends and management strategy", image: "/eurowindow/toa-dam-1.png.webp" },
  { slug: "cua-vach-kinh-vinhomes-global-gate", title: "Eurowindow supplies doors & glass partitions for Vinhomes Global Gate Co Loa", image: "/eurowindow/img-0344.jpeg.webp" },
  { slug: "giai-phap-cua-chong-nong-mua-he-2026", title: "Eurowindow heat-proof door solutions for summer 2026", image: "/eurowindow/cua-nhom-kinh-cach-am-1.jpg.webp" },
  { slug: "nen-chon-cua-gi-cho-mua-he-nang-nong", title: "Which door should you choose for hot summer weather?", image: "/eurowindow/z7978260236950-59ec572c33f7b933b6e48fae6107511b.jpg" },
] as const;

const introParagraphs = [
  "In 2002, Eurowindow pioneered the introduction of modern European-standard uPVC doors into the domestic market — a revolution in doors that opened a 'new era' for Vietnamese homes.",
  "For over two decades Eurowindow has kept pioneering new technology and expanded its product range: uPVC doors, aluminium doors, large aluminium-glass partitions, wooden doors, fire-resistant doors, automatic doors, roller doors, glass products and interiors.",
  "Always leading demand and creating new consumer trends, Eurowindow contributes to shaping the architectural face of cities. Eurowindow products appear in hundreds of thousands of projects in Vietnam and abroad — from apartments, villas, offices, hotels and hospitals to national landmarks such as the National Assembly, the Government Office and international airports.",
  "Accompanying customers from consultation, design and construction to maintenance and warranty, Eurowindow aims to deliver distinctive experiences and build a prosperous life for society.",
];

const marqueeText = "EUROWINDOW | PIONEER. CREATE. ACCOMPANY.";

export default function HomeEn() {
  return (
    <div className="min-h-screen bg-[#0b1628] text-white">
      <Header lang="en" />
      <main>
        <section className="relative overflow-hidden bg-[#0b1628] text-white">
          <div className="absolute inset-0">
            <img src={heroBg} alt="" className="h-full w-full object-cover object-center" />
                <div className="absolute inset-0 bg-[#0b1628]/85" />
          </div>
          <div className="relative mx-auto grid min-h-[438px] max-w-[1280px] items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:py-10">
            <div className="self-center">
              <p className="mb-4 text-[15px] font-bold uppercase tracking-[-0.02em]">EUROWINDOW</p>
              <h1 className="text-[42px] font-bold leading-[1.12] tracking-[-0.055em] sm:text-[52px] lg:text-[62px]">
                PIONEERING<br />
                <span className="text-[#4da6e0]">SUSTAINABLE</span><br />
                LIVING SPACES
              </h1>
              <Link href="/en/about" className="mt-12 inline-flex items-center gap-3 text-base font-bold uppercase transition hover:text-[#4da6e0]">
                Learn more
                <span className="flex h-11 w-11 items-center justify-center bg-[#0066aa] transition-transform hover:scale-105"><ChevronRight className="h-6 w-6" strokeWidth={3} /></span>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-9 lg:gap-x-20 lg:gap-y-12">
              {statistics.map(([value, label]) => (
                <div key={label} className="border-b border-white/35 pb-4">
                  <p className="text-[34px] font-bold leading-none tracking-[-0.055em] sm:text-[42px]">{value}</p>
                  <p className="mt-4 text-[14px] font-medium uppercase leading-none">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[146px] overflow-hidden border-y border-white/30 bg-black/20">
            <div className="hero-marquee-track" aria-hidden="true">
              {[0, 1].map((copy) => (
                <div key={copy} className="hero-marquee-group">
                  {[0, 1].map((item) => <span key={item}>{marqueeText}</span>)}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-[#0b1628] py-16 text-white md:py-24 lg:py-28">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <div className="mb-12 flex items-start justify-between gap-6 md:mb-16">
              <h2 className="text-[30px] font-bold leading-none tracking-[-0.055em] sm:text-[40px] lg:text-[44px]">
                <span className="mr-1 inline-block bg-[#0066aa] px-2 py-1.5">ABOUT</span>
                EUROWINDOW
              </h2>
              <Link href="/en/about" className="mt-1 hidden items-center gap-3 whitespace-nowrap text-sm font-bold uppercase transition-colors hover:text-[#4da6e0] sm:inline-flex">
                Learn more <ArrowRight className="h-5 w-5" strokeWidth={3} />
              </Link>
            </div>
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.98fr)_minmax(460px,1fr)] lg:gap-16">
              <div className="max-w-[650px] space-y-4 text-[15px] font-bold leading-[1.95] text-[#f3f3f3] sm:text-base">
                {introParagraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
              <div className="mx-auto w-full max-w-[650px]">
                <img src={introImage} alt="Eurowindow – leading green building material solutions provider" className="h-auto w-full object-contain" />
              </div>
            </div>
            <Link href="/en/about" className="mt-9 inline-flex items-center gap-3 py-3 text-sm font-bold uppercase sm:hidden">Learn more <ArrowRight className="h-5 w-5" strokeWidth={3} /></Link>
          </div>
        </section>

        <section className="bg-white py-20 text-zinc-950 md:py-28">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <div className="mb-12 flex items-end justify-between gap-6">
              <h2 className="text-4xl font-bold uppercase tracking-[-0.055em] md:text-5xl">FEATURED PROJECTS</h2>
              <Link href="/en/projects" className="hidden items-center gap-3 text-sm font-bold uppercase md:inline-flex">View all <ArrowRight className="h-5 w-5" /></Link>
            </div>
            <div className="grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <Link key={project.title} href="/en/projects" className="group overflow-hidden bg-zinc-100">
                  <div className="aspect-[1.2] overflow-hidden bg-zinc-200">
                    <img src={project.image} alt={project.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex items-end justify-between gap-4 p-5">
                    <div>
                      <h3 className="text-xl font-bold tracking-[-0.035em]">{project.title}</h3>
                      <p className="mt-2 flex items-center gap-1.5 text-sm text-zinc-600"><MapPin className="h-4 w-4" />{project.location}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0b1628] py-20 text-white md:py-28">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <h2 className="mb-12 text-4xl font-bold uppercase tracking-[-0.055em] md:text-5xl">EUROWINDOW PRODUCTS</h2>
            <div className="grid gap-5 md:grid-cols-3">
              {services.map((service) => (
                <article key={service.title} className="group relative min-h-[430px] overflow-hidden bg-zinc-800 p-7">
                  <img src={service.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50 transition duration-700 group-hover:scale-105 group-hover:opacity-65" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10" />
                  <div className="relative flex h-full flex-col justify-end">
                    <h3 className="max-w-[280px] text-2xl font-bold leading-tight">{service.title}</h3>
                    <p className="mt-4 max-w-sm text-sm font-medium leading-7 text-zinc-200">{service.text}</p>
                    <Link href={service.href} className="mt-7 inline-flex items-center gap-2 py-3 text-sm font-bold uppercase">Learn more <ArrowRight className="h-4 w-4" /></Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0b1628] py-20 text-white md:py-28">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <div className="mb-12 flex items-end justify-between gap-6">
              <h2 className="text-4xl font-bold uppercase tracking-[-0.055em] md:text-5xl">PROJECT CATEGORIES</h2>
              <Link href="/en/projects" className="hidden items-center gap-3 text-sm font-bold uppercase md:inline-flex">View all <ArrowRight className="h-5 w-5" /></Link>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
              {categoriesEn.map(([title, image]) => (
                <Link key={title} href="/en/projects" className="group relative aspect-[1.08] overflow-hidden bg-zinc-800">
                  <img src={image} alt="" className="h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-90" />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-5 pb-5 pt-14 text-base font-bold uppercase sm:text-xl">{title}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20 text-zinc-950 md:py-28">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <div className="mb-12 flex items-end justify-between gap-6">
              <h2 className="text-4xl font-bold uppercase tracking-[-0.055em] md:text-5xl">NEWS</h2>
            </div>
            <div className="slider-nav-wrapper group relative">
              <Swiper modules={[Navigation, Pagination]} navigation={{ prevEl: ".news-prev", nextEl: ".news-next" }} pagination={{ el: ".news-pagination", clickable: true }} spaceBetween={20} slidesPerView={1.1} breakpoints={{ 640: { slidesPerView: 2.1 }, 1024: { slidesPerView: 3 } }}>
                {articles.map((article) => (
                  <SwiperSlide key={article.slug}>
                    <Link href={`/en/news/${article.slug}`} className="group block">
                      <div className="aspect-[1.45] overflow-hidden bg-zinc-200"><img src={article.image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /></div>
                      <h3 className="mt-5 text-xl font-bold leading-snug tracking-[-0.03em]">{article.title}</h3>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold uppercase">Read more <ArrowRight className="h-4 w-4" /></span>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
              <button type="button" className="news-prev slider-nav-btn slider-nav-prev" aria-label="Previous article"><ArrowLeft className="h-5 w-5" /></button>
              <button type="button" className="news-next slider-nav-btn slider-nav-next" aria-label="Next article"><ArrowRight className="h-5 w-5" /></button>
              <div className="news-pagination mt-8 flex justify-center" />
            </div>
          </div>
        </section>

        <section className="bg-[#0b1628] overflow-hidden py-16 text-white md:py-24">
          <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
            <h2 className="mb-14 text-4xl font-bold uppercase tracking-[-0.055em] md:text-5xl"><span className="mr-1 inline-block bg-[#0066aa] px-2 py-1">KEY</span>ACHIEVEMENTS</h2>
          </div>
          <Swiper modules={[Autoplay]} autoplay={{ delay: 2400, disableOnInteraction: false }} loop speed={750} spaceBetween={18} slidesPerView={1.8} breakpoints={{ 640: { slidesPerView: 3.2 }, 1024: { slidesPerView: 5.2 }, 1440: { slidesPerView: 6.2 } }} className="!overflow-visible">
            {achievements.map((logo) => (
              <SwiperSlide key={logo}>
                <div className="flex h-28 items-center justify-center px-4 md:h-32">
                  <img src={logo} alt="" className="aspect-[12/7] w-[194px] max-w-full object-contain grayscale transition-[filter] duration-500 hover:grayscale-0" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </main>
      <Footer lang="en" />
    </div>
  );
}
