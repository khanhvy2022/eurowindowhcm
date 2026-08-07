import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import * as http from 'http';

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'articles');

const PAGES_TO_SCRAPE = [
  // Projects - national
  { url: 'https://eurowindow.biz/cong-trinh-tieu-bieu/nha-quoc-hoi.html', slug: 'nha-quoc-hoi' },
  { url: 'https://eurowindow.biz/cong-trinh-tieu-bieu/tru-so-bo-ngoai-giao.html', slug: 'bo-ngoai-giao' },
  { url: 'https://eurowindow.biz/cong-trinh-tieu-bieu/benh-vien-viet-phap.html', slug: 'benh-vien-viet-phap' },
  { url: 'https://eurowindow.biz/cong-trinh-tieu-bieu/benh-vien-ung-buou-da-nang.html', slug: 'benh-vien-ung-buou-da-nang' },
  { url: 'https://eurowindow.biz/cong-trinh-tieu-bieu/benh-vien-nhi-dong-tp-ho-chi-minh.html', slug: 'benh-vien-nhi-dong' },
  { url: 'https://eurowindow.biz/cong-trinh-tieu-bieu/cang-hang-khong-phu-bai-hue.html', slug: 'san-bay-phu-bai' },
  { url: 'https://eurowindow.biz/cong-trinh-tieu-bieu/cang-hang-khong-quoc-te-can-tho.html', slug: 'san-bay-can-tho' },
  { url: 'https://eurowindow.biz/cong-trinh-tieu-bieu/cang-hang-khong-quoc-te-van-don.html', slug: 'san-bay-van-don' },
  { url: 'https://eurowindow.biz/cong-trinh-tieu-bieu/toa-nha-van-phong-chinh-phu.html', slug: 'toa-nha-chinh-phu' },
  { url: 'https://eurowindow.biz/cong-trinh-tieu-bieu/tru-so-bo-cong-an.html', slug: 'bo-cong-an' },
  { url: 'https://eurowindow.biz/cong-trinh-tieu-bieu/tru-so-van-phong-vien-kiem-sat-nhan-dan-toi-cao.html', slug: 'vksnd-toi-cao' },
  { url: 'https://eurowindow.biz/cong-trinh-tieu-bieu/tt-truyen-hinh-thong-tan-xa-viet-nam.html', slug: 'tt-ttxvn' },
  // Products
  { url: 'https://eurowindow.biz/cua-nhom/cua-di-nhom.html', slug: 'cua-di-nhom' },
  { url: 'https://eurowindow.biz/cua-nhom/cua-so-nhom.html', slug: 'cua-so-nhom' },
  { url: 'https://eurowindow.biz/cua-nhom/vach-kinh-nhom.html', slug: 'vach-kinh-nhom' },
  { url: 'https://eurowindow.biz/cua-upvc.html', slug: 'cua-upvc' },
  { url: 'https://eurowindow.biz/cua-go/cua-go-tu-nhien.html', slug: 'cua-go-tu-nhien' },
  { url: 'https://eurowindow.biz/cua-go/cua-go-cong-nghiep.html', slug: 'cua-go-cong-nghiep' },
  { url: 'https://eurowindow.biz/cua-go/cua-go-ghep-thanh.html', slug: 'cua-go-ghep-thanh' },
  { url: 'https://eurowindow.biz/cua-go/cua-go-composite.html', slug: 'cua-go-composite' },
  { url: 'https://eurowindow.biz/cua-go/cua-go-chong-chay.html', slug: 'cua-go-chong-chay' },
  { url: 'https://eurowindow.biz/cua-cuon.html', slug: 'cua-cuon' },
  { url: 'https://eurowindow.biz/cua-tu-dong.html', slug: 'cua-tu-dong' },
  { url: 'https://eurowindow.biz/kinh/kinh-cuong-luc.html', slug: 'kinh-cuong-luc' },
  { url: 'https://eurowindow.biz/kinh/kinh-chong-chay.html', slug: 'kinh-chong-chay' },
  { url: 'https://eurowindow.biz/kinh/kinh-cach-am.html', slug: 'kinh-cach-am' },
  { url: 'https://eurowindow.biz/kinh/kinh-low-e.html', slug: 'kinh-low-e' },
  { url: 'https://eurowindow.biz/kinh/kinh-dien-thong-minh.html', slug: 'kinh-dien-thong-minh' },
  { url: 'https://eurowindow.biz/cua-thong-minh.html', slug: 'cua-thong-minh' },
  // News
  { url: 'https://eurowindow.biz/tin-tuc', slug: 'tin-tuc' },
  // Main homepage for hero images
  { url: 'https://eurowindow.biz/', slug: 'homepage' },
];

async function downloadImage(url: string, filepath: string): Promise<boolean> {
  return new Promise((resolve) => {
    const mod = url.startsWith('https') ? https : http;
    const get = (u: string) => {
      mod.get(u, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          get(res.headers.location);
          return;
        }
        if (res.statusCode !== 200) { resolve(false); return; }
        const chunks: Buffer[] = [];
        res.on('data', (c: Buffer) => chunks.push(c));
        res.on('end', () => {
          fs.mkdirSync(path.dirname(filepath), { recursive: true });
          fs.writeFileSync(filepath, Buffer.concat(chunks));
          resolve(true);
        });
      }).on('error', () => resolve(false));
    };
    get(url);
  });
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' });
  const page = await ctx.newPage();

  const imageManifest: Record<string, { url: string; alt: string; filepath: string }[]> = {};

  for (const { url, slug } of PAGES_TO_SCRAPE) {
    console.log(`Scraping: ${slug} ...`);
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForTimeout(1500);

      const images = await page.evaluate(() => {
        return [...document.querySelectorAll('img')].map(img => ({
          src: (img as HTMLImageElement).src || (img as HTMLImageElement).dataset?.src || '',
          alt: (img as HTMLImageElement).alt || '',
        })).filter(i =>
          i.src &&
          !i.src.includes('svg') &&
          !i.src.includes('flag') &&
          !i.src.includes('logo') &&
          !i.src.includes('icon') &&
          !i.src.includes('bct.png') &&
          !i.src.includes('dmca') &&
          !i.src.includes('callcenter') &&
          !i.src.includes('default_image') &&
          !i.src.startsWith('data:') &&
          (i.src.includes('sudospaces') || i.src.includes('eurowindow'))
        );
      });

      const dir = path.join(OUTPUT_DIR, slug);
      fs.mkdirSync(dir, { recursive: true });

      const manifest: { url: string; alt: string; filepath: string }[] = [];
      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        const ext = img.src.includes('.webp') ? '.webp' : img.src.includes('.png') ? '.png' : '.jpg';
        const filename = `${slug}-${i + 1}${ext}`;
        const filepath = path.join(dir, filename);
        const ok = await downloadImage(img.src, filepath);
        if (ok) {
          manifest.push({ url: img.src, alt: img.alt, filepath: `articles/${slug}/${filename}` });
        }
      }
      imageManifest[slug] = manifest;
      console.log(`  Found ${images.length} images, downloaded ${manifest.length}`);
    } catch (e: any) {
      console.log(`  Error: ${e.message}`);
      imageManifest[slug] = [];
    }
  }

  // Write manifest
  fs.writeFileSync(path.join(OUTPUT_DIR, 'manifest.json'), JSON.stringify(imageManifest, null, 2));
  console.log(`\nDone. Manifest saved to public/articles/manifest.json`);

  await browser.close();
})();
