# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 回答について

- 回答は日本語で生成すること。

## プロジェクト概要

Next.js 15 (App Router) 製のポートフォリオサイト。Cloudflare Workers (`@opennextjs/cloudflare`) 上にデプロイされる。Aboutページ、ブログ・スライド一覧、タグ検索などを提供する。

## よく使うコマンド

- 開発サーバー起動: `npm run dev`
- Lint: `npm run lint`（自動修正: `npm run lint:fix`、oxlint使用）
- フォーマット: `npm run format`（チェックのみ: `npm run format:check`、oxfmt使用）
- 型チェック: `npm run typecheck`（`tsc --noEmit`、`typescript-native` パッケージ経由）
- テスト全実行: `npm test`（`vitest run --passWithNoTests`）
- テスト単体実行: `npx vitest run lib/github-alert.test.ts`（テスト名で絞る場合は `npx vitest run -t "<テスト名>"`）
- テストwatch/UI/カバレッジ: `npm run test:watch` / `npm run test:ui` / `npm run test:coverage`
- 本番ビルド: `npm run build`（`prebuild` で `scripts/generate-posts.js` と `scripts/generate-icon-base64.js` が先に走る）
- Cloudflare向けビルド: `npm run build:cloudflare`
- Cloudflareへのデプロイ/プレビュー: `npm run deploy` / `npm run preview`
- Cloudflare型定義の再生成（`cloudflare-env.d.ts`）: `npm run cf-typegen`
- ブログ記事frontmatterのバリデーション: `npm run validate:posts`
- 記事本文の日本語文章チェック: `npm run lint:text`（textlint、`contents/**/*.md` 対象）

コミット前には `npm run build` を通し、ビルドが成功することを確認する。

## アーキテクチャ

### ブログコンテンツのビルドパイプライン

- ブログ記事の実体は `contents/*.md`（Zenn Markdown記法、YAMLフロントマター付き）。ページは `contents/` を実行時に直接読むのではなく、ビルド前処理 `scripts/generate-posts.js` が `contents/` を走査して `public/posts.json` を生成し、`lib/markdown-loader.ts` がそれを静的importして各ページに供給する。
  - **`.md` を追加/編集しただけでは `npm run dev` に反映されない。** `node scripts/generate-posts.js` を手動実行してから確認する。手順の詳細は `docs/blog-authoring.md` を参照。
  - `public/posts.json` はビルド生成物であり `.gitignore` 対象。コミット不要。
- 外部記事（Qiita/Zenn）とスライド（Speaker Deck）はブログ一覧に統合表示される。フィードURLは `lib/external-articles.ts` に定義され、`lib/rss-feed.ts` がRSS/Atomをパースする（10分キャッシュ）。Googleスライドは自動取得できないため `public/slides.json` を手動編集して登録する。
- `lib/blog-data.ts` が通常のデータ取得ロジック、`lib/blog-data-edge.ts` はRSS feed依存を持たない軽量版で、Edge/Node.js制約が厳しいコンテキスト（例: `app/blog/[id]/opengraph-image.tsx`）から使い分けて呼ばれる。

### デプロイターゲット（Cloudflare Workers）

- `next build` の出力を `@opennextjs/cloudflare`（設定: `open-next.config.ts`）がWorkers向けに変換し、`wrangler.jsonc` の設定に従って `.open-next/worker.js` をエントリポイントとしてデプロイする。
- `postbuild` / `copy:contents` スクリプトが `contents/` ディレクトリをビルド成果物側（`.next/standalone` または `.open-next/server-functions/default`）にコピーする。Workers実行環境が記事本文を読めるようにするための処理。

### ディレクトリ構成（主要なもののみ）

- `app/`: Next.js App Router。`app/blog`, `app/slides`, `app/tags/[tag]`, `app/recap/[year]`, `app/about/details` などがページ。`app/api/feed`（RSS配信）と `app/api/search`（検索API）がAPI Route。
- `lib/`: データ取得・変換ロジック（上記の `blog-data*`, `markdown-loader.ts`, `external-articles.ts`, `rss-feed.ts`, `slides-data.ts`, `toc.ts`, `metadata.ts`, `github-alert.ts` など）。
- `components/`: `section/`（ページ内セクション単位）, `ui/`（shadcn/ui系プリミティブ）, `icons/`, `item/`, `theme/`。
- `contents/`: ブログ記事のMarkdownソース（Git管理対象、ビルド生成物ではない）。
- `scripts/`: ビルド前処理・バリデーション用Node.jsスクリプト。

### テスト

- Vitest + Testing Library + jsdom（設定: `vitest.config.ts`, `vitest.setup.ts`）。テストファイルは `**/*.{test,spec}.{ts,tsx}` に配置する（例: `lib/github-alert.test.ts`）。
- アクセシビリティテストには `jest-axe` を使用する。

## Worktree運用ルール（必須）

Claude Codeの複数セッションが同じ作業ツリーを同時に編集して競合するのを防ぐため、
機能追加・修正作業は必ず `git-wt` で作成したworktree内で行う。

### ルール

1. **作業開始前**: 対象ブランチで `git wt <branch名>` を実行し、worktreeを作成/切り替えてから作業する。
   - 新規ブランチなら自動で作成される。
   - `git wt <branch名> <start-point>`（例: `origin/main`）で起点を指定できる。
   - **worktreeを新規作成する際は、起点にする前に必ず `git fetch origin` などで最新化してから作成する**（古いコミットを起点にした乖離・不要なコンフリクトを防ぐため）。
2. **作業中**: そのworktreeのディレクトリ内でコード編集・コミットを行う。
3. **PR作成完了後**: レビュー対応などで追加コミットの予定がなければ、`git wt -d <branch名>` でworktreeとブランチを削除する。
   - 未コミットの変更がある場合は `-d` が拒否するので、先にコミット/pushしてから削除する。

### 技術的な強制

- `.claude/settings.json` の `PreToolUse` フック（`.claude/hooks/worktree-guard.sh`）が、
  メイン作業ツリー（`/Users/taichi/src/portfolio-2025` 本体）への `Edit`/`Write`/`MultiEdit` を機械的にブロックする。
  `.claude/` 配下とこの `CLAUDE.md` 自体は運用ルールのメンテ用に例外とする。
- `gh pr create` またはGitHub MCPの `create_pull_request` を実行すると、`PostToolUse` フックが
  「worktree削除を忘れていないか」のリマインダーをコンテキストに注入する（自動削除はしない。安全確認は都度自分で行う）。

### 例外

- `.claude/`・`CLAUDE.md` の直接編集（このポリシー自体の保守）はメイン作業ツリーでも許可されている。
