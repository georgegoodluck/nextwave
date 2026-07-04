import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Allow access to login page and API auth
  if (path === "/admin/login" || path === "/api/admin/auth") {
    return NextResponse.next();
  }

  const isAdminRoute = path.startsWith("/admin");
  const isAdminApiRoute = path.startsWith("/api/admin");

  if (isAdminRoute || isAdminApiRoute) {
    const authCookie = request.cookies.get("admin-auth");

    if (!authCookie || authCookie.value !== "true") {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
