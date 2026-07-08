import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getSlideById, getAllSlides } from "@/lib/slides-data";
import Header from "@/components/section/header";
import Footer from "@/components/section/footer";
import Link from "next/link";

// 静的パスを生成
export async function generateStaticParams() {
  const slides = await getAllSlides();

  return slides.map((slide) => ({
    id: slide.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const slide = await getSlideById(id);

  if (!slide) {
    return {
      title: "スライドが見つかりません",
    };
  }

  return {
    title: slide.title,
    description: slide.description,
    openGraph: {
      title: slide.title,
      description: slide.description,
      type: "website",
      url: `/slides/${id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: slide.title,
      description: slide.description,
    },
  };
}

export default async function SlidePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const slide = await getSlideById(id);

  if (!slide) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-grow container max-w-5xl mx-auto px-4 py-8">
        <article>
          <div className="mb-8">
            <h1
              className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
              style={{ viewTransitionName: `blog-title-${id}` }}
            >
              {slide.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <time dateTime={slide.date}>{slide.date}</time>
              <span
                className={`inline-flex items-center px-3 py-1 rounded text-sm font-medium ${
                  slide.source === "speakerdeck"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-sky-100 text-sky-800"
                }`}
              >
                {slide.source === "speakerdeck" ? "Speaker Deck" : "Google Slides"}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {slide.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag.toLowerCase()}`}
                  className="bg-secondary/50 text-secondary-foreground text-sm px-3 py-1 rounded hover:bg-secondary transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-8">{slide.description}</p>
          </div>

          {/* スライド埋め込み */}
          <div className="bg-card rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src={slide.embedUrl}
                className="absolute top-0 left-0 w-full h-full border-0"
                allowFullScreen
                allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                loading="lazy"
                title={slide.title}
              />
            </div>
          </div>

          {/* 外部リンク */}
          <div className="flex gap-4">
            <Button asChild>
              <a
                href={slide.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                元のスライドを開く
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link href="/blog">一覧に戻る</Link>
            </Button>
          </div>
        </article>
      </div>
      <Footer />
    </main>
  );
}
