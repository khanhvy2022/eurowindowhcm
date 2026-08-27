// Redirect Verification Script
const fs = require('fs');
const path = require('path');
const urlMap = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'url-map.json'), 'utf8'));

const redirectRules = [
  { source: /^\/p\/lien-he\.html$/, dest: '/dich-vu' },
  { source: /^\/p\/anh-du-an\.html$/, dest: '/du-an' },
  { source: /^\/p\/hinh-anh-cua-eurowindow\.html$/, dest: '/san-pham' },
  { source: /^\/p\/anh-baner\.html$/, dest: '/' },
  { source: /^\/p\/banner-eurowindow\.html$/, dest: '/' },
  { source: /^\/p\/si\.html$/, dest: '/san-pham' },
  { source: /^\/p\/(.+?)\.html$/, dest: '/tin-tuc/$1' },
  { source: /^\/(\d{4})\/(\d{2})\/([^\/]+)\.html$/, dest: '/tin-tuc/$3' },
  { source: /^\/(\d{4})\/(\d{2})\/([^\/]+)$/, dest: '/tin-tuc/$3' },
  { source: /^\/search\/label\/(.*)$/, dest: '/tin-tuc' },
  { source: /^\/search$/, dest: '/tin-tuc' },
  { source: /^\/feeds\/(.*)$/, dest: '/sitemap.xml' },
];

function resolveRedirect(oldPath) {
  for (const rule of redirectRules) {
    if (rule.source.test(oldPath)) return oldPath.replace(rule.source, rule.dest);
  }
  return null;
}

let pass = 0, fail = 0;
for (const entry of urlMap) {
  const u = new URL(entry.oldUrl);
  const target = resolveRedirect(u.pathname);
  if (target && target === entry.newUrl) pass++;
  else fail++;
}
console.log(`Verified ${pass}/${urlMap.length} redirects matching perfectly (${fail} failures).`);
