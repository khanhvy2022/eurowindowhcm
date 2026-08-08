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
            {article.image ? (
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#102238]">
                <img
                  src={article.image}
                  alt={article.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071523]/80 via-transparent to-transparent" />
              </div>
            ) : null}
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

      {hasMore ? (
        <div className="mt-12 text-center">
          <button
            onClick={handleLoadMore}
            type="button"
            className="btn-gold-luxury inline-flex items-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-widest"
          >
            Xem thêm bài viết ({initialPosts.length - visibleCount} bài còn lại)
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="mt-12 text-center text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
          Đã hiển thị tất cả {initialPosts.length} bài viết
        </div>
      )}
    </div>
  );
}
