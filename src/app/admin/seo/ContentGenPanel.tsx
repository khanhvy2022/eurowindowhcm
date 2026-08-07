"use client";

import { useState } from "react";
import { Wand2, Loader2, Copy, Check } from "lucide-react";

type ContentResult = {
  title: string;
  description: string;
  content: string;
  provider: string | null;
};

const inputCls =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-[#0066aa] focus:ring-2 focus:ring-[#0066aa]/20";

export default function ContentGenPanel({ token }: { token: () => string | null }) {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [style, setStyle] = useState<"blog" | "product" | "faq" | "news">("blog");
  const [length, setLength] = useState<"short" | "medium" | "long">("medium");
  const [result, setResult] = useState<ContentResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function generate() {
    if (!topic.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/seo/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + (token() ?? "") },
        body: JSON.stringify({
          topic: topic.trim(),
          keywords: keywords.split(",").map((k) => k.trim()).filter(Boolean),
          style,
          length,
        }),
      });
      const data = await res.json();
      if (data.ok) setResult({ title: data.title, description: data.description, content: data.content, provider: data.provider });
      else setError(data.error ?? "Lỗi tạo nội dung");
    } catch {
      setError("Không kết nối được server");
    } finally {
      setLoading(false);
    }
  }

  function copyContent() {
    if (!result) return;
    const text = `# ${result.title}\n\n${result.description}\n\n${result.content}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <h3 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-900">
        <Wand2 className="h-4 w-4 text-[#0066aa]" /> AI Content Generator
      </h3>
      <div className="grid gap-3 sm:grid-cols-2 mb-4">
        <div>
          <label className="mb-1 block text-xs font-bold uppercase text-slate-500">Chủ đề *</label>
          <input value={topic} onChange={(e) => setTopic(e.target.value)}
            placeholder="VD: Cửa uPVC Eurowindow ưu điểm vượt trội"
            className={inputCls} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase text-slate-500">Từ khóa (phân cách phẩy)</label>
          <input value={keywords} onChange={(e) => setKeywords(e.target.value)}
            placeholder="cửa uPVC, Eurowindow, ưu điểm"
            className={inputCls} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase text-slate-500">Loại nội dung</label>
          <select value={style} onChange={(e) => setStyle(e.target.value as typeof style)}
            className={inputCls}>
            <option value="blog">Blog</option>
            <option value="product">Sản phẩm</option>
            <option value="faq">FAQ</option>
            <option value="news">Tin tức</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase text-slate-500">Độ dài</label>
          <select value={length} onChange={(e) => setLength(e.target.value as typeof length)}
            className={inputCls}>
            <option value="short">Ngắn (300-500 từ)</option>
            <option value="medium">Trung bình (500-1000 từ)</option>
            <option value="long">Dài (1000-2000 từ)</option>
          </select>
        </div>
      </div>
      <button onClick={generate} disabled={loading || !topic.trim()}
        className="inline-flex items-center gap-2 rounded-lg bg-[#0066aa] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#005690] disabled:opacity-50">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
        {loading ? "Đang tạo..." : "Tạo nội dung"}
      </button>
      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      {result ? (
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-400">Provider: {result.provider ?? "fallback"}</p>
            <button onClick={copyContent}
              className="inline-flex items-center gap-1 rounded border border-slate-300 px-2 py-1 text-xs text-slate-600 hover:bg-slate-50">
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {copied ? "Đã copy" : "Copy"}
            </button>
          </div>
          <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
            <h4 className="font-bold text-slate-900">{result.title}</h4>
            {result.description ? <p className="mt-1 text-xs text-slate-500 italic">{result.description}</p> : null}
            <div className="mt-3 prose prose-sm max-w-none text-slate-700 whitespace-pre-wrap text-sm leading-6">
              {result.content}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
