import { getAllDocuments, type StoredDocument } from "./documentStore";
import type { DocumentChunk } from "./documentParser";

export type MatchedChunk = {
  documentTitle: string;
  fileName: string;
  chunk: DocumentChunk;
  score: number;
};

function normalizeVi(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Tìm kiếm các đoạn tài liệu có độ liên quan cao nhất với câu hỏi người dùng
 */
export async function searchDocumentContext(
  query: string,
  topK = 4,
  minScore = 2.5
): Promise<{ matchedChunks: MatchedChunk[]; contextText: string }> {
  try {
    const allDocs = await getAllDocuments();
    const docs = allDocs.filter((d) => d.enabled !== false);

    if (!docs || docs.length === 0) {
      return { matchedChunks: [], contextText: "" };
    }

    const queryRaw = query.toLowerCase();
    const queryNorm = normalizeVi(query);
    const rawTokens = queryRaw.split(/\s+/).filter((t) => t.length >= 2);
    const normTokens = queryNorm.split(/\s+/).filter((t) => t.length >= 2);

    const candidates: MatchedChunk[] = [];

    for (const doc of docs) {
      for (const chunk of doc.chunks) {
        let score = 0;
        const chunkRaw = chunk.text.toLowerCase();
        const chunkNorm = normalizeVi(chunk.text);

        // 1. Khớp cụm từ nguyên văn
        if (chunkRaw.includes(queryRaw) || chunkNorm.includes(queryNorm)) {
          score += 10;
        }

        // 2. Khớp từng từ khóa chính
        for (const token of rawTokens) {
          if (chunkRaw.includes(token)) {
            score += 2;
          }
        }

        // 3. Khớp từ không dấu (hỗ trợ gõ tiếng Việt không dấu)
        for (const token of normTokens) {
          if (chunkNorm.includes(token)) {
            score += 1.5;
          }
        }

        // 4. Khớp danh sách keywords đã rút trích
        for (const kw of chunk.keywords) {
          const kwLower = kw.toLowerCase();
          const kwNorm = normalizeVi(kw);
          if (queryRaw.includes(kwLower) || queryNorm.includes(kwNorm)) {
            score += 3;
          }
        }

        // 5. Thưởng điểm cho mã hiệu sản phẩm (ví dụ EA55, EA95, Kommerling, LOW-E,...)
        const codes = chunkRaw.match(/[a-z0-9]+-[a-z0-9]+|[a-z]{2,}[0-9]{2,}/gi) || [];
        for (const code of codes) {
          if (queryRaw.includes(code.toLowerCase())) {
            score += 4;
          }
        }

        if (score >= minScore) {
          candidates.push({
            documentTitle: doc.title || doc.fileName,
            fileName: doc.fileName,
            chunk,
            score,
          });
        }
      }
    }

    // Sắp xếp giảm dần theo điểm số
    candidates.sort((a, b) => b.score - a.score);
    const topMatches = candidates.slice(0, topK);

    if (topMatches.length === 0) {
      return { matchedChunks: [], contextText: "" };
    }

    // Định dạng đoạn trích dẫn để đưa vào prompt của LLM
    const contextText = topMatches
      .map(
        (m, i) =>
          `[Tài liệu ${i + 1}: ${m.documentTitle} (${m.fileName}) - Đoạn ${m.chunk.sectionIndex}]:\n${m.chunk.text}`
      )
      .join("\n\n---\n\n");

    return {
      matchedChunks: topMatches,
      contextText,
    };
  } catch (err) {
    console.error("[documentSearch] Error searching document context:", err);
    return { matchedChunks: [], contextText: "" };
  }
}
