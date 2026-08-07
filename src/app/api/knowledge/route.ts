import { NextRequest } from "next/server";
import { getDb, COLLECTIONS } from "@/lib/db";
import { checkAuth, unauthorized } from "@/lib/auth";
import { knowledgeBase } from "@/data/knowledge";

type KnowledgeBody = {
  category?: string;
  keywords?: string[];
  question?: string;
  answer?: string;
};

function validate(body: KnowledgeBody): { ok: true; data: KnowledgeBody } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "Dữ liệu không hợp lệ" };
  const question = (body.question ?? "").trim();
  const answer = (body.answer ?? "").trim();
  if (!question || !answer) return { ok: false, error: "Thiếu câu hỏi hoặc câu trả lời" };
  const keywords = Array.isArray(body.keywords)
    ? body.keywords.map((k) => String(k).trim()).filter(Boolean)
    : [];
  if (keywords.length === 0) return { ok: false, error: "Thiếu từ khóa" };
  return {
    ok: true,
    data: { category: (body.category ?? "").trim() || "Khác", keywords, question, answer },
  };
}

function toEntry(doc: Record<string, unknown>) {
  return {
    id: String(doc._id),
    category: doc.category,
    keywords: doc.keywords,
    question: doc.question,
    answer: doc.answer,
  };
}

export async function GET() {
  const db = await getDb();
  if (!db) return Response.json({ entries: knowledgeBase });
  try {
    const docs = await db.collection(COLLECTIONS.knowledge).find({}).toArray();
    if (docs.length === 0) return Response.json({ entries: knowledgeBase });
    return Response.json({ entries: docs.map((d) => toEntry(d as unknown as Record<string, unknown>)) });
  } catch {
    return Response.json({ entries: knowledgeBase });
  }
}

export async function POST(request: NextRequest) {
  if (!checkAuth(request)) return unauthorized();
  const db = await getDb();
  if (!db) return Response.json({ ok: false, error: "Chưa cấu hình MONGODB_URI" }, { status: 500 });
  try {
    const body = (await request.json()) as KnowledgeBody;
    const v = validate(body);
    if (!v.ok) return Response.json({ ok: false, error: v.error }, { status: 400 });
    const result = await db.collection(COLLECTIONS.knowledge).insertOne({
      ...v.data,
      createdAt: new Date().toISOString(),
    });
    return Response.json({ ok: true, id: String(result.insertedId) });
  } catch (err) {
    return Response.json({ ok: false, error: err instanceof Error ? err.message : "Lỗi server" }, { status: 500 });
  }
}
