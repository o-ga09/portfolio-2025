import Footer from "@/components/section/footer";
import Header from "@/components/section/header";
import Link from "next/link";
import React from "react";

type ProfileHistory = {
  year: string;
  company: string;
  position: string;
  description: string;
};

type Qualification = {
  name: string;
  year: string;
  description?: string;
};

type Skill = {
  type?: "backend" | "frontend";
  name: string;
  level: string;
  description?: string;
  progress?: number;
};

type Hobby = {
  title: string;
  description: string;
};

type Other = {
  title: string;
  description: string;
};

type Product = {
  name: string;
  description: string;
  link: string;
};

export default function AboutDetails() {
  const profileHistory: ProfileHistory[] = [
    {
      year: "2022年〜現在",
      company: "株式会社ワクト",
      position: "バックエンドエンジニア",
      description:
        "Node.js x AWSのWebシステムの保守や不動産の自社システムのGo x React x AWSのリプレイス案件に参画。自社では、グループ横断のテックイベントの運営や勉強会、社内LT会の主催に注力する。また、社外イベントやカンファレンスへの参加も積極的です。",
    },
    {
      year: "2020年〜2022年",
      company: "アイテル株式会社",
      position: "システムエンジニア",
      description:
        "金融業界がメインのSES企業に新卒で入社。マーケティングオートメーションツールのシステム保守に従事。一部、開発工程において結合テスト／システムテストでのテストシナリオの策定、実施を担当。",
    },
    {
      year: "2016年〜2020年",
      company: "会津大学",
      position: "学部",
      description:
        "コンピュータサイエンス学部で、プログラミングやデータベース、ネットワークなどの基礎を学ぶ。特に、卒業研究ではブロックチェーンを用いたアプリケーションに取り組みました。",
    },
  ];

  const qualifications_tech: Qualification[] = [
    {
      name: "AWS Certified Solutions Architect Associate",
      year: "2025年取得",
      description:
        "AWS上でのアーキテクチャ設計に関する専門知識を証明する資格。",
    },
    {
      name: "AWS Certified Developer Associate",
      year: "2024年取得",
      description:
        "AWS上でのアプリケーション開発に関する専門知識を証明する資格。",
    },
    {
      name: "AWS Certified Cloud Practitioner",
      year: "2023年取得",
      description:
        "AWSの基本的なサービスとクラウドコンセプトに関する知識を証明する資格。",
    },
  ];

  const qualifications_other: Qualification[] = [];

  const remark = "";

  const skills: Skill[] = [
    {
      type: "backend",
      name: "Go",
      level: "上級",
      description: "API開発の実装における経験。",
      progress: 85,
    },
    {
      type: "backend",
      name: "TypeScript",
      level: "中級",
      description:
        "ReactやNext.jsを用いたフロントエンド開発の経験。Expressやを用いたバックエンド開発の経験。",
      progress: 70,
    },
    {
      type: "backend",
      name: "Kubernetes",
      level: "上級",
      description: "",
      progress: 50,
    },
    {
      type: "frontend",
      name: "React",
      level: "中級",
      description: "個人開発でのWebアプリケーション開発経験。",
      progress: 75,
    },
    {
      type: "backend",
      name: "Docker",
      level: "上級",
      description: "コンテナ化技術を用いた開発環境の構築と運用。",
      progress: 85,
    },
    {
      type: "backend",
      name: "MySQL",
      level: "中級",
      description: "データベース設計とパフォーマンスチューニングの経験。",
      progress: 70,
    },
    {
      type: "backend",
      name: "AWS",
      level: "中級",
      description: "クラウドインフラの設計と運用に関する専門知識。",
      progress: 90,
    },
  ];

  const hobbies: Hobby[] = [
    {
      title: "推し活",
      description:
        "山本彩さんのファンとして10年以上活動中。ライブやイベントに積極的に参加しています。",
    },
    {
      title: "ゲーム",
      description:
        "ドラクエ、モンハン（MH3rd、MH3G、MH4、MH4G、MHW、MHW:I、MHR、MHR:S）、ゼノブレイド",
    },
    {
      title: "アニメ・映画鑑賞",
      description: "ハイキュー！！、鬼滅の刃、推しの子、ダイヤのA、メジャー",
    },
    {
      title: "個人開発",
      description:
        "趣味で新しい技術を試しながら個人アプリやツールを開発。GitHubではオープンソースにも貢献中。",
    },
  ];

  const others: Other[] = [
    {
      title: "出身地",
      description: "新潟県。豊かな自然と食文化に恵まれた環境で育ちました。",
    },
    {
      title: "好きな食べ物",
      description: "日本酒に合う料理全般。特に新潟の海の幸と山の幸が好みです。",
    },
    {
      title: "休日の過ごし方",
      description:
        "個人開発、推し関連のライブやイベント参加、アニメ鑑賞、ゲーム、友人とのダーツを楽しんでいます。",
    },
    {
      title: "どうでもいい自慢",
      description: "俳優の高橋克実さんと出身小中高が一緒",
    },
  ];

  const products: Product[] = [
    {
      name: "推しの歌詞のワンフレーズで曲名を当てるクイズゲーム",
      description:
        "個人開発のWebアプリケーション。推しの歌詞に共鳴するフレーズを当てるクイズゲームです。",
      link: "https://sy-quiz.t09-blog.com/",
    },
    {
      name: "パワプロのパワフェスモードの計算ツール",
      description:
        "パワプロのパワフェスモードでの試合結果や選手のステータスを計算するツール。",
      link: "https://pawafes-calc-20220223.dt.r.appspot.com/",
    },
    {
      name: "モンハンAPI",
      description: "モンスターハンターシリーズのデータを提供するAPI。",
      link: "https://mh-api.com",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          {/* ナビゲーションリンク */}
          <div className="mb-10">
            <Link
              href="/about"
              className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-white/90 transition-colors duration-300 flex items-center gap-2 font-medium"
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
            </Link>
          </div>

          <h1 className="text-4xl font-bold mb-12 text-gray-900 dark:text-white drop-shadow-md">
            詳細プロフィール
          </h1>

          {/* 詳細プロフィールのセクション */}
          <div className="space-y-16 md:space-y-20">
            {/* 略歴セクション */}
            <section className="bg-card rounded-xl p-6 sm:p-8 md:p-10 shadow-lg border-l-4 border-pink-400 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="text-pink-500 mr-3">❖</span>
                略歴
              </h2>
              <div className="space-y-6">
                {profileHistory.map((item, index) => (
                  <div key={index} className="flex flex-col md:flex-row gap-4">
                    <div className="flex-none w-32 text-gray-900 dark:text-white font-medium">
                      {item.year}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">
                        {item.company}
                      </h3>
                      <p className="text-muted-foreground mt-1">
                        {item.position}として、{item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 資格セクション */}
            <section className="bg-card rounded-xl p-8 shadow-lg border-l-4 border-yellow-400">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="text-yellow-500 mr-3">❖</span>
                資格
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 技術資格 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-border pb-2">
                    技術資格
                  </h3>

                  <div className="space-y-3">
                    {qualifications_tech.map((qual, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-yellow-400 mt-1"></div>
                        <div className="ml-3">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {qual.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {qual.year}
                          </p>
                          {qual.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {qual.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* その他の資格 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-border pb-2">
                    その他の資格
                  </h3>

                  <div className="space-y-3">
                    {qualifications_other.length > 0 ? (
                      qualifications_other.map((qual, index) => (
                        <div key={index} className="flex items-start">
                          <div className="flex-shrink-0 h-5 w-5 rounded-full bg-yellow-400 mt-1"></div>
                          <div className="ml-3">
                            <p className="font-medium text-gray-900 dark:text-white">
                              {qual.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {qual.year}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <>
                        <p className="text-gray-600 dark:text-gray-400">
                          特にありません
                        </p>
                      </>
                    )}
                  </div>

                  {remark === "" ? (
                    <></>
                  ) : (
                    <div className="bg-secondary/20 border border-border rounded-lg p-4 mt-6">
                      <p className="text-sm text-gray-900 dark:text-white/80 italic">
                        {remark}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* スキルセクション */}
            <section className="bg-card rounded-xl p-8 shadow-lg border-l-4 border-indigo-400">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="text-indigo-500 mr-3">❖</span>
                スキル詳細
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">
                    バックエンド
                  </h3>
                  <div className="space-y-3">
                    {skills
                      .filter((skill) => skill.type === "backend")
                      .map((skill, index) => (
                        <div key={index} className="flex items-start">
                          <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-400 mt-1"></div>
                          <div className="ml-3 w-full">
                            <span className="font-medium text-gray-900 dark:text-white">
                              {skill.name}
                              <span className="text-xs text-muted-foreground ml-1">
                                {skill.level}
                              </span>
                            </span>
                            {skill.description && (
                              <span className="text-sm text-muted-foreground mt-1">
                                {skill.description}
                              </span>
                            )}
                            <div className="w-full bg-secondary/30 rounded-full h-2 mt-2">
                              <div
                                className="bg-pink-500 h-2 rounded-full"
                                style={{ width: `${skill.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">
                    フロントエンド
                  </h3>
                  <div className="space-y-3">
                    {skills
                      .filter((skill) => skill.type === "frontend")
                      .map((skill, index) => (
                        <div key={index} className="flex items-start">
                          <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-400 mt-1"></div>
                          <div className="ml-3 w-full">
                            <p className="font-medium text-gray-900 dark:text-white">
                              {skill.name}{" "}
                              <span className="text-xs text-muted-foreground ml-1">
                                {skill.level}
                              </span>
                            </p>
                            {skill.description && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {skill.description}
                              </p>
                            )}
                            <div className="w-full bg-secondary/30 rounded-full h-2 mt-2">
                              <div
                                className="bg-pink-500 h-2 rounded-full"
                                style={{ width: `${skill.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 趣味・特技セクション */}
            <section className="bg-card rounded-xl p-8 shadow-lg border-l-4 border-purple-400">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="text-purple-500 mr-3">❖</span>
                趣味・特技
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white border-b border-border pb-2">
                    趣味
                  </h3>
                  <ul className="space-y-3 list-disc list-inside text-gray-900 dark:text-white">
                    {hobbies.map((hobby, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-purple-400 mt-1"></div>
                        <div className="ml-3">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {hobby.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {hobby.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white border-b border-border pb-2">
                    日常生活
                  </h3>

                  <div className="space-y-4">
                    {others.map((other, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-purple-400 mt-1"></div>
                        <div className="ml-3">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {other.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {other.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* プロダクトセクション */}
            <section className="bg-card rounded-xl p-8 shadow-lg border-l-4 border-blue-400">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="text-blue-500 mr-3">❖</span>
                プロダクト
              </h2>

              <div className="space-y-6">
                {products.map((product, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-400 mt-1"></div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {product.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {product.description}
                      </p>
                      <a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline mt-1 inline-block"
                      >
                        詳細を見る
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 今後について */}
            <section className="bg-card rounded-xl p-8 shadow-lg border-l-4 border-green-400">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="text-green-500 mr-3">❖</span>
                今後について
              </h2>
              <p className="text-gray-900 dark:text-white">
                バックエンドエンジニアでエンターテイメントのサービス基盤を作るエンジニアになりたい
              </p>
            </section>

            {/* コンタクトセクション */}
            <section className="bg-card rounded-xl p-8 shadow-lg border-l-4 border-green-400">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="text-green-500 mr-3">❖</span>
                コンタクト
              </h2>

              <div className="flex flex-wrap gap-6 justify-center">
                <a
                  href="https://github.com/o-ga09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 bg-secondary/30 hover:bg-secondary rounded-full transition-colors duration-300"
                >
                  <svg
                    className="w-6 h-6 text-gray-900 dark:text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                  <span className="text-gray-900 dark:text-white">GitHub</span>
                </a>

                <a
                  href="https://twitter.com/o_ga09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 bg-secondary/30 hover:bg-secondary rounded-full transition-colors duration-300"
                >
                  <svg
                    className="w-6 h-6 text-gray-900 dark:text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                  <span className="text-gray-900 dark:text-white">Twitter</span>
                </a>

                <a
                  href="https://music.apple.com/jp/song/%E3%82%AB%E3%83%95%E3%82%A7%E3%83%A2%E3%82%AB/1784641766"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 bg-secondary/30 hover:bg-secondary rounded-full transition-colors duration-300"
                >
                  <svg
                    className="w-6 h-6 text-gray-900 dark:text-white"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                  >
                    <path d="M37.891,44.438c-1.953,1.95-4.377,2.344-6.891,1.172c-2.467-1.172-4.883-1.172-7.344,0 c-3.063,1.457-5.467,1.172-7.609-1.172c-5.812-6.203-7.203-18.844,0.734-26.016c3.25-2.953,6.922-2.578,9.875,0 c2.25,1.969,4.641,2.125,7.312,0c2.25-1.797,4.734-2.516,7.547-1.953c2.125,0.391,4.062,1.547,5.609,3.484 c-5.828,3.391-4.812,11.969,1.391,14.031C47.062,37.859,42.969,42.75,37.891,44.438z M32.828,13.25 c0.078-4.515,4.016-8.25,8.453-7.922C41.562,9.578,37.922,13.25,32.828,13.25z" />
                  </svg>
                  <span className="text-gray-900 dark:text-white">Music</span>
                </a>

                <a
                  href="mailto:taitiabe1997@gmail.com"
                  className="flex items-center gap-3 px-6 py-3 bg-secondary/30 hover:bg-secondary rounded-full transition-colors duration-300"
                >
                  <svg
                    className="w-6 h-6 text-gray-900 dark:text-white"
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
                  <span className="text-gray-900 dark:text-white">Email</span>
                </a>

                <a
                  href="https://lapras.com/person"
                  className="flex items-center gap-3 px-6 py-3 bg-secondary/30 hover:bg-secondary rounded-full transition-colors duration-300"
                >
                  <svg
                    className="w-6 h-6 text-gray-900 dark:text-white"
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
                  <span className="text-gray-900 dark:text-white">LAPRAS</span>
                </a>
              </div>
            </section>
          </div>

          {/* トップに戻るボタン */}
          <div className="mt-12 text-center">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/80 to-secondary hover:from-primary hover:to-secondary/80 text-primary-foreground font-medium rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
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
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
