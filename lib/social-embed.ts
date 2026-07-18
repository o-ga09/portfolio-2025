// ブログMarkdown中に単独行で貼られたX(Twitter)・Instagram・TikTok・YouTubeのURLを
// 埋め込みプレイヤー/カードのHTMLに変換する。
//
// zenn-markdown-htmlは単独行のURLを自動でlinkify-to-cardの仕組みに通し、
// - X(Twitter)の投稿URLは customEmbed.tweet
// - YouTubeの通常URL(youtube.com/watch, youtu.be)は customEmbed.youtube
// - それ以外は customEmbed.card
// にディスパッチする。tweetとyoutube(通常URL)はzenn側の判定・呼び出しに乗るため、
// ここではHTML生成のみを担当する。Instagram・TikTok・YouTube Shorts はzenn側に
// 判定ロジックがないため、URL判定もこのモジュールで行い customEmbed.card から呼び出す。

const TWEET_URL_REGEX = /^https:\/\/(?:twitter|x)\.com\/[a-zA-Z0-9_-]+\/status\/\d+/;
const INSTAGRAM_URL_REGEX = /^https:\/\/(?:www\.)?instagram\.com\/(p|reel|tv)\/([a-zA-Z0-9_-]+)/;
const TIKTOK_URL_REGEX = /^https:\/\/(?:www\.)?tiktok\.com\/@[\w.-]+\/video\/(\d+)/;
const YOUTUBE_SHORTS_URL_REGEX = /^https:\/\/(?:www\.)?youtube\.com\/shorts\/([\w-]{11})/;

function escapeAttribute(value: string): string {
  return value.replace(/"/g, "%22");
}

function renderYoutubeEmbed(videoId: string): string {
  return (
    `<span class="embed-block embed-youtube">` +
    `<iframe src="https://www.youtube-nocookie.com/embed/${videoId}" ` +
    `allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ` +
    `allowfullscreen loading="lazy"></iframe></span>`
  );
}

function renderTweetEmbed(url: string): string {
  // Twitter/XはウィジェットJSなしで単体のiframe埋め込みができないため、
  // 静的サイトの埋め込みに広く使われているtwitframe.com経由でレンダリングする。
  const src = `https://twitframe.com/show?url=${encodeURIComponent(url)}`;
  return (
    `<span class="embed-block embed-tweet">` +
    `<iframe src="${escapeAttribute(src)}" style="width:100%;height:600px;border:none;overflow:hidden" ` +
    `scrolling="no" frameborder="0" loading="lazy"></iframe></span>`
  );
}

function renderInstagramEmbed(path: string, shortcode: string): string {
  const src = `https://www.instagram.com/${path}/${shortcode}/embed/captioned/`;
  return (
    `<span class="embed-block embed-instagram">` +
    `<iframe src="${escapeAttribute(src)}" style="width:100%;max-width:540px;height:680px;border:none;overflow:hidden" ` +
    `scrolling="no" frameborder="0" loading="lazy" allowtransparency="true"></iframe></span>`
  );
}

function renderTiktokEmbed(videoId: string): string {
  const src = `https://www.tiktok.com/embed/v2/${videoId}`;
  return (
    `<span class="embed-block embed-tiktok">` +
    `<iframe src="${escapeAttribute(src)}" style="width:100%;max-width:325px;height:740px;border:none;overflow:hidden" ` +
    `scrolling="no" frameborder="0" loading="lazy" allowfullscreen></iframe></span>`
  );
}

// URLがX/Instagram/TikTok/YouTube Shortsのいずれかに一致すれば埋め込みHTMLを返す。
// 一致しなければnullを返し、呼び出し側で通常のリンクカード等にフォールバックする。
export function renderSocialEmbed(url: string): string | null {
  const tweetMatch = TWEET_URL_REGEX.test(url);
  if (tweetMatch) return renderTweetEmbed(url);

  const instagramMatch = url.match(INSTAGRAM_URL_REGEX);
  if (instagramMatch) return renderInstagramEmbed(instagramMatch[1], instagramMatch[2]);

  const tiktokMatch = url.match(TIKTOK_URL_REGEX);
  if (tiktokMatch) return renderTiktokEmbed(tiktokMatch[1]);

  const shortsMatch = url.match(YOUTUBE_SHORTS_URL_REGEX);
  if (shortsMatch) return renderYoutubeEmbed(shortsMatch[1]);

  return null;
}

export function isSocialEmbedUrl(url: string): boolean {
  return renderSocialEmbed(url) !== null;
}
