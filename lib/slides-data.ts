import { SlideArticle } from "./external-articles";
import { fetchSpeakerDeckSlides } from "./rss-feed";
import { BlogPost } from "./blog-data";
import fs from "fs";
import path from "path";

// キャッシュに関するインターフェースの定義
interface CacheData<T> {
  data: T;
  timestamp: number;
}

// キャッシュ保存用のオブジェクト
const cache: {
  slides?: CacheData<SlideArticle[]>;
} = {};

// キャッシュの有効期限（ミリ秒）- 現在は10分に設定
const CACHE_TTL = 10 * 60 * 1000;

/**
 * Google スライドをJSONファイルから読み込みます
 */
function loadGoogleSlides(): SlideArticle[] {
  try {
    const slidesPath = path.join(process.cwd(), "public", "slides.json");

    // ファイルが存在しない場合は空配列を返す
    if (!fs.existsSync(slidesPath)) {
      console.log("slides.json not found, returning empty array");
      return [];
    }

    const slidesData = fs.readFileSync(slidesPath, "utf-8");
    const slides = JSON.parse(slidesData) as SlideArticle[];

    return slides.map((slide) => ({
      ...slide,
      source: "googleslides" as const,
    }));
  } catch (error) {
    console.error("Error loading Google Slides:", error);
    return [];
  }
}

/**
 * 全てのスライド（Speaker Deck + Google スライド）を取得します
 */
export async function getAllSlides(): Promise<SlideArticle[]> {
  // キャッシュの確認
  const now = Date.now();
  if (cache.slides && now - cache.slides.timestamp < CACHE_TTL) {
    console.log("Using cached slides data");
    return cache.slides.data;
  }

  try {
    // Speaker DeckとGoogle スライドを並列で取得
    const [speakerDeckSlides, googleSlides] = await Promise.all([
      fetchSpeakerDeckSlides(),
      Promise.resolve(loadGoogleSlides()),
    ]);

    // 日付順にソート（新しい順）
    const allSlides = [...speakerDeckSlides, ...googleSlides].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    // キャッシュに保存
    cache.slides = {
      data: allSlides,
      timestamp: Date.now(),
    };

    return allSlides;
  } catch (error) {
    console.error("Error fetching slides:", error);
    return [];
  }
}

/**
 * IDからスライドを取得します
 */
export async function getSlideById(
  id: string,
): Promise<SlideArticle | undefined> {
  const slides = await getAllSlides();
  return slides.find((slide) => slide.id === id);
}

/**
 * スライドをBlogPost形式に変換します
 */
export function convertSlideToBlogPost(slide: SlideArticle): BlogPost {
  return {
    id: slide.id,
    title: slide.title,
    description: slide.description,
    date: slide.date,
    tags: slide.tags,
    type: slide.source === "speakerdeck" ? "speakerdeck" : "googleslides",
    url: slide.url,
    embedUrl: slide.embedUrl,
    imageType: slide.source === "speakerdeck" ? "purple" : "blue",
  };
}

/**
 * キャッシュをクリアします
 */
export function clearSlidesCache(): void {
  console.log("Clearing slides cache");
  delete cache.slides;
}
