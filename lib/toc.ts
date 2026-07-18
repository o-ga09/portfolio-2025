export type TocItem = {
  id: string;
  text: string;
  level: number;
};

// zenn-markdown-html が出力する h2〜h4 の id 属性はパーセントエンコード済みの
// 文字列がそのままリテラルで入る（ブラウザはid属性値をデコードしないため、
// href="#id" と getElementById(id) で同じリテラル文字列を使えば一致する）。
const HEADING_REGEX = /<h([2-4])[^>]*\sid="([^"]*)"[^>]*>([\s\S]*?)<\/h\1>/g;

export function extractHeadings(html: string): TocItem[] {
  const items: TocItem[] = [];

  for (const match of html.matchAll(HEADING_REGEX)) {
    const level = Number(match[1]);
    const id = match[2];
    const text = match[3]
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();

    if (!id || !text) continue;
    items.push({ id, text, level });
  }

  return items;
}
