import { getSettings, saveSettings } from '@/lib/db/settings'
import { setPanelPassword, checkPassword } from '@/lib/admin/auth'
import { route, ok, fail, str } from '@/lib/admin/api'

/** Which behind-the-scenes keys are set in Vercel, in plain words. Never returns the values. */
function setupChecks() {
  return [
    { label: 'Database connected', done: Boolean(process.env.DATABASE_URL), fix: 'Add DATABASE_URL in Vercel → Settings → Environment Variables.' },
    { label: 'Admin password set', done: Boolean(process.env.ADMIN_PASSWORD), fix: 'Add ADMIN_PASSWORD in Vercel → Settings → Environment Variables.' },
    { label: 'AI writer key added', done: Boolean(process.env.GROQ_API_KEY), fix: 'Create a free key at console.groq.com and add it as GROQ_API_KEY in Vercel.' },
    { label: 'Daily schedule protected', done: Boolean(process.env.CRON_SECRET), fix: 'Add CRON_SECRET (any long random text) in Vercel so only Vercel can start the daily article.' },
  ]
}

export const GET = route(async () => ok(await getSettings(), { checks: setupChecks() }))

export const PUT = route(async req => {
  const body = await req.json()
  if (typeof body.blog_every_days === 'number') body.blog_every_days = Math.min(30, Math.max(1, Math.round(body.blog_every_days)))
  if (typeof body.blog_extra_instructions === 'string') body.blog_extra_instructions = body.blog_extra_instructions.slice(0, 1000)
  if (typeof body.blog_region === 'string') body.blog_region = body.blog_region.slice(0, 100)
  await saveSettings(body)
  return ok(await getSettings())
})

/** Change the admin password from inside the panel. */
export const POST = route(async req => {
  const body = await req.json()
  const current = str(body.current, 200)
  const next = str(body.next, 200)
  if (!(await checkPassword(current))) return fail('Your current password is not right.')
  if (next.length < 8) return fail('The new password needs at least 8 characters.')
  await setPanelPassword(next)
  return ok()
})
