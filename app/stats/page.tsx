import Link from "next/link";
import Header from "@/components/section/header";
import Footer from "@/components/section/footer";
import { getPageStats, getOverviewStats, getDailyStats } from "@/lib/pageviews";
import { getAllPosts } from "@/lib/blog-data";

export const dynamic = "force-dynamic";

function yearHref(year?: string) {
  return year ? `/stats?year=${year}` : "/stats";
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-card rounded-xl p-6 text-center">
      <div className="text-3xl sm:text-4xl font-extrabold text-black dark:text-white">
        {value.toLocaleString()}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">{label}</div>
    </div>
  );
}

function DailyChart({ daily }: { daily: { day: string; views: number; uniques: number }[] }) {
  const max = Math.max(1, ...daily.map((d) => d.views));

  return (
    <div className="bg-card rounded-xl p-6">
      <h2 className="text-lg font-bold mb-4 text-black dark:text-white">直近{daily.length}日間</h2>
      <div className="flex items-end gap-[2px] h-40">
        {daily.map((d) => (
          <div
            key={d.day}
            className="group relative flex-1 flex flex-col items-center justify-end h-full"
          >
            <div className="absolute -top-8 hidden group-hover:flex flex-col items-center text-xs bg-black text-white dark:bg-white dark:text-black rounded px-2 py-1 whitespace-nowrap z-10">
              <span>{d.day}</span>
              <span>
                {d.views} views / {d.uniques} uniques
              </span>
            </div>
            <div
              className="w-full bg-primary/70 hover:bg-primary rounded-t-sm transition-colors"
              style={{ height: `${(d.views / max) * 100}%`, minHeight: d.views > 0 ? "2px" : 0 }}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
        <span>{daily[0]?.day}</span>
        <span>{daily[daily.length - 1]?.day}</span>
      </div>
    </div>
  );
}

export default async function StatsPage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string }>;
}) {
  const { year } = await searchParams;
  const [pages, overview, daily, posts] = await Promise.all([
    getPageStats(year),
    getOverviewStats(year),
    getDailyStats(30),
    getAllPosts(),
  ]);
  const titleByPath = new Map(posts.map((post) => [`/blog/${post.id}`, post.title]));

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => String(currentYear - i));

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-grow container max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3 mt-4 border-b border-border pb-4 text-black dark:text-white">
            View統計
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            ページ・記事ごとのView数とユニーク訪問者数（自前トラッキング、保持期間無制限）
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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="合計View数" value={overview.totalViews} />
          <StatCard label="合計ユニーク訪問者" value={overview.totalUniques} />
          <StatCard label="本日のView数" value={overview.todayViews} />
          <StatCard label="本日のユニーク訪問者" value={overview.todayUniques} />
        </div>

        <div className="mb-8">
          <DailyChart daily={daily} />
        </div>

        <div className="bg-card rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border text-sm text-gray-600 dark:text-gray-300">
                <th className="px-4 py-3">パス</th>
                <th className="px-4 py-3">タイトル</th>
                <th className="px-4 py-3 text-right">Views</th>
                <th className="px-4 py-3 text-right">Uniques</th>
              </tr>
            </thead>
            <tbody>
              {pages.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
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
                  <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-300">
                    {page.uniques.toLocaleString()}
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
