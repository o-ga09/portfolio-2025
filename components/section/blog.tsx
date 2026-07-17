"use client";

import React, { useEffect, useState } from "react";
import { ViewTransitionsLink } from "@/lib/viewTransitonLink";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import type { BlogPost } from "@/lib/blog-data";
import Link from "next/link";
import { truncateText } from "@/utils/formatting";
import { getEmojiForPost } from "@/utils/emoji";

interface BlogProps {
  initialPosts: BlogPost[];
}

// 記事詳細から「戻る」で再訪した際に折りたたみ状態にリセットされないよう、
// 展開状態はタブ単位でsessionStorageに保持する
const SHOW_ALL_POSTS_STORAGE_KEY = "blog:showAllPosts";

export default function Blog({ initialPosts }: BlogProps) {
  const [showAllPosts, setShowAllPosts] = useState(false);
  const [posts] = useState(initialPosts);

  useEffect(() => {
    if (sessionStorage.getItem(SHOW_ALL_POSTS_STORAGE_KEY) === "true") {
      setShowAllPosts(true);
    }
  }, []);

  const handleShowAllPosts = () => {
    setShowAllPosts(true);
    sessionStorage.setItem(SHOW_ALL_POSTS_STORAGE_KEY, "true");
  };

  const displayPosts = showAllPosts ? posts : posts.slice(0, 3);

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            最新記事
          </h2>
          <div className="w-16 h-1 bg-primary"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.map((post) => {
            const isSlide = post.type === "speakerdeck" || post.type === "googleslides";
            const isExternal = post.type !== "blog";
            const href = isSlide
              ? `/slides/${post.id}`
              : isExternal
                ? (post.url ?? "")
                : `/blog/${post.id}`;

            return (
              <ViewTransitionsLink
                href={href}
                key={post.id}
                className="transition-transform hover:scale-105 duration-300"
                target={isExternal && !isSlide ? "_blank" : undefined}
                rel={isExternal && !isSlide ? "noopener noreferrer" : undefined}
              >
                <article className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div
                    className="h-48 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center relative overflow-hidden transform-gpu"
                    style={{
                      viewTransitionName: `blog-image-${post.id}`,
                      contain: "layout paint",
                    }}
                  >
                    <span className="text-8xl" role="img" aria-label="thumbnail">
                      {getEmojiForPost(post.id)}
                    </span>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center mb-2 text-xs text-muted-foreground space-x-2">
                      <time dateTime={post.date}>{post.date}</time>
                      {post.type !== "blog" && (
                        <>
                          <span>•</span>
                          <span className="flex items-center">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                post.type === "qiita"
                                  ? "bg-green-100 text-green-800"
                                  : post.type === "zenn"
                                    ? "bg-blue-100 text-blue-800"
                                    : post.type === "speakerdeck"
                                      ? "bg-purple-100 text-purple-800"
                                      : "bg-sky-100 text-sky-800"
                              }`}
                            >
                              {post.type === "qiita"
                                ? "Qiita"
                                : post.type === "zenn"
                                  ? "Zenn"
                                  : post.type === "speakerdeck"
                                    ? "Speaker Deck"
                                    : "Google Slides"}
                            </span>
                            {post.likes && (
                              <span className="ml-2 flex items-center text-gray-500">
                                <svg
                                  className="w-4 h-4 mr-1"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                                </svg>
                                {post.likes}
                              </span>
                            )}
                          </span>
                        </>
                      )}
                    </div>
                    <h3
                      className="text-xl font-semibold text-gray-900 dark:text-white mb-2"
                      style={{ viewTransitionName: `blog-title-${post.id}` }}
                    >
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">
                      {truncateText(post.description, 50)}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-secondary/50 text-secondary-foreground text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </ViewTransitionsLink>
            );
          })}
        </div>

        <div className="mt-12 text-center space-y-4">
          {!showAllPosts && posts.length > 3 && (
            <Button
              variant="outline"
              size="lg"
              className="w-full max-w-xs mx-auto flex items-center justify-center gap-2"
              onClick={handleShowAllPosts}
            >
              <ChevronDown className="w-5 h-5" />
              もっと読む
            </Button>
          )}
          <Button asChild>
            <Link href="/blog/archive">記事一覧を見る</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
