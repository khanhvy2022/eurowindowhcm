"use client";

import { useState } from "react";
import { Globe, Loader2, ExternalLink } from "lucide-react";

type GscQuery = { query: string; clicks: number; impressions: number; ctr: number; position: number };
type GscPage = { page: string; clicks: number; impressions: number; ctr: number; position: number };
type GscReport = {
  queries: GscQuery[];
  pages: GscPage[];
  totalClicks: number;
  totalImpressions: number;
  avgCtr: number;
  avgPosition: number;
  fetchedAt: string;
};

const inputCls =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-[#0066aa] focus:ring-2 focus:ring-[#0066aa]/20";

export default function GscPanel({ token }: { token: () => string | null }) {
  const [report, setReport] = useState<GscReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [days, setDays] = useState(28);

  async function fetchGsc() {
    setLoading(true);
    setError("");
    setReport(null);
    try {
      const res = await fetch(`/api/seo/gsc?days=${days}`, {
        headers: { Authorization: "Bearer " + (token() ?? "") },
      });
      const data = await res.json();
      if (data.ok) setReport(data.report);
      else setError(data.error ?? "Lỗi GSC");
    } catch {
      setError("Không kết nối được server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <h3 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-900">
        <Globe className="h-4 w-4 text-[#0066aa]" /> Google Search Console
      </h3>
      <div className="flex flex-wrap items-end gap-3 mb-4">
        <div>
          <label className="mb-1 block text-xs font-bold uppercase text-slate-500">Số ngày</label>
          <select value={days} onChange={(e) => setDays(Number(e.target.value))}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900">
            <option value={7}>7 ngày</option>
            <option value={14}>14 ngày</option>
            <option value={28}>28 ngày</option>
            <option value={90}>90 ngày</option>
          </select>
        </div>
        <button onClick={fetchGsc} disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg bg-[#0066aa] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#005690] disabled:opacity-50">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Globe className="h-4 w-4" />}
          {loading ? "Đang tải..." : "Lấy dữ liệu GSC"}
        </button>
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {report ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-lg bg-slate-50 p-3 text-center">
              <p className="text-xs font-bold uppercase text-slate-500">Clicks</p>
              <p className="text-2xl font-bold text-slate-900">{report.totalClicks.toLocaleString()}</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-3 text-center">
              <p className="text-xs font-bold uppercase text-slate-500">Impressions</p>
              <p className="text-2xl font-bold text-slate-900">{report.totalImpressions.toLocaleString()}</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-3 text-center">
              <p className="text-xs font-bold uppercase text-slate-500">CTR</p>
              <p className="text-2xl font-bold text-slate-900">{(report.avgCtr * 100).toFixed(1)}%</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-3 text-center">
              <p className="text-xs font-bold uppercase text-slate-500">Vị trí TB</p>
              <p className="text-2xl font-bold text-slate-900">{report.avgPosition.toFixed(1)}</p>
            </div>
          </div>
          {report.queries.length > 0 ? (
            <div>
              <p className="mb-2 text-xs font-bold uppercase text-slate-500">Top queries</p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-200 bg-slate-50 text-[10px] font-bold uppercase text-slate-500">
                    <tr>
                      <th className="px-3 py-2">Query</th>
                      <th className="px-3 py-2 text-right">Clicks</th>
                      <th className="px-3 py-2 text-right">Impr</th>
                      <th className="px-3 py-2 text-right">CTR</th>
                      <th className="px-3 py-2 text-right">Position</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {report.queries.slice(0, 20).map((q) => (
                      <tr key={q.query} className="hover:bg-slate-50">
                        <td className="px-3 py-2 font-medium text-slate-800">{q.query}</td>
                        <td className="px-3 py-2 text-right">{q.clicks}</td>
                        <td className="px-3 py-2 text-right">{q.impressions}</td>
                        <td className="px-3 py-2 text-right">{(q.ctr * 100).toFixed(1)}%</td>
                        <td className="px-3 py-2 text-right">{q.position.toFixed(1)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
          {report.pages.length > 0 ? (
            <div>
              <p className="mb-2 text-xs font-bold uppercase text-slate-500">Top pages</p>
              <div className="max-h-64 overflow-y-auto space-y-1.5">
                {report.pages.slice(0, 15).map((p) => (
                  <div key={p.page} className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-xs">
                    <span className="truncate font-medium text-slate-800 max-w-[60%]">{p.page}</span>
                    <div className="flex gap-3 text-slate-500">
                      <span>{p.clicks} clicks</span>
                      <span>{(p.ctr * 100).toFixed(1)}% CTR</span>
                      <span>pos {p.position.toFixed(1)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          <p className="text-[10px] text-slate-400">Cập nhật: {new Date(report.fetchedAt).toLocaleString("vi-VN")}</p>
        </div>
      ) : null}
    </div>
  );
}
