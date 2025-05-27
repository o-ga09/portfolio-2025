import "@testing-library/jest-dom/vitest";
import { vi, expect } from "vitest";
import React from "react";
import { toHaveNoViolations } from "jest-axe";

// jest-axeのマッチャーを拡張
expect.extend(toHaveNoViolations);

// グローバル設定やモックなど
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// next/imageモックを追加
vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
    [key: string]: unknown;
  }) => {
    return React.createElement("img", { src, alt, ...props });
  },
}));
