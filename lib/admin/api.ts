import { NextResponse } from 'next/server'

export const ok = (data?: unknown, extra: Record<string, unknown> = {}) => NextResponse.json({ ok: true, data, ...extra })
export const fail = (error: string, status = 400) => NextResponse.json({ ok: false, error }, { status })

/** Database errors in words the shop owner can act on. */
function friendly(err: any): string {
  switch (err?.code) {
    case '23505': return 'Something with that name or web address already exists. Please choose a different one.'
    case '23503': return 'That item is linked to something else. Move or remove the linked items first.'
    case '22001': return 'One of the fields is too long. Please shorten it.'
  }
  if (/DATABASE_URL/.test(err?.message || '')) return 'The database is not connected. Please check DATABASE_URL in Vercel.'
  return 'Something went wrong while saving. Please try again.'
}

type Handler = (req: Request) => Promise<Response>

/** Wrap a route so any unexpected error becomes a friendly JSON message. */
export function route(fn: Handler): Handler {
  return async req => {
    try {
      return await fn(req)
    } catch (err) {
      console.error(`[admin api] ${req.method} ${new URL(req.url).pathname}`, err)
      return fail(friendly(err), 500)
    }
  }
}

export const str = (v: unknown, max = 5000) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
export const bool = (v: unknown, fallback = false) => (typeof v === 'boolean' ? v : fallback)
export const strList = (v: unknown, maxItems = 30, max = 300) =>
  Array.isArray(v) ? v.map(x => str(x, max)).filter(Boolean).slice(0, maxItems) : []
