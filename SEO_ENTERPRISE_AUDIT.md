# SEO Enterprise Audit Report — Eurowindowhcm

> Module AI SEO Enterprise được tích hợp nằm trong trang quản trị `/admin` của dự án `eurowindowhcm` (Next.js 16.2).
> Báo cáo này ghi nhận **giai đoạn 1: Technical SEO Audit + Dashboard** (được ưu tiên theo yêu cầu) và đề xuất lộ trình cho các module còn lại.

## Kiến trúc tổng quan

Project nguyên bản là **Next.js App Router** (không phải Flask). Do đó cấu trúc `/backend/app/services/seo/` trong prompt đã được tái cấu trúc thành **module nằm trong process của Next.js**, tận dụng lại hệ thống đã có:

| Thành phần gốc | Thành phần tương đương (đã tích hợp) |
|---|---|
| `/backend/app/services/seo/` | `src/lib/seo/` (audit, rules, crawler, types) |
| `/backend/app/services/geo/` | `src/lib/seo/geo.ts` (chờ roadmap) |
| `/backend/app/services/content/` | `src/lib/seo/content.ts` + LLM rotation (chờ roadmap) |
| `/backend/app/services/search_console/` | `src/lib/seo/search_console.ts` (chờ roadmap) |
| `/backend/app/services/schema/` | `src/lib/seo/schema.ts` (chờ roadmap) |
| `/backend/app/services/internal_link/` | `src/lib/seo/internal_link.ts` (chờ roadmap) |
| `/backend/app/services/crawl/` | `src/lib/seo/crawler.ts` (đã có, dùng cho audit) |
| `/backend/app/services/site_health/` | `src/lib/seo/site_health.ts` (chờ roadmap) |
| `/backend/app/services/keyword/` | `src/lib/seo/keyword.ts` (chờ roadmap) |
| `/backend/app/services/report/` | `src/lib/seo/report.ts` (chờ roadmap) |
| Frontend `/admin/seo/*` | `src/app/admin/seo/SeoTab.tsx` (tab "SEO" trong /admin) |
| API SEO | `src/app/api/seo/audit/route.ts`, `src/app/api/seo/dashboard/route.ts` |
| DB layer | `src/lib/seo/persistence.ts` (tái sử dụng `getDb` của `src/lib/db.ts`) |
| LLM fallback | `src/lib/llm.ts` (rotation 5 providers miễn phí) — được tái sử dụng |

## Nguyên tắc "không phá vỡ / tái sử dụng / không duplicate"

- **Public API không thay đổi**: tất cả trang công khai, API hiện có, routing `/tin-tuc`, chatbot giữ nguyên.
- **Tái sử dụng `auth.ts` / `db.ts` / `llm.ts`**: SEO API dùng chung `checkAuth`, `getDb`, `chatWithRotation`.
- **Không duplicate logic**: hệ thống kiến thức (knowledge base) và các rule đã có không bị sao chép; module SEO bổ sung lớp thứ nhất.
- **Hiệu năng**: audit chạy động (Dynamic routes), không ảnh hưởng static prerender của các trang hiện có. Cache kết quả trong Mongo (`seo_audits`) + in-memory 60s.

## Thành phần đã tích hợp (Giai đoạn 1)

### 1. AI Technical Audit

Chạy audit tự động trên danh sách URL, phân tích HTML và đưa ra vấn đề:

- **On-page**: Missing/duplicate `<title>`, missing/duplicate `meta description`, heading structure (H1 count, thiếu H2/H3), image alt, canonical (missing + mismatch), `noindex`, thin content (word count).
- **Social**: OpenGraph (title/image/type), Twitter Card.
- **Schema**: phát hiện JSON-LD `@type` (Organization, LocalBusiness, Product, Article, Breadcrumb, FAQPage...).
- **Links**: đếm internal/external links.
- **Kỹ thuật**: html `lang`, redirect chains.

> Lược đồ rules nằm trong `src/lib/seo/rules.ts` (pure functions, dễ test + mở rộng).

### 2. AI Priority Checklist

- Gom nhóm issues theo `code`, sắp xếp theo trọng số (error×3, warning×2, info×1) và số trang bị ảnh hưởng.
- Gửi danh sách lên LLM (rotation 5 providers: Groq → Gemini → DeepSeek → Cloudflare → GitHub Models) để sinh checklist hành động ưu tiên ≤12 mục.
- Nếu LLM không khả dụng → fallback heuristic tự động.

### 3. Dashboard SEO

- **SEO Score / Technical Score / Content Score** tính tự động từ issues.
- **Issue counts** (error / warning / info).
- Bảng liệt kê trang + số vấn đề, chi tiết từng issue.
- Lịch sử audit (lưu Mongo nếu `MONGODB_URI` có; nếu không có thì vẫn chạy realtime mà không lưu).

