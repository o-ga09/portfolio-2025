import { NextRequest, NextResponse } from "next/server";
import { getPageStats, getOverviewStats, getDailyStats } from "@/lib/pageviews";
import { corsHeaders } from "@/lib/cors";

export async function GET(request: NextRequest) {
  const year = request.nextUrl.searchParams.get("year") ?? undefined;
  const daysParam = request.nextUrl.searchParams.get("days");
  const days = daysParam ? Math.min(90, Math.max(1, Number(daysParam))) : 30;

  const [pages, overview, daily] = await Promise.all([
    getPageStats(year),
    getOverviewStats(year),
    getDailyStats(days),
  ]);

  const origin = request.headers.get("origin");
  return NextResponse.json({ pages, overview, daily }, { headers: corsHeaders(origin) });
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin");
  return new NextResponse(null, {
    status: 204,
    headers: {
      ...corsHeaders(origin),
      "Access-Control-Allow-Methods": "GET, OPTIONS",
    },
  });
}
