import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const APP_URL = process.env.NEXT_PUBLIC_FRONT_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "オーガの自己紹介サイト",
  description:
    "オーガの自己紹介サイトへようこそ！ここでは、オーガの趣味や特技、好きなこと、技術ブログについて紹介しています。",

  keywords:
    "オーガ, 自己紹介, 趣味, 特技, 技術ブログ, プログラミング, ゲーム開発, 音楽制作, 旅行記",
  authors: [{ name: "@o-ga09" }],
  creator: "@o-ga09",
  publisher: "@o-ga09",
  metadataBase: new URL(APP_URL),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: APP_URL,
    siteName: "オーガのブログ",
    title: "オーガのブログ - 自己紹介サイト",
    description:
      "オーガのブログへようこそ！ここでは、オーガの趣味や特技、好きなこと、技術ブログについて紹介しています。",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "オーガのブログ - 自己紹介サイト",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "オーガのブログ - 自己紹介サイト",
    description:
      "オーガのブログへようこそ！ここでは、オーガの趣味や特技、好きなこと、技術ブログについて紹介しています。",
    images: ["/og-image.png"],
    creator: "@o-ga09",
    site: "@o-ga09",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      {
        url: "/android-chrome-192x192.webp",
        sizes: "192x192",
        type: "image/webp",
      },
      {
        url: "/android-chrome-512x512.webp",
        sizes: "512x512",
        type: "image/webp",
      },
    ],
    apple: [
      { url: "/apple-touch-icon.webp", sizes: "180x180", type: "image/webp" },
    ],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
