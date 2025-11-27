import { ImageResponse } from "next/og";
import { getPostById } from "@/lib/blog-data";

// Node.js Runtimeを使用してfs/pathモジュールにアクセス可能にする
export const runtime = "nodejs";

export const alt = "Blog Post OG Image";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 48,
            background: "linear-gradient(to bottom right, #1e293b, #334155)",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          記事が見つかりません
        </div>
      ),
      {
        ...size,
      }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* タイトル */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              fontSize: 64,
              fontWeight: "bold",
              color: "white",
              margin: 0,
              lineHeight: 1.2,
              textShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
              maxWidth: "1000px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {post.title}
          </h1>
        </div>

        {/* 下部情報 */}
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* タグ */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              maxWidth: "700px",
            }}
          >
            {post.tags.slice(0, 4).map((tag) => (
              <div
                key={tag}
                style={{
                  background: "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(10px)",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "9999px",
                  fontSize: 24,
                  fontWeight: "600",
                }}
              >
                {tag}
              </div>
            ))}
          </div>

          {/* サイト名と日付 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "8px",
            }}
          >
            <div
              style={{
                fontSize: 32,
                fontWeight: "bold",
                color: "white",
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
              }}
            >
              オーガのブログ
            </div>
            <div
              style={{
                fontSize: 24,
                color: "rgba(255, 255, 255, 0.9)",
              }}
            >
              {post.date}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
