/**
 * Fix migrated articles that contain <h1> tags in contentHtml.
 * Converts <h1> to <h2> to prevent duplicate H1 on news detail pages.
 *
 * Run: npx tsx scripts/fix-migrated-h1.ts
 */
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const FILE = join(process.cwd(), "src", "data", "migrated-articles.json");

const raw = readFileSync(FILE, "utf-8");
const articles = JSON.parse(raw);

let totalFixed = 0;

for (const article of articles) {
  if (article.contentHtml && /<h1[\s>]/i.test(article.contentHtml)) {
    article.contentHtml = article.contentHtml
      .replace(/<h1(\s[^>]*)?>/gi, "<h2$1>")
      .replace(/<\/h1>/gi, "</h2>");
    totalFixed++;
    console.log(`Fixed H1 in: ${article.slug || article.title}`);
  }
}

if (totalFixed > 0) {
  writeFileSync(FILE, JSON.stringify(articles, null, 2), "utf-8");
  console.log(`\n✅ Done. Fixed ${totalFixed} articles.`);
} else {
  console.log("No articles with <h1> in contentHtml found.");
}
