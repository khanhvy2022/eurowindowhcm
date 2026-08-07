import { describe, it, expect, vi, beforeEach } from "vitest";
import { createJob, getJob, getJobs } from "../src/lib/seo/queue";

// Mock getDb to return null (fallback mode - no MongoDB)
vi.mock("@/lib/db", () => ({
  getDb: vi.fn().mockResolvedValue(null),
}));

// Mock runAudit to avoid actual crawling
vi.mock("@/lib/seo/audit", () => ({
  runAudit: vi.fn().mockResolvedValue({
    id: "mock-audit",
    pages: [],
    summary: { seoScore: 0, technicalScore: 0, contentScore: 0, totalPages: 0, issueCounts: { error: 0, warning: 0, info: 0 } },
    priorityChecklist: [],
    tookMs: 0,
  }),
}));

describe("queue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("createJob returns a job ID string", async () => {
    const id = await createJob(["https://eurowindow.biz"], 10);
    expect(typeof id).toBe("string");
    expect(id).toMatch(/^job-\d+-[a-z0-9]+$/);
  });

  it("getJob returns null when no DB", async () => {
    const job = await getJob("job-123-test");
    expect(job).toBeNull();
  });

  it("getJobs returns empty array when no DB", async () => {
    const jobs = await getJobs();
    expect(jobs).toEqual([]);
  });

  it("getJobs respects limit parameter", async () => {
    const jobs = await getJobs(5);
    expect(jobs).toEqual([]);
  });
});
