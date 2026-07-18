const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "https://o-ga09.com";

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

export interface StatsResponse {
  pages: PageStat[];
  overview: OverviewStats;
  daily: DailyStat[];
}

export async function fetchStats(year?: string, days = 30): Promise<StatsResponse> {
  const params = new URLSearchParams({ days: String(days) });
  if (year) params.set("year", year);

  const res = await fetch(`${API_BASE}/api/stats?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch stats: ${res.status}`);
  }
  return res.json();
}
