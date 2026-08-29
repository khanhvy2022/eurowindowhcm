"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";

export type NewsItem = {
  slug: string;
  title: string;
  date: string;
  category: string;
  image?: string;
  excerpt?: string;
};

function getArticleImage(article: NewsItem): string {
  if (article.image && article.image.trim()) return article.image;
  const text = `${article.title} ${article.category} ${article.slug}`.toLowerCase();
  if (text.includes("gỗ") || text.includes("wood")) return "/uploads/diem-noi-bat-cua-cua-go-eurowindow.png";
  if (text.includes("cuốn") || text.includes("rolling")) return "/uploads/cua-cuon-eurowindow.jpg";
  if (text.includes("tự động") || text.includes("automatic")) return "/eurowindow/cua-tu-dong.jpg.webp";
  if (text.includes("upvc") || text.includes("nhựa")) return "/eurowindow/cuanhua1.jpg.webp";
  if (text.includes("kính") || text.includes("glass") || text.includes("low-e")) return "/eurowindow/san-pham-kinh.jpg.webp";
  if (text.includes("dự án") || text.includes("công trình") || text.includes("thi công")) return "/eurowindow/img-0344.jpeg.webp";
  if (text.includes("khuyến mãi") || text.includes("ưu đãi")) return "/eurowindow/ctkm-ea65ea68i-169-at-3x-large.png.webp";
  if (text.includes("nhôm") || text.includes("aluminium")) return "/uploads/cua-va-vach-nhom-kinh-eurowindow.jpg";
  return "/eurowindow/toa-dam-1.png.webp";
}

export default function NewsListClient({ initialPosts }: { initialPosts: NewsItem[] }) {
  const [visibleCount, setVisibleCount] = useState(8);

  const visiblePosts = initialPosts.slice(0, visibleCount);
  const hasMore = visibleCount < initialPosts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {visiblePosts.map((article) => (
          <Link
            key={article.slug}
            href={`/tin-tuc/${article.slug}`}
            className="glass-card glass-card-hover group flex flex-col overflow-hidden p-5"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#102238]">
              <img
                src={getArticleImage(article)}
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
                Đọc thêm <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {hasMore && (
        <div className="mt-12 text-center">
          <button
            onClick={handleLoadMore}
            type="button"
            className="btn-gold-luxury inline-flex items-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-widest"
          >
            Xem thêm
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
