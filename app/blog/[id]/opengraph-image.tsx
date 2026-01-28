import { ImageResponse } from "next/og";
import { getPostById } from "@/lib/blog-data";
import fs from "fs";
import path from "path";

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

  // アイコン画像をbase64に変換
  const iconPath = path.join(process.cwd(), "public", "icon.png");
  const iconBuffer = fs.readFileSync(iconPath);
  const iconBase64 = `data:image/png;base64,${iconBuffer.toString("base64")}`;

  if (!post) {
    return new ImageResponse(
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
      </div>,
      {
        ...size,
      },
    );
  }

  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      {/* メインカード */}
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
      >
        {/* タイトル */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <h1
            style={{
              fontSize: 56,
              fontWeight: "bold",
              color: "#1a1a1a",
              margin: 0,
              lineHeight: 1.3,
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "flex",
            }}
          >
            {post.title}
          </h1>

          {/* タグと日付 */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {post.tags.slice(0, 3).map((tag) => (
              <div
                key={tag}
                style={{
                  background: "#f1f5f9",
                  color: "#475569",
                  padding: "6px 16px",
                  borderRadius: "6px",
                  fontSize: 20,
                  fontWeight: "500",
                  display: "flex",
                }}
              >
                #{tag}
              </div>
            ))}
            <div
              style={{
                color: "#94a3b8",
                fontSize: 20,
                marginLeft: "8px",
                display: "flex",
              }}
            >
              {post.date}
            </div>
          </div>
        </div>

        {/* 下部: ユーザー情報とサイト名 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid #f1f5f9",
            paddingTop: "24px",
          }}
        >
          {/* ユーザー情報 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            {/* アバター */}
            <img
              src={iconBase64}
              alt="o-ga"
              width="60"
              height="60"
              style={{
                borderRadius: "50%",
              }}
            />
            {/* ユーザー名 */}
            <div
              style={{
                fontSize: 24,
                fontWeight: "600",
                color: "#334155",
                display: "flex",
              }}
            >
              o-ga
            </div>
          </div>

          {/* サイト名/ロゴ */}
          <div
            style={{
              fontSize: 28,
              fontWeight: "bold",
              color: "#6366f1",
              display: "flex",
            }}
          >
            オーガのブログ
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
