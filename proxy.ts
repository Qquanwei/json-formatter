import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_HOST = "jsonguy.airankone.com";

export function proxy(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").toLowerCase();
  const bareHost = host.replace(/:\d+$/, "");

  const isLocal =
    bareHost === "localhost" ||
    bareHost.endsWith(".localhost") ||
    /^\d+\.\d+\.\d+\.\d+$/.test(bareHost);

  if (bareHost && !isLocal && bareHost !== CANONICAL_HOST) {
    const url = new URL(request.url);
    url.hostname = CANONICAL_HOST;
    url.port = "";
    url.protocol = "https:";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next/|api/).*)",
};
