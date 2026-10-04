import { query } from '@/lib/db'

export interface NewsItem {
  title: string
  url: string
  source: string
  published: string
  snippet: string
}

const decode = (t: string) =>
  t
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const tag = (xml: string, name: string) => xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`))?.[1] ?? ''

/** Recent Google News stories for a search, newest first. Never throws; returns [] on any failure. */
export async function searchNews(search: string, days = 14): Promise<NewsItem[]> {
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(`${search} when:${days}d`)}&hl=en-IN&gl=IN&ceid=IN:en`
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MDFEnterprisesBot/1.0; +https://mdfenterprisesjk.in)' },
      signal: AbortSignal.timeout(8000),
      cache: 'no-store',
    })
    if (!res.ok) return []
    const xml = await res.text()
    return (xml.match(/<item>[\s\S]*?<\/item>/g) || [])
      .slice(0, 20)
      .map(item => {
        const source = decode(tag(item, 'source'))
        // Google appends " - Publisher" to every headline
        const title = decode(tag(item, 'title')).replace(new RegExp(`\\s+-\\s+${source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`), '')
        return {
          title,
          url: decode(tag(item, 'link')),
          source: source || 'News',
          published: decode(tag(item, 'pubDate')),
          snippet: decode(tag(item, 'description')).slice(0, 400),
        }
      })
      .filter(n => n.title && n.url)
  } catch {
    return []
  }
}

/** Stories for this topic that no earlier article has used. */
export async function freshNews(search: string, limit = 5): Promise<NewsItem[]> {
  const items = await searchNews(search)
  if (items.length === 0) return []
  const used = await query<{ url: string; title: string }>(
    'SELECT url, lower(title) AS title FROM mdf_blog_sources WHERE url = ANY($1) OR lower(title) = ANY($2)',
    [items.map(i => i.url), items.map(i => i.title.toLowerCase())]
  )
  const usedUrls = new Set(used.map(u => u.url))
  const usedTitles = new Set(used.map(u => u.title))
  return items.filter(i => !usedUrls.has(i.url) && !usedTitles.has(i.title.toLowerCase())).slice(0, limit)
}

export async function rememberSources(items: NewsItem[], search: string, postId: string) {
  for (const item of items) {
    await query(
      `INSERT INTO mdf_blog_sources (id, query, title, url, snippet, published_date, used_in_post_id)
       VALUES (md5($3), $1, $2, $3, $4, $5, $6)
       ON CONFLICT (url) DO UPDATE SET used_in_post_id = EXCLUDED.used_in_post_id`,
      [search.slice(0, 250), item.title.slice(0, 300), item.url, item.snippet, isNaN(Date.parse(item.published)) ? null : new Date(item.published).toISOString(), postId]
    )
  }
}
