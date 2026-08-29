import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageBanner from "@/components/PageBanner";
import { getProduct, products } from "@/app/san-pham/products-data";
import { Check, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Không tìm thấy sản phẩm" };

  const canonical = `https://www.eurowindowhcm.com/san-pham/${slug}`;
  const title = `${product.title} – Cửa Eurowindow Chính Hãng`;
  const description = product.text;
  const imageUrl = `https://www.eurowindowhcm.com${product.image}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        vi: `/san-pham/${slug}`,
        en: `/en/products/${slug}`,
      },
    },
    openGraph: {
      type: "website",
      locale: "vi_VN",
      siteName: "Cửa Eurowindow Hồ Chí Minh",
      title,
      description,
      url: canonical,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: product.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);
  const canonicalUrl = `https://www.eurowindowhcm.com/san-pham/${product.slug}`;
  const imageUrl = `https://www.eurowindowhcm.com${product.image}`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.text,
    image: [imageUrl],
    url: canonicalUrl,
    brand: {
      "@type": "Brand",
      name: "Eurowindow",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "VND",
      price: "1500000",
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      url: canonicalUrl,
      seller: {
        "@type": "Organization",
        name: "Cửa Eurowindow Hồ Chí Minh",
        url: "https://www.eurowindowhcm.com",
      },
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
        item: "https://www.eurowindowhcm.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Sản phẩm",
        item: "https://www.eurowindowhcm.com/san-pham",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#071523] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main>
        <PageBanner title={product.title} crumb={product.title} bgImage={product.image} />

        <section className="pb-20 pt-12">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#152B45]">
                <Image src={product.image} alt={product.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-[#071523]/20" />
              </div>
              <div className="flex flex-col justify-center gap-6">
                <h2 className="text-3xl font-bold uppercase tracking-[-0.04em]">{product.title}</h2>
                <p className="max-w-xl leading-8 text-[#D2D8E3]">{product.text}</p>
                <ul className="mt-2 space-y-3">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm leading-6 text-[#D2D8E3]">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-[#E2C275]" strokeWidth={3} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div key={`${product.id}-detail`} className="mt-16 border-t border-white/10 pt-14">
              <div className="grid gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-[#E2C275]">Giới thiệu sản phẩm</p>
                  <div className="mt-6 space-y-5 leading-8 text-[#D2D8E3]">
                    {product.intro.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-[#E2C275]">Chi tiết cấu tạo & công nghệ</p>
                  <div className="mt-6 space-y-6">
                    {product.structure.map((item) => (
                      <div key={item.title} className="border-l-2 border-[#E2C275] pl-5">
                        <h3 className="font-bold">{item.title}</h3>
                        <p className="mt-2 leading-7 text-[#94A3B8]">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-14">
                <p className="text-sm font-bold uppercase tracking-wide text-[#E2C275]">Tính năng & ưu việt</p>
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {product.advantages.map((item) => (
                    <div key={item.title} className="border border-white/10 bg-[#102238] p-6">
                      <h3 className="flex items-start gap-3 font-bold">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-[#E2C275]" strokeWidth={3} />
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-[#94A3B8]">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-14">
                <p className="text-sm font-bold uppercase tracking-wide text-[#E2C275]">Các hệ sản phẩm</p>
                <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                  {product.systems.map((system) => (
                    <li key={system} className="flex items-start gap-3 text-sm leading-6 text-[#D2D8E3]">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-[#E2C275]" strokeWidth={3} />
                      {system}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {related.length > 0 ? (
              <div className="mt-16">
                <h3 className="text-2xl font-bold uppercase tracking-[-0.04em]">Sản phẩm liên quan</h3>
                <div className="mt-8 grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
                  {related.map((p) => (
                    <Link key={p.slug} href={`/san-pham/${p.slug}`} className="group overflow-hidden bg-[#102238]">
                      <div className="aspect-[1.2] overflow-hidden bg-[#152B45] relative">
                        <Image src={p.image} alt={p.title} fill className="object-cover transition duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-[#071523]/20" />
                      </div>
                      <div className="p-5">
                        <h4 className="text-xl font-bold tracking-[-0.035em]">{p.title}</h4>
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
