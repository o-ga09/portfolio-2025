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
//
// X(Twitter)投稿の埋め込みは、以前はtwitframe.com経由のiframeで行っていたが、
// twitframe.comのドメインが第三者に渡り無関係なドメインへ301リダイレクトされる
// ようになったことを確認したため廃止した(素性不明のiframeを読み込む状態になっていた)。
// X投稿URLはOGPリンクカード化の対象からは引き続き除外しつつ(isSocialEmbedUrl)、
// 埋め込み自体は行わずcustomEmbed.tweetのフォールバック(プレーンリンク)に委ねる。

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

function isTweetUrl(url: string): boolean {
  return TWEET_URL_REGEX.test(url);
}

// URLがInstagram/TikTok/YouTube Shortsのいずれかに一致すれば埋め込みHTMLを返す。
// X(Twitter)投稿URLはtwitframe.com廃止のため埋め込みを行わずnullを返す
// (呼び出し側のcustomEmbed.tweetがプレーンリンクにフォールバックする)。
// それ以外の一致しないURLもnullを返し、呼び出し側で通常のリンクカード等にフォールバックする。
export function renderSocialEmbed(url: string): string | null {
  if (isTweetUrl(url)) return null;

  const instagramMatch = url.match(INSTAGRAM_URL_REGEX);
  if (instagramMatch) return renderInstagramEmbed(instagramMatch[1], instagramMatch[2]);

  const tiktokMatch = url.match(TIKTOK_URL_REGEX);
  if (tiktokMatch) return renderTiktokEmbed(tiktokMatch[1]);

  const shortsMatch = url.match(YOUTUBE_SHORTS_URL_REGEX);
  if (shortsMatch) return renderYoutubeEmbed(shortsMatch[1]);

  return null;
}

// X投稿URLは埋め込み自体は行わないが、OGPリンクカード化の対象からは除外したい
// (どうせcustomEmbed.tweet側で処理されカード化されないOGP取得が無駄になるため)。
export function isSocialEmbedUrl(url: string): boolean {
  return isTweetUrl(url) || renderSocialEmbed(url) !== null;
}
