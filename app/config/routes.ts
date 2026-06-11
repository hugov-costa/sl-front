export const authenticationRoutes = ['/forgot-password', '/login'] as const

export const publicRoutes = ['/dashboard'] as const

export function isAuthenticationRoute(pathname: string): boolean {
  return authenticationRoutes.some(route => pathname.startsWith(route))
}

export function isProtectedRoute(pathname: string): boolean {
  return !isAuthenticationRoute(pathname) && !isPublicRoute(pathname)
}

export function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some(route => pathname.startsWith(route))
}
