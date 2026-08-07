import { chatWithRotation } from "../src/lib/llm";
import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

const BASE = join(process.cwd(), "docs", "articles");

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

function buildFrontmatter(meta: Record<string, string>) {
  return `---
title: "${meta.title || ""}"
description: "${meta.description || ""}"
category: "${meta.category || "Sản phẩm"}"
date: "${meta.date || "2026-08-03"}"
keywords: [${(meta.keywords || "").split(",").map((k: string) => `"${k.trim()}"`).join(", ")}]
---`;
}

async function rewriteArticle(filePath: string) {
  const raw = readFileSync(filePath, "utf-8");
  const { meta, body } = parseFrontmatter(raw);
  
  // Check if content is placeholder or too short
  const wordCount = body.split(/\s+/).length;
  const hasPlaceholder = body.includes("Noi dung dang duoc cap nhat") || body.includes("Vui long thu lai");
  
  if (wordCount > 200 && !hasPlaceholder && body.includes("## ")) {
    return false; // Already good
  }

  const topic = meta.title || "";
  const keywords = meta.keywords || "";
  const category = meta.category || "Sản phẩm";

  const prompt = `Viết bài ${category.toLowerCase()} tiếng Việt về Eurowindow.

Chủ đề: ${topic}
Từ khóa: ${keywords}

Viết 400-500 từ, format markdown:
- Mở bài 2 câu tóm tắt
- 3-4 mục H2, mỗi mục có bullet points
- Đưa số liệu kỹ thuật cụ thể
- Kết bài + CTA liên hệ Eurowindow
- KHÔNG dùng H1 (đã có trong title)

Trả về NGAY nội dung markdown, không giải thích.`;

  try {
    const res = await chatWithRotation("Bạn là chuyên gia SEO content writer tiếng Việt.", prompt);
    if (res.content && res.content.length > 100) {
      let content = res.content.replace(/^```[\s\S]*?\n/, "").replace(/\n```$/, "");
      if (!content.startsWith("---")) {
        content = buildFrontmatter(meta) + "\n\n" + content;
      }
      writeFileSync(filePath, content, "utf-8");
      return true;
    }
  } catch {}
  return false;
}

async function run() {
  const dirs = ["du-an", "tin-tuc", "san-pham"] as const;
  let fixed = 0;
  
  for (const dir of dirs) {
    const dirPath = join(BASE, dir);
    const files = readdirSync(dirPath).filter((f) => f.endsWith(".md"));
    
    for (const file of files) {
      const filePath = join(dirPath, file);
      const raw = readFileSync(filePath, "utf-8");
      const wordCount = raw.split(/\s+/).length;
      const hasPlaceholder = raw.includes("Noi dung dang duoc cap nhat") || raw.includes("Vui long thu lai");
      
      if (wordCount < 200 || hasPlaceholder) {
        console.log(`Rewriting: ${file.slice(0, 60)}...`);
        const ok = await rewriteArticle(filePath);
        if (ok) { fixed++; console.log("  ✓ Done"); }
        else console.log("  ✗ Failed");
      }
    }
  }
  
  console.log(`\nRetry: ${fixed} articles rewritten.`);
}

run().catch(console.error);
