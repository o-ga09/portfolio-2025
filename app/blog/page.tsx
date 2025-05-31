import { Metadata } from "next";
import Blog from "@/components/section/blog";
import Header from "@/components/section/header";
import Footer from "@/components/section/footer";
import { getAllPosts } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "ブログ | ポートフォリオ",
  description: "私のブログ記事のコレクション",
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
