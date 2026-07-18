import Script from "next/script";

export function CloudflareWebAnalytics() {
  const token = process.env.CF_BEACON_TOKEN;

  if (!token) {
    return null;
  }

  return (
    <Script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token })}
      strategy="afterInteractive"
    />
  );
}
