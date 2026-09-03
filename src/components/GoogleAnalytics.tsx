"use client";

import { useEffect } from "react";

export default function GoogleAnalytics({ gaId = "G-BBMNYWJ8WN" }: { gaId?: string }) {
  useEffect(() => {
    let loaded = false;

    const loadGtag = () => {
      if (loaded) return;
      loaded = true;

      window.removeEventListener("scroll", loadGtag);
      window.removeEventListener("mousemove", loadGtag);
      window.removeEventListener("touchstart", loadGtag);
      window.removeEventListener("keydown", loadGtag);

      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      script.async = true;
      document.head.appendChild(script);

      (window as any).dataLayer = (window as any).dataLayer || [];
      function gtag(...args: any[]) {
        (window as any).dataLayer.push(args);
      }
      gtag("js", new Date());
      gtag("config", gaId);
    };

    window.addEventListener("scroll", loadGtag, { passive: true, once: true });
    window.addEventListener("mousemove", loadGtag, { passive: true, once: true });
    window.addEventListener("touchstart", loadGtag, { passive: true, once: true });
    window.addEventListener("keydown", loadGtag, { passive: true, once: true });

    const timeout = setTimeout(loadGtag, 3500);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", loadGtag);
      window.removeEventListener("mousemove", loadGtag);
      window.removeEventListener("touchstart", loadGtag);
      window.removeEventListener("keydown", loadGtag);
    };
  }, [gaId]);

  return null;
}
