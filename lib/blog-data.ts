import { ExternalArticle } from "./external-articles";
import { fetchExternalArticles } from "./rss-feed";

// キャッシュに関するインターフェースの定義
interface CacheData<T> {
  data: T;
  timestamp: number;
}

// キャッシュ保存用のオブジェクト
const cache: {
  posts?: CacheData<BlogPost[]>;
} = {};

// キャッシュの有効期限（ミリ秒）- 現在は1日に設定
const CACHE_TTL = 24 * 60 * 60 * 1000;

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  content?: string;
  imageType?: "green" | "orange" | "black";
  tags: string[];
  type?: "blog" | "qiita" | "zenn";
  url?: string;
  likes?: number;
}

// ブログ記事のデータ（実際の記事を追加してください）
export const blogPosts: BlogPost[] = [];

// タグ関連のユーティリティ関数

// すべてのタグを取得
export async function getAllTags(): Promise<string[]> {
  const tags = new Set<string>();
  const posts = await getAllPosts();

  posts.forEach((post: BlogPost) => {
    post.tags.forEach((tag: string) => {
      tags.add(tag.toLowerCase());
    });
  });

  return Array.from(tags);
}

// タグとその記事数を取得
export async function getTagCounts(): Promise<{
  tagCounts: Record<string, number>;
  sortedTags: string[];
}> {
  const tagCounts: Record<string, number> = {};
  const posts = await getAllPosts();

  posts.forEach((post: BlogPost) => {
    post.tags.forEach((tag: string) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  // タグを記事数の多い順にソート
  const sortedTags = Object.keys(tagCounts).sort((a: string, b: string) => {
    // 記事数で降順ソート
    if (tagCounts[b] !== tagCounts[a]) {
      return tagCounts[b] - tagCounts[a];
    }
    // 記事数が同じ場合はアルファベット順
    return a.localeCompare(b);
  });

  return { tagCounts, sortedTags };
}

// 特定のタグを持つ記事を取得
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const normalizedTag = tag.toLowerCase();
  const posts = await getAllPosts();

  return posts
    .filter((post: BlogPost) =>
      post.tags.some((t: string) => t.toLowerCase() === normalizedTag)
    )
    .sort(
      (a: BlogPost, b: BlogPost) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

// IDから記事を取得
export async function getPostById(id: string): Promise<BlogPost | undefined> {
  const { loadMarkdownPosts } = await import("./markdown-loader");
  const markdownPosts = loadMarkdownPosts();
  const allPosts = [...markdownPosts, ...blogPosts];
  return allPosts.find((post: BlogPost) => post.id === id);
}

// 年月ごとに記事をグループ化
export async function groupPostsByYearMonth(
  postsPromise: Promise<BlogPost[]> = getAllPosts()
): Promise<Record<string, BlogPost[]>> {
  const posts = await postsPromise;

  return posts.reduce((acc: Record<string, BlogPost[]>, post: BlogPost) => {
    const date = new Date(post.date);
    const yearMonth = `${date.getFullYear()}年${date.getMonth() + 1}月`;

    if (!acc[yearMonth]) {
      acc[yearMonth] = [];
    }

    acc[yearMonth].push(post);
    return acc;
  }, {});
}

// 外部記事をBlogPost形式に変換
export function convertExternalToBlogPost(article: ExternalArticle): BlogPost {
  return {
    id: article.id,
    title: article.title,
    description: article.description,
    date: article.date,
    tags: article.tags,
    type: article.source,
    url: article.url,
    likes: article.likes,
    imageType: article.source === "qiita" ? "green" : "orange",
  };
}

// 全ての記事（ブログ、Qiita、Zenn）を取得
export async function getAllPosts(): Promise<BlogPost[]> {
  // キャッシュの確認
  const now = Date.now();
  // if (cache.posts && now - cache.posts.timestamp < CACHE_TTL) {
  //   console.log("Using cached posts data");
  //   return cache.posts.data;
  // }

  try {
    console.log("Fetching fresh posts data");
    const externalArticles = await fetchExternalArticles();
    const externalPosts = externalArticles.map(convertExternalToBlogPost);

    const { loadMarkdownPosts } = await import("./markdown-loader");
    const markdownPosts = loadMarkdownPosts();
    console.log("⚠️ Loaded markdown posts:", markdownPosts[0]);
    const internalPosts = [...markdownPosts, ...blogPosts].map(
      (post: BlogPost) => ({
        ...post,
        type: "blog" as const,
      })
    );
    console.log(
      "⚠️ Loaded internal posts:",
      [...internalPosts, ...externalPosts].length
    );
    const sortedPosts = [...internalPosts, ...externalPosts].sort(
      (a: BlogPost, b: BlogPost) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    console.log("⚠️ Sorted posts:", sortedPosts.length);
    // キャッシュの更新
    cache.posts = {
      data: sortedPosts,
      timestamp: now,
    };

    return sortedPosts;
  } catch (error) {
    console.error("Error fetching all posts:", error);

    // キャッシュがある場合は期限切れでもキャッシュを返す
    if (cache.posts) {
      console.log("Using expired cache due to error");
      return cache.posts.data;
    }

    // キャッシュもない場合は内部記事のみを返す
    const { loadMarkdownPosts } = await import("./markdown-loader");
    const markdownPosts = loadMarkdownPosts();
    const internalPosts = [...markdownPosts, ...blogPosts].map(
      (post: BlogPost) => ({
        ...post,
        type: "blog" as const,
      })
    );

    // エラー時のデータもキャッシュしておく
    cache.posts = {
      data: internalPosts,
      timestamp: now - CACHE_TTL + 60000, // 1分後に再試行できるよう調整
    };

    return internalPosts;
  }
}

// キャッシュを手動でクリアする関数
export function clearPostsCache(): void {
  console.log("Clearing posts cache");
  delete cache.posts;
}
