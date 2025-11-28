import "server-only";
import { BlogPost } from "./blog-data";
import postsData from "@/public/posts.json";

// マークダウンファイルを読み込む
// Cloudflare Workers環境では、ビルド時に生成されたJSONから読み込む
export function loadMarkdownPosts(): BlogPost[] {
  // サーバーサイドでのみ実行
  if (typeof window !== "undefined") {
    return [];
  }

  try {
    // ビルド時に生成されたposts.jsonから読み込む
    // public/posts.jsonはビルド時にscripts/generate-posts.jsによって生成される
    return postsData as BlogPost[];
  } catch (error) {
    console.error("Error loading posts from JSON:", error);
    return [];
  }
}
