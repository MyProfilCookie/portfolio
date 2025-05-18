import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const isAuthRoute = request.nextUrl.pathname.startsWith('/auth')
  const isLoggedIn = request.cookies.get('isAdmin')?.value === 'true'

  // Si l'utilisateur est sur la page de connexion et est déjà connecté, le rediriger vers le dashboard
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  // Si l'utilisateur n'est pas connecté et tente d'accéder à une route admin, le rediriger vers la connexion
  if (isAdminRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/auth/:path*',
  ],
} 