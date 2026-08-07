import Link from "next/link";

export default function LanguageSwitcher({ lang = "vi" }: { lang?: "vi" | "en" }) {
  return (
    <div className="flex items-center" aria-label="Language selector">
      <Link
        href="/"
        aria-current={lang === "vi" ? "true" : undefined}
        title="Tiếng Việt"
        className={`flex items-center transition ${lang === "vi" ? "opacity-100" : "opacity-70 hover:opacity-100"}`}
      >
        <img src="/flags/vn.svg" alt="Tiếng Việt" className="h-[11px] w-4 object-cover" />
      </Link>
      <Link
        href="/en"
        aria-current={lang === "en" ? "true" : undefined}
        title="English"
        className={`ml-[7px] flex items-center transition ${lang === "en" ? "opacity-100" : "opacity-70 hover:opacity-100"}`}
      >
        <img src="/flags/gb.svg" alt="English" className="h-[11px] w-4 object-cover" />
      </Link>
    </div>
  );
}
