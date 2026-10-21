import { query } from '@/lib/db'
import { getSettings } from '@/lib/db/settings'
import { refreshWebsite } from '@/lib/db/revalidate'
import { slugify } from '@/lib/sanitize'
import { freshNews, rememberSources } from './news'
import { closestTitle, qualityProblems, writeArticle, type Department } from './writer'
import { findCover, type CoverCredit } from './images'

export interface RunResult {
  status: 'published' | 'draft' | 'skipped' | 'failed'
  message: string
  postId?: string
  slug?: string
  title?: string
}

interface Topic { id: string; keyword: string; notes: string; cover_image: string | null }

const COVERS: Record<Department, string[]> = {
  sports: ['/images/SportsGoodsNew.webp', '/images/sports.webp', '/images/blog-cricket-cover.webp', '/images/custom_sports_gear.jpg'],
  fitness: ['/images/blog-gym-cover.webp', '/images/fitness.webp', '/images/gym_installation_service.jpg'],
  music: ['/images/MusicalInstrumentsNew.webp', '/images/music.webp'],
  awards: ['/images/Awards&TrophiesNew.webp', '/images/awards.webp'],
  general: ['/images/hero_kashmir_scene.jpg', '/images/showroom_interior.jpg', '/images/dal_lake_about.jpg'],
}

/** Topic's own picture → a matching free photo from Wikimedia → one of the site's own pictures. */
async function pickCover(department: Department, topic: Topic | null, ideas: string[]): Promise<{ url: string; credit: CoverCredit | null }> {
  if (topic?.cover_image) return { url: topic.cover_image, credit: null }
  const found = await findCover(ideas)
  if (found) return found
  const pool = COVERS[department] ?? COVERS.general
  // Rotate so consecutive articles do not share a picture
  const recent = await query<{ cover_image: string }>(
    `SELECT cover_image FROM mdf_blog_posts WHERE ai_generated = true ORDER BY created_at DESC LIMIT 6`
  )
  const used = new Set(recent.map(r => r.cover_image))
  return { url: pool.find(c => !used.has(c)) ?? pool[Math.floor(Math.random() * pool.length)], credit: null }
}

/** Today's date in Srinagar at "HH:MM" Srinagar time. */
export function todayAtIST(hhmm: string, now = new Date()) {
  const day = now.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' }) // YYYY-MM-DD
  const [h, m] = /^\d{1,2}:\d{2}$/.test(hhmm) ? hhmm.split(':').map(Number) : [10, 0]
  return new Date(`${day}T${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00+05:30`)
}

const laterOf = (a: Date, b: Date) => (a > b ? a : b)

async function uniqueSlug(title: string) {
  const base = slugify(title, 70) || `article-${Date.now()}`
  const taken = await query<{ slug: string }>('SELECT slug FROM mdf_blog_posts WHERE slug = $1 OR slug LIKE $2', [base, `${base}-%`])
  if (!taken.some(t => t.slug === base)) return base
  for (let n = 2; ; n++) if (!taken.some(t => t.slug === `${base}-${n}`)) return `${base}-${n}`
}

/** Least recently used active topic, so every topic gets its turn. */
async function nextTopic(): Promise<Topic | null> {
  const rows = await query<Topic>(
    `SELECT id, keyword, notes, cover_image FROM mdf_blog_topics WHERE is_active = true
     ORDER BY last_used_at ASC NULLS FIRST, times_used ASC, random() LIMIT 1`
  )
  return rows[0] ?? null
}

async function logRun(id: string, status: RunResult['status'], message: string, extra: { topic?: string; postId?: string; keepDay?: boolean } = {}) {
  await query(
    `UPDATE mdf_blog_runs SET status = $2, message = $3, topic = COALESCE($4, topic), post_id = $5,
            run_day = CASE WHEN $6::boolean THEN run_day ELSE NULL END
     WHERE id = $1`,
    [id, status, message.slice(0, 1000), extra.topic ?? null, extra.postId ?? null, extra.keepDay ?? false]
  )
}

/**
 * Write one article.
 *   auto   — called by the daily schedule. Respects on/off, "every N days", and writes at
 *            most one article per day no matter how often it is called.
 *   manual — the admin pressed "Write an article now".
 */
