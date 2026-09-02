# EUROWINDOW HCM — DYNAMIC CONTENT ARCHITECTURE AUDIT
**Phase 1: Homepage & Dynamic Content**
**Date:** September 2026

---

## 1. Dynamic Content Strategy

### Data Flow Model
```
CMS / Database / Static Data Repository
               ↓
    Published Filter (status === 'published' && publishedAt <= now)
               ↓
    Sort by publishedAt DESC (strict, never updatedAt)
               ↓
    Query Limit (Database/Data Layer Level)
               ↓
    Server Component Rendering / ISR (revalidate: 60s)
               ↓
    Homepage (Newest content instantly prioritized)
```

---

## 2. Projects Data Model & Query Engine (`src/lib/projects.ts`)

### Model Definition
```typescript
export interface ProjectItem {
  id?: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  year?: string;
  area?: string;
  scope?: string;
  intro?: string;
  image: string;
  images?: string[];
  status?: "published" | "draft" | "scheduled" | "archived";
  publishedAt?: string; // ISO date string or YYYY-MM-DD
  createdAt?: string;
  updatedAt?: string;
  featured?: boolean;
  priority?: number;
}
```

### Sorting & Date Resolution Logic
1. Priority given to `publishedAt`.
2. Fallback to `date` / `createdAt` / `year`.
3. Strict descending order: newer dates appear before older dates.
4. When admin publishes a new project (e.g., `Project E` on `02/09/2026`), it immediately shifts to index 0 on the homepage without changing JSX/React source code.

---

## 3. News Data Model & Query Engine (`src/lib/posts.ts`)

### Model Definition
```typescript
export interface NewsItem {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  status?: "published" | "draft" | "scheduled" | "archived";
  publishedAt?: string; // ISO date string
  createdAt?: string;
  updatedAt?: string;
  featured?: boolean;
}
```

### Sorting & Status Exclusion
1. Excludes any article with `status === "draft"`, `status === "scheduled"` (where `publishedAt > now`), or `status === "archived"`.
2. Sorts purely by parsed `publishedAt` / `date` descending.
3. `updatedAt` is never used for freshness calculation to prevent edited historical articles from jumping ahead of newly published stories.

---

## 4. Revalidation & Caching Strategy

- Next.js ISR / On-Demand Revalidation:
  - Cache TTL: 60 seconds default.
  - Server actions / Admin API routes can invoke `revalidatePath("/")` on post/project publishing for instant instant zero-latency updates.
