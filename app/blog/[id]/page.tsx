import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ViewTransitionsLink } from "@/lib/viewTransitonLink";
import { Button } from "@/components/ui/button";
import { getPostById } from "@/lib/blog-data";

interface BlogPostParams {
  params: {
    id: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export function generateMetadata({ params }: BlogPostParams): Metadata {
  const post = getPostById(params.id);

  if (!post) {
    return {
      title: "記事が見つかりません",
    };
  }

  return {
    title: `${post.title} | ブログ`,
    description: post.description,
  };
}

export default function BlogPostPage({ params }: BlogPostParams) {
  const post = getPostById(params.id);

  if (!post) {
    notFound();
  }

  // マークダウンの簡易的な変換（実際のプロジェクトではマークダウンパーサーを使用してください）
  const contentHtml = post.content
    ? post.content
        .replace(
          /^# (.*$)/gm,
          '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>'
        )
        .replace(
          /^## (.*$)/gm,
          '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>'
        )
        .replace(
          /^### (.*$)/gm,
          '<h3 class="text-xl font-semibold mt-5 mb-2">$1</h3>'
        )
        .replace(
          /\`\`\`([a-z]*)\n([\s\S]*?)\`\`\`/gm,
          '<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4 overflow-auto"><code>$2</code></pre>'
        )
        .replace(
          /\`([^`]+)\`/g,
          '<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">$1</code>'
        )
        .replace(/\n\n/g, '<p class="my-4"></p>')
    : "<p>この記事にはコンテンツがありません。</p>";

  return (
    <main className="container mx-auto px-4 py-12">
      <article className="max-w-3xl mx-auto">
        <div className="mb-8">
          {/* ブログ画像部分 - viewTransitionで対応するためのイメージ要素 */}
          <div
            className="h-64 bg-gray-100 flex items-center justify-center mb-8 rounded-xl overflow-hidden shadow-lg transform-gpu"
            style={{ viewTransitionName: `blog-image-${params.id}` }}
          >
            {post.imageType === "green" && (
              <div className="w-48 h-36 relative">
                <div className="absolute inset-0 bg-green-200 rounded-t-3xl"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-24 bg-white rounded-full"></div>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-36 h-18 bg-pink-100 rounded-full"></div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-12 bg-pink-200 rounded-full"></div>
              </div>
            )}
            {post.imageType === "orange" && (
              <div className="w-48 h-48 relative">
                <div className="absolute inset-0 bg-orange-400 rounded-full"></div>
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-orange-300 rounded-full"></div>
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-36 h-4 bg-green-400 rounded-full"></div>
                <div className="absolute top-18 left-1/2 transform -translate-x-1/2 w-32 h-12 bg-amber-800 rounded-full"></div>
                <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-28 h-8 bg-yellow-300 rounded-full"></div>
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-36 h-10 bg-orange-300 rounded-full"></div>
              </div>
            )}
            {post.imageType === "black" && (
              <div className="w-48 h-48 relative">
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-36 h-24 bg-white rounded-t-full"></div>
                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-black rounded-full"></div>
                <div className="absolute bottom-18 right-12 w-6 h-6 bg-red-500 rounded-full"></div>
                <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-24 h-12 bg-gray-800 rounded-full"></div>
                <div className="absolute bottom-30 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-orange-400 rounded-full"></div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <ViewTransitionsLink
                key={tag}
                href={`/tags/${tag.toLowerCase()}`}
                className="bg-gray-100 text-gray-600 hover:bg-gray-200 text-xs px-2 py-1 rounded transition-colors"
              >
                {tag}
              </ViewTransitionsLink>
            ))}
          </div>
          <h1
            className="text-4xl font-bold mb-4"
            style={{ viewTransitionName: `blog-title-${params.id}` }}
          >
            {post.title}
          </h1>
          <time dateTime={post.date} className="text-gray-500">
            {post.date}
          </time>
        </div>

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Button asChild>
            <ViewTransitionsLink href="/blog">
              ← ブログ一覧に戻る
            </ViewTransitionsLink>
          </Button>
        </div>
      </article>
    </main>
  );
}
