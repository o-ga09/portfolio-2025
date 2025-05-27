import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
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
      },
    },
  },
  plugins: [],
};

export default config;
