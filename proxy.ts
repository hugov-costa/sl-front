import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { apiUrlServer } from "./utils/apiUrl";
import { authCache } from "./lib/auth-cache";
import { isAuthenticationRoute, isProtectedRoute } from "./app/config/routes";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  const userIsAuthenticated = await checkAuthServer(request);

  if (isAuthenticationRoute(pathname)) {
    if (userIsAuthenticated) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  if (isProtectedRoute(pathname)) {
    if (!userIsAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

async function checkAuthServer(request: NextRequest): Promise<boolean> {
  try {
    const cookies = request.cookies.getAll();
    const accessToken = cookies.find((c) => c.name === "access_token");

    if (!accessToken) {
      return false;
    }

    const cacheKey = accessToken.value;

    const cached = authCache.get(cacheKey);

    if (cached !== null) {
      return cached;
    }

    const cookieHeader = cookies
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");

    const response = await fetch(`${apiUrlServer}/check-auth`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Cookie: cookieHeader,
      },
    });

    const isAuth = response.ok;

    if (response.status === 401) {
      authCache.delete(cacheKey);
      return false;
    }

    authCache.set(cacheKey, isAuth);
    return isAuth;
  } catch {
    return false;
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
