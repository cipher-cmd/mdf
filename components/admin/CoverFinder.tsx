'use client'

import { useState } from 'react'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { api, Button, Drawer, Empty, Loading, TextInput, useFeedback } from './ui'

interface Candidate { thumb: string; full: string; title: string; credit: string; creditUrl: string }
export interface CoverCredit { text: string; url: string }

/**
 * "Find a free photo": searches Wikimedia Commons (free, credited photos) and copies the
 * chosen one into the picture library. No AI is used, so it costs nothing.
 */
export function CoverFinder({ suggestion, onPick }: { suggestion: string; onPick: (url: string, credit: CoverCredit) => void }) {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [results, setResults] = useState<Candidate[] | null>(null)
  const [busy, setBusy] = useState(false)
  const [importing, setImporting] = useState('')
  const { notify } = useFeedback()

  const search = async (words: string) => {
    if (words.trim().length < 2) return
    setBusy(true)
    setResults(null)
    try {
      setResults((await api<Candidate[]>(`/api/admin/covers?q=${encodeURIComponent(words.trim())}`)).data)
    } catch (e) {
      notify((e as Error).message, 'error')
      setResults([])
    } finally {
      setBusy(false)
    }
  }

  const start = () => {
    // A short, plain search works far better than a full headline
    const words = suggestion.toLowerCase().replace(/[^a-z\s]/g, ' ').split(/\s+/).filter(w => w.length > 3).slice(0, 3).join(' ')
    setQ(words)
    setOpen(true)
    search(words)
  }

  const choose = async (c: Candidate) => {
    setImporting(c.full)
    try {
      const r = await api<{ url: string }>('/api/admin/covers', 'POST', { url: c.full, title: c.title })
      onPick(r.data.url, { text: c.credit, url: c.creditUrl })
      notify('Photo added. The photographer is credited under the picture.')
      setOpen(false)
    } catch (e) {
      notify((e as Error).message, 'error')
    } finally {
      setImporting('')
    }
  }

  return (
    <>
      <Button type="button" size="sm" variant="quiet" onClick={start}>
        <MagnifyingGlass size={14} weight="bold" /> Find a free photo
      </Button>
      <Drawer open={open} onClose={() => setOpen(false)} title="Find a free photo">
        <form onSubmit={e => { e.preventDefault(); search(q) }} className="flex gap-2 mb-2">
          <TextInput value={q} onChange={e => setQ(e.target.value)} placeholder="e.g. football training" />
          <Button type="submit" variant="dark" busy={busy}>Search</Button>
        </form>
        <p className="mb-5 text-[12px] text-ink-muted">Two or three simple words work best. Photos are free to use and the photographer is credited automatically.</p>
        {busy ? <Loading label="Looking for photos…" /> : results && results.length === 0 ? (
          <Empty title="No photos found" text="Try simpler words, for example “cricket” instead of a full sentence." />
        ) : (
          <ul className="grid grid-cols-2 gap-3">
            {results?.map(c => (
              <li key={c.full}>
                <button
                  type="button"
                  onClick={() => choose(c)}
                  disabled={!!importing}
                  className="group relative block w-full aspect-[16/10] overflow-hidden rounded-[14px] bg-vellum outline outline-1 -outline-offset-1 outline-black/10 hover:ring-4 hover:ring-gold/40 disabled:opacity-60"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- remote preview thumbnails, shown only here */}
                  <img src={c.thumb} alt={c.title} loading="lazy" className="h-full w-full object-cover" />
                  {importing === c.full && <span className="absolute inset-0 bg-parchment/80 flex items-center justify-center text-[12px] font-semibold text-ink">Adding…</span>}
                </button>
                <p className="mt-1 truncate text-[11.5px] text-ink-muted" title={c.credit}>{c.credit}</p>
              </li>
            ))}
          </ul>
        )}
      </Drawer>
    </>
  )
}
