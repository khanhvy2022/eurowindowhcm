// Download missing large images referenced in eurowindow.biz projects
import fs from 'fs';
import path from 'node:url';
import https from 'https';

const images = [
  // Tòa nhà văn phòng Chính phủ
  'https://sudospaces.com/eurowindow/2022/07/20190612-hanoi-cityscape-7928-large.jpg',
  // Trụ sở Bộ Công an
  'https://sudospaces.com/eurowindow/2021/12/toa-nha-bo-cong-an-large.jpg',
  // Trụ sở Bộ Ngoại giao
  'https://sudospaces.com/eurowindow/2022/07/20191030-tru-so-bo-ngoai-giao-0719-large.jpg',
  // Cảng hàng không Cần Thơ
  'https://sudospaces.com/eurowindow/2021/12/san-bay-can-tho-large.jpg',
  // Khu đô thị Sala
  'https://sudospaces.com/eurowindow/2022/07/dji-0155-large.jpg',
  // Dự án Khai Sơn Hill
  'https://sudospaces.com/eurowindow/2022/07/dji-0470-hdr-large.jpg',
  // Nhà phố Chùa Thông
  'https://sudospaces.com/eurowindow/2022/03/1-2-large.jpg',
  // Biệt thự Phú Thịnh
  'https://sudospaces.com/eurowindow/2022/03/1-1-large.jpg',
  // Green Pearl
  'https://sudospaces.com/eurowindow/2022/03/1-large.jpg',
];

const dir = 'F:\\Nextjs\\eurowindowhcm\\public\\eurowindow\\constructions';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

async function download(url) {
  const filename = url.split('/').pop();
  const filepath = `${dir}/${filename}`;
  if (fs.existsSync(filepath)) { console.log(`Skip: ${filename}`); return; }
  return new Promise((resolve) => {
    https.get(url, (res) => {
      const file = fs.createWriteStream(filepath);
      res.pipe(file);
      file.on('finish', () => { file.close(); console.log(`Downloaded: ${filename}`); resolve(); });
    }).on('error', () => { console.log(`Failed: ${filename}`); resolve(); });
  });
}

async function main() {
  for (const url of images) {
    await download(url);
  }
}

main();
