import { describe, it, expect } from "vitest";
import { extractGithubAlerts, renderGithubAlerts } from "./github-alert";

describe("extractGithubAlerts", () => {
  it("detects a single-line alert block", () => {
    const markdown = ["> [!NOTE]", "> これは注意事項です。"].join("\n");
    const { markdown: transformed, alerts } = extractGithubAlerts(markdown);

    expect(alerts.size).toBe(1);
    const [[placeholder, alert]] = alerts;
    expect(alert.type).toBe("NOTE");
    expect(alert.bodyMarkdown).toBe("これは注意事項です。");
    expect(transformed).toBe(placeholder);
  });

  it("detects all five GitHub alert types", () => {
    const types = ["NOTE", "TIP", "IMPORTANT", "WARNING", "CAUTION"];
    const markdown = types.map((type) => `> [!${type}]\n> body-${type}`).join("\n\n");
    const { alerts } = extractGithubAlerts(markdown);

    expect(alerts.size).toBe(5);
    expect([...alerts.values()].map((a) => a.type)).toEqual(types);
  });

  it("supports multi-line alert bodies", () => {
    const markdown = ["> [!WARNING]", "> 1行目", "> 2行目", "> 3行目"].join("\n");
    const { alerts } = extractGithubAlerts(markdown);

    const [alert] = alerts.values();
    expect(alert.bodyMarkdown).toBe("1行目\n2行目\n3行目");
  });

  it("leaves ordinary blockquotes untouched", () => {
    const markdown = ["> ただの引用です。", "> 2行目"].join("\n");
    const { markdown: transformed, alerts } = extractGithubAlerts(markdown);

    expect(alerts.size).toBe(0);
    expect(transformed).toBe(markdown);
  });

  it("ignores alert markers inside fenced code blocks", () => {
    const markdown = ["```", "> [!NOTE]", "> code", "```"].join("\n");
    const { markdown: transformed, alerts } = extractGithubAlerts(markdown);

    expect(alerts.size).toBe(0);
    expect(transformed).toBe(markdown);
  });

  it("is case-insensitive for the marker keyword", () => {
    const markdown = ["> [!note]", "> 本文"].join("\n");
    const { alerts } = extractGithubAlerts(markdown);

    const [alert] = alerts.values();
    expect(alert.type).toBe("NOTE");
  });

  it("preserves surrounding content around the alert block", () => {
    const markdown = ["前の段落", "", "> [!TIP]", "> ヒントです", "", "後の段落"].join("\n");
    const { markdown: transformed, alerts } = extractGithubAlerts(markdown);
    const [placeholder] = alerts.keys();

    expect(transformed).toBe(["前の段落", "", placeholder, "", "後の段落"].join("\n"));
  });
});

describe("renderGithubAlerts", () => {
  it("replaces the placeholder paragraph with alert markup", () => {
    const { markdown, alerts } = extractGithubAlerts(["> [!NOTE]", "> 本文"].join("\n"));
    const html = `<p data-line="0" class="code-line">${markdown}</p>`;

    const result = renderGithubAlerts(html, alerts, (body) => `<p>${body}</p>`);

    expect(result).toContain('<aside class="gh-alert gh-alert-note">');
    expect(result).toContain("Note");
    expect(result).toContain("<p>本文</p>");
    expect(result).not.toContain(markdown);
  });

  it("renders an alert with no body content", () => {
    const { markdown, alerts } = extractGithubAlerts("> [!TIP]");
    const html = `<p>${markdown}</p>`;

    const result = renderGithubAlerts(html, alerts, (body) => `<p>${body}</p>`);

    expect(result).toContain('<aside class="gh-alert gh-alert-tip">');
    expect(result).toContain('<div class="gh-alert-body"></div>');
  });
});
