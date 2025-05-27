"use client";

import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-primary to-primary-dark flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* キャラクター画像 */}
        <div className="relative">
          <div className="relative mx-auto mb-6">
            <Image
              src="/main.png"
              alt="読み込み中のキャラクター"
              width={200}
              height={200}
              className="object-contain mx-auto animate-pulse"
              priority
            />
          </div>

          {/* 音符アニメーション */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute text-xl text-white animate-bounce"
                style={{
                  left: `${i * 15 - 15}px`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: "1s",
                }}
              >
                ♪
              </div>
            ))}
          </div>
        </div>

        {/* メッセージ */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">
            準備中クマ♪
          </h1>
          <p className="text-xl text-white/80">素敵な音楽を準備してるクマ...</p>
        </div>

        {/* ローディングアニメーション */}
        <div className="space-y-6">
          {/* プログレスバー風 */}
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-white rounded-full animate-pulse"
              style={{
                width: "60%",
                animation: "loading 2s ease-in-out infinite",
              }}
            />
          </div>

          {/* ドット */}
          <div className="flex justify-center space-x-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-white rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>

          {/* OK!看板風 */}
          <div className="flex justify-center space-x-4">
            {["準", "備", "中"].map((char, i) => (
              <div
                key={i}
                className="bg-white rounded-lg px-3 py-2 shadow-lg animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="text-blue-600 font-bold">{char}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0%,
          100% {
            width: 20%;
          }
          50% {
            width: 80%;
          }
        }
      `}</style>
    </div>
  );
}
