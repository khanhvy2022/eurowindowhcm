export type CrawlAsset = {
  url: string;
  type: "image" | "pdf" | "css" | "js" | "font" | "other";
  size?: number;
  status: number;
  alt?: string;
  anchor?: string;
};

export type FullCrawlResult = {
  url: string;
  assets: CrawlAsset[];
  totalImages: number;
  totalPdfs: number;
  totalLinks: number;
  brokenLinks: CrawlAsset[];
  imagesWithoutAlt: CrawlAsset[];
  crawledAt: string;
  error?: string;
};

const ASSET_TYPE_MAP: Record<string, CrawlAsset["type"]> = {
  ".jpg": "image",
  ".jpeg": "image",
  ".png": "image",
  ".gif": "image",
  ".webp": "image",
  ".svg": "image",
  ".avif": "image",
  ".pdf": "pdf",
  ".css": "css",
  ".js": "js",
  ".woff": "font",
  ".woff2": "font",
  ".ttf": "font",
  ".eot": "font",
};

function classifyAsset(url: string): CrawlAsset["type"] {
  const ext = url.split("?")[0].split("#")[0].split(".").pop()?.toLowerCase() ?? "";
  return ASSET_TYPE_MAP[`.${ext}`] ?? "other";
}

export async function crawlFull(
  url: string,
  html: string,
): Promise<FullCrawlResult> {
  const assets: CrawlAsset[] = [];

  // Extract images from HTML
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*(?:alt=["']([^"']*)["'])?/gi;
  let match: RegExpExecArray | null;
  while ((match = imgRegex.exec(html)) !== null) {
    assets.push({
      url: match[1],
      type: "image",
      alt: match[2] ?? "",
      status: 200,
    });
  }

  // Extract PDF links
  const pdfRegex = /href=["']([^"']*\.pdf[^"']*)["']/gi;
  while ((match = pdfRegex.exec(html)) !== null) {
    assets.push({
      url: match[1],
      type: "pdf",
      status: 200,
    });
  }

  // Extract all links
  const linkRegex = /href=["']([^"'#]+)/gi;
  const allLinks: string[] = [];
  while ((match = linkRegex.exec(html)) !== null) {
    allLinks.push(match[1]);
  }

  const totalImages = assets.filter((a) => a.type === "image").length;
  const totalPdfs = assets.filter((a) => a.type === "pdf").length;
  const imagesWithoutAlt = assets.filter((a) => a.type === "image" && !a.alt);

  return {
    url,
    assets,
    totalImages,
    totalPdfs,
    totalLinks: allLinks.length,
    brokenLinks: [],
    imagesWithoutAlt,
    crawledAt: new Date().toISOString(),
  };
}

export function isFullCrawlerAvailable(): boolean {
  // Crawl4AI engine stub - not yet integrated
  return false;
}
