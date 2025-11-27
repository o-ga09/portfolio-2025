import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPost } from "./blog-data";

// contentsディレクトリからマークダウンファイルを読み込む
export function loadMarkdownPosts(): BlogPost[] {
  // サーバーサイドでのみ実行
  if (typeof window !== "undefined") {
    return [];
  }

  const contentsDir = path.join(process.cwd(), "contents");

  // contentsディレクトリが存在しない場合は空配列を返す
  if (!fs.existsSync(contentsDir)) {
    return [];
  }

  const files = fs.readdirSync(contentsDir);
  const markdownFiles = files.filter((file) => file.endsWith(".md"));

  const posts: BlogPost[] = markdownFiles.map((filename) => {
    const filePath = path.join(contentsDir, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    // ファイル名から日付を抽出（YYYY-MM-DD-slug.md形式の場合）
    // それ以外の場合はファイル名をIDとして使用
    const slug = filename.replace(/\.md$/, "");
    const dateMatch = slug.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/);
    const id = dateMatch ? dateMatch[2] : slug;
    const date = dateMatch
      ? dateMatch[1]
      : data.date || new Date().toISOString().split("T")[0];

    // imageTypeをランダムに割り当て（または固定）
    const imageTypes: Array<"green" | "orange" | "black"> = [
      "green",
      "orange",
      "black",
    ];
    const imageType = imageTypes[Math.floor(Math.random() * imageTypes.length)];

    return {
      id,
      title: data.title || slug,
      description: data.description || content.substring(0, 100) + "...",
      date,
      content,
      imageType,
      tags: data.topics || data.tags || [],
      type: "blog" as const,
    };
  });

  // 日付でソート（新しい順）
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
