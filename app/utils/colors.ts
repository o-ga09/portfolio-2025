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
} as const;
