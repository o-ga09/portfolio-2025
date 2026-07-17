import Footer from "@/components/section/footer";
import Header from "@/components/section/header";
import { aboutMetadata } from "@/lib/metadata";
import React from "react";
import Image from "next/image";
import Link from "next/link";

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
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">オーガ</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    バックエンドエンジニア
                  </p>
                </div>
              </div>
            </section>

            {/* 自己紹介（ワイドタイル） */}
            <section className="sm:col-span-2 lg:col-span-2 lg:row-span-2 bg-card rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow duration-300 p-6 flex flex-col">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">自己紹介</h2>
              <div className="h-1 w-14 bg-primary rounded mb-4" />
              <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                バックエンドとして活動しているオーガです。バックエンドはGoを中心に、フロントエンドはReact/Next.jsを得意としています。クラウドインフラの構築や運用も担当しています。趣味は推し活とライブ参戦で、特に山本彩さんの10年来のファンです。休日はゲーム（ゼノブレイド）やアニメ鑑賞を楽しんでいます。新潟出身で日本酒が大好きです。
              </p>
            </section>

            {/* スキル（ワイドタイル） */}
            <section className="sm:col-span-2 bg-card rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow duration-300 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">スキル</h2>
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
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">{item.label}</p>
                <p className="font-medium text-gray-900 dark:text-white">{item.value}</p>
              </section>
            ))}

            {/* リンクタイル群（旧フローティングナビを統合） */}
            <Link
              href="https://x.com/o_ga09"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-pink-100 dark:bg-pink-950/40 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-5 flex flex-col items-center justify-center gap-2 border border-pink-200 dark:border-pink-900"
              title="Xを見る"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                fill="currentColor"
                className="w-7 h-7 text-pink-600 group-hover:scale-110 transition-transform"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
              </svg>
              <span className="text-xs font-medium text-pink-700 dark:text-pink-300">X</span>
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
            {/* Apple Music（埋め込みタイル） */}
            <section className="sm:col-span-2 bg-card rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow duration-300 p-4 flex items-center justify-center">
              <iframe
                title="Apple Musicで「ラズベリーサマー / 山本彩」を再生"
                allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                frameBorder={0}
                height="175"
                style={{
                  width: "100%",
                  maxWidth: "660px",
                  overflow: "hidden",
                  borderRadius: "10px",
                }}
                sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                src="https://embed.music.apple.com/jp/song/%E3%83%A9%E3%82%BA%E3%83%99%E3%83%AA%E3%83%BC%E3%82%B5%E3%83%9E%E3%83%BC/6786945714"
              ></iframe>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
