/**
 * 数値をフォーマットする関数
 * @param value - フォーマットする数値
 * @param locale - ロケール (デフォルト: 'ja-JP')
 * @param options - Intl.NumberFormatオプション
 * @returns フォーマットされた数値文字列
 */
export function formatNumber(
  value: number,
  locale: string = "ja-JP",
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * 日付をフォーマットする関数
 * @param date - フォーマットする日付
 * @param locale - ロケール (デフォルト: 'ja-JP')
 * @param options - Intl.DateTimeFormatオプション
 * @returns フォーマットされた日付文字列
 */
export function formatDate(
  date: Date,
  locale: string = "ja-JP",
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
): string {
  return new Intl.DateTimeFormat(locale, options).format(date);
}

/**
 * テキストを省略する関数
 * @param text - 省略するテキスト
 * @param maxLength - 最大文字数
 * @param suffix - 省略記号 (デフォルト: '...')
 * @returns 省略されたテキスト
 */
export function truncateText(
  text: string,
  maxLength: number,
  suffix: string = "..."
): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + suffix;
}
