import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "ブログアーカイブ | ポートフォリオ",
  description: "過去のブログ記事のアーカイブ",
};

// ダミーのブログ記事データ
const allBlogPosts = [
  {
    id: "react-190-features",
    title: "React 190.0.0で追加された革新的機能",
    description:
      "最新のReactバージョンで導入された機能について詳しく解説します。",
    date: "2025-05-20",
    tags: ["React", "フロントエンド", "JavaScript"],
  },
  {
    id: "nextjs-15-evolution",
    title: "Next.js 15の進化とパフォーマンス改善",
    description: "Next.js 15で導入された新機能とパフォーマンス最適化について。",
    date: "2025-05-10",
    tags: ["Next.js", "パフォーマンス", "SSR"],
  },
  {
    id: "tailwind-4-features",
    title: "Tailwind CSS 4.0の新機能を実践で活用する",
    description: "最新バージョンのTailwind CSSで開発効率を向上させる方法。",
    date: "2025-04-28",
    tags: ["Tailwind CSS", "CSS", "UI/UX"],
  },
  {
    id: "typescript-5-advanced",
    title: "TypeScript 5.0の高度な型機能を使いこなす",
    description:
      "TypeScript 5.0で追加された型機能を詳しく解説し、実践的な使用例を紹介します。",
    date: "2025-04-15",
    tags: ["TypeScript", "JavaScript", "プログラミング"],
  },
  {
    id: "node-20-features",
    title: "Node.js 20の新機能と改善点",
    description: "Node.js 20で追加された新機能と性能改善について解説します。",
    date: "2025-04-05",
    tags: ["Node.js", "JavaScript", "バックエンド"],
  },
  {
    id: "web-performance-2025",
    title: "2025年のWebパフォーマンス最適化テクニック",
    description:
      "最新のブラウザAPIとツールを活用した、最新のWebパフォーマンス最適化手法を紹介します。",
    date: "2025-03-22",
    tags: ["パフォーマンス", "Web開発", "最適化"],
  },
  {
    id: "ai-frontend-tools",
    title: "AIを活用したフロントエンド開発ツール",
    description:
      "AIがフロントエンド開発をどのように変革しているか、最新のツールと共に解説します。",
    date: "2025-03-10",
    tags: ["AI", "フロントエンド", "開発ツール"],
  },
  {
    id: "css-layout-techniques",
    title: "モダンCSSレイアウト手法の比較と実践",
    description:
      "Flexbox、Grid、コンテナクエリなど、最新のCSSレイアウト手法を比較し、実践的な使用例を紹介します。",
    date: "2025-02-28",
    tags: ["CSS", "レイアウト", "フロントエンド"],
  },
];

// 年月ごとにグループ化する関数
function groupPostsByYearMonth(posts: typeof allBlogPosts) {
  return posts.reduce((acc, post) => {
    const date = new Date(post.date);
    const yearMonth = `${date.getFullYear()}年${date.getMonth() + 1}月`;

    if (!acc[yearMonth]) {
      acc[yearMonth] = [];
    }

    acc[yearMonth].push(post);
    return acc;
  }, {} as Record<string, typeof allBlogPosts>);
}

export default function BlogArchivePage() {
  const groupedPosts = groupPostsByYearMonth(allBlogPosts);
  // 年月の降順でソート
  const sortedMonths = Object.keys(groupedPosts).sort((a, b) => {
    // 「2025年5月」から年と月を抽出して比較
    const [yearA, monthA] = a.split("年");
    const [yearB, monthB] = b.split("年");

    // 年を比較
    if (yearB !== yearA) {
      return parseInt(yearB) - parseInt(yearA);
    }

    // 年が同じ場合は月を比較
    return parseInt(monthB) - parseInt(monthA);
  });

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">ブログアーカイブ</h1>
          <p className="text-gray-600">過去の記事をすべて表示しています</p>
        </div>

        <div className="mb-8">
          <Button asChild>
            <Link href="/blog" className="mr-2">
              ← ブログトップに戻る
            </Link>
          </Button>
        </div>

        {sortedMonths.map((yearMonth) => (
          <div key={yearMonth} className="mb-12">
            <h2 className="text-2xl font-bold mb-4 border-b border-gray-200 pb-2">
              {yearMonth}
            </h2>
            <ul className="space-y-6">
              {groupedPosts[yearMonth].map((post) => (
                <li
                  key={post.id}
                  className="border-l-4 border-primary pl-4 py-1"
                >
                  <time
                    dateTime={post.date}
                    className="text-sm text-gray-500 mb-1 block"
                  >
                    {post.date}
                  </time>
                  <Link href={`/blog/${post.id}`} className="block">
                    <h3 className="text-xl font-semibold hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 mt-1">{post.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
