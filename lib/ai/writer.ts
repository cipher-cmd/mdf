import Groq from 'groq-sdk'
import type { NewsItem } from './news'
import type { Settings } from '@/lib/db/settings'
import { sanitizeHtml, plainText } from '../sanitize.ts'

/**
 * Turns a topic (plus any fresh news about it) into a finished article that reads like
 * a person wrote it. Three layers keep the AI voice out:
 *   1. the writing brief bans the usual AI habits up front,
 *   2. a checker counts what slipped through and, if needed, a second model edits it out,
 *   3. a last plain-text pass swaps any stock words that are still left.
 * Free Groq limits are per model (≈8K tokens/minute), so writing and editing use two
 * different models and never queue behind each other.
 */

export const BLOG_CATEGORIES = {
  guides: 'Product Guides — practical buying or how-to advice',
  institutions: 'Institutional Supply — for schools, colleges, clubs, government buyers',
  culture: 'Sport & Culture — sport, music and community life in the region',
  'inside-mdf': 'Inside MDF — news about the store itself (rarely right for news articles)',
} as const

export type BlogCategoryId = keyof typeof BLOG_CATEGORIES
export type Department = 'sports' | 'fitness' | 'music' | 'awards' | 'general'

export interface WriteInput {
  topic: string
  notes?: string
  news: NewsItem[]
  settings: Settings
  recentTitles: string[]
}

export interface Draft {
  title: string
  excerpt: string
  category: BlogCategoryId
  department: Department
  content: string
  metaDescription: string
  model: string
  edited: boolean
}

const WORDS = { short: '450 to 550', medium: '700 to 850', long: '1000 to 1200' }
const TONES = {
  friendly: 'a knowledgeable local shopkeeper explaining things to a regular customer: warm, plain and practical',
  expert: 'an experienced coach or PE teacher: confident, specific, no fluff',
  story: 'a local features journalist: concrete scenes and people first, then the takeaway',
}

