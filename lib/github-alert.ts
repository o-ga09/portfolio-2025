// GitHubのAlert記法 ( > [!NOTE] のようなブロッククォート ) をznc向けのHTMLに変換する。
// zenn-markdown-htmlはこの記法を知らないため、変換対象のブロックックォートを
// プレースホルダーに置き換えてから通常のmarkdown変換にかけ、変換後のHTMLに対して
// プレースホルダーを実際のalert HTMLへ差し替える二段階の処理を行う。

export type GithubAlertType = "NOTE" | "TIP" | "IMPORTANT" | "WARNING" | "CAUTION";

const ALERT_MARKER_REGEX = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*$/i;
const PLACEHOLDER_PREFIX = "zenn-github-alert-placeholder";

export interface GithubAlert {
  type: GithubAlertType;
  bodyMarkdown: string;
}

export interface ExtractGithubAlertsResult {
  markdown: string;
  alerts: Map<string, GithubAlert>;
}

function stripQuotePrefix(line: string): string {
  const withoutMarker = line.replace(/^\s*>/, "");
  return withoutMarker.startsWith(" ") ? withoutMarker.slice(1) : withoutMarker;
}

// マークダウン本文中のGitHub Alert記法のブロッククォートを検出し、
// プレースホルダーの段落に置き換える。プレースホルダーとalertの対応はMapで返す。
export function extractGithubAlerts(markdown: string): ExtractGithubAlertsResult {
  const lines = markdown.split("\n");
  const outputLines: string[] = [];
  const alerts = new Map<string, GithubAlert>();
  let inFence = false;
  let alertIndex = 0;
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      inFence = !inFence;
      outputLines.push(line);
      i++;
      continue;
    }

    if (!inFence && trimmed.startsWith(">")) {
      const blockLines: string[] = [];
      let j = i;
      while (j < lines.length && lines[j].trim().startsWith(">")) {
        blockLines.push(lines[j]);
        j++;
      }

      const firstContent = stripQuotePrefix(blockLines[0]).trim();
      const match = firstContent.match(ALERT_MARKER_REGEX);

      if (match) {
        const type = match[1].toUpperCase() as GithubAlertType;
        const bodyMarkdown = blockLines
          .slice(1)
          .map(stripQuotePrefix)
          .join("\n")
          .replace(/\n+$/, "");
        const placeholder = `${PLACEHOLDER_PREFIX}-${alertIndex}`;
        alerts.set(placeholder, { type, bodyMarkdown });
        outputLines.push(placeholder);
        alertIndex++;
      } else {
        outputLines.push(...blockLines);
      }

      i = j;
      continue;
    }

    outputLines.push(line);
    i++;
  }

  return { markdown: outputLines.join("\n"), alerts };
}

const ALERT_LABELS: Record<GithubAlertType, string> = {
  NOTE: "Note",
  TIP: "Tip",
  IMPORTANT: "Important",
  WARNING: "Warning",
  CAUTION: "Caution",
};

// GitHub Octicons由来のアイコン(MITライセンス)。alertの種類ごとに表示を変える。
const ALERT_ICON_PATHS: Record<GithubAlertType, string> = {
  NOTE: "M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z",
  TIP: "M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.264-.313C3.223 7.641 2.5 6.684 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.434-.723 2.391-1.332 3.116-.091.108-.18.213-.264.313-.207.245-.383.453-.542.68-.207.3-.33.565-.37.847a.75.75 0 0 1-1.484-.211c.084-.594.337-1.079.621-1.49.203-.292.45-.584.673-.848.075-.088.147-.173.214-.253.56-.679.984-1.32.984-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z",
  IMPORTANT:
    "M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A.25.25 0 0 1 5 15.396V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h4a.75.75 0 0 1 .75.75v1.19l1.72-1.72a.75.75 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z",
  WARNING:
    "M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z",
  CAUTION:
    "M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z",
};

function renderAlertHtml(type: GithubAlertType, bodyHtml: string): string {
  const typeClass = type.toLowerCase();
  return (
    `<aside class="gh-alert gh-alert-${typeClass}">` +
    `<div class="gh-alert-title">` +
    `<svg class="gh-alert-icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="${ALERT_ICON_PATHS[type]}"></path></svg>` +
    `${ALERT_LABELS[type]}` +
    `</div>` +
    `<div class="gh-alert-body">${bodyHtml}</div>` +
    `</aside>`
  );
}

// extractGithubAlertsが埋め込んだプレースホルダーの段落を、実際のalert HTMLに差し替える。
// bodyMarkdownのHTML変換は呼び出し側のrenderMarkdownに委ねる(通常はmarkdownToHtmlをそのまま渡す)。
export function renderGithubAlerts(
  html: string,
  alerts: Map<string, GithubAlert>,
  renderMarkdown: (markdown: string) => string,
): string {
  let result = html;
  for (const [placeholder, alert] of alerts) {
    const bodyHtml = alert.bodyMarkdown ? renderMarkdown(alert.bodyMarkdown) : "";
    const placeholderRegex = new RegExp(`<p[^>]*>\\s*${placeholder}\\s*</p>`);
    result = result.replace(placeholderRegex, renderAlertHtml(alert.type, bodyHtml));
  }
  return result;
}
