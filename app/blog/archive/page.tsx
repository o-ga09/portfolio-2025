import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { groupPostsByYearMonth } from "@/lib/blog-data";
import { ViewTransitionsLink } from "@/lib/viewTransitonLink";
import Header from "@/components/section/header";
import Footer from "@/components/section/footer";

export const metadata: Metadata = {
  title: "ブログアーカイブ | ポートフォリオ",
  description: "過去のブログ記事のアーカイブ",
};

export default function BlogArchivePage() {
  const groupedPosts = groupPostsByYearMonth();
  // 年月の降順でソート
  const sortedMonths = Object.keys(groupedPosts).sort((a, b) => {
    // 「2025年5月」から年と月を抽出して比較
    const [yearA, monthA] = a.split("年");
    const [yearB, monthB] = b.split("年");

    // 年を比較
    if (yearB !== yearA) {
      return parseInt(yearB) - parseInt(yearA);
    }

    // 年が同じ場合は月を比較
    return parseInt(monthB) - parseInt(monthA);
  });

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-grow container max-w-4xl mx-auto px-4 py-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2 mt-4 border-b border-border pb-4 text-foreground">
            ブログアーカイブ
          </h1>
          <p className="text-muted-foreground mt-2">
            過去の記事をすべて表示しています
          </p>
        </div>

        <div className="mb-8">
          <Button asChild>
            <ViewTransitionsLink href="/blog" className="mr-2">
              ← ブログトップに戻る
            </ViewTransitionsLink>
          </Button>
        </div>

        {sortedMonths.map((yearMonth) => (
          <div key={yearMonth} className="mb-12">
            <h2 className="text-2xl font-bold mb-4 border-b border-border pb-2 text-foreground">
              {yearMonth}
            </h2>
            <ul className="space-y-6">
              {groupedPosts[yearMonth].map((post) => (
                <li
                  key={post.id}
                  className="border-l-4 border-primary pl-4 py-1"
                >
                  <time
                    dateTime={post.date}
                    className="text-sm text-muted-foreground mb-1 block"
                  >
                    {post.date}
                  </time>
                  <ViewTransitionsLink
                    href={`/blog/${post.id}`}
                    className="block"
                  >
                    <h3 className="text-xl font-semibold text-foreground hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                  </ViewTransitionsLink>
                  <p className="text-muted-foreground mt-1">
                    {post.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {post.tags.map((tag) => (
                      <ViewTransitionsLink
                        key={tag}
                        href={`/tags/${tag.toLowerCase()}`}
                        className="bg-secondary/50 text-secondary-foreground text-xs px-2 py-1 rounded hover:bg-secondary transition-colors"
                      >
                        {tag}
                      </ViewTransitionsLink>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Footer />
    </main>
  );
}
