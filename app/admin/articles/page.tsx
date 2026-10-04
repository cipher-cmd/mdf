'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Plus, MagnifyingGlass, ArrowSquareOut, Sparkle } from '@phosphor-icons/react'
import { api, Badge, Button, Card, Empty, Loading, PageHeader, TextInput, timeAgo, useFeedback } from '@/components/admin/ui'
import { categoryLabel } from '@/lib/data/blog'
import { cn } from '@/lib/utils'

interface Row {
  id: string
  slug: string
  title: string
  excerpt: string
  cover_image: string | null
  category: string
  status: 'published' | 'draft'
  published_at: string | null
  created_at: string
  is_featured: boolean
  ai_generated: boolean
}

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'published', label: 'On the website' },
  { id: 'draft', label: 'Drafts' },
] as const

const isScheduled = (r: { status: string; published_at: string | null }) =>
  r.status === 'published' && !!r.published_at && new Date(r.published_at) > new Date()

export default function ArticlesPage() {
  const [rows, setRows] = useState<Row[] | null>(null)
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('all')
  const [search, setSearch] = useState('')
  const [busy, setBusy] = useState('')
  const { notify } = useFeedback()

  const load = useCallback(() => {
    api<Row[]>('/api/admin/blog').then(r => setRows(r.data)).catch(e => notify(e.message, 'error'))
  }, [notify])
  useEffect(load, [load])

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase()
    return (rows ?? []).filter(r => (tab === 'all' || r.status === tab) && (!q || `${r.title} ${r.excerpt}`.toLowerCase().includes(q)))
  }, [rows, tab, search])

  const count = (id: string) => (rows ?? []).filter(r => id === 'all' || r.status === id).length

  const flip = async (r: Row) => {
    setBusy(r.id)
    const status = r.status === 'published' ? 'draft' : 'published'
    try {
      await api('/api/admin/blog', 'PATCH', { id: r.id, status })
      notify(status === 'published' ? 'Published. The article is on the website.' : 'Taken off the website and moved to Drafts.')
      load()
    } catch (e) {
      notify((e as Error).message, 'error')
    } finally {
      setBusy('')
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Your blog"
        title="Articles"
        intro="Everything on the Blog page. Drafts are only visible to you until you publish them."
        actions={
          <>
            <Link href="/admin/writer" className="inline-flex items-center gap-2 min-h-[44px] px-5 rounded-full text-[13.5px] font-semibold bg-ledger text-ink shadow-[0_0_0_1px_rgba(60,45,20,0.14)] hover:bg-gold-wash">
              <Sparkle size={16} weight="fill" className="text-gold" /> Get one written
            </Link>
            <Link href="/admin/articles/new" className="inline-flex items-center gap-2 min-h-[44px] px-5 rounded-full text-[13.5px] font-semibold bg-gold hover:bg-[#BF9744] text-[#1E170A] shadow-[0_8px_20px_-10px_rgba(204,165,82,0.9)]">
              <Plus size={16} weight="bold" /> Write an article
            </Link>
          </>
        }
      />

      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-5">
        <div role="tablist" className="inline-flex rounded-full bg-ledger p-1 shadow-[0_0_0_1px_rgba(60,45,20,0.1)] self-start">
          {TABS.map(t => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={cn('min-h-[38px] rounded-full px-4 text-[13px] font-semibold transition-colors', tab === t.id ? 'bg-ink text-white' : 'text-ink-soft hover:text-ink')}
            >
              {t.label} <span className={cn('tabular-nums', tab === t.id ? 'text-gold' : 'text-ink-faint')}>{count(t.id)}</span>
            </button>
          ))}
        </div>
        <div className="relative flex-1 md:max-w-[360px] md:ml-auto">
          <MagnifyingGlass size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
          <TextInput value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles" className="pl-10" />
        </div>
      </div>

      {!rows ? <Loading /> : visible.length === 0 ? (
        <Card><Empty title={rows.length ? 'Nothing here' : 'No articles yet'} text={rows.length ? 'Try another tab or search.' : 'Write one yourself or let the Article Writer do it.'} /></Card>
      ) : (
        <Card className="overflow-hidden">
          <ul className="divide-y divide-hairline">
            {visible.map(r => {
              const scheduled = isScheduled(r)
              return (
                <li key={r.id} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 p-4 sm:px-5">
                  <Link href={`/admin/articles/${r.id}`} className="group flex items-center gap-4 min-w-0 flex-1">
                    <span className="relative h-[64px] w-[100px] flex-shrink-0 overflow-hidden rounded-[12px] bg-vellum outline outline-1 -outline-offset-1 outline-black/10">
                      {r.cover_image && <Image src={r.cover_image} alt="" fill className="object-cover" sizes="100px" unoptimized={r.cover_image.startsWith('/media/')} />}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[10.5px] font-semibold uppercase tracking-[0.16em] text-gold-deep">{categoryLabel(r.category)}</span>
                      <span className="block font-serif-heading text-[20px] font-bold leading-tight text-ink group-hover:text-[#6E5418] line-clamp-2">{r.title}</span>
                      <span className="mt-1 flex flex-wrap items-center gap-1.5 text-[12px] text-ink-muted">
                        {scheduled ? <Badge tone="gold">Goes live {new Date(r.published_at!).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</Badge>
                          : r.status === 'published' ? <Badge tone="live">Live</Badge> : <Badge tone="draft">Draft</Badge>}
                        {r.ai_generated && <Badge tone="neutral"><Sparkle size={11} weight="fill" className="text-gold" /> Article Writer</Badge>}
                        {r.is_featured && <Badge tone="gold">Featured</Badge>}
                        <span>{timeAgo(r.published_at ?? r.created_at)}</span>
                      </span>
                    </span>
                  </Link>
                  <div className="flex items-center gap-2 sm:flex-shrink-0">
                    {r.status === 'published' && !scheduled && (
                      <a href={`/blog/${r.slug}`} target="_blank" rel="noreferrer" aria-label="View on the website" title="View on the website" className="h-10 w-10 rounded-full flex items-center justify-center text-gold-deep hover:bg-gold-wash">
                        <ArrowSquareOut size={17} />
                      </a>
                    )}
                    <Button size="sm" variant={r.status === 'published' ? 'ghost' : 'gold'} busy={busy === r.id} onClick={() => flip(r)} className="min-h-[40px]">
                      {r.status === 'published' ? 'Unpublish' : 'Publish'}
                    </Button>
                  </div>
                </li>
              )
            })}
          </ul>
        </Card>
      )}
    </>
  )
}
