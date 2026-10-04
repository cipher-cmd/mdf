import { query } from '@/lib/db'
import { getSiteCopy } from '@/lib/db/content'
import { refreshWebsite } from '@/lib/db/revalidate'
import { route, ok, fail } from '@/lib/admin/api'
import { COPY_DEFAULTS, COPY_SECTIONS, type CopyKey } from '@/lib/content/copy'

export const GET = route(async () => {
  const saved = await query<{ key: string; updated_at: string }>('SELECT key, updated_at FROM mdf_site_copy')
  return ok(await getSiteCopy(), { edited: Object.fromEntries(saved.map(s => [s.key, s.updated_at])) })
})

/** Keep only fields that exist in the defaults and have the same kind of value. */
function clean(key: CopyKey, content: Record<string, unknown>) {
  const defaults = COPY_DEFAULTS[key] as Record<string, unknown>
  const out: Record<string, unknown> = {}
  for (const [field, fallback] of Object.entries(defaults)) {
    const value = content[field]
    if (value === undefined) continue
    if (Array.isArray(fallback) ? Array.isArray(value) : typeof value === typeof fallback) out[field] = value
  }
  return out
}

export const PUT = route(async req => {
  const { key, content } = await req.json()
  const section = COPY_SECTIONS.find(s => s.key === key)
  if (!section || !content || typeof content !== 'object') return fail('Unknown section.')
  if (JSON.stringify(content).length > 100_000) return fail('This section is too long to save.')
  await query(
    `INSERT INTO mdf_site_copy (key, section, label, content, updated_at) VALUES ($1, $2, $3, $4, now())
     ON CONFLICT (key) DO UPDATE SET content = EXCLUDED.content, label = EXCLUDED.label, updated_at = now()`,
    [key, section.page, section.title, JSON.stringify(clean(key, content))]
  )
  refreshWebsite()
  return ok()
})

/** Put a section back to the original wording. */
export const DELETE = route(async req => {
  const key = new URL(req.url).searchParams.get('key')
  if (!key || !(key in COPY_DEFAULTS)) return fail('Unknown section.')
  await query('DELETE FROM mdf_site_copy WHERE key = $1', [key])
  refreshWebsite()
  return ok()
})
