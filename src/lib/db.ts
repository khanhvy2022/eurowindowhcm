import { MongoClient, Db } from "mongodb";
import dns from "dns";

// Fix Windows Node.js SRV resolution issue by setting fallback DNS servers
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch {
  // Ignore if unsupported in environment
}

const uri = process.env.MONGODB_URI ?? "";
const dbName = process.env.MONGODB_DB ?? "eurowindow";

declare global {
  // eslint-disable-next-line no-var
  var _ewMongoClient: MongoClient | undefined;
}

let client: MongoClient | undefined;
let db: Db | undefined;
let failedAt = 0;
const RETRY_MS = 30_000;

/**
 * Trả về Db nếu kết nối thành công, ngược lại null (không bao giờ throw).
 * Lỗi kết nối được cache 30s để tránh treo mỗi request.
 */
export async function getDb(): Promise<Db | null> {
  if (!uri) return null;
  if (db) return db;
  if (failedAt && Date.now() - failedAt < RETRY_MS) return null;

  try {
    if (!globalThis._ewMongoClient) {
      // Re-apply DNS fallback right before connection
      try {
        dns.setServers(["8.8.8.8", "1.1.1.1"]);
      } catch {
        // ignore
      }
      client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000,
      });
      globalThis._ewMongoClient = client;
    } else {
      client = globalThis._ewMongoClient;
    }
    await client.connect();
    db = client.db(dbName);
    return db;
  } catch (err) {
    // Dùng console.warn để tránh kích hoạt màn hình báo lỗi đỏ (error overlay) của Next.js dev khi mất mạng / DB không sẵn sàng
    console.warn("[db] MongoDB connection failed (fallback to local data):", err instanceof Error ? err.message : err);
    globalThis._ewMongoClient = undefined;
    client = undefined;
    failedAt = Date.now();
    return null;
  }
}

export const COLLECTIONS = {
  posts: "posts",
  knowledge: "knowledge",
  contacts: "contacts",
  documents: "documents",
} as const;

