import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-secondary-light to-secondary flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* キャラクター画像 */}
        <div className="relative">
          <div className="relative mx-auto mb-6 transform hover:scale-105 transition-transform duration-300">
            {/* 装飾的な背景円 */}
            <div className="absolute inset-0 bg-white/80 rounded-full blur-xl"></div>
            {/* メインの円形背景 */}
            <div className="absolute inset-4 -inset-x-4 bg-gradient-to-br from-pink-200 to-secondary-light rounded-full"></div>
            <Image
              src="/main.png"
              alt="迷子になったキャラクター"
              width={200}
              height={200}
              className="relative z-10 object-contain mx-auto rounded-full border-4 border-white/50 shadow-xl transform hover:rotate-3 transition-all duration-300"
              priority
            />
          </div>

          {/* 浮遊する要素たち */}
          <div className="absolute -top-2 -right-8 bg-white rounded-full px-4 py-2 shadow-xl animate-bounce">
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-secondary bg-clip-text text-transparent">
              404
            </span>
          </div>
          {/* 装飾的な要素 */}
          <div className="absolute -top-4 -left-8 w-12 h-12 bg-pink-200 rounded-full opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-2 -right-6 w-8 h-8 bg-secondary-light rounded-full opacity-60 animate-bounce delay-100"></div>
          <div className="absolute top-1/2 -left-10 w-6 h-6 bg-white rounded-full opacity-40 animate-ping"></div>
        </div>

        {/* メッセージ */}
        <div className="space-y-4 relative">
          <h1 className="text-4xl font-bold text-foreground drop-shadow-lg">
            あれれ？
            <span className="inline-block ml-2 animate-bounce">🤔</span>
          </h1>
          <p className="text-xl text-foreground/90 font-medium">
            お探しのページが見つからないクマ...
            <span className="inline-block ml-1 animate-bounce">🐻</span>
          </p>
          <p className="text-foreground/70">
            もしかして道に迷っちゃったかも？
            <span className="inline-block ml-1 animate-pulse">✨</span>
          </p>
        </div>

        {/* アクションボタン */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            className="bg-white text-foreground hover:bg-pink-50 shadow-xl hover:scale-105 transition-all duration-300"
          >
            <Link href="/" className="flex items-center gap-2">
              <Home size={20} className="text-pink-500" />
              ホームに戻る
            </Link>
          </Button>
          <Button
            asChild
            className="bg-gradient-to-r from-pink-400 to-secondary text-white hover:opacity-90 shadow-xl hover:scale-105 transition-all duration-300"
          >
            <Link href="/search" className="flex items-center gap-2">
              <Search size={20} />
              検索してみる
            </Link>
          </Button>
        </div>

        {/* 装飾的な背景要素 */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-pink-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-secondary-light rounded-full opacity-20 animate-bounce"></div>

        {/* キラキラエフェクト */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-60 animate-ping"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: "1.5s",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
