export const authenticationRoutes = ["/login"] as const;

export function isAuthenticationRoute(pathname: string): boolean {
  return authenticationRoutes.some((route) => pathname.startsWith(route));
}

export function isProtectedRoute(pathname: string): boolean {
  return !isAuthenticationRoute(pathname);
}
