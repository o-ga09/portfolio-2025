import Blog from "@/components/section/blog";
import Footer from "@/components/section/footer";
import Header from "@/components/section/header";
import Hero from "@/components/section/hero";
import { getAllPosts } from "@/lib/blog-data";

export default async function HomePage() {
  const posts = await getAllPosts();
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Blog initialPosts={posts} />
      <Footer />
    </div>
  );
}
