import { query } from '@/lib/db'
import { refreshWebsite } from '@/lib/db/revalidate'
import { route, ok, fail, str, bool, strList } from '@/lib/admin/api'
import { slugify } from '@/lib/sanitize'

export const GET = route(async () => {
  const rows = await query(`SELECT * FROM mdf_products ORDER BY sort_order, name`)
  return ok(rows)
})

function fields(body: any) {
  return {
    name: str(body.name, 200),
    category: str(body.category, 50),
    brand: str(body.brand, 100),
    description: str(body.description, 2000),
    highlights: strList(body.highlights, 12, 200),
    image: str(body.image, 255),
    whatsapp_text: str(body.whatsapp_text, 500),
    is_featured: bool(body.is_featured),
    in_stock: bool(body.in_stock, true),
    is_visible: bool(body.is_visible, true),
  }
}

export const POST = route(async req => {
  const f = fields(await req.json())
  if (!f.name) return fail('Please give the product a name.')
  if (!f.category) return fail('Please choose a department.')
  const slug = slugify(`${f.brand} ${f.name}`) || `product-${Date.now()}`
  const id = `${slug.slice(0, 80)}-${Date.now().toString(36)}`
  await query(
    `INSERT INTO mdf_products (id, slug, name, category, brand, description, specs, image, whatsapp_text,
       is_featured, in_stock, is_visible, sort_order)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,
       (SELECT COALESCE(min(sort_order), 1) - 1 FROM mdf_products))`,
    [id, slug, f.name, f.category, f.brand, f.description, JSON.stringify(f.highlights), f.image || null,
     f.whatsapp_text || null, f.is_featured, f.in_stock, f.is_visible]
  )
  refreshWebsite()
  return ok({ id })
})

export const PUT = route(async req => {
  const body = await req.json()
  const id = str(body.id, 100)
  if (!id) return fail('Missing product.')
  const f = fields(body)
  if (!f.name) return fail('Please give the product a name.')
  await query(
    `UPDATE mdf_products SET name = $2, category = $3, brand = $4, description = $5, specs = $6, image = $7,
       whatsapp_text = $8, is_featured = $9, in_stock = $10, is_visible = $11, updated_at = now()
     WHERE id = $1`,
    [id, f.name, f.category, f.brand, f.description, JSON.stringify(f.highlights), f.image || null,
     f.whatsapp_text || null, f.is_featured, f.in_stock, f.is_visible]
  )
  refreshWebsite()
  return ok({ id })
})

/** Quick switches from the list (show/hide, in stock, featured) and drag-to-reorder. */
export const PATCH = route(async req => {
  const body = await req.json()
  if (Array.isArray(body.order)) {
    const ids = strList(body.order, 1000, 100)
    await query(
      `UPDATE mdf_products p SET sort_order = o.pos FROM unnest($1::text[]) WITH ORDINALITY AS o(id, pos) WHERE p.id = o.id`,
      [ids]
    )
  } else {
    const column = ({ is_visible: 'is_visible', in_stock: 'in_stock', is_featured: 'is_featured' } as Record<string, string>)[body.field]
    if (!column || typeof body.value !== 'boolean') return fail('Unknown change.')
    await query(`UPDATE mdf_products SET ${column} = $2, updated_at = now() WHERE id = $1`, [str(body.id, 100), body.value])
  }
  refreshWebsite()
  return ok()
})

export const DELETE = route(async req => {
  const id = new URL(req.url).searchParams.get('id')
  if (!id) return fail('Missing product.')
  await query('DELETE FROM mdf_products WHERE id = $1', [id])
  refreshWebsite()
  return ok()
})
