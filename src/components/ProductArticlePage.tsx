import Header from "./Header";
import Footer from "./Footer";
import PageBanner from "./PageBanner";
import RelatedProducts from "./RelatedProducts";
import { Check } from "lucide-react";
import type { SanPhamArticle } from "@/app/san-pham/data";
import { getArticlesByCategory, getCategoryByKey } from "@/app/san-pham/categories";
import Link from "next/link";

type ProductArticlePageProps = {
  article: SanPhamArticle;
  label: string;
  bgImage?: string;
  currentHref: string;
  categoryKey?: string;
};

function renderFormattedText(text: string) {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const [_, linkText, href] = match;
    parts.push(
      <Link key={match.index} href={href} className="font-semibold text-[#E2C275] underline hover:text-white transition">
        {linkText}
      </Link>
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  return parts.length > 0 ? parts : text;
}

export default function ProductArticlePage({ article, label, bgImage, currentHref, categoryKey }: ProductArticlePageProps) {
  const siblings = categoryKey ? getArticlesByCategory(categoryKey) : [];
  const currentCat = categoryKey ? getCategoryByKey(categoryKey) : undefined;
  const related = siblings.filter((a) => a.slug !== article.slug);

  return (
    <div className="min-h-screen bg-[#071523] text-white">
      <Header />
      <main>
        <PageBanner title={article.bannerTitle} crumb={label} bgImage={bgImage} />

        <section className="pb-24 pt-14">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            {/* 2 Labels trên 1 bài viết */}
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <span className="inline-block rounded-full border border-[#E2C275]/40 bg-[#E2C275]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#E2C275]">
                Sản phẩm
              </span>
              <span className="inline-block rounded-full bg-[#1677FF] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow-md">
                {label}
              </span>
            </div>

            {article.excerpt ? (
              <p className="mb-12 max-w-3xl text-lg leading-8 text-[#D2D8E3]">
                {renderFormattedText(article.excerpt)}
              </p>
            ) : null}

            <div className="space-y-16">
              {article.sections.map((section) => (
                <section key={section.id} className="space-y-5 leading-8 text-[#D2D8E3]">
                  <h2 className="text-2xl font-extrabold uppercase tracking-tight text-white md:text-3xl">
                    {section.heading}
                  </h2>
                  {section.body.map((line, i) => {
                    if (/^-\s/.test(line)) {
                      return (
                        <div key={i} className="flex items-start gap-3">
                          <Check className="mt-1 h-5 w-5 shrink-0 text-[#E2C275]" strokeWidth={3} />
                          <span>{renderFormattedText(line.replace(/^-\s/, ""))}</span>
                        </div>
                      );
                    }
                    return <p key={i} className="space-y-5">{renderFormattedText(line)}</p>;
                  })}
                </section>
              ))}
            </div>

            {/* Khối CTA Liên kết nội bộ */}
            <div className="glass-card border-[#E2C275]/30 bg-[#102238]/80 mt-16 p-8 text-center sm:text-left shadow-2xl">
              <h3 className="text-xl font-extrabold uppercase tracking-wide text-white">
                Bạn cần tư vấn chi tiết về {label} Eurowindow?
              </h3>
              <p className="mt-2 text-sm text-[#D2D8E3]">
                Liên hệ ngay hotline hoặc tham khảo chi tiết sản phẩm chính hãng Eurowindow để nhận báo giá ưu đãi tốt nhất.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                {currentCat ? (
                  <Link
                    href={currentCat.href}
                    className="btn-gold-luxury text-xs uppercase tracking-wider"
                  >
                    Xem sản phẩm {currentCat.label}
                  </Link>
                ) : null}
                <Link
                  href="/gioi-thieu#lien-he"
                  className="btn-secondary-outline text-xs uppercase tracking-wider"
                >
                  Nhận báo giá &amp; Tư vấn
                </Link>
              </div>
            </div>

            {related.length > 0 && currentCat && (
              <div className="mt-20">
                <h2 className="mb-8 text-xl font-extrabold uppercase tracking-tight text-white">
                  Các bài viết cùng danh mục {currentCat.label}
                </h2>
                <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                  {related.map((r) => (
                    <li key={r.slug} className="glass-card glass-card-hover p-6">
                      <Link href={`/san-pham/${currentCat.key}/bai-viet/${r.slug}`} className="text-base font-bold text-white hover:text-[#E2C275] transition">
                        {r.title || r.slug}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      </main>
      <RelatedProducts currentHref={currentHref} />
      <Footer />
    </div>
  );
}