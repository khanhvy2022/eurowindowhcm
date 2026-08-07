"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Search, Play, FileText, AlertTriangle, CheckCircle2, Loader2, ShieldCheck, Globe,
  Link as LinkIcon, Hash, BarChart3, Bot, Download, Send,
} from "lucide-react";
import GscPanel from "./GscPanel";
import PsiPanel from "./PsiPanel";
import ContentGenPanel from "./ContentGenPanel";
import CompetitorPanel from "./CompetitorPanel";
import QueuePanel from "./QueuePanel";

type Issue = { code: string; severity: "error" | "warning" | "info"; message: string };
type PageResult = { url: string; issues: Issue[] };
type ContentAuditItem = {
  url: string;
  wordCount: number;
  sentenceCount: number;
  readability: "good" | "ok" | "hard";
  eeatScore: number;
  issues: Issue[];
};
type KeywordOpp = {
  keyword: string;
  intent: string;
  volume: number;
  difficulty: number;
  cluster: string;
  gap: string;
};
type LinkSuggestion = { fromUrl: string; toUrl: string; anchorText: string; reason: string };
type InternalLinkReport = {
  orphanPages: string[];
  suggestions: LinkSuggestion[];
  pillarCandidates: string[];
};
type GeoItem = { aiVisibilityScore: number; entityCompleteness: number; knowledgeCoverage: number; recommendations: string[] };

type AuditResult = {
  id: string;
  targetUrl: string;
  checkedAt: string;
  pages: PageResult[];
  summary: {
    seoScore: number;
    technicalScore: number;
    contentScore: number;
    totalPages: number;
    issueCounts: { error: number; warning: number; info: number };
  };
  priorityChecklist: string[];
  contentAudits: Record<string, ContentAuditItem>;
  keywords: KeywordOpp[];
  internalLinks: InternalLinkReport;
  geo: Record<string, GeoItem>;
  tookMs?: number;
};

const inputCls =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-[#0066aa] focus:ring-2 focus:ring-[#0066aa]/20";

const PLACEHOLDER_URLS = [
  "https://eurowindow.biz/",
  "https://eurowindow.biz/tin-tuc",
  "https://eurowindow.biz/san-pham",
  "https://eurowindow.biz/gioi-thieu",
].join("\n");

function ScoreBadge({ label, value }: { label: string; value: number }) {
  const color = value >= 80 ? "text-emerald-600" : value >= 60 ? "text-amber-600" : "text-red-600";
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-3xl font-bold text-slate-900">{value}<span className={"text-xl " + color}>/100</span></p>
    </div>
  );
}

function IssueRow({ issue }: { issue: Issue }) {
  const map = {
    error: { icon: AlertTriangle, cls: "text-red-600 bg-red-50" },
    warning: { icon: AlertTriangle, cls: "text-amber-600 bg-amber-50" },
    info: { icon: CheckCircle2, cls: "text-slate-500 bg-slate-100" },
  } as const;
  const { icon: Icon, cls } = map[issue.severity];
  return (
    <li className="flex items-start gap-2 rounded-lg bg-white px-3 py-2 text-sm shadow-sm">
      <Icon className={"mt-0.5 h-4 w-4 shrink-0 " + cls + " rounded-full p-0.5"} />
      <div>
        <p className="font-medium text-slate-800">{issue.message}</p>
        <code className="text-[11px] text-slate-400">{issue.code}</code>
      </div>
    </li>
  );
}

function shortUrl(url: string) {
  try {
    const p = new URL(url).pathname.replace(/\/$/, "");
    return p || "/";
  } catch {
    return url;
  }
}

function exportAudit(type: string) {
  const token = typeof window !== "undefined" ? window.localStorage.getItem("ew_admin_token") : null;
  fetch("/api/seo/export?type=" + encodeURIComponent(type), {
    headers: { Authorization: "Bearer " + (token ?? "") },
  })
    .then((r) => {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.blob();
    })
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "seo-export-" + type + ".csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    })
    .catch(() => alert("Không xuất được CSV. Chạy audit trước."));
}

const SEO_COMMANDS = [
  "/seo help",
  "/seo audit https://eurowindow.biz/",
  "/seo suggest https://eurowindow.biz/san-pham",
];

type AssistantMsg = { role: "user" | "bot"; content: string };

