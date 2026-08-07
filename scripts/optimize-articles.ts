import { chatWithRotation } from "../src/lib/llm";
import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

const BASE = join(process.cwd(), "docs", "articles");

const SEO_SYSTEM = `Bạn là chuyên gia SEO content writer tiếng Việt, chuyên viết bài cho Eurowindow (cửa, kính, vật liệu xây dựng xanh).

QUY TẮC VIẾT:
1. Viết tiếng Việt chuyên nghiệp, trôi chảy, không lỗi chính tả
2. Mở bài 2-3 câu tóm tắt giá trị bài viết cho người đọc
3. Mỗi H2 là 1 ý chính, H3 là ý con. Không dùng H1 trong bài (đã có ở title)
4. Đưa số liệu cụ thể khi có thể (độ dày nhôm, hệ số cách âm, nhiệt độ, etc.)
5. Từ khóa chính xuất hiện tự nhiên 3-5 lần trong bài, không nhồi nhét
6. Thêm gợi ý link nội bộ: "Xem thêm: [tên bài]" ở cuối mỗi H2
7. Kết bài tóm tắt + CTA (liên hệ, xem thêm, báo giá)
8. Mỗi bài 400-600 từ
9. Dùng bullet points, bold text cho điểm quan trọng
10. Không dùng "bài viết này", "chúng tôi" quá nhiều. Tập trung vào giá trị读者`;

function parseFrontmatter(content: string) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: content };
  const metaBlock = match[1];
  const body = match[2];
  const meta: Record<string, string> = {};
  for (const line of metaBlock.split("\n")) {
    const [key, ...rest] = line.split(":");
    if (key && rest.length) {
      meta[key.trim()] = rest.join(":").trim().replace(/^["']|["']$/g, "");
    }
  }
  return { meta, body };
}

function buildFrontmatter(meta: Record<string, string>, title: string, description: string, keywords: string[]) {
  return `---
title: "${title}"
description: "${description}"
category: "${meta.category || "Dự án"}"
date: "${meta.date || "2026-08-03"}"
keywords: [${keywords.map((k) => `"${k}"`).join(", ")}]
---`;
}

async function optimizeArticle(filePath: string, type: "du-an" | "tin-tuc" | "san-pham") {
  const raw = readFileSync(filePath, "utf-8");
  const { meta, body } = parseFrontmatter(raw);
  
  // Skip if already good (>500 words and has proper structure)
  const wordCount = body.split(/\s+/).length;
  if (wordCount > 400 && body.includes("## ") && !body.includes("Noi dung dang duoc cap nhat")) {
    // Just fix frontmatter
    const title = meta.title || "";
    const desc = meta.description || "";
    const keywords = meta.keywords ? JSON.parse(meta.keywords.replace(/'/g, '"')) : [];
    
    if (!desc || desc.length < 50 || desc.startsWith("Mo ta ve")) {
      // Need to generate description
      const descPrompt = `Viết meta description 155 ký tự cho bài: "${title}". Trả về CHỈ câu mô tả, không markdown.`;
      try {
        const res = await chatWithRotation(SEO_SYSTEM, descPrompt);
        if (res.provider && res.content) {
          meta.description = res.content.slice(0, 155);
        }
      } catch {}
    }
    
    const fixed = buildFrontmatter(meta, title, meta.description || "", keywords) + "\n\n" + body;
    writeFileSync(filePath, fixed, "utf-8");
    return { fixed: true, reason: "frontmatter only" };
  }
  
  // Need full rewrite
  const topic = meta.title || body.split("\n").find(l => l.startsWith("# "))?.replace("# ", "") || "";
  const keywords = meta.keywords ? JSON.parse(meta.keywords.replace(/'/g, '"')) : [];
  
  const categoryLabel = type === "du-an" ? "dự án" : type === "tin-tuc" ? "tin tức" : "sản phẩm";
  
  const prompt = `Viết lại bài ${categoryLabel} sau đây về Eurowindow. 
Chủ đề: "${topic}"
Từ khóa: ${keywords.join(", ")}

Bài gốc:
${body.slice(0, 2000)}

YÊU CẦU:
- Viết lại hoàn toàn bằng tiếng Việt chuyên nghiệp
- Mở bài: 2-3 câu tóm tắt giá trị cho người đọc
- Kết cấu: H2 cho ý chính, H3 cho ý con (KHÔNG dùng H1)
- Mỗi H2 có bullet points hoặc bold text cho điểm quan trọng
- Đưa số liệu kỹ thuật cụ thể khi có thể (độ dày, hệ số, nhiệt độ, thời gian)
- Cuối mỗi H2 thêm: "Xem thêm: [gợi ý bài liên quan]"
- Kết bài: tóm tắt + CTA (liên hệ Eurowindow 024 37 47 47 00)
- 400-600 từ, không nhồi nhét từ khóa
- Trả về format markdown với frontmatter:
---
title: "Tiêu đề SEO optimized"
description: "Meta description 155 ký tự"
category: "${meta.category || "Dự án"}"
date: "${meta.date || "2026-08-03"}"
keywords: [${keywords.map((k) => `"${k}"`).join(", ")}]
---

# Tiêu đề bài viết

Nội dung bài viết...`;

  try {
    const res = await chatWithRotation(SEO_SYSTEM, prompt);
    if (res.provider && res.content && res.content.length > 200) {
      // Clean up the response
      let content = res.content;
      // Remove code block markers if present
      content = content.replace(/^```markdown\n?/i, "").replace(/\n?```$/i, "");
      // Ensure it starts with frontmatter
      if (!content.startsWith("---")) {
        const fm = buildFrontmatter(meta, topic, meta.description || "", keywords);
        content = fm + "\n\n" + content;
      }
      writeFileSync(filePath, content, "utf-8");
      return { fixed: true, reason: "full rewrite" };
    }
  } catch (err) {
    return { fixed: false, reason: `error: ${err}` };
  }
  return { fixed: false, reason: "no content" };
}

async function run() {
  const dirs = ["du-an", "tin-tuc", "san-pham"] as const;
  let total = 0;
  let fixed = 0;
  
  for (const dir of dirs) {
    const dirPath = join(BASE, dir);
    const files = readdirSync(dirPath).filter((f) => f.endsWith(".md"));
    console.log(`\n=== ${dir} (${files.length} files) ===`);
    
    for (const file of files) {
      total++;
      const filePath = join(dirPath, file);
      console.log(`[${total}] ${file.slice(0, 60)}...`);
      const result = await optimizeArticle(filePath, dir);
      if (result.fixed) {
        fixed++;
        console.log(`  ✓ ${result.reason}`);
      } else {
        console.log(`  ✗ ${result.reason}`);
      }
    }
  }
  
  console.log(`\nDone! ${fixed}/${total} articles optimized.`);
}

run().catch(console.error);
