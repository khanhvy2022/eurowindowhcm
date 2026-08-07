import { getDb } from "@/lib/db";
import type { AuditResult } from "@/lib/seo/types";

const COLLECTION = "seo_audits";

/**
 * Lưu kết quả audit vào MongoDB. Trả về false nếu không có DB.
 * Chuyển Map → object để Mongo lưu được.
 */
export async function saveAudit(result: AuditResult): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  try {
    const safe = JSON.parse(JSON.stringify(result, (k, v) => (v instanceof Map ? Object.fromEntries(v) : v)));
    await db.collection(COLLECTION).insertOne({ ...safe, savedAt: new Date().toISOString() });
    return true;
  } catch {
    return false;
  }
}

export async function getAudits(limit = 20): Promise<AuditResult[]> {
  const db = await getDb();
  if (!db) return [];
  try {
    const docs = await db
      .collection(COLLECTION)
      .find({})
      .sort({ checkedAt: -1 })
      .limit(limit)
      .toArray();
    return docs.map((d) => {
      const { _id, ...rest } = d as unknown as Record<string, unknown>;
      return rest as unknown as AuditResult;
    });
  } catch {
    return [];
  }
}

export async function getAuditById(id: string): Promise<AuditResult | null> {
  const db = await getDb();
  if (!db) return null;
  try {
    const doc = await db.collection(COLLECTION).findOne({ id });
    if (!doc) return null;
    const { _id, ...rest } = doc as unknown as Record<string, unknown>;
    return rest as unknown as AuditResult;
  } catch {
    return null;
  }
}
