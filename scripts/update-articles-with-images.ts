import * as fs from 'fs';
import * as path from 'path';

const ARTICLES_DIR = path.join(__dirname, '..', 'docs', 'articles');

// Map article filenames to their image directories
const ARTICLE_IMAGE_MAP: Record<string, string> = {
  // Projects
  'nha-quoc-hoi-viet-nam': 'du-an/nha-quoc-hoi',
  'tru-so-bo-ngoai-giao': 'du-an/tru-so-bo-ngoai-giao',
  'benh-vien-viet-phap': 'du-an/benh-vien-viet-phap-ha-noi',
  'benh-vien-ung-buou-da-nang': 'du-an/benh-vien-ung-buou-da-nang',
  'benh-vien-nhi-dong': 'du-an/benh-vien-nhi-dong-tp-ho-chi-minh',
  'cang-hang-khong-phu-bai': 'du-an/cang-hang-khong-phu-bai-hue',
  'cang-hang-khong-can-tho': 'du-an/cang-hang-khong-quoc-te-can-tho',
  'cang-hang-khong-van-don': 'du-an/cang-hang-khong-quoc-te-van-don',
  'toa-nha-van-phong-chinh-phu': 'du-an/toa-nha-van-phong-chinh-phu',
  'tru-so-bo-cong-an': 'du-an/tru-so-bo-cong-an',
  'vksnd-toi-cao': 'du-an/tru-so-van-phong-vksnd-toi-cao',
  'tt-truyen-hinh-thong-tan-xa': 'du-an/trung-tam-truyen-hinh-thong-tan-xa',
  // Additional projects (reuse available images)
  'trung-tam-hoi-nghi-quoc-gia': 'du-an/nha-quoc-hoi',
  'toa-nha-van-phong-eurowindow': 'du-an/toa-nha-van-phong-chinh-phu',
  'the-prive-nam-rach-chiec': 'du-an/benh-vien-viet-phap-ha-noi',
  'the-9-stellars': 'du-an/benh-vien-ung-buou-da-nang',
  'sunshine-noble-palace': 'du-an/tru-so-bo-ngoai-giao',
  'vinhomes-grand-park': 'du-an/benh-vien-nhi-dong-tp-ho-chi-minh',
  'fpt-telecom-tower': 'du-an/trung-tam-truyen-hinh-thong-tan-xa',
  'vinhomes-global-gate': 'du-an/cang-hang-khong-phu-bai-hue',
  // Products
  'cua-di-nhom': 'san-pham/cua-di-nhom',
  'cua-so-nhom': 'san-pham/cua-so-nhom',
  'vach-kinh-nhom': 'san-pham/vach-kinh-nhom',
  'cua-upvc': 'san-pham/cua-upvc',
  'cua-go-tu-nhien': 'san-pham/cua-go-tu-nhien',
  'cua-go-cong-nghiep': 'san-pham/cua-go-cong-nghiep',
  'cua-go-ghep-thanh': 'san-pham/cua-go-ghep-thanh',
  'cua-go-composite': 'san-pham/cua-go-ghep-thanh',
  'cua-go-chong-chay': 'san-pham/cua-go-tu-nhien',
  'cua-cuon': 'san-pham/cua-di-nhom',
  'cua-tu-dong': 'san-pham/cua-di-nhom',
  'kinh-cuong-luc': 'san-pham/vach-kinh-nhom',
  'kinh-chong-chay': 'san-pham/vach-kinh-nhom',
  'kinh-cach-am': 'san-pham/vach-kinh-nhom',
  'kinh-low-e': 'san-pham/vach-kinh-nhom',
  'kinh-dien-thong-minh': 'san-pham/vach-kinh-nhom',
  'cua-thong-minh': 'san-pham/cua-di-nhom',
};

// Get hero image for a given image directory
function getHeroImage(imageDir: string): string | null {
  const dirPath = path.join(__dirname, '..', 'public', 'articles', imageDir);
  if (!fs.existsSync(dirPath)) return null;
  const files = fs.readdirSync(dirPath);
  const hero = files.find(f => f.startsWith('hero'));
  return hero ? `/articles/${imageDir}/${hero}` : null;
}

// Process all articles
function processArticles() {
  const categories = ['du-an', 'tin-tuc', 'san-pham'];
  let updated = 0;
  let skipped = 0;

  for (const cat of categories) {
    const catDir = path.join(ARTICLES_DIR, cat);
    if (!fs.existsSync(catDir)) continue;

    const files = fs.readdirSync(catDir).filter(f => f.endsWith('.md'));
    for (const file of files) {
      const filePath = path.join(catDir, file);
      let content = fs.readFileSync(filePath, 'utf-8');

      // Check if image already exists in frontmatter
      if (content.includes('image:')) {
        skipped++;
        continue;
      }

      // Find matching image directory
      const slug = file.replace('.md', '');
      let imageDir: string | null = null;

      // Try exact match first
      for (const [key, dir] of Object.entries(ARTICLE_IMAGE_MAP)) {
        if (slug.includes(key)) {
          imageDir = dir;
          break;
        }
      }

      // If no match, try partial match
      if (!imageDir) {
        for (const [key, dir] of Object.entries(ARTICLE_IMAGE_MAP)) {
          if (slug.toLowerCase().includes(key.toLowerCase().slice(0, 10))) {
            imageDir = dir;
            break;
          }
        }
      }

      const heroImage = imageDir ? getHeroImage(imageDir) : null;
      if (!heroImage) {
        console.log(`  No image: ${file}`);
        skipped++;
        continue;
      }

      // Add image to frontmatter
      const frontmatterEnd = content.indexOf('---', 3);
      if (frontmatterEnd === -1) continue;

      const before = content.slice(0, frontmatterEnd);
      const after = content.slice(frontmatterEnd);

      // Add image field before closing ---
      const imageLine = `image: "${heroImage}"\n`;
      content = before + imageLine + after;

      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`  Updated: ${file} → ${heroImage}`);
      updated++;
    }
  }

  console.log(`\nUpdated: ${updated}, Skipped: ${skipped}`);
}

processArticles();
