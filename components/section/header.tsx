import Link from "next/link";
import { Search, Command, Rss, Github } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import ThemeToggle from "../theme/theme-toggle";

export default function Header() {
  return (
    <header className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-foreground">
              o-ga09.dev
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link
                href="/blog"
                className="text-foreground/70 hover:text-foreground"
              >
                Blog
              </Link>
              <Link
                href="/about"
                className="text-foreground/70 hover:text-foreground"
              >
                About
              </Link>
              <Link
                href="/tags"
                className="text-foreground/70 hover:text-foreground"
              >
                Tags
              </Link>
              <Link
                href="/recap"
                className="text-foreground/70 hover:text-foreground"
              >
                Recap
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 w-4 h-4" />
              <Input
                type="search"
                placeholder="検索"
                className="pl-10 pr-12 w-64"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <Command className="w-3 h-3 text-foreground/50" />
                <span className="text-xs text-foreground/50">K</span>
              </div>
            </div>
            <ThemeToggle />
            <Button variant="ghost" size="icon">
              <Rss className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Github className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
