import { chatWithRotation, type ChatFn } from "@/lib/llm";

export type CompetitorUrl = {
  url: string;
  title?: string;
  metaDescription?: string;
  h1: string[];
  wordCount: number;
  schemaTypes: string[];
};

export type CompetitorInsight = {
  topic: string;
  competitorUrl: string;
  strengths: string[];
  gaps: string[];
  recommendations: string[];
};

export type CompetitorReport = {
  targetUrl: string;
  competitors: CompetitorUrl[];
  insights: CompetitorInsight[];
  summary: string;
  generatedAt: string;
};

const SYSTEM_PROMPT = `Ban la chuyen gia SEO phan tich doi thu canh.
Dua vao du lieu trang web, danh gia diem manh, diem yeu, va goi y cach vuot doi thu.
Tra ve tieng Viet, ngan gon, co the hanh dong duoc.`;

export async function analyzeCompetitors(
  targetUrl: string,
  competitors: CompetitorUrl[],
  llm: ChatFn = chatWithRotation,
): Promise<CompetitorReport> {
  if (competitors.length === 0) {
    return {
      targetUrl,
      competitors: [],
      insights: [],
      summary: "Không có dữ liệu đối thủ để phân tích.",
      generatedAt: new Date().toISOString(),
    };
  }

  const competitorSummary = competitors
    .map(
      (c, i) =>
        `${i + 1}. ${c.url}\n   Title: ${c.title ?? "N/A"}\n   H1: ${c.h1.join(", ") || "N/A"}\n   Words: ${c.wordCount}\n   Schema: ${c.schemaTypes.join(", ") || "N/A"}`,
    )
    .join("\n");

  const user = [
    `Trang dich: ${targetUrl}`,
    `Danh sach doi thu (${competitors.length}):`,
    competitorSummary,
    "",
    "Phan tiet:",
    "1. Diem manh cua tung doi thu",
    "2. Lo hong (gap) ma minh co the khai thac",
    "3. Goi y hanh dong cu the de vuot doi thu",
    "4. Tom tat 3-5 diem chinh",
  ].join("\n");

  try {
    const res = await llm(SYSTEM_PROMPT, user);
    if (res.provider && res.content) {
      const insights: CompetitorInsight[] = competitors.map((c) => ({
        topic: "general",
        competitorUrl: c.url,
        strengths: [],
        gaps: [],
        recommendations: [],
      }));

      return {
        targetUrl,
        competitors,
        insights,
        summary: res.content,
        generatedAt: new Date().toISOString(),
      };
    }
  } catch {
    // fallback
  }

  return {
    targetUrl,
    competitors,
    insights: [],
    summary: "Không thể phân tích đối thủ. Vui lòng thử lại.",
    generatedAt: new Date().toISOString(),
  };
}
