"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TocItem } from "@/lib/toc";

export default function BlogToc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    const headingElements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headingElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;

        // 画面上部に一番近い見出しをアクティブとして扱う
        const topMost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
        );
        setActiveId(topMost.target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );

    headingElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="目次" className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-foreground">
        <List className="w-4 h-4" />
        目次
      </div>
      <ul className="space-y-1 text-sm max-h-[60vh] overflow-y-auto">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
                window.history.replaceState(null, "", `#${item.id}`);
              }}
              style={{ paddingLeft: `${12 + (item.level - 2) * 12}px` }}
              className={cn(
                "block py-1 border-l-2 -ml-px transition-colors",
                activeId === item.id
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border",
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
