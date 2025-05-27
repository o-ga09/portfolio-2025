"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RefreshCw, Home, AlertTriangle } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-error-light via-error to-error-dark flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* キャラクター画像 */}
        <div className="relative">
          <div className="relative mx-auto mb-6">
            <Image
              src="/main_3.png"
              alt="困っているキャラクター"
              width={200}
              height={200}
              className="object-contain mx-auto filter grayscale"
              priority
            />
          </div>

          {/* エラーアイコン */}
          <div className="absolute -top-2 -right-8 bg-white rounded-full p-2 shadow-lg animate-pulse">
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
        </div>

        {/* メッセージ */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">
            おっと！
          </h1>
          <p className="text-xl text-white/80">何かエラーが発生したクマ...</p>
          <p className="text-white/60 text-sm">
            ギターの弦が切れちゃったみたい
          </p>
        </div>

        {/* エラー詳細（開発時のみ表示） */}
        {process.env.NODE_ENV === "development" && (
          <div className="bg-black/20 rounded-lg p-4 text-left">
            <p className="text-white/80 text-xs font-mono break-all">
              {error.message}
            </p>
          </div>
        )}

        {/* アクションボタン */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={reset}
            className="bg-white text-error hover:bg-error-light/10 shadow-lg"
          >
            <RefreshCw size={20} className="mr-2" />
            もう一度試す
          </Button>
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-error shadow-lg"
            onClick={() => (window.location.href = "/")}
          >
            <Home size={20} className="mr-2" />
            ホームに戻る
          </Button>
        </div>

        {/* 装飾的な要素 */}
        <div className="flex justify-center space-x-2 mt-8">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-white rounded-full opacity-60 animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
