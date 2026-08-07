"use client";

import { useState } from "react";
import { Swords, Loader2, Plus, Trash2 } from "lucide-react";

type CompetitorUrl = { url: string; title?: string; h1?: string[]; wordCount?: number };
type CompetitorReport = {
  targetUrl: string;
  competitors: CompetitorUrl[];
  summary: string;
  generatedAt: string;
};

const inputCls =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-[#0066aa] focus:ring-2 focus:ring-[#0066aa]/20";

export default function CompetitorPanel({ token }: { token: () => string | null }) {
  const [targetUrl, setTargetUrl] = useState("https://eurowindow.biz/");
  const [competitors, setCompetitors] = useState<string[]>([""]);
  const [report, setReport] = useState<CompetitorReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function addCompetitor() {
    setCompetitors((prev) => [...prev, ""]);
  }

  function removeCompetitor(i: number) {
    setCompetitors((prev) => prev.filter((_, j) => j !== i));
  }

  function updateCompetitor(i: number, val: string) {
    setCompetitors((prev) => prev.map((c, j) => (j === i ? val : c)));
  }

  async function analyze() {
    const compUrls = competitors.map((c) => c.trim()).filter(Boolean);
    if (!targetUrl.trim() || compUrls.length === 0) {
      setError("Nhập URL đích + ít nhất 1 URL đối thủ");
      return;
    }
    setLoading(true);
    setError("");
    setReport(null);
    try {
      const res = await fetch("/api/seo/competitor", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + (token() ?? "") },
        body: JSON.stringify({
          targetUrl: targetUrl.trim(),
          competitors: compUrls.map((url) => ({ url, h1: [], wordCount: 0, schemaTypes: [] })),
        }),
      });
      const data = await res.json();
      if (data.ok) setReport(data.report);
      else setError(data.error ?? "Lỗi phân tích");
    } catch {
      setError("Không kết nối được server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <h3 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-900">
        <Swords className="h-4 w-4 text-[#0066aa]" /> AI Competitor Analysis
      </h3>
      <div className="space-y-3 mb-4">
        <div>
          <label className="mb-1 block text-xs font-bold uppercase text-slate-500">URL trang của bạn</label>
          <input value={targetUrl} onChange={(e) => setTargetUrl(e.target.value)}
            placeholder="https://eurowindow.biz/" className={inputCls} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase text-slate-500">URL đối thủ</label>
          <div className="space-y-2">
            {competitors.map((c, i) => (
              <div key={i} className="flex gap-2">
                <input value={c} onChange={(e) => updateCompetitor(i, e.target.value)}
                  placeholder={`https://doi-thu-${i + 1}.com/`} className={inputCls} />
                {competitors.length > 1 ? (
                  <button onClick={() => removeCompetitor(i)}
                    className="rounded p-2 text-slate-400 hover:text-red-500 shrink-0">
                    <Trash2 className="h-4 w-4" />
                  </button>
                ) : null}
              </div>
            ))}
          </div>
          <button onClick={addCompetitor}
            className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#0066aa] hover:underline">
            <Plus className="h-3 w-3" /> Thêm đối thủ
          </button>
        </div>
      </div>
      <button onClick={analyze} disabled={loading}
        className="inline-flex items-center gap-2 rounded-lg bg-[#0066aa] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#005690] disabled:opacity-50">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Swords className="h-4 w-4" />}
        {loading ? "Đang phân tích..." : "Phân tích đối thủ"}
      </button>
      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      {report ? (
        <div className="mt-4 space-y-3">
          <p className="text-xs text-slate-400">Đối thủ: {report.competitors.length} — {new Date(report.generatedAt).toLocaleString("vi-VN")}</p>
          <div className="rounded-lg border border-slate-100 bg-slate-50 p-4 text-sm leading-6 text-slate-700 whitespace-pre-wrap">
            {report.summary}
          </div>
        </div>
      ) : null}
    </div>
  );
}
