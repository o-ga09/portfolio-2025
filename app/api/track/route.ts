import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getPageviewCounts } from "@/lib/pageviews";

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

export async function GET(request: NextRequest) {
  const year = request.nextUrl.searchParams.get("year") ?? undefined;
  const pages = await getPageviewCounts(year);

  return NextResponse.json({ pages });
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as { path?: unknown } | null;
  const path = body?.path;

  if (!isValidPath(path)) {
    return NextResponse.json({ error: "invalid path" }, { status: 400 });
  }

  const { env } = getCloudflareContext();

  await env.DB.prepare(
    `INSERT INTO pageviews (path, day, count) VALUES (?1, ?2, 1)
     ON CONFLICT(path, day) DO UPDATE SET count = count + 1`,
  )
    .bind(path, today())
    .run();

  return NextResponse.json({ ok: true });
}
