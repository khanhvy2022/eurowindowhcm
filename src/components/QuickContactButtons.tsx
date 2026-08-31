"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.47 11.47 0 00.57 3.58 1 1 0 01-.25 1.01l-2.2 2.2z" />
  </svg>
);

export default function QuickContactButtons() {
  const pathname = usePathname();
  const isEn = pathname?.startsWith("/en");
  const phoneNumber = "0966994338";
  const formattedPhone = "0966 994 338";
  const zaloUrl = `https://zalo.me/${phoneNumber}`;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        @keyframes sonar {
          0%   { transform: scale(1);   opacity: .55; }
          100% { transform: scale(2.2); opacity: 0;   }
        }
        @keyframes sonar2 {
          0%   { transform: scale(1);   opacity: .35; }
          100% { transform: scale(2.6); opacity: 0;   }
        }
        .sonar-1 { animation: sonar 2.2s ease-out infinite; }
        .sonar-2 { animation: sonar2 2.2s ease-out infinite .55s; }
        .sonar-red-1 { animation: sonar 2s ease-out infinite .2s; }
        .sonar-red-2 { animation: sonar2 2s ease-out infinite .85s; }
      `}</style>

      <div
        aria-label={isEn ? "Quick contact" : "Liên hệ nhanh"}
        className={`fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-center gap-3.5 sm:gap-4 print:hidden select-none pb-[env(safe-area-inset-bottom,0px)] transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* ── ZALO ── */}
        <div className="relative flex items-center justify-center">
          <span className="sonar-1 absolute inset-0 rounded-full bg-[#0068ff]/40 pointer-events-none" />
          <span className="sonar-2 absolute inset-0 rounded-full bg-[#0068ff]/25 pointer-events-none" />

          <a
            href={zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={isEn ? `Chat via Zalo: ${formattedPhone}` : `Chat Zalo: ${formattedPhone}`}
            className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-200 hover:scale-110 active:scale-95 overflow-hidden"
            style={{ background: "linear-gradient(145deg, #1a8cff 0%, #0052cc 100%)" }}
          >
            <span
              className="text-white font-black select-none"
              style={{ fontSize: 16, letterSpacing: "-0.5px", fontFamily: "Arial Black, Arial, sans-serif" }}
            >
              Zalo
            </span>
          </a>
        </div>

        {/* ── CALL ── */}
        <div className="relative flex items-center justify-center">
          <span className="sonar-red-1 absolute inset-0 rounded-full bg-red-500/45 pointer-events-none" />
          <span className="sonar-red-2 absolute inset-0 rounded-full bg-red-500/25 pointer-events-none" />

          <a
            href={`tel:${phoneNumber}`}
            title={isEn ? `Call Hotline: ${formattedPhone}` : `Gọi Hotline: ${formattedPhone}`}
            className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-200 hover:scale-110 active:scale-95"
            style={{ background: "linear-gradient(145deg, #ff4444 0%, #cc0000 100%)" }}
          >
            <PhoneIcon />
          </a>
        </div>
      </div>
    </>
  );
}

