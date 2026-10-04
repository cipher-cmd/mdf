import { query, hasDb } from '@/lib/db'

/** Admin-controlled settings for the article writer, stored as key/value rows in mdf_admin_settings. */
export const SETTINGS_DEFAULTS = {
  /** Write articles automatically on the schedule */
  blog_auto_enabled: true,
  /** true = go live straight away, false = wait in Drafts for approval */
  blog_auto_publish: true,
  /** Write one article every N days (1, 2, 3 or 7) */
  blog_every_days: 1,
  /** Region the articles focus on, added to every news search */
  blog_region: 'Jammu and Kashmir',
  blog_length: 'medium' as 'short' | 'medium' | 'long',
  blog_tone: 'friendly' as 'friendly' | 'expert' | 'story',
  /** Whether articles may mention MDF Enterprises */
  blog_mention_store: true,
  /** Free-text guidance added to every article request */
  blog_extra_instructions: '',
  ai_model: 'llama-3.3-70b-versatile',
}

export type Settings = typeof SETTINGS_DEFAULTS
export type SettingKey = keyof Settings

export async function getSettings(): Promise<Settings> {
  const out: Record<string, unknown> = { ...SETTINGS_DEFAULTS }
  if (!hasDb()) return out as Settings
  const rows = await query<{ key: string; value: unknown }>(
    'SELECT key, value FROM mdf_admin_settings WHERE key = ANY($1)',
    [Object.keys(SETTINGS_DEFAULTS)]
  )
  for (const { key, value } of rows) {
    if (typeof value === typeof (SETTINGS_DEFAULTS as Record<string, unknown>)[key]) out[key] = value
  }
  return out as Settings
}

/** Save only known keys whose type matches the default. */
export async function saveSettings(patch: Partial<Record<string, unknown>>) {
  const entries = Object.entries(patch).filter(
    ([k, v]) => k in SETTINGS_DEFAULTS && typeof v === typeof (SETTINGS_DEFAULTS as Record<string, unknown>)[k]
  )
  for (const [key, value] of entries) {
    await query(
      `INSERT INTO mdf_admin_settings (key, value, updated_at) VALUES ($1, $2, now())
       ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`,
      [key, JSON.stringify(value)]
    )
  }
  return entries.length
}
