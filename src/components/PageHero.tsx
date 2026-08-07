import BrandLogo from "@/components/BrandLogo";

type PageHeroProps = { eyebrow: string; title: string; description: string; image: string };

export default function PageHero({ eyebrow, title, description, image }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--ew-navy)] text-white">
      <img src={image} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-35" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[var(--ew-navy)] via-[color-mix(in_srgb,var(--ew-navy)_80%,transparent)] to-transparent" />
      <div className="mx-auto flex min-h-[440px] max-w-[1320px] flex-col justify-end px-5 pb-16 pt-28 sm:px-8 md:min-h-[520px] md:pb-20">
        <BrandLogo />
        <p className="mt-10 text-xs font-bold uppercase tracking-[0.2em] text-white/70">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-5xl font-extrabold leading-[1.04] tracking-[-0.06em] sm:text-6xl md:text-7xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 md:text-lg">{description}</p>
      </div>
    </section>
  );
}