/** Words and phrases that give AI writing away. Checked after writing; also listed in the brief. */
const TELL_WORDS = [
  'delve', 'crucial', 'pivotal', 'robust', 'intricate', 'interplay', 'tapestry', 'testament', 'underscore',
  'showcase', 'foster', 'enhance', 'transformative', 'multifaceted', 'nuanced', 'noteworthy', 'vibrant',
  'seamless', 'elevate', 'unleash', 'unlock', 'embark', 'realm', 'myriad', 'plethora', 'paramount',
  'holistic', 'synergy', 'leverage', 'navigate the', 'bustling', 'nestled', 'game-changer', 'ever-evolving',
  'cutting-edge', 'meticulous', 'treasure trove', 'beacon', 'harness', 'resonate', 'in the heart of',
]
const TELL_PHRASES: [RegExp, string][] = [
  [/\bin conclusion\b/i, 'opens a closing paragraph with "In conclusion"'],
  [/\bin today'?s (fast-paced|modern|digital)?\s*world\b/i, 'uses "in today\'s world"'],
  [/\bwhether you'?re an?\b/i, 'uses the "whether you\'re a…" opener'],
  [/\bnot (just|only|merely) [^.]{1,60}?,? but (also )?/i, 'uses a "not just X but Y" contrast'],
  [/\bit'?s (not|never) (just )?about\b/i, 'uses "it\'s not about…" framing'],
  [/\blet'?s (dive|take a (closer )?look|explore)\b/i, 'uses "let\'s dive in / take a look"'],
  [/\bplays? a (key|vital|crucial|significant|pivotal) role\b/i, 'uses "plays a key role"'],
  [/\b(moreover|furthermore|additionally),/i, 'uses stiff connectors like Moreover/Furthermore'],
  [/\bwhen it comes to\b/i, 'uses "when it comes to"'],
  [/\b(ultimately|overall),\s/i, 'ends with an "Ultimately/Overall" summary'],
  [/\bstands? as a\b/i, 'uses "stands as a"'],
  [/\bmore than just\b/i, 'uses "more than just"'],
]

const BRIEF = `You write for the blog of a sports, fitness, music and awards equipment store in Srinagar, Kashmir. Readers are players, parents, coaches, school principals and club organisers in Jammu & Kashmir.

How to write:
- Write like a person, not a template. Answer the reader's real question early. No warm-up paragraph.
- Vary sentence length naturally. Mix short sentences with longer ones. Do not start paragraphs the same way.
- Use simple, precise, everyday words and ordinary verbs. Repeat a word when that is clearer than a synonym.
- Never use these words: ${TELL_WORDS.join(', ')}.
- Never use: "In conclusion", "In today's world", "Whether you're a…", "not just X but Y", "it's not about X, it's about Y", "let's dive in", "plays a key role", "when it comes to", "more than just", Moreover/Furthermore/Additionally to start sentences, or a closing paragraph that summarises everything.
- No em dashes. Use commas or full stops instead. Few semicolons. No exclamation marks. No emojis. No bold words inside paragraphs.
- No groups of three adjectives or three-item lists in every sentence. No rhetorical questions as openers.
- Subheadings are short and plain, like a person would write them. No colons in subheadings.
- End on a concrete, useful point, not a slogan.

Facts:
- Never invent facts, names, scores, numbers, dates, quotes, prices or sources.
- Only use specific facts that appear in the news reports you are given. If you are unsure, say less.
- Do not quote anyone unless the exact quote is in the reports.
- General knowledge that any coach would know (how to pick a bat size, how to care for a harmonium) is fine.

Format: reply with one JSON object only.`

function client() {
  const apiKey = process.env.GROQ_API_KEY?.trim()
  if (!apiKey) throw new Error('The AI key is missing. Add GROQ_API_KEY in Vercel → Settings → Environment Variables.')
  return new Groq({ apiKey, timeout: 40_000, maxRetries: 0 })
}

const isReasoner = (model: string) => model.startsWith('openai/gpt-oss') || model.startsWith('qwen/')

async function ask(model: string, system: string, user: string, maxTokens: number): Promise<Record<string, any>> {
  const groq = client()
  const body: Record<string, unknown> = {
    model,
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user },
    ],
    temperature: 0.75,
    max_completion_tokens: maxTokens,
    response_format: { type: 'json_object' },
  }
  if (model.startsWith('openai/gpt-oss')) Object.assign(body, { reasoning_effort: 'low', include_reasoning: false })
  else if (model.startsWith('qwen/')) Object.assign(body, { reasoning_format: 'hidden' })

  for (let attempt = 0; ; attempt++) {
    try {
      const res: any = await groq.chat.completions.create(body as any)
      const text: string = res.choices?.[0]?.message?.content || ''
      const json = text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1)
      return JSON.parse(json)
    } catch (err: any) {
      // One polite wait if the per-minute limit was hit and the wait is short
      const wait = Number(err?.headers?.['retry-after'] ?? err?.headers?.get?.('retry-after'))
      if (attempt === 0 && err?.status === 429 && wait > 0 && wait <= 15) {
        await new Promise(r => setTimeout(r, wait * 1000))
        continue
      }
      throw err
    }
  }
}

/** Problems a reader would notice as "AI-written". Empty = clean. */
export function findAiTells(html: string): string[] {
  const text = plainText(html)
  const lower = text.toLowerCase()
  const problems: string[] = []
  const words = TELL_WORDS.filter(w => new RegExp(`\\b${w.replace(/[-\s]/g, '[-\\s]')}`, 'i').test(lower))
  if (words.length) problems.push(`uses stock AI words: ${words.join(', ')}`)
  for (const [re, label] of TELL_PHRASES) if (re.test(text)) problems.push(label)
  const dashes = (text.match(/—|\s–\s| - /g) || []).length
  if (dashes > 0) problems.push(`uses ${dashes} dash${dashes > 1 ? 'es' : ''} (replace with commas or full stops)`)
  if ((text.match(/!/g) || []).length > 0) problems.push('uses exclamation marks')
  const openers = (html.match(/<p>\s*([A-Za-z']+)/g) || []).map(m => m.replace(/<p>\s*/, '').toLowerCase())
  const repeated = openers.filter((w, i) => openers.indexOf(w) !== i && !['the', 'a', 'i'].includes(w))
  if (new Set(repeated).size >= 2) problems.push(`several paragraphs start with the same word (${[...new Set(repeated)].join(', ')})`)
  return problems
}

/** Last-resort swaps for anything the editor pass missed. Meaning-preserving only. */
const SWAPS: [RegExp, string][] = [
  // Clause-break dashes become commas; dashes joining words ("year–round", "Under–19") become hyphens
  [/\s+[—–]\s+|—/g, ', '],
  [/(\w)[–‑](\w)/g, '$1-$2'],
  [/\bdelve(s|d)? into\b/gi, 'look$1 at'],
  [/\bcrucial\b/gi, 'important'],
  [/\bpivotal\b/gi, 'key'],
  [/\brobust\b/gi, 'strong'],
  [/\bshowcase(s|d)?\b/gi, 'show$1'],
  [/\bfoster(s|ed)?\b/gi, 'build$1'],
  [/\benhance(s|d)?\b/gi, 'improve$1'],
  [/\bvibrant\b/gi, 'lively'],
  [/\bseamless(ly)?\b/gi, 'smooth$1'],
  [/\bmyriad of\b/gi, 'many'],
  [/\bplethora of\b/gi, 'lots of'],
  [/\bparamount\b/gi, 'most important'],
  [/\butili[sz]e(s|d)?\b/gi, 'use$1'],
  [/\bnestled\b/gi, 'set'],
  [/\bbustling\b/gi, 'busy'],
  [/(<p>)\s*(In conclusion|Ultimately|Overall|Moreover|Furthermore|Additionally),\s*(\w)/gi, (_m: string, p: string, _w: string, c: string) => `${p}${c.toUpperCase()}`] as any,
  [/!/g, '.'],
]

export function polish(html: string): string {
  let out = html
  for (const [re, to] of SWAPS) out = out.replace(re, to as any)
  return out.replace(/,\s*,/g, ',').replace(/\s+,/g, ',').replace(/,\s*\./g, '.')
}

const clip = (s: unknown, max: number) => String(s ?? '').replace(/\s+/g, ' ').trim().slice(0, max)

export async function writeArticle(input: WriteInput): Promise<Draft> {
  const { topic, notes, news, settings, recentTitles } = input
  const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' })

  const reports = news.length
    ? `News reports to work from (these are the only specific facts you may use):\n${news
        .map((n, i) => `[${i + 1}] "${n.title}" (${n.source}, ${n.published || 'recent'})${n.snippet && n.snippet !== n.title ? `\n    ${n.snippet}` : ''}`)
        .join('\n')}\n\nBuild the article around what these reports say and what it means for people here. Mention the publication by name when you use a report's facts.`
    : `There are no fresh news reports on this topic. Write a practical, evergreen article on it. Do not claim that any recent event happened.`

  const store = settings.blog_mention_store
    ? 'You may mention MDF Enterprises in Srinagar at most once, near the end, in one plain sentence, and only where it actually helps the reader. No sales pitch.'
    : 'Do not mention MDF Enterprises or any shop.'

  const user = `Today is ${today}.
Topic: ${topic}${notes ? `\nWhat the owner wants covered: ${notes}` : ''}
Region: ${settings.blog_region}
Voice: ${TONES[settings.blog_tone] ?? TONES.friendly}
Length: ${WORDS[settings.blog_length] ?? WORDS.medium} words.
${store}${settings.blog_extra_instructions ? `\nOwner's extra instructions: ${settings.blog_extra_instructions}` : ''}
${recentTitles.length ? `\nRecent articles on the site (do not repeat their angle):\n${recentTitles.map(t => `- ${t}`).join('\n')}` : ''}

${reports}

Return JSON with exactly these keys:
{
  "title": "plain, specific headline under 70 characters, no colon, no clickbait",
  "excerpt": "one or two plain sentences under 160 characters saying what the reader gets",
  "category": one of ${Object.entries(BLOG_CATEGORIES).map(([k, v]) => `"${k}" (${v})`).join(', ')},
  "department": one of "sports", "fitness", "music", "awards", "general",
  "meta_description": "under 155 characters, for Google",
  "content": "the article as HTML using only <p>, <h2>, <h3>, <ul>, <li>, <blockquote>, <strong>, <em>. No <h1> and do not repeat the title. Two to four <h2> subheadings."
}`

  const writers = [...new Set([settings.ai_model, 'openai/gpt-oss-120b', 'openai/gpt-oss-20b'])]
  let raw: Record<string, any> | null = null
  let model = ''
  let lastError: unknown
  for (const m of writers) {
    try {
      raw = await ask(m, BRIEF, user, 4000)
      if (raw && typeof raw.content === 'string' && raw.content.length > 400) { model = m; break }
      lastError = new Error('The AI returned an article that was too short.')
      raw = null
    } catch (err) {
      lastError = err
    }
  }
  if (!raw) throw new Error(`The AI could not write the article: ${(lastError as Error)?.message || 'unknown error'}`)

  let content = sanitizeHtml(String(raw.content))
  let edited = false

  // Second opinion: a different model removes whatever still sounds machine-written
  const problems = findAiTells(content)
  if (problems.length) {
    const editor = model === 'openai/gpt-oss-20b' ? 'openai/gpt-oss-120b' : 'openai/gpt-oss-20b'
    try {
      const fix = await ask(
        editor,
        `You are a careful human editor. Fix only the listed problems in this article. Keep every fact, the structure and the HTML tags. Do not add new facts. Reply with JSON {"content": "<the corrected HTML>"}.`,
        `Problems to fix:\n- ${problems.join('\n- ')}\n\nArticle HTML:\n${content}`,
        3500
      )
      if (typeof fix.content === 'string' && fix.content.length > content.length * 0.7) {
        content = sanitizeHtml(fix.content)
        edited = true
      }
    } catch (err) {
      console.warn('[writer] editor pass skipped:', (err as Error).message)
    }
  }
  content = polish(content)

  const category = (Object.keys(BLOG_CATEGORIES) as BlogCategoryId[]).includes(raw.category) ? raw.category : 'culture'
  const department = (['sports', 'fitness', 'music', 'awards', 'general'] as Department[]).includes(raw.department) ? raw.department : 'general'
  const title = polish(clip(raw.title, 110)).replace(/[.,]+$/, '') || topic

  return {
    title,
    excerpt: polish(clip(raw.excerpt, 220)),
    category,
    department,
    content,
    metaDescription: polish(clip(raw.meta_description || raw.excerpt, 160)),
    model,
    edited,
  }
}
