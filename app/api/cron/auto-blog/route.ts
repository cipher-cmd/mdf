import { NextResponse, type NextRequest } from 'next/server'
import { runWriter } from '@/lib/ai/pipeline'
import { refreshWebsite } from '@/lib/db/revalidate'
import { query } from '@/lib/db'
import { pingIndexNow, postPaths } from '@/lib/indexnow'

export const dynamic = 'force-dynamic'
// Writing (~10s) + optional edit pass (~10s) + news lookup; 60s is the Hobby-plan ceiling
export const maxDuration = 60

/**
 * Called once a day by Vercel Cron (vercel.json). Vercel sends
 * "Authorization: Bearer $CRON_SECRET" automatically when CRON_SECRET is set.
 * Without the secret nobody — including the scheduler — can trigger a run.
 */
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET
  if (!secret || req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }
  const result = await runWriter({ trigger: 'auto' })
  // Also picks up any article scheduled for today
  refreshWebsite()
  // Scheduled articles whose date came up since the last run. Unreviewed AI articles are noindex, so they are left out;
  // articles the admin published by hand were pinged then, and a second ping is harmless.
  const live = await query<{ slug: string }>(
    `SELECT slug FROM mdf_blog_posts WHERE status = 'published' AND (NOT ai_generated OR reviewed_at IS NOT NULL)
       AND published_at > now() - interval '1 day' AND published_at <= now()`
  )
  pingIndexNow([...new Set(live.flatMap(p => postPaths(p.slug)))])
  return NextResponse.json({ ok: result.status !== 'failed', ...result }, { status: result.status === 'failed' ? 500 : 200 })
}
