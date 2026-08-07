import { chatWithRotation, type ChatFn } from "@/lib/llm";

export type ContentRequest = {
  topic: string;
  keywords?: string[];
  style?: "blog" | "product" | "faq" | "news";
  length?: "short" | "medium" | "long";
  language?: "vi" | "en";
};

export type ContentResult = {
  title: string;
  description: string;
  content: string;
  provider: string | null;
};

const STYLE_PROMPTS: Record<string, string> = {
  blog: "Viet bai blog chuyen nghiep ve Eurowindow - cua, vach kinh, noi that uPVC. Dinh dang markdown voi H2, H3.",
  product: "Viet mo ta san pham Eurowinh. Mo ta chi tiet cong dung, dac diem ky thuat, uu diem.",
  faq: "Tao danh sach cau hoi thuong gap (FAQ) ve Eurowindow. Moi cau hoi di voi tra loi ngan gon.",
  news: "Viet tin tuc ngan gon ve Eurowindow, su kien, khuyen mai, cap nhat san pham moi.",
};

const LENGTH_MAP = { short: "300-500 tu", medium: "500-1000 tu", long: "1000-2000 tu" };

const GENERATOR_PROMPT = `Ban la chuyen gia Content SEO cho website Eurowindow (cua, vach kinh, noi that uPVC).
Viet noi dung tieng Viet, chinh xac, hap dan. Khong bia so lieu, khong noi doi.
Tra ve dung dinh dang: TIEU DE (dong dau), MO TA NGAN (155 ky tu), NOI DUNG (markdown).`;

export async function generateContent(
  req: ContentRequest,
  llm: ChatFn = chatWithRotation,
): Promise<ContentResult> {
  const style = req.style ?? "blog";
  const length = LENGTH_MAP[req.length ?? "medium"];
  const kws = req.keywords?.length ? `Tu khoa muc tieu: ${req.keywords.join(", ")}` : "";

  const user = [
    `Chu de: ${req.topic}`,
    `Kieu: ${style}`,
    `Do dai: ${length}`,
    kws,
    STYLE_PROMPTS[style] ?? STYLE_PROMPTS.blog,
    "Tra ve: TIEU DE\\nMO TA NGAN\\nNOI DUNG",
  ].filter(Boolean).join("\n");

  try {
    const res = await llm(GENERATOR_PROMPT, user);
    if (res.provider && res.content) {
      const lines = res.content.split("\n");
      const title = lines.find((l) => l.trim().length > 0)?.replace(/^#+\s*/, "").trim() ?? req.topic;
      const descLine = lines.findIndex((l) => /mo ta|description/i.test(l));
      const description = descLine >= 0 ? lines[descLine + 1]?.trim().slice(0, 155) ?? "" : "";
      const contentStart = lines.findIndex((l) => /noi dung|content/i.test(l));
      const content = contentStart >= 0 ? lines.slice(contentStart + 1).join("\n").trim() : res.content;
      return { title: title.slice(0, 60), description: description.slice(0, 155), content, provider: res.provider };
    }
  } catch {
    // fallback
  }

  return {
    title: req.topic,
    description: `Mo ta ve ${req.topic} - Eurowindow`,
    content: `# ${req.topic}\n\nNoi dung dang duoc cap nhat. Vui long thu lai sau.`,
    provider: null,
  };
}