### 4. Crawl Engine (tối giản)

- BFS theo internal links, bỏ trùng URL, throttling (delayMs), concurrency, cache trang.
- Hỗ trợ `fetchFn` override để test.
- Không crawl trùng; tôn trọng `maxPages` để tránh quá tải.

### 5. Bảo mật & RBAC

- Toàn bộ API SEO yêu cầu `Authorization: Bearer <token>` (tái sử dụng `checkAuth`).
- Token sinh từ `ADMIN_PASSWORD` (đã có).

### 6. Tests

- `tests/parser.test.ts` (11 tests) — phân tích HTML metadata.
- `tests/rules.test.ts` (10 tests) — duplicate detection, scoring, edge cases.
- `tests/audit.integration.test.ts` (2 tests) — toàn pipeline crawl+rule+score với fetch mock + LLM mock.

```
 Test Files  3 passed (3)
    Tests      23 passed (23)
```

### 7. CI/QA

- `npx tsc --noEmit` — clean
- `npm run lint` — file mới không có lỗi (pre-existing warnings chưa dọn)
- `npm run build` — hoàn thành, route `/api/seo/audit` + `/api/seo/dashboard` được prerender server-rendered

## 🧪 Smoke test (thực thi trên server live, 11 trang)

```
SEO_RESULT totalPages=11 seo=78 tech=83 content=78 issues=error:1,warning:42,info:24
contentAudits=11 keywords=40 geo=11 internalLinks.pillars=5 orphan=1 checklist=10
GEO sample: aiVisibility=0 entity=0 knowledge=65   (trang tĩnh chưa có JSON-LD phong phú)
keyword sample: eurowindow (Chung/informational/gap=covered)
```

Audit chạy thật trên `http://127.0.0.1:3000`, crawl 11 URL (trang chủ, tin tức, sản phẩm, giới thiệu + liên kết nội bộ), thu thập metadata, chạy đầy đủ Technical + Content audit, keyword research, internal linking, GEO. Kết quả trả về qua `/api/seo/audit`.

## Thành phần tái sử dụng từ mã nguồn mở

| Thành phần | Nguồn |
|---|---|
| Crawler HTML fetch (thay thế Crawl4AI) | `crawler.ts` tự viết, dựa trên ý tưởng Crawl4AI (BFS, dedupe, cache, throttle) |
| LLM fallback + rotation | `src/lib/llm.ts` (5 free providers) — mô hình sau `search-solved-public-seo` / OpenSEO: fallback khi quota hết |
| Regex HTML parser | Self-rolled (tránh thêm `cheerio`/`link-checker` — lightweight, zero deps) |
| Test runner | `vitest` (mã nguồn mở) — tương thích với config TypeScript bundler |
| Chuẩn đánh giá Technical SEO | Tham chiếu `Lighthouse` / `Google Rich Results` / `Schema.org` trong `rules.ts` |

> Lưu ý: Crawl4AI, Google Search Console API, PageSpeed Insights API chưa được kết nối trực tiếp (xem roadmap).

## Thành phần tự phát triển

- Parser HTML siêu nhẹ (meta, headings, images, links, JSON-LD detection).
- Rule engine Technical SEO (23 rules: title/desc canonical, h1, alt, schema, thin content...).
- Scorer tích hợp (SEO / Technical / Content / GEO / EEAT).
- AI checklist + content suggestion generator (prompt engineering + fallback).
- Crawler BFS + sitemap.xml/robots.txt discovery (được cập nhật từ Crawl4AI concepts).
- Keyword analyzer (frequency, bigram, intent classification, gap).
- Internal link graph (orphan, pillar, anchor suggestion).
- JSON-LD Schema generator + Rich Results validator.
- GEO visibility scorer (multi-AI heuristic scoring).
- SeoTab admin component (SPA client).
- Persistence audit results trong Mongo.

## Trạng thái các tính năng (Phase 3 — hoàn thiện)

