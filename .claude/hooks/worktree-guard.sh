#!/bin/bash
# PreToolUse hook (Edit|Write|MultiEdit): メイン作業ツリーへの直接編集をブロックし、
# git-wt で作成した worktree 内での作業を強制する。
# .claude/ と CLAUDE.md はこのポリシー自体のメンテ用に直接編集を許可する。
set -euo pipefail

input=$(cat)
file_path=$(echo "$input" | jq -r '.tool_input.file_path // empty')

if [ -z "$file_path" ]; then
  echo '{}'
  exit 0
fi

case "$file_path" in
  */.claude/*|*/CLAUDE.md)
    echo '{}'
    exit 0
    ;;
esac

dir=$(dirname "$file_path")
while [ ! -d "$dir" ] && [ "$dir" != "/" ]; do
  dir=$(dirname "$dir")
done

toplevel=$(git -C "$dir" rev-parse --show-toplevel 2>/dev/null || true)
if [ -z "$toplevel" ]; then
  echo '{}'
  exit 0
fi

mainwt=$(git -C "$toplevel" worktree list --porcelain 2>/dev/null | awk '/^worktree /{print $2; exit}')

if [ "$toplevel" = "$mainwt" ]; then
  printf '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"このリポジトリではメイン作業ツリーへの直接編集を禁止しています。`git wt <branch名>` でworktreeを作成してから作業してください（.claude/ と CLAUDE.md は例外）。"}}'
else
  echo '{}'
fi
