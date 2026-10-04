import { query } from '@/lib/db'
import { refreshWebsite } from '@/lib/db/revalidate'
import { route, ok, fail, str, bool, strList } from '@/lib/admin/api'
import { slugify } from '@/lib/sanitize'

export const GET = route(async () => {
  const rows = await query(`
    SELECT c.*, (SELECT count(*)::int FROM mdf_products p WHERE p.category = c.id) AS product_count
    FROM mdf_categories c ORDER BY c.sort_order, c.label`)
  return ok(rows)
})

function fields(body: any) {
  return {
    label: str(body.label, 100),
    short: str(body.short, 50),
    tagline: str(body.tagline, 150),
    items: str(body.items, 150),
    image: str(body.image, 255),
    poster: str(body.poster, 255),
    is_active: bool(body.is_active, true),
  }
}

export const POST = route(async req => {
  const f = fields(await req.json())
  if (!f.label) return fail('Please give the department a name.')
  const id = slugify(f.label, 40)
  if (!id) return fail('Please use letters or numbers in the name.')
  await query(
    `INSERT INTO mdf_categories (id, label, short, tagline, items, image, poster, video, is_active, sort_order)
     VALUES ($1, $2, $3, $4, $5, $6, $6, '', $7, (SELECT COALESCE(max(sort_order), 0) + 1 FROM mdf_categories))`,
    [id, f.label, f.short || f.label, f.tagline, f.items, f.image || null, f.is_active]
  )
  refreshWebsite()
  return ok({ id })
})

export const PUT = route(async req => {
  const body = await req.json()
  const id = str(body.id, 50)
  const f = fields(body)
  if (!id || !f.label) return fail('Please give the department a name.')
  await query(
    `UPDATE mdf_categories SET label = $2, short = $3, tagline = $4, items = $5, image = COALESCE(NULLIF($6, ''), image),
       poster = COALESCE(NULLIF($7, ''), poster), is_active = $8, updated_at = now()
     WHERE id = $1`,
    [id, f.label, f.short || f.label, f.tagline, f.items, f.image, f.poster, f.is_active]
  )
  refreshWebsite()
  return ok({ id })
})

export const PATCH = route(async req => {
  const body = await req.json()
  if (Array.isArray(body.order)) {
    await query(
      `UPDATE mdf_categories c SET sort_order = o.pos FROM unnest($1::text[]) WITH ORDINALITY AS o(id, pos) WHERE c.id = o.id`,
      [strList(body.order, 100, 50)]
    )
  } else if (typeof body.is_active === 'boolean') {
    await query('UPDATE mdf_categories SET is_active = $2, updated_at = now() WHERE id = $1', [str(body.id, 50), body.is_active])
  } else return fail('Unknown change.')
  refreshWebsite()
  return ok()
})

export const DELETE = route(async req => {
  const id = new URL(req.url).searchParams.get('id')
  if (!id) return fail('Missing department.')
  const used = await query<{ n: number }>('SELECT count(*)::int AS n FROM mdf_products WHERE category = $1', [id])
  if (used[0]?.n) return fail(`This department still has ${used[0].n} product(s). Move or delete them first, or simply hide the department.`)
  await query('DELETE FROM mdf_categories WHERE id = $1', [id])
  refreshWebsite()
  return ok()
})
