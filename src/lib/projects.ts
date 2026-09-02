import { getDb } from "@/lib/db";
import { projects as staticProjects, type ProjectDetail } from "@/app/du-an/projects";

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
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  featured?: boolean;
  priority?: number;
}

export function parseDateToTimestamp(dateStr?: string | null): number {
  if (!dateStr || !dateStr.trim()) return 0;
  const s = dateStr.trim();

  // Try DD/MM/YYYY or DD-MM-YYYY (Vietnamese standard format)
  const dmyMatch = s.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})/);
  if (dmyMatch) {
    const day = parseInt(dmyMatch[1], 10);
    const month = parseInt(dmyMatch[2], 10) - 1;
    const year = parseInt(dmyMatch[3], 10);
    return new Date(Date.UTC(year, month, day)).getTime();
  }

  // Try YYYY-MM-DD or YYYY/MM/DD
  const ymdMatch = s.match(/^(\d{4})[/-](\d{1,2})[/-](\d{1,2})/);
  if (ymdMatch) {
    const year = parseInt(ymdMatch[1], 10);
    const month = parseInt(ymdMatch[2], 10) - 1;
    const day = parseInt(ymdMatch[3], 10);
    return new Date(Date.UTC(year, month, day)).getTime();
  }

  // Try standard ISO parse
  const isoTime = Date.parse(s);
  if (!isNaN(isoTime)) return isoTime;

  // Try Year only e.g. "2024"
  const yearMatch = s.match(/^(\d{4})$/);
  if (yearMatch) {
    return new Date(Date.UTC(parseInt(yearMatch[1], 10), 0, 1)).getTime();
  }

  return 0;
}

function resolveProjectDate(p: Partial<ProjectItem>): number {
  // STRICT RULE: prioritize publishedAt, then createdAt/date/year, NEVER updatedAt
  if (p.publishedAt) {
    const t = parseDateToTimestamp(p.publishedAt);
    if (t > 0) return t;
  }
  if (p.createdAt) {
    const t = parseDateToTimestamp(p.createdAt);
    if (t > 0) return t;
  }
  if (p.year) {
    const t = parseDateToTimestamp(p.year);
    if (t > 0) return t;
  }
  return 0;
}

function convertStaticProject(sp: ProjectDetail, index: number): ProjectItem {
  const yearNum = parseInt(sp.year || "2023", 10);
  // Establish deterministic published date based on project year & order
  const month = Math.max(1, 12 - (index % 12));
  const day = Math.max(1, 28 - (index % 25));
  const syntheticPublishedAt = `${yearNum}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  return {
    slug: sp.slug,
    title: sp.title,
    category: sp.category,
    location: sp.location,
    year: sp.year,
    area: sp.area,
    scope: sp.scope,
    intro: sp.intro,
    image: sp.images[0] || "/eurowindow/cuanhom.jpg.webp",
    images: sp.images,
    status: "published",
    publishedAt: syntheticPublishedAt,
    featured: index < 2,
  };
}

let projectCache: ProjectItem[] | null = null;
let projectCacheTime = 0;

export async function getAllProjects(): Promise<ProjectItem[]> {
  const now = Date.now();
  if (projectCache && now - projectCacheTime < 60_000) {
    return projectCache;
  }

  let dbProjects: ProjectItem[] = [];
  try {
    const db = await getDb();
    if (db) {
      const docs = await db
        .collection("projects")
        .find({
          $or: [{ status: "published" }, { status: { $exists: false } }],
        })
        .toArray();

      dbProjects = docs.map((d) => {
        const raw = d as unknown as Record<string, unknown>;
        return {
          id: String(raw._id),
          slug: String(raw.slug || ""),
          title: String(raw.title || ""),
          category: String(raw.category || "Công trình"),
          location: String(raw.location || "Việt Nam"),
          year: raw.year ? String(raw.year) : undefined,
          area: raw.area ? String(raw.area) : undefined,
          scope: raw.scope ? String(raw.scope) : undefined,
          intro: raw.intro ? String(raw.intro) : undefined,
          image: String(raw.image || (Array.isArray(raw.images) && raw.images[0]) || "/eurowindow/cuanhom.jpg.webp"),
          images: Array.isArray(raw.images) ? (raw.images as string[]) : [],
          status: (raw.status as ProjectItem["status"]) || "published",
          publishedAt: raw.publishedAt ? String(raw.publishedAt) : raw.createdAt ? String(raw.createdAt) : undefined,
          createdAt: raw.createdAt ? String(raw.createdAt) : undefined,
          updatedAt: raw.updatedAt ? String(raw.updatedAt) : undefined,
          featured: Boolean(raw.featured),
        };
      });
    }
  } catch {
    // Database fallback
  }

  const staticConverted = staticProjects.map(convertStaticProject);
  const dbSlugs = new Set(dbProjects.map((p) => p.slug));
  const merged = [...dbProjects, ...staticConverted.filter((sp) => !dbSlugs.has(sp.slug))];

  // Filter valid published content (exclude draft, scheduled with future date, archived)
  const currentTime = Date.now();
  const publishedOnly = merged.filter((p) => {
    if (p.status === "draft" || p.status === "archived") return false;
    if (p.status === "scheduled" && p.publishedAt) {
      const pubTime = parseDateToTimestamp(p.publishedAt);
      if (pubTime > currentTime) return false;
    }
    return true;
  });

  // Sort strictly by publishedAt DESC (NEVER updatedAt)
  publishedOnly.sort((a, b) => resolveProjectDate(b) - resolveProjectDate(a));

  projectCache = publishedOnly;
  projectCacheTime = now;
  return publishedOnly;
}

export interface GetLatestProjectsOptions {
  limit?: number;
  category?: string;
  excludeSlug?: string;
}

export async function getLatestProjects(options: GetLatestProjectsOptions = {}): Promise<ProjectItem[]> {
  const { limit = 6, category, excludeSlug } = options;
  const all = await getAllProjects();

  let filtered = all;
  if (category && category !== "all") {
    filtered = filtered.filter((p) => p.category.toLowerCase().includes(category.toLowerCase()));
  }
  if (excludeSlug) {
    filtered = filtered.filter((p) => p.slug !== excludeSlug);
  }

  return filtered.slice(0, limit);
}

export async function getProjectBySlug(slug: string): Promise<ProjectItem | null> {
  const all = await getAllProjects();
  return all.find((p) => p.slug === slug) || null;
}
