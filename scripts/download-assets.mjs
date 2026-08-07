import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ASSETS = [
  // Hero banners
  "https://storage.sudospaces.com/eurowindow/2026/07/cuago.png.webp",
  "https://storage.sudospaces.com/eurowindow/2026/07/upvc4.png.webp",
  "https://storage.sudospaces.com/eurowindow/2026/07/untitled-1-01.jpg.webp",
  "https://storage.sudospaces.com/eurowindow/2026/07/4e9a018f-f3d2-43c5-b37a-839485a42e7e-1.png.webp",
  "https://storage.sudospaces.com/eurowindow/2026/07/banner-02-1.png.webp",
  "https://storage.sudospaces.com/eurowindow/2026/07/z5494721716161-88873179923d512dbb75c126238f88f4.jpg.webp",
  // Introduce image
  "https://storage.sudospaces.com/eurowindow/2022/02/layer-211.png.webp",
  // Products
  "https://storage.sudospaces.com/eurowindow/2022/05/cuanhom-medium.jpg.webp",
  "https://storage.sudospaces.com/eurowindow/2022/05/cuanhua1-medium.jpg.webp",
  "https://storage.sudospaces.com/eurowindow/2022/05/cuagotrangchu-medium.jpg.webp",
  "https://storage.sudospaces.com/eurowindow/2021/11/sanphamkinh.png.webp",
  "https://storage.sudospaces.com/eurowindow/2021/11/cuatudong.png.webp",
  "https://storage.sudospaces.com/eurowindow/2021/11/cuacuon.png.webp",
  // Ads banner
  "https://storage.sudospaces.com/eurowindow/2026/06/banner-than-website.png.webp",
  // News
  "https://storage.sudospaces.com/eurowindow/2026/07/toa-dam-1-medium.png.webp",
  "https://storage.sudospaces.com/eurowindow/2026/07/img-0344-medium.jpeg.webp",
  "https://storage.sudospaces.com/eurowindow/2025/08/cua-nhom-kinh-cach-am-1-medium.jpg.webp",
  "https://storage.sudospaces.com/eurowindow/2026/06/z7978260236950-59ec572c33f7b933b6e48fae6107511b-medium.jpg.webp",
  "https://storage.sudospaces.com/eurowindow/2026/03/z7653606237319-b225700b968578333eda5fd2d45b447f-large.jpg.webp",
  "https://storage.sudospaces.com/eurowindow/2026/07/1784285994788-1996044870628632390-g1440525697409294600-e782cffd90876170d748cc027acf915b-large.jpg.webp",
  "https://storage.sudospaces.com/eurowindow/2026/02/z7566831336677-bcca668552e197796dcd2bd428af8f1a-large.jpg.webp",
  "https://storage.sudospaces.com/eurowindow/2026/07/tai-thiet-lan-2-large.jpeg.webp",
  "https://storage.sudospaces.com/eurowindow/2026/01/z7407016766473-8a61e442dd6f696fc17cd2dbcfa746f8-large.jpg.webp",
  "https://storage.sudospaces.com/eurowindow/2026/06/ewh07548-large.jpg.webp",
  "https://storage.sudospaces.com/eurowindow/2026/07/ctkm-ea65ea68i-169-at-3x-large.png.webp",
  "https://storage.sudospaces.com/eurowindow/2026/07/z8077465486665-2958faf553265ae78b46de4213b00079-1-1-large.jpg.webp",
  "https://storage.sudospaces.com/eurowindow/2026/07/toa-dam-1-large.png.webp",
  "https://storage.sudospaces.com/eurowindow/2026/07/img-0344-large.jpeg.webp",
  // Videos covers
  "https://storage.sudospaces.com/eurowindow/2024/06/w300/cover-video-web-ew-17.jpg.webp",
  "https://storage.sudospaces.com/eurowindow/2024/06/w300/cover-video-web-ew-16.jpg.webp",
  "https://storage.sudospaces.com/eurowindow/2024/06/w300/cover-video-web-ew-15.jpg.webp",
  "https://storage.sudospaces.com/eurowindow/2024/06/w300/cover-video-web-ew-18-18.jpg.webp",
  "https://storage.sudospaces.com/eurowindow/2024/06/w300/cover-video-web-ew-01.jpg.webp",
  // Constructions (icons + featured)
  "https://storage.sudospaces.com/eurowindow/2021/11/congtrinhtieubieu1xanh-tiny.png.webp",
  "https://storage.sudospaces.com/eurowindow/2021/11/congtrinhtieubieu2xanh-tiny.png.webp",
  "https://storage.sudospaces.com/eurowindow/2021/11/congtrinhtieubieu3xanh-tiny.png.webp",
  "https://storage.sudospaces.com/eurowindow/2025/02/w600/viber-image-2025-02-05-13-33-24-065.png.webp",
  // Achievements logos
  "https://storage.sudospaces.com/eurowindow/2022/03/w200/anab.png.webp",
  "https://storage.sudospaces.com/eurowindow/2022/03/w200/goldstar.png.webp",
  "https://storage.sudospaces.com/eurowindow/2024/06/w200/viber-image-2024-05-30-16-26-04-872.png.webp",
  "https://storage.sudospaces.com/eurowindow/2024/06/w200/viber-image-2024-05-30-16-25-22-525-copy-2.png.webp",
  "https://storage.sudospaces.com/eurowindow/2024/06/w200/viber-image-2024-05-30-16-25-26-303.png.webp",
  "https://storage.sudospaces.com/eurowindow/2022/03/w200/huanchuonglaodong.png.webp",
  "https://storage.sudospaces.com/eurowindow/2022/03/w200/hvnclc.png.webp",
  "https://storage.sudospaces.com/eurowindow/2022/03/w200/vnvalue.png.webp",
  "https://storage.sudospaces.com/eurowindow/2022/03/w200/ukas.png.webp",
  "https://storage.sudospaces.com/eurowindow/2022/03/w200/iaf.png.webp",
  // Logos + social
  "https://storage.sudospaces.com/eurowindow/2021/10/logo-ngang-xanh-12.png.webp",
  "https://eurowindow.biz/assets/images/icon/facebook.svg",
  "https://eurowindow.biz/assets/images/icon/instagram.svg",
  "https://eurowindow.biz/assets/images/icon/youtube.svg",
  "https://eurowindow.biz/assets/images/icon/zalo.svg",
  "https://eurowindow.biz/assets/images/bct.png",
  "https://eurowindow.biz/assets/images/dmca.png",
  "https://eurowindow.biz/core/img/flags/vn.png",
  "https://eurowindow.biz/core/img/flags/en.png",
  // Popup
  "https://storage.sudospaces.com/eurowindow/2026/06/popup-website-large.png.webp",
];

