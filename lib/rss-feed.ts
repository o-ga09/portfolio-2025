import * as xml2js from "xml2js";
import {
  ExternalArticle,
  QIITA_FEED_URL,
  ZENN_FEED_URL,
} from "./external-articles";

// キャッシュに関するインターフェースの定義
interface CacheData<T> {
  data: T;
  timestamp: number;
}

// キャッシュ保存用のオブジェクト
const feedCache: {
  externalArticles?: CacheData<ExternalArticle[]>;
} = {};

// キャッシュの有効期限（ミリ秒）- 現在は10分に設定
const FEED_CACHE_TTL = 10 * 60 * 1000;

interface RSSItem {
  title: string;
  link: string;
  pubDate: string;
  description?: string;
  category?: string[];
  likes?: number;
  comments?: number;
  "content:encoded"?: string;
  "dc:creator"?: string;
}

interface RSSFeed {
  items: RSSItem[];
}

/**
 * RSSフィードを取得して解析します
 */
async function fetchRSSFeed(
  url: string,
  type: "Qiita" | "Zenn"
): Promise<RSSFeed> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.statusText}`);
    }

    const xmlText = await response.text();
    const parser = new xml2js.Parser({
      explicitArray: false,
      mergeAttrs: true,
    });

    const result = await parser.parseStringPromise(xmlText);

    // QiitaとZennのフィード形式に対応
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let feed, items: any;
    switch (type) {
      case "Qiita":
        feed = result.feed;
        items = (Array.isArray(feed.entry) ? feed.entry : [feed.entry]) ?? [];
        break;
      case "Zenn":
        feed = result.rss?.channel;
        items = (Array.isArray(feed.item) ? feed.item : [feed.item]) ?? [];
        break;
      default:
        throw new Error(`Unsupported feed type: ${type}`);
    }

    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      items: items.map((item: any) => ({
        title: item.title?._ ?? item.title ?? "",
        link: item.link?.href ?? item.link ?? "",
        pubDate: item.pubDate ?? item.published ?? item.updated ?? "",
        description:
          item.description ?? item["content:encoded"] ?? item.content?._ ?? "",
        category: Array.isArray(item.category)
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            item.category.map((c: any) => c?.term ?? c)
          : item.category
          ? [item.category?.term ?? item.category]
          : [],
        likes: item.likes ?? undefined,
        "content:encoded": item["content:encoded"],
        "dc:creator": item["dc:creator"],
      })),
    };
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    throw error;
  }
}

/**
 * 外部記事を取得します
 */
export async function fetchExternalArticles(): Promise<ExternalArticle[]> {
  // キャッシュが有効な場合はキャッシュから取得
  const cachedData = feedCache.externalArticles;
  const now = Date.now();
  if (
    cachedData &&
    now - cachedData.timestamp < FEED_CACHE_TTL &&
    cachedData.data
  ) {
    return cachedData.data;
  }

  try {
    const [qiitaFeed, zennFeed] = await Promise.all([
      fetchRSSFeed(QIITA_FEED_URL, "Qiita"),
      fetchRSSFeed(ZENN_FEED_URL, "Zenn"),
    ]);
    const qiitaArticles = qiitaFeed.items.map(
      (item: RSSItem): ExternalArticle => ({
        id: `qiita-${item.link.split("/").pop() || ""}`,
        title: item.title,
        description:
          (item.description ?? item["content:encoded"] ?? "")
            .replace(/<[^>]*>/g, "")
            .slice(0, 200) + "...",
        date: new Date(item.pubDate).toISOString().split("T")[0],
        url: item.link,
        tags: item.category ?? [],
        source: "qiita",
        likes: item.likes,
      })
    );

    const zennArticles = zennFeed.items.map(
      (item: RSSItem): ExternalArticle => ({
        id: `zenn-${item.link.split("/").pop() || ""}`,
        title: item.title,
        description:
          (item.description ?? item["content:encoded"] ?? "")
            .replace(/<[^>]*>/g, "")
            .slice(0, 200) + "...",
        date: new Date(item.pubDate).toISOString().split("T")[0],
        url: item.link,
        tags: item.category ?? [],
        source: "zenn",
      })
    );

    const allArticles = [...qiitaArticles, ...zennArticles].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // 取得したデータをキャッシュに保存
    feedCache.externalArticles = {
      data: allArticles,
      timestamp: Date.now(),
    };

    return allArticles;
  } catch (error) {
    console.error("Error fetching external articles:", error);
    return []; // エラーが発生した場合は空の配列を返す
  }
}

// キャッシュを手動でクリアする関数
export function clearFeedCache(): void {
  console.log("Clearing RSS feed cache");
  delete feedCache.externalArticles;
}