function AssistantPanel({ token }: { token: () => string | null }) {
  const [messages, setMessages] = useState<AssistantMsg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send(text: string) {
    const message = text.trim();
    if (!message || loading) return;
    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/seo/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + (token() ?? "") },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      const reply = data?.ok ? (data.text as string) : (data?.error ?? "Lỗi server.");
      setMessages((prev) => [...prev, { role: "bot", content: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "bot", content: "Không kết nối được server." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <h3 className="mb-2 flex items-center gap-2 text-base font-bold text-slate-900">
        <Bot className="h-4 w-4 text-[#0066aa]" /> AI SEO Assistant
      </h3>
      <div className="flex flex-wrap gap-1.5 pb-3">
        {SEO_COMMANDS.map((c) => (
          <button key={c} onClick={() => send(c)} disabled={loading}
            className="rounded-full border border-[#0066aa]/30 bg-[#0066aa]/5 px-2.5 py-1 text-[11px] text-[#0066aa] transition hover:bg-[#0066aa]/10 disabled:opacity-50">
            {c}
          </button>
        ))}
      </div>
      <div className="mb-2 max-h-64 space-y-2 overflow-y-auto rounded-lg bg-slate-50 p-3">
        {messages.length === 0 ? (
          <p className="text-xs text-slate-400">Hỏi về SEO bằng tiếng Việt hoặc dùng lệnh /seo audit, /seo suggest, /seo help.</p>
        ) : messages.map((m, i) => (
          <div key={i} className={"max-w-[92%] whitespace-pre-wrap rounded-lg px-3 py-2 text-[13px] leading-5 " + (m.role === "user" ? "ml-auto bg-[#0066aa] text-white" : "bg-white text-slate-700 shadow-sm")}>
            {m.content}
          </div>
        ))}
      </div>
      <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-center gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="VD: /seo audit https://eurowindow.biz/ hoặc hỏi tự nhiên"
          className={inputCls + " text-xs"} maxLength={2000} />
        <button type="submit" disabled={loading || !input.trim()} className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0066aa] text-white transition hover:bg-[#005690] disabled:opacity-40">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </button>
      </form>
    </div>
  );
}

export default function SeoTab() {
  const [urlsInput, setUrlsInput] = useState("");
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [hasMongo, setHasMongo] = useState(true);

  useEffect(() => {
    fetch("/api/seo/dashboard")
      .then((r) => r.json())
      .then((d) => {
        if (d.ok && Array.isArray(d.audits) && d.audits.length > 0) setResult(d.audits[0]);
      })
      .catch(() => setHasMongo(false));
  }, []);

  const token = useCallback(() => (typeof window !== "undefined" ? window.localStorage.getItem("ew_admin_token") : null), []);

  async function runAudit() {
    const urls = urlsInput.split("\n").map((u) => u.trim()).filter(Boolean);
    if (urls.length === 0) { alert("Nhập ít nhất 1 URL để audit."); return; }
    setRunning(true);
    setResult(null);
    try {
      const res = await fetch("/api/seo/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + (token() ?? "") },
        body: JSON.stringify({ urls, maxPages: 30 }),
      });
      const data = await res.json();
      if (data.ok) setResult(data.result);
      else alert(data.error ?? "Audit thất bại");
    } catch {
      alert("Lỗi kết nối server khi chạy audit.");
    } finally {
      setRunning(false);
    }
  }

  if (!result) return renderStart();

  const s = result.summary;
  const contentValues = Object.values(result.contentAudits ?? {});
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Kết quả Audit SEO</h2>
          <p className="text-sm text-slate-500">
            {result.pages.length} trang - {new Date(result.checkedAt).toLocaleString("vi-VN")} - {result.targetUrl} - {((result.tookMs ?? 0) / 1000).toFixed(1)}s
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => exportAudit("summary")} title="Xuất tổng hợp"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50">
            <Download className="h-4 w-4" /> Tổng hợp
          </button>
          <button onClick={() => exportAudit("issues")} title="Xuất danh sách lỗi"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50">
            <Download className="h-4 w-4" /> Lỗi
          </button>
          <button onClick={() => exportAudit("keywords")} title="Xuất từ khóa"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50">
            <Download className="h-4 w-4" /> Từ khóa
          </button>
          <button onClick={() => setResult(null)} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50">
            <Play className="h-4 w-4" /> Audit lại
          </button>
        </div>
      </div>

      <AssistantPanel token={token} />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <ScoreBadge label="SEO Score" value={s.seoScore} />
        <ScoreBadge label="Technical" value={s.technicalScore} />
        <ScoreBadge label="Content" value={s.contentScore} />
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Trang crawl</p>
          <p className="mt-1 text-3xl font-bold text-slate-800">{s.totalPages}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Tổng issue</p>
          <p className="mt-1 text-3xl font-bold">
            <span className="text-red-600">{s.issueCounts.error}</span>/<span className="text-amber-600">{s.issueCounts.warning}</span>/<span className="text-slate-500">{s.issueCounts.info}</span>
          </p>
          <p className="text-[10px] text-slate-400">E/W/I</p>
        </div>
      </div>

      {result.priorityChecklist.length > 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-900">
            <FileText className="h-4 w-4 text-[#0066aa]" /> Checklist ưu tiên (AI)
          </h3>
          <ol className="list-decimal list-inside space-y-1.5">
            {result.priorityChecklist.map((item, i) => (<li key={i} className="text-sm leading-6 text-slate-700">{item}</li>))}
          </ol>
        </div>
      ) : null}

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-900">
          <Search className="h-4 w-4 text-[#0066aa]" /> Chi tiết theo trang
        </h3>
        <div className="space-y-4">
          {result.pages.map((p) => (
            <div key={p.url} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
              <p className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-800">
                <span className={"h-2 w-2 rounded-full " + (p.issues.some((i) => i.severity === "error") ? "bg-red-500" : p.issues.some((i) => i.severity === "warning") ? "bg-amber-500" : "bg-emerald-500")} />
                <span>{shortUrl(p.url)}</span>
              </p>
              {p.issues.length === 0 ? (<p className="text-sm text-emerald-600">Không có vấn đề.</p>) : (
                <ul className="space-y-1">{p.issues.map((issue, i) => (<IssueRow key={i} issue={issue} />))}</ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {contentValues.length > 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-900">
            <BarChart3 className="h-4 w-4 text-[#0066aa]" /> AI Content Audit
          </h3>
          <div className="space-y-4">
            {contentValues.map((c) => (
              <div key={c.url} className="rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-bold text-slate-800">{shortUrl(c.url)}</span>
                  <div className="flex flex-wrap gap-3 text-xs">
                    <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-1">Từ: {c.wordCount}</span>
                    <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-1">Câu: {c.sentenceCount}</span>
                    <span className={"inline-flex items-center gap-1 rounded px-2 py-1 font-bold " + (c.readability === "good" ? "bg-emerald-100 text-emerald-700" : c.readability === "ok" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700")}>Readability: {c.readability}</span>
                    <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-1">EEAT: {c.eeatScore}</span>
                  </div>
                </div>
                <ul className="mt-2 space-y-1">{c.issues.map((i, idx) => (<IssueRow key={idx} issue={i} />))}</ul>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {result.geo ? (
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-900">
            <Globe className="h-4 w-4 text-[#0066aa]" /> GEO (AI Visibility)
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {Object.entries(result.geo).map(([url, g]) => (
              <div key={url} className="rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm">
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-bold text-slate-800">{shortUrl(url)}</span>
                  <span className={"rounded-full px-2 py-0.5 font-bold text-xs " + (g.aiVisibilityScore >= 70 ? "bg-emerald-100 text-emerald-700" : g.aiVisibilityScore >= 40 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700")}>AI Visibility: {g.aiVisibilityScore}%</span>
                </div>
                <p className="text-xs text-slate-500 mb-1">Entity: {g.entityCompleteness}% - Knowledge: {g.knowledgeCoverage}%</p>
                {g.recommendations.map((r, i) => (<p key={i} className="leading-5 text-slate-600">- {r}</p>))}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {result.keywords && result.keywords.length > 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-900">
            <Hash className="h-4 w-4 text-[#0066aa]" /> Keyword Research
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50 text-[10px] font-bold uppercase text-slate-500">
                <tr>
                  <th className="px-3 py-2">Từ khóa</th>
                  <th className="px-3 py-2">Nhóm</th>
                  <th className="px-3 py-2">Intent</th>
                  <th className="px-3 py-2 text-right">Volume</th>
                  <th className="px-3 py-2">KD</th>
                  <th className="px-3 py-2">Gap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {result.keywords.slice(0, 15).map((k) => (
                  <tr key={k.keyword} className="hover:bg-slate-50">
                    <td className="px-3 py-2 font-medium text-slate-800">{k.keyword}</td>
                    <td className="px-3 py-2 text-slate-500">{k.cluster}</td>
                    <td className="px-3 py-2">{k.intent}</td>
                    <td className="px-3 py-2 text-right">{k.volume}</td>
                    <td className="px-3 py-2">{k.difficulty}</td>
                    <td className="px-3 py-2">
                      <span className={"rounded px-1.5 py-0.5 text-[11px] font-bold " + (k.gap === "covered" ? "bg-emerald-100 text-emerald-700" : k.gap === "weak" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700")}>{k.gap}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      {result.internalLinks ? (
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-900">
            <LinkIcon className="h-4 w-4 text-[#0066aa]" /> Internal Linking
          </h3>
          {result.internalLinks.pillarCandidates.length > 0 ? (
            <div className="mb-3">
              <p className="text-xs font-bold uppercase text-slate-500">Pillar pages</p>
              <ul className="list-disc list-inside text-sm text-slate-700">
                {result.internalLinks.pillarCandidates.map((u) => (<li key={u}>{shortUrl(u)}</li>))}
              </ul>
            </div>
          ) : null}
          {result.internalLinks.orphanPages.length > 0 ? (
            <div className="mb-3">
              <p className="text-xs font-bold uppercase text-amber-700">Orphan pages ({result.internalLinks.orphanPages.length})</p>
              <ul className="list-disc list-inside text-sm text-slate-700">
                {result.internalLinks.orphanPages.map((u) => (<li key={u}>{shortUrl(u)}</li>))}
              </ul>
            </div>
          ) : null}
          {result.internalLinks.suggestions.length > 0 ? (
            <div className="text-xs">
              <p className="mb-2 text-xs font-bold uppercase text-slate-500">Gợi ý liên kết ({result.internalLinks.suggestions.length})</p>
              <div className="max-h-56 space-y-1.5 overflow-y-auto">
                {result.internalLinks.suggestions.slice(0, 10).map((s, i) => (
                  <div key={i} className="rounded border border-slate-100 bg-slate-50 px-2 py-1.5">
                    <span className="font-medium text-slate-800">{s.anchorText}</span>
                    <span className="text-slate-400"> {String.fromCodePoint(8594)} </span>
                    <span className="text-slate-600">{shortUrl(s.toUrl)}</span>
                    <span className="text-slate-400"> ({s.reason})</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      <GscPanel token={token} />
      <PsiPanel token={token} />
      <ContentGenPanel token={token} />
      <CompetitorPanel token={token} />
      <QueuePanel token={token} />
    </div>
  );

  function renderStart() {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="mb-1 flex items-center gap-2 text-lg font-bold text-slate-900">
            <ShieldCheck className="h-5 w-5 text-[#0066aa]" /> AI SEO Enterprise - Technical & Content Audit
          </h2>
          <p className="mb-4 text-sm text-slate-500">Audit toàn diện: kỹ thuật, nội dung, từ khóa, liên kết nội bộ, schema và GEO visibility.</p>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">Danh sách URL (mỗi dòng 1 URL)</label>
          <textarea className={inputCls + " min-h-[120px] font-mono text-xs"} value={urlsInput} onChange={(e) => setUrlsInput(e.target.value)} placeholder={PLACEHOLDER_URLS} />
          <div className="mt-3 flex items-center gap-3">
            <button onClick={runAudit} disabled={running} className="inline-flex items-center gap-2 rounded-lg bg-[#0066aa] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#005690] disabled:opacity-50">
              {running ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
              {running ? "Đang audit..." : "Chạy Audit"}
            </button>
            {running ? <span className="text-xs text-slate-400">Đang crawl + phân tích từng trang...</span> : null}
            {!hasMongo ? <span className="text-xs text-amber-600">Không lưu lịch sử (thiếu MONGODB_URI)</span> : null}
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-500">
          <p className="font-bold">Ghi chú:</p>
          <ul className="list-disc list-inside mt-1 space-y-0.5">
            <li>Nhập URL trang web thực (ví dụ https://eurowindow.biz).</li>
            <li>Kết quả audit chạy thời gian thực; nếu có MONGODB_URI sẽ lưu lịch sử.</li>
            <li>AI checklist + content suggestion dùng LLM rotation (Groq/Gemini/DeepSeek/Cloudflare/GitHub) nếu có key.</li>
          </ul>
        </div>
        <AssistantPanel token={token} />
        <QueuePanel token={token} />
      </div>
    );
  }
}
