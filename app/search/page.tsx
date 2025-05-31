"use client";

import Footer from "@/components/section/footer";
import Header from "@/components/section/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ViewTransitionsLink } from "@/lib/viewTransitonLink";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { blogPosts } from "@/lib/blog-data";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  matches: string[];
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchTerm, setSearchTerm] = useState(query);

  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const results = blogPosts
      .filter((post) => {
        const searchTarget = [
          post.title.toLowerCase(),
          post.description.toLowerCase(),
          ...(post.tags || []).map((tag) => tag.toLowerCase()),
        ].join(" ");

        return searchTarget.includes(searchQuery.toLowerCase());
      })
      .map((post) => ({
        ...post,
        matches: [], // TODO: ハイライト機能の実装のために使用
      }));

    setSearchResults(results);
  };

  useEffect(() => {
    performSearch(query);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container max-w-4xl mx-auto px-4 py-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3 mt-4 text-foreground">
            検索結果
          </h1>
          <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 w-4 h-4" />
              <Input
                type="search"
                placeholder="キーワードを入力"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            <Button type="submit">検索</Button>
          </form>

          {query && (
            <p className="text-muted-foreground mb-6">
              「{query}」の検索結果: {searchResults.length}件
            </p>
          )}

          {searchResults.length > 0 ? (
            <div className="space-y-6">
              {searchResults.map((result) => (
                <article
                  key={result.id}
                  className="bg-card rounded-lg p-6 shadow-md"
                >
                  <ViewTransitionsLink href={`/blog/${result.id}`}>
                    <h2 className="text-xl font-semibold text-foreground mb-2 hover:text-primary transition-colors">
                      {result.title}
                    </h2>
                  </ViewTransitionsLink>
                  <div className="flex items-center mb-2 text-xs text-muted-foreground">
                    <time dateTime={result.date}>{result.date}</time>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    {result.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {result.tags.map((tag) => (
                      <ViewTransitionsLink
                        key={tag}
                        href={`/tags/${tag.toLowerCase()}`}
                        className="text-xs bg-secondary/50 text-secondary-foreground px-2 py-1 rounded hover:bg-secondary/80 transition-colors"
                      >
                        {tag}
                      </ViewTransitionsLink>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                検索結果が見つかりませんでした。
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                別のキーワードで試してみてください。
              </p>
            </div>
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  );
}
