'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, ArrowSquareOut, Sparkle, Trash } from '@phosphor-icons/react'
import { api, Badge, Button, Card, Field, Loading, Select, TextArea, TextInput, Toggle, useFeedback } from '@/components/admin/ui'
import { ImageField } from '@/components/admin/ImageField'
import { RichEditor } from '@/components/admin/RichEditor'
import { blogCategories } from '@/lib/data/blog'

interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  cover_image: string
  category: string
  status: 'published' | 'draft'
  published_at: string | null
  is_featured: boolean
  meta_description: string
  ai_generated?: boolean
  review_notes?: string | null
  source_urls?: { title: string; source: string; url: string }[]
}

const empty: Article = {
  id: '', slug: '', title: '', excerpt: '', content: '', cover_image: '/images/sports.webp', category: 'guides',
  status: 'draft', published_at: null, is_featured: false, meta_description: '',
}

/** ISO date ↔ the value a datetime-local box understands, in the viewer's own time. */
const toLocal = (iso: string | null) => {
  if (!iso) return ''
  const d = new Date(iso)
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
}

export default function ArticleEditor() {
  const { id } = useParams<{ id: string }>()
  const isNew = id === 'new'
  const router = useRouter()
  const { notify, confirm } = useFeedback()
  const [a, setA] = useState<Article | null>(isNew ? empty : null)
  const [dirty, setDirty] = useState(false)
  const [saving, setSaving] = useState<'' | 'draft' | 'published'>('')

  useEffect(() => {
    if (isNew) return
    api<Article>(`/api/admin/blog?id=${encodeURIComponent(id)}`)
      .then(r => setA({ ...empty, ...r.data, excerpt: r.data.excerpt ?? '', meta_description: r.data.meta_description ?? '' }))
      .catch(e => notify(e.message, 'error'))
  }, [id, isNew, notify])

  // Do not lose unsaved writing by accident
  useEffect(() => {
    if (!dirty) return
    const warn = (e: BeforeUnloadEvent) => e.preventDefault()
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirty])

  if (!a) return <Loading />

  const set = <K extends keyof Article>(key: K, value: Article[K]) => {
    setA(x => (x ? { ...x, [key]: value } : x))
    setDirty(true)
  }

  const save = async (status: 'draft' | 'published') => {
    setSaving(status)
    try {
      const body = { ...a, status, published_at: a.published_at }
      const r = await api<{ id: string; slug: string }>('/api/admin/blog', isNew ? 'POST' : 'PUT', body)
      setDirty(false)
      const future = status === 'published' && a.published_at && new Date(a.published_at) > new Date()
      notify(status === 'published' ? (future ? 'Saved. It will appear on the website on the date you chose.' : 'Published. The article is on the website.') : 'Saved as a draft. Only you can see it.')
      if (isNew) router.replace(`/admin/articles/${r.data.id}`)
      else setA(x => (x ? { ...x, status, slug: r.data.slug } : x))
    } catch (e) {
      notify((e as Error).message, 'error')
    } finally {
      setSaving('')
    }
  }

  const remove = async () => {
    if (!(await confirm({ title: 'Delete this article?', text: 'It will be removed from the website for good.', yes: 'Delete article', danger: true }))) return
    try {
      await api(`/api/admin/blog?id=${encodeURIComponent(a.id)}`, 'DELETE')
      setDirty(false)
      notify('Article deleted.')
      router.replace('/admin/articles')
    } catch (e) {
      notify((e as Error).message, 'error')
    }
  }

  const live = a.status === 'published'

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <Link href="/admin/articles" className="inline-flex items-center gap-2 text-[13px] font-semibold text-ink-soft hover:text-ink">
          <ArrowLeft size={14} weight="bold" /> All articles
        </Link>
        <div className="flex items-center gap-2">
          {live ? <Badge tone="live">On the website</Badge> : <Badge tone="draft">Draft — only you can see it</Badge>}
          {live && a.slug && (
            <a href={`/blog/${a.slug}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-gold-deep hover:underline">
              View <ArrowSquareOut size={14} />
            </a>
          )}
        </div>
      </div>

      {a.ai_generated && a.review_notes && (
        <p className="mb-5 flex items-start gap-2.5 rounded-2xl bg-gold-wash px-4 py-3 text-[13px] leading-snug text-gold-deep">
          <Sparkle size={17} weight="fill" className="text-gold flex-shrink-0" />
          <span>{a.review_notes} Please read it once before publishing, and change anything you like.</span>
        </p>
      )}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px] items-start">
        <div className="space-y-5 min-w-0">
          <textarea
            value={a.title}
            onChange={e => set('title', e.target.value)}
            placeholder="Article title"
            rows={2}
            className="w-full resize-none bg-transparent font-serif-heading text-[36px] sm:text-[46px] font-bold leading-[1.02] tracking-[-0.01em] text-ink placeholder:text-ink-faint outline-none text-balance"
          />
          <Field label="Short summary" help="Shown under the title and on the Blog page. One or two sentences.">
            <TextArea value={a.excerpt} onChange={e => set('excerpt', e.target.value)} rows={2} />
          </Field>
          <RichEditor value={a.content} onChange={html => set('content', html)} />
          {a.source_urls && a.source_urls.length > 0 && (
            <Card className="p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep mb-2">— News this article is based on</p>
              <ul className="space-y-1.5">
                {a.source_urls.map(s => (
                  <li key={s.url} className="text-[13px] leading-snug">
                    <a href={s.url} target="_blank" rel="noreferrer" className="text-ink hover:text-gold-deep underline decoration-hairline underline-offset-4">{s.title || s.url}</a>
                    {s.source && <span className="text-ink-faint"> · {s.source}</span>}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[12px] text-ink-muted">These links are listed under the article on the website, so readers can check the facts.</p>
            </Card>
          )}
        </div>

        <aside className="space-y-5 xl:sticky xl:top-6">
          <Card className="p-5 space-y-3">
            <Button variant="gold" className="w-full" busy={saving === 'published'} onClick={() => save('published')}>
              {live ? 'Save changes' : 'Publish to website'}
            </Button>
            <Button variant="ghost" className="w-full" busy={saving === 'draft'} onClick={() => save('draft')}>
              {live ? 'Take off website (to drafts)' : 'Save as draft'}
            </Button>
            {dirty && <p className="text-center text-[12px] text-rust">You have changes that are not saved yet.</p>}
          </Card>

          <Card className="p-5 space-y-5">
            <Field label="Cover picture" help="A wide photo works best.">
              <ImageField value={a.cover_image} onChange={v => set('cover_image', v)} maxSide={1800} />
            </Field>
            <Field label="Blog section">
              <Select value={a.category} onChange={v => set('category', v)} options={blogCategories.map(c => ({ value: c.id, label: c.label }))} />
            </Field>
            <Field label="Publish date" help="Pick a future date to schedule it. Leave empty to publish now.">
              <TextInput
                type="datetime-local"
                value={toLocal(a.published_at)}
                onChange={e => set('published_at', e.target.value ? new Date(e.target.value).toISOString() : null)}
              />
            </Field>
            <Toggle on={a.is_featured} onChange={v => set('is_featured', v)} label="Feature on the Blog page" hint="Shown large at the top. Only one article can be featured." />
          </Card>

          <Card className="p-5">
            <Field label="Description for Google" help={`${a.meta_description.length}/155 letters. Leave empty to use the summary.`}>
              <TextArea value={a.meta_description} onChange={e => set('meta_description', e.target.value.slice(0, 300))} rows={3} />
            </Field>
            {!isNew && live && <p className="mt-3 text-[12px] text-ink-muted">Web address: /blog/{a.slug} (stays the same so old links keep working)</p>}
          </Card>

          {!isNew && (
            <Button variant="quiet" className="w-full text-rust" onClick={remove}><Trash size={15} /> Delete article</Button>
          )}
        </aside>
      </div>
    </>
  )
}
