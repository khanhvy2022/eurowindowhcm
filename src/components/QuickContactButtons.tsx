"use client";

import { Phone } from "lucide-react";
import { usePathname } from "next/navigation";

export default function QuickContactButtons() {
  const pathname = usePathname();
  const isEn = pathname?.startsWith("/en");
  const phoneNumber = "0966994338";
  const zaloUrl = `https://zalo.me/${phoneNumber}`;

  return (
    <div
      aria-label={isEn ? "Quick contact" : "Liên hệ nhanh"}
      className="fixed bottom-6 left-6 z-50 flex flex-col items-center gap-4 print:hidden select-none"
    >
      {/* Nút Zalo tròn với vòng tròn tỏa sóng */}
      <a
        href={zaloUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={isEn ? "Chat via Zalo: 0966 994 338" : "Chat Zalo: 0966 994 338"}
        className="group relative flex h-14 w-14 items-center justify-center transition-transform duration-300 hover:scale-110 active:scale-95"
      >
        {/* Vòng tỏa sóng lớn bên ngoài */}
        <span className="absolute h-14 w-14 rounded-full bg-blue-500/20 animate-ping duration-1000" />
        {/* Vòng mờ thứ 2 */}
        <span className="absolute h-14 w-14 rounded-full bg-blue-500/30 animate-pulse" />
        {/* Nút tròn Zalo chính giữa */}
        <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#0068FF] text-white shadow-lg shadow-blue-500/50">
          <span className="font-extrabold text-[13px] tracking-tight text-white select-none">
            Zalo
          </span>
        </span>
      </a>

      {/* Nút Gọi Điện thoại tròn màu đỏ với vòng tỏa sóng */}
      <a
        href={`tel:${phoneNumber}`}
        title={isEn ? "Call Hotline: 0966 994 338" : "Gọi Hotline: 0966 994 338"}
        className="group relative flex h-14 w-14 items-center justify-center transition-transform duration-300 hover:scale-110 active:scale-95"
      >
        {/* Vòng tỏa sóng lớn bên ngoài */}
        <span className="absolute h-14 w-14 rounded-full bg-red-500/20 animate-ping duration-700" />
        {/* Vòng mờ thứ 2 */}
        <span className="absolute h-14 w-14 rounded-full bg-red-500/30 animate-pulse" />
        {/* Nút tròn Gọi màu đỏ chính giữa */}
        <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#E52D27] text-white shadow-lg shadow-red-500/50">
          <Phone className="h-5 w-5 fill-white text-white animate-phone-ring -rotate-12" />
        </span>
      </a>
    </div>
  );
}
