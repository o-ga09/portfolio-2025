import { useEffect, useState } from "react";
import { fetchStats, type DailyStat, type OverviewStats } from "@/lib/api";
import { YearFilter } from "@/components/YearFilter";

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 text-center">
      <div className="text-3xl sm:text-4xl font-extrabold">{value.toLocaleString()}</div>
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">{label}</div>
    </div>
  );
}

function DailyChart({ daily }: { daily: DailyStat[] }) {
  const max = Math.max(1, ...daily.map((d) => d.views));

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
      <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-4">
        直近{daily.length}日間
      </h2>
      <div className="flex items-end gap-[2px] h-40">
        {daily.map((d) => (
          <div
            key={d.day}
            className="group relative flex-1 flex flex-col items-center justify-end h-full"
          >
            <div className="absolute -top-9 hidden group-hover:flex flex-col items-center text-xs bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 rounded px-2 py-1 whitespace-nowrap z-10">
              <span>{d.day}</span>
              <span>
                {d.views} views / {d.uniques} uniques
              </span>
            </div>
            <div
              className="w-full bg-blue-500/70 hover:bg-blue-500 rounded-t-sm transition-colors"
              style={{ height: `${(d.views / max) * 100}%`, minHeight: d.views > 0 ? "2px" : 0 }}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-2">
        <span>{daily[0]?.day}</span>
        <span>{daily[daily.length - 1]?.day}</span>
      </div>
    </div>
  );
}

export function Overview() {
  const [year, setYear] = useState<string | undefined>(undefined);
  const [overview, setOverview] = useState<OverviewStats | null>(null);
  const [daily, setDaily] = useState<DailyStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchStats(year)
      .then((data) => {
        if (cancelled) return;
        setOverview(data.overview);
        setDaily(data.daily);
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

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">概要</h2>
      <YearFilter year={year} onChange={setYear} />

      {error && (
        <div className="mb-6 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {loading && !overview ? (
        <div className="text-sm text-gray-500 dark:text-gray-400">読み込み中...</div>
      ) : (
        overview && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard label="合計View数" value={overview.totalViews} />
              <StatCard label="合計ユニーク訪問者" value={overview.totalUniques} />
              <StatCard label="本日のView数" value={overview.todayViews} />
              <StatCard label="本日のユニーク訪問者" value={overview.todayUniques} />
            </div>
            <DailyChart daily={daily} />
          </>
        )
      )}
    </div>
  );
}
