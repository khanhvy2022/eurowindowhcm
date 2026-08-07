This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## 🤖 AI SEO Enterprise (Phase 3)

Module audit SEO tự động tích hợp trong Admin SPA, crawl site thật và chạy Technical + Content + Keyword + Internal Linking + GEO analysis, có AI priority checklist + RBAC + queue + GSC/PSI integration.

### Tính năng đã triển khai (Phase 3)

| Mô-đun | Nguồn | Ghi chú |
|---|---|---|
| AI Technical Audit | `src/lib/seo/rules.ts` | 23 rules: title/desc/canonical, h1, alt, schema, OG, thin content... |
| Crawl Engine | `src/lib/seo/crawler.ts` + `sitemap.ts` | BFS + dedupe + cache + sitemap.xml/robots.txt discovery |
| AI Content Audit | `src/lib/seo/content.ts` | E-E-A-T proxy, readability, word/sentence counts, issues + optimization suggestion |
| AI Keyword Research | `src/lib/seo/keyword.ts` | frequency, bigram, intent, difficulty, volume proxy, gap analysis, clustering |
| AI Internal Linking | `src/lib/seo/internal_link.ts` | content graph, orphan pages, pillar candidates, anchor suggestions |
| Schema Generator | `src/lib/seo/schema.ts` | Organization, LocalBusiness, Product, Article, BreadcrumbList, FAQPage, WebSite + Rich Results validator + `recommendedSchemas()` |
| GEO | `src/lib/seo/geo.ts` | AI visibility qua entity, knowledge, citation, semantics, structured data |
| AI Checklist | `src/lib/seo/audit.ts` | LLM rotation + heuristic fallback |
| AI SEO Assistant | `src/lib/seo/assistant.ts` | Chat commands `/seo audit`, `/seo suggest`, `/seo help` + tự nhiên |
| Export CSV | `src/lib/seo/export.ts` | Xuất issues, keywords, summary, internal links, GEO |
| Dashboard UI | `src/app/admin/seo/SeoTab.tsx` | Scores, issues, checklist, content/keyword/GEO/internal + AI Assistant chat + Export buttons |
| Persistence | `src/lib/seo/persistence.ts` | Lưu lịch sử audit trên Mongo |
| **RBAC** | `src/lib/rbac.ts` | 3 roles: admin (full), editor (audit/export/assistant), viewer (read-only) |
| **Background queue** | `src/lib/seo/queue.ts` | Job queue trong Mongo, MAX_CONCURRENT=2 |
| **User management** | `src/lib/users.ts` | CRUD users trong Mongo `users` collection |
| **Login API** | `src/app/api/admin/login/route.ts` | POST username+password → token + role |
| **AI Content Generator** | `src/lib/seo/content_gen.ts` | Tạo nội dung SEO (blog/product/faq/news) bằng LLM |
| **GSC integration** | `src/lib/seo/gsc.ts` | Google Search Console: queries, pages, clicks, CTR, position |
| **PageSpeed Insights** | `src/lib/seo/psi.ts` | Core Web Vitals: FCP, LCP, TBT, CLS, SI, TTI |
| **Crawler full (stub)** | `src/lib/seo/crawler_full.ts` | Images, PDF detection — cần Crawl4AI engine cho crawl thật |
| **Competitor analysis (stub)** | `src/lib/seo/competitor.ts` | AI competitor insights — cần cross-domain crawler |

### API routes

- `POST /api/admin/login` — Đăng nhập (body: `{ username, password }`).
- `GET/POST/DELETE/PATCH /api/admin/users` — User management (auth-protected).
- `POST /api/seo/audit` — chạy audit (body: `{ urls: string[], maxPages?: number }`, header `Authorization: Bearer <token>`).
- `GET /api/seo/dashboard` — lấy audit history + scores.
- `POST /api/seo/assistant` — AI SEO Assistant chat.
- `GET /api/seo/export?type=issues|keywords|summary` — xuất CSV.
- `POST /api/seo/queue` — tạo job nền, `GET /api/seo/queue` lấy trạng thái.
- `GET /api/seo/gsc?days=28` — dữ liệu Google Search Console.
- `GET /api/seo/psi?url=...&strategy=mobile` — PageSpeed Insights.
- `POST /api/seo/competitor` — phân tích đối thủ.
- `POST /api/seo/generate` — tạo nội dung SEO bằng AI.

### Chạy test

```bash
npm run test        # vitest: 61 tests (8 files)
npm run test:watch
```

### Cấu hình (`.env.local`)

| Biến | Vai trò |
|---|---|
| `MONGODB_URI` | Lưu audit history, users, queue jobs |
| `ADMIN_PASSWORD` | Bearer token legacy cho API |
| Groq/Gemini/DeepSeek/Cloudflare/GitHub keys | LLM rotation cho AI features |
| `GSC_SITE_URL`, `GSC_CLIENT_ID`, `GSC_CLIENT_SECRET`, `GSC_REFRESH_TOKEN` | Google Search Console |
| `PAGESPEED_API_KEY` | PageSpeed Insights API |

> Chi tiết kiến trúc + roadmap: [`SEO_ENTERPRISE_AUDIT.md`](SEO_ENTERPRISE_AUDIT.md)
