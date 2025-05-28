import { Metadata } from "next";
import Blog from "@/components/section/blog";
import Header from "@/components/section/header";
import Footer from "@/components/section/footer";

export const metadata: Metadata = {
  title: "ブログ | ポートフォリオ",
  description: "私のブログ記事のコレクション",
};

export default function BlogPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <Header />
      <h1 className="text-4xl font-bold mb-8">ブログ</h1>
      <Blog />
      <Footer />
    </main>
  );
}
