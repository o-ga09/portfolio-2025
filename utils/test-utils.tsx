import { render, RenderOptions } from "@testing-library/react";
import React from "react";

/**
 * テスト用にReactコンポーネントをレンダリングするラッパー関数
 *
 * すべてのテストで共通のプロバイダーやコンテキストが必要な場合はここに追加できます
 */
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* ここにThemeProvider、RouterProvider、StoreProviderなどを追加できます */}
      {children}
    </div>
  );
};

/**
 * カスタムレンダー関数
 * @param ui - レンダリングするReact要素
 * @param options - 追加のレンダリングオプション
 * @returns レンダリング結果とヘルパー関数
 */
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

// testing-libraryのすべてのエクスポートを再エクスポート
export * from "@testing-library/react";

// カスタムレンダーをrenderとしてオーバーライド
export { customRender as render };
