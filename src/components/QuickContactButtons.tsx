"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";

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
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 400);

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setShowBackToTop(window.scrollY > 300);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
        aria-label={isEn ? "Quick contact & Navigation" : "Liên hệ nhanh & Điều hướng"}
        className={`fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-center gap-4 print:hidden select-none pb-[env(safe-area-inset-bottom,0px)] transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* ── BACK TO TOP (Cách Zalo đúng 1rem / 16px) ── */}
        <button
          type="button"
          onClick={scrollToTop}
          aria-label={isEn ? "Back to top" : "Lên đầu trang"}
          title={isEn ? "Back to top" : "Cuộn lên đầu trang"}
          className={`relative w-12 h-12 min-w-[48px] min-h-[48px] sm:w-14 sm:h-14 rounded-full border border-white/20 bg-[#0c1c33]/90 text-[#C9A227] shadow-2xl backdrop-blur-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-[#C9A227] hover:bg-[#C9A227] hover:text-[#06101f] active:scale-95 ${
            showBackToTop ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-75 pointer-events-none"
          }`}
        >
          <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* ── ZALO ── */}
        <div className="relative flex items-center justify-center">
          <span className="sonar-1 absolute inset-0 rounded-full bg-[#0068ff]/40 pointer-events-none" />
          <span className="sonar-2 absolute inset-0 rounded-full bg-[#0068ff]/25 pointer-events-none" />

          <a
            href={zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={isEn ? `Chat via Zalo: ${formattedPhone}` : `Chat Zalo: ${formattedPhone}`}
            title={isEn ? `Chat via Zalo: ${formattedPhone}` : `Chat Zalo: ${formattedPhone}`}
            className="relative w-12 h-12 min-w-[48px] min-h-[48px] sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-200 hover:scale-110 active:scale-95 overflow-hidden"
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
            aria-label={isEn ? `Call Hotline: ${formattedPhone}` : `Gọi Hotline: ${formattedPhone}`}
            title={isEn ? `Call Hotline: ${formattedPhone}` : `Gọi Hotline: ${formattedPhone}`}
            className="relative w-12 h-12 min-w-[48px] min-h-[48px] sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-200 hover:scale-110 active:scale-95"
            style={{ background: "linear-gradient(145deg, #ff4444 0%, #cc0000 100%)" }}
          >
            <PhoneIcon />
          </a>
        </div>
      </div>
    </>
  );
}

