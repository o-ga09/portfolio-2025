// ブログ記事のサムネイルに使用する絵文字のリスト
const BLOG_EMOJIS = [
  "📚",
  "💻",
  "🚀",
  "🎯",
  "💡",
  "🔧",
  "🎨",
  "📱",
  "🌟",
  "🔥",
  "⚡",
  "🔑",
  "🔒",
  "🔨",
  "⚙️",
  "🛠️",
  "🖥️",
  "⌨️",
  "🖱️",
  "📊",
  "📈",
  "📉",
  "💾",
  "📷",
  "🔬",
  "🔭",
  "🎓",
  "📝",
  "📄",
  "🌐",
  "🔐",
  "🧩",
  "🎮",
  "🎪",
  "🎭",
  "🏆",
  "🎖️",
  "🏅",
  "🎪",
  "✨",
  "💫",
  "🌈",
  "🎨",
  "🖼️",
  "🎬",
  "📹",
  "📺",
  "📻",
  "🔊",
  "🎵",
];

/**
 * 文字列からハッシュ値を生成する
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // 32bit整数に変換
  }
  return Math.abs(hash);
}

/**
 * 記事IDから一貫性のある絵文字を取得する
 * 同じIDは常に同じ絵文字を返す
 */
export function getEmojiForPost(postId: string): string {
  const hash = hashString(postId);
  const index = hash % BLOG_EMOJIS.length;
  return BLOG_EMOJIS[index];
}
