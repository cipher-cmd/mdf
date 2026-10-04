import { NextResponse } from 'next/server'
import { COOKIE_NAME } from '@/lib/admin/edgeAuth'

export async function POST() {
  const response = NextResponse.json({ ok: true })
  response.cookies.set({ name: COOKIE_NAME, value: '', httpOnly: true, path: '/', maxAge: 0 })
  return response
}