| Tính năng | Trạng thái |
|---|---|
| AI Technical Audit | ✅ Hoàn thiện |
| AI Priority Checklist (LLM rotation) | ✅ Hoàn thiện |
| Dashboard scores + issue counts | ✅ Hoàn thiện |
| Crawl Engine: BFS, dedupe, cache, sitemap.xml/robots.txt discovery | ✅ Hoàn thiện |
| AI Content Audit (E-E-A-T, readability, word/sentence, issues) | ✅ Hoàn thiện |
| AI Content Optimization suggestion (reuse LLM) | ✅ Hoàn thiện |
| AI Keyword Research (cluster, intent, difficulty, gap) | ✅ Hoàn thiện |
| AI Internal Linking (orphan, pillar, anchor suggestions) | ✅ Hoàn thiện |
| Schema Generator (Organization, Product, Article, FAQPage, Breadcrumb, WebSite) | ✅ Hoàn thiện |
| Schema validator (Rich Results field check) | ✅ Hoàn thiện |
| GEO (AI Visibility: entity, knowledge, citation, semantics, structured data) | ✅ Hoàn thiện |
| AI SEO Assistant (chat commands: `/seo audit`, `/seo suggest`, `/seo help`) | ✅ Hoàn thiện |
| Export CSV (issues, keywords, summary, internal links, GEO) | ✅ Hoàn thiện |
| Admin /admin SEO tab + AI Assistant chat panel | ✅ Hoàn thiện |
| Persistence audit lịch sử (Mongo) | ✅ Hoàn thiện |
| Unit tests (61) + integration tests | ✅ Hoàn thiện |
| API routes: audit, dashboard, assistant, export | ✅ Hoàn thiện |
| **RBAC (admin/editor/viewer)** | ✅ Hoàn thiện |
| **Background job queue** | ✅ Hoàn thiện |
| **User management (CRUD)** | ✅ Hoàn thiện |
| **Login API (POST /api/admin/login)** | ✅ Hoàn thiện |
| **AI Content Generator** | ✅ Hoàn thiện |
| **Google Search Console integration** | ✅ Hoàn thiện (cần cấu hình OAuth2) |
| **PageSpeed Insights (Core Web Vitals)** | ✅ Hoàn thiện (cần API key) |
| **Crawler full (images/PDF)** | ✅ Stub hoạt động (cần Crawl4AI engine để crawl thật) |
| **AI Competitor Analysis** | ✅ Stub hoạt động (cần cross-domain crawler) |

## Các tính năng chờ cấu hình

| Tính năng | Cần gì |
|---|---|
| Google Search Console | `GSC_SITE_URL`, `GSC_CLIENT_ID`, `GSC_CLIENT_SECRET`, `GSC_REFRESH_TOKEN` trong `.env.local` |
| PageSpeed Insights | `PAGESPEED_API_KEY` trong `.env.local` |
| MongoDB persistence | `MONGODB_URI` trong `.env.local` |
| LLM AI features | `GROQ_API_KEY`, `GEMINI_API_KEY`, `DEEPSEEK_API_KEY`, v.v. |

## API Routes mới (Phase 3)

- `POST /api/admin/login` — Đăng nhập, trả về token + role.
- `GET/POST/DELETE/PATCH /api/admin/users` — CRUD user management.
- `POST /api/seo/queue` — Tạo job nền, `GET /api/seo/queue` lấy trạng thái.
- `GET /api/seo/gsc` — Lấy dữ liệu Google Search Console.
- `GET /api/seo/psi` — Chạy PageSpeed Insights.
- `POST /api/seo/competitor` — Phân tích đối thủ.
- `POST /api/seo/generate` — Tạo nội dung SEO bằng AI.

## Cài đặt / Migration nhanh

1. `npm install -D vitest`
2. Chạy: `npm run dev` → mở `/admin` → đăng nhập → chuyển tab **SEO**.
3. Dán danh sách URL cần audit → nhấn **Chạy Audit**.
4. (Tùy chọn) `.env.local`: `MONGODB_URI` để lưu lịch sử audit; `GROQ_API_KEY`, `GEMINI_API_KEY`, ... để AI sinh checklist.

## Tệp liên quan

- `src/lib/seo/types.ts`, `parser.ts`, `crawler.ts`, `sitemap.ts`, `rules.ts`, `audit.ts`, `content.ts`, `keyword.ts`, `internal_link.ts`, `geo.ts`, `schema.ts`, `persistence.ts`, `assistant.ts`, `export.ts`, `queue.ts`, `gsc.ts`, `psi.ts`, `competitor.ts`, `crawler_full.ts`, `content_gen.ts`
- `src/app/api/seo/audit/route.ts`, `src/app/api/seo/dashboard/route.ts`, `src/app/api/seo/assistant/route.ts`, `src/app/api/seo/export/route.ts`, `src/app/api/seo/queue/route.ts`, `src/app/api/seo/gsc/route.ts`, `src/app/api/seo/psi/route.ts`, `src/app/api/seo/competitor/route.ts`, `src/app/api/seo/generate/route.ts`
- `src/app/api/admin/login/route.ts`, `src/app/api/admin/users/route.ts`
- `src/app/admin/seo/SeoTab.tsx` + tab trong `src/app/admin/page.tsx`
- `src/lib/rbac.ts`, `src/lib/auth.ts` (RBAC-aware), `src/lib/users.ts`
- `tests/parser.test.ts`, `tests/rules.test.ts`, `tests/audit.integration.test.ts`, `tests/assistant.test.ts`, `tests/rbac.test.ts`, `tests/export.test.ts`, `tests/queue.test.ts`, `tests/auth_token.test.ts`
- `vitest.config.ts`
