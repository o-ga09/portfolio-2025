import { useEffect, useState } from "react";
import { fetchStats, type PageStat } from "@/lib/api";
import { YearFilter } from "@/components/YearFilter";

type SortKey = "views" | "uniques";

export function Pages() {
  const [year, setYear] = useState<string | undefined>(undefined);
  const [pages, setPages] = useState<PageStat[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("views");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchStats(year)
      .then((data) => {
        if (cancelled) return;
        setPages(data.pages);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "データの取得に失敗しました");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [year]);

  const sortedPages = [...pages].sort((a, b) => b[sortKey] - a[sortKey]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">ページ別</h2>
      <YearFilter year={year} onChange={setYear} />

      {error && (
        <div className="mb-6 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-x-auto">
        <table className="w-full text-left min-w-[480px]">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400">
              <th className="px-4 py-3">パス</th>
              <th
                className="px-4 py-3 text-right cursor-pointer select-none"
                onClick={() => setSortKey("views")}
              >
                Views {sortKey === "views" && "↓"}
              </th>
              <th
                className="px-4 py-3 text-right cursor-pointer select-none"
                onClick={() => setSortKey("uniques")}
              >
                Uniques {sortKey === "uniques" && "↓"}
              </th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
                  読み込み中...
                </td>
              </tr>
            )}
            {!loading && sortedPages.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
                  データがありません
                </td>
              </tr>
            )}
            {sortedPages.map((page) => (
              <tr
                key={page.path}
                className="border-b border-gray-100 dark:border-gray-800 last:border-0"
              >
                <td className="px-4 py-3 font-mono text-sm">{page.path}</td>
                <td className="px-4 py-3 text-right font-semibold">
                  {page.views.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right text-gray-500 dark:text-gray-400">
                  {page.uniques.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
