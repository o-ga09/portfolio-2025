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

export default async function BlogArchivePage() {
  const groupedPosts = await groupPostsByYearMonth();
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
          <h1 className="text-4xl font-bold mb-2 mt-4 border-b border-border pb-4 text-gray-900 dark:text-white">
            ブログアーカイブ
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
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
            <h2 className="text-2xl font-bold mb-4 border-b border-border pb-2 text-gray-900 dark:text-white">
              {yearMonth}
            </h2>
            <ul className="space-y-6">
              {groupedPosts[yearMonth].map((post) => (
                <li
                  key={post.id}
                  className="border-l-4 border-primary pl-4 py-1"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <time
                      dateTime={post.date}
                      className="text-sm text-muted-foreground block"
                    >
                      {post.date}
                    </time>
                    {post.type !== "blog" && (
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          post.type === "qiita"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {post.type === "qiita" ? "Qiita" : "Zenn"}
                        {post.likes && (
                          <span className="ml-1 flex items-center">
                            <svg
                              className="w-3 h-3 mr-0.5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                            </svg>
                            {post.likes}
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                  <ViewTransitionsLink
                    href={
                      post.type !== "blog" ? post.url ?? "" : `/blog/${post.id}`
                    }
                    className="block"
                    target={post.type !== "blog" ? "_blank" : undefined}
                    rel={
                      post.type !== "blog" ? "noopener noreferrer" : undefined
                    }
                  >
                    <h3 className="text-xl font-semibold text-gray-900 hover:text-primary dark:text-white dark:hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                  </ViewTransitionsLink>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
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
