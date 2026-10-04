import { NextResponse, type NextRequest } from 'next/server'
import { runWriter } from '@/lib/ai/pipeline'
import { refreshWebsite } from '@/lib/db/revalidate'

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
  return NextResponse.json({ ok: result.status !== 'failed', ...result }, { status: result.status === 'failed' ? 500 : 200 })
}