export async function runWriter(opts: { trigger: 'auto' | 'manual'; topicId?: string; customTopic?: string; publish?: boolean }): Promise<RunResult> {
  const settings = await getSettings()
  let runId: string

  if (opts.trigger === 'auto') {
    if (!settings.blog_auto_enabled) return { status: 'skipped', message: 'Automatic writing is turned off.' }

    const last = await query<{ days: number }>(
      `SELECT ((now() AT TIME ZONE 'Asia/Kolkata')::date - max(run_day)) AS days
       FROM mdf_blog_runs WHERE trigger = 'auto' AND run_day IS NOT NULL`
    )
    const days = last[0]?.days
    if (days !== null && days !== undefined && days < settings.blog_every_days) {
      return { status: 'skipped', message: `Not due yet (writes every ${settings.blog_every_days} day(s)).` }
    }

    // The unique run_day is the lock: a second call on the same day inserts nothing
    const lock = await query<{ id: string }>(
      `INSERT INTO mdf_blog_runs (run_day, trigger, status) VALUES ((now() AT TIME ZONE 'Asia/Kolkata')::date, 'auto', 'running')
       ON CONFLICT (run_day) DO NOTHING RETURNING id`
    )
    if (!lock[0]) return { status: 'skipped', message: "Today's article has already been written." }
    runId = lock[0].id
  } else {
    const busy = await query(
      `SELECT 1 FROM mdf_blog_runs WHERE status = 'running' AND created_at > now() - interval '90 seconds' LIMIT 1`
    )
    if (busy[0]) return { status: 'skipped', message: 'An article is already being written. Please wait a minute.' }
    runId = (await query<{ id: string }>(`INSERT INTO mdf_blog_runs (trigger, status) VALUES ('manual', 'running') RETURNING id`))[0].id
  }

  let topic: Topic | null = null
  let subject = opts.customTopic?.trim() || ''
  try {
    if (!subject) {
      topic = opts.topicId
        ? (await query<Topic>('SELECT id, keyword, notes, cover_image FROM mdf_blog_topics WHERE id = $1', [opts.topicId]))[0] ?? null
        : await nextTopic()
      subject = topic?.keyword || `sports in ${settings.blog_region}`
    }

    const search = `${subject} ${settings.blog_region}`
    const news = await freshNews(search)
    const existing = await query<{ title: string; topic: string | null }>('SELECT title, topic FROM mdf_blog_posts ORDER BY created_at DESC')
    const allTitles = existing.map(r => r.title)
    // The writer sees everything written on this topic plus the latest posts, so it picks a new angle
    const recentTitles = [...new Set([...existing.filter(r => r.topic === subject).map(r => r.title), ...allTitles.slice(0, 12)])].slice(0, 40)

    let draft = await writeArticle({ topic: subject, notes: topic?.notes, news, settings, recentTitles })
    let clash = closestTitle(draft.title, allTitles)
    if (clash) {
      draft = await writeArticle({ topic: subject, notes: topic?.notes, news, settings, recentTitles: [clash, ...recentTitles.filter(t => t !== clash)] })
      clash = closestTitle(draft.title, allTitles)
    }

    // A draft that still reads like an existing post, or is thin or machine-sounding, waits in Drafts for a human
    const weak = qualityProblems(draft.content)
    const publish = !clash && !weak.length && (opts.trigger === 'auto' ? settings.blog_auto_publish : Boolean(opts.publish))
    // The schedule writes early in the morning; the article appears at the admin's chosen time
    const goLive = !publish ? null : opts.trigger === 'auto' ? laterOf(todayAtIST(settings.blog_publish_time), new Date()) : new Date()
    const slug = await uniqueSlug(draft.title)
    const id = `ai-${slug.slice(0, 60)}-${Date.now().toString(36)}`
    const idea = draft.imageIdea
    const cover = await pickCover(draft.department, topic, [idea && `${idea} Kashmir`, idea, topic?.keyword ?? subject])
    const sources = news.map(n => ({ title: n.title, source: n.source, url: n.url }))

    await query(
      `INSERT INTO mdf_blog_posts (id, slug, title, excerpt, content, cover_image, cover_credit, category, status, published_at,
         is_featured, ai_generated, source_urls, meta_title, meta_description, topic, review_notes)
       VALUES ($1, $2, $3, $4, $5, $6, $14, $7, $8, $9, false, true, $10, $3, $11, $12, $13)`,
      [
        id, slug, draft.title, draft.excerpt, draft.content, cover.url, draft.category,
        publish ? 'published' : 'draft', goLive?.toISOString() ?? null,
        JSON.stringify(sources), draft.metaDescription, subject.slice(0, 200),
        `Written by ${draft.model}${draft.edited ? ', then edited for natural tone' : ''}${news.length ? ` from ${news.length} news report(s)` : ' as an evergreen article'}.${clash ? ` Held back: looks close to "${clash}".` : ''}${weak.length ? ` Held back: ${weak.join('; ')}.` : ''}`,
        cover.credit ? JSON.stringify(cover.credit) : null,
      ]
    )
    if (news.length) await rememberSources(news, search, id)
    if (topic) await query('UPDATE mdf_blog_topics SET times_used = times_used + 1, last_used_at = now() WHERE id = $1', [topic.id])

    const status = publish ? 'published' : 'draft'
    const scheduled = goLive && goLive.getTime() > Date.now() + 60_000
    const message = !publish
      ? `Saved "${draft.title}" to Drafts for your approval.${clash ? ` It looks close to "${clash}", so it was not published.` : ''}${weak.length ? ` Not published because: ${weak.join('; ')}.` : ''}`
      : scheduled
        ? `"${draft.title}" is ready and goes live today at ${settings.blog_publish_time}.`
        : `Published "${draft.title}".`
    await logRun(runId, status, message, { topic: subject, postId: id, keepDay: true })
    if (publish) refreshWebsite()
    return { status, message, postId: id, slug, title: draft.title }
  } catch (err) {
    const message = (err as Error)?.message || 'Something went wrong while writing.'
    console.error('[writer]', err)
    // Clearing run_day lets the schedule try again tomorrow (or the admin retry now)
    await logRun(runId, 'failed', message, { topic: subject }).catch(() => {})
    return { status: 'failed', message }
  }
}
