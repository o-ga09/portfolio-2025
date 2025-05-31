interface ExternalArticle {
  id: string;
  title: string;
  url: string;
  description: string;
  date: string;
  tags: string[];
  source: "qiita" | "zenn";
  likes?: number;
}

const QIITA_FEED_URL = "https://qiita.com/o-ga/feed";
const ZENN_FEED_URL = "https://zenn.dev/o_ga/feed";

export type { ExternalArticle };
export { QIITA_FEED_URL, ZENN_FEED_URL };
