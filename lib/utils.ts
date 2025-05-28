import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * View Transition APIを使用したページ遷移を行うためのユーティリティ
 * @param url 遷移先URL
 */
export const navigateWithViewTransition = (url: string): void => {
  // View Transition APIをサポートしているブラウザかチェック
  if (document.startViewTransition) {
    // View Transition APIを使用してページ遷移
    document.startViewTransition(() => {
      window.location.href = url;
    });
  } else {
    // サポートされていない場合は通常の遷移
    window.location.href = url;
  }
};
