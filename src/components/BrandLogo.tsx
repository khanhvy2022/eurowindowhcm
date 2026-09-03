import Link from "next/link";

export default function BrandLogo({ lang = "vi" }: { lang?: "vi" | "en" }) {
  const isEn = lang === "en";
  return (
    <Link
      href={isEn ? "/en" : "/"}
      className="inline-flex shrink-0 items-center"
      aria-label="Eurowindow"
    >
      <img
        src="/eurowindow-logo.png"
        alt={isEn ? "Eurowindow – Pioneer. Create. Accompany." : "Eurowindow – Tiên phong. Kiến tạo. Đồng hành."}
        width={238}
        height={44}
        decoding="async"
        className="h-10 w-auto object-contain sm:h-11"
      />
    </Link>
  );
}
