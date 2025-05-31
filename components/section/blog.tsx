import React from "react";
import { ViewTransitionsLink } from "@/lib/viewTransitonLink";
import { Button } from "@/components/ui/button";
import { getAllPosts } from "@/lib/blog-data";
import { truncate } from "@/lib/utils";

export default async function Blog() {
  const blogs = await getAllPosts();
  const latestPosts = [...blogs]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
            最新記事
          </h2>
          <div className="w-16 h-1 bg-primary"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <ViewTransitionsLink
              href={post.type !== "blog" ? post.url ?? "" : `/blog/${post.id}`}
              key={post.id}
              className="transition-transform hover:scale-105 duration-300"
              target={post.type !== "blog" ? "_blank" : undefined}
              rel={post.type !== "blog" ? "noopener noreferrer" : undefined}
            >
              <article className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <div
                  className="h-48 bg-gray-100 flex items-center justify-center relative overflow-hidden transform-gpu"
                  style={{
                    viewTransitionName: `blog-image-${post.id}`,
                    contain: "layout paint",
                  }}
                >
                  {post.imageType === "green" && (
                    <div className="w-32 h-24 relative">
                      <div className="absolute inset-0 bg-green-200 rounded-t-3xl"></div>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-28 h-16 bg-white rounded-full"></div>
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-12 bg-pink-100 rounded-full"></div>
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-8 bg-pink-200 rounded-full"></div>
                    </div>
                  )}
                  {post.imageType === "orange" && (
                    <div className="w-32 h-32 relative">
                      <div className="absolute inset-0 bg-orange-400 rounded-full"></div>
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-28 h-4 bg-orange-300 rounded-full"></div>
                      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-24 h-3 bg-green-400 rounded-full"></div>
                      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-20 h-8 bg-amber-800 rounded-full"></div>
                      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-18 h-6 bg-yellow-300 rounded-full"></div>
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-28 h-8 bg-orange-300 rounded-full"></div>
                    </div>
                  )}
                  {post.imageType === "black" && (
                    <div className="w-32 h-32 relative">
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-16 bg-white rounded-t-full"></div>
                      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-black rounded-full"></div>
                      <div className="absolute bottom-12 right-8 w-4 h-4 bg-red-500 rounded-full"></div>
                      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-gray-800 rounded-full"></div>
                      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-orange-400 rounded-full"></div>
                    </div>
                  )}
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center mb-2 text-xs text-muted-foreground space-x-2">
                    <time dateTime={post.date}>{post.date}</time>
                    {post.type !== "blog" && (
                      <>
                        <span>•</span>
                        <span className="flex items-center">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                              post.type === "qiita"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {post.type === "qiita" ? "Qiita" : "Zenn"}
                          </span>
                          {post.likes && (
                            <span className="ml-2 flex items-center text-gray-500">
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                              </svg>
                              {post.likes}
                            </span>
                          )}
                        </span>
                      </>
                    )}
                  </div>
                  <h3
                    className="text-xl font-semibold text-gray-900 dark:text-white mb-2"
                    style={{ viewTransitionName: `blog-title-${post.id}` }}
                  >
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">
                    {truncate(post.description, 100)}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-secondary/50 text-secondary-foreground text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </ViewTransitionsLink>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild>
            <ViewTransitionsLink href="/blog/archive">
              過去の記事をすべて見る
            </ViewTransitionsLink>
          </Button>
        </div>
      </div>
    </section>
  );
}
