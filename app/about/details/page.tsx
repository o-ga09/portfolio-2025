"use client";
import Footer from "@/components/section/footer";
import Header from "@/components/section/header";
import { ViewTransitionsLink } from "@/lib/viewTransitonLink";
import React from "react";

export default function AboutDetails() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-12 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          {/* ナビゲーションリンク */}
          <div className="mb-8">
            <ViewTransitionsLink
              href="/about"
              className="text-purple-600 hover:text-purple-800 flex items-center gap-2 font-medium"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                ></path>
              </svg>
              プロフィールに戻る
            </ViewTransitionsLink>
          </div>

          <h1 className="text-4xl font-bold mb-10 text-purple-600 drop-shadow-md">
            詳細プロフィール
          </h1>

          {/* 詳細プロフィールのセクション */}
          <div className="space-y-12">
            {/* 略歴セクション */}
            <section className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-pink-400">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="text-pink-500 mr-3">❖</span>
                略歴
              </h2>

              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-none w-32 text-purple-600 font-medium">
                    2023年〜現在
                  </div>
                  <div>
                    <h3 className="font-bold">
                      株式会社クラウドテクノロジーズ
                    </h3>
                    <p className="text-gray-700 mt-1">
                      テックリード・アーキテクトとして、マイクロサービスアーキテクチャの設計および実装をリード。Kubernetes上での大規模分散システムの構築と運用最適化を担当。
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-none w-32 text-purple-600 font-medium">
                    2020年〜2023年
                  </div>
                  <div>
                    <h3 className="font-bold">株式会社テックイノベーション</h3>
                    <p className="text-gray-700 mt-1">
                      バックエンドエンジニアとして、Goを使用したマイクロサービスの開発に従事。AWS環境でのインフラ構築とCI/CDパイプラインの整備を行う。
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-none w-32 text-purple-600 font-medium">
                    2017年〜2020年
                  </div>
                  <div>
                    <h3 className="font-bold">
                      株式会社フロントテクノロジーズ
                    </h3>
                    <p className="text-gray-700 mt-1">
                      フロントエンドエンジニアとして、React/TypeScriptを用いたWebアプリケーションの開発に従事。UI/UXの設計から実装、テスト自動化まで幅広く担当。
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 資格セクション (NEW) */}
            <section className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-yellow-400">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="text-yellow-500 mr-3">❖</span>
                資格
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 技術資格 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-yellow-700 border-b border-yellow-200 pb-2">
                    技術資格
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-yellow-400 mt-1"></div>
                      <div className="ml-3">
                        <p className="font-medium">
                          Certified Kubernetes Administrator (CKA)
                        </p>
                        <p className="text-xs text-gray-500">2022年取得</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-yellow-400 mt-1"></div>
                      <div className="ml-3">
                        <p className="font-medium">
                          AWS Certified Solutions Architect Professional
                        </p>
                        <p className="text-xs text-gray-500">2021年取得</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-yellow-400 mt-1"></div>
                      <div className="ml-3">
                        <p className="font-medium">
                          Google Cloud Professional Cloud Architect
                        </p>
                        <p className="text-xs text-gray-500">2022年取得</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-yellow-400 mt-1"></div>
                      <div className="ml-3">
                        <p className="font-medium">情報処理安全確保支援士</p>
                        <p className="text-xs text-gray-500">2023年取得</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* その他の資格 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-yellow-700 border-b border-yellow-200 pb-2">
                    その他の資格
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-yellow-400 mt-1"></div>
                      <div className="ml-3">
                        <p className="font-medium">TOEIC 900点</p>
                        <p className="text-xs text-gray-500">2020年取得</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-yellow-400 mt-1"></div>
                      <div className="ml-3">
                        <p className="font-medium">日商簿記検定2級</p>
                        <p className="text-xs text-gray-500">2018年取得</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-yellow-400 mt-1"></div>
                      <div className="ml-3">
                        <p className="font-medium">日本酒ソムリエ</p>
                        <p className="text-xs text-gray-500">2019年取得</p>
                        <p className="text-sm text-gray-600 mt-1">
                          新潟の地酒を中心に日本酒の知識を深め、ペアリングの提案なども行っています。
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
                    <p className="text-sm text-yellow-800 italic">
                      「技術だけでなく幅広い知識を持つことで、多角的な視点からの問題解決を心がけています。特に日本酒ソムリエの資格は、地元新潟への愛着と文化への理解を深めるきっかけになりました。」
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* スキルセクション (より詳細) */}
            <section className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-indigo-400">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="text-indigo-500 mr-3">❖</span>
                スキル詳細
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-lg mb-3 text-indigo-700">
                    バックエンド
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-sm">Go</span>
                        <span className="text-xs text-gray-500">上級</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-500 h-2 rounded-full"
                          style={{ width: "90%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-sm">
                          MySQL/PostgreSQL
                        </span>
                        <span className="text-xs text-gray-500">
                          中級〜上級
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-500 h-2 rounded-full"
                          style={{ width: "85%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-sm">
                          Docker/Kubernetes
                        </span>
                        <span className="text-xs text-gray-500">上級</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-500 h-2 rounded-full"
                          style={{ width: "95%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-sm">AWS/GCP</span>
                        <span className="text-xs text-gray-500">
                          中級〜上級
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-500 h-2 rounded-full"
                          style={{ width: "80%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-3 text-pink-700">
                    フロントエンド
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-sm">
                          TypeScript/JavaScript
                        </span>
                        <span className="text-xs text-gray-500">上級</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-pink-500 h-2 rounded-full"
                          style={{ width: "90%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-sm">
                          React/Next.js
                        </span>
                        <span className="text-xs text-gray-500">上級</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-pink-500 h-2 rounded-full"
                          style={{ width: "85%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-sm">
                          HTML/CSS/Tailwind
                        </span>
                        <span className="text-xs text-gray-500">
                          中級〜上級
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-pink-500 h-2 rounded-full"
                          style={{ width: "80%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-sm">
                          UI/UXデザイン
                        </span>
                        <span className="text-xs text-gray-500">中級</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-pink-500 h-2 rounded-full"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 趣味・特技セクション */}
            <section className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-purple-400">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="text-purple-500 mr-3">❖</span>
                趣味・特技
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-lg mb-4 text-purple-700 border-b border-purple-200 pb-2">
                    趣味
                  </h3>
                  <ul className="space-y-3 list-disc list-inside text-gray-700">
                    <li>
                      <span className="font-medium">推し活</span>
                      <p className="ml-6 text-sm mt-1">
                        山本彩さんのファンとして10年以上活動中。ライブやイベントに積極的に参加しています。
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">ゲーム</span>
                      <p className="ml-6 text-sm mt-1">
                        特にゼノブレイドシリーズが好きで、全作品をクリア済み。RPGやストラテジーゲームもよくプレイします。
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">アニメ・映画鑑賞</span>
                      <p className="ml-6 text-sm mt-1">
                        SFやファンタジー系が好みで、新作アニメを毎シーズン数本は欠かさず視聴。映画館にも頻繁に足を運びます。
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">個人開発</span>
                      <p className="ml-6 text-sm mt-1">
                        趣味で新しい技術を試しながら個人アプリやツールを開発。GitHubではオープンソースにも貢献中。
                      </p>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-4 text-pink-700 border-b border-pink-200 pb-2">
                    日常生活
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">出身地</p>
                      <p className="text-sm text-gray-700 ml-4 mt-1">
                        新潟県。豊かな自然と食文化に恵まれた環境で育ち、特に日本酒についての知識と愛好心が高まりました。
                      </p>
                    </div>

                    <div>
                      <p className="font-medium">好きな食べ物</p>
                      <p className="text-sm text-gray-700 ml-4 mt-1">
                        日本酒に合う料理全般。特に新潟の海の幸と山の幸を使った郷土料理が好みです。
                      </p>
                    </div>

                    <div>
                      <p className="font-medium">休日の過ごし方</p>
                      <p className="text-sm text-gray-700 ml-4 mt-1">
                        個人開発、推し関連のライブやイベント参加、アニメ鑑賞、ゲーム、友人とのダーツ。技術書や小説もよく読みます。
                      </p>
                    </div>

                    <div>
                      <p className="font-medium">好きな言葉</p>
                      <p className="text-sm text-gray-700 ml-4 mt-1">
                        「継続は力なり」「Done is better than
                        perfect」日々の小さな努力の積み重ねを大切にしています。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 連絡先セクション */}
            <section className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-green-400">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="text-green-500 mr-3">❖</span>
                コンタクト
              </h2>

              <div className="flex flex-wrap gap-6 justify-center">
                <a
                  href="https://github.com/o-ga09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-300"
                >
                  <svg
                    className="w-6 h-6 text-gray-800"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                  <span>GitHub</span>
                </a>

                <a
                  href="https://twitter.com/o_ga09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors duration-300"
                >
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                  <span>Twitter</span>
                </a>

                <a
                  href="https://music.apple.com/jp/song/%E3%82%AB%E3%83%95%E3%82%A7%E3%83%A2%E3%82%AB/1784641766"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 bg-pink-100 hover:bg-pink-200 rounded-full transition-colors duration-300"
                >
                  <svg
                    className="w-6 h-6 text-pink-600"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                  >
                    <path d="M37.891,44.438c-1.953,1.95-4.377,2.344-6.891,1.172c-2.467-1.172-4.883-1.172-7.344,0 c-3.063,1.457-5.467,1.172-7.609-1.172c-5.812-6.203-7.203-18.844,0.734-26.016c3.25-2.953,6.922-2.578,9.875,0 c2.25,1.969,4.641,2.125,7.312,0c2.25-1.797,4.734-2.516,7.547-1.953c2.125,0.391,4.062,1.547,5.609,3.484 c-5.828,3.391-4.812,11.969,1.062,14.766C45.516,39.969,42.422,42.969,37.891,44.438z M31.031,16.469 c2.391-2.953,6.828-3.25,8.828-0.594c-0.625,0.406-7.375,4.297-1.141,10.344C38.125,20.188,31.25,23.688,31.031,16.469z" />
                  </svg>
                  <span>Music</span>
                </a>

                <a
                  href="mailto:contact@example.com"
                  className="flex items-center gap-3 px-6 py-3 bg-green-100 hover:bg-green-200 rounded-full transition-colors duration-300"
                >
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <span>Email</span>
                </a>
              </div>
            </section>
          </div>

          {/* トップに戻るボタン */}
          <div className="mt-12 text-center">
            <ViewTransitionsLink
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-full hover:from-purple-700 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                ></path>
              </svg>
              プロフィールに戻る
            </ViewTransitionsLink>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
