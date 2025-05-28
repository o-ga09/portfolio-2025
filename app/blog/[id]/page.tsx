import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface BlogPostParams {
  params: {
    id: string;
  };
}

// ダミーのブログ記事データ
const blogPosts = [
  {
    id: "react-190-features",
    title: "React 190.0.0で追加された革新的機能",
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
];

export function generateMetadata({ params }: BlogPostParams): Metadata {
  const post = blogPosts.find((post) => post.id === params.id);

  if (!post) {
    return {
      title: "記事が見つかりません",
    };
  }

  return {
    title: `${post.title} | ブログ`,
    description: post.description,
  };
}

export default function BlogPostPage({ params }: BlogPostParams) {
  const post = blogPosts.find((post) => post.id === params.id);

  if (!post) {
    notFound();
  }

  // マークダウンの簡易的な変換（実際のプロジェクトではマークダウンパーサーを使用してください）
  const contentHtml = post.content
    .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>')
    .replace(
      /^### (.*$)/gm,
      '<h3 class="text-xl font-semibold mt-5 mb-2">$1</h3>'
    )
    .replace(
      /\`\`\`([a-z]*)\n([\s\S]*?)\`\`\`/gm,
      '<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4 overflow-auto"><code>$2</code></pre>'
    )
    .replace(
      /\`([^`]+)\`/g,
      '<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">$1</code>'
    )
    .replace(/\n\n/g, '<p class="my-4"></p>');

  return (
    <main className="container mx-auto px-4 py-12">
      <article className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <time dateTime={post.date} className="text-gray-500">
            {post.date}
          </time>
        </div>

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Button asChild>
            <Link href="/blog">← ブログ一覧に戻る</Link>
          </Button>
        </div>
      </article>
    </main>
  );
}
