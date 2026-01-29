import { BlogPost } from "./blog-data";

// Node.js Runtime用の軽量なgetPostById実装
// RSS feedの依存がないため、安全に動作します
export async function getPostById(id: string): Promise<BlogPost | undefined> {
  const { loadMarkdownPosts } = await import("./markdown-loader");
  const markdownPosts = loadMarkdownPosts();
  return markdownPosts.find((post: BlogPost) => post.id === id);
}