const OUT = "public/eurowindow";

function slug(url) {
  const clean = url.split("?")[0];
  const parts = clean.split("/");
  return parts[parts.length - 1];
}

async function download(url, outDir, name) {
  try {
    const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await mkdir(outDir, { recursive: true });
    await writeFile(path.join(outDir, name), buf);
    return { url, ok: true, bytes: buf.length, name };
  } catch (e) {
    return { url, ok: false, error: e.message };
  }
}

async function main() {
  const results = [];
  const queue = [...ASSETS];
  const concurrency = 4;
  let i = 0;
  async function worker() {
    while (i < queue.length) {
      const url = queue[i++];
      const name = slug(url);
      // subfolder by category if path contains keywords
      let sub = "";
      if (url.includes("congtrinhtieubieu")) sub = "constructions/";
      else if (url.includes("w200")) sub = "achievements/";
      else if (url.includes("w300") || url.includes("cover-video")) sub = "videos/";
      else if (url.includes("flags")) sub = "flags/";
      else if (url.includes("assets/images/icon")) sub = "icons/";
      else if (url.includes("/core/img/")) sub = "core/";
      results.push(await download(url, path.join(OUT, sub), name));
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
  const failed = results.filter((r) => !r.ok);
  const ok = results.filter((r) => r.ok);
  console.log(`OK: ${ok.length}, FAILED: ${failed.length}`);
  failed.forEach((f) => console.log(`  FAIL ${f.url} -> ${f.error}`));
  ok.forEach((r) => console.log(`  ${r.bytes}  ${r.name}`));
}

main();
