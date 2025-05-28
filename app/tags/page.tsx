import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getTagCounts } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "タグ一覧 | ポートフォリオ",
  description: "ブログ記事のタグ一覧",
};

export default function TagsPage() {
  const { tagCounts, sortedTags } = getTagCounts();

  // 人気タグを抽出（上位5つ）
  const popularTags = sortedTags.slice(0, 5);

  // タグサイズの計算（記事数に応じたフォントサイズの設定）
  const getTagSize = (count: number) => {
    const max = Math.max(...Object.values(tagCounts));
    const min = Math.min(...Object.values(tagCounts));
    const range = max - min || 1;
    const ratio = (count - min) / range;

    // 0.8から1.8までの範囲でフォントサイズを計算
    const size = 0.8 + ratio * 1.0;
    return size.toFixed(1);
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3">タグ一覧</h1>
          <p className="text-gray-600">記事のタグから探す</p>
        </div>

        <div className="mb-8">
          <Button asChild variant="outline" className="mr-2">
            <Link href="/blog">ブログトップへ</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/blog/archive">記事アーカイブへ</Link>
          </Button>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 pb-2">
            人気のタグ
          </h2>
          <div className="flex flex-wrap gap-4">
            {popularTags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag.toLowerCase()}`}
                className="bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-full transition-colors flex items-center"
              >
                <span className="font-medium">{tag}</span>
                <span className="ml-2 bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full">
                  {tagCounts[tag]}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 pb-2">
            すべてのタグ
          </h2>
          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="flex flex-wrap gap-3">
              {sortedTags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag.toLowerCase()}`}
                  className="hover:text-primary transition-colors"
                  style={{ fontSize: `${getTagSize(tagCounts[tag])}rem` }}
                >
                  <span className="mr-1">{tag}</span>
                  <span className="text-gray-400 text-sm">
                    ({tagCounts[tag]})
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
