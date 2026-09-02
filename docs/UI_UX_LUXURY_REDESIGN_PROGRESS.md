# EUROWINDOW HCM — UI/UX LUXURY REDESIGN PROGRESS TRACKER
**Phase 1: Homepage & Dynamic Content**
**Date:** September 2026

---

## 1. Implementation Checklist

- [x] **STEP 1: Repository Audit** — Audited Next.js 16.2.12, React 19.2.4, Tailwind v4, Vitest, MongoDB.
- [x] **STEP 2: Homepage Audit** — Mapped Header, Hero, HeroStats, Ecosystem, Services, FeaturedProjects, ProjectCategories, StrategicPartners, NewsSection, FinalCTA, Footer.
- [x] **STEP 3: Asset Audit** — Preserved all official photography, architectural icons, YouTube video embeds, and credentials.
- [x] **STEP 4: CMS/Data Audit** — Audited `src/lib/db.ts`, `src/lib/posts.ts`, `src/app/du-an/projects.ts`, `src/data/eurowindow.ts`.
- [x] **STEP 5: SEO Baseline** — Verified canonical, single H1, OpenGraph metadata, Schema.org `HomeAndConstructionBusiness` & `WebSite` JSON-LD schemas.
- [x] **STEP 6: Responsive Baseline** — Verified layouts across 375px, 390px, 768px, 1024px, 1440px, 1920px.
- [x] **STEP 7: Performance Baseline** — Server Component data fetching, lazy-load video/images, zero extraneous client bundle.
- [x] **STEP 8: Design Tokens** — Implemented `--ew-navy: #0A1628`, `--ew-navy-deep: #06101F`, `--ew-gold: #C9A227`, `--ew-warm-white: #F8F7F4`, etc. in `tokens.css` & `globals.css`.
- [x] **STEP 9: Typography Hierarchy** — Configured Playfair Display serif headings and Be Vietnam Pro sans body in `layout.tsx`.
- [x] **STEP 10: Header Redesign** — European architectural frosted sapphire backdrop with keyboard accessibility and mobile menu.
- [x] **STEP 11: Hero Redesign** — Cinematic architectural focal point with national brand eyebrow ("THƯƠNG HIỆU QUỐC GIA • 23+ NĂM TIÊN PHONG") and dual luxury CTAs.
- [x] **STEP 12: Hero Stats** — Extracted into `src/components/home/HeroStats.tsx` with thin glass borders and gold accents.
- [x] **STEP 13: Brand Introduction** — Redesigned `src/components/Ecosystem.tsx` with editorial layout, high-res photography, and core values.
- [x] **STEP 14: Products Portfolio** — Redesigned `src/components/Services.tsx` preserving all 6 core categories with 1.03x hover zoom.
- [x] **STEP 15: Dynamic Projects Engine & Section** — Created `src/lib/projects.ts` with `getLatestProjects({ limit: 6 })` sorting by `publishedAt DESC`, prominent landmark hero card + supporting grid in `src/components/FeaturedProjects.tsx`.
- [x] **STEP 16: Trust & Marquee** — Redesigned `src/components/StrategicPartners.tsx` with smooth linear marquee and grayscale-to-color hover.
- [x] **STEP 17: Video Showcase** — Preserved interactive 8-video YouTube player with refined architectural framing in `src/components/ProjectCategories.tsx`.
- [x] **STEP 18: Dynamic News Engine & Section** — Enhanced `src/lib/posts.ts` with `getLatestNews({ limit: 4 })` sorting strictly by `publishedAt DESC` (never `updatedAt`), 1 spotlight article + 3 editorial rows in `src/components/NewsSection.tsx`.
- [x] **STEP 19: Final Closing CTA** — Created `src/components/home/FinalCTA.tsx` with deep navy background and gold CTA button.
- [x] **STEP 20: Footer & Floating Buttons** — Redesigned `src/components/Footer.tsx` with 100% preservation of addresses, hotlines, emails, and partner links.
- [x] **STEP 21: Dynamic Content Tests** — Created `tests/dynamic-content.test.ts` (7 tests covering date parsing, published priority, status filtering, limit, updatedAt exclusion).
- [x] **STEP 22: Build, Typecheck, & Tests Validation** — Verified `tsc --noEmit` (0 errors) and all 82 Vitest tests passing.
- [x] **STEP 23: Final Report** — Generated `docs/UI_UX_LUXURY_REDESIGN_FINAL_REPORT.md`.
