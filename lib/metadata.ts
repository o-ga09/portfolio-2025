import { Metadata } from "next";

const APP_URL = process.env.NEXT_PUBLIC_FRONT_URL || "http://localhost:3000";
const SITE_NAME = "オーガのブログ";
const DEFAULT_OG_IMAGE = `${APP_URL}/og-image.webp`;
const CREATOR = "@o-ga09";

interface GenerateMetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string | string[];
  ogType?: "website" | "article";
  publishedTime?: string;
  tags?: string[];
  ogImage?: string;
}

/**
 * 共通のメタデータを生成するユーティリティ関数
 */
export function generateSiteMetadata({
  title,
  description,
  path,
  keywords,
  ogType = "website",
  publishedTime,
  tags,
  ogImage = DEFAULT_OG_IMAGE,
}: GenerateMetadataOptions): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const url = `${APP_URL}${path}`;
  const keywordsString = Array.isArray(keywords)
    ? keywords.join(", ")
    : keywords;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    ...(keywordsString && { keywords: keywordsString }),
    authors: [{ name: CREATOR }],
    creator: CREATOR,
    publisher: CREATOR,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: ogType,
      locale: "ja_JP",
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(tags && { tags }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: CREATOR,
      site: CREATOR,
    },
  };

  return metadata;
}

/**
 * ブログ記事用のメタデータを生成
 */
export function generateBlogPostMetadata(
  post: {
    title: string;
    description: string;
    tags: string[];
    date: string;
  },
  id: string
): Metadata {
  // 動的OG画像のURLを使用
  const ogImageUrl = `${APP_URL}/blog/${id}/opengraph-image`;

  return generateSiteMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${id}`,
    keywords: post.tags,
    ogType: "article",
    publishedTime: post.date,
    tags: post.tags,
    ogImage: ogImageUrl,
  });
}

/**
 * タグページ用のメタデータを生成
 */
export function generateTagMetadata(
  tag: string,
  normalizedTag: string
): Metadata {
  return generateSiteMetadata({
    title: `${normalizedTag} に関する記事`,
    description: `${normalizedTag} のタグが付いた記事の一覧`,
    path: `/tags/${encodeURIComponent(tag)}`,
    keywords: `${normalizedTag}, ブログ, 技術記事`,
  });
}

/**
 * ブログ一覧ページ用のメタデータ
 */
export const blogListMetadata: Metadata = generateSiteMetadata({
  title: "ブログ",
  description: "技術記事やQiita、Zennの記事を紹介しています。",
  path: "/blog",
  keywords: "ブログ, 技術記事, Qiita, Zenn, プログラミング",
});

/**
 * タグ一覧ページ用のメタデータ
 */
export const tagsListMetadata: Metadata = generateSiteMetadata({
  title: "タグ一覧",
  description: "ブログ記事のタグ一覧",
  path: "/tags",
  keywords: "タグ, ブログ, 記事検索",
});

/**
 * アーカイブページ用のメタデータ
 */
export const archiveMetadata: Metadata = generateSiteMetadata({
  title: "ブログアーカイブ",
  description: "過去のブログ記事のアーカイブ",
  path: "/blog/archive",
  keywords: "アーカイブ, ブログ, 過去記事",
});

/**
 * About ページ用のメタデータ
 */
export const aboutMetadata: Metadata = generateSiteMetadata({
  title: "About Me",
  description:
    "オーガの自己紹介ページ。経歴、スキル、趣味などを紹介しています。",
  path: "/about",
  keywords: "自己紹介, プロフィール, エンジニア, バックエンド",
});

/**
 * About Details ページ用のメタデータ
 */
export const aboutDetailsMetadata: Metadata = generateSiteMetadata({
  title: "詳細プロフィール",
  description:
    "オーガの詳細プロフィール。略歴、資格、スキル、趣味、プロダクトなどの詳細情報。",
  path: "/about/details",
  keywords: "プロフィール, 略歴, 資格, スキル, 趣味, プロダクト",
});

/**
 * 検索ページ用のメタデータ
 */
export const searchMetadata: Metadata = generateSiteMetadata({
  title: "検索",
  description: "ブログ記事を検索",
  path: "/search",
  keywords: "検索, ブログ, 記事検索",
});

/**
 * ホームページ用のメタデータ（ルートレイアウト用）
 */
export function generateHomeMetadata(): Metadata {
  const baseMetadata = generateSiteMetadata({
    title: "オーガの自己紹介サイト",
    description:
      "オーガの自己紹介サイトへようこそ！ここでは、オーガの趣味や特技、好きなこと、技術ブログについて紹介しています。",
    path: "/",
    keywords:
      "オーガ, 自己紹介, 趣味, 特技, 技術ブログ, プログラミング, ゲーム開発, 音楽制作, 旅行記",
  });

  // ホームページ専用の追加設定
  return {
    ...baseMetadata,
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_FRONT_URL || "http://localhost:3000"
    ),
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
}
