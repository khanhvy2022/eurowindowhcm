import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NewsListClient from "@/components/NewsListClient";
import PageBanner from "@/components/PageBanner";
import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Tin dự án Eurowindow | Dự án tiêu biểu",
  description: "Tổng hợp tin tức, hình ảnh và giải pháp cửa, vách kính Eurowindow cho các dự án công trình tiêu biểu trên toàn quốc.",
};

export default async function ProjectNewsPage() {
  const allPosts = await getAllPosts();
  const projectPosts = allPosts.filter((a) => a.category === "Dự án");

  return (
    <div className="min-h-screen bg-[#071523] text-white">
      <Header />
      <main>
        <PageBanner title="TIN DỰ ÁN" crumb="Tin dự án" bgImage="/eurowindow/constructions/viber-image-2025-02-05-13-33-24-065.png.webp" />

        <section className="pb-24 pt-16">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <div className="mb-10 flex items-end justify-between gap-6">
              <h2 className="text-2xl font-extrabold uppercase tracking-tight text-white md:text-3xl">
                Dự án của Eurowindow
              </h2>
              <Link href="/tin-tuc" className="hidden shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E2C275] md:inline-flex hover:text-[#F0D18A]">
                Tất cả tin tức <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <NewsListClient initialPosts={projectPosts} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}