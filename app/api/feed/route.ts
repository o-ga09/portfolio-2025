import { Feed } from "feed";
import { blogPosts } from "@/lib/blog-data";

export async function GET() {
  const feed = new Feed({
    title: "o-ga09.dev Blog",
    description:
      "Web開発に関する記事をお届けします。バックエンドに関する分野の記事が中心です。",
    id: "https://o-ga09.dev/",
    link: "https://o-ga09.dev/",
    language: "ja",
    image: "https://o-ga09.dev/main.webp",
    favicon: "https://o-ga09.dev/favicon.ico",
    copyright: `All rights reserved ${new Date().getFullYear()}, o-ga09.dev`,
    updated: new Date(),
    feedLinks: {
      rss2: "https://o-ga09.dev/api/feed",
    },
    author: {
      name: "o-ga09",
      link: "https://o-ga09.dev/about",
    },
  });

  // ブログ記事をフィードに追加
  blogPosts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `https://o-ga09.dev/blog/${post.id}`,
      link: `https://o-ga09.dev/blog/${post.id}`,
      description: post.description,
      date: new Date(post.date),
      category: post.tags.map((tag) => ({ name: tag })),
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
