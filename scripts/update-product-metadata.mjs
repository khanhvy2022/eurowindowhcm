import fs from 'fs';
import path from 'path';

// Define the root directory
const rootDir = 'f:\\Nextjs\\eurowindowhcm\\src\\app\\san-pham';

function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findFiles(filePath, fileList);
    } else if (file === 'page.tsx') {
      // Check if it's an article page
      // Pattern: san-pham/<category>/bai-viet/<slug>/page.tsx
      const parts = filePath.split(path.sep);
      const baiVietIndex = parts.indexOf('bai-viet');
      if (baiVietIndex !== -1 && baiVietIndex === parts.length - 3) {
        fileList.push(filePath);
      }
    }
  }
  return fileList;
}

const filesToUpdate = findFiles(rootDir);
console.log(`Found ${filesToUpdate.length} files to update.`);

let updatedCount = 0;

for (const filePath of filesToUpdate) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  let changed = false;

  // Add import if not present
  if (!content.includes('buildProductArticleMetadata')) {
    const importStr = `import { buildProductArticleMetadata } from "@/lib/seo/metadata-helpers";\n`;
    
    // Find the last import
    const lastImportMatch = [...content.matchAll(/^import .*;$/gm)].pop();
    if (lastImportMatch) {
      const lastImportIndex = lastImportMatch.index + lastImportMatch[0].length;
      content = content.slice(0, lastImportIndex) + '\n' + importStr + content.slice(lastImportIndex);
    } else {
      content = importStr + content;
    }
    
    // Remove consecutive newlines created
    content = content.replace(/\n{3,}/g, '\n\n');
    changed = true;
  }

  // Replace generateMetadata
  const generateMetadataRegex = /export async function generateMetadata\(\) \{\s*const a = await getSanPhamArticle\(SLUG, LABEL\);\s*if \(!a\) notFound\(\);\s*return \{[\s\S]*?\};\s*\}/m;
  
  if (generateMetadataRegex.test(content)) {
    const replacement = `export async function generateMetadata() {
  const a = await getSanPhamArticle(SLUG, LABEL);
  if (!a) notFound();
  return buildProductArticleMetadata({
    title: a.title,
    excerpt: a.excerpt ?? "",
    categoryKey: CATEGORY_KEY,
    slug: SLUG,
    image: a.image,
    categoryLabel: LABEL,
  });
}`;
    content = content.replace(generateMetadataRegex, replacement);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf-8');
    updatedCount++;
    console.log(`Updated: ${filePath}`);
  }
}

console.log(`Done. Updated ${updatedCount} files.`);
