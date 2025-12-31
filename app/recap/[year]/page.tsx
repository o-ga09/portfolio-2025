"use client";

import React from "react";
import { useParams } from "next/navigation";

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
          <p className="mt-4 text-lg text-indigo-100/90 max-w-2xl mx-auto">
            A creative look back — highlights, lessons, and moments that shaped
            the year.
          </p>
        </header>

        <section className="relative rounded-3xl bg-white/5 p-8 mb-8 overflow-hidden">
          <div className="absolute -right-24 -top-24 w-64 h-64 bg-pink-400/20 rounded-full blur-3xl" />
          <div className="absolute -left-24 -bottom-24 w-72 h-72 bg-emerald-300/10 rounded-full blur-3xl" />

          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-3">
                Highlights of the year
              </h3>
              <p className="text-indigo-100/80 mb-6">
                Placeholder highlights will be shown here. Connect real data
                later to populate milestones, media, and metrics.
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <li className="rounded-xl bg-white/6 p-4 backdrop-blur-sm">
                  🎉 Launched a signature project
                </li>
                <li className="rounded-xl bg-white/6 p-4 backdrop-blur-sm">
                  🚀 Major performance wins
                </li>
                <li className="rounded-xl bg-white/6 p-4 backdrop-blur-sm">
                  💡 Creative experiments
                </li>
                <li className="rounded-xl bg-white/6 p-4 backdrop-blur-sm">
                  🤝 New collaborations
                </li>
              </ul>
            </div>

            <div className="w-full md:w-80 flex-shrink-0">
              <div className="h-48 rounded-2xl bg-gradient-to-tr from-pink-500 to-yellow-400 flex items-center justify-center text-black font-extrabold">
                Gallery
              </div>
              <p className="mt-3 text-sm text-indigo-100/80">
                Visual snapshots — replace with thumbnails or an Open Graph
                image generator.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-white/5 p-8 mb-8">
          <h3 className="text-2xl font-bold mb-4">Timeline</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-3 h-3 rounded-full bg-pink-400 mt-2" />
              <div>
                <div className="font-semibold">Q1 — Creative Kickoff</div>
                <div className="text-sm text-indigo-100/80">
                  Placeholder summary of the quarter achievements.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-3 h-3 rounded-full bg-emerald-300 mt-2" />
              <div>
                <div className="font-semibold">Q2 — Growth & experiments</div>
                <div className="text-sm text-indigo-100/80">
                  Placeholder summary of the quarter achievements.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-3 h-3 rounded-full bg-yellow-300 mt-2" />
              <div>
                <div className="font-semibold">Q3 — Milestones</div>
                <div className="text-sm text-indigo-100/80">
                  Placeholder summary of the quarter achievements.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-3 h-3 rounded-full bg-indigo-400 mt-2" />
              <div>
                <div className="font-semibold">
                  Q4 — Reflection & next steps
                </div>
                <div className="text-sm text-indigo-100/80">
                  Placeholder summary of the quarter achievements.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-white/6 p-8 text-center">
          <h3 className="text-2xl font-bold mb-3">
            Want to make this interactive?
          </h3>
          <p className="text-indigo-100/80 mb-6">
            I can integrate real posts, metrics, and generated images. Tell me
            which sources you will use.
          </p>
          <div className="inline-flex gap-3">
            <a
              className="px-5 py-3 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full font-semibold text-black"
              href="#"
            >
              Connect data
            </a>
            <a
              className="px-5 py-3 border border-white/10 rounded-full font-medium text-indigo-100/90"
              href="#"
            >
              Preview export
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
