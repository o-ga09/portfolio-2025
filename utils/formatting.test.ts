import { describe, it, expect } from "vitest";
import { formatNumber, formatDate, truncateText } from "./formatting";

describe("formatNumber", () => {
  it("formats numbers correctly with default locale", () => {
    expect(formatNumber(1000)).toBe("1,000");
    expect(formatNumber(1000.5)).toBe("1,000.5");
  });

  it("formats numbers with specified locale", () => {
    expect(formatNumber(1000, "en-US")).toBe("1,000");
    expect(formatNumber(1000, "de-DE")).toBe("1.000");
  });

  it("applies formatting options correctly", () => {
    expect(
      formatNumber(1000.5, "ja-JP", { style: "currency", currency: "JPY" })
    ).toBe("￥1,001");
    expect(formatNumber(0.5, "ja-JP", { style: "percent" })).toBe("50%");
  });
});

describe("formatDate", () => {
  it("formats dates correctly with default locale and options", () => {
    const date = new Date("2025-05-27");
    expect(formatDate(date)).toMatch(/2025年5月27日/);
  });

  it("formats dates with specified locale and options", () => {
    const date = new Date("2025-05-27");

    expect(formatDate(date, "en-US")).toMatch(/May 27, 2025/);

    expect(
      formatDate(date, "ja-JP", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    ).toMatch(/2025年5月27日火曜日/);
  });
});

describe("truncateText", () => {
  it("returns original text when shorter than maxLength", () => {
    expect(truncateText("Hello", 10)).toBe("Hello");
  });

  it("truncates text when longer than maxLength", () => {
    expect(truncateText("Hello World", 5)).toBe("Hello...");
  });

  it("uses custom suffix when provided", () => {
    expect(truncateText("Hello World", 5, " [more]")).toBe("Hello [more]");
  });
});
