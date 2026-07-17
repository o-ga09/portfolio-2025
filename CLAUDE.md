# CLAUDE.md

## Worktree運用ルール（必須）

Claude Codeの複数セッションが同じ作業ツリーを同時に編集して競合するのを防ぐため、
機能追加・修正作業は必ず `git-wt` で作成したworktree内で行う。

### ルール

1. **作業開始前**: 対象ブランチで `git wt <branch名>` を実行し、worktreeを作成/切り替えてから作業する。
   - 新規ブランチなら自動で作成される。
   - `git wt <branch名> <start-point>`（例: `origin/main`）で起点を指定できる。
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
