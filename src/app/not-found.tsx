import BrandLogo from "@/components/BrandLogo";
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "404 — Trang không tìm thấy | Eurowindow",
  description: "Trang bạn tìm kiếm không tồn tại hoặc đã được di chuyển.",
};

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#0b1628] text-white">
      <BrandLogo />
      <main className="mx-auto max-w-[1320px] px-5 py-20 text-center sm:px-8">
        <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-[#0066aa]/20 text-4xl font-bold text-[#0066aa]">404</div>
        <h1 className="mt-6 text-3xl font-bold uppercase tracking-[-0.04em] sm:text-4xl">Trang không tìm thấy</h1>
        <p className="mt-4 max-w-md text-zinc-400 leading-7">Trang bạn đang tìm kiếm có thể đã được di chuyển, đổi tên hoặc không còn tồn tại.</p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link href="/" className="inline-flex items-center gap-2 rounded-lg bg-[#0066aa] px-6 py-3 font-medium transition hover:bg-[#005088]"><Home className="h-4 w-4" /> Trang chủ</Link>
          <Link href="javascript:history.back()" className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 font-medium transition hover:bg-white/10"><ArrowLeft className="h-4 w-4" /> Quay lại</Link>
        </div>
      </main>
    </div>
  );
}