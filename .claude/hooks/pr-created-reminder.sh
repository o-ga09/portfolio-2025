#!/bin/bash
# PostToolUse hook (Bash matcher): `gh pr create` が実際に実行されたときだけ
# worktree削除のリマインダーをコンテキストに注入する。
set -euo pipefail

input=$(cat)
command=$(echo "$input" | jq -r '.tool_input.command // empty')

if ! echo "$command" | grep -qE '(^|[;&|]\s*)gh\s+pr\s+create'; then
  echo '{}'
  exit 0
fi

printf '{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":"PRを作成した。作業がひと通り完了したら `git wt -d <branch>` でworktreeとブランチを削除すること（レビュー対応でコミットを続ける場合は削除しない）。"}}'
