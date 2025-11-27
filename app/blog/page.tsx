import { Metadata } from "next";
import Blog from "@/components/section/blog";
import Header from "@/components/section/header";
import Footer from "@/components/section/footer";
import { getAllPosts } from "@/lib/blog-data";

const APP_URL = process.env.NEXT_PUBLIC_FRONT_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "ブログ | オーガのブログ",
  description: "技術記事やQiita、Zennの記事を紹介しています。",
  keywords: "ブログ, 技術記事, Qiita, Zenn, プログラミング",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: `${APP_URL}/blog`,
    siteName: "オーガのブログ",
    title: "ブログ | オーガのブログ",
    description: "技術記事やQiita、Zennの記事を紹介しています。",
    images: [
      {
        url: `${APP_URL}/og-image.webp`,
        width: 1200,
        height: 630,
        alt: "ブログ | オーガのブログ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ブログ | オーガのブログ",
    description: "技術記事やQiita、Zennの記事を紹介しています。",
    images: [`${APP_URL}/og-image.webp`],
    creator: "@o-ga09",
    site: "@o-ga09",
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-grow">
        <Blog initialPosts={posts} />
      </div>
      <Footer />
    </main>
  );
}
