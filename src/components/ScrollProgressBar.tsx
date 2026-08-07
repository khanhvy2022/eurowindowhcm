"use client";

import { useEffect, useState } from "react";

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-[9999] h-[3px] w-full bg-transparent">
      <div className="h-full bg-[#0066aa] transition-all duration-150 ease-out" style={{ width: `${progress}%` }} />
    </div>
  );
}