const fs = require('fs');
const path = require('path');

const articlesViFile = fs.readFileSync('src/app/tin-tuc/articles.ts', 'utf8');
const articlesEnFile = fs.readFileSync('src/app/en/articles-data.ts', 'utf8');
const projectsViFile = fs.readFileSync('src/app/du-an/projects.ts', 'utf8');
const projectsEnFile = fs.readFileSync('src/app/en/projects-data.ts', 'utf8');

const imgRegex = /(?:image|images):\s*["'\[]([^"'\]]+)["'\]]/g;
const pathRegex = /(?:\/eurowindow\/[^\s"',\]]+|C\s*\+\s*"[^"]+"|H\s*\+\s*"[^"]+")/g;

// Simple string extraction of all image paths
const content = articlesViFile + "\n" + articlesEnFile + "\n" + projectsViFile + "\n" + projectsEnFile;
const matches = content.match(/\/eurowindow\/[a-zA-Z0-9_\-\.\/]+/g) || [];

const uniqueImages = new Set(matches);

console.log("Checking all " + uniqueImages.size + " image assets in articles and projects:");
let missingCount = 0;
for (const img of uniqueImages) {
  // Clean up syntax noise if any
  const cleanImg = img.replace(/["',]/g, '').trim();
  const localPath = path.join(process.cwd(), 'public', cleanImg.startsWith('/') ? cleanImg.slice(1) : cleanImg);
  const exists = fs.existsSync(localPath);
  if (!exists) {
    console.log("[MISSING] " + cleanImg);
    missingCount++;
  }
}
console.log("\nSummary: Total missing images = " + missingCount);
