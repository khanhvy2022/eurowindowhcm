# EUROWINDOW HCM — MASTER UI/UX LUXURY REDESIGN AUDIT
**Phase 1: Homepage & Dynamic Content**
**Date:** September 2026

---

## 1. Executive Summary & Repository Architecture

- **Framework:** Next.js 16.2.12 (App Router)
- **Runtime / Language:** React 19.2.4, TypeScript 5, Node.js (Windows)
- **Styling Architecture:** Tailwind CSS v4 (`@tailwindcss/postcss`), custom design token layer (`tokens.css`), Swiper 14 for motion touch carousels.
- **Data & CMS Architecture:** MongoDB 7.5 driver with graceful fallback to local TypeScript/JSON data repositories (`src/app/du-an/projects.ts`, `src/app/tin-tuc/articles.ts`, `src/data/eurowindow.ts`).
- **SEO & Schema Engine:** Next.js Metadata API, dynamic canonical resolution, OpenGraph/Twitter cards, Schema.org `HomeAndConstructionBusiness` & `WebSite` JSON-LD schemas, h-card microformats.
- **Testing Framework:** Vitest 4.1.10.

---

## 2. Homepage Component Map & Architecture Audit

| Section | Current File | Current Behavior / Limitations | Redesign Strategy (Luxury Minimal Architectural) |
| :--- | :--- | :--- | :--- |
| **Navigation / Header** | `src/components/Header.tsx` | Fixed header with scroll blur, gold CTA, mobile drawer. | Refine with architectural minimalism, frosted sapphire backdrop blur, high-contrast gold indicators, keyboard navigation, smooth focus state. |
| **Hero Section** | `src/components/home/HeroVideo.tsx` | Full-screen video with overlay, gold badge, headline, and dual CTAs. | Elevate to cinematic architectural focus with national brand eyebrow ("THƯƠNG HIỆU QUỐC GIA • 23+ NĂM TIÊN PHONG"), refined typography, optimized lazy poster fallback. |
| **Hero Stats** | Inside `Ecosystem.tsx` | 3 basic stats (23+ năm, 5 nhà máy, Top 1). | Extract into dedicated minimal architectural glass counters with thin borders and gold metric highlights. |
| **Brand Introduction** | `src/components/Ecosystem.tsx` | 2-column layout with 4 paragraphs & image. | Editorial layout with generous whitespace, crisp typography, and high-resolution architectural showcase photography. |
| **Products Portfolio** | `src/components/Services.tsx` | 6 grid cards with background image overlays. | Editorial catalog grid, refined scale, 1.03x hover zoom, subtle gold arrow accents, preserving all 6 core categories. |
| **Featured Projects** | `src/components/FeaturedProjects.tsx` | Static list from `featuredProjects` array in `eurowindow.ts`. | **Convert to Dynamic Content Engine**: Query database/static posts with `publishedAt DESC` and `LIMIT`, 1 prominent landmark hero + supporting grid, "MỚI" badge for recent completions. |
| **Video Showcase** | `src/components/ProjectCategories.tsx` | Interactive 8-video YouTube player with tabs & slider. | Retain full YouTube functionality and technical specs, refine container with architectural bezel and lazy iframe player. |
| **Trust & Achievements** | `src/components/StrategicPartners.tsx` | Swiper logo carousel of 10 national certification marks. | Precision linear marquee (35s duration), subtle monochrome-to-color interactive hover. |
| **News & Events** | `src/components/NewsSection.tsx` | Client Swiper carousel of hardcoded news items. | **Convert to Dynamic Content Engine**: Fetch server-side latest published news (`publishedAt DESC`), featured spotlight article + 3 editorial rows. |
| **Closing CTA** | Inside pages | Inconsistent CTA blocks. | Architectural closure banner with deep navy canvas, gold accents, and direct contact prompts. |
| **Footer** | `src/components/Footer.tsx` | 4-column layout with full address, hotlines, partner links. | Refine spacing, typography, and contrast while preserving 100% of contact numbers, addresses, and partner links. |
| **Floating Actions** | `src/components/QuickContactButtons.tsx` | Zalo & Hotline pulse buttons. | Compact, non-intrusive floating dock with accessibility labels and zero layout overlap. |

---

## 3. Content & Data Architecture Audit

### Projects Data Source
- **Static Source:** `src/app/du-an/projects.ts` (16 detailed landmark projects).
- **Database Collection:** `projects` in MongoDB (optional runtime connection).
- **Required Query Logic:**
  - Status filter: `status === "published"` (or default published for static records).
  - Ordering: `publishedAt DESC` (fallback to `year DESC` / date parser).
  - Limit: Configurable (default 4 or 6 for homepage).
  - Never use `updatedAt` for latest priority.

### News Data Source
- **Static Source:** `src/app/tin-tuc/articles.ts` (hundreds of handcrafted & migrated articles).
- **Database Collection:** `posts` in MongoDB.
- **Required Query Logic:**
  - Status filter: `status === "published"` and `publishedAt <= now`.
  - Ordering: `publishedAt DESC` (never `updatedAt`).
  - Limit: Configurable (default 4 for homepage: 1 hero + 3 supporting).

---

## 4. SEO & Performance Baseline

- **Semantic H1:** Homepage contains one dedicated `<h1>` in Hero section.
- **Metadata & Canonical:** `https://www.eurowindowhcm.com` canonical preserved in `page.tsx` & `layout.tsx`.
- **Structured Data:** Full Schema.org `HomeAndConstructionBusiness` & `WebSite` schemas intact.
- **Performance Guidelines:** Server Component data fetching, `next/image` with `sizes` and `priority` on Hero LCP, zero heavy client bundle additions.
