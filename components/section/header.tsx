"use client";
import Link from "next/link";
import { Search, Command, Rss, Github } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import ThemeToggle from "../theme/theme-toggle";

export default function Header() {
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);

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

  return (
    <header className="bg-background border-b border-border">
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
                href="/recap"
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
            <ThemeToggle />
            <Button variant="ghost" size="icon" asChild>
              <Link href="/api/feed" aria-label="RSS フィード" target="_blank">
                <Rss className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon">
              <Link href="https://github.com/o-ga09" target="_blank">
                <Github className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
