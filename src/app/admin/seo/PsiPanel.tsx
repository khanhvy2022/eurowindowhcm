"use client";

import { useState } from "react";
import { Gauge, Loader2 } from "lucide-react";

type PsiMetric = { id: string; title: string; value: number; displayValue: string; score: number };
type PsiResult = {
  url: string;
  strategy: "mobile" | "desktop";
  scores: Record<string, number>;
  metrics: PsiMetric[];
  fetchedAt: string;
  error?: string;
};

function scoreColor(score: number) {
  if (score >= 90) return "text-emerald-600 bg-emerald-50";
  if (score >= 50) return "text-amber-600 bg-amber-50";
  return "text-red-600 bg-red-50";
}

function metricColor(id: string, value: number) {
  const good: Record<string, number> = { "first-contentful-paint": 1800, "largest-contentful-paint": 2500, "total-blocking-time": 200, "cumulative-layout-shift": 0.1, "speed-index": 3400, "interactive": 3800 };
  const threshold = good[id] ?? Infinity;
  return value <= threshold ? "text-emerald-600" : value <= threshold * 1.5 ? "text-amber-600" : "text-red-600";
}

export default function PsiPanel({ token }: { token: () => string | null }) {
  const [result, setResult] = useState<PsiResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [url, setUrl] = useState("https://eurowindow.biz/");
  const [strategy, setStrategy] = useState<"mobile" | "desktop">("mobile");

  async function run() {
    if (!url.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch(`/api/seo/psi?url=${encodeURIComponent(url)}&strategy=${strategy}`, {
        headers: { Authorization: "Bearer " + (token() ?? "") },
      });
      const data = await res.json();
      if (data.ok) setResult(data.result);
      else setError(data.error ?? "Lỗi PSI");
    } catch {
      setError("Không kết nối được server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <h3 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-900">
        <Gauge className="h-4 w-4 text-[#0066aa]" /> PageSpeed Insights (Core Web Vitals)
      </h3>
      <div className="flex flex-wrap items-end gap-3 mb-4">
        <div className="flex-1 min-w-[200px]">
          <label className="mb-1 block text-xs font-bold uppercase text-slate-500">URL</label>
          <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://eurowindow.biz/"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase text-slate-500">Thiết bị</label>
          <select value={strategy} onChange={(e) => setStrategy(e.target.value as "mobile" | "desktop")}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm">
            <option value="mobile">Mobile</option>
            <option value="desktop">Desktop</option>
          </select>
        </div>
        <button onClick={run} disabled={loading || !url.trim()}
          className="inline-flex items-center gap-2 rounded-lg bg-[#0066aa] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#005690] disabled:opacity-50">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Gauge className="h-4 w-4" />}
          {loading ? "Đang đo..." : "Chạy PSI"}
        </button>
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {result ? (
        <div className="space-y-4">
          {result.error ? <p className="text-sm text-amber-600">{result.error}</p> : null}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {Object.entries(result.scores).map(([cat, score]) => (
              <div key={cat} className={`rounded-lg p-3 text-center ${scoreColor(score)}`}>
                <p className="text-[10px] font-bold uppercase">{cat}</p>
                <p className="text-3xl font-bold">{score}</p>
              </div>
            ))}
          </div>
          {result.metrics.length > 0 ? (
            <div>
              <p className="mb-2 text-xs font-bold uppercase text-slate-500">Core Web Vitals</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {result.metrics.map((m) => (
                  <div key={m.id} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                    <p className="text-[10px] font-bold uppercase text-slate-500 truncate">{m.title}</p>
                    <p className={`text-lg font-bold ${metricColor(m.id, m.value)}`}>{m.displayValue}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          <p className="text-[10px] text-slate-400">Cập nhật: {new Date(result.fetchedAt).toLocaleString("vi-VN")} — {result.strategy}</p>
        </div>
      ) : null}
    </div>
  );
}
