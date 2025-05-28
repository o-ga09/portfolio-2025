"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

interface ViewTransitionProviderProps {
  children: React.ReactNode;
}

export const ViewTransitionProvider: React.FC<ViewTransitionProviderProps> = ({
  children,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // クライアントサイドでのみ実行
    if (typeof window !== "undefined") {
      // ブラウザがView Transition APIをサポートしている場合
      if (document.startViewTransition) {
        // クリックイベントをキャプチャして独自のナビゲーションを実装
        const handleClick = (event: MouseEvent) => {
          const target = event.target as HTMLElement;
          const anchor = target.closest("a");

          // アンカータグで同一オリジンのリンク（内部リンク）の場合のみ処理
          if (
            anchor &&
            anchor.href &&
            anchor.origin === window.location.origin &&
            !anchor.hasAttribute("target") &&
            !event.ctrlKey &&
            !event.metaKey
          ) {
            event.preventDefault();

            // View Transition APIを使用したページ遷移
            // スムーズなトランジションのために少し遅延を追加
            document.documentElement.classList.add("transition-active");

            document
              .startViewTransition(async () => {
                // ページ遷移前に少し待機して、トランジションを目立たせる
                router.push(anchor.href);

                // トランジションが完了するのを待つ
                return new Promise((resolve) => {
                  setTimeout(resolve, 800);
                });
              })
              .finished.then(() => {
                document.documentElement.classList.remove("transition-active");
              });
          }
        };

        // イベントリスナーを追加
        document.addEventListener("click", handleClick);

        // クリーンアップ関数
        return () => {
          document.removeEventListener("click", handleClick);
        };
      }
    }
  }, [router, pathname]);

  return <>{children}</>;
};
