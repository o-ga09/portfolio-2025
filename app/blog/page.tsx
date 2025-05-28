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
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex-grow">
        <Blog />
      </div>
      <Footer />
    </main>
  );
}
