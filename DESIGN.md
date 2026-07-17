# Design System — ポップ＆ウォーム (Pop & Warm)

portfolio-2025（o-ga09 blog）のデザインシステムドキュメント。

> 参考: [azukiazusa.dev DESIGN.md](https://azukiazusa.dev/) の構成・粒度に合わせて作成。カラートークン・フォント・エフェクト方針はこのプロジェクト固有の実装をそのまま踏襲しています。

## 1. Design Philosophy

**ポップ＆ウォーム**とは、パステルカラーとやわらかい丸み、控えめなアニメーションで「山本彩推しソフトウェアエンジニア」の個人ブログらしい親しみやすさを表現する設計方針です。

4つの原則:

1. **やわらかい丸み** — カードやパネルは `rounded-lg` 以上、アバターやアイコンボタン・装飾ドットは `rounded-full`。角ばった印象を避ける
2. **淡いグラデーション＋影で奥行きを出す** — Hero やモバイルメニューなど「印象づけたい」領域には `bg-gradient-to-br` と `shadow-md`〜`shadow-2xl` を積極的に使う。奥行きを演出すること自体を否定しない
3. **絵文字とスタンプ的装飾** — ナビゲーションやスタンプコンポーネントなど、絵文字・回転（`rotate-*`）・弾むアニメーションでカジュアルさを出す
4. **抑制されたセマンティックカラー** — ブランドカラー（primary / secondary / accent）とステータスカラー（success / warning / error）を役割ごとに固定し、それ以外の色は Tailwind の標準パレット（gray, blue, indigo, pink 等）から用途に応じて選ぶ

---

## 2. Color Tokens

Tailwind v3 constructs（`tailwind.config.ts`）+ CSS カスタムプロパティ（`app/globals.css`, `styles/colors.css`）の二層構成です。azukiazusa.dev のような `@theme` (Tailwind v4) ではなく、shadcn/ui 由来の `:root` / `.dark` 変数切り替え方式を採用しています。

### Brand Colors（`tailwind.config.ts`）

```ts
primary:   { DEFAULT: "#B3DBD8", light: "#CBE8E6", dark: "#8DCCC8" } // 淡いティール
secondary: { DEFAULT: "#A8D1E7", light: "#C4E0EF", dark: "#7FB8D8" } // 淡いブルー
accent:    { DEFAULT: "#FFBFC5", light: "#FFCFD4", dark: "#FF9AA1" } // 淡いピンク
error:     { DEFAULT: "#FF4359", light: "#FF6B7C", dark: "#E02640" }
warning:   { DEFAULT: "#FF8A25", light: "#FFA24F", dark: "#E67000" }
success:   { DEFAULT: "#5EB95E", light: "#7CC97C", dark: "#4A9A4A" }
```

`bg-primary`, `text-accent`, `border-secondary-dark` のように Tailwind クラスとしてそのまま使用できます（azukiazusa.dev と異なりインラインスタイル不要）。

### Semantic Color Scale（shadcn 由来、`app/globals.css` の `:root` / `.dark`）

| Role                     | CSS 変数                     | 用途                                       |
| ------------------------ | ----------------------------- | ------------------------------------------ |
| **Page background**      | `--background`                | `bg-background`                            |
| **Page foreground**      | `--foreground`                | `text-foreground`（light: `--text-primary` を参照） |
| **Card / Surface**       | `--card` / `--card-foreground`| `bg-card`                                  |
| **Popover**               | `--popover`                   | `bg-popover`                               |
| **Muted surface / text** | `--muted` / `--muted-foreground` | `bg-muted`, `text-muted-foreground`     |
| **Border**                | `--border`                    | `border-border`（`*` セレクタでデフォルト適用済み） |
| **Ring (focus)**          | `--ring`                      | `focus-visible:ring-ring`                  |
| **Destructive**           | `--destructive`               | エラー系ボタン・警告表示                    |

light/dark とも oklch で定義（例: light `--background: oklch(1 0 0)`、dark `--background: oklch(0.145 0 0)`）。`.dark` クラスの付与で切り替わる（`ThemeProvider` が `class` 戦略）。

### Text Tokens（`styles/colors.css`）

```css
:root {
  --text-primary: oklch(0.1 0 0);
  --text-secondary: oklch(0.2 0 0);
  --text-muted: oklch(0.3 0 0);
}
.dark {
  --text-primary: oklch(1 0 0);
  --text-secondary: oklch(0.95 0 0);
  --text-muted: oklch(0.85 0 0);
}
```

現状 `--text-primary` は `--foreground` の参照元としてのみ使用。`--text-secondary` / `--text-muted` は未配線（今後 `text-secondary`/`text-muted` ユーティリティとして接続する余地あり）。

### Chart / Sidebar トークン

`--chart-1〜5`, `--sidebar*` は shadcn の初期セットアップに由来し、現状サイドバー UI・チャートは未使用。将来の拡張用に残置されている。

### 記事本文（Zenn 風マークダウン）の配色

`styles/zenn-markdown.css` はブランドカラーではなく、無彩色 oklch（`oklch(0.95 0 0)` など）と単一の情報色 `oklch(0.5 0.2 250)`（リンク）で構成。ブランドカラーを本文装飾に持ち込まないことで、記事コンテンツと UI Chrome を視覚的に分離している。

---

## 3. Typography

`app/layout.tsx` で `next/font/google` により自己ホスト。azukiazusa.dev のような `<link>` 経由の外部読み込みではなく、ビルド時にセルフホスト化される。

```ts
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
```

### Font Families

| 変数                 | フォント     | 用途                          |
| -------------------- | ------------ | ----------------------------- |
| `--font-geist-sans`  | Geist        | 本文・見出し共通（`antialiased` を body に付与） |
| `--font-geist-mono`  | Geist Mono   | コードブロック・日付等のメタ情報 |

見出し専用のディスプレイフォントは設定していない。`text-3xl font-bold` のようにウェイト・サイズのみで見出しの強弱を作る（azukiazusa.dev の Bricolage Grotesque のような別書体切り替えは行わない）。

**注意:** `--font-sans`（`app/globals.css` の `:root`）には `system-ui, -apple-system, ...` フォールバックスタックが定義済みだが、`body` は `geistSans.variable` 経由で実質 Geist が適用されるため、`system-ui` は主要ブラウザでは到達しない。ただし Windows 環境で Geist の読み込みが失敗した場合のフォールバックとして `system-ui` が使われる可能性がある点は留意する（日本語環境では游ゴシック UI が採用されうる）。

### Usage Guidelines

| Context                | Font       | Tailwind / Style                     |
| ----------------------- | ---------- | ------------------------------------- |
| ページ本文               | Geist Sans | (default)                             |
| 見出し（h1〜h3）          | Geist Sans | `font-bold` / `font-semibold` + サイズで強弱 |
| コードブロック・`<code>`  | Geist Mono | `font-mono`（`var(--font-mono)`）      |
| 日付・タグ・カウント等のメタ情報 | Geist Mono（コード）／Geist Sans（UI ラベル） | 記事メタは `<time>` + `text-xs text-muted-foreground` |

### 記事本文の設定（`styles/zenn-markdown.css` `.znc`）

| CSS プロパティ | 値                  | 効果                     |
| -------------- | ------------------- | ------------------------ |
| `font-size`    | `1rem`               | 本文サイズの基準         |
| `line-height`  | `1.8`（本文）/ `1.3〜1.5`（見出し） | 和文に配慮した広めの行間 |

### 日本語タイポグラフィの現状

azukiazusa.dev のような `font-kerning`, `text-autospace`, `font-feature-settings: "palt"`, `word-break: auto-phrase`, `hanging-punctuation` 等の日本語組版の細かい調整は **本プロジェクトでは未実装**。`lang="ja"` は `app/layout.tsx` の `<html>` に設定済みだが、`:lang(ja)` セレクタによるベタ組み・カーニング制御は行っていない。

#### 検討候補（未実装）

| CSS プロパティ                          | 効果                                                     | 優先度 |
| ---------------------------------------- | -------------------------------------------------------- | ------ |
| `font-kerning: none` (`:lang(ja)`)       | 本文のベタ組み化                                          | 中     |
| `font-feature-settings: "palt"`（見出し）| 見出しの約物プロポーショナル字詰め                        | 低     |
| `overflow-wrap: anywhere` / `line-break: strict` | 長い URL・英単語の折り返し制御                     | 中     |
| `text-wrap: balance`（見出し）           | 複数行見出しの行長バランス調整                            | 低     |

---

## 4. Shape & Radius

`--radius: 0.625rem`（10px）を基準に shadcn の `radius-sm/md/lg/xl` スケールを `calc()` で導出（`app/globals.css`）。実装上は Tailwind 標準の `rounded-*` ユーティリティを直接使用するケースが多く、azukiazusa.dev のように 2〜8px へ厳密統一する運用はしていない。

| Element                                              | Class                          |
| ----------------------------------------------------- | ------------------------------- |
| ボタン・input（デフォルト）                            | `rounded-md`                    |
| カード・記事サムネイル・コードブロック                  | `rounded-lg`                    |
| バッジ・インラインタグ                                  | `rounded`（極小）/ `rounded-md` |
| アイコンボタン・テーマトグル                            | `rounded-full`                  |
| アバター画像・装飾ドット・スタンプ                      | `rounded-full`                  |
| モバイルメニューパネル・QR モーダル（大きめのシート/カード） | `rounded-2xl`〜`rounded-3xl`  |

### 設計意図

小さな UI 部品（ボタン・入力・バッジ）は `rounded-md` 前後に抑え、カードは `rounded-lg`。一方でモバイルメニューやモーダルのような「画面上に浮かぶ大きな面」には `rounded-2xl`／`rounded-3xl` を使い、ソフトな質感を強調する。`rounded-full` は正円が意味を持つ要素（アバター・アイコンボタン・装飾ドット・スタンプ的バッジ）に限定する。

---

## 5. Spacing & Layout

- ページコンテナ: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`（Header / Hero / Blog セクション共通）
- 記事・詳細コンテンツ幅: `max-w-6xl`（記事本文）/ `max-w-5xl`（about 詳細等）/ `max-w-4xl`〜`max-w-3xl`（狭めのメタ情報・フォーム）
- セクション縦間隔: `py-12 lg:py-32`（Hero）/ `py-16 lg:py-24`（Blog 等の本文セクション）
- カードグリッド間隔: `gap-8`（`grid md:grid-cols-2 lg:grid-cols-3`）
- カード内余白: `p-6`
- 見出し下マージン: `mb-2`（タイトル直下）/ `mb-12`（セクション見出しブロック全体）

構造自体は azukiazusa.dev（`container mx-auto px-4` / `max-w-7xl`〜`max-w-5xl` / `gap-6〜8` / `p-5〜8`）とほぼ同じ余白スケール感を採用している。

---

## 6. Shadows & Depth

azukiazusa.dev とは方針が異なり、**本プロジェクトは影を積極的に使って柔らかい立体感を演出する**。

| 用途                                   | Shadow                          |
| --------------------------------------- | -------------------------------- |
| ボタン（`variant=default/secondary/outline` 等） | `shadow-xs`（cva 内で定義）  |
| ブログカード                             | `shadow-md`、hover 時 `shadow-xl`（`transition-all`） |
| Hero アバターフレーム・装飾ブロブ         | `shadow-xl` / `shadow-lg` / `shadow-md` |
| モバイルメニューパネル                    | `shadow-xl`                      |
| QR コードモーダル                         | `shadow-2xl`                     |

カードの `hover:shadow-xl` や画像の `hover:scale-105` のように、ホバー時に影・スケールで持ち上げる表現も採用している（azukiazusa.dev はこれを禁止しているが、本プロジェクトでは「ポップさ」の一部として許容する）。

---

## 7. Effects & Animation

azukiazusa.dev とは逆に、**グラデーション・ブラー・弾むアニメーションを個性として使う**方針。

**使用するエフェクト:**

- **グラデーション背景** — Hero (`bg-gradient-to-br from-primary/80 to-secondary/80`)、ブログカードのサムネイル領域、モバイルメニューの装飾レイヤーなど
- **`backdrop-blur`** — モバイルメニュー／QR モーダルのオーバーレイ、検索バーのフォーカス時強調
- **装飾ブロブ** — `rounded-full blur-xl` の半透明カラー円を `absolute` 配置し、奥行きを演出（Hero, モバイルメニュー）
- **カスタムキーフレームアニメーション**（`app/globals.css` / `tailwind.config.ts`）
  - `animate-stamp` — スタンプコンポーネントのバウンス演出
  - `animate-bounce-slow` / `animate-wobble` — 装飾要素のゆったりした揺れ
  - `animate-fadeIn` — フェードイン
- **hover 時のスケール・移動** — `hover:scale-105`（ブログカード画像）、`group-hover:translate-x-1`（メニュー項目のラベル）、`group-hover:scale-110`（メニューアイコン）
- **View Transitions** — `ViewTransitionsLink` によるブログ記事遷移（`viewTransitionName` で画像・タイトルを共有要素化）

**抑制する対象:**

- `transition-all` は Button のように影響範囲が明確な共通コンポーネントでのみ許容し、新規実装では `transition-colors` / `transition-transform` など対象を絞ることを推奨
- 常時ループする `animate-pulse` / `animate-ping` は「ユーザー操作へのフィードバック」（スタンプ押下時の波紋等）に限定し、常設装飾には使わない

---

## 8. Brand Color Usage

`primary` / `secondary` / `accent` はブランドカラーとして固定の役割を持つ。ステータス色（`success` / `warning` / `error`）は状態表現専用。

| Usage                          | Implementation                                                     |
| -------------------------------- | -------------------------------------------------------------------- |
| Hero 背景・強調グラデーション     | `bg-gradient-to-br from-primary/80 to-secondary/80`                  |
| Primary CTA ボタン                | `bg-accent/90 hover:bg-accent/80 text-accent-foreground`             |
| Secondary（アウトライン）ボタン    | `variant="outline"` + `border-accent/90` 等でアクセントを縁取りに使用 |
| セクション見出しのアンダーバー     | `w-16 h-1 bg-primary`                                                 |
| バッジ・タグの背景                | `bg-secondary/50 text-secondary-foreground`                          |
| 装飾ドット・ブロブ                 | `bg-accent/20`, `bg-secondary/20`（`blur-xl` と併用）                |
| 外部記事タイプのバッジ             | Qiita: green / Zenn: blue / Speaker Deck: purple / Slides: sky（Tailwind 標準色を使用、ブランドカラーとは独立） |

---

## 9. Component Patterns

### Card

```tsx
<article className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
```

### Primary Button（`variant="default"`, `components/ui/button.tsx`）

```tsx
<Button className="bg-accent/90 hover:bg-accent/80 text-accent-foreground shadow-md">
  Label
</Button>
```

### Secondary / Outline Button

```tsx
<Button variant="outline" className="border-accent/90 text-accent-foreground hover:bg-accent/20">
  Label
</Button>
```

### Icon Button

```tsx
<Button variant="ghost" size="icon" aria-label="RSS Feed">
  <Rss className="h-4 w-4" />
</Button>
```

### Inline Tag / Badge

```tsx
<span className="bg-secondary/50 text-secondary-foreground text-xs px-2 py-1 rounded">
  #tag
</span>
```

### 外部サービスタイプバッジ

```tsx
<span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
  Zenn
</span>
```

---

## 10. Accessibility

### 現状の実装パターン

- アイコンのみのボタンには `aria-label` を付与済み（RSS、SNS リンク、テーマ切替、メニュー開閉、QR モーダル閉じるボタン等）
- モーダル（QR コード）には `role="dialog"` `aria-modal="true"` `aria-label` を付与
- Button コンポーネントは `focus-visible:ring-ring/50 focus-visible:ring-[3px]` によりフォーカスリングを常に用意（`outline: none` にはしない）
- モバイルメニュー・QR モーダル表示中は `document.body.style.overflow = "hidden"` で背面スクロールを抑止
- 検索ボックスには `⌘/Ctrl + K` のキーボードショートカットを実装

### 今後意識すべき観点（コードレビュー時のチェックリスト）

- hover だけでなく `focus-visible` 時にも操作対象が明確に見えるか
- 現在地・選択中の状態（ナビゲーションのアクティブ状態等）が色だけに依存していないか（`aria-current="page"` の付与を検討）
- 装飾アニメーション（`animate-wobble`, `animate-bounce-slow` 等）が `prefers-reduced-motion` を考慮していない点は既知の課題。今後の対応候補とする
- ボタン・タップ領域は 44×44px 相当を目安にする（`size="icon"` は `size-9`＝36px のため、パディングを含めた実タップ領域を確認する）

---

## 11. Layering & z-index

ad-hoc な値を増やさず、以下のレイヤーに沿って `z-*` を割り当てる（現状の実装から抽出）。

| Layer          | 役割                                             | 使用箇所                          | z-index |
| -------------- | -------------------------------------------------- | ----------------------------------- | ------- |
| Base           | 通常のコンテンツ                                    | -                                    | `auto`  |
| Raised         | カード内の装飾レイヤー（背景グラデーション等）        | モバイルメニューの装飾レイヤー        | `z-10`  |
| Overlay        | drawer / modal の背景スクリム                        | モバイルメニューのオーバーレイ        | `z-40`  |
| Panel          | drawer 本体                                         | モバイルメニューパネル               | `z-50`  |
| Dialog         | モーダル本体（Panel より前面）                       | QR コードモーダル                    | `z-[60]`|

### 運用指針

- overlay（スクリム）は content より 1 層下に置く
- 新しい `z-[9999]` のような場当たり的な値は導入せず、上表のスケールに当てはめる
- sticky header は現状未実装（Header は `relative` のみ）。将来 sticky 化する場合は Panel（`z-50`）より背面、Base より前面のレイヤーを新設して割り当てる

---

## 12. Scope Exceptions

以下のページはグローバル Header / Footer を持たない、独立したデザインのスタンドアロンページです。

- `app/recap/[year]/page.tsx`

このページは年次振り返り（Recap）専用のコンテンツで、`NumberReel` のようなページ固有のアニメーションコンポーネントや独自のグラデーション演出を持ちます。本ドキュメントの共通コンポーネント規約（Card, Button 等）の適用対象外です。

---

## 13. 設計制約の実施方針

DESIGN.md は設計意図の記録であり、強制力を持たせたい制約は極力ツール（ESLint / Tailwind config）側で担保する。

### 実施済みの制約

| 制約                                     | 実施手段                                                          |
| ------------------------------------------ | -------------------------------------------------------------------- |
| ブランドカラー（primary/secondary/accent/success/warning/error）の一元管理 | `tailwind.config.ts` の `theme.extend.colors` |
| ライト/ダークの配色切り替え               | shadcn パターン（`:root` / `.dark` の CSS 変数 + `darkMode: ["class"]`） |

### 未実施の制約（検討中）

| 制約                                   | 実施手段                             |
| ---------------------------------------- | -------------------------------------- |
| `rounded-*` スケールの逸脱検出（`rounded-full` の濫用防止） | ESLint カスタムルール or コードレビュー |
| `transition-all` の使用箇所を絞る         | ESLint カスタムルール                  |
| `prefers-reduced-motion` 未対応アニメーションの洗い出し | コードレビュー（自動化困難） |

### コードレビューで確認すべき観点

- `shadow-*` / グラデーション / `backdrop-blur` が「ポップさ」の意図に沿っているか（過剰な多用で情報の階層が崩れていないか）
- `rounded-full` がアバター・アイコンボタン・装飾ドット等、正円が意味を持つ要素に限定されているか
- 記事本文（`.znc`）にブランドカラーを直接持ち込んでいないか（本文は無彩色 + 単一リンク色を維持する）
- アイコンのみのボタンに `aria-label` があるか
- 新規の `z-index` が §11 のレイヤースケールに沿っているか
