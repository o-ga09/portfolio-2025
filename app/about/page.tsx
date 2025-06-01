import Footer from "@/components/section/footer";
import Header from "@/components/section/header";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Stamp from "@/components/item/stemp";

export default function About() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 md:px-8 lg:py-16">
        <div className="max-w-4xl w-full mx-auto">
          <h1 className="text-4xl font-bold text-center mb-6 text-primary drop-shadow-md">
            About Me
          </h1>

          {/* パスポート/名刺風のデザイン */}
          <div className="bg-card rounded-xl overflow-hidden shadow-2xl border-4 border-primary/30 relative">
            {/* パスポート上部の装飾バー */}
            <div className="h-4 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500"></div>

            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                {/* 左側: 写真とスタンプ風の装飾 */}
                <div className="space-y-6 flex flex-col items-center">
                  <div className="relative w-48 h-48 rounded-lg overflow-hidden border-4 border-pink-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <Image
                      src="/main.webp"
                      alt="Profile Picture"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 192px"
                      priority
                    />
                  </div>
                  <Stamp />
                </div>

                {/* 右側: テキスト情報 */}
                <div className="col-span-2 space-y-5">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      個人情報
                    </h2>
                    <div className="h-1 w-14 bg-primary rounded mb-3"></div>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          氏名
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          オーガ
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          肩書き
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          バックエンドエンジニア
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          生年月日
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          1997年9月27日
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          出身地
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          新潟県三条市
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          出身大学
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          会津大学 24期
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          卒業年度
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          20卒
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          趣味
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          推し活、ライブ、個人開発
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          好きな技術
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          Go, TypeScript, k8s
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      スキル
                    </h2>
                    <div className="h-1 w-14 bg-primary rounded mb-3"></div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
                          className="bg-gradient-to-r from-primary/10 to-secondary/10 px-3 py-2 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow duration-300"
                        >
                          <p className="font-medium text-sm text-gray-900 dark:text-white text-center">
                            {skill}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      自己紹介
                    </h2>
                    <div className="h-1 w-14 bg-primary rounded mb-3"></div>
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                      バックエンドとして活動しているオーガです。バックエンドはGoを中心に、フロントエンドはReact/Next.jsを得意としています。クラウドインフラの構築や運用も担当しています。趣味は推し活とライブ参戦で、特に山本彩さんの10年来のファンです。休日はゲーム（ゼノブレイド）やアニメ鑑賞を楽しんでいます。新潟出身で日本酒が大好きです。
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
            <Link
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
            </Link>
          </div>

          {/* フローティングナビゲーションボタン */}
          <div className="fixed bottom-24 right-6 md:right-12 flex flex-col space-y-4">
            <Link
              href="/"
              className="w-14 h-14 bg-pink-200 hover:bg-pink-300 rounded-full flex items-center justify-center transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-pink-300 group"
              title="ホームへ戻る"
            >
              <span className="text-pink-600 text-2xl group-hover:animate-pulse">
                ♡
              </span>
            </Link>

            <Link
              href="https://github.com/o-ga09"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 bg-purple-200 hover:bg-purple-300 rounded-full flex items-center justify-center transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-purple-300 group"
              title="GitHubを見る"
            >
              <span className="text-purple-600 text-2xl group-hover:animate-pulse">
                ★
              </span>
            </Link>

            <Link
              href="https://music.apple.com/jp/song/%E3%82%AB%E3%83%95%E3%82%A7%E3%83%A2%E3%82%AB/1784641766"
              target="_blank"
              className="w-14 h-14 bg-indigo-200 hover:bg-indigo-300 rounded-full flex items-center justify-center transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-indigo-300 group"
              title="お問い合わせ"
            >
              <span className="text-indigo-600 text-2xl group-hover:animate-pulse">
                ♪
              </span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
