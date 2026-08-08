import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageBanner from "@/components/PageBanner";
import NewsListClient from "@/components/NewsListClient";
import { getAllPosts } from "@/lib/posts";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const promos = [
  { slug: "khuyen-mai-kinh-dien", title: "KHUYẾN MÃI KÍNH ĐIỆN – SỞ HỮU CÔNG NGHỆ ĐỔI MÀU", date: "01/08/2026", category: "Ưu đãi" },
  { slug: "uu-dai-cua-upvc", title: "ƯU ĐÃI CỬA uPVC TIẾT KIỆM NĂNG LƯỢNG", date: "07/2026", category: "Ưu đãi" },
  { slug: "uu-dai-cua-nhom-kinh", title: "ƯU ĐÃI HỆ CỬA NHÔM KÍNH EA55–EA95i", date: "07/2026", category: "Ưu đãi" },
] as const;

const press = [
  { slug: "thuong-hieu-quoc-gia", title: "Eurowindow 14 năm liên tiếp đạt Thương hiệu Quốc gia Việt Nam", date: "2025", category: "Báo chí nói về Eurowindow" },
  { slug: "top-10-doanh-nghiep-xanh", title: "Eurowindow vào Top 10 doanh nghiệp xanh Việt Nam 2026", date: "2026", category: "Báo chí nói về Eurowindow" },
  { slug: "hang-viet-nam-chat-luong-cao", title: "Hàng Việt Nam chất lượng cao – Eurowindow ghi dấu ấn", date: "2024", category: "Báo chí nói về Eurowindow" },
] as const;

const culture = [
  { slug: "sinh-nhat-eurowindow", title: "CHÀO MỪNG SINH NHẬT EUROWINDOW – HÀNH TRÌNH 20+ NĂM TIÊN PHONG", date: "2026", category: "Văn hóa" },
  { slug: "giai-bong-da-noi-bo", title: "GIẢI BÓNG ĐÁ NỘI BỘ – GẮN KẾT ĐỘI NGŨ", date: "2025", category: "Văn hóa" },
] as const;

const knowledge = [
  { slug: "giai-phap-cua-chong-nong-mua-he-2026", title: "Tổng hợp giải pháp cửa chống nóng Eurowindow mùa hè 2026", date: "10/07/2026", category: "Chia sẻ kiến thức" },
  { slug: "nen-chon-cua-gi-cho-mua-he-nang-nong", title: "Nên chọn cửa gì cho mùa hè nắng nóng?", date: "05/07/2026", category: "Chia sẻ kiến thức" },
] as const;

function SectionHeader({ title, href, align = "left" }: { title: string; href: string; align?: "left" | "center" }) {
  return (
    <div className={`mb-10 flex items-end justify-between gap-6 ${align === "center" ? "justify-center" : ""}`}>
      <h2 className={`text-2xl font-extrabold uppercase tracking-tight text-white md:text-3xl ${align === "center" ? "text-center" : ""}`}>{title}</h2>
      <Link href={href} className="hidden shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E2C275] md:inline-flex hover:text-[#F0D18A]">
        Xem tất cả <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function NewsCard({ slug, title, date, category, image }: { slug: string; title: string; date: string; category: string; image?: string }) {
  return (
    <Link href={`/tin-tuc/${slug}`} className="glass-card glass-card-hover group flex flex-col overflow-hidden p-5">
      {image ? (
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#102238]">
          <img src={image} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071523]/80 via-transparent to-transparent" />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col justify-between pt-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#E2C275]">{category} · {date}</p>
          <h3 className="mt-2 text-base font-bold leading-snug tracking-tight text-white transition group-hover:text-[#E2C275]">{title}</h3>
        </div>
        <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E2C275] transition group-hover:text-white">
          Đọc thêm <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export default async function NewsPage() {
  const dbPosts = await getAllPosts();
  const allFormattedPosts = dbPosts.map((a) => ({
    slug: a.slug,
    title: a.title,
    date: a.date,
    category: a.category,
    image: a.image,
    excerpt: a.excerpt,
  }));

  return (
    <div className="min-h-screen bg-[#071523] text-white">
      <Header />
      <main>
        <PageBanner title="TIN TỨC" crumb="Tin tức" bgImage="/eurowindow/toa-dam-1.png.webp" />

        <section className="pb-24 pt-16">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <div className="mb-10">
              <h2 className="text-2xl font-extrabold uppercase tracking-tight text-white md:text-3xl">
                Tin mới nhất
              </h2>
            </div>
            <NewsListClient initialPosts={allFormattedPosts} />
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#102238]/60 py-24">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <SectionHeader title="Ưu đãi" href="/uu-dai" />
            <div className="grid gap-6 md:grid-cols-3">
              {promos.map((article) => <NewsCard key={article.slug} {...article} />)}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <SectionHeader title="Báo chí nói gì về Eurowindow" href="/bao-chi-noi-gi-ve-eurowindow" />
            <div className="grid gap-6 md:grid-cols-3">
              {press.map((article) => <NewsCard key={article.slug} {...article} />)}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#102238]/60 py-24">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <SectionHeader title="Văn hóa Eurowindow" href="/van-hoa-eurowindow" />
            <div className="grid gap-6 md:grid-cols-2">
              {culture.map((article) => <NewsCard key={article.slug} {...article} />)}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <SectionHeader title="Chia sẻ kiến thức" href="/chia-se-kien-thuc" />
            <div className="grid gap-6 md:grid-cols-2">
              {knowledge.map((article) => <NewsCard key={article.slug} {...article} />)}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
