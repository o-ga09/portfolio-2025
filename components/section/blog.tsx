import React from "react";

export default function Blog() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            最新記事
          </h2>
          <div className="w-16 h-1 bg-primary"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Article 1 */}
          <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gray-100 flex items-center justify-center">
              <div className="w-32 h-24 relative">
                <div className="absolute inset-0 bg-green-200 rounded-t-3xl"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-28 h-16 bg-white rounded-full"></div>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-12 bg-pink-100 rounded-full"></div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-8 bg-pink-200 rounded-full"></div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                記事タイトル1
              </h3>
              <p className="text-gray-600 text-sm">
                記事の説明文がここに入ります。
              </p>
            </div>
          </article>

          {/* Article 2 */}
          <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gray-100 flex items-center justify-center">
              <div className="w-32 h-32 relative">
                <div className="absolute inset-0 bg-orange-400 rounded-full"></div>
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-28 h-4 bg-orange-300 rounded-full"></div>
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-24 h-3 bg-green-400 rounded-full"></div>
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-20 h-8 bg-amber-800 rounded-full"></div>
                <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-18 h-6 bg-yellow-300 rounded-full"></div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-28 h-8 bg-orange-300 rounded-full"></div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                記事タイトル2
              </h3>
              <p className="text-gray-600 text-sm">
                記事の説明文がここに入ります。
              </p>
            </div>
          </article>

          {/* Article 3 */}
          <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gray-100 flex items-center justify-center">
              <div className="w-32 h-32 relative">
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-16 bg-white rounded-t-full"></div>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-black rounded-full"></div>
                <div className="absolute bottom-12 right-8 w-4 h-4 bg-red-500 rounded-full"></div>
                <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-gray-800 rounded-full"></div>
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-orange-400 rounded-full"></div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                記事タイトル3
              </h3>
              <p className="text-gray-600 text-sm">
                記事の説明文がここに入ります。
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
