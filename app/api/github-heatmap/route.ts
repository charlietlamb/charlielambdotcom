import { fetchContributions } from "@/lib/github/contributions";

export const runtime = "edge";

function secondsUntilUtcMidnight(now: Date): number {
  const midnight = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1,
  );
  return Math.max(60, Math.floor((midnight - now.getTime()) / 1000));
}

export async function GET(request: Request): Promise<Response> {
  const login = process.env.GITHUB_LOGIN || "charlietlamb";
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return new Response(JSON.stringify({ error: "missing GITHUB_TOKEN" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }

  try {
    const now = new Date();
    const data = await fetchContributions(login, token);
    const ttl = secondsUntilUtcMidnight(now);
    const cacheControl = `public, s-maxage=${ttl}, stale-while-revalidate=86400`;
    const etag = `"${now.toISOString().slice(0, 10)}-${data.total}"`;

    if (request.headers.get("if-none-match") === etag) {
      return new Response(null, {
        status: 304,
        headers: { etag, "cache-control": cacheControl },
      });
    }

    return new Response(JSON.stringify(data), {
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": cacheControl,
        "cdn-cache-control": cacheControl,
        etag,
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 502,
      headers: { "content-type": "application/json" },
    });
  }
}
