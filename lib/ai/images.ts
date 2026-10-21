import { randomBytes } from 'node:crypto'
import { query } from '@/lib/db'

/**
 * Cover photos, free to reuse, no AI tokens:
 *  - Pexels (when PEXELS_API_KEY is set): professional stock photos, free licence, best quality.
 *  - Wikimedia Commons: no key needed, Creative Commons / public domain, always available.
 * Every photo is credited under the article, the chosen file is copied into mdf_media so the
 * article never depends on the provider staying online, and a photo already used by another
 * article is never offered again, so no two articles share a cover.
 */

export interface CoverCandidate {
  thumb: string
  full: string
  width: number
  height: number
  title: string
  credit: string
  creditUrl: string
}

export interface CoverCredit { text: string; url: string }

const UA = 'MDFEnterprisesWebsite/1.0 (https://mdfenterprisesjk.in; mdfenterprisesjk@gmail.com)'
// Pictures that are rarely good article covers
const SKIP = /\b(logo|map|diagram|chart|graph|flag|emblem|seal|icon|coat of arms|signature|poster|banner|screenshot|text|document|stamp|svg|plan|scheme)\b/i
// Commons only allows free licences; keep the ones that clearly allow reuse with credit
const LICENCE = /^(cc0|public domain|pd\b|cc by(-sa)? \d)/i
// Only these hosts may be downloaded into the picture library
const ALLOWED = /^https:\/\/((upload|thumb)\.wikimedia\.org|images\.pexels\.com)\//

const strip = (html: string) => html.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/\s+/g, ' ').trim()
// Commons "Artist" fields often carry a sentence ("This photo was taken by X. Feel free to use...")
const artistOf = (html: string) =>
  strip(html).replace(/^this (photo|image) was (taken|made) by /i, '').split(/\s*\.?\s*(?:This (?:image|photo)|Feel free)/i)[0].trim() || 'Unknown author'

async function searchPexels(search: string): Promise<CoverCandidate[]> {
  const key = process.env.PEXELS_API_KEY
  if (!key) return []
  const params = new URLSearchParams({ query: search, orientation: 'landscape', per_page: '30' })
  try {
    const res = await fetch(`https://api.pexels.com/v1/search?${params}`, {
      headers: { Authorization: key },
      signal: AbortSignal.timeout(8000),
      cache: 'no-store',
    })
    if (!res.ok) return []
    const photos = ((await res.json())?.photos ?? []) as any[]
    return photos
      .filter(p => p.width >= 1600 && p.width / p.height >= 1.25)
      .map(p => ({
        thumb: p.src.medium,
        // 1600px wide JPEG at Pexels' default quality, ~150-250 KB
        full: `${p.src.original}?auto=compress&cs=tinysrgb&w=1600`,
        width: 1600,
        height: Math.round((1600 * p.height) / p.width),
        title: strip(p.alt || search),
        credit: `Photo: ${strip(p.photographer).slice(0, 80)} / Pexels`,
        creditUrl: p.url,
      }))
  } catch {
    return []
  }
}

async function searchWikimedia(search: string): Promise<CoverCandidate[]> {
  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    generator: 'search',
    gsrnamespace: '6',
    gsrsearch: `${search} filetype:bitmap`,
    gsrlimit: '40',
    prop: 'imageinfo',
    iiprop: 'url|size|mime|extmetadata',
    iiurlwidth: '1280', // Wikimedia serves fixed sizes (500, 960, 1280, 1920); 1280 keeps covers ~150 KB
  })
  try {
    const res = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`, {
      headers: { 'User-Agent': UA },
      signal: AbortSignal.timeout(8000),
      cache: 'no-store',
    })
    if (!res.ok) return []
    const pages = Object.values((await res.json())?.query?.pages ?? {}) as any[]
    return pages
      .sort((a, b) => (a.index ?? 0) - (b.index ?? 0))
      .map(p => {
        const info = p.imageinfo?.[0]
        if (!info?.thumburl) return null
        const meta = info.extmetadata ?? {}
        const licence = strip(meta.LicenseShortName?.value ?? '')
        const artist = artistOf(meta.Artist?.value ?? '')
        const ratio = info.width / info.height
        if (info.mime !== 'image/jpeg' || info.width < 1200 || ratio < 1.25 || ratio > 2.2) return null
        if (SKIP.test(p.title) || !LICENCE.test(licence)) return null
        return {
          thumb: info.thumburl.replace(/\/\d+px-/, '/500px-'),
          full: info.thumburl,
          width: info.thumbwidth,
          height: info.thumbheight,
          title: strip(p.title.replace(/^File:/, '').replace(/\.[a-z]+$/i, '')),
          credit: `Photo: ${artist.slice(0, 80)} / Wikimedia Commons, ${licence}`,
          creditUrl: info.descriptionurl,
        } satisfies CoverCandidate
      })
      .filter((c): c is CoverCandidate => c !== null)
  } catch {
    return []
  }
}

/** Photo pages already used as a cover by any article. */
async function usedPhotos(): Promise<Set<string>> {
  try {
    const rows = await query<{ url: string }>(`SELECT cover_credit->>'url' AS url FROM mdf_blog_posts WHERE cover_credit IS NOT NULL`)
    return new Set(rows.map(r => r.url))
  } catch {
    return new Set()
  }
}

/** Photos for a few words, best source first, skipping any photo another article already uses. */
export async function searchCovers(search: string, limit = 9): Promise<CoverCandidate[]> {
  const [pexels, wiki, used] = await Promise.all([searchPexels(search), searchWikimedia(search), usedPhotos()])
  return [...pexels, ...wiki].filter(c => !used.has(c.creditUrl)).slice(0, limit)
}

/** Copy a photo into our own picture library and return its address. */
export async function saveCover(url: string, name: string): Promise<string> {
  if (!ALLOWED.test(url)) throw new Error('Only Pexels or Wikimedia photos can be imported.')
  const res = await fetch(url, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(10000), cache: 'no-store' })
  if (!res.ok) throw new Error('The photo could not be downloaded. Please pick another one.')
  if (!/^image\/jpeg/.test(res.headers.get('content-type') ?? '')) throw new Error('That file is not a photo. Please pick another one.')
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length > 1_500_000) throw new Error('That photo is too large. Please pick another one.')
  const id = randomBytes(10).toString('hex')
  await query(
    `INSERT INTO mdf_media (id, name, mime, data, bytes) VALUES ($1, $2, 'image/jpeg', decode($3, 'base64'), $4)`,
    [id, name.slice(0, 200), buf.toString('base64'), buf.length]
  )
  return `/media/${id}.jpg`
}

/** Best unused photo for an article: the writer's picture idea first, then the plain topic. */
export async function findCover(ideas: string[]): Promise<{ url: string; credit: CoverCredit } | null> {
  for (const idea of ideas.filter(Boolean)) {
    for (const best of await searchCovers(idea, 3)) {
      try {
        return { url: await saveCover(best.full, best.title), credit: { text: best.credit, url: best.creditUrl } }
      } catch {
        continue
      }
    }
  }
  return null
}
