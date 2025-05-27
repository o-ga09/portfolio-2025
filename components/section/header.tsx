import Link from "next/link";
import { Search, Command, Sun, Rss, Github } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-gray-900">
              o-ga09.dev
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/blog" className="text-gray-700 hover:text-gray-900">
                Blog
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-gray-900">
                About
              </Link>
              <Link href="/tags" className="text-gray-700 hover:text-gray-900">
                Tags
              </Link>
              <Link href="/recap" className="text-gray-700 hover:text-gray-900">
                Recap
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="search"
                placeholder="検索"
                className="pl-10 pr-12 w-64"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <Command className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-400">K</span>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <Sun className="w-5 h-5" />
            </Button>
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
