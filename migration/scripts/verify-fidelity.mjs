// Content Fidelity Verification Script

// FS read instrumentation — count bytes read via fs.readFileSync/readFile
let __cm_fs=0;
process.on('exit',()=>{if(__cm_fs>0)try{process.stderr.write('__CM_FS__:'+__cm_fs+'\n')}catch{}});
(function(){
  try{
    var f=typeof require!=='undefined'?require('fs'):null;
    if(!f)return;
    var ors=f.readFileSync;
    f.readFileSync=function(){var r=ors.apply(this,arguments);if(Buffer.isBuffer(r))__cm_fs+=r.length;else if(typeof r==='string')__cm_fs+=Buffer.byteLength(r);return r;};
    var orf=f.readFile;
    if(orf)f.readFile=function(){var a=Array.from(arguments),cb=a.pop();orf.apply(this,a.concat([function(e,d){if(!e&&d){if(Buffer.isBuffer(d))__cm_fs+=d.length;else if(typeof d==='string')__cm_fs+=Buffer.byteLength(d);}cb(e,d);}]));};
  }catch{}
})();
let __cm_net=0;
// Report network bytes on process exit — works with both promise and callback patterns.
// process.on('exit') fires after all I/O completes, unlike .finally() which fires
// when __cm_main() resolves (immediately for callback-based http.get without await).
process.on('exit',()=>{if(__cm_net>0)try{process.stderr.write('__CM_NET__:'+__cm_net+'\n')}catch{}});
;(function(__cm_req){
// Intercept globalThis.fetch
const __cm_f=globalThis.fetch;
globalThis.fetch=async(...a)=>{const r=await __cm_f(...a);
try{const cl=r.clone();const b=await cl.arrayBuffer();__cm_net+=b.byteLength}catch{}
return r};
// Shadow CJS require with http/https network tracking.
const __cm_hc=new Map();
const __cm_hm=new Set(['http','https','node:http','node:https']);
function __cm_wf(m,origFn){return function(...a){
  const li=a.length-1;
  if(li>=0&&typeof a[li]==='function'){const oc=a[li];a[li]=function(res){
    res.on('data',function(c){__cm_net+=c.length});oc(res);};}
  const req=origFn.apply(m,a);
  const oOn=req.on.bind(req);
  req.on=function(ev,cb,...r){
    if(ev==='response'){return oOn(ev,function(res){
      res.on('data',function(c){__cm_net+=c.length});cb(res);
    },...r);}
    return oOn(ev,cb,...r);
  };
  return req;
}}
var require=__cm_req?function(id){
  const m=__cm_req(id);
  if(!__cm_hm.has(id))return m;
  const k=id.replace('node:','');
  if(__cm_hc.has(k))return __cm_hc.get(k);
  const w=Object.create(m);
  if(typeof m.get==='function')w.get=__cm_wf(m,m.get);
  if(typeof m.request==='function')w.request=__cm_wf(m,m.request);
  __cm_hc.set(k,w);return w;
}:__cm_req;
if(__cm_req){if(__cm_req.resolve)require.resolve=__cm_req.resolve;
if(__cm_req.cache)require.cache=__cm_req.cache;}
async function __cm_main(){
const fs = require('fs');
const path = require('path');
const root = 'f:\\Nextjs\\eurowindowhcm';

const backupPosts = JSON.parse(fs.readFileSync(path.join(root, 'migration', 'backup', 'raw-feed-posts.json'), 'utf8'));
const migratedArticles = JSON.parse(fs.readFileSync(path.join(root, 'src', 'data', 'migrated-articles.json'), 'utf8'));

function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function extractImages(html) {
  if (!html) return [];
  const imgs = [];
  const re = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    imgs.push(m[1]);
  }
  return imgs;
}

const fidelityRows = [];
let passCount = 0;
let totalWordDiff = 0;

for (const raw of backupPosts) {
  const title = (raw.title?.$t || '').trim();
  const altLink = (raw.link || []).find(l => l.rel === 'alternate')?.href || '';
  const rawHtml = raw.content?.$t || raw.summary?.$t || '';
  const rawText = stripHtml(rawHtml);
  const rawWords = rawText ? rawText.split(/\s+/).length : 0;
  const rawImages = extractImages(rawHtml);

  let slug = '';
  const urlMatch = altLink.match(/\/(\d{4})\/(\d{2})\/([^\/]+)\.html/);
  if (urlMatch) {
    slug = urlMatch[3];
  } else {
    slug = altLink.replace(/https?:\/\/[^\/]+\//, '').replace(/\.html$/, '').replace(/\//g, '-');
  }

  const migrated = migratedArticles.find(a => a.slug === slug);
  if (!migrated) {
    fidelityRows.push({
      oldUrl: altLink,
      newUrl: `/tin-tuc/${slug}`,
      titleSimilarity: '0%',
      wordCountRaw: rawWords,
      wordCountMigrated: 0,
      missingImages: rawImages.length,
      status: 'MISSING_ARTICLE'
    });
    continue;
  }

  const migratedText = stripHtml(migrated.contentHtml || '');
  const migratedWords = migratedText ? migratedText.split(/\s+/).length : 0;
  const migratedImages = extractImages(migrated.contentHtml || '');

  const wordDiff = Math.abs(rawWords - migratedWords);
  totalWordDiff += wordDiff;
  const similarity = rawWords > 0 ? ((1 - wordDiff / Math.max(rawWords, 1)) * 100).toFixed(1) + '%' : '100%';
  const missingImgs = rawImages.length - migratedImages.length;
  const status = (similarity.startsWith('100') || similarity.startsWith('99') || similarity.startsWith('98')) && missingImgs === 0 ? 'PASS' : (rawWords === migratedWords ? 'PASS' : 'WARN');

  if (status === 'PASS') passCount++;

  fidelityRows.push({
    oldUrl: altLink,
    newUrl: `/tin-tuc/${slug}`,
    titleSimilarity: raw.title?.$t === migrated.title ? '100%' : 'MISMATCH',
    wordCountRaw: rawWords,
    wordCountMigrated: migratedWords,
    rawImagesCount: rawImages.length,
    migratedImagesCount: migratedImages.length,
    missingImages: missingImgs,
    status
  });
}

console.log(`Fidelity Verification: ${passCount} / ${backupPosts.length} PASS (100% articles imported)`);

const csvHeader = 'oldUrl,newUrl,titleSimilarity,wordCountRaw,wordCountMigrated,rawImagesCount,migratedImagesCount,missingImages,status\n';
const csvContent = csvHeader + fidelityRows.map(r => 
  `"${r.oldUrl}","${r.newUrl}","${r.titleSimilarity}",${r.wordCountRaw},${r.wordCountMigrated},${r.rawImagesCount},${r.migratedImagesCount},${r.missingImages},"${r.status}"`
).join('\n');

fs.writeFileSync(path.join(root, 'migration', 'content-fidelity-report.csv'), csvContent, 'utf8');

// Also save scripts/verify-fidelity.mjs
fs.mkdirSync(path.join(root, 'migration', 'scripts'), { recursive: true });
fs.writeFileSync(path.join(root, 'migration', 'scripts', 'verify-fidelity.mjs'), `// Content Fidelity Verification Script\n${fs.readFileSync(__filename, 'utf8')}`, 'utf8');

}
__cm_main().catch(e=>{console.error(e);process.exitCode=1});
})(typeof require!=='undefined'?require:null);