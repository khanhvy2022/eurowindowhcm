import { NextRequest } from "next/server";
import { getDb, COLLECTIONS } from "@/lib/db";
import { knowledgeBase, type KnowledgeEntry } from "@/data/knowledge";
import { matchKnowledge } from "@/lib/knowledge";
import { chatWithRotation } from "@/lib/llm";

function toEntry(doc: Record<string, unknown>): KnowledgeEntry {
  return {
    id: String(doc._id),
    category: String(doc.category ?? ""),
    keywords: (doc.keywords as string[]) ?? [],
    question: String(doc.question ?? ""),
    answer: String(doc.answer ?? ""),
  };
}

const SYSTEM_PROMPT = `Bạn là trợ lý ảo của Eurowindow - thương hiệu cửa, vách kính và sản phẩm nội thất hàng đầu Việt Nam.
Trả lời ngắn gọn, chính xác, thân thiện bằng tiếng Việt. Nếu chưa chắc chắn thông tin, hãy gợi ý người dùng liên hệ hotline Eurowindow (0966 994 338) hoặc email Thangtq2@eurowindow.biz. Không bịa số liệu, không nói dối về sản phẩm.`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const question = String(body?.message ?? "").trim();
    if (!question) {
      return Response.json({ ok: false, error: "Thiếu câu hỏi" }, { status: 400 });
    }
    if (question.length > 500) {
      return Response.json({ ok: false, error: "Câu hỏi quá dài (tối đa 500 ký tự)" }, { status: 400 });
    }

    // 1) Keyword matching: static KB + DB KB
    const db = await getDb();
    const allEntries: KnowledgeEntry[] = [...knowledgeBase];
    try {
      if (db) {
        const docs = await db.collection(COLLECTIONS.knowledge).find({}).toArray();
        for (const doc of docs) allEntries.push(toEntry(doc as unknown as Record<string, unknown>));
      }
    } catch {
      // DB lỗi thì chỉ dùng static KB
    }

    const hit = matchKnowledge(question, allEntries);
    if (hit) {
      return Response.json({
        ok: true,
        source: "knowledge",
        message: hit.entry.answer,
        category: hit.entry.category,
      });
    }

    // 2) Tìm kiếm ngữ cảnh từ tài liệu nội bộ đã tải lên (Document RAG)
    try {
      const { searchDocumentContext } = await import("@/lib/documentSearch");
      const docContext = await searchDocumentContext(question);

      if (docContext.matchedChunks.length > 0 && docContext.contextText) {
        const docSystemPrompt = `${SYSTEM_PROMPT}

DƯỚI ĐÂY LÀ THÔNG TIN TRÍCH XUẤT TỪ TÀI LIỆU NỘI BỘ VÀ CATALOGUE EUROWINDOW LIÊN QUAN ĐẾN CÂU HỎI:
---
${docContext.contextText}
---
HƯỚNG DẪN TRẢ LỜI:
1. Hãy ưu tiên sử dụng thông tin chính xác, trung thực từ tài liệu trên để trả lời khách hàng.
2. Trích dẫn chuẩn xác các thông số kỹ thuật, báo giá, hệ nhôm, phụ kiện, ưu điểm nếu được đề cập trong tài liệu.
3. Trả lời mạch lạc, chuyên nghiệp, thân thiện bằng tiếng Việt.`;

        const llm = await chatWithRotation(docSystemPrompt, question);
        if (llm.provider) {
          return Response.json({
            ok: true,
            source: "document",
            provider: llm.provider,
            message: llm.content,
            sources: Array.from(new Set(docContext.matchedChunks.map((c) => c.documentTitle))),
          });
        }
      }
    } catch (err) {
      console.warn("[chat] Document RAG search error (fallback to general LLM):", err);
    }

    // 3) LLM fallback với rotation 5 providers
    const llm = await chatWithRotation(SYSTEM_PROMPT, question);
    if (llm.provider) {
      return Response.json({
        ok: true,
        source: "llm",
        provider: llm.provider,
        message: llm.content,
      });
    }
    return Response.json({
      ok: true,
      source: "fallback",
      message:
        "Tôi chưa có sẵn câu trả lời cho câu hỏi này. Vui lòng liên hệ hotline Eurowindow 0966 994 338 hoặc email Thangtq2@eurowindow.biz để được tư vấn chi tiết.",
    });

  } catch (err) {
    return Response.json(
      { ok: false, error: err instanceof Error ? err.message : "Lỗi server" },
      { status: 500 },
    );
  }
}
