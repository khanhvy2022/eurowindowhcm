import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get("host") || "";

  // 1. Redirect www.eurowindowhcm.com to non-www eurowindowhcm.com (301 Permanent)
  if (host.startsWith("www.")) {
    const cleanHost = host.replace(/^www\./, "");
    url.host = cleanHost;
    url.port = "";
    url.protocol = "https:";
    return NextResponse.redirect(url, 301);
  }

  // 2. Strip Blogger mobile parameters ?m=1 or ?m=0 to avoid duplicate indexation
  if (url.searchParams.has("m")) {
    url.searchParams.delete("m");
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt
     * - static images & assets
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|mp4|webm)$).*)",
  ],
};
