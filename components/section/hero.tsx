import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary/80 to-secondary/80 text-foreground min-h-[85vh] sm:min-h-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-32">
        {/* モバイルでは画像を上部に配置 */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* 画像セクション - モバイルでは最初に表示 */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px]">
              <div className="aspect-square bg-gradient-to-br from-secondary/80 to-primary/80 rounded-full p-3 flex items-center justify-center shadow-xl">
                {/* 丸い画像を配置 */}
                <div className="w-full h-full overflow-hidden rounded-full border-4 border-foreground/30 relative">
                  <Image
                    src="/main.webp"
                    alt="o-ga09"
                    fill
                    sizes="(max-width: 640px) 280px, 320px"
                    className="object-cover"
                    priority
                  />
                </div>

                {/* 装飾的な要素 - モバイルでより控えめに */}
                <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-12 h-12 sm:w-16 sm:h-16 bg-accent rounded-full opacity-70 sm:opacity-80 shadow-lg"></div>
                <div className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-8 h-8 sm:w-12 sm:h-12 bg-warning rounded-full opacity-60 sm:opacity-70 shadow-lg"></div>
                <div className="absolute top-1/4 -left-4 sm:-left-6 w-6 h-6 sm:w-8 sm:h-8 bg-secondary-dark rounded-full opacity-50 sm:opacity-60 shadow-md"></div>
              </div>
            </div>
          </div>

          {/* テキストセクション - モバイルでは2番目に表示 */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1">
            <h1
              className="text-3xl sm:text-4xl lg:text-6xl font-bold"
              style={{ textShadow: "0px 1px 2px rgba(0,0,0,0.3)" }}
            >
              I&apos;m <span className="text-accent">o-ga09</span>
              <span className="inline-block ml-2">👋</span>
            </h1>
            <p
              className="text-base sm:text-lg lg:text-xl text-foreground/90 leading-relaxed"
              style={{ textShadow: "0px 1px 1px rgba(0,0,0,0.2)" }}
            >
              山本彩推しソフトウェアエンジニアです
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button
                size="default"
                className="bg-accent/90 hover:bg-accent/80 text-accent-foreground border-0 shadow-md text-sm sm:text-base"
              >
                <Link href="/blog">ブログを読む →</Link>
              </Button>
              <Button
                size="default"
                variant="outline"
                className="bg-secondary/40 border-accent/90 text-accent-foreground hover:bg-accent/20 hover:border-accent/80 shadow-md font-medium backdrop-blur-sm text-sm sm:text-base"
              >
                <Link href="/about">About me</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
