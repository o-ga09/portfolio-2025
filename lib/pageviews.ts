import "server-only";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export interface PageviewCount {
  path: string;
  views: number;
}

export async function getPageviewCounts(year?: string): Promise<PageviewCount[]> {
  const { env } = getCloudflareContext();

  const query =
    year && /^\d{4}$/.test(year)
      ? env.DB.prepare(
          `SELECT path, SUM(count) AS views FROM pageviews WHERE day LIKE ?1 GROUP BY path ORDER BY views DESC`,
        ).bind(`${year}%`)
      : env.DB.prepare(
          `SELECT path, SUM(count) AS views FROM pageviews GROUP BY path ORDER BY views DESC`,
        );

  const { results } = await query.all<PageviewCount>();
  return results;
}
