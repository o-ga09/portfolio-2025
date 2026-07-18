import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getPageStats } from "@/lib/pageviews";

const MAX_PATH_LENGTH = 512;

function isValidPath(path: unknown): path is string {
  return (
    typeof path === "string" &&
    path.length > 0 &&
    path.length <= MAX_PATH_LENGTH &&
    path.startsWith("/")
  );
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

// 日次でソルトを回転させるため、同一人物でも日をまたぐと別ハッシュになる（IPを保存せず追跡不可にするため）
async function hashVisitor(ip: string, userAgent: string, day: string): Promise<string> {
  const data = new TextEncoder().encode(`${ip}|${userAgent}|${day}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function GET(request: NextRequest) {
  const year = request.nextUrl.searchParams.get("year") ?? undefined;
  const pages = await getPageStats(year);

  return NextResponse.json({ pages });
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as { path?: unknown } | null;
  const path = body?.path;

  if (!isValidPath(path)) {
    return NextResponse.json({ error: "invalid path" }, { status: 400 });
  }

  const { env } = getCloudflareContext();
  const day = today();
  const ip = getClientIp(request);
  const userAgent = request.headers.get("user-agent") ?? "unknown";
  const visitor = await hashVisitor(ip, userAgent, day);

  await Promise.all([
    env.DB.prepare(
      `INSERT INTO pageviews (path, day, count) VALUES (?1, ?2, 1)
       ON CONFLICT(path, day) DO UPDATE SET count = count + 1`,
    )
      .bind(path, day)
      .run(),
    env.DB.prepare(`INSERT OR IGNORE INTO visits (path, day, visitor) VALUES (?1, ?2, ?3)`)
      .bind(path, day, visitor)
      .run(),
  ]);

  return NextResponse.json({ ok: true });
}
