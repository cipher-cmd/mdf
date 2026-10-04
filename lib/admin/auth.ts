import { createHash, randomBytes, scrypt as scryptCb, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'
import { query, hasDb } from '@/lib/db'

const scrypt = promisify(scryptCb) as (pw: string, salt: string, len: number) => Promise<Buffer>
const PASSWORD_KEY = 'admin_password_hash'

const sameText = (a: string, b: string) =>
  timingSafeEqual(createHash('sha256').update(a).digest(), createHash('sha256').update(b).digest())

async function storedHash(): Promise<string | null> {
  if (!hasDb()) return null
  try {
    const rows = await query<{ value: string }>('SELECT value FROM mdf_admin_settings WHERE key = $1', [PASSWORD_KEY])
    return typeof rows[0]?.value === 'string' ? rows[0].value : null
  } catch {
    return null
  }
}

/**
 * The password set inside the admin panel works, and so does ADMIN_PASSWORD from
 * Vercel — that one is the owner's spare key if the panel password is forgotten.
 */
export async function checkPassword(input: string): Promise<boolean> {
  if (!input) return false
  const envPassword = process.env.ADMIN_PASSWORD
  if (envPassword && sameText(input, envPassword)) return true
  const hash = await storedHash()
  if (!hash) return false
  const [salt, expected] = hash.split(':')
  if (!salt || !expected) return false
  const actual = await scrypt(input, salt, 32)
  return timingSafeEqual(actual, Buffer.from(expected, 'hex'))
}

export async function setPanelPassword(password: string) {
  const salt = randomBytes(16).toString('hex')
  const hash = (await scrypt(password, salt, 32)).toString('hex')
  await query(
    `INSERT INTO mdf_admin_settings (key, value, updated_at) VALUES ($1, $2, now())
     ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`,
    [PASSWORD_KEY, JSON.stringify(`${salt}:${hash}`)]
  )
}
