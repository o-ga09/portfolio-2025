import Footer from "@/components/section/footer";
import Header from "@/components/section/header";
import { aboutMetadata } from "@/lib/metadata";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Stamp from "@/components/item/stemp";

export const metadata = aboutMetadata;

const infoItems: { icon: string; label: string; value: string }[] = [
  { icon: "🎂", label: "生年月日", value: "1997年9月27日" },
  { icon: "🗾", label: "出身地", value: "新潟県三条市" },
  { icon: "🎓", label: "出身大学", value: "会津大学 24期（20卒）" },
  { icon: "🎤", label: "趣味", value: "推し活、ライブ、個人開発" },
  { icon: "⚙️", label: "好きな技術", value: "Go, TypeScript, k8s" },
];

const skills: string[] = [
  "Go",
  "TypeScript",
  "React",
  "Next.js",
  "MySQL",
  "Docker",
  "Kubernetes",
  "AWS",
  "Firebase",
];

export default function About() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow py-12 px-4 sm:px-6 md:px-8 lg:py-16">
        <div className="max-w-5xl w-full mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-primary drop-shadow-md">
            About Me
          </h1>

          {/* Bento グリッド */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(160px,auto)]">
            {/* プロフィール（大タイル） */}
            <section className="sm:col-span-2 lg:row-span-2 bg-card rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow duration-300 flex flex-col">
              <div className="h-3 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500" />
              <div className="flex-grow flex flex-col items-center justify-center gap-4 p-6">
                <div className="relative w-40 h-40 rounded-2xl overflow-hidden border-4 border-pink-200 shadow-md">
                  <Image
                    src="/main.webp"
                    alt="Profile Picture"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 160px"
                    priority
                  />
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    オーガ
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    バックエンドエンジニア
                  </p>
                </div>
              </div>
            </section>

            {/* 自己紹介（ワイドタイル） */}
            <section className="sm:col-span-2 lg:col-span-2 lg:row-span-2 bg-card rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow duration-300 p-6 flex flex-col">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                自己紹介
              </h2>
              <div className="h-1 w-14 bg-primary rounded mb-4" />
              <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                バックエンドとして活動しているオーガです。バックエンドはGoを中心に、フロントエンドはReact/Next.jsを得意としています。クラウドインフラの構築や運用も担当しています。趣味は推し活とライブ参戦で、特に山本彩さんの10年来のファンです。休日はゲーム（ゼノブレイド）やアニメ鑑賞を楽しんでいます。新潟出身で日本酒が大好きです。
              </p>
            </section>

            {/* スキル（ワイドタイル） */}
            <section className="sm:col-span-2 bg-card rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow duration-300 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                スキル
              </h2>
              <div className="h-1 w-14 bg-primary rounded mb-4" />
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-gradient-to-r from-primary/10 to-secondary/10 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-900 dark:text-white border border-border"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* DEV STAMP（インタラクティブタイル） */}
            <section className="bg-card rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow duration-300 p-6 flex flex-col items-center justify-center gap-3">
              <Stamp />
            </section>

            {/* 詳細ページへのリンクタイル */}
            <Link
              href="/about/details"
              className="group bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col items-center justify-center text-white"
            >
              <span className="text-lg font-bold">経歴・詳細</span>
              <span className="mt-2 inline-flex items-center gap-1 text-sm opacity-90 group-hover:gap-2 transition-all">
                More
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
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
            </Link>

            {/* 個人情報（小タイル群） */}
            {infoItems.map((item) => (
              <section
                key={item.label}
                className="bg-card rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow duration-300 p-5 flex flex-col justify-center"
              >
                <span className="text-2xl" aria-hidden>
                  {item.icon}
                </span>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  {item.label}
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {item.value}
                </p>
              </section>
            ))}

            {/* リンクタイル群（旧フローティングナビを統合） */}
            <Link
              href="/"
              className="group bg-pink-100 dark:bg-pink-950/40 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-5 flex flex-col items-center justify-center gap-2 border border-pink-200 dark:border-pink-900"
              title="ホームへ戻る"
            >
              <span className="text-3xl text-pink-600 group-hover:scale-110 transition-transform">
                ♡
              </span>
              <span className="text-xs font-medium text-pink-700 dark:text-pink-300">
                Home
              </span>
            </Link>

            <Link
              href="https://github.com/o-ga09"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-purple-100 dark:bg-purple-950/40 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-5 flex flex-col items-center justify-center gap-2 border border-purple-200 dark:border-purple-900"
              title="GitHubを見る"
            >
              <span className="text-3xl text-purple-600 group-hover:scale-110 transition-transform">
                ★
              </span>
              <span className="text-xs font-medium text-purple-700 dark:text-purple-300">
                GitHub
              </span>
            </Link>

            <Link
              href="https://music.apple.com/jp/song/%E3%82%AB%E3%83%95%E3%82%A7%E3%83%A2%E3%82%AB/1784641766"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-indigo-100 dark:bg-indigo-950/40 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-5 flex flex-col items-center justify-center gap-2 border border-indigo-200 dark:border-indigo-900"
              title="好きな曲"
            >
              <span className="text-3xl text-indigo-600 group-hover:scale-110 transition-transform">
                ♪
              </span>
              <span className="text-xs font-medium text-indigo-700 dark:text-indigo-300">
                Music
              </span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
