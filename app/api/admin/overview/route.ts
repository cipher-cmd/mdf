import { query } from '@/lib/db'
import { getSettings } from '@/lib/db/settings'
import { route, ok } from '@/lib/admin/api'

/** Numbers for the admin home screen, in one round trip. */
export const GET = route(async () => {
  const [counts] = await query(`
    SELECT
      (SELECT count(*)::int FROM mdf_products WHERE is_visible) AS products_live,
      (SELECT count(*)::int FROM mdf_products WHERE NOT is_visible) AS products_hidden,
      (SELECT count(*)::int FROM mdf_products WHERE NOT in_stock) AS products_out,
      (SELECT count(*)::int FROM mdf_categories WHERE is_active) AS departments,
      (SELECT count(*)::int FROM mdf_blog_posts WHERE status = 'published') AS articles_live,
      (SELECT count(*)::int FROM mdf_blog_posts WHERE status = 'draft') AS articles_draft,
      (SELECT count(*)::int FROM mdf_blog_topics WHERE is_active) AS topics,
      (SELECT COALESCE(sum(bytes), 0)::bigint FROM mdf_media) AS picture_bytes,
      (SELECT count(*)::int FROM mdf_media) AS pictures`)
  const lastRun = (await query(
    `SELECT status, message, created_at, trigger FROM mdf_blog_runs WHERE status <> 'running' ORDER BY created_at DESC LIMIT 1`
  ))[0] ?? null
  const drafts = await query(
    `SELECT id, title, created_at, ai_generated FROM mdf_blog_posts WHERE status = 'draft' ORDER BY created_at DESC LIMIT 5`
  )
  return ok({ ...counts, picture_bytes: Number(counts.picture_bytes), lastRun, drafts, settings: await getSettings() })
})
