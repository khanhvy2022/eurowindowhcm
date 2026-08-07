export type GscConfig = {
  siteUrl: string;
  clientId: string;
  clientSecret: string;
  refreshToken: string;
};

export type GscQuery = {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

export type GscPage = {
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

export type GscReport = {
  queries: GscQuery[];
  pages: GscPage[];
  totalClicks: number;
  totalImpressions: number;
  avgCtr: number;
  avgPosition: number;
  fetchedAt: string;
};

function getConfig(): GscConfig | null {
  const siteUrl = process.env.GSC_SITE_URL;
  const clientId = process.env.GSC_CLIENT_ID;
  const clientSecret = process.env.GSC_CLIENT_SECRET;
  const refreshToken = process.env.GSC_REFRESH_TOKEN;
  if (!siteUrl || !clientId || !clientSecret || !refreshToken) return null;
  return { siteUrl, clientId, clientSecret, refreshToken };
}

async function getAccessToken(config: GscConfig): Promise<string> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      refresh_token: config.refreshToken,
      grant_type: "refresh_token",
    }),
  });
  if (!res.ok) throw new Error(`GSC OAuth failed: ${res.status}`);
  const data = await res.json();
  return data.access_token;
}

export async function fetchGscQueries(config: GscConfig, accessToken: string, days = 28): Promise<GscQuery[]> {
  const endDate = new Date().toISOString().slice(0, 10);
  const startDate = new Date(Date.now() - days * 86400000).toISOString().slice(0, 10);
  const res = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(config.siteUrl)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        startDate,
        endDate,
        dimensions: ["query"],
        rowLimit: 100,
      }),
    },
  );
  if (!res.ok) throw new Error(`GSC API error: ${res.status}`);
  const data = await res.json();
  return (data.rows ?? []).map((r: Record<string, unknown>) => ({
    query: (r.keys as string[])[0],
    clicks: r.clicks as number,
    impressions: r.impressions as number,
    ctr: r.ctr as number,
    position: r.position as number,
  }));
}

export async function fetchGscPages(config: GscConfig, accessToken: string, days = 28): Promise<GscPage[]> {
  const endDate = new Date().toISOString().slice(0, 10);
  const startDate = new Date(Date.now() - days * 86400000).toISOString().slice(0, 10);
  const res = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(config.siteUrl)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        startDate,
        endDate,
        dimensions: ["page"],
        rowLimit: 100,
      }),
    },
  );
  if (!res.ok) throw new Error(`GSC API error: ${res.status}`);
  const data = await res.json();
  return (data.rows ?? []).map((r: Record<string, unknown>) => ({
    page: (r.keys as string[])[0],
    clicks: r.clicks as number,
    impressions: r.impressions as number,
    ctr: r.ctr as number,
    position: r.position as number,
  }));
}

export async function getGscReport(days = 28): Promise<GscReport | null> {
  const config = getConfig();
  if (!config) return null;
  try {
    const token = await getAccessToken(config);
    const [queries, pages] = await Promise.all([
      fetchGscQueries(config, token, days),
      fetchGscPages(config, token, days),
    ]);
    const totalClicks = queries.reduce((s, q) => s + q.clicks, 0);
    const totalImpressions = queries.reduce((s, q) => s + q.impressions, 0);
    const avgCtr = totalImpressions > 0 ? totalClicks / totalImpressions : 0;
    const avgPosition = queries.length > 0 ? queries.reduce((s, q) => s + q.position, 0) / queries.length : 0;
    return { queries, pages, totalClicks, totalImpressions, avgCtr, avgPosition, fetchedAt: new Date().toISOString() };
  } catch {
    return null;
  }
}

export function isGscConfigured(): boolean {
  return getConfig() !== null;
}
