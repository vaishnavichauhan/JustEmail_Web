import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const path = req.nextUrl.pathname;

  // Protected Portal Paths
  const isProtectedPath = path.startsWith("/admin") || path.startsWith("/reseller");

  if (isProtectedPath && !token) {
    // Redirect unauthenticated visitors to login page
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/reseller/:path*"],
};
