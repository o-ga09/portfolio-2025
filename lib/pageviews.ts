import "server-only";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export interface PageStat {
  path: string;
  views: number;
  uniques: number;
}

export interface DailyStat {
  day: string;
  views: number;
  uniques: number;
}

export interface OverviewStats {
  totalViews: number;
  totalUniques: number;
  todayViews: number;
  todayUniques: number;
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function dayRangeClause(year?: string): { clause: string; param?: string } {
  if (year && /^\d{4}$/.test(year)) {
    return { clause: "WHERE day LIKE ?1", param: `${year}%` };
  }
  return { clause: "" };
}

export async function getPageStats(year?: string): Promise<PageStat[]> {
  const { env } = getCloudflareContext();
  const { clause, param } = dayRangeClause(year);

  const viewsQuery = env.DB.prepare(
    `SELECT path, SUM(count) AS total FROM pageviews ${clause} GROUP BY path`,
  );
  const uniquesQuery = env.DB.prepare(
    `SELECT path, COUNT(DISTINCT visitor) AS total FROM visits ${clause} GROUP BY path`,
  );

  const [viewsResult, uniquesResult] = await Promise.all([
    (param ? viewsQuery.bind(param) : viewsQuery).all<{ path: string; total: number }>(),
    (param ? uniquesQuery.bind(param) : uniquesQuery).all<{ path: string; total: number }>(),
  ]);

  const uniquesByPath = new Map(uniquesResult.results.map((r) => [r.path, r.total]));
  const stats = viewsResult.results.map((r) => ({
    path: r.path,
    views: r.total,
    uniques: uniquesByPath.get(r.path) ?? 0,
  }));

  return stats.sort((a, b) => b.views - a.views);
}

export async function getOverviewStats(year?: string): Promise<OverviewStats> {
  const { env } = getCloudflareContext();
  const { clause, param } = dayRangeClause(year);
  const day = today();

  const totalViewsQuery = env.DB.prepare(`SELECT SUM(count) AS total FROM pageviews ${clause}`);
  const totalUniquesQuery = env.DB.prepare(
    `SELECT COUNT(DISTINCT visitor) AS total FROM visits ${clause}`,
  );

  const [totalViews, totalUniques, todayViews, todayUniques] = await Promise.all([
    (param ? totalViewsQuery.bind(param) : totalViewsQuery).first<{ total: number | null }>(),
    (param ? totalUniquesQuery.bind(param) : totalUniquesQuery).first<{ total: number | null }>(),
    env.DB.prepare(`SELECT SUM(count) AS total FROM pageviews WHERE day = ?1`)
      .bind(day)
      .first<{ total: number | null }>(),
    env.DB.prepare(`SELECT COUNT(DISTINCT visitor) AS total FROM visits WHERE day = ?1`)
      .bind(day)
      .first<{ total: number | null }>(),
  ]);

  return {
    totalViews: totalViews?.total ?? 0,
    totalUniques: totalUniques?.total ?? 0,
    todayViews: todayViews?.total ?? 0,
    todayUniques: todayUniques?.total ?? 0,
  };
}

export async function getDailyStats(days: number): Promise<DailyStat[]> {
  const { env } = getCloudflareContext();
  const since = new Date();
  since.setDate(since.getDate() - (days - 1));
  const sinceDay = since.toISOString().slice(0, 10);

  const [viewsResult, uniquesResult] = await Promise.all([
    env.DB.prepare(`SELECT day, SUM(count) AS total FROM pageviews WHERE day >= ?1 GROUP BY day`)
      .bind(sinceDay)
      .all<{ day: string; total: number }>(),
    env.DB.prepare(
      `SELECT day, COUNT(DISTINCT visitor) AS total FROM visits WHERE day >= ?1 GROUP BY day`,
    )
      .bind(sinceDay)
      .all<{ day: string; total: number }>(),
  ]);

  const viewsByDay = new Map(viewsResult.results.map((r) => [r.day, r.total]));
  const uniquesByDay = new Map(uniquesResult.results.map((r) => [r.day, r.total]));

  const stats: DailyStat[] = [];
  for (let i = 0; i < days; i++) {
    const d = new Date(since);
    d.setDate(d.getDate() + i);
    const key = d.toISOString().slice(0, 10);
    stats.push({
      day: key,
      views: viewsByDay.get(key) ?? 0,
      uniques: uniquesByDay.get(key) ?? 0,
    });
  }

  return stats;
}
