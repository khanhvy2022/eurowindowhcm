import { getDb } from "@/lib/db";
import { runAudit } from "@/lib/seo/audit";
import type { AuditResult } from "@/lib/seo/types";

export type JobStatus = "pending" | "running" | "completed" | "failed";

export type AuditJob = {
  id: string;
  urls: string[];
  maxPages: number;
  status: JobStatus;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  result?: AuditResult;
  error?: string;
  createdBy?: string;
};

const COLLECTION = "seo_jobs";
const MAX_CONCURRENT = 2;

let runningJobs = 0;
const jobQueue: string[] = [];

/** Tạo job mới, trả về job ID. */
export async function createJob(urls: string[], maxPages: number, createdBy?: string): Promise<string> {
  const db = await getDb();
  const id = `job-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const job: AuditJob = {
    id,
    urls,
    maxPages,
    status: "pending",
    createdAt: new Date().toISOString(),
    createdBy,
  };

  if (db) {
    try {
      await db.collection(COLLECTION).insertOne(job);
    } catch {
      // fallback: chạy sync nếu không có DB
    }
  }

  jobQueue.push(id);
  processQueue();
  return id;
}

/** Lấy trạng thái job. */
export async function getJob(id: string): Promise<AuditJob | null> {
  const db = await getDb();
  if (!db) return null;
  try {
    const doc = await db.collection(COLLECTION).findOne({ id });
    return doc ? (doc as unknown as AuditJob) : null;
  } catch {
    return null;
  }
}

/** Lấy danh sách jobs gần nhất. */
export async function getJobs(limit = 20): Promise<AuditJob[]> {
  const db = await getDb();
  if (!db) return [];
  try {
    const docs = await db.collection(COLLECTION).find({}).sort({ createdAt: -1 }).limit(limit).toArray();
    return docs.map((d) => d as unknown as AuditJob);
  } catch {
    return [];
  }
}

/** Xử lý queue: chạy tối đa MAX_CONCURRENT jobs cùng lúc. */
async function processQueue() {
  while (jobQueue.length > 0 && runningJobs < MAX_CONCURRENT) {
    const jobId = jobQueue.shift()!;
    runningJobs++;
    runJob(jobId).finally(() => {
      runningJobs--;
      processQueue();
    });
  }
}

/** Chạy 1 job audit. */
async function runJob(id: string) {
  const db = await getDb();
  const job = db ? await getJob(id) : null;
  if (!job) return;

  // Update status → running
  if (db) {
    try {
      await db.collection(COLLECTION).updateOne(
        { id },
        { $set: { status: "running", startedAt: new Date().toISOString() } },
      );
    } catch { /* ignore */ }
  }

  try {
    const result = await runAudit(job.urls, {
      maxPages: job.maxPages,
      delayMs: 150,
      concurrency: 4,
    });

    if (db) {
      try {
        await db.collection(COLLECTION).updateOne(
          { id },
          {
            $set: {
              status: "completed",
              completedAt: new Date().toISOString(),
              result: JSON.parse(JSON.stringify(result)),
            },
          },
        );
      } catch { /* ignore */ }
    }
  } catch (err) {
    if (db) {
      try {
        await db.collection(COLLECTION).updateOne(
          { id },
          {
            $set: {
              status: "failed",
              completedAt: new Date().toISOString(),
              error: err instanceof Error ? err.message : String(err),
            },
          },
        );
      } catch { /* ignore */ }
    }
  }
}
