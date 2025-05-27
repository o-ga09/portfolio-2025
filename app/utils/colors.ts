/**
 * アプリケーション全体で使用するカラーテーマの定数
 */
export const COLORS = {
  PRIMARY: {
    DEFAULT: "#B3DBD8",
    LIGHT: "#CBE8E6",
    DARK: "#8DCCC8",
  },
  SECONDARY: {
    DEFAULT: "#A8D1E7",
    LIGHT: "#C4E0EF",
    DARK: "#7FB8D8",
  },
  ACCENT: {
    DEFAULT: "#FFBFC5",
    LIGHT: "#FFCFD4",
    DARK: "#FF9AA1",
  },
  ERROR: {
    DEFAULT: "#FF4359",
    LIGHT: "#FF6B7C",
    DARK: "#E02640",
  },
  WARNING: {
    DEFAULT: "#FF8A25",
    LIGHT: "#FFA24F",
    DARK: "#E67000",
  },
  SUCCESS: {
    DEFAULT: "#5EB95E",
    LIGHT: "#7CC97C",
    DARK: "#4A9A4A",
  },
} as const;

/**
 * Tailwindクラス名を取得するヘルパー関数
 */
export const getColorClass = {
  /**
   * プライマリカラーのTailwindクラス名を取得
   */
  primary: {
    bg: "bg-primary",
    text: "text-primary",
    border: "border-primary",
    hoverBg: "hover:bg-primary",
    hoverText: "hover:text-primary",
    hoverBorder: "hover:border-primary",
  },

  /**
   * セカンダリカラーのTailwindクラス名を取得
   */
  secondary: {
    bg: "bg-secondary",
    text: "text-secondary",
    border: "border-secondary",
    hoverBg: "hover:bg-secondary",
    hoverText: "hover:text-secondary",
    hoverBorder: "hover:border-secondary",
  },

  /**
   * アクセントカラーのTailwindクラス名を取得
   */
  accent: {
    bg: "bg-accent",
    text: "text-accent",
    border: "border-accent",
    hoverBg: "hover:bg-accent",
    hoverText: "hover:text-accent",
    hoverBorder: "hover:border-accent",
  },

  /**
   * エラーカラーのTailwindクラス名を取得
   */
  error: {
    bg: "bg-error",
    text: "text-error",
    border: "border-error",
    hoverBg: "hover:bg-error",
    hoverText: "hover:text-error",
    hoverBorder: "hover:border-error",
  },

  /**
   * 警告カラーのTailwindクラス名を取得
   */
  warning: {
    bg: "bg-warning",
    text: "text-warning",
    border: "border-warning",
    hoverBg: "hover:bg-warning",
    hoverText: "hover:text-warning",
    hoverBorder: "hover:border-warning",
  },

  /**
   * 成功カラーのTailwindクラス名を取得
   */
  success: {
    bg: "bg-success",
    text: "text-success",
    border: "border-success",
    hoverBg: "hover:bg-success",
    hoverText: "hover:text-success",
    hoverBorder: "hover:border-success",
  },
} as const;
