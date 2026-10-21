import { searchCovers, saveCover } from '@/lib/ai/images'
import { route, ok, fail, str } from '@/lib/admin/api'

/** Free photo suggestions from Wikimedia Commons for a few words. */
export const GET = route(async req => {
  const q = str(new URL(req.url).searchParams.get('q'), 100)
  if (q.length < 2) return fail('Type a few words about the photo you want.')
  return ok(await searchCovers(q, 12))
})

/** Copy the chosen photo into the picture library. */
export const POST = route(async req => {
  const body = await req.json()
  try {
    return ok({ url: await saveCover(str(body.url, 1000), str(body.title, 200) || 'Cover photo') })
  } catch (e) {
    return fail((e as Error).message)
  }
})
