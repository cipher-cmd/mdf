// Ping IndexNow (Bing, Yandex, Seznam, Naver…) so new/changed pages get crawled within minutes.
// Usage:  npm run indexnow                 → submits every URL in the live sitemap
//         npm run indexnow -- /blog/my-post → submits only the given paths
// Run it after each deploy, or from the blog automation right after a post goes live.

const HOST = 'mdfenterprisesjk.in'
const KEY = 'a9abee7befce54ee54584549762be375' // must match public/<KEY>.txt

const paths = process.argv.slice(2)
let urls

if (paths.length) {
  urls = paths.map(p => (p.startsWith('http') ? p : `https://${HOST}${p.startsWith('/') ? p : `/${p}`}`))
} else {
  const res = await fetch(`https://${HOST}/sitemap.xml`)
  if (!res.ok) throw new Error(`sitemap fetch failed: ${res.status}`)
  const xml = await res.text()
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim())
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
})

// 200 = accepted, 202 = accepted (key validation pending). Anything else is a real failure.
console.log(`IndexNow: ${res.status} ${res.statusText} — ${urls.length} URL(s)`)
if (res.status !== 200 && res.status !== 202) process.exit(1)
