"use client";

import { Phone } from "lucide-react";

export default function QuickContactButtons() {
  const phoneNumber = "0966994338";
  const displayPhone = "0966 994 338";
  const zaloUrl = `https://zalo.me/${phoneNumber}`;

  return (
    <div
      aria-label="Liên hệ nhanh"
      className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3 print:hidden select-none"
    >
      {/* Nút Zalo */}
      <a
        href={zaloUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="Chat Zalo: 0966 994 338"
        className="group relative flex items-center gap-2.5 rounded-full bg-white/95 p-1.5 pr-4 shadow-lg shadow-blue-500/20 backdrop-blur-md border border-blue-100 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30"
      >
        {/* Vòng xung quanh Zalo */}
        <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#0068FF] text-white shadow-md shadow-[#0068FF]/30">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0068FF] opacity-30 duration-1000" />
          <svg
            className="relative h-6 w-6 fill-current transition-transform duration-300 group-hover:scale-110"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M24 4C12.95 4 4 12.51 4 23c0 5.48 2.45 10.39 6.39 13.84-.28 2.54-1.39 6.22-3.32 8.52-.22.26-.06.64.28.64 4.02 0 8.04-1.89 10.6-3.79 1.95.52 4 .8 6.05.8 11.05 0 20-8.51 20-19S35.05 4 24 4z" />
            <path
              fill="#FFFFFF"
              d="M13.5 28.5h4.8c.8 0 1.2-.5 1.2-1.1s-.4-1.1-1.2-1.1h-2.5l3.5-5.2c.4-.6.1-1.1-.6-1.1h-4.6c-.8 0-1.2.5-1.2 1.1s.4 1.1 1.2 1.1h2.3l-3.5 5.2c-.4.6-.1 1.1.6 1.1zm8.2 0h2.4c.7 0 1.2-.5 1.2-1.1V21.1c0-.6-.5-1.1-1.2-1.1h-2.4c-.7 0-1.2.5-1.2 1.1v6.3c0 .6.5 1.1 1.2 1.1zm6.8 0h4.8c.7 0 1.2-.5 1.2-1.1s-.5-1.1-1.2-1.1h-2.4v-5.2c0-.6-.5-1.1-1.2-1.1s-1.2.5-1.2 1.1v6.3c0 .6.5 1.1 1.2 1.1zm8.8 0c2.4 0 4.1-1.9 4.1-4.3s-1.7-4.3-4.1-4.3-4.1 1.9-4.1 4.3 1.7 4.3 4.1 4.3zm0-2.2c-1.1 0-1.7-1-1.7-2.1s.6-2.1 1.7-2.1 1.7 1 1.7 2.1-.6 2.1-1.7 2.1z"
            />
          </svg>
        </span>
        <div className="hidden sm:flex flex-col text-left leading-tight">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600">Chat Zalo</span>
          <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
            Tư vấn 24/7
          </span>
        </div>
      </a>

      {/* Nút Gọi Điện / Hotline */}
      <a
        href={`tel:${phoneNumber}`}
        title={`Gọi Hotline: ${displayPhone}`}
        className="group relative flex items-center gap-2.5 rounded-full bg-white/95 p-1.5 pr-4 shadow-lg shadow-emerald-500/20 backdrop-blur-md border border-emerald-100 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/30"
      >
        {/* Vòng hiệu ứng sóng Hotline */}
        <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-600/30">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-35 duration-700" />
          <Phone className="relative h-5 w-5 animate-pulse fill-current transition-transform duration-300 group-hover:rotate-12" />
        </span>
        <div className="flex flex-col text-left leading-tight">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600">Hotline 24/7</span>
          <span className="text-xs font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors tracking-tight">
            {displayPhone}
          </span>
        </div>
      </a>
    </div>
  );
}
