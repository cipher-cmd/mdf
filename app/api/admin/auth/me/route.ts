import { NextResponse, type NextRequest } from 'next/server'
import { verifySession, COOKIE_NAME } from '@/lib/admin/edgeAuth'

export async function GET(req: NextRequest) {
  return NextResponse.json({ authenticated: await verifySession(req.cookies.get(COOKIE_NAME)?.value) })
}
