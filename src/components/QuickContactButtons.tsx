"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function QuickContactButtons() {
  const pathname = usePathname();
  const isEn = pathname?.startsWith("/en");
  const phoneNumber = "0966994338";
  const formattedPhone = "0966 994 338";
  const zaloUrl = `https://zalo.me/${phoneNumber}`;

  return (
    <div
      aria-label={isEn ? "Quick contact" : "Liên hệ nhanh"}
      className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-center gap-3 sm:gap-4 print:hidden select-none pb-[env(safe-area-inset-bottom,0px)]"
    >
      {/* Nút Zalo tròn với vòng tròn tỏa sóng */}
      <a
        href={zaloUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={isEn ? `Chat via Zalo: ${formattedPhone}` : `Chat Zalo: ${formattedPhone}`}
        className="group relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center transition-transform duration-300 hover:scale-110 active:scale-95"
      >
        {/* Vòng tỏa sóng lớn bên ngoài */}
        <span className="absolute h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-blue-500/25 animate-ping duration-1000" />
        {/* Vòng mờ thứ 2 */}
        <span className="absolute h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-blue-500/35 animate-pulse" />
        {/* Nút Zalo chính giữa */}
        <span className="relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white shadow-lg shadow-blue-500/50 overflow-hidden p-1.5 border border-blue-400/30">
          <Image
            src="/icons/zalo-icon.svg"
            alt="Zalo"
            width={40}
            height={40}
            unoptimized
            className="h-full w-full object-contain"
          />
        </span>
      </a>

      {/* Nút Gọi Điện thoại tròn màu xanh lá với vòng tỏa sóng */}
      <a
        href={`tel:${phoneNumber}`}
        title={isEn ? `Call Hotline: ${formattedPhone}` : `Gọi Hotline: ${formattedPhone}`}
        className="group relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center transition-transform duration-300 hover:scale-110 active:scale-95"
      >
        {/* Vòng tỏa sóng lớn bên ngoài */}
        <span className="absolute h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-emerald-500/25 animate-ping duration-700" />
        {/* Vòng mờ thứ 2 */}
        <span className="absolute h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-emerald-500/35 animate-pulse" />
        {/* Nút tròn Gọi điện màu xanh lá chính giữa */}
        <span className="relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white shadow-lg shadow-emerald-500/50 overflow-hidden">
          <Image
            src="/icons/accept-call-icon.svg"
            alt="Gọi Hotline"
            width={48}
            height={48}
            unoptimized
            className="h-full w-full object-contain animate-phone-ring"
          />
        </span>
      </a>
    </div>
  );
}
