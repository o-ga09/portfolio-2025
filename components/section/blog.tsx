import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  imageType: "green" | "orange" | "black";
  tags: string[];
}

// ダミーのブログ記事データ
const blogPosts: BlogPost[] = [
  {
    id: "react-190-features",
    title: "React 190.0.0で追加された革新的機能",
    description:
      "最新のReactバージョンで導入された機能について詳しく解説します。",
    date: "2025-05-20",
    imageType: "green",
    tags: ["React", "フロントエンド", "JavaScript"],
  },
  {
    id: "nextjs-15-evolution",
    title: "Next.js 15の進化とパフォーマンス改善",
    description: "Next.js 15で導入された新機能とパフォーマンス最適化について。",
    date: "2025-05-10",
    imageType: "orange",
    tags: ["Next.js", "パフォーマンス", "SSR"],
  },
  {
    id: "tailwind-4-features",
    title: "Tailwind CSS 4.0の新機能を実践で活用する",
    description: "最新バージョンのTailwind CSSで開発効率を向上させる方法。",
    date: "2025-04-28",
    imageType: "black",
    tags: ["Tailwind CSS", "CSS", "UI/UX"],
  },
];

export default function Blog() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            最新記事
          </h2>
          <div className="w-16 h-1 bg-primary"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link href={`/blog/${post.id}`} key={post.id}>
              <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  {post.imageType === "green" && (
                    <div className="w-32 h-24 relative">
                      <div className="absolute inset-0 bg-green-200 rounded-t-3xl"></div>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-28 h-16 bg-white rounded-full"></div>
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-12 bg-pink-100 rounded-full"></div>
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-8 bg-pink-200 rounded-full"></div>
                    </div>
                  )}
                  {post.imageType === "orange" && (
                    <div className="w-32 h-32 relative">
                      <div className="absolute inset-0 bg-orange-400 rounded-full"></div>
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-28 h-4 bg-orange-300 rounded-full"></div>
                      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-24 h-3 bg-green-400 rounded-full"></div>
                      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-20 h-8 bg-amber-800 rounded-full"></div>
                      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-18 h-6 bg-yellow-300 rounded-full"></div>
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-28 h-8 bg-orange-300 rounded-full"></div>
                    </div>
                  )}
                  {post.imageType === "black" && (
                    <div className="w-32 h-32 relative">
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-16 bg-white rounded-t-full"></div>
                      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-black rounded-full"></div>
                      <div className="absolute bottom-12 right-8 w-4 h-4 bg-red-500 rounded-full"></div>
                      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-gray-800 rounded-full"></div>
                      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-orange-400 rounded-full"></div>
                    </div>
                  )}
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center mb-2 text-xs text-gray-500">
                    <time dateTime={post.date}>{post.date}</time>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 flex-grow">
                    {post.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild>
            <Link href="/blog/archive">過去の記事をすべて見る</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
