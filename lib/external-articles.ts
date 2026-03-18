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

interface SlideArticle {
  id: string;
  title: string;
  url: string;
  embedUrl: string;
  description: string;
  date: string;
  tags: string[];
  source: "speakerdeck" | "googleslides";
}

const QIITA_FEED_URL = "https://qiita.com/o-ga/feed";
const ZENN_FEED_URL = "https://zenn.dev/o_ga/feed";
const SPEAKERDECK_FEED_URL = "https://speakerdeck.com/tabe.atom";

export type { ExternalArticle, SlideArticle };
export { QIITA_FEED_URL, ZENN_FEED_URL, SPEAKERDECK_FEED_URL };
