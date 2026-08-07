"use client";

import { useEffect, useState } from "react";

type TocItem = { id: string; label: string };

type TableOfContentsProps = {
  items: TocItem[];
};

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    if (items.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="sticky top-24 hidden max-h-[calc(100vh-6rem)] overflow-y-auto lg:block" aria-label="Table of contents">
      <div className="border-l border-white/10 pl-4">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-zinc-400">Mục lục</h3>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block text-sm leading-6 transition ${activeId === item.id ? "text-[#4da6e0] font-medium" : "text-zinc-400 hover:text-zinc-200"}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}