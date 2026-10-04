import { query } from '@/lib/db'

/**
 * Serves an uploaded picture from mdf_media. A picture never changes once uploaded
 * (replacing one creates a new address), so browsers and Vercel's CDN keep it for a
 * year and the database is read roughly once per picture.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params
  const id = file.replace(/\.[a-z0-9]+$/i, '')
  if (!/^[a-f0-9]{8,40}$/.test(id)) return new Response('Not found', { status: 404 })

  try {
    const rows = await query<{ mime: string; b64: string }>(
      `SELECT mime, encode(data, 'base64') AS b64 FROM mdf_media WHERE id = $1`,
      [id]
    )
    if (!rows[0]) return new Response('Not found', { status: 404, headers: { 'Cache-Control': 'public, max-age=60' } })
    return new Response(Buffer.from(rows[0].b64, 'base64'), {
      headers: {
        'Content-Type': rows[0].mime,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch (err) {
    console.error('[media]', err)
    return new Response('Unavailable', { status: 503 })
  }
}
