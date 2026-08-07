// Download new project images from eurowindow.biz CDN
// Usage: node scripts/download-project-images.mjs

import fs from 'fs';
import path from 'path';
import https from 'https';

const imagesToDownload = [
  // Tòa nhà văn phòng Chính phủ (existing: mg-1220.jpg.webp, 20190612-hanoi-cityscape-7928.jpg.webp)
  {
    urls: [
      'https://storage.sudospaces.com/eurowindow/2022/07/w400/20190920-van-phong-chinh-phu-dsc6708-hdr.jpg.webp',
      'https://storage.sudospaces.com/eurowindow/2022/07/w400/20190920-van-phong-chinh-phu-dsc6692-hdr.jpg.webp',
      'https://storage.sudospaces.com/eurowindow/2022/07/w400/20190920-van-phong-chinh-phu-dsc6743-hdr.jpg.webp',
    ],
    dir: 'constructions'
  },
  // Trụ sở Bộ Công an
  {
    urls: [
      'https://storage.sudospaces.com/eurowindow/2021/12/w400/50522321.jpg.webp',
      'https://storage.sudospaces.com/eurowindow/2021/12/w400/b-u1ed9-cong-an.jpg.webp',
      'https://storage.sudospaces.com/eurowindow/2021/12/w400/pc-bo-cong-an-5.png.webp',
    ],
    dir: 'constructions'
  },
  // Trụ sở Bộ Ngoại giao
  {
    urls: [
      'https://storage.sudospaces.com/eurowindow/2022/07/w400/img-0133.jpg.webp',
      'https://storage.sudospaces.com/eurowindow/2022/07/w400/1467270859-3.jpg.webp',
      'https://storage.sudospaces.com/eurowindow/2022/07/w400/img-7545.jpg.webp',
    ],
    dir: 'constructions'
  },
  // Cảng hàng không Cần Thơ
  {
    urls: [
      'https://storage.sudospaces.com/eurowindow/2021/12/w400/san-bay-can-tho-3.png.webp',
    ],
    dir: 'constructions'
  },
  // Khu đô thị Sala
  {
    urls: [
      'https://storage.sudospaces.com/eurowindow/2022/07/w400/dji-0153-1.jpg.webp',
    ],
    dir: 'constructions'
  },
  // Dự án Khai Sơn Hill
  {
    urls: [
      'https://storage.sudospaces.com/eurowindow/2022/07/w400/dji-0485-hdr.jpg.webp',
      'https://storage.sudospaces.com/eurowindow/2022/07/w400/dji-0482-hdr.jpg.webp',
    ],
    dir: 'constructions'
  },
  // Nhà phố Chùa Thông
  {
    urls: [
      'https://storage.sudospaces.com/eurowindow/2022/03/w400/10-1.jpg.webp',
      'https://storage.sudospaces.com/eurowindow/2022/03/w400/4-2.jpg.webp',
      'https://storage.sudospaces.com/eurowindow/2022/03/w400/6-2.jpg.webp',
      'https://storage.sudospaces.com/eurowindow/2022/03/w400/2-2.jpg.webp',
    ],
    dir: 'constructions'
  },
  // Biệt thự Phú Thịnh
  {
    urls: [
      'https://storage.sudospaces.com/eurowindow/2022/03/w400/3-1.jpg.webp',
      'https://storage.sudospaces.com/eurowindow/2022/03/w400/5-2.jpg.webp',
      'https://storage.sudospaces.com/eurowindow/2022/03/w400/6-1.jpg.webp',
      'https://storage.sudospaces.com/eurowindow/2022/03/w400/2-1.jpg.webp',
    ],
    dir: 'constructions'
  },
  // Green Pearl
  {
    urls: [
      'https://storage.sudospaces.com/eurowindow/2022/03/w400/fkr0171-copy.jpg.webp',
      'https://storage.sudospaces.com/eurowindow/2022/03/w400/2.jpg.webp',
    ],
    dir: 'constructions'
  },
];

const baseDir = path.join(process.cwd(), 'public', 'eurowindow');

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200 && res.statusCode !== 301 && res.statusCode !== 302) {
        reject(new Error(`Failed to download ${url}: ${res.statusCode}`));
        return;
      }
      const fileStream = fs.createWriteStream(filepath);
      res.pipe(fileStream);
      fileStream.on('finish', () => fileStream.close(resolve));
      fileStream.on('error', reject);
    }).on('error', (e) => {
      reject(new Error(`Error downloading ${url}: ${e.message}`));
    });
  });
}

async function downloadAll() {
  let count = 0;
  for (const group of imagesToDownload) {
    for (const url of group.urls) {
      const filename = url.split('/').pop();
      const filepath = path.join(baseDir, group.dir, filename);
      if (fs.existsSync(filepath)) {
        console.log(`Skip (exists): ${filename}`);
        continue;
      }
      try {
        await downloadImage(url, filepath);
        count++;
        console.log(`Downloaded: ${filename}`);
      } catch (e) {
        console.error(`Error: ${e.message}`);
      }
    }
  }
  console.log(`\nTotal downloaded: ${count}`);
}

downloadAll().catch(console.error);
