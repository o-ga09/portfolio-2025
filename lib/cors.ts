const ALLOWED_ORIGINS = ["https://dashboard.o-ga09.com", "http://localhost:5173"];

export function corsHeaders(origin: string | null): HeadersInit {
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    return { "Access-Control-Allow-Origin": origin, Vary: "Origin" };
  }
  return {};
}
