import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT = "public/eurowindow";

const ASSETS = [
  // Constructions — full-res, overwrite medium/w400 in subfolder (same filename)
  { url: "https://storage.sudospaces.com/eurowindow/2025/02/viber-image-2025-02-05-13-33-24-065.png.webp", dir: "constructions" },
  { url: "https://storage.sudospaces.com/eurowindow/2022/07/img-7105.jpg.webp", dir: "constructions" },
  { url: "https://storage.sudospaces.com/eurowindow/2022/07/benh-vien-ung-buou-da-nang-17.jpg.webp", dir: "constructions" },
  { url: "https://storage.sudospaces.com/eurowindow/2022/07/dji-0090-1.jpg.webp", dir: "constructions" },
  { url: "https://storage.sudospaces.com/eurowindow/2022/07/img-7172.jpg.webp", dir: "constructions" },
  { url: "https://storage.sudospaces.com/eurowindow/2022/07/20191115-vien-kiem-soat-nhan-dan-toi-cao-0038.jpg.webp", dir: "constructions" },
  // Products — full-res (drop -medium suffix)
  { url: "https://storage.sudospaces.com/eurowindow/2022/05/cuanhom.jpg.webp", dir: "" },
  { url: "https://storage.sudospaces.com/eurowindow/2022/05/cuanhua1.jpg.webp", dir: "" },
  { url: "https://storage.sudospaces.com/eurowindow/2022/05/cuagotrangchu.jpg.webp", dir: "" },
  // News — full-res (drop -medium suffix)
  { url: "https://storage.sudospaces.com/eurowindow/2026/07/toa-dam-1.png.webp", dir: "" },
  { url: "https://storage.sudospaces.com/eurowindow/2026/07/img-0344.jpeg.webp", dir: "" },
  { url: "https://storage.sudospaces.com/eurowindow/2025/08/cua-nhom-kinh-cach-am-1.jpg.webp", dir: "" },
];

function slug(url) {
  const clean = url.split("?")[0];
  const parts = clean.split("/");
  return parts[parts.length - 1];
}

async function download(item) {
  const name = slug(item.url);
  const outDir = path.join(OUT, item.dir);
  try {
    const res = await fetch(item.url, { headers: { "user-agent": "Mozilla/5.0" } });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await mkdir(outDir, { recursive: true });
    await writeFile(path.join(outDir, name), buf);
    return { url: item.url, ok: true, bytes: buf.length, name, dir: item.dir };
  } catch (e) {
    return { url: item.url, ok: false, error: e.message };
  }
}

async function main() {
  const results = await Promise.all(ASSETS.map(download));
  const failed = results.filter((r) => !r.ok);
  const ok = results.filter((r) => r.ok);
  console.log(`OK: ${ok.length}, FAILED: ${failed.length}`);
  failed.forEach((f) => console.log(`  FAIL ${f.url} -> ${f.error}`));
  ok.forEach((r) => console.log(`  ${r.bytes}  ${r.dir ? r.dir + "/" : ""}${r.name}`));
}

main();
