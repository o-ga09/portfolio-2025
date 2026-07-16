# ブログ記事の書き方

`contents/` ディレクトリに Markdown ファイルを追加することで、ブログ記事を投稿できます。

## 1. ファイルを作成する

`contents/` 配下に、以下の命名規則でファイルを作成します。

```
YYYY-MM-DD-slug.md
```

- `YYYY-MM-DD`: 投稿日（記事の日付として表示されます）
- `slug`: 記事のID（URL `/blog/<slug>` になります）

例: `contents/2026-07-14-my-first-post.md` → `/blog/my-first-post`

日付なしのファイル名（例: `contents/my-post.md`）でも動作しますが、その場合は
`id` がファイル名そのものになり、日付はフロントマターの `date` か「今日の日付」が使われます。
基本的には日付付きファイル名を使ってください。

## 2. フロントマターを書く

ファイル先頭に YAML フロントマターを書きます。

```yaml
---
title: "記事のタイトル"
description: "記事の概要説明"
date: "2026-07-14"
tags: ["React", "TypeScript"]
---
ここに本文をMarkdownで書きます。
```

| フィールド    | 必須 | 説明                                                                                                                    |
| ------------- | ---- | ----------------------------------------------------------------------------------------------------------------------- |
| `title`       | 任意 | 未指定の場合はファイル名（slug）がタイトルになります                                                                    |
| `description` | 任意 | 未指定の場合は本文冒頭100文字が使われます                                                                               |
| `date`        | 任意 | ファイル名に日付が含まれていればそちらが優先されます                                                                    |
| `tags`        | 任意 | タグ一覧・`/tags/[tag]` ページのフィルタに使われます。`topics` でも可（Zenn形式との互換のため `topics` が優先されます） |

`type`, `emoji`, `published` などZenn形式の他のフィールドを書いても無視されるだけで害はありません。

## 3. 本文を書く

本文は [Zenn Markdown](https://zenn.dev/zenn/articles/markdown-guide) 記法（`zenn-markdown-html`）でレンダリングされます。
通常のMarkdownに加えて、`:::message` などZenn特有の記法も使えます。

## 4. ローカルでプレビューする

記事データは実行時に `contents/` を直接読むのではなく、ビルド時に
`scripts/generate-posts.js` が `public/posts.json` を生成し、それを静的にimportして表示しています
（`lib/markdown-loader.ts`）。そのため **`.md` ファイルを追加/編集しただけでは `npm run dev` に反映されません。**

記事を追加・編集したら、以下を実行してから確認してください。

```bash
node scripts/generate-posts.js   # contents/*.md → public/posts.json を再生成
npm run dev                      # devサーバーを起動 (すでに起動中なら再起動)
```

`http://localhost:3000/blog` で一覧に表示されること、`http://localhost:3000/blog/<slug>` で詳細ページが正しく表示されることを確認してください。

`public/posts.json` は `.gitignore` 対象のビルド生成物なので、コミットする必要はありません
（`npm run build` / `npm run build:cloudflare` の `prebuild` で自動生成されます）。

## 5. PRを作成する

1. `contents/YYYY-MM-DD-slug.md` を追加
2. 上記の手順でローカル確認
3. `contents/` の追加ファイルのみをコミット（`public/posts.json` はコミット不要）してPRを作成

## 既知の制限

サイト自身のRSSフィード（`/api/feed`）は現状、`contents/` のMarkdown記事を含みません。外部サービス（Qiita/Zenn/Speaker Deck）向けの記事のみが対象です。

## 関連ドキュメント

- Google スライドの登録方法（`public/slides.json`）は [README.md](../README.md#-ブログスライド管理) を参照してください
- Qiita / Zenn / Speaker Deck の外部記事自動取得については [README.md](../README.md#-ブログスライド管理) を参照してください
