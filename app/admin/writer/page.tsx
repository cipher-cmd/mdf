'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Plus, Sparkle, Trash, PencilSimple, CheckCircle, WarningCircle, MinusCircle, ArrowRight } from '@phosphor-icons/react'
import { api, Badge, Button, Card, Drawer, Empty, Field, Loading, PageHeader, SectionTitle, Select, TextArea, TextInput, Toggle, timeAgo, useFeedback } from '@/components/admin/ui'
import { ImageField } from '@/components/admin/ImageField'
import { cn } from '@/lib/utils'

interface Topic { id: string; keyword: string; notes: string; is_active: boolean; times_used: number; last_used_at: string | null; cover_image: string | null }
interface Run { id: string; trigger: string; status: string; message: string; topic: string | null; post_id: string | null; created_at: string; slug: string | null; post_status: string | null }
interface Settings {
  blog_auto_enabled: boolean
  blog_auto_publish: boolean
  blog_every_days: number
  blog_region: string
  blog_length: string
  blog_tone: string
  blog_mention_store: boolean
  blog_extra_instructions: string
}
interface Result { status: string; message: string; postId?: string }

const STEPS = ['Looking for the latest news on your topic…', 'Writing the article…', 'Reading it back and removing anything that sounds robotic…', 'Adding a cover picture and saving…']

function Choice({ on, onClick, title, text }: { on: boolean; onClick: () => void; title: string; text: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={cn(
        'flex-1 rounded-[18px] p-4 text-left transition-shadow',
        on ? 'bg-ledger shadow-[inset_0_0_0_2px_var(--color-gold),0_8px_20px_-14px_rgba(139,107,35,0.6)]' : 'bg-vellum/50 shadow-[inset_0_0_0_1px_rgba(60,45,20,0.1)] hover:shadow-[inset_0_0_0_1px_rgba(60,45,20,0.25)]'
      )}
    >
      <span className="flex items-center gap-2 text-[14px] font-semibold text-ink">
        <span className={cn('h-4 w-4 rounded-full border-2 flex-shrink-0', on ? 'border-gold bg-gold shadow-[inset_0_0_0_2px_white]' : 'border-[#CFC4B2]')} />
        {title}
      </span>
      <span className="mt-1 block pl-6 text-[12.5px] leading-snug text-ink-muted">{text}</span>
    </button>
  )
}

