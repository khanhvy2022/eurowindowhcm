"use client";

import { useState, useEffect, useCallback } from "react";
import { ListTodo, Loader2, RefreshCw } from "lucide-react";

type JobStatus = "pending" | "running" | "completed" | "failed";
type AuditJob = {
  id: string;
  urls: string[];
  maxPages: number;
  status: JobStatus;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  error?: string;
  createdBy?: string;
};

const statusColors: Record<JobStatus, string> = {
  pending: "bg-slate-100 text-slate-600",
  running: "bg-blue-100 text-blue-700",
  completed: "bg-emerald-100 text-emerald-700",
  failed: "bg-red-100 text-red-700",
};

export default function QueuePanel({ token }: { token: () => string | null }) {
  const [jobs, setJobs] = useState<AuditJob[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [urls, setUrls] = useState("");

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/seo/queue", {
        headers: { Authorization: "Bearer " + (token() ?? "") },
      });
      const data = await res.json();
      if (data.ok) setJobs(data.jobs ?? []);
      else setError(data.error ?? "Lỗi lấy danh sách job");
    } catch {
      setError("Không kết nối server");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  async function createJob() {
    const urlList = urls.split("\n").map((u) => u.trim()).filter(Boolean);
    if (urlList.length === 0) { setError("Nhập ít nhất 1 URL"); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/seo/queue", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + (token() ?? "") },
        body: JSON.stringify({ urls: urlList, maxPages: 30 }),
      });
      const data = await res.json();
      if (data.ok) {
        setUrls("");
        fetchJobs();
      } else {
        setError(data.error ?? "Lỗi tạo job");
      }
    } catch {
      setError("Không kết nối server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="flex items-center gap-2 text-base font-bold text-slate-900">
          <ListTodo className="h-4 w-4 text-[#0066aa]" /> Background Queue
        </h3>
        <button onClick={fetchJobs} disabled={loading}
          className="inline-flex items-center gap-1 rounded border border-slate-300 px-2 py-1 text-xs text-slate-600 hover:bg-slate-50 disabled:opacity-50">
          <RefreshCw className={"h-3 w-3 " + (loading ? "animate-spin" : "")} /> Làm mới
        </button>
      </div>
      <div className="flex gap-2 mb-4">
        <input value={urls} onChange={(e) => setUrls(e.target.value)}
          placeholder="URL mới (mỗi dòng 1 URL)"
          className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900" />
        <button onClick={createJob} disabled={loading || !urls.trim()}
          className="inline-flex items-center gap-1 rounded-lg bg-[#0066aa] px-3 py-2 text-sm font-bold text-white hover:bg-[#005690] disabled:opacity-50">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ListTodo className="h-4 w-4" />}
          Tạo job
        </button>
      </div>
      {error ? <p className="mb-3 text-sm text-red-600">{error}</p> : null}
      {jobs.length === 0 ? (
        <p className="text-sm text-slate-400 text-center py-4">Chưa có job nào.</p>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {jobs.map((job) => (
            <div key={job.id} className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-xs">
              <div className="flex-1 min-w-0">
                <p className="font-mono text-slate-500 truncate">{job.id}</p>
                <p className="text-slate-400">{job.urls.length} URLs — {job.maxPages} maxPages</p>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-3">
                <span className={`rounded px-2 py-0.5 text-[10px] font-bold ${statusColors[job.status]}`}>
                  {job.status}
                </span>
                {job.error ? <span className="text-red-500 max-w-[120px] truncate">{job.error}</span> : null}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
