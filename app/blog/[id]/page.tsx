import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getPostById } from "@/lib/blog-data";

interface BlogPostParams {
  params: {
    id: string;
  };
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
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag.toLowerCase()}`}
                className="bg-gray-100 text-gray-600 hover:bg-gray-200 text-xs px-2 py-1 rounded transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
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
            <Link href="/blog">← ブログ一覧に戻る</Link>
          </Button>
        </div>
      </article>
    </main>
  );
}
