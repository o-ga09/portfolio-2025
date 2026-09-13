import { describe, it, expect } from "vitest";
import { renderSocialEmbed, isSocialEmbedUrl } from "./social-embed";

describe("renderSocialEmbed", () => {
  it("returns null for a twitter.com status URL (twitframe.com embedding was removed)", () => {
    expect(renderSocialEmbed("https://twitter.com/jack/status/20")).toBeNull();
  });

  it("returns null for an x.com status URL (twitframe.com embedding was removed)", () => {
    expect(renderSocialEmbed("https://x.com/jack/status/20")).toBeNull();
  });

  it("embeds an Instagram post URL", () => {
    const html = renderSocialEmbed("https://www.instagram.com/p/Cabc123XYZ/");

    expect(html).toContain('class="embed-block embed-instagram"');
    expect(html).toContain("https://www.instagram.com/p/Cabc123XYZ/embed/captioned/");
  });

  it("embeds an Instagram reel URL", () => {
    const html = renderSocialEmbed("https://www.instagram.com/reel/Cabc123XYZ/");

    expect(html).toContain("https://www.instagram.com/reel/Cabc123XYZ/embed/captioned/");
  });

  it("embeds a TikTok video URL", () => {
    const html = renderSocialEmbed("https://www.tiktok.com/@zachking/video/6768504823336815877");

    expect(html).toContain('class="embed-block embed-tiktok"');
    expect(html).toContain("https://www.tiktok.com/embed/v2/6768504823336815877");
  });

  it("embeds a YouTube Shorts URL", () => {
    const html = renderSocialEmbed("https://www.youtube.com/shorts/dQw4w9WgXcQ");

    expect(html).toContain('class="embed-block embed-youtube"');
    expect(html).toContain("https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ");
  });

  it("returns null for an unrelated URL", () => {
    expect(renderSocialEmbed("https://example.com/article")).toBeNull();
  });

  it("returns null for a standard YouTube watch URL (handled by zenn-markdown-html itself)", () => {
    expect(renderSocialEmbed("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBeNull();
  });
});

describe("isSocialEmbedUrl", () => {
  it("returns true for a supported platform URL", () => {
    expect(isSocialEmbedUrl("https://x.com/jack/status/20")).toBe(true);
  });

  it("returns false for an unsupported URL", () => {
    expect(isSocialEmbedUrl("https://example.com")).toBe(false);
  });
});
