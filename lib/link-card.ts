import "server-only";

const OGP_FETCH_TIMEOUT_MS = 5000;

interface OgpData {
  title: string;
  description?: string;
  image?: string;
  siteName?: string;
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&amp;/g, "&");
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function extractMetaContent(html: string, key: string): string | undefined {
  const patterns = [
    new RegExp(`<meta[^>]+(?:property|name)=["']${key}["'][^>]*content=["']([^"']*)["'][^>]*>`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]*(?:property|name)=["']${key}["'][^>]*>`, "i"),
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) return decodeHtmlEntities(match[1]);
  }
  return undefined;
}

function extractTitleTag(html: string): string | undefined {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match ? decodeHtmlEntities(match[1].trim()) : undefined;
}

// マークダウン本文中で、行全体がURLのみの段落を抽出する
// (zenn-markdown-htmlのlinkify-to-cardが変換対象とするのと同じ条件)
export function extractStandaloneUrls(markdown: string): string[] {
  const lines = markdown.split("\n");
  const urls = new Set<string>();
  const urlLineRegex = /^https?:\/\/\S+$/;
  let inFence = false;

  for (const rawLine of lines) {
    const trimmed = rawLine.trim();
    if (trimmed.startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    if (urlLineRegex.test(trimmed)) {
      urls.add(trimmed);
    }
  }

  return Array.from(urls);
}

export async function fetchOgp(url: string): Promise<OgpData | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), OGP_FETCH_TIMEOUT_MS);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; LinkCardBot/1.0)",
      },
    });
    clearTimeout(timeoutId);

    if (!res.ok) return null;
    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html")) return null;

    const html = await res.text();
    const title = extractMetaContent(html, "og:title") ?? extractTitleTag(html) ?? url;
    const description = extractMetaContent(html, "og:description") ?? extractMetaContent(html, "description");
    const image = extractMetaContent(html, "og:image");
    const siteName = extractMetaContent(html, "og:site_name");

    return { title, description, image, siteName };
  } catch {
    return null;
  }
}

export async function buildLinkCardMap(markdown: string): Promise<Map<string, OgpData | null>> {
  const urls = extractStandaloneUrls(markdown);
  const entries = await Promise.all(urls.map(async (url) => [url, await fetchOgp(url)] as const));
  return new Map(entries);
}

export function renderLinkCard(url: string, ogp: OgpData | null): string {
  let hostname = url;
  try {
    hostname = new URL(url).hostname;
  } catch {
    // URLとして不正な場合はそのまま表示
  }

  const title = escapeHtml(ogp?.title ?? url);
  const siteName = escapeHtml(ogp?.siteName ?? hostname);
  const favicon = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(hostname)}&sz=32`;

  const descriptionHtml = ogp?.description
    ? `<span class="zenn-link-card-description">${escapeHtml(ogp.description)}</span>`
    : "";

  const thumbnailHtml = ogp?.image
    ? `<span class="zenn-link-card-thumbnail"><img class="zenn-link-card-thumbnail-img" src="${escapeHtml(
        ogp.image,
      )}" alt="" loading="lazy" /></span>`
    : "";

  // markdown-itはこのHTMLを<p>の中に埋め込むため、<p>に許可されないdiv等の
  // ブロック要素を使うとブラウザのHTMLパーサーがタグを分割してしまう。
  // そのためspan(インライン要素)のみで構成し、レイアウトはCSSのdisplay:flexで行う。
  return (
    `<a href="${escapeHtml(url)}" class="zenn-link-card" target="_blank" rel="noreferrer noopener nofollow">` +
    `<span class="zenn-link-card-body">` +
    `<span class="zenn-link-card-title">${title}</span>` +
    descriptionHtml +
    `<span class="zenn-link-card-domain"><img class="zenn-link-card-favicon" src="${favicon}" alt="" loading="lazy" />${siteName}</span>` +
    `</span>` +
    thumbnailHtml +
    `</a>`
  );
}
