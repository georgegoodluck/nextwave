import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Allow access to login page and ALL auth-related API routes
  if (
    path === "/admin/login" ||
    path === "/api/admin/auth" ||
    path.startsWith("/api/admin/auth")
  ) {
    return NextResponse.next();
  }

  const isAdminRoute = path.startsWith("/admin");
  const isAdminApiRoute = path.startsWith("/api/admin");

  if (isAdminRoute || isAdminApiRoute) {
    const authCookie = request.cookies.get("admin-auth");

    if (!authCookie || authCookie.value !== "true") {
      // For API routes, return 401 instead of redirecting
      if (isAdminApiRoute) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }
      // For admin pages, redirect to login
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
