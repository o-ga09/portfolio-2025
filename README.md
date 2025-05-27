# 🌟 Portfolio 2025

ポップで可愛い雰囲気のパスポート/名刺風デザインを採用した、次世代のポートフォリオサイトです。クリエイターのプロフィール情報を直感的かつ魅力的に表示するWebアプリケーションです。

## 🚀 特徴

- **パスポート/名刺風デザイン** - ユニークでポップなプロフィール表示
- **インタラクティブなDEV STAMP機能** - クリックでスタンプが押せる楽しい機能
- **詳細プロフィールページ** - 略歴、スキル評価、趣味特技、資格などの詳細情報表示
- **フローティングナビゲーション** - 効率的な画面遷移をサポート
- **レスポンシブデザイン** - モバイル対応済み

## 💻 技術スタック

- **フロントエンド**
  - React 19.0.0
  - TypeScript 5.0.0
  - Next.js 15.3.2
  - Tailwind CSS 3.3.0

- **インフラ**
  - Cloudflare (Deploymentプラットフォーム)
  - Node.js 20.12.0

- **テスト**
  - Vitest
  - Testing Library
  - Jest Axe (アクセシビリティテスト)

## 🔧 インストール方法

1. リポジトリをクローンします：

```bash
git clone https://github.com/yourusername/portfolio-2025.git
cd portfolio-2025
```

2. 依存関係をインストールします：

```bash
npm install
```

3. 環境変数を設定（必要な場合）：

```bash
cp .env.example .env.local
# .env.localファイルを編集してください
```

## 📋 使用方法

### 開発サーバー

ローカル開発サーバーを起動します：

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてサイトを確認できます。

### ビルドと起動

プロダクションビルドを作成し、サーバーを起動します：

```bash
npm run build
npm start
```

### Cloudflareへのデプロイ

```bash
npm run deploy
```

### テスト

```bash
# 全テストの実行
npm test

# 監視モードでテスト実行
npm run test:watch

# UIでテスト結果を確認
npm run test:ui

# カバレッジレポートの生成
npm run test:coverage
```

## 📁 プロジェクト構成

```
portfolio-2025/
├── app/                  # Next.js App Routerベースのページ
│   ├── about/            # About/プロフィールページ
│   │   ├── details/      # 詳細プロフィールページ
│   │   └── page.tsx      # メインAboutページ
│   └── page.tsx          # トップページ
├── components/           # 再利用可能なコンポーネント
│   ├── section/          # セクションレベルのコンポーネント
│   └── ui/               # UIコンポーネント
├── lib/                  # ユーティリティ関数
├── public/               # 静的アセット
├── styles/               # グローバルスタイル
├── utils/                # ヘルパー関数
└── ...設定ファイル
```

## 🔍 主要機能の詳細

### 🪪 Aboutページ（パスポート/名刺風）

パスポートや名刺を思わせる魅力的なデザインのプロフィールカード。ユーザー情報、スキル一覧、自己紹介文が直感的に配置されています。

#### DEV STAMP機能

クリックするとスタンプが押され、カウンターがインクリメントされます。遊び心のあるインタラクション要素として実装されています。

### 📝 詳細プロフィールページ

- **略歴** - 時系列で表示された職歴と実績
- **スキル詳細** - スキルレベルを視覚的に表示
- **趣味・特技** - 個人的な興味や活動の詳細
- **資格** - 技術資格とその他資格の一覧
- **連絡先** - SNSリンクや連絡手段

## 📄 ライセンス

[MIT](LICENSE)

## 👤 作者・連絡先

作成者: [あなたの名前]
- GitHub: [o-ga09](https://github.com/o-ga09)
- Twitter: [@o_ga09](https://twitter.com/o_ga09)
