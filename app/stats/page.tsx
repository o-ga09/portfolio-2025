import Link from "next/link";
import Header from "@/components/section/header";
import Footer from "@/components/section/footer";
import { getPageviewCounts } from "@/lib/pageviews";
import { getAllPosts } from "@/lib/blog-data";

export const dynamic = "force-dynamic";

function yearHref(year?: string) {
  return year ? `/stats?year=${year}` : "/stats";
}

export default async function StatsPage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string }>;
}) {
  const { year } = await searchParams;
  const [pages, posts] = await Promise.all([getPageviewCounts(year), getAllPosts()]);
  const titleByPath = new Map(posts.map((post) => [`/blog/${post.id}`, post.title]));

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => String(currentYear - i));
  const totalViews = pages.reduce((sum, p) => sum + p.views, 0);

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-grow container max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3 mt-4 border-b border-border pb-4 text-black dark:text-white">
            View統計
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            ページ・記事ごとの累計View数（自前トラッキング、保持期間無制限）
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          <Link
            href={yearHref()}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              !year
                ? "bg-primary text-gray-900 dark:text-white"
                : "bg-card text-gray-600 dark:text-gray-300 hover:bg-primary/20"
            }`}
          >
            全期間
          </Link>
          {years.map((y) => (
            <Link
              key={y}
              href={yearHref(y)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                year === y
                  ? "bg-primary text-gray-900 dark:text-white"
                  : "bg-card text-gray-600 dark:text-gray-300 hover:bg-primary/20"
              }`}
            >
              {y}
            </Link>
          ))}
        </div>

        <div className="mb-6 text-gray-600 dark:text-gray-300">
          合計View数:{" "}
          <span className="font-bold text-black dark:text-white">
            {totalViews.toLocaleString()}
          </span>
        </div>

        <div className="bg-card rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border text-sm text-gray-600 dark:text-gray-300">
                <th className="px-4 py-3">パス</th>
                <th className="px-4 py-3">タイトル</th>
                <th className="px-4 py-3 text-right">Views</th>
              </tr>
            </thead>
            <tbody>
              {pages.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-6 text-center text-gray-500 dark:text-gray-400"
                  >
                    データがありません
                  </td>
                </tr>
              )}
              {pages.map((page) => (
                <tr key={page.path} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-mono text-sm text-gray-800 dark:text-gray-100">
                    {page.path}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    {titleByPath.get(page.path) ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-black dark:text-white">
                    {page.views.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </main>
  );
}
