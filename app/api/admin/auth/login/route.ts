import { NextResponse } from 'next/server'
import { checkPassword } from '@/lib/admin/auth'
import { createSessionToken, sessionSecret, COOKIE_NAME, MAX_AGE_SECONDS } from '@/lib/admin/edgeAuth'

export async function POST(req: Request) {
  if (!sessionSecret()) {
    return NextResponse.json(
      { ok: false, error: 'Sign-in is not set up yet. Add ADMIN_PASSWORD in Vercel → Settings → Environment Variables.' },
      { status: 503 }
    )
  }

  const { password } = await req.json().catch(() => ({ password: '' }))
  if (typeof password !== 'string' || !(await checkPassword(password))) {
    // Slow down password guessing
    await new Promise(r => setTimeout(r, 800))
    return NextResponse.json({ ok: false, error: 'That password is not right. Please try again.' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set({
    name: COOKIE_NAME,
    value: await createSessionToken(),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE_SECONDS,
  })
  return response
}
