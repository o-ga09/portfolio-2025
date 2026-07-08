"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Command, Rss, Github, Instagram, Menu, X } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import ThemeToggle from "../theme/theme-toggle";

// X（旧Twitter）のロゴ。lucide-react には X ロゴがないため自前の SVG を使用する。
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

// SNS リンク定義
type SocialLink = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/o-ga09", icon: Github },
  { label: "X", href: "https://x.com/o_ga09", icon: XIcon },
  {
    label: "Instagram",
    href: "https://www.instagram.com/o_ga09",
    icon: Instagram,
  },
];

export default function Header() {
  const router = useRouter();
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  // モバイルで QR コードを表示中の SNS（null なら非表示）
  const [qrSocial, setQrSocial] = React.useState<SocialLink | null>(null);

  // スクロール制御
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // キーボードイベントの処理
  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      const searchInput = document.querySelector(
        'input[type="search"]'
      ) as HTMLInputElement;
      if (searchInput) {
        searchInput.focus();
        setIsSearchFocused(true);
      }
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // メニューを閉じる
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="bg-background border-b border-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="text-xl font-bold text-gray-900 dark:text-white"
            >
              o-ga09 blog
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link
                href="/blog"
                className="text-gray-900 dark:text-white/70 hover:text-gray-900 dark:hover:text-white dark:hover:bg-white/10 rounded-md px-2 py-1 transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/about"
                className="text-gray-900 dark:text-white/70 hover:text-gray-900 dark:hover:text-white dark:hover:bg-white/10 rounded-md px-2 py-1 transition-colors"
              >
                About
              </Link>
              <Link
                href="/tags"
                className="text-gray-900 dark:text-white/70 hover:text-gray-900 dark:hover:text-white dark:hover:bg-white/10 rounded-md px-2 py-1 transition-colors"
              >
                Tags
              </Link>
              <Link
                href="#"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  const year = String(new Date().getFullYear());
                  router.push(`/recap/${year}`);
                }}
                className="text-gray-900 dark:text-white/70 hover:text-gray-900 dark:hover:text-white dark:hover:bg-white/10 rounded-md px-2 py-1 transition-colors"
              >
                Recap
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <form
              action="/search"
              className="relative hidden sm:block"
              onSubmit={(e) => {
                const form = e.currentTarget;
                const input = form.querySelector("input");
                if (!input?.value.trim()) {
                  e.preventDefault();
                }
              }}
            >
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors ${
                  isSearchFocused
                    ? "text-primary"
                    : "text-gray-900 dark:text-white/50"
                }`}
              />
              <Input
                type="search"
                name="q"
                placeholder="キーワードで検索..."
                className={`pl-10 pr-12 w-64 transition-all ${
                  isSearchFocused ? "ring-2 ring-primary/30" : ""
                }`}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <div
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1 px-1.5 py-0.5 rounded ${
                  isSearchFocused ? "bg-primary/10" : ""
                }`}
              >
                <Command
                  className={`w-3 h-3 transition-colors ${
                    isSearchFocused
                      ? "text-primary"
                      : "text-gray-900 dark:text-white/50"
                  }`}
                />
                <span
                  className={`text-xs transition-colors ${
                    isSearchFocused
                      ? "text-primary"
                      : "text-gray-900 dark:text-white/50"
                  }`}
                >
                  K
                </span>
              </div>
            </form>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link href="/api/feed" className="hidden sm:block">
                <Button variant="ghost" size="icon" aria-label="RSS Feed">
                  <Rss className="h-4 w-4" />
                </Button>
              </Link>
              {SOCIAL_LINKS.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:block"
                >
                  <Button variant="ghost" size="icon" aria-label={social.label}>
                    <social.icon className="h-4 w-4" />
                  </Button>
                </Link>
              ))}

              {/* モバイルメニューボタン */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="メニュー"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* モバイルメニューのオーバーレイ */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* モバイルメニュー本体 */}
      <div
        className={`md:hidden fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-gray-900 shadow-xl z-50 transition-all duration-300 ease-in-out rounded-l-3xl overflow-hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* グラデーション装飾 */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5" />

        {/* メニューコンテンツ */}
        <div className="relative z-10">
          <div className="flex justify-end p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={closeMenu}
              aria-label="メニューを閉じる"
              className="text-gray-900 dark:text-white hover:bg-primary/10 dark:hover:bg-primary/20 rounded-full transition-all duration-200"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          <nav className="flex flex-col px-8 py-8 space-y-4">
            {[
              { href: "/blog", label: "Blog", emoji: "📝" },
              { href: "/about", label: "About", emoji: "👋" },
              { href: "/tags", label: "Tags", emoji: "🏷️" },
              { href: "/recap", label: "Recap", emoji: "✨" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href === "/recap" ? "#" : item.href}
                className="group relative flex items-center space-x-3 p-3 text-lg font-medium text-gray-900 dark:text-white rounded-2xl hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-200"
                onClick={(e) => {
                  if (item.href === "/recap") {
                    e.preventDefault();
                    const year = String(new Date().getFullYear());
                    router.push(`/recap/${year}`);
                    closeMenu();
                    return;
                  }
                  closeMenu();
                }}
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/20 dark:bg-primary/10 group-hover:scale-110 transition-transform duration-200">
                  {item.emoji}
                </span>
                <span className="group-hover:translate-x-1 transition-transform duration-200">
                  {item.label}
                </span>
              </Link>
            ))}

            <div className="flex items-center space-x-4 pt-8 mt-4 border-t border-primary/10 dark:border-primary/5">
              <Link href="/api/feed">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="RSS Feed"
                  className="text-gray-900 dark:text-white hover:bg-primary/10 dark:hover:bg-primary/20 rounded-xl transition-all duration-200"
                >
                  <div className="p-2 rounded-lg bg-warning/20 dark:bg-warning/10">
                    <Rss className="h-5 w-5" />
                  </div>
                </Button>
              </Link>
              {SOCIAL_LINKS.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="icon"
                  aria-label={`${social.label} のQRコードを表示`}
                  onClick={() => setQrSocial(social)}
                  className="text-gray-900 dark:text-white hover:bg-primary/10 dark:hover:bg-primary/20 rounded-xl transition-all duration-200"
                >
                  <div className="p-2 rounded-lg bg-secondary/20 dark:bg-secondary/10">
                    <social.icon className="h-5 w-5" />
                  </div>
                </Button>
              ))}
            </div>
          </nav>
        </div>

        {/* 装飾的な要素 */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-primary/5 to-transparent" />
        <div className="absolute top-20 -left-6 w-12 h-12 bg-accent/20 rounded-full blur-xl" />
        <div className="absolute bottom-40 -right-6 w-16 h-16 bg-secondary/20 rounded-full blur-xl" />
      </div>

      {/* QRコードモーダル（モバイル） */}
      {qrSocial && (
        <div
          className="md:hidden fixed inset-0 z-[60] flex items-center justify-center p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${qrSocial.label} のQRコード`}
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setQrSocial(null)}
            aria-hidden="true"
          />
          <div className="relative z-10 w-full max-w-xs rounded-3xl bg-white dark:bg-gray-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-gray-900 dark:text-white">
                <qrSocial.icon className="h-5 w-5" />
                <span className="font-medium">{qrSocial.label}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQrSocial(null)}
                aria-label="閉じる"
                className="text-gray-900 dark:text-white hover:bg-primary/10 dark:hover:bg-primary/20 rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex justify-center rounded-2xl bg-white p-4">
              <QRCodeSVG
                value={qrSocial.href}
                size={200}
                level="M"
                marginSize={2}
              />
            </div>
            <p className="mt-4 text-center text-sm text-gray-500 dark:text-white/60 break-all">
              {qrSocial.href}
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
