import { query } from '@/lib/db'
import { getSettings } from '@/lib/db/settings'
import { refreshWebsite } from '@/lib/db/revalidate'
import { slugify } from '@/lib/sanitize'
import { freshNews, rememberSources } from './news'
import { writeArticle, type Department } from './writer'

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

async function pickCover(department: Department, topic?: Topic | null) {
  if (topic?.cover_image) return topic.cover_image
  const pool = COVERS[department] ?? COVERS.general
  // Rotate so consecutive articles do not share a picture
  const recent = await query<{ cover_image: string }>(
    `SELECT cover_image FROM mdf_blog_posts WHERE ai_generated = true ORDER BY created_at DESC LIMIT 6`
  )
  const used = new Set(recent.map(r => r.cover_image))
  return pool.find(c => !used.has(c)) ?? pool[Math.floor(Math.random() * pool.length)]
}

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
    const recentTitles = (await query<{ title: string }>('SELECT title FROM mdf_blog_posts ORDER BY created_at DESC LIMIT 12')).map(r => r.title)

    const draft = await writeArticle({ topic: subject, notes: topic?.notes, news, settings, recentTitles })

    const publish = opts.trigger === 'auto' ? settings.blog_auto_publish : Boolean(opts.publish)
    const slug = await uniqueSlug(draft.title)
    const id = `ai-${slug.slice(0, 60)}-${Date.now().toString(36)}`
    const cover = await pickCover(draft.department, topic)
    const sources = news.map(n => ({ title: n.title, source: n.source, url: n.url }))

    await query(
      `INSERT INTO mdf_blog_posts (id, slug, title, excerpt, content, cover_image, category, status, published_at,
         is_featured, ai_generated, source_urls, meta_title, meta_description, topic, review_notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, false, true, $10, $3, $11, $12, $13)`,
      [
        id, slug, draft.title, draft.excerpt, draft.content, cover, draft.category,
        publish ? 'published' : 'draft', publish ? new Date().toISOString() : null,
        JSON.stringify(sources), draft.metaDescription, subject.slice(0, 200),
        `Written by ${draft.model}${draft.edited ? ', then edited for natural tone' : ''}${news.length ? ` from ${news.length} news report(s)` : ' as an evergreen article'}.`,
      ]
    )
    if (news.length) await rememberSources(news, search, id)
    if (topic) await query('UPDATE mdf_blog_topics SET times_used = times_used + 1, last_used_at = now() WHERE id = $1', [topic.id])

    const status = publish ? 'published' : 'draft'
    const message = publish ? `Published "${draft.title}".` : `Saved "${draft.title}" to Drafts for your approval.`
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
