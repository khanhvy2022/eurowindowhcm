# SEO Enterprise Module

AI SEO Enterprise module trong `/admin` của `eurowindowhcm`.

## Quickstart

```
npm run dev
# mở /admin → đăng nhập → tab "SEO"
```

Chạy audit: dán URL → nhấn "Chạy Audit". Kết quả bao gồm Technical issues, scores, AI checklist.

## Test

```
npm test          # tất cả test
npx vitest watch  # theo dõi
```

## Cấu trúc lib

```
src/lib/seo/
  types.ts          # AuditResult, UrlData, AuditIssue...
  parser.ts         # phân tích HTML metadata (regex, no DOM dep)
  crawler.ts        # BFS crawl, dedupe, cache, throttle
  rules.ts          # Technical SEO rule engine + scorer (pure)
  audit.ts          # orchestrator: crawl → rules → AI checklist
  persistence.ts    # lưu/kểu kết quả audit trong Mongo (seo_audits)
```

## Mở rộng

Thêm rule mới trong `src/lib/seo/rules.ts` → `auditPage()` trả về `AuditIssue`.
Thêm service mới: tạo `src/lib/seo/<ten>.ts` (geo/content/keywords/schema...).
