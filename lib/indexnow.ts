import { after } from 'next/server'

const HOST = 'mdfenterprisesjk.in'
const KEY = '8b632c949073491e99a96291c30233b6' // must match public/<KEY>.txt and scripts/indexnow.mjs

/**
 * Tell Bing and the other IndexNow engines these pages changed, so they recrawl within minutes.
 * Runs after the response is sent, only on the live site; a failed ping is logged, never shown to the admin.
 */
export function pingIndexNow(paths: string[]) {
  if (process.env.VERCEL_ENV !== 'production' || !paths.length) return
  after(async () => {
    try {
      const res = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          host: HOST,
          key: KEY,
          keyLocation: `https://${HOST}/${KEY}.txt`,
          urlList: paths.map(p => `https://${HOST}${p}`),
        }),
      })
      // 200 = accepted, 202 = accepted while the key is still being checked
      if (res.status !== 200 && res.status !== 202) console.error(`[indexnow] ${res.status} ${await res.text()}`)
    } catch (err) {
      console.error('[indexnow]', err)
    }
  })
}

/** An article page plus the blog index that lists it. */
export const postPaths = (slug: string) => [`/blog/${slug}`, '/blog']

/** Department pages that show these departments' products, plus the products overview. */
export const departmentPaths = (...ids: (string | undefined)[]) =>
  ['/products', ...new Set(ids.filter(Boolean).map(id => `/products/${id}`))]
