/**
 * Signed admin session cookie (HMAC-SHA256). Uses only Web Crypto so the same code
 * runs in middleware and in API routes. There is deliberately no fallback secret:
 * without ADMIN_PASSWORD (or ADMIN_SESSION_SECRET) nobody can sign in.
 */
export const COOKIE_NAME = 'mdf_admin_session'
export const MAX_AGE_SECONDS = 7 * 24 * 60 * 60

export const sessionSecret = () => process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || ''

const b64url = (bytes: Uint8Array) => btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
const fromB64url = (s: string) => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0))

const hmacKey = (secret: string) =>
  crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify'])

export async function createSessionToken(): Promise<string> {
  const secret = sessionSecret()
  if (!secret) throw new Error('ADMIN_PASSWORD is not set')
  const payload = b64url(new TextEncoder().encode(JSON.stringify({ auth: true, exp: Date.now() + MAX_AGE_SECONDS * 1000 })))
  const sig = await crypto.subtle.sign('HMAC', await hmacKey(secret), new TextEncoder().encode(payload))
  return `${payload}.${b64url(new Uint8Array(sig))}`
}

export async function verifySession(token: string | undefined): Promise<boolean> {
  const secret = sessionSecret()
  if (!token || !secret) return false
  const [payload, sig] = token.split('.')
  if (!payload || !sig) return false
  try {
    const ok = await crypto.subtle.verify('HMAC', await hmacKey(secret), fromB64url(sig) as BufferSource, new TextEncoder().encode(payload))
    if (!ok) return false
    const data = JSON.parse(new TextDecoder().decode(fromB64url(payload)))
    return data.auth === true && typeof data.exp === 'number' && Date.now() < data.exp
  } catch {
    return false
  }
}
