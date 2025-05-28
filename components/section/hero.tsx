import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary/80 to-secondary/80 text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1
              className="text-4xl lg:text-6xl font-bold"
              style={{ textShadow: "0px 1px 2px rgba(0,0,0,0.3)" }}
            >
              Hey, I&apos;m <span className="text-accent">o-ga09</span>
              <span className="inline-block ml-2">👋</span>
            </h1>
            <p
              className="text-lg lg:text-xl text-foreground leading-relaxed"
              style={{ textShadow: "0px 1px 1px rgba(0,0,0,0.2)" }}
            >
              不定期で気ままに Web
              開発に関する記事をお届けします。バックエンドに関する
              <br />
              分野の記事が中心です。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/80 text-accent-foreground border-0 shadow-md"
              >
                <Link href="/blog">ブログを読む →</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-secondary/50 border-accent text-accent-foreground hover:bg-accent/20 hover:border-accent/80 shadow-md font-medium backdrop-blur-sm"
              >
                <Link href="/about">About me</Link>
              </Button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-to-br from-secondary/80 to-primary/80 rounded-full p-3 flex items-center justify-center shadow-xl">
                {/* 丸い画像を配置 */}
                <div className="w-full h-full overflow-hidden rounded-full border-4 border-foreground/30 relative">
                  <Image
                    src="/main.png"
                    alt="o-ga09"
                    fill
                    sizes="(max-width: 640px) 280px, 320px"
                    className="object-cover"
                    priority
                  />
                </div>

                {/* 装飾的な要素 */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-accent rounded-full opacity-80 shadow-lg"></div>
                <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-warning rounded-full opacity-70 shadow-lg"></div>
                <div className="absolute top-1/4 -left-6 w-8 h-8 bg-secondary-dark rounded-full opacity-60 shadow-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
