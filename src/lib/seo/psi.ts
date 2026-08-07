export type PsiCategory = "performance" | "accessibility" | "best-practices" | "seo";

export type PsiMetric = {
  id: string;
  title: string;
  value: number;
  displayValue: string;
  score: number;
};

export type PsiResult = {
  url: string;
  strategy: "mobile" | "desktop";
  scores: Record<PsiCategory, number>;
  metrics: PsiMetric[];
  fetchedAt: string;
  error?: string;
};

const PSI_BASE = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

function getApiKey(): string | null {
  return process.env.PAGESPEED_API_KEY ?? null;
}

export function isPsiConfigured(): boolean {
  return getApiKey() !== null;
}

export async function runPsi(
  url: string,
  strategy: "mobile" | "desktop" = "mobile",
): Promise<PsiResult> {
  const apiKey = getApiKey();
  if (!apiKey) {
    return {
      url,
      strategy,
      scores: { performance: 0, accessibility: 0, "best-practices": 0, seo: 0 },
      metrics: [],
      fetchedAt: new Date().toISOString(),
      error: "PAGESPEED_API_KEY chưa cấu hình",
    };
  }

  const params = new URLSearchParams({
    url,
    strategy,
    key: apiKey,
  });
  params.append("category", "performance");
  params.append("category", "accessibility");
  params.append("category", "best-practices");
  params.append("category", "seo");

  try {
    const res = await fetch(`${PSI_BASE}?${params}`);
    if (!res.ok) {
      return {
        url,
        strategy,
        scores: { performance: 0, accessibility: 0, "best-practices": 0, seo: 0 },
        metrics: [],
        fetchedAt: new Date().toISOString(),
        error: `PSI API error: ${res.status}`,
      };
    }

    const data = await res.json();
    const categories = data?.lighthouseResult?.categories ?? {};
    const audits = data?.lighthouseResult?.audits ?? {};

    const scores: Record<PsiCategory, number> = {
      performance: Math.round((categories.performance?.score ?? 0) * 100),
      accessibility: Math.round((categories.accessibility?.score ?? 0) * 100),
      "best-practices": Math.round((categories["best-practices"]?.score ?? 0) * 100),
      seo: Math.round((categories.seo?.score ?? 0) * 100),
    };

    const metricIds = [
      "first-contentful-paint",
      "largest-contentful-paint",
      "total-blocking-time",
      "cumulative-layout-shift",
      "speed-index",
      "interactive",
    ];

    const metrics: PsiMetric[] = metricIds
      .map((id) => audits[id])
      .filter(Boolean)
      .map((a) => ({
        id: a.id,
        title: a.title,
        value: a.numericValue ?? 0,
        displayValue: a.displayValue ?? "",
        score: Math.round((a.score ?? 0) * 100),
      }));

    return { url, strategy, scores, metrics, fetchedAt: new Date().toISOString() };
  } catch (err) {
    return {
      url,
      strategy,
      scores: { performance: 0, accessibility: 0, "best-practices": 0, seo: 0 },
      metrics: [],
      fetchedAt: new Date().toISOString(),
      error: err instanceof Error ? err.message : "Lỗi PSI",
    };
  }
}
