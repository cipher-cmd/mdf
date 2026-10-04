import { query } from '@/lib/db'
import { route, ok, fail, str, bool } from '@/lib/admin/api'

export const GET = route(async () =>
  ok(await query(`SELECT * FROM mdf_blog_topics ORDER BY is_active DESC, created_at ASC`))
)

export const POST = route(async req => {
  const body = await req.json()
  const keyword = str(body.keyword, 160)
  if (keyword.length < 2) return fail('Please type a topic, for example "Football".')
  const rows = await query(
    `INSERT INTO mdf_blog_topics (keyword, notes) VALUES ($1, $2) RETURNING *`,
    [keyword, str(body.notes, 1000)]
  )
  return ok(rows[0])
})

export const PUT = route(async req => {
  const body = await req.json()
  const keyword = str(body.keyword, 160)
  if (keyword.length < 2) return fail('Please type a topic.')
  const rows = await query(
    `UPDATE mdf_blog_topics SET keyword = $2, notes = $3, is_active = $4, cover_image = NULLIF($5, '') WHERE id = $1 RETURNING *`,
    [str(body.id, 40), keyword, str(body.notes, 1000), bool(body.is_active, true), str(body.cover_image, 255)]
  )
  return ok(rows[0])
})

export const DELETE = route(async req => {
  const id = new URL(req.url).searchParams.get('id')
  if (!id) return fail('Missing topic.')
  await query('DELETE FROM mdf_blog_topics WHERE id = $1', [id])
  return ok()
})
