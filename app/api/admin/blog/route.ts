import { query } from '@/lib/db'
import { refreshWebsite } from '@/lib/db/revalidate'
import { route, ok, fail, str, bool } from '@/lib/admin/api'
import { sanitizeHtml, slugify } from '@/lib/sanitize'
import { BLOG_CATEGORIES } from '@/lib/ai/writer'

export const GET = route(async req => {
  const id = new URL(req.url).searchParams.get('id')
  if (id) {
    const rows = await query('SELECT * FROM mdf_blog_posts WHERE id = $1', [id])
    return rows[0] ? ok(rows[0]) : fail('Article not found.', 404)
  }
  // List view: no article bodies
  const rows = await query(
    `SELECT id, slug, title, excerpt, cover_image, category, status, published_at, created_at, updated_at,
            is_featured, ai_generated, topic
     FROM mdf_blog_posts ORDER BY COALESCE(published_at, created_at) DESC`
  )
  return ok(rows)
})

function fields(body: any) {
  const category = str(body.category, 50)
  const when = str(body.published_at, 40)
  return {
    title: str(body.title, 250),
    excerpt: str(body.excerpt, 500),
    content: sanitizeHtml(str(body.content, 200_000)),
    cover_image: str(body.cover_image, 255) || '/images/sports.webp',
    category: category in BLOG_CATEGORIES ? category : 'culture',
    status: body.status === 'published' ? 'published' : 'draft',
    published_at: when && !isNaN(Date.parse(when)) ? new Date(when).toISOString() : null,
    is_featured: bool(body.is_featured),
    meta_description: str(body.meta_description, 300),
  }
}

async function freeSlug(wanted: string, exceptId = '') {
  const base = slugify(wanted, 80) || `article-${Date.now()}`
  for (let n = 1; ; n++) {
    const slug = n === 1 ? base : `${base}-${n}`
    const taken = await query('SELECT 1 FROM mdf_blog_posts WHERE slug = $1 AND id <> $2', [slug, exceptId])
    if (!taken[0]) return slug
  }
}

export const POST = route(async req => {
  const body = await req.json()
  const f = fields(body)
  if (!f.title) return fail('Please give the article a title.')
  if (f.content.length < 20) return fail('Please write the article before saving.')
  const slug = await freeSlug(str(body.slug) || f.title)
  const id = `post-${slug.slice(0, 70)}-${Date.now().toString(36)}`
  await query(
    `INSERT INTO mdf_blog_posts (id, slug, title, excerpt, content, cover_image, category, status, published_at,
       is_featured, ai_generated, meta_title, meta_description)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, false, $3, $11)`,
    [id, slug, f.title, f.excerpt, f.content, f.cover_image, f.category, f.status,
     f.status === 'published' ? f.published_at ?? new Date().toISOString() : f.published_at, f.is_featured, f.meta_description]
  )
  if (f.is_featured) await query('UPDATE mdf_blog_posts SET is_featured = false WHERE id <> $1', [id])
  refreshWebsite()
  return ok({ id, slug })
})

export const PUT = route(async req => {
  const body = await req.json()
  const id = str(body.id, 100)
  if (!id) return fail('Missing article.')
  const f = fields(body)
  if (!f.title) return fail('Please give the article a title.')
  if (f.content.length < 20) return fail('The article is empty.')

  const current = (await query<{ status: string; slug: string }>('SELECT status, slug FROM mdf_blog_posts WHERE id = $1', [id]))[0]
  if (!current) return fail('Article not found.', 404)
  // Web addresses of live articles never change, so links and Google results keep working
  const slug = current.status === 'published' || !str(body.slug) ? current.slug : await freeSlug(str(body.slug), id)

  await query(
    `UPDATE mdf_blog_posts SET slug = $2, title = $3, excerpt = $4, content = $5, cover_image = $6, category = $7,
       status = $8::text, published_at = CASE WHEN $8::text = 'published' THEN COALESCE($9::timestamptz, published_at, now()) ELSE $9::timestamptz END,
       is_featured = $10, meta_title = $3, meta_description = $11, updated_at = now()
     WHERE id = $1`,
    [id, slug, f.title, f.excerpt, f.content, f.cover_image, f.category, f.status, f.published_at, f.is_featured, f.meta_description]
  )
  if (f.is_featured) await query('UPDATE mdf_blog_posts SET is_featured = false WHERE id <> $1', [id])
  refreshWebsite()
  return ok({ id, slug })
})

/** Quick publish / unpublish from the list. */
export const PATCH = route(async req => {
  const body = await req.json()
  const id = str(body.id, 100)
  if (body.status !== 'published' && body.status !== 'draft') return fail('Unknown change.')
  await query(
    `UPDATE mdf_blog_posts SET status = $2::text,
       published_at = CASE WHEN $2::text = 'published' THEN COALESCE(published_at, now()) ELSE published_at END,
       updated_at = now() WHERE id = $1`,
    [id, body.status]
  )
  refreshWebsite()
  return ok()
})

export const DELETE = route(async req => {
  const id = new URL(req.url).searchParams.get('id')
  if (!id) return fail('Missing article.')
  await query('UPDATE mdf_blog_sources SET used_in_post_id = NULL WHERE used_in_post_id = $1', [id])
  await query('DELETE FROM mdf_blog_posts WHERE id = $1', [id])
  refreshWebsite()
  return ok()
})
