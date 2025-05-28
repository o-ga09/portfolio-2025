"use client";
import Footer from "@/components/section/footer";
import Header from "@/components/section/header";
import React, { useState } from "react";
import Image from "next/image";
import { ViewTransitionsLink } from "@/lib/viewTransitonLink";

export default function About() {
  const [isStamping, setIsStamping] = useState(false);
  const [stampCount, setStampCount] = useState(0);

  const handleStampClick = () => {
    if (!isStamping) {
      setIsStamping(true);
      setStampCount((prev) => prev + 1);

      // アニメーション終了後に状態をリセット
      setTimeout(() => {
        setIsStamping(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-8 px-4 md:px-8">
        <div className="max-w-4xl w-full mx-auto">
          <h1 className="text-4xl font-bold text-center mb-6 text-primary drop-shadow-md">
            About Me
          </h1>

          {/* パスポート/名刺風のデザイン */}
          <div className="bg-card rounded-xl overflow-hidden shadow-2xl border-4 border-primary/30 relative">
            {/* パスポート上部の装飾バー */}
            <div className="h-4 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500"></div>

            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {/* 左側: 写真とスタンプ風の装飾 */}
                <div className="space-y-4 flex flex-col items-center">
                  <div className="relative w-48 h-48 rounded-lg overflow-hidden border-4 border-pink-200 shadow-md">
                    <Image
                      src="/main.png"
                      alt="Profile Picture"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="bg-pink-100 rounded-full px-5 py-2 text-pink-600 font-medium text-sm transform rotate-3 border border-pink-300 shadow-sm">
                    Valid until: ∞
                  </div>
                  <div
                    onClick={handleStampClick}
                    className={`w-20 h-20 rounded-full bg-indigo-100 border-2 border-indigo-300 flex items-center justify-center cursor-pointer 
                      ${
                        isStamping
                          ? "animate-stamp transform-gpu origin-center"
                          : "transform -rotate-12 hover:rotate-0 transition-all duration-300 hover:shadow-md"
                      } 
                      relative`}
                    title="スタンプを押してみよう！"
                  >
                    <span className="text-indigo-700 font-bold text-xs">
                      DEV STAMP
                    </span>

                    {/* スタンプ押印時の効果 */}
                    {isStamping && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-28 h-28 bg-indigo-600 rounded-full opacity-10 animate-ping"></div>
                      </div>
                    )}

                    {/* スタンプカウンター */}
                    {stampCount > 0 && (
                      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
                        {stampCount}
                      </div>
                    )}
                  </div>

                  {/* スタンプが押された跡のマーク */}
                  <div className="flex flex-wrap justify-center gap-2 max-w-xs">
                    {[...Array(Math.min(stampCount, 5))].map((_, index) => (
                      <div
                        key={index}
                        className={`w-8 h-8 rounded-full bg-indigo-100 border border-indigo-300 flex items-center justify-center opacity-70 transform rotate-${Math.floor(
                          Math.random() * 45 - 22
                        )}`}
                      >
                        <span className="text-indigo-700 font-bold text-[7px]">
                          DEV
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 右側: テキスト情報 */}
                <div className="col-span-2 space-y-5">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      個人情報
                    </h2>
                    <div className="h-1 w-14 bg-primary rounded mb-3"></div>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">氏名</p>
                        <p className="font-medium text-foreground">オーガ</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">肩書き</p>
                        <p className="font-medium text-foreground">
                          フルスタックエンジニア
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">趣味</p>
                        <p className="font-medium text-foreground">
                          推し活、ライブ、個人開発
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          好きな技術
                        </p>
                        <p className="font-medium text-foreground">
                          Go, TypeScript, k8s
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      スキル
                    </h2>
                    <div className="h-1 w-14 bg-primary rounded mb-3"></div>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        "Go",
                        "TypeScript",
                        "React",
                        "Next.js",
                        "MySQL",
                        "Docker",
                        "Kubernetes",
                        "AWS",
                        "Firebase",
                      ].map((skill) => (
                        <div
                          key={skill}
                          className="bg-gradient-to-r from-primary/10 to-secondary/10 px-3 py-2 rounded-lg shadow-sm border border-border"
                        >
                          <p className="font-medium text-sm text-primary text-center">
                            {skill}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      自己紹介
                    </h2>
                    <div className="h-1 w-14 bg-primary rounded mb-3"></div>
                    <p className="text-foreground/90 leading-relaxed">
                      フルスタックエンジニアとして活動しているオーガです。バックエンドはGoを中心に、フロントエンドはReact/Next.jsを得意としています。クラウドインフラの構築や運用も担当しています。趣味は推し活とライブ参戦で、特に山本彩さんの10年来のファンです。休日はゲーム（ゼノブレイド）やアニメ鑑賞を楽しんでいます。新潟出身で日本酒が大好きです。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* パスポート下部の装飾バー */}
            <div className="h-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400"></div>
          </div>

          {/* More... ボタン */}
          <div className="flex justify-center mt-8">
            <ViewTransitionsLink
              href="/about/details"
              className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md"
            >
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-purple-500 to-pink-500 group-hover:translate-x-0 ease-in-out">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease-in-out">
                More...
              </span>
              <span className="relative invisible">More...</span>
            </ViewTransitionsLink>
          </div>

          {/* フローティングナビゲーションボタン */}
          <div className="fixed bottom-24 right-6 md:right-12 flex flex-col space-y-4">
            <ViewTransitionsLink
              href="/"
              className="w-14 h-14 bg-pink-200 hover:bg-pink-300 rounded-full flex items-center justify-center transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-pink-300 group"
              title="ホームへ戻る"
            >
              <span className="text-pink-600 text-2xl group-hover:animate-pulse">
                ♡
              </span>
            </ViewTransitionsLink>

            <ViewTransitionsLink
              href="https://github.com/o-ga09"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 bg-purple-200 hover:bg-purple-300 rounded-full flex items-center justify-center transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-purple-300 group"
              title="GitHubを見る"
            >
              <span className="text-purple-600 text-2xl group-hover:animate-pulse">
                ★
              </span>
            </ViewTransitionsLink>

            <ViewTransitionsLink
              href="https://music.apple.com/jp/song/%E3%82%AB%E3%83%95%E3%82%A7%E3%83%A2%E3%82%AB/1784641766"
              target="_blank"
              className="w-14 h-14 bg-indigo-200 hover:bg-indigo-300 rounded-full flex items-center justify-center transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-indigo-300 group"
              title="お問い合わせ"
            >
              <span className="text-indigo-600 text-2xl group-hover:animate-pulse">
                ♪
              </span>
            </ViewTransitionsLink>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
