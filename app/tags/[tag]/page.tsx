import { Metadata } from "next";
import { ViewTransitionsLink } from "@/lib/viewTransitonLink";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag } from "@/lib/blog-data";
import Header from "@/components/section/header";
import Footer from "@/components/section/footer";

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const normalizedTag =
    decodedTag.charAt(0).toUpperCase() + decodedTag.slice(1);

  return {
    title: `${normalizedTag} に関する記事 | ポートフォリオ`,
    description: `${normalizedTag} のタグが付いた記事の一覧`,
  };
}

// 動的なルートの生成
export async function generateStaticParams() {
  const tags = await getAllTags();

  return tags.map((tag) => ({
    tag: tag.toLowerCase(),
  }));
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const allTags = await getAllTags();

  // タグが存在しない場合は404ページへ
  if (!allTags.includes(decodedTag.toLowerCase())) {
    notFound();
  }

  const posts = await getPostsByTag(decodedTag);
  const normalizedTag =
    decodedTag.charAt(0).toUpperCase() + decodedTag.slice(1);

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-grow container max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <span className="text-sm text-muted-foreground mr-2">タグ:</span>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              {normalizedTag}
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-3 mt-4 border-b border-border pb-4 text-gray-900 dark:text-white">
            「{normalizedTag}」に関する記事
          </h1>
          <p className="text-muted-foreground mb-6">
            {posts.length}件の記事が見つかりました
          </p>

          <div className="mb-8 flex gap-2">
            <Button asChild variant="outline" size="sm">
              <ViewTransitionsLink href="/tags">
                ← タグ一覧に戻る
              </ViewTransitionsLink>
            </Button>
            <Button asChild variant="outline" size="sm">
              <ViewTransitionsLink href="/blog">
                ブログトップへ
              </ViewTransitionsLink>
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="border-b border-gray-100 pb-8 last:border-0"
            >
              <ViewTransitionsLink href={`/blog/${post.id}`} className="block">
                <h2 className="text-2xl font-semibold hover:text-primary transition-colors mb-2 text-gray-900 dark:text-white">
                  {post.title}
                </h2>
              </ViewTransitionsLink>
              <time
                dateTime={post.date}
                className="text-sm text-muted-foreground mb-3 block"
              >
                {post.date}
              </time>
              <p className="text-muted-foreground mb-4">{post.description}</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <ViewTransitionsLink
                    key={t}
                    href={`/tags/${t.toLowerCase()}`}
                    className={`text-xs px-2 py-1 rounded ${
                      t.toLowerCase() === tag.toLowerCase()
                        ? "bg-primary/20 text-primary font-medium"
                        : "bg-secondary/50 text-secondary-foreground hover:bg-secondary"
                    }`}
                  >
                    {t}
                  </ViewTransitionsLink>
                ))}
              </div>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">
              このタグの記事はまだありません。
            </p>
            <Button asChild>
              <ViewTransitionsLink href="/blog">
                ブログトップへ戻る
              </ViewTransitionsLink>
            </Button>
          </div>
        )}

        <div className="mt-12 pt-6 border-t border-gray-200 mb-8">
          <h2 className="text-xl font-semibold mb-4">他のタグを探す</h2>
          <div className="flex flex-wrap gap-2">
            {(await getAllTags())
              .filter((t) => t.toLowerCase() !== tag.toLowerCase())
              .slice(0, 10)
              .map((t) => {
                const displayTag = t.charAt(0).toUpperCase() + t.slice(1);
                return (
                  <ViewTransitionsLink
                    key={t}
                    href={`/tags/${t}`}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm transition-colors"
                  >
                    {displayTag}
                  </ViewTransitionsLink>
                );
              })}
            {(await getAllTags()).length > 11 && (
              <ViewTransitionsLink
                href="/tags"
                className="text-primary hover:underline text-sm ml-2 flex items-center"
              >
                すべてのタグを見る...
              </ViewTransitionsLink>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
