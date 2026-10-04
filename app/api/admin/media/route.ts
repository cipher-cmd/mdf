import { NextResponse, type NextRequest } from 'next/server'
import { randomBytes } from 'node:crypto'
import { query } from '@/lib/db'

const MAX_BYTES = 1_500_000 // pictures are shrunk in the browser first; this only stops accidents
const ALLOWED = new Set(['image/webp', 'image/jpeg', 'image/png', 'image/avif'])
const EXT: Record<string, string> = { 'image/webp': 'webp', 'image/jpeg': 'jpg', 'image/png': 'png', 'image/avif': 'avif' }

/** Picture library: newest first, without the picture data itself. */
export async function GET() {
  try {
    const rows = await query(
      `SELECT id, name, mime, bytes, width, height, created_at FROM mdf_media ORDER BY created_at DESC LIMIT 300`
    )
    const totals = await query<{ count: string; bytes: string | null }>('SELECT count(*) AS count, sum(bytes) AS bytes FROM mdf_media')
    return NextResponse.json({
      ok: true,
      data: rows.map(r => ({ ...r, url: `/media/${r.id}.${EXT[r.mime] || 'webp'}` })),
      totalBytes: Number(totals[0]?.bytes || 0),
    })
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }
}

/** Upload one picture. Body = the image bytes; name/width/height come as query params. */
export async function POST(req: NextRequest) {
  try {
    const mime = (req.headers.get('content-type') || '').split(';')[0].trim()
    if (!ALLOWED.has(mime)) {
      return NextResponse.json({ ok: false, error: 'Please choose a photo (JPG, PNG or WebP).' }, { status: 400 })
    }
    const buf = Buffer.from(await req.arrayBuffer())
    if (buf.length === 0) return NextResponse.json({ ok: false, error: 'The picture was empty.' }, { status: 400 })
    if (buf.length > MAX_BYTES) {
      return NextResponse.json({ ok: false, error: 'This picture is too large. Please choose a smaller one.' }, { status: 413 })
    }

    const sp = req.nextUrl.searchParams
    const id = randomBytes(10).toString('hex')
    const name = (sp.get('name') || 'picture').slice(0, 200)
    const width = Number(sp.get('w')) || null
    const height = Number(sp.get('h')) || null

    await query(
      `INSERT INTO mdf_media (id, name, mime, data, bytes, width, height)
       VALUES ($1, $2, $3, decode($4, 'base64'), $5, $6, $7)`,
      [id, name, mime, buf.toString('base64'), buf.length, width, height]
    )
    return NextResponse.json({ ok: true, data: { id, url: `/media/${id}.${EXT[mime]}`, bytes: buf.length, width, height } })
  } catch (error: any) {
    console.error('[media upload]', error)
    return NextResponse.json({ ok: false, error: 'Upload failed. Please try again.' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id')
    if (!id) return NextResponse.json({ ok: false, error: 'Missing picture.' }, { status: 400 })
    const pattern = `%/media/${id}.%`
    const used = await query<{ place: string }>(
      `SELECT 'a product' AS place FROM mdf_products WHERE image LIKE $1
       UNION ALL SELECT 'an article' FROM mdf_blog_posts WHERE cover_image LIKE $1 OR content LIKE $1
       UNION ALL SELECT 'a department' FROM mdf_categories WHERE image LIKE $1 OR poster LIKE $1
       UNION ALL SELECT 'the website text' FROM mdf_site_copy WHERE content::text LIKE $1
       LIMIT 1`,
      [pattern]
    )
    if (used[0]) {
      return NextResponse.json(
        { ok: false, error: `This picture is still used by ${used[0].place}. Change it there first, then delete it here.` },
        { status: 409 }
      )
    }
    await query('DELETE FROM mdf_media WHERE id = $1', [id])
    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }
}
