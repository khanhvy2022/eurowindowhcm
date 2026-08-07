import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

const BASE = join(process.cwd(), "docs", "articles");

function generateDescription(title: string): string {
  // Generate a 120-155 char meta description from title
  const clean = title.replace(/\s*-\s*Eurowindow.*$/, "").trim();
  const templates = [
    `${clean}. Eurowindow - Nhà cung cấp giải pháp cửa, kính và vật liệu xây dựng xanh hàng đầu Việt Nam.`,
    `Tìm hiểu về ${clean.toLowerCase()} từ Eurowindow. Liên hệ hotline 024 37 47 47 00 để được tư vấn.`,
    `${clean}. Khám phá giải phápEurowindow với công nghệ tiên tiến, tiết kiệm năng lượng.`,
    `${clean}. Eurowindow cam kết chất lượng, bảo hành dài hạn, lắp đặt chuyên nghiệp.`,
  ];
  // Pick based on title length to vary
  const idx = title.length % templates.length;
  const desc = templates[idx];
  return desc.length > 155 ? desc.slice(0, 152) + "..." : desc;
}

const dirs = ["du-an", "tin-tuc", "san-pham"] as const;
let fixed = 0;

for (const dir of dirs) {
  const dirPath = join(BASE, dir);
  const files = readdirSync(dirPath).filter((f) => f.endsWith(".md"));
  
  for (const file of files) {
    const filePath = join(dirPath, file);
    const content = readFileSync(filePath, "utf-8");
    
    if (content.includes('description: ""')) {
      const titleMatch = content.match(/title:\s*"([^"]+)"/);
      const title = titleMatch ? titleMatch[1] : "";
      const desc = generateDescription(title);
      const updated = content.replace('description: ""', `description: "${desc}"`);
      writeFileSync(filePath, updated, "utf-8");
      fixed++;
    }
  }
}

console.log(`Fixed ${fixed} empty descriptions.`);
