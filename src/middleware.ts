import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  let response = NextResponse.next();

  // Normalize consecutive duplicate slashes (e.g., /tin-tuc//... -> /tin-tuc/...)
  if (url.pathname.includes("//")) {
    url.pathname = url.pathname.replace(/\/+/g, "/");
    return NextResponse.redirect(url, 301);
  }

  // Strip Blogger mobile parameters ?m=1 or ?m=0 to avoid duplicate indexation
  if (url.searchParams.has("m")) {
    url.searchParams.delete("m");
    return NextResponse.redirect(url, 301);
  }

  if (url.pathname.startsWith('/en')) {
    response.headers.set('x-locale', 'en');
  } else {
    response.headers.set('x-locale', 'vi');
  }

  return response;
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
