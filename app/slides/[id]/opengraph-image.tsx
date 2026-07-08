import { getSlideById } from "@/lib/slides-data";
import { ImageResponse } from "next/og";

// Node.js Runtimeを使用
export const runtime = "nodejs";

export const alt = "Slide OG Image";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const slide = await getSlideById(id);

  if (!slide) {
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
        スライドが見つかりません
      </div>,
      {
        ...size,
      },
    );
  }

  // スライドのソースに応じた色を設定
  const gradientColor =
    slide.source === "speakerdeck"
      ? "linear-gradient(135deg, #9333ea 0%, #c084fc 100%)" // Purple gradient
      : "linear-gradient(135deg, #0ea5e9 0%, #60a5fa 100%)"; // Blue gradient

  return new ImageResponse(
    <div
      style={{
        background: gradientColor,
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
          {/* スライドアイコン */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "72px",
                height: "72px",
                background: slide.source === "speakerdeck" ? "#9333ea" : "#0ea5e9",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="3" y="6" width="18" height="12" rx="2" stroke="white" strokeWidth="2" />
                <path d="M7 19L12 16L17 19" stroke="white" strokeWidth="2" />
              </svg>
            </div>
            <div
              style={{
                background: slide.source === "speakerdeck" ? "#f3e8ff" : "#e0f2fe",
                color: slide.source === "speakerdeck" ? "#6b21a8" : "#075985",
                padding: "8px 20px",
                borderRadius: "8px",
                fontSize: 24,
                fontWeight: "600",
                display: "flex",
              }}
            >
              {slide.source === "speakerdeck" ? "Speaker Deck" : "Google Slides"}
            </div>
          </div>

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
            {slide.title}
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
            {slide.tags.slice(0, 3).map((tag) => (
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
                display: "flex",
                marginLeft: "auto",
              }}
            >
              {slide.date}
            </div>
          </div>
        </div>

        {/* フッター */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid #e2e8f0",
            paddingTop: "24px",
          }}
        >
          <div
            style={{
              fontSize: 24,
              color: "#64748b",
              display: "flex",
            }}
          >
            📊 Presentation Slides
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
