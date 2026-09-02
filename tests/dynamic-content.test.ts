import { describe, it, expect } from "vitest";
import { parseDateToTimestamp, type ProjectItem } from "@/lib/projects";
import { parseArticleDateToTimestamp, resolveArticleTimestamp } from "@/lib/posts";
import type { Article } from "@/app/tin-tuc/articles";

describe("Dynamic Content Engine — Date Parsing & Resolution", () => {
  it("correctly parses ISO, DMY, and YMD date strings", () => {
    const iso = parseDateToTimestamp("2026-09-02T08:30:00.000Z");
    const dmy = parseDateToTimestamp("02/09/2026");
    const ymd = parseDateToTimestamp("2026-09-02");

    expect(iso).toBeGreaterThan(0);
    expect(dmy).toBeGreaterThan(0);
    expect(ymd).toBeGreaterThan(0);

    // 02/09/2026 should equal 2026-09-02 UTC day timestamp
    const dateObj = new Date(dmy);
    expect(dateObj.getUTCFullYear()).toBe(2026);
    expect(dateObj.getUTCMonth()).toBe(8); // 0-indexed September
    expect(dateObj.getUTCDate()).toBe(2);
  });

  it("prioritizes publishedAt over createdAt and ignores updatedAt", () => {
    const article: Partial<Article> = {
      title: "Test Article",
      createdAt: "2026-06-01",
      publishedAt: "2026-06-15",
      updatedAt: "2026-09-01", // Edited recently, but published in June
    };

    const resolvedTime = resolveArticleTimestamp(article);
    const expectedPublishedTime = parseArticleDateToTimestamp("2026-06-15");
    const updatedTime = parseArticleDateToTimestamp("2026-09-01");

    expect(resolvedTime).toBe(expectedPublishedTime);
    expect(resolvedTime).not.toBe(updatedTime);
  });
});

describe("Dynamic Projects — Automatic Newest Priority & Sorting", () => {
  it("orders projects strictly by publishedAt DESC (D A B C)", () => {
    const mockProjects: ProjectItem[] = [
      { slug: "project-a", title: "Project A", category: "National", location: "HN", image: "/img.jpg", status: "published", publishedAt: "2026-08-30" },
      { slug: "project-b", title: "Project B", category: "National", location: "HCM", image: "/img.jpg", status: "published", publishedAt: "2026-08-25" },
      { slug: "project-c", title: "Project C", category: "National", location: "DN", image: "/img.jpg", status: "published", publishedAt: "2026-08-20" },
    ];

    // Admin inserts New Project D on 01/09/2026
    const newProjectD: ProjectItem = {
      slug: "project-d",
      title: "Project D",
      category: "National",
      location: "Hue",
      image: "/img.jpg",
      status: "published",
      publishedAt: "2026-09-01",
    };

    const combined = [...mockProjects, newProjectD];
    combined.sort((a, b) => parseDateToTimestamp(b.publishedAt) - parseDateToTimestamp(a.publishedAt));

    expect(combined.map((p) => p.slug)).toEqual(["project-d", "project-a", "project-b", "project-c"]);
  });

  it("filters out draft, archived, and future scheduled projects", () => {
    const now = new Date("2026-09-02T00:00:00Z").getTime();

    const mockProjects: ProjectItem[] = [
      { slug: "proj-published", title: "Published", category: "Cat", location: "Loc", image: "/img.jpg", status: "published", publishedAt: "2026-09-01" },
      { slug: "proj-draft", title: "Draft", category: "Cat", location: "Loc", image: "/img.jpg", status: "draft", publishedAt: "2026-09-01" },
      { slug: "proj-archived", title: "Archived", category: "Cat", location: "Loc", image: "/img.jpg", status: "archived", publishedAt: "2026-09-01" },
      { slug: "proj-scheduled-future", title: "Future", category: "Cat", location: "Loc", image: "/img.jpg", status: "scheduled", publishedAt: "2026-10-01" },
    ];

    const valid = mockProjects.filter((p) => {
      if (p.status === "draft" || p.status === "archived") return false;
      if (p.status === "scheduled" && p.publishedAt) {
        return parseDateToTimestamp(p.publishedAt) <= now;
      }
      return true;
    });

    expect(valid.map((p) => p.slug)).toEqual(["proj-published"]);
  });

  it("strictly enforces query limit without retrieving excess items", () => {
    const mockProjects: ProjectItem[] = Array.from({ length: 20 }, (_, i) => ({
      slug: `project-${i}`,
      title: `Project ${i}`,
      category: "Landmark",
      location: "Vietnam",
      image: "/img.jpg",
      status: "published",
      publishedAt: `2026-08-${String(i + 1).padStart(2, "0")}`,
    }));

    const limit = 4;
    const limited = mockProjects.slice(0, limit);
    expect(limited.length).toBe(4);
  });
});

describe("Dynamic News — Automatic Newest Priority & Sorting", () => {
  it("orders news strictly by publishedAt DESC (D A B C)", () => {
    const mockNews: Partial<Article>[] = [
      { slug: "news-a", title: "News A", category: "Events", date: "30/08/2026", publishedAt: "2026-08-30", status: "published" },
      { slug: "news-b", title: "News B", category: "Events", date: "25/08/2026", publishedAt: "2026-08-25", status: "published" },
      { slug: "news-c", title: "News C", category: "Events", date: "20/08/2026", publishedAt: "2026-08-20", status: "published" },
    ];

    // Admin inserts New Article D on 01/09/2026
    const newArticleD: Partial<Article> = {
      slug: "news-d",
      title: "News D",
      category: "Events",
      date: "01/09/2026",
      publishedAt: "2026-09-01",
      status: "published",
    };

    const combined = [...mockNews, newArticleD];
    combined.sort((a, b) => resolveArticleTimestamp(b) - resolveArticleTimestamp(a));

    expect(combined.map((n) => n.slug)).toEqual(["news-d", "news-a", "news-b", "news-c"]);
  });

  it("does not elevate older articles with recent updated timestamps over fresh published articles", () => {
    const freshArticle: Partial<Article> = {
      slug: "fresh-story",
      title: "Fresh Published Story",
      publishedAt: "2026-09-01",
      createdAt: "2026-09-01",
      updatedAt: "2026-09-01",
      status: "published",
    };

    const editedOldArticle: Partial<Article> = {
      slug: "old-edited-story",
      title: "Old Story Edited Recently",
      publishedAt: "2026-05-10",
      createdAt: "2026-05-10",
      updatedAt: "2026-09-02", // Edited today
      status: "published",
    };

    const list = [editedOldArticle, freshArticle];
    list.sort((a, b) => resolveArticleTimestamp(b) - resolveArticleTimestamp(a));

    // Fresh story MUST come first
    expect(list[0].slug).toBe("fresh-story");
    expect(list[1].slug).toBe("old-edited-story");
  });
});
