import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageBanner from "@/components/PageBanner";
import { getProject, projects } from "@/app/du-an/projects";
import { MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Không tìm thấy dự án" };

  const canonical = `https://eurowindowhcm.com/du-an/${slug}`;
  const title = `Dự Án ${project.title} – Eurowindow Thi Công`;
  const description = `${project.intro} Vị trí: ${project.location}. Hạng mục thi công: ${project.scope}.`;
  const imageUrl = project.images?.[0] ? `https://eurowindowhcm.com${project.images[0]}` : "https://eurowindowhcm.com/eurowindow/cuanhom.jpg.webp";

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "vi_VN",
      siteName: "Cửa Eurowindow Hồ Chí Minh",
      title,
      description,
      url: canonical,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const related = projects.filter((p) => p.category === project.category && p.slug !== project.slug).slice(0, 3);
  const canonicalUrl = `https://eurowindowhcm.com/du-an/${project.slug}`;
  const imageUrl = project.images?.[0] ? `https://eurowindowhcm.com${project.images[0]}` : "https://eurowindowhcm.com/eurowindow/cuanhom.jpg.webp";

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: `Dự Án ${project.title} – Eurowindow Thi Công`,
    description: project.intro,
    image: project.images.map((img) => `https://eurowindowhcm.com${img}`),
    url: canonicalUrl,
    creator: {
      "@type": "Organization",
      name: "Cửa Eurowindow Hồ Chí Minh",
      url: "https://eurowindowhcm.com",
    },
    locationCreated: {
      "@type": "Place",
      name: project.location,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Trang chủ",
        item: "https://eurowindowhcm.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Dự án",
        item: "https://eurowindowhcm.com/du-an",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#071523] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main>
        <PageBanner
          title={project.title}
          crumb={project.title}
          bgImage={project.images[0]}
        />

        <section className="pb-20 pt-12">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {project.images.map((img, i) => (
                  <div key={i} className="relative aspect-square overflow-hidden bg-[#152B45]">
                    <Image src={img} alt={project.title} fill className="object-cover" sizes="(max-width: 768px) 50vw, 33vw" />
                  </div>
                ))}
              </div>

              <div className="space-y-5">
                <h2 className="text-2xl font-bold uppercase tracking-[-0.04em]">Thông tin dự án</h2>
                <table className="w-full border-collapse text-sm">
                  <tbody>
                    <tr className="border-b border-white/10"><th className="py-3 text-left font-medium text-[#94A3B8]">Danh mục</th><td className="py-3">{project.category}</td></tr>
                    <tr className="border-b border-white/10"><th className="py-3 text-left font-medium text-[#94A3B8]">Địa điểm</th><td className="py-3 flex items-center gap-1.5"><MapPin className="h-4 w-4 text-[#E2C275]" />{project.location}</td></tr>
                    <tr className="border-b border-white/10"><th className="py-3 text-left font-medium text-[#94A3B8]">Năm</th><td className="py-3">{project.year}</td></tr>
                    <tr className="border-b border-white/10"><th className="py-3 text-left font-medium text-[#94A3B8]">Quy mô</th><td className="py-3">{project.area}</td></tr>
                    <tr className="border-b border-white/10"><th className="py-3 text-left font-medium text-[#94A3B8]">Phạm vi PP</th><td className="py-3">{project.scope}</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-14">
              <h3 className="text-sm font-bold uppercase tracking-wide text-[#E2C275]">Mô tả dự án</h3>
              <p className="mt-5 leading-8 text-[#D2D8E3]">{project.intro}</p>
            </div>

            {related.length > 0 ? (
              <div className="mt-16">
                <h3 className="text-2xl font-bold uppercase tracking-[-0.04em]">Dự án liên quan</h3>
                <div className="mt-8 grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
                  {related.map((p) => (
                    <Link key={p.slug} href={`/du-an/${p.slug}`} className="group overflow-hidden bg-[#102238]">
                      <div className="aspect-[1.2] overflow-hidden bg-[#152B45]">
                        <img src={p.images[0]} alt={p.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                      </div>
                      <div className="p-5">
                        <h4 className="text-xl font-bold tracking-[-0.035em]">{p.title}</h4>
                        <p className="mt-2 flex items-center gap-1.5 text-sm text-[#94A3B8]"><MapPin className="h-4 w-4" />{p.location}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
