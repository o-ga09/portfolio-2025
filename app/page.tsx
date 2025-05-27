import Blog from "@/components/section/blog";
import Footer from "@/components/section/footer";
import Header from "@/components/section/header";
import Hero from "@/components/section/hero";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <Blog />
      <Footer />
    </div>
  );
}