export default function WriterPage() {
  const { notify, confirm } = useFeedback()
  const [topics, setTopics] = useState<Topic[] | null>(null)
  const [runs, setRuns] = useState<Run[]>([])
  const [settings, setSettings] = useState<Settings | null>(null)
  const [savedSettings, setSavedSettings] = useState('')
  const [savingSettings, setSavingSettings] = useState(false)

  const [pick, setPick] = useState('next')
  const [custom, setCustom] = useState('')
  const [publishNow, setPublishNow] = useState(false)
  const [writing, setWriting] = useState(false)
  const [step, setStep] = useState(0)
  const [result, setResult] = useState<Result | null>(null)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  const [newTopic, setNewTopic] = useState('')
  const [editing, setEditing] = useState<Topic | null>(null)

  const load = useCallback(async () => {
    try {
      const [t, r, s] = await Promise.all([api<Topic[]>('/api/admin/topics'), api<Run[]>('/api/admin/writer'), api<Settings>('/api/admin/settings')])
      setTopics(t.data)
      setRuns(r.data)
      setSettings(s.data)
      setSavedSettings(JSON.stringify(s.data))
    } catch (e) {
      notify((e as Error).message, 'error')
    }
  }, [notify])
  // Fetch on open; state is only set after the network answers
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load() }, [load])
  useEffect(() => () => { if (timer.current) clearInterval(timer.current) }, [])

  const write = async () => {
    if (pick === 'custom' && custom.trim().length < 3) return notify('Please type what the article should be about.', 'error')
    setWriting(true)
    setResult(null)
    setStep(0)
    timer.current = setInterval(() => setStep(s => Math.min(STEPS.length - 1, s + 1)), 6000)
    try {
      const r = await api<Result>('/api/admin/writer', 'POST', {
        topicId: pick !== 'next' && pick !== 'custom' ? pick : undefined,
        customTopic: pick === 'custom' ? custom : undefined,
        publish: publishNow,
      })
      setResult(r.data)
      if (r.data.status === 'failed' || r.data.status === 'skipped') notify(r.data.message, 'error')
      else notify(r.data.message)
      load()
    } catch (e) {
      setResult({ status: 'failed', message: (e as Error).message })
    } finally {
      if (timer.current) clearInterval(timer.current)
      setWriting(false)
    }
  }

  const addTopic = async () => {
    if (newTopic.trim().length < 2) return
    try {
      await api('/api/admin/topics', 'POST', { keyword: newTopic })
      notify(`"${newTopic.trim()}" added. The writer will include it in the rotation.`)
      setNewTopic('')
      load()
    } catch (e) {
      notify((e as Error).message, 'error')
    }
  }

  const saveTopic = async (t: Topic) => {
    try {
      await api('/api/admin/topics', 'PUT', t)
      notify('Topic saved.')
      setEditing(null)
      load()
    } catch (e) {
      notify((e as Error).message, 'error')
    }
  }

  const removeTopic = async (t: Topic) => {
    if (!(await confirm({ title: `Remove "${t.keyword}"?`, text: 'Articles already written stay on the website.', yes: 'Remove topic', danger: true }))) return
    try {
      await api(`/api/admin/topics?id=${t.id}`, 'DELETE')
      notify('Topic removed.')
      setEditing(null)
      load()
    } catch (e) {
      notify((e as Error).message, 'error')
    }
  }

  const saveSettings = async () => {
    if (!settings) return
    setSavingSettings(true)
    try {
      const r = await api<Settings>('/api/admin/settings', 'PUT', settings)
      setSettings(r.data)
      setSavedSettings(JSON.stringify(r.data))
      notify('Writing settings saved.')
    } catch (e) {
      notify((e as Error).message, 'error')
    } finally {
      setSavingSettings(false)
    }
  }

  const setS = <K extends keyof Settings>(k: K, v: Settings[K]) => setSettings(s => (s ? { ...s, [k]: v } : s))
  const settingsChanged = settings && JSON.stringify(settings) !== savedSettings

  if (!topics || !settings) return <Loading />
  const activeTopics = topics.filter(t => t.is_active)

  return (
    <>
      <PageHeader
        eyebrow="Your own writer"
        title="Article Writer"
        intro="It reads the latest news on your topics and writes a fresh, natural-sounding article for your blog. You choose the topics, how often, and whether you check it first."
      />

      {/* Focal: write one now */}
      <Card className="p-5 sm:p-7 mb-8">
        <SectionTitle hint="Takes about 20–40 seconds.">Write an article now</SectionTitle>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <Field label="What should it be about?">
            <Select
              value={pick}
              onChange={setPick}
              options={[
                { value: 'next', label: 'Next topic in line (automatic choice)' },
                ...activeTopics.map(t => ({ value: t.id, label: t.keyword })),
                { value: 'custom', label: 'Something else — I will type it' },
              ]}
            />
          </Field>
          {pick === 'custom' && (
            <Field label="Type the subject">
              <TextInput value={custom} onChange={e => setCustom(e.target.value)} placeholder="e.g. Choosing a football for school matches" />
            </Field>
          )}
        </div>
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <Choice on={!publishNow} onClick={() => setPublishNow(false)} title="Let me check it first" text="It goes to Drafts. You read it and press Publish." />
          <Choice on={publishNow} onClick={() => setPublishNow(true)} title="Publish straight away" text="It appears on the website as soon as it is written." />
        </div>
        <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <Button variant="gold" busy={writing} onClick={write} className="sm:min-w-[200px]">
            <Sparkle size={16} weight="fill" /> {writing ? 'Writing…' : 'Write it'}
          </Button>
          {writing && <p className="text-[13.5px] text-ink-soft adm-rise" key={step}>{STEPS[step]}</p>}
        </div>
        {result && !writing && (
          <div className={cn('mt-5 adm-rise flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl px-4 py-3.5', result.status === 'failed' || result.status === 'skipped' ? 'bg-rust-wash text-rust' : 'bg-leaf-wash text-leaf')}>
            <p className="flex-1 text-[14px] font-medium leading-snug">{result.message}</p>
            {result.postId && (
              <Link href={`/admin/articles/${result.postId}`} className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-ink hover:underline">
                Read it <ArrowRight size={14} weight="bold" />
              </Link>
            )}
          </div>
        )}
      </Card>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-start">
        {/* Topics */}
        <section className="min-w-0">
          <SectionTitle hint="The writer takes these in turn, so every topic gets its share. Switch one off to pause it.">Topics</SectionTitle>
          <Card className="p-4 sm:p-5">
            <form onSubmit={e => { e.preventDefault(); addTopic() }} className="flex gap-2 mb-4">
              <TextInput value={newTopic} onChange={e => setNewTopic(e.target.value)} placeholder="Add a topic, e.g. Football or Cricket bats" />
              <Button type="submit" variant="dark" disabled={newTopic.trim().length < 2}><Plus size={15} weight="bold" /> Add</Button>
            </form>
            {topics.length === 0 ? <Empty title="No topics yet" text="Add a few subjects you want articles about." /> : (
              <ul className="divide-y divide-hairline">
                {topics.map(t => (
                  <li key={t.id} className="flex items-center gap-3 py-3">
                    <div className="w-[52px] flex-shrink-0">
                      <Toggle on={t.is_active} onChange={v => saveTopic({ ...t, is_active: v })} label={<span className="sr-only">Use this topic</span>} />
                    </div>
                    <button onClick={() => setEditing({ ...t })} className="min-w-0 flex-1 text-left group">
                      <span className={cn('block text-[14.5px] font-semibold leading-snug group-hover:text-gold-deep', t.is_active ? 'text-ink' : 'text-ink-faint line-through')}>{t.keyword}</span>
                      <span className="block text-[12px] text-ink-muted truncate">
                        {t.times_used ? `${t.times_used} article${t.times_used > 1 ? 's' : ''} · last ${timeAgo(t.last_used_at)}` : 'Not written about yet'}
                        {t.notes && ` · ${t.notes}`}
                      </span>
                    </button>
                    <button onClick={() => setEditing({ ...t })} aria-label="Edit topic" className="h-10 w-10 flex-shrink-0 rounded-full flex items-center justify-center text-ink-soft hover:bg-vellum"><PencilSimple size={16} /></button>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </section>

        {/* Schedule & style */}
        <section className="min-w-0">
          <SectionTitle hint="One article at most per day, so your free plan limits are never at risk.">Schedule & style</SectionTitle>
          <Card className="p-5 space-y-5">
            <Toggle
              on={settings.blog_auto_enabled}
              onChange={v => setS('blog_auto_enabled', v)}
              label="Write articles automatically"
              hint="Runs once each morning (around 11:30 am India time)."
            />
            <div className={cn('space-y-5 transition-opacity', !settings.blog_auto_enabled && 'opacity-50 pointer-events-none')}>
              <Field label="How often">
                <Select
                  value={String(settings.blog_every_days)}
                  onChange={v => setS('blog_every_days', Number(v))}
                  options={[{ value: '1', label: 'Every day' }, { value: '2', label: 'Every 2 days' }, { value: '3', label: 'Every 3 days' }, { value: '7', label: 'Once a week' }]}
                />
              </Field>
              <Toggle
                on={settings.blog_auto_publish}
                onChange={v => setS('blog_auto_publish', v)}
                label="Publish without asking me"
                hint={settings.blog_auto_publish ? 'New articles go live by themselves.' : 'New articles wait in Drafts for you to approve.'}
              />
            </div>
            <div className="h-px bg-hairline" />
            <Field label="Area to focus on" help="Added to every news search.">
              <TextInput value={settings.blog_region} onChange={e => setS('blog_region', e.target.value)} />
            </Field>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Length">
                <Select value={settings.blog_length} onChange={v => setS('blog_length', v)} options={[{ value: 'short', label: 'Short (about 2 minutes)' }, { value: 'medium', label: 'Medium (about 4 minutes)' }, { value: 'long', label: 'Long (about 6 minutes)' }]} />
              </Field>
              <Field label="Voice">
                <Select value={settings.blog_tone} onChange={v => setS('blog_tone', v)} options={[{ value: 'friendly', label: 'Friendly shopkeeper' }, { value: 'expert', label: 'Experienced coach' }, { value: 'story', label: 'Local storyteller' }]} />
              </Field>
            </div>
            <Toggle on={settings.blog_mention_store} onChange={v => setS('blog_mention_store', v)} label="Mention MDF Enterprises" hint="At most once, near the end, only where it helps the reader." />
            <Field label="Anything else the writer should know?" help="Plain instructions, e.g. “Mention that we deliver to Baramulla and Anantnag” or “Avoid politics”.">
              <TextArea value={settings.blog_extra_instructions} onChange={e => setS('blog_extra_instructions', e.target.value)} rows={3} />
            </Field>
            <div className="flex items-center justify-end gap-3">
              {settingsChanged && <span className="text-[12.5px] text-rust">Not saved yet</span>}
              <Button variant="gold" busy={savingSettings} disabled={!settingsChanged} onClick={saveSettings}>Save settings</Button>
            </div>
          </Card>
        </section>
      </div>

      {/* History */}
      <section className="mt-10">
        <SectionTitle hint="Every time the writer ran, newest first.">History</SectionTitle>
        <Card className="overflow-hidden">
          {runs.length === 0 ? <Empty title="Nothing yet" text="The writer has not run yet. Try “Write it” above." /> : (
            <ul className="divide-y divide-hairline">
              {runs.map(r => {
                const good = r.status === 'published' || r.status === 'draft'
                const Icon = good ? CheckCircle : r.status === 'failed' ? WarningCircle : MinusCircle
                return (
                  <li key={r.id} className="flex items-start gap-3 px-4 sm:px-5 py-3.5">
                    <Icon size={20} weight="fill" className={cn('mt-0.5 flex-shrink-0', good ? 'text-leaf' : r.status === 'failed' ? 'text-rust' : 'text-ink-faint')} />
                    <div className="min-w-0 flex-1">
                      <p className="text-[14px] text-ink leading-snug">{r.status === 'running' ? 'Writing… (if this stays for long, the attempt timed out)' : r.message}</p>
                      <p className="mt-0.5 text-[12px] text-ink-muted">
                        {timeAgo(r.created_at)} · {r.trigger === 'auto' ? 'Automatic' : 'Started by you'}{r.topic ? ` · ${r.topic}` : ''}
                      </p>
                    </div>
                    {r.post_id && r.post_status && (
                      <Link href={`/admin/articles/${r.post_id}`} className="flex-shrink-0">
                        <Badge tone={r.post_status === 'published' ? 'live' : 'draft'}>{r.post_status === 'published' ? 'Live' : 'Draft'} · open</Badge>
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </Card>
      </section>

      <Drawer
        open={!!editing}
        onClose={() => setEditing(null)}
        title="Edit topic"
        footer={editing && (
          <>
            <Button variant="quiet" className="mr-auto text-rust" onClick={() => removeTopic(editing)}><Trash size={15} /> Remove</Button>
            <Button variant="ghost" onClick={() => setEditing(null)}>Cancel</Button>
            <Button variant="gold" onClick={() => saveTopic(editing)}>Save topic</Button>
          </>
        )}
      >
        {editing && (
          <div className="space-y-6">
            <Field label="Topic" help="A few words, like you would type into Google.">
              <TextInput value={editing.keyword} onChange={e => setEditing({ ...editing, keyword: e.target.value })} />
            </Field>
            <Field label="What to focus on (optional)" help="Guidance for this topic only, e.g. “school teams, under-16 tournaments”.">
              <TextArea value={editing.notes} onChange={e => setEditing({ ...editing, notes: e.target.value })} rows={3} />
            </Field>
            <Field label="Cover picture for this topic (optional)" help="If empty, a suitable picture from your website is chosen automatically.">
              <ImageField value={editing.cover_image ?? ''} onChange={v => setEditing({ ...editing, cover_image: v })} allowEmpty />
            </Field>
            <Toggle on={editing.is_active} onChange={v => setEditing({ ...editing, is_active: v })} label="Use this topic" />
          </div>
        )}
      </Drawer>
    </>
  )
}
