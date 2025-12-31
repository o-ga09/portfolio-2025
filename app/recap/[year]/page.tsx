"use client";

import React from "react";
import { useParams } from "next/navigation";

function NumberReel({
  value,
  className = "",
}: {
  value: number;
  className?: string;
}) {
  const formatted = value.toLocaleString();
  const chars = formatted.split("");
  const [start, setStart] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setStart(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`inline-flex items-end ${className}`} aria-hidden>
      {chars.map((ch, i) => {
        if (ch === ",") {
          return (
            <div
              key={`c-${i}`}
              style={{
                width: "0.6em",
                height: "1em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ lineHeight: "1em" }}>,</span>
            </div>
          );
        }
        const target = Number(ch);
        // Use em-based translation so it scales with current font-size
        const translateEm = 10 + target; // two cycles (0-9 twice) then target
        const transform = start
          ? `translateY(-${translateEm}em)`
          : `translateY(0)`;
        return (
          <div
            key={i}
            className="overflow-hidden flex-shrink-0"
            style={{ height: "1em", width: "0.9em" }}
          >
            <div
              style={{
                transform,
                transition: start
                  ? "transform 900ms cubic-bezier(.2,.8,.2,1)"
                  : "none",
                willChange: "transform",
                display: "block",
              }}
            >
              {Array.from({ length: 20 }).map((_, n) => (
                <span
                  key={n}
                  style={{ display: "block", height: "1em", lineHeight: "1em" }}
                >
                  {n % 10}
                </span>
              ))}
            </div>
          </div>
        );
      })}
      <span className="sr-only">{value}</span>
    </div>
  );
}

export default function RecapPage() {
  const params = useParams() as { year?: string } | null;
  const year = params?.year ?? "2025";

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#3b0764] to-[#7c2dff] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h2 className="text-sm tracking-widest text-indigo-200/80 mb-3">
            RECAP
          </h2>
          <h1 className="text-6xl sm:text-7xl font-extrabold leading-tight drop-shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
            {year}
          </h1>
        </header>

        <section className="relative rounded-3xl bg-white/5 p-8 mb-8 overflow-hidden">
          <div className="absolute -right-24 -top-24 w-64 h-64 bg-pink-400/20 rounded-full blur-3xl" />
          <div className="absolute -left-24 -bottom-24 w-72 h-72 bg-emerald-300/10 rounded-full blur-3xl" />

          <h3 className="text-2xl font-bold mb-6">2025 の要約</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="rounded-xl bg-white/6 p-8 text-center">
              <div className="text-5xl sm:text-6xl font-extrabold leading-none">
                <NumberReel value={64} />
              </div>
              <div className="text-base sm:text-lg text-indigo-100/80 mt-2">
                connpass イベント参加数
              </div>
            </div>

            <div className="rounded-xl bg-white/6 p-8 text-center">
              <div className="text-5xl sm:text-6xl font-extrabold leading-none">
                <NumberReel value={9} />
              </div>
              <div className="text-base sm:text-lg text-indigo-100/80 mt-2">
                テックブログ記事
              </div>
            </div>

            <div className="rounded-xl bg-white/6 p-8 text-center">
              <div className="text-5xl sm:text-6xl font-extrabold leading-none">
                <NumberReel value={2} />
              </div>
              <div className="text-base sm:text-lg text-indigo-100/80 mt-2">
                読んだ本
              </div>
            </div>

            <div className="rounded-xl bg-white/6 p-8 text-center">
              <div className="text-5xl sm:text-6xl font-extrabold leading-none">
                <NumberReel value={29} />
              </div>
              <div className="text-base sm:text-lg text-indigo-100/80 mt-2">
                いいね
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-white/6 p-6">
              <h4 className="text-xl sm:text-2xl font-bold mb-3">
                参加したカンファレンス
              </h4>
              <ul className="list-disc list-inside text-indigo-100/80">
                <li>AWS Summit</li>
                <li>AWS CDK conference</li>
                <li>Go Conference</li>
                <li>TinyGo Conference</li>
                <li>Hono Conference</li>
                <li>Flutter kaigi</li>
              </ul>
            </div>

            {/* ブログの詳細 */}
            <div className="rounded-2xl bg-white/6 p-6">
              <h4 className="text-xl sm:text-2xl font-bold mb-3">
                ブログの詳細
              </h4>
              <div className="flex flex-col gap-4">
                <div className="text-center p-3 bg-white/3 rounded-lg">
                  <div className="text-3xl sm:text-4xl font-extrabold">
                    <NumberReel value={32495} />
                  </div>
                  <div className="text-sm text-indigo-100/80 mt-1">
                    文字の執筆
                  </div>
                </div>

                <div className="text-center p-3 bg-white/3 rounded-lg">
                  <div className="text-3xl sm:text-4xl font-extrabold">
                    <NumberReel value={9} />
                  </div>
                  <div className="text-sm text-indigo-100/80 mt-1">記事数</div>
                </div>

                <div className="text-center p-3 bg-white/3 rounded-lg">
                  <div className="text-3xl sm:text-4xl font-extrabold">
                    <NumberReel value={13806} />
                  </div>
                  <div className="text-sm text-indigo-100/80 mt-1">PV</div>
                </div>

                <div className="text-center p-3 bg-white/3 rounded-lg">
                  <div className="text-3xl sm:text-4xl font-extrabold">
                    <NumberReel value={100} />
                  </div>
                  <div className="text-sm text-indigo-100/80 mt-1">Likes</div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white/6 p-6">
              <h4 className="text-xl sm:text-2xl font-bold mb-3">
                その他の指標
              </h4>
              <div className="grid grid-cols-2 gap-3 text-base text-indigo-100/80">
                <div>X フォロワー</div>
                <div className="font-extrabold text-2xl">
                  <NumberReel value={361} />
                </div>
                <div>GitHub フォロワー</div>
                <div className="font-extrabold text-2xl">
                  <NumberReel value={8} />
                </div>
                <div>GitHub スター</div>
                <div className="font-extrabold text-2xl">
                  <NumberReel value={13} />
                </div>
                <div>取得した資格</div>
                <div className="font-semibold">
                  AWS Solution Architect Associate
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 運営に参加したカンファレンス */}
        <section className="rounded-3xl bg-white/5 p-8 mb-8">
          <h3 className="text-2xl font-bold mb-4">
            運営に参加したカンファレンス
          </h3>
          <ul className="list-disc list-inside text-indigo-100/80">
            <li>Go Conference</li>
            <li>Hono Conference</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
