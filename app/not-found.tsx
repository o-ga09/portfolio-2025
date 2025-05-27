import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-light via-secondary to-secondary-dark flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* キャラクター画像 */}
        <div className="relative">
          <div className="relative mx-auto mb-6">
            <Image
              src="/main.png"
              alt="迷子になったキャラクター"
              width={200}
              height={200}
              className="object-contain mx-auto"
              priority
            />
          </div>

          {/* 浮遊する404テキスト */}
          <div className="absolute -top-2 -right-8 bg-white rounded-full px-3 py-1 shadow-lg animate-bounce">
            <span className="text-lg font-bold text-blue-600">404</span>
          </div>
        </div>

        {/* メッセージ */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">
            あれれ？
          </h1>
          <p className="text-xl text-white/80">
            お探しのページが見つからないクマ...
          </p>
          <p className="text-white/60">もしかして道に迷っちゃったかも？</p>
        </div>

        {/* アクションボタン */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            className="bg-white text-secondary hover:bg-secondary-light/10 shadow-lg"
          >
            <Link href="/" className="flex items-center gap-2">
              <Home size={20} />
              ホームに戻る
            </Link>
          </Button>
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-secondary shadow-lg"
          >
            <Search size={20} className="mr-2" />
            もう一度探す
          </Button>
        </div>

        {/* 装飾的な要素 */}
        <div className="flex justify-center space-x-4 mt-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-white rounded-full opacity-60 animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
