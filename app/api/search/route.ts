import { NextRequest, NextResponse } from "next/server";
import { getAllPosts } from "@/lib/blog-data";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q") || "";

  if (!query.trim()) {
    return NextResponse.json([]);
  }

  const posts = await getAllPosts();
  const searchQuery = query.toLowerCase();

  const results = posts
    .map((post) => {
      const matches: string[] = [];
      const titleMatch = post.title.toLowerCase().includes(searchQuery);
      const descMatch = post.description.toLowerCase().includes(searchQuery);
      const tagMatch = post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery)
      );
      const contentMatch = post.content?.toLowerCase().includes(searchQuery);

      if (titleMatch) matches.push("タイトル");
      if (descMatch) matches.push("説明");
      if (tagMatch) matches.push("タグ");
      if (contentMatch) matches.push("本文");

      return {
        ...post,
        matches,
      };
    })
    .filter((post) => post.matches.length > 0);

  return NextResponse.json(results);
}
