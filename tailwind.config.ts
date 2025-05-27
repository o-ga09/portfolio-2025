import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderColor: {
        DEFAULT: "var(--border)",
      },
      outlineColor: {
        DEFAULT: "var(--ring)",
      },
      textShadow: {
        DEFAULT: "0 2px 4px rgba(0,0,0,0.2)",
        sm: "0 1px 2px rgba(0,0,0,0.2)",
        md: "0 3px 6px rgba(0,0,0,0.25)",
        lg: "0 4px 8px rgba(0,0,0,0.3)",
        xl: "0 6px 12px rgba(0,0,0,0.35)",
      },
      colors: {
        border: "var(--border)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#B3DBD8",
          light: "#CBE8E6",
          dark: "#8DCCC8",
        },
        secondary: {
          DEFAULT: "#A8D1E7",
          light: "#C4E0EF",
          dark: "#7FB8D8",
        },
        accent: {
          DEFAULT: "#FFBFC5",
          light: "#FFCFD4",
          dark: "#FF9AA1",
        },
        error: {
          DEFAULT: "#FF4359",
          light: "#FF6B7C",
          dark: "#E02640",
        },
        warning: {
          DEFAULT: "#FF8A25",
          light: "#FFA24F",
          dark: "#E67000",
        },
        success: {
          DEFAULT: "#5EB95E",
          light: "#7CC97C",
          dark: "#4A9A4A",
        },
      },
      animation: {
        "bounce-slow": "bounceSlow 3s infinite ease-in-out",
        wobble: "wobble 3s infinite ease-in-out",
        fadeIn: "fadeIn 0.8s ease-out forwards",
      },
      keyframes: {
        bounceSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        wobble: {
          "0%, 100%": { transform: "translateX(0)" },
          "15%": { transform: "translateX(-5px) rotate(-5deg)" },
          "30%": { transform: "translateX(5px) rotate(5deg)" },
          "45%": { transform: "translateX(-5px) rotate(-3deg)" },
          "60%": { transform: "translateX(5px) rotate(3deg)" },
          "75%": { transform: "translateX(-5px) rotate(-1deg)" },
          "90%": { transform: "translateX(5px) rotate(1deg)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
