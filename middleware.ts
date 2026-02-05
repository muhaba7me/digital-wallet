import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedAdminRoute =
    pathname.startsWith("/admin") && !pathname.startsWith("/admin/signin");

  if (isProtectedAdminRoute) {
    try {
      //Verification Check: Call your internal session API
      const verifyResponse = await fetch(
        new URL("/api/auth/get-session", request.url),
        {
          headers: {
            cookie: request.headers.get("cookie") || "",
          },
        },
      );

      const session = await verifyResponse.json();

      //If the API fails or session is missing, redirect to signin
      if (!verifyResponse.ok || !session?.user) {
        return NextResponse.redirect(new URL("/admin/signin", request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/admin/signin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Apply to all admin routes
  matcher: ["/admin/:path*"],
};
