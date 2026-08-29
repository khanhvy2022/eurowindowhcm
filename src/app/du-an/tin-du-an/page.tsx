import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import { articles } from "@/app/tin-tuc/articles";
import { resolveArticleImage } from "@/lib/posts";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tin Dự Án Eurowindow – Tin Tức & Cập Nhật",
  description: "Cập nhật tin tức mới nhất về các dự án, tiến độ thi công, lễ ký kết và nghiệm thu bàn giao các công trình của Eurowindow.",
  alternates: {
    canonical: "/du-an/tin-du-an",
    languages: { vi: "/du-an/tin-du-an", en: "/en/projects/tin-du-an" },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Cửa Eurowindow Hồ Chí Minh",
    title: "Tin Dự Án Eurowindow – Tin Tức & Cập Nhật",
    description: "Cập nhật tin tức dự án, tiến độ thi công, lễ ký kết các công trình Eurowindow.",
    images: [{ url: "/eurowindow/toa-dam-1.png.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tin Dự Án Eurowindow – Tin Tức & Cập Nhật",
    description: "Cập nhật tin tức dự án và tiến độ thi công của Eurowindow.",
  },
};

const categoryLinks = [
  { label: "Tất cả", href: "/du-an", slug: "tat-ca" },
  { label: "Công trình cấp quốc gia", href: "/du-an/cong-trinh-quoc-gia", slug: "cong-trinh-quoc-gia" },
  { label: "Bệnh viện", href: "/du-an/benh-vien", slug: "benh-vien" },
  { label: "Trụ sở cơ quan", href: "/du-an/tru-so-co-quan", slug: "tru-so-co-quan" },
  { label: "Công trình dân dụng", href: "/du-an/cong-trinh-dan-dung", slug: "cong-trinh-dan-dung" },
  { label: "Tin dự án", href: "/du-an/tin-du-an", slug: "tin-du-an" },
];

export default function TinDuAnPage() {
  const projectArticles = articles.filter(
    (a) =>
      a.category.toLowerCase().includes("dự án") ||
      a.title.toLowerCase().includes("dự án") ||
      a.title.toLowerCase().includes("thi công") ||
      a.title.toLowerCase().includes("vinhomes")
  );

  const displayList = projectArticles.length > 0 ? projectArticles : articles.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#071523] text-white">
      <Header />
      <main>
        <PageBanner
          title="TIN TỨC DỰ ÁN"
          crumb="Tin dự án"
          bgImage="/eurowindow/toa-dam-1.png.webp"
        />

        <section className="pb-24 pt-14">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <p className="mb-10 max-w-3xl text-base leading-relaxed text-[#D2D8E3]">
              Cập nhật những thông tin mới nhất về các dự án tiêu biểu, hợp tác chiến lược, tiến độ thi công và các hoạt động nghiệm thu công trình của Eurowindow trên toàn quốc.
            </p>

            <div className="flex flex-wrap gap-2.5 mb-12">
              {categoryLinks.map((item) => (
                <Link
                  key={item.slug}
                  href={item.href}
                  className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider backdrop-blur-md transition ${
                    item.slug === "tin-du-an"
                      ? "bg-[#E2C275] text-[#071523] shadow-lg"
                      : "border border-white/10 bg-white/5 text-[#D2D8E3] hover:border-[#E2C275] hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <h2 className="mb-6 text-xl font-extrabold uppercase tracking-tight text-white">Bài Viết Dự Án Mới Nhất</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {displayList.map((article) => (
                <Link
                  key={article.slug}
                  href={`/tin-tuc/${article.slug}`}
                  className="glass-card glass-card-hover group flex flex-col overflow-hidden p-5"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#102238]">
                    <img
                      src={resolveArticleImage(article.image, article.title, article.category, article.slug)}
                      alt={article.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071523]/80 via-transparent to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between pt-4">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-[#E2C275]">
                        {article.category} · {article.date}
                      </p>
                      <h3 className="mt-2 text-base font-bold leading-snug tracking-tight text-white transition group-hover:text-[#E2C275] line-clamp-3">
                        {article.title}
                      </h3>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E2C275] transition group-hover:text-white">
                      Xem chi tiết <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
