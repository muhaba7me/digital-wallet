import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware for protecting admin routes
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes except the signin page
  const isProtectedAdminRoute =
    pathname.startsWith("/admin") && pathname !== "/admin/signin";

  if (!isProtectedAdminRoute) return NextResponse.next();

  try {
    // Call internal session API to verify user
    const response = await fetch(new URL("/api/auth/get-session", request.url), {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    });

    if (!response.ok) throw new Error("Failed to verify session");

    const session = await response.json();

    if (!session?.user) {
      // No session, redirect to signin
      return NextResponse.redirect(new URL("/admin/signin", request.url));
    }
  } catch (err) {
    // On any error, redirect to signin
    return NextResponse.redirect(new URL("/admin/signin", request.url));
  }

  // User is verified
  return NextResponse.next();
}

// Apply middleware only to /admin routes
export const config = {
  matcher: ["/admin/:path*"],
};
