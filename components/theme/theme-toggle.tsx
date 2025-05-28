"use client";

import { useTheme } from "@/components/theme/theme-provider";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // マウント後のみレンダリングするためのEffect
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="テーマ切替"
    >
      {/* ライトモードアイコン */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 transition-all ${
          theme === "light" ? "scale-100 opacity-100" : "scale-0 opacity-0"
        } absolute`}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 2v2"></path>
        <path d="M12 20v2"></path>
        <path d="m4.93 4.93 1.41 1.41"></path>
        <path d="m17.66 17.66 1.41 1.41"></path>
        <path d="M2 12h2"></path>
        <path d="M20 12h2"></path>
        <path d="m6.34 17.66-1.41 1.41"></path>
        <path d="m19.07 4.93-1.41 1.41"></path>
      </svg>

      {/* ダークモードアイコン */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 transition-all ${
          theme === "dark" ? "scale-100 opacity-100" : "scale-0 opacity-0"
        } absolute`}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
      </svg>
    </Button>
  );
}
