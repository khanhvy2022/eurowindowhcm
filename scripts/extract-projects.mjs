// Extract all project data from eurowindow.biz project pages
// Usage: node scripts/extract-projects.mjs

import fs from 'fs';
import path from 'path';

const projectUrls = [
  "https://eurowindow.biz/cong-trinh-tieu-bieu/cang-hang-khong-phu-bai-hue.html",
  "https://eurowindow.biz/cong-trinh-tieu-bieu/benh-vien-viet-phap.html",
  "https://eurowindow.biz/cong-trinh-tieu-bieu/benh-vien-ung-buou-da-nang.html",
  "https://eurowindow.biz/cong-trinh-tieu-bieu/benh-vien-nhi-dong-tp-ho-chi-minh.html",
  "https://eurowindow.biz/cong-trinh-tieu-bieu/tt-truyen-hinh-thong-tan-xa-viet-nam.html",
  "https://eurowindow.biz/cong-trinh-tieu-bieu/tru-so-van-phong-vien-kiem-sat-nhan-dan-toi-cao.html",
  "https://eurowindow.biz/cong-trinh-tieu-bieu/nha-quoc-hoi.html",
  "https://eurowindow.biz/cong-trinh-tieu-bieu/toa-nha-van-phong-chinh-phu.html",
  "https://eurowindow.biz/cong-trinh-tieu-bieu/tru-so-bo-cong-an.html",
  "https://eurowindow.biz/cong-trinh-tieu-bieu/tru-so-bo-ngoai-giao.html",
  "https://eurowindow.biz/cong-trinh-tieu-bieu/cang-hang-khong-quoc-te-can-tho.html",
  "https://eurowindow.biz/cong-trinh-tieu-bieu/cang-hang-khong-quoc-te-van-don.html",
  "https://eurowindow.biz/cong-trinh-tieu-bieu/khu-do-thi-sala.html",
  "https://eurowindow.biz/cong-trinh-tieu-bieu/du-an-khai-son-hill.html",
  "https://eurowindow.biz/cong-trinh-tieu-bieu/nha-pho-chua-thong-tx-son-tay-ha-noi.html",
  "https://eurowindow.biz/cong-trinh-tieu-bieu/biet-thu-kdt-phu-thinh-p-phu-thinh-tx-son-tay-ha-noi.html",
  "https://eurowindow.biz/cong-trinh-tieu-bieu/biet-thu-kdt-green-pearl-378-minh-khai-ha-noi.html",
];

// This script outputs URLs — actual extraction done via Playwright MCP
const output = {
  count: projectUrls.length,
  urls: projectUrls.map((url, i) => ({
    id: i + 1,
    url,
    slug: url.replace(/https?:\/\/eurowindow\.biz\/cong-trinh-tieu-bieu\//, '').replace('.html', '')
  }))
};

const outPath = path.join(process.cwd(), 'docs', 'research', 'eurowindow', 'all-project-urls.json');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
console.log(`Wrote ${projectUrls.length} project URLs to ${outPath}`);
console.log('Next: use Playwright MCP to visit each URL and extract full content');
