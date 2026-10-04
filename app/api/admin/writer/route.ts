import { query } from '@/lib/db'
import { runWriter } from '@/lib/ai/pipeline'
import { route, ok, str } from '@/lib/admin/api'

export const maxDuration = 60

/** Recent writer activity, newest first. */
export const GET = route(async () =>
  ok(await query(
    `SELECT r.id, r.trigger, r.status, r.message, r.topic, r.post_id, r.created_at, p.slug, p.status AS post_status
     FROM mdf_blog_runs r LEFT JOIN mdf_blog_posts p ON p.id = r.post_id
     ORDER BY r.created_at DESC LIMIT 30`
  ))
)

/** "Write an article now" */
export const POST = route(async req => {
  const body = await req.json().catch(() => ({}))
  const result = await runWriter({
    trigger: 'manual',
    topicId: str(body.topicId, 40) || undefined,
    customTopic: str(body.customTopic, 200) || undefined,
    publish: body.publish === true,
  })
  return ok(result)
})
