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

// ブログ記事のモックデータ
export const blogPosts: BlogPost[] = [
  {
    id: "react-190-features",
    title: "React 190.0.0で追加された革新的機能",
    type: "blog",
    description:
      "最新のReactバージョンで導入された機能について詳しく解説します。",
    date: "2025-05-20",
    content: `
# React 190.0.0で追加された革新的機能

React 190.0.0がついにリリースされました。このメジャーバージョンでは、多くの革新的な機能が追加されています。

## 1. 自動最適化レンダリング

新しい最適化エンジンによって、コンポーネントの再レンダリングが自動的に最適化されるようになりました。このエンジンは機械学習を活用して、ユーザーの行動パターンを予測し、必要なコンポーネントだけを先読みレンダリングします。

\`\`\`jsx
// 自動最適化の例
function OptimizedComponent() {
  // React 190は自動的にこのコンポーネントの再レンダリングを最適化します
  return <div>高速に動作するコンポーネント</div>;
}
\`\`\`

## 2. リアクティブデータストリーム

新しいデータストリーム APIを使用すると、データフローをより宣言的に管理できます。

\`\`\`jsx
// リアクティブデータストリームの例
import { createStream } from 'react/streams';

function StreamComponent() {
  const dataStream = createStream(async function* () {
    while (true) {
      const data = await fetchNewData();
      yield data;
      await sleep(1000);
    }
  });

  return (
    <DataStreamConsumer stream={dataStream}>
      {(data) => <div>{data.value}</div>}
    </DataStreamConsumer>
  );
}
\`\`\`

## 3. AIアシスタント統合

React 190.0.0には、コンポーネントの作成を支援するAIアシスタントが組み込まれています。このアシスタントはコードの問題を検出し、最適化の提案を行います。

## まとめ

React 190.0.0は、パフォーマンス、開発者体験、AIとの統合など、多くの面で大きな進歩を遂げています。これらの新機能を活用することで、より効率的で高品質なアプリケーションを構築することができるでしょう。
    `,
    imageType: "green",
    tags: ["React", "フロントエンド", "JavaScript"],
  },
  {
    id: "nextjs-15-evolution",
    title: "Next.js 15の進化とパフォーマンス改善",
    type: "blog",
    description: "Next.js 15で導入された新機能とパフォーマンス最適化について。",
    date: "2025-05-10",
    content: `
# Next.js 15の進化とパフォーマンス改善

Next.js 15では、多くのパフォーマンス改善と新機能が導入されました。このバージョンアップでウェブアプリケーション開発はさらに効率的になります。

## 主な改善点

1. ビルド時間の大幅な短縮
2. サーバーコンポーネントのさらなる最適化
3. エッジコンピューティングの強化
4. AIアシスタントの統合

## コード例

\`\`\`tsx
// Next.js 15の新しいAPIの例
import { useOptimizedImage } from 'next/optimized-image';

function ProductImage({ src, alt }) {
  const optimizedProps = useOptimizedImage({
    src,
    width: 800,
    height: 600,
    priority: true,
    smartCrop: true, // 新機能: AIベースのスマートクロッピング
  });

  return <img {...optimizedProps} alt={alt} />;
}
\`\`\`

## パフォーマンス向上

Next.js 15では、初期ロード時間が平均40%削減され、大規模アプリケーションでも高速な応答性が実現されました。これにより、ユーザーエクスペリエンスが大幅に向上します。

詳細な測定結果や最適化テクニックについては、次回の記事で詳しく解説します。
    `,
    imageType: "orange",
    tags: ["Next.js", "パフォーマンス", "SSR"],
  },
  {
    id: "tailwind-4-features",
    title: "Tailwind CSS 4.0の新機能を実践で活用する",
    type: "blog",
    description: "最新バージョンのTailwind CSSで開発効率を向上させる方法。",
    date: "2025-04-28",
    content: `
# Tailwind CSS 4.0の新機能を実践で活用する

Tailwind CSS 4.0がリリースされ、多くの新機能や改善点が追加されました。このバージョンでは、特にアニメーション、レスポンシブデザイン、ダークモードの対応が強化されています。

## 1. アドバンスドアニメーション

Tailwind CSS 4.0では、より洗練されたアニメーション機能が追加されました。

\`\`\`html
<!-- 新しいアニメーション機能の例 -->
<button class="animate-bounce-in hover:animate-pulse-fast focus:animate-wiggle">
  アニメーションボタン
</button>
\`\`\`

## 2. 強化されたレスポンシブAPI

より細かいブレークポイント制御と、コンテナクエリのサポートが追加されました。

\`\`\`html
<div class="container-xl:grid container-xl:grid-cols-3 container-sm:grid-cols-1">
  <!-- コンテナサイズに応じてレイアウトが変化 -->
</div>
\`\`\`

## 3. AIによるスタイル最適化

Tailwind CSS 4.0にはAIアシスタントが統合され、最適なクラスの組み合わせを提案してくれます。

## 4. パフォーマンスの向上

新しいコンパイルエンジンにより、CSSのサイズが大幅に削減され、ロード時間が短縮されました。

## 実装例

以下に、Tailwind CSS 4.0の新機能を活用したカードコンポーネントの例を示します。

\`\`\`jsx
function FeatureCard({ title, description, icon }) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-depth hover:shadow-depth-lg transition-all duration-300 animate-fade-in">
      <div className="text-primary-600 dark:text-primary-400 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-balance">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-pretty">{description}</p>
    </div>
  );
}
\`\`\`

このように、Tailwind CSS 4.0の新機能を活用することで、より効率的かつ洗練されたUIを構築することができます。
    `,
    imageType: "black",
    tags: ["Tailwind CSS", "CSS", "UI/UX"],
  },
  {
    id: "typescript-5-advanced",
    title: "TypeScript 5.0の高度な型機能を使いこなす",
    description:
      "TypeScript 5.0で追加された型機能を詳しく解説し、実践的な使用例を紹介します。",
    date: "2025-04-15",
    imageType: "green",
    tags: ["TypeScript", "JavaScript", "プログラミング"],
  },
  {
    id: "node-20-features",
    title: "Node.js 20の新機能と改善点",
    description: "Node.js 20で追加された新機能と性能改善について解説します。",
    date: "2025-04-05",
    imageType: "orange",
    tags: ["Node.js", "JavaScript", "バックエンド"],
  },
  {
    id: "web-performance-2025",
    title: "2025年のWebパフォーマンス最適化テクニック",
    description:
      "最新のブラウザAPIとツールを活用した、最新のWebパフォーマンス最適化手法を紹介します。",
    date: "2025-03-22",
    imageType: "black",
    tags: ["パフォーマンス", "Web開発", "最適化"],
  },
  {
    id: "ai-frontend-tools",
    title: "AIを活用したフロントエンド開発ツール",
    description:
      "AIがフロントエンド開発をどのように変革しているか、最新のツールと共に解説します。",
    date: "2025-03-10",
    imageType: "green",
    tags: ["AI", "フロントエンド", "開発ツール"],
  },
  {
    id: "css-layout-techniques",
    title: "モダンCSSレイアウト手法の比較と実践",
    description:
      "Flexbox、Grid、コンテナクエリなど、最新のCSSレイアウト手法を比較し、実践的な使用例を紹介します。",
    date: "2025-02-28",
    imageType: "orange",
    tags: ["CSS", "レイアウト", "フロントエンド"],
  },
];

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
export function getPostById(id: string): BlogPost | undefined {
  return blogPosts.find((post: BlogPost) => post.id === id);
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
  if (cache.posts && now - cache.posts.timestamp < CACHE_TTL) {
    console.log("Using cached posts data");
    return cache.posts.data;
  }

  try {
    console.log("Fetching fresh posts data");
    const externalArticles = await fetchExternalArticles();
    const externalPosts = externalArticles.map(convertExternalToBlogPost);

    const internalPosts = blogPosts.map((post: BlogPost) => ({
      ...post,
      type: "blog" as const,
    }));

    const sortedPosts = [...internalPosts, ...externalPosts].sort(
      (a: BlogPost, b: BlogPost) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

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
    const internalPosts = blogPosts.map((post: BlogPost) => ({
      ...post,
      type: "blog" as const,
    }));

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
