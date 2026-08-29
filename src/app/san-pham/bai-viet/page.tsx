import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import { sanPhamCategories, getAllArticleMetas } from "@/app/san-pham/categories";
import Link from "next/link";
import Image from "next/image";

type SearchParams = { searchParams?: Promise<Record<string, string | undefined>> };

export const metadata = {
  title: "Bài viết sản phẩm | Eurowindow",
  description: "Danh sách bài viết chuyên sâu về cửa nhôm, cửa nhựa uPVC, cửa gỗ, cửa cuốn, cửa tự động và kính Eurowindow.",
  alternates: {
    canonical: "/san-pham/bai-viet",
  },
};

export default async function SanPhamBaiVietList({ searchParams }: SearchParams) {
  const sp = await searchParams;
  const activeLabel = sp?.label;

  const all = getAllArticleMetas();
  const categoriesMap = sanPhamCategories.reduce(
    (acc, c) => {
      acc[c.label.toLowerCase()] = c;
      return acc;
    },
    {} as Record<string, (typeof sanPhamCategories)[number]>,
  );

  const filtered = activeLabel
    ? all.filter((a) => a.label.toLowerCase() === activeLabel.toLowerCase())
    : all;

  const grouped = (activeLabel ? filtered : all).reduce(
    (acc, a) => {
      const key = a.label;
      if (!acc[key]) acc[key] = [];
      acc[key].push(a);
      return acc;
    },
    {} as Record<string, typeof filtered>,
  );

  return (
    <div className="min-h-screen bg-[#071523] text-white">
      <Header />
      <main>
        <PageBanner title="BÀI VIẾT SẢN PHẨM" crumb="Bài viết" bgImage={undefined} />

        <section className="pb-24 pt-14">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <div className="mb-10 flex flex-wrap items-center gap-3">
              <Link
                href="/san-pham/bai-viet"
                className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider backdrop-blur-md transition ${
                  !activeLabel
                    ? "bg-[#E2C275] text-[#071523] shadow-lg"
                    : "border border-white/10 bg-white/5 text-[#D2D8E3] hover:border-[#E2C275] hover:text-white"
                }`}
              >
                Tất cả
              </Link>
              {sanPhamCategories.map((c) => {
                const active = activeLabel && activeLabel.toLowerCase() === c.label.toLowerCase();
                return (
                  <Link
                    key={c.key}
                    href={`?label=${encodeURIComponent(c.label)}`}
                    className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider backdrop-blur-md transition ${
                      active
                        ? "bg-[#E2C275] text-[#071523] shadow-lg"
                        : "border border-white/10 bg-white/5 text-[#D2D8E3] hover:border-[#E2C275] hover:text-white"
                    }`}
                  >
                    {c.label}
                  </Link>
                );
              })}
            </div>

            {filtered.length === 0 ? (
              <p className="text-[#94A3B8]">Không có bài viết nào khớp với nhãn đã chọn.</p>
            ) : activeLabel && categoriesMap[activeLabel.toLowerCase()] ? (
              <ArticleGrid articles={filtered} label={activeLabel} />
            ) : (
              Object.entries(grouped).map(([label, items]) => {
                const cat = categoriesMap[label.toLowerCase()];
                return (
                  <div key={label} className="mb-16">
                    <div className="mb-8 flex items-center gap-4">
                      {cat ? (
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/10">
                          <Image src={cat.image} alt={label} fill className="object-cover" />
                        </div>
                      ) : null}
                      <h2 className="text-2xl font-extrabold uppercase tracking-tight text-white">{label}</h2>
                    </div>
                    <ArticleGrid articles={items} label={label} />
                  </div>
                );
              })
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function ArticleGrid({
  articles,
  label,
}: {
  articles: ReturnType<typeof getAllArticleMetas>;
  label: string;
}) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((a) => (
        <li key={a.slug} className="glass-card glass-card-hover flex flex-col justify-between p-6">
          <div>
            <Link href={`/san-pham/${a.categoryKey}/bai-viet/${a.slug}`} className="text-base font-bold text-white hover:text-[#E2C275] transition">
              {a.title || a.slug}
            </Link>
            {a.excerpt ? <p className="mt-3 text-sm leading-6 text-[#D2D8E3] line-clamp-3">{a.excerpt}</p> : null}
          </div>
          {/* 2 Labels trên 1 bài viết */}
          <div className="mt-6 flex items-center gap-2">
            <span className="rounded-full border border-[#E2C275]/40 bg-[#E2C275]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#E2C275]">
              Sản phẩm
            </span>
            <span className="rounded-full bg-[#1677FF] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md">
              {a.label || label}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
