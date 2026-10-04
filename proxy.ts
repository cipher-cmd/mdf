import { NextResponse, type NextRequest } from 'next/server'
import { verifySession, COOKIE_NAME } from '@/lib/admin/edgeAuth'

/** Everything under /admin and /api/admin needs a signed-in admin, except the sign-in itself. */
export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (pathname === '/admin/login' || pathname.startsWith('/api/admin/auth/')) return NextResponse.next()

  if (await verifySession(req.cookies.get(COOKIE_NAME)?.value)) return NextResponse.next()

  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ ok: false, error: 'You have been signed out. Please sign in again.' }, { status: 401 })
  }
  const login = new URL('/admin/login', req.url)
  login.searchParams.set('redirect', pathname)
  return NextResponse.redirect(login)
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
