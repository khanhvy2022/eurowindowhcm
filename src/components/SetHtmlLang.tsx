"use client";

import { useEffect } from "react";

export default function SetHtmlLang() {
  useEffect(() => {
    document.documentElement.lang = "en";
    return () => {
      document.documentElement.lang = "vi";
    };
  }, []);

  return null;
}
