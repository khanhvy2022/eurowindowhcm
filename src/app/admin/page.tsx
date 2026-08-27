"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import SeoTab from "./seo/SeoTab";
import {
  LogOut, Plus, Trash2, Pencil, FileText, BookOpen, Lock, Search, X, Gauge, Users, Shield,
} from "lucide-react";

type Post = {
  _id?: string;
  slug: string;
  title: string;
  category: string;
  subCategory?: string;
  date: string;
  excerpt: string;
  image?: string;
  sections?: { heading: string; id: string; body: string[] }[];
  faq?: { q: string; a: string }[];
  contentHtml?: string;
  filePath?: string;
  source?: "file" | "db";
};

type KnowledgeItem = {
  id: string;
  category: string;
  keywords: string[];
  question: string;
  answer: string;
};

type UserItem = {
  username: string;
  role: "admin" | "editor" | "viewer";
  createdAt?: string;
};

const TOKEN_KEY = "ew_admin_token";

function getToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

const inputCls =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-[#0066aa] focus:ring-2 focus:ring-[#0066aa]/20";
const labelCls = "mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500";

function SectionEditor({ value, onChange }: { value: { heading: string; id: string; body: string[] }[]; onChange: (v: { heading: string; id: string; body: string[] }[]) => void }) {
  return (
    <div className="space-y-3">
      {value.map((s, i) => (
        <div key={i} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <div className="flex items-center gap-2">
            <input
              className={inputCls}
              placeholder="Tiêu đề mục"
              value={s.heading}
              onChange={(e) => {
                const next = [...value];
                next[i] = { ...s, heading: e.target.value, id: e.target.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/[^a-z0-9]+/g, "-") };
                onChange(next);
              }}
            />
            <button
              type="button"
              onClick={() => onChange(value.filter((_, j) => j !== i))}
              className="rounded p-2 text-slate-400 hover:text-red-500"
              aria-label="Xóa mục"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-2 space-y-2">
            {s.body.map((p, j) => (
              <div key={j} className="flex gap-2">
                <textarea
                  className={inputCls}
                  placeholder="Đoạn văn"
                  rows={2}
                  value={p}
                  onChange={(e) => {
                    const next = [...value];
                    const body = [...s.body];
                    body[j] = e.target.value;
                    next[i] = { ...s, body };
                    onChange(next);
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    const next = [...value];
                    const body = s.body.filter((_, k) => k !== j);
                    next[i] = { ...s, body };
                    onChange(next);
                  }}
                  className="rounded p-2 text-slate-400 hover:text-red-500"
                  aria-label="Xóa đoạn"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const next = [...value];
                next[i] = { ...s, body: [...s.body, ""] };
                onChange(next);
              }}
              className="text-xs font-bold text-[#0066aa] hover:underline"
            >
              + Thêm đoạn
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...value, { heading: "", id: "", body: [""] }])}
        className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-[#0066aa]/40 px-3 py-2 text-sm font-bold text-[#0066aa] hover:bg-[#0066aa]/5"
      >
        <Plus className="h-4 w-4" /> Thêm mục
      </button>
    </div>
  );
}

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username || "admin", password }),
      });
      const data = await res.json();
      if (data.ok) {
        window.localStorage.setItem(TOKEN_KEY, data.token);
        window.localStorage.setItem("ew_admin_role", data.role ?? "admin");
        window.localStorage.setItem("ew_admin_user", data.username ?? "admin");
        onSuccess();
      } else {
        setError(data.error ?? "Đăng nhập thất bại");
      }
    } catch {
      setError("Lỗi kết nối máy chủ");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center px-5">
      <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0066aa] text-white">
          <Lock className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Quản trị Eurowindow</h1>
        <p className="mt-1 text-sm text-slate-500">Đăng nhập để quản lý bài viết và chatbot</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className={labelCls}>Tên đăng nhập</label>
            <input
              type="text"
              className={inputCls}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin (mặc định)"
              autoFocus
            />
          </div>
          <div>
            <label className={labelCls}>Mật khẩu</label>
            <input
              type="password"
              className={inputCls}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
            />
          </div>
          {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full rounded-lg bg-[#0066aa] py-2.5 text-sm font-bold text-white transition hover:bg-[#005690] disabled:opacity-50"
          >
            {loading ? "Đang xác thực..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
}

function PostForm({ initial, onCancel, onSaved }: { initial?: Post; onCancel: () => void; onSaved: () => void }) {
  const isEdit = Boolean(initial);
  const [form, setForm] = useState<Post>(
    initial ?? {
      slug: "",
      title: "",
      category: "Tin tức",
      date: new Date().toLocaleDateString("vi-VN"),
      excerpt: "",
      image: "",
      sections: [],
      faq: [],
    },
  );
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initial) {
      setForm(initial);
    }
  }, [initial]);

  function set<K extends keyof Post>(key: K, value: Post[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const token = getToken();
      const res = await fetch(`/api/posts${isEdit && initial ? `/${encodeURIComponent(initial.slug)}` : ""}`, {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token ?? "eurowindow2026"}`,
          "x-admin-password": "eurowindow2026",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.ok) onSaved();
      else setError(data.error ?? "Lưu thất bại");
    } catch {
      setError("Lỗi kết nối máy chủ");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5 rounded-xl border border-slate-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900">
          {isEdit ? "Sửa bài viết" : "Thêm bài viết"}
          {initial?.source === "file" ? <span className="ml-2 text-sm font-normal text-blue-600">(từ file markdown)</span> : null}
        </h3>
        <button type="button" onClick={onCancel} className="rounded p-2 text-slate-400 hover:text-slate-700">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className={labelCls}>Tiêu đề *</label>
          <input className={inputCls} value={form.title} onChange={(e) => set("title", e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Slug (URL)</label>
          <input
            className={inputCls}
            value={form.slug}
            onChange={(e) => set("slug", e.target.value)}
            placeholder="Để trống tự tạo từ tiêu đề"
          />
        </div>
        <div>
          <label className={labelCls}>Danh mục chính (Label 1)</label>
          <select className={inputCls} value={form.category} onChange={(e) => set("category", e.target.value)}>
            <option value="Sản phẩm">Sản phẩm</option>
            <option value="Tin tức">Tin tức</option>
            <option value="Dịch vụ">Dịch vụ</option>
            <option value="Dự án">Dự án</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Danh mục sản phẩm (Label 2)</label>
          <select
            className={inputCls}
            value={form.subCategory ?? ""}
            onChange={(e) => set("subCategory", e.target.value)}
          >
            <option value="">-- Chọn danh mục sản phẩm --</option>
            <option value="Cửa nhôm">Cửa nhôm</option>
            <option value="Cửa nhựa uPVC">Cửa nhựa uPVC</option>
            <option value="Cửa gỗ">Cửa gỗ</option>
            <option value="Cửa cuốn">Cửa cuốn</option>
            <option value="Cửa tự động">Cửa tự động</option>
            <option value="Sản phẩm kính">Sản phẩm kính</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Ngày đăng</label>
          <input className={inputCls} value={form.date} onChange={(e) => set("date", e.target.value)} />
        </div>
      </div>

      <div>
        <label className={labelCls}>Ảnh (đường dẫn hoặc URL)</label>
        <input className={inputCls} value={form.image ?? ""} onChange={(e) => set("image", e.target.value)} />
      </div>

      <div>
        <label className={labelCls}>Mô tả ngắn</label>
        <textarea className={inputCls} rows={2} value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} />
      </div>

      <div>
        <label className={labelCls}>Nội dung (mục)</label>
        <SectionEditor value={form.sections ?? []} onChange={(sections) => set("sections", sections)} />
      </div>

      {form.contentHtml !== undefined ? (
        <div>
          <label className={labelCls}>Nội dung HTML (từ bài viết di trú eurowindowhcm.com)</label>
          <textarea
            className={inputCls}
            rows={8}
            value={form.contentHtml}
            onChange={(e) => set("contentHtml", e.target.value)}
            placeholder="<div>...</div>"
          />
        </div>
      ) : null}

      {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving || !form.title.trim()}
          className="rounded-lg bg-[#0066aa] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#005690] disabled:opacity-50"
        >
          {saving ? "Đang lưu..." : initial?.source === "file" ? "Lưu vào DB" : "Lưu bài viết"}
        </button>
        <button type="button" onClick={onCancel} className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50">
          Hủy
        </button>
      </div>
    </form>
  );
}

function KnowledgeForm({ initial, onCancel, onSaved }: { initial?: KnowledgeItem; onCancel: () => void; onSaved: () => void }) {
  const isEdit = Boolean(initial);
  const [form, setForm] = useState<KnowledgeItem>(
    initial ?? { id: "", category: "Khác", keywords: [], question: "", answer: "" },
  );
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const body = { category: form.category, keywords: form.keywords, question: form.question, answer: form.answer };
    fetch(`/api/knowledge${isEdit && initial ? `/${initial.id}` : ""}`, {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify(body),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.ok) onSaved();
        else setError(data.error ?? "Lưu thất bại");
      })
      .catch(() => setError("Lỗi kết nối máy chủ"))
      .finally(() => setSaving(false));
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900">{isEdit ? "Sửa câu hỏi" : "Thêm câu hỏi"}</h3>
        <button type="button" onClick={onCancel} className="rounded p-2 text-slate-400 hover:text-slate-700">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className={labelCls}>Câu hỏi *</label>
          <input className={inputCls} value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} />
        </div>
        <div>
          <label className={labelCls}>Danh mục</label>
          <input className={inputCls} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        </div>
      </div>
      <div>
        <label className={labelCls}>Từ khóa (phân cách bằng dấu phẩy) *</label>
        <input
          className={inputCls}
          value={form.keywords.join(", ")}
          onChange={(e) => setForm({ ...form, keywords: e.target.value.split(",").map((k) => k.trim()).filter(Boolean) })}
        />
      </div>
      <div>
        <label className={labelCls}>Câu trả lời *</label>
        <textarea className={inputCls} rows={4} value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} />
      </div>
      {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="rounded-lg bg-[#0066aa] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#005690]">
          {saving ? "Đang lưu..." : "Lưu"}
        </button>
        <button type="button" onClick={onCancel} className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50">
          Hủy
        </button>
      </div>
    </form>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<"posts" | "knowledge" | "seo" | "users">("posts");
  const [posts, setPosts] = useState<Post[]>([]);
  const [filePosts, setFilePosts] = useState<Post[]>([]);
  const [knowledge, setKnowledge] = useState<KnowledgeItem[]>([]);
  const [users, setUsers] = useState<UserItem[]>([]);
  const [editing, setEditing] = useState<Post | null>(null);
  const [showNewPost, setShowNewPost] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<string | null>(null);
  const [editingKb, setEditingKb] = useState<KnowledgeItem | null>(null);
  const [showNewKb, setShowNewKb] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [adminRole, setAdminRole] = useState<string>("admin");
  const [showNewUser, setShowNewUser] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newUserRole, setNewUserRole] = useState<"admin" | "editor" | "viewer">("viewer");

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const [postsRes, kbRes, usersRes, fileRes] = await Promise.all([
        fetch("/api/posts"),
        fetch("/api/knowledge"),
        fetch("/api/admin/users", { headers: { Authorization: `Bearer ${getToken()}` } }),
        fetch("/api/posts/files"),
      ]);
      const postsData = await postsRes.json();
      const kbData = await kbRes.json();
      const usersData = await usersRes.json();
      const fileData = await fileRes.json();
      setPosts(postsData.posts ?? []);
      setFilePosts(fileData.posts ?? []);
      setKnowledge(kbData.entries ?? []);
      setUsers(usersData.users ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!getToken()) return;
    const storedRole = window.localStorage.getItem("ew_admin_role") ?? "admin";
    setAdminRole(storedRole);
    const t = window.setTimeout(() => {
      setAuthed(true);
      void refresh();
    }, 0);
    return () => window.clearTimeout(t);
  }, [refresh]);

  const filteredPosts = useMemo(() => {
    const q = search.toLowerCase();
    const allPosts = posts.length > 0 ? posts : filePosts;
    return allPosts.filter((p) => (p.title + p.category).toLowerCase().includes(q));
  }, [posts, filePosts, search]);

  const filteredKb = useMemo(() => {
    const q = search.toLowerCase();
    return knowledge.filter((k) => (k.question + k.answer + k.category).toLowerCase().includes(q));
  }, [knowledge, search]);

  async function deletePost(p: Post) {
    if (!confirm(`Xóa bài viết "${p.title}"?`)) return;
    await fetch(`/api/posts/${p.slug}`, { method: "DELETE", headers: { Authorization: `Bearer ${getToken()}` } });
    refresh();
  }

  async function deleteKb(item: KnowledgeItem) {
    if (!confirm(`Xóa câu hỏi "${item.question}"?`)) return;
    await fetch(`/api/knowledge/${item.id}`, { method: "DELETE", headers: { Authorization: `Bearer ${getToken()}` } });
    refresh();
  }

  async function createUser() {
    if (!newUsername.trim() || !newPassword.trim()) return;
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify({ username: newUsername.trim(), password: newPassword.trim(), role: newUserRole }),
    });
    const data = await res.json();
    if (data.ok) {
      setShowNewUser(false);
      setNewUsername("");
      setNewPassword("");
      setNewUserRole("viewer");
      refresh();
    } else {
      alert(data.error ?? "Tạo user thất bại");
    }
  }

  async function deleteUser(u: UserItem) {
    if (!confirm(`Xóa user "${u.username}"?`)) return;
    await fetch(`/api/admin/users?username=${encodeURIComponent(u.username)}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    refresh();
  }

  async function importAllPosts() {
    if (!confirm("Import tất cả bài viết từ file markdown vào database? Bài viết đã có sẽ bị bỏ qua.")) return;
    setImporting(true);
    setImportResult(null);
    try {
      const res = await fetch("/api/posts/import", {
        method: "POST",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      if (data.ok) {
        setImportResult(`Import thành công: ${data.imported} bài mới, ${data.skipped} đã tồn tại, ${data.errors} lỗi`);
        refresh();
      } else {
        setImportResult(`Lỗi: ${data.error}`);
      }
    } catch {
      setImportResult("Lỗi kết nối máy chủ");
    } finally {
      setImporting(false);
    }
  }

  async function changeUserRole(u: UserItem, newRole: "admin" | "editor" | "viewer") {
    await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify({ username: u.username, role: newRole }),
    });
    refresh();
  }

  function logout() {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem("ew_admin_role");
    window.localStorage.removeItem("ew_admin_user");
    setAuthed(false);
  }

  if (!authed) return <LoginForm onSuccess={() => { setAuthed(true); refresh(); }} />;

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0066aa] text-white">
              <FileText className="h-4 w-4" />
            </div>
            <span className="text-base font-bold text-slate-900">Eurowindow Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" className="rounded-lg px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100">Xem website</Link>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-500">
              <Shield className="h-3 w-3" /> {adminRole}
            </span>
            <button onClick={logout} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50">
              <LogOut className="h-4 w-4" /> Đăng xuất
            </button>
          </div>
        </div>
        <div className="mx-auto flex max-w-6xl gap-1 px-5 pb-3">
          <button
            onClick={() => setTab("posts")}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold ${tab === "posts" ? "bg-[#0066aa] text-white" : "text-slate-600 hover:bg-slate-100"}`}
          >
            <FileText className="h-4 w-4" /> Bài viết ({posts.length > 0 ? posts.length : filePosts.length})
          </button>
          <button
            onClick={() => setTab("knowledge")}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold ${tab === "knowledge" ? "bg-[#0066aa] text-white" : "text-slate-600 hover:bg-slate-100"}`}
          >
            <BookOpen className="h-4 w-4" /> Chatbot ({knowledge.length})
          </button>
          <button
            onClick={() => setTab("seo")}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold ${tab === "seo" ? "bg-[#0066aa] text-white" : "text-slate-600 hover:bg-slate-100"}`}
          >
            <Gauge className="h-4 w-4" /> SEO
          </button>
          {adminRole === "admin" ? (
            <button
              onClick={() => setTab("users")}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold ${tab === "users" ? "bg-[#0066aa] text-white" : "text-slate-600 hover:bg-slate-100"}`}
            >
              <Users className="h-4 w-4" /> Users ({users.length})
            </button>
          ) : null}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8">
        {tab === "seo" ? (
          <SeoTab />
        ) : (
          <>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              className={`${inputCls} pl-9`}
              placeholder="Tìm kiếm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {tab === "posts" ? (
            <div className="flex items-center gap-2">
              {filePosts.length > 0 && posts.length === 0 ? (
                <button
                  onClick={importAllPosts}
                  disabled={importing}
                  className="inline-flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm font-bold text-amber-700 transition hover:bg-amber-100 disabled:opacity-50"
                >
                  {importing ? "Đang import..." : `Import ${filePosts.length} bài viết`}
                </button>
              ) : null}
              <button
                onClick={() => { setEditing(null); setShowNewPost((v) => !v); }}
                className="inline-flex items-center gap-2 rounded-lg bg-[#0066aa] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#005690]"
              >
                <Plus className="h-4 w-4" /> Bài viết mới
              </button>
            </div>
          ) : (
            <button
              onClick={() => { setEditingKb(null); setShowNewKb((v) => !v); }}
              className="inline-flex items-center gap-2 rounded-lg bg-[#0066aa] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#005690]"
            >
              <Plus className="h-4 w-4" /> Câu hỏi mới
            </button>
          )}
        </div>

        {loading ? <p className="py-10 text-center text-sm text-slate-500">Đang tải...</p> : null}

        {tab === "posts" ? (
          <div className="space-y-5">
            {showNewPost || editing ? (
              <PostForm
                key={editing?.slug ?? "new"}
                initial={editing ?? undefined}
                onCancel={() => { setEditing(null); setShowNewPost(false); }}
                onSaved={() => { setEditing(null); setShowNewPost(false); refresh(); }}
              />
            ) : null}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-200 bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Tiêu đề</th>
                    <th className="px-4 py-3">Danh mục</th>
                    <th className="px-4 py-3">Nguồn</th>
                    <th className="px-4 py-3">Ngày</th>
                    <th className="px-4 py-3 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredPosts.map((p) => {
                    const isDb = posts.some((dbp) => dbp.slug === p.slug);
                    return (
                      <tr key={p.slug} className="hover:bg-slate-50">
                        <td className="px-4 py-3">
                          <p className="font-bold text-slate-900">{p.title}</p>
                          <p className="text-xs text-slate-400">/{p.slug}</p>
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700">
                              {p.category || "Sản phẩm"}
                            </span>
                            {p.subCategory ? (
                              <span className="rounded bg-blue-100 px-2 py-0.5 text-[11px] font-bold text-blue-700">
                                {p.subCategory}
                              </span>
                            ) : null}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {isDb ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
                              <Shield className="h-3 w-3" /> DB
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-bold text-blue-700">
                              <FileText className="h-3 w-3" /> File
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-slate-600">{p.date}</td>
                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-1">
                            <Link href={`/tin-tuc/${p.slug}`} className="rounded p-2 text-slate-400 hover:text-[#0066aa]" title="Xem">
                              <FileText className="h-4 w-4" />
                            </Link>
                            <button onClick={() => setEditing(p)} className="rounded p-2 text-slate-400 hover:text-[#0066aa]" title="Sửa">
                              <Pencil className="h-4 w-4" />
                            </button>
                            {isDb ? (
                              <button onClick={() => deletePost(p)} className="rounded p-2 text-slate-400 hover:text-red-500" title="Xóa">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            ) : null}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredPosts.length === 0 ? (
                    <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-400">Chưa có bài viết nào.</td></tr>
                  ) : null}
                </tbody>
              </table>
            </div>
            {importResult ? (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                {importResult}
              </div>
            ) : null}
            {posts.length > 0 ? (
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-xs text-blue-700">
                <strong>{posts.length} bài viết</strong> đồng bộ trực tiếp từ Database MongoDB Atlas (100% Khớp với DB).
              </div>
            ) : filePosts.length > 0 ? (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-700">
                <strong>{filePosts.length} bài viết</strong> từ dữ liệu file hệ thống (Đang ở chế độ Offline / Chưa kết nối DB).
              </div>
            ) : null}
          </div>
        ) : (
          <div className="space-y-5">
            {showNewKb || editingKb ? (
              <KnowledgeForm
                initial={editingKb ?? undefined}
                onCancel={() => { setEditingKb(null); setShowNewKb(false); }}
                onSaved={() => { setEditingKb(null); setShowNewKb(false); refresh(); }}
              />
            ) : null}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-200 bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Câu hỏi</th>
                    <th className="px-4 py-3">Từ khóa</th>
                    <th className="px-4 py-3 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredKb.map((k) => (
                    <tr key={k.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <p className="font-bold text-slate-900">{k.question}</p>
                        <p className="mt-0.5 line-clamp-1 text-xs text-slate-400">{k.answer}</p>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {k.keywords.map((kw, i) => (
                            <span key={i} className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] text-slate-500">{kw}</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-1">
                          <button onClick={() => setEditingKb(k)} className="rounded p-2 text-slate-400 hover:text-[#0066aa]" title="Sửa">
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button onClick={() => deleteKb(k)} className="rounded p-2 text-slate-400 hover:text-red-500" title="Xóa">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredKb.length === 0 ? (
                    <tr><td colSpan={3} className="px-4 py-8 text-center text-slate-400">Chưa có câu hỏi nào.</td></tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>
        )}
          </>
        )}
        {tab === "users" && adminRole === "admin" ? (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Quản lý người dùng</h2>
              <button onClick={() => setShowNewUser((v) => !v)}
                className="inline-flex items-center gap-2 rounded-lg bg-[#0066aa] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#005690]">
                <Plus className="h-4 w-4" /> Thêm user
              </button>
            </div>
            {showNewUser ? (
              <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <label className={labelCls}>Username *</label>
                    <input className={inputCls} value={newUsername} onChange={(e) => setNewUsername(e.target.value)} placeholder="username" />
                  </div>
                  <div>
                    <label className={labelCls}>Mật khẩu *</label>
                    <input type="password" className={inputCls} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                  </div>
                  <div>
                    <label className={labelCls}>Vai trò</label>
                    <select className={inputCls} value={newUserRole} onChange={(e) => setNewUserRole(e.target.value as typeof newUserRole)}>
                      <option value="viewer">Viewer (chỉ xem)</option>
                      <option value="editor">Editor (audit + export + assistant)</option>
                      <option value="admin">Admin (toàn quyền)</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={createUser} disabled={!newUsername.trim() || !newPassword.trim()}
                    className="rounded-lg bg-[#0066aa] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#005690] disabled:opacity-50">
                    Tạo user
                  </button>
                  <button onClick={() => setShowNewUser(false)} className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50">
                    Hủy
                  </button>
                </div>
              </div>
            ) : null}
            {loading ? <p className="py-10 text-center text-sm text-slate-500">Đang tải...</p> : null}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-200 bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Username</th>
                    <th className="px-4 py-3">Vai trò</th>
                    <th className="px-4 py-3 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((u) => (
                    <tr key={u.username} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-bold text-slate-900">{u.username}</td>
                      <td className="px-4 py-3">
                        <select value={u.role} onChange={(e) => changeUserRole(u, e.target.value as typeof u.role)}
                          className="rounded border border-slate-300 bg-white px-2 py-1 text-xs font-bold">
                          <option value="admin">Admin</option>
                          <option value="editor">Editor</option>
                          <option value="viewer">Viewer</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={() => deleteUser(u)} className="rounded p-2 text-slate-400 hover:text-red-500" title="Xóa">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && !loading ? (
                    <tr><td colSpan={3} className="px-4 py-8 text-center text-slate-400">Chưa có user nào.</td></tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
