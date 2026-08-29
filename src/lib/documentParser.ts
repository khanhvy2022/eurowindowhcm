import mammoth from "mammoth";

async function extractPdfText(buffer: Buffer): Promise<string> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pdfModule = require("pdf-parse");
    if (pdfModule?.PDFParse) {
      const parser = new pdfModule.PDFParse({ data: buffer });
      const textResult = await parser.getText();
      if (typeof textResult === "string") return textResult;
      if (textResult?.text) return textResult.text;
      if (Array.isArray(textResult?.pages)) {
        return textResult.pages.map((p: { text?: string }) => p.text || "").join("\n\n");
      }
    }
    if (typeof pdfModule === "function") {
      const data = await pdfModule(buffer);
      return data?.text || "";
    }
    if (typeof pdfModule?.default === "function") {
      const data = await pdfModule.default(buffer);
      return data?.text || "";
    }
  } catch (err) {
    console.warn("[documentParser] PDF parsing library error, trying stream extraction:", err);
  }

  // Fallback text extraction from raw PDF byte streams
  try {
    const raw = buffer.toString("binary");
    const textMatches = raw.match(/\(([^()]+)\)\s*Tj/g) || [];
    if (textMatches.length > 0) {
      return textMatches.map((m) => m.replace(/^\(|\)\s*Tj$/g, "")).join(" ");
    }
  } catch {}

  return "";
}

export type DocumentChunk = {
  id: string;
  text: string;
  keywords: string[];
  sectionIndex: number;
};

export type ParsedDocument = {
  fileName: string;
  fileSize: number;
  fileType: string;
  title: string;
  chunks: DocumentChunk[];
  totalChunks: number;
  extractedChars: number;
};

/**
 * Rút trích từ khóa chính trong đoạn văn (tiếng Việt & mã kỹ thuật)
 */
function extractKeywords(text: string): string[] {
  const normalized = text.toLowerCase();
  const words = normalized
    .replace(/[^a-z0-9à-ỹ\s\-_]/gi, " ")
    .split(/\s+/)
    .filter((w) => w.length >= 2);

  // Lọc từ ngắn và từ dừng phổ biến
  const stopWords = new Set([
    "va", "và", "la", "là", "cua", "của", "cho", "voi", "với", "trong", "tai", "tại",
    "co", "có", "duoc", "được", "cac", "các", "nhung", "những", "mot", "một", "nay", "này",
    "do", "đó", "theo", "ve", "về", "nhu", "như", "de", "để", "ra", "vao", "vào"
  ]);

  const freq = new Map<string, number>();
  for (const w of words) {
    if (!stopWords.has(w)) {
      freq.set(w, (freq.get(w) ?? 0) + 1);
    }
  }

  // Lấy top 15 từ có tần suất cao nhất trong chunk
  return Array.from(freq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([w]) => w);
}

/**
 * Chia nhỏ văn bản thành các chunks có độ dài vừa phải (~600 - 1000 ký tự) kèm độ gối đầu
 */
function chunkText(text: string, chunkSize = 800, overlap = 150): DocumentChunk[] {
  const clean = text
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  if (!clean) return [];

  // Tách theo đoạn văn trước
  const paragraphs = clean.split(/\n\n+/);
  const chunks: DocumentChunk[] = [];
  let currentText = "";
  let chunkIdx = 0;

  for (const p of paragraphs) {
    const trimmed = p.trim();
    if (!trimmed) continue;

    if (currentText.length + trimmed.length <= chunkSize) {
      currentText += (currentText ? "\n\n" : "") + trimmed;
    } else {
      if (currentText) {
        chunks.push({
          id: `chunk_${chunkIdx++}`,
          text: currentText,
          keywords: extractKeywords(currentText),
          sectionIndex: chunkIdx,
        });
        // Lấy phần gối đầu từ cuối currentText
        const overlapText = currentText.slice(-overlap);
        currentText = overlapText + "\n\n" + trimmed;
      } else {
        // Đoạn văn quá dài thì cắt theo độ dài
        let remaining = trimmed;
        while (remaining.length > chunkSize) {
          const slice = remaining.slice(0, chunkSize);
          chunks.push({
            id: `chunk_${chunkIdx++}`,
            text: slice,
            keywords: extractKeywords(slice),
            sectionIndex: chunkIdx,
          });
          remaining = remaining.slice(chunkSize - overlap);
        }
        currentText = remaining;
      }
    }
  }

  if (currentText.trim()) {
    chunks.push({
      id: `chunk_${chunkIdx++}`,
      text: currentText.trim(),
      keywords: extractKeywords(currentText),
      sectionIndex: chunkIdx,
    });
  }

  return chunks;
}

/**
 * Phân tích file (PDF, DOCX, TXT, CSV, JSON, MD) và trả về văn bản đã chia chunk
 */
export async function parseDocument(
  buffer: Buffer,
  fileName: string,
  customTitle?: string
): Promise<ParsedDocument> {
  const ext = fileName.split(".").pop()?.toLowerCase() ?? "";
  const title = customTitle?.trim() || fileName.replace(/\.[^/.]+$/, "");
  let rawText = "";

  if (ext === "pdf") {
    rawText = await extractPdfText(buffer);
  } else if (ext === "docx") {
    const result = await mammoth.extractRawText({ buffer });
    rawText = result.value || "";
  } else if (["txt", "csv", "md", "json", "html"].includes(ext)) {
    rawText = buffer.toString("utf-8");
  } else {
    // Thử giải mã text mặc định
    rawText = buffer.toString("utf-8");
  }

  const chunks = chunkText(rawText);

  return {
    fileName,
    fileSize: buffer.length,
    fileType: ext,
    title,
    chunks,
    totalChunks: chunks.length,
    extractedChars: rawText.length,
  };
}
