'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { ArrowUp, ArrowDown, Plus, X, ArrowCounterClockwise, CaretRight } from '@phosphor-icons/react'
import { api, Badge, Button, Card, Field, Loading, PageHeader, Select, TextArea, TextInput, timeAgo, useFeedback } from '@/components/admin/ui'
import { ImageField } from '@/components/admin/ImageField'
import { COPY_DEFAULTS, COPY_PAGES, COPY_SECTIONS, type CopyField, type CopyKey, type SiteCopy } from '@/lib/content/copy'
import { cn } from '@/lib/utils'

type Value = any

/** Comma-free list editor: one box per word or line. */
function TagsInput({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [draft, setDraft] = useState('')
  const add = () => {
    const v = draft.trim()
    if (v) onChange([...value, v])
    setDraft('')
  }
  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {value.map((t, i) => (
          <span key={`${t}-${i}`} className="inline-flex items-center gap-1 rounded-full bg-gold-wash pl-3 pr-1 py-1 text-[13px] text-ink">
            {t}
            <button type="button" onClick={() => onChange(value.filter((_, j) => j !== i))} aria-label={`Remove ${t}`} className="h-6 w-6 rounded-full flex items-center justify-center text-ink-faint hover:text-rust hover:bg-rust-wash">
              <X size={11} weight="bold" />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <TextInput value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); add() } }} placeholder="Type and press Enter" />
        <Button type="button" variant="ghost" onClick={add} disabled={!draft.trim()}>Add</Button>
      </div>
    </div>
  )
}

function FieldInput({ field, value, onChange }: { field: CopyField; value: Value; onChange: (v: Value) => void }) {
  switch (field.type) {
    case 'text': return <TextInput value={value ?? ''} onChange={e => onChange(e.target.value)} />
    case 'textarea': return <TextArea value={value ?? ''} onChange={e => onChange(e.target.value)} rows={Math.min(8, Math.max(2, Math.ceil(String(value ?? '').length / 70)))} />
    case 'number': return <TextInput type="number" inputMode="numeric" value={value ?? 0} onChange={e => onChange(Number(e.target.value) || 0)} className="max-w-[180px]" />
    case 'time': return <TextInput type="time" value={value ?? ''} onChange={e => onChange(e.target.value)} className="max-w-[180px]" />
    case 'image': return <ImageField value={value ?? ''} onChange={onChange} shape={/logo/i.test(field.key) ? 'logo' : 'landscape'} />
    case 'tags': return <TagsInput value={Array.isArray(value) ? value : []} onChange={onChange} />
    case 'select': return <Select value={value ?? ''} onChange={onChange} options={field.options} />
    case 'list': {
      const items: Record<string, Value>[] = Array.isArray(value) ? value : []
      const blank = Object.fromEntries(field.fields.map(f => [f.key, f.type === 'number' ? 0 : f.type === 'tags' ? [] : f.type === 'select' ? f.options[0].value : '']))
      const update = (i: number, key: string, v: Value) => onChange(items.map((it, j) => (j === i ? { ...it, [key]: v } : it)))
      const move = (i: number, d: -1 | 1) => { const l = [...items]; [l[i], l[i + d]] = [l[i + d], l[i]]; onChange(l) }
      return (
        <div className="space-y-3">
          {items.map((it, i) => (
            <div key={i} className="rounded-[18px] bg-vellum/50 p-4 shadow-[inset_0_0_0_1px_rgba(60,45,20,0.08)]">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-gold-deep">{field.itemLabel} {i + 1}</p>
                <div className="flex gap-0.5">
                  <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up" className="h-9 w-9 rounded-full flex items-center justify-center text-ink-soft hover:bg-ledger disabled:opacity-30"><ArrowUp size={14} /></button>
                  <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} aria-label="Move down" className="h-9 w-9 rounded-full flex items-center justify-center text-ink-soft hover:bg-ledger disabled:opacity-30"><ArrowDown size={14} /></button>
                  <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))} disabled={items.length <= (field.min ?? 0)} aria-label={`Remove ${field.itemLabel}`} className="h-9 w-9 rounded-full flex items-center justify-center text-ink-faint hover:text-rust hover:bg-rust-wash disabled:opacity-30"><X size={14} weight="bold" /></button>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {field.fields.map(f => (
                  <Field key={f.key} label={f.label} help={f.help} className={f.type === 'textarea' || f.type === 'image' ? 'sm:col-span-2' : ''}>
                    <FieldInput field={f} value={it[f.key]} onChange={v => update(i, f.key, v)} />
                  </Field>
                ))}
              </div>
            </div>
          ))}
          {items.length < (field.max ?? 50) && (
            <Button type="button" size="sm" variant="ghost" onClick={() => onChange([...items, blank])}><Plus size={14} weight="bold" /> Add {field.itemLabel.toLowerCase()}</Button>
          )}
        </div>
      )
    }
  }
}

export default function WebsiteTextPage() {
  const [copy, setCopy] = useState<SiteCopy | null>(null)
  const [edited, setEdited] = useState<Record<string, string>>({})
  const [active, setActive] = useState<CopyKey>('contact')
  const [draft, setDraft] = useState<Record<string, Value> | null>(null)
  const [saving, setSaving] = useState(false)
  const { notify, confirm } = useFeedback()

  const load = useCallback((key: CopyKey) => {
    api<SiteCopy>('/api/admin/copy')
      .then(r => { setCopy(r.data); setEdited(r.edited ?? {}); setDraft(structuredClone(r.data[key])) })
      .catch(e => notify(e.message, 'error'))
  }, [notify])
  useEffect(() => load('contact'), [load])

  const section = COPY_SECTIONS.find(s => s.key === active)!
  const changed = useMemo(() => !!copy && !!draft && JSON.stringify(draft) !== JSON.stringify(copy[active]), [copy, draft, active])

  const open = async (key: CopyKey) => {
    if (key === active) return
    if (changed && !(await confirm({ title: 'Leave without saving?', text: 'Your changes to this section will be lost.', yes: 'Leave', danger: true }))) return
    setActive(key)
    if (copy) setDraft(structuredClone(copy[key]))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const save = async () => {
    setSaving(true)
    try {
      await api('/api/admin/copy', 'PUT', { key: active, content: draft })
      notify(`"${section.title}" saved. The website is updated.`)
      load(active)
    } catch (e) {
      notify((e as Error).message, 'error')
    } finally {
      setSaving(false)
    }
  }

  const reset = async () => {
    if (!(await confirm({ title: 'Put back the original wording?', text: `Everything in "${section.title}" goes back to how it was when the website was built.`, yes: 'Put back original' }))) return
    try {
      await api(`/api/admin/copy?key=${active}`, 'DELETE')
      notify('Original wording restored.')
      load(active)
    } catch (e) {
      notify((e as Error).message, 'error')
    }
  }

  if (!copy || !draft) return <Loading />

  return (
    <>
      <PageHeader eyebrow="Every word on your website" title="Website Text" intro="Pick a part of the website on the left, change the words, then press Save. You can always put the original wording back." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_minmax(0,1fr)] items-start">
        <nav className="lg:sticky lg:top-6 space-y-5" aria-label="Website sections">
          {COPY_PAGES.map(page => (
            <div key={page}>
              <p className="px-3 mb-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-deep">{page}</p>
              <ul className="flex lg:flex-col gap-1 overflow-x-auto no-scrollbar lg:overflow-visible">
                {COPY_SECTIONS.filter(s => s.page === page).map(s => (
                  <li key={s.key} className="flex-shrink-0">
                    <button
                      onClick={() => open(s.key)}
                      aria-current={s.key === active ? 'true' : undefined}
                      className={cn(
                        'w-full flex items-center gap-2 rounded-xl px-3 min-h-[40px] text-left text-[13.5px] whitespace-nowrap lg:whitespace-normal transition-colors',
                        s.key === active ? 'bg-ledger font-semibold text-ink shadow-[0_0_0_1px_rgba(60,45,20,0.08),0_6px_16px_-10px_rgba(60,45,20,0.3)]' : 'text-ink-soft hover:bg-vellum hover:text-ink'
                      )}
                    >
                      <span className="flex-1">{s.title}</span>
                      {edited[s.key] && <span className="h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" title="Changed from the original" />}
                      {s.key === active && <CaretRight size={12} weight="bold" className="hidden lg:block text-gold-deep" />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="min-w-0">
          <Card className="p-5 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
              <div>
                <h2 className="font-serif-heading text-[30px] font-bold leading-tight">{section.title}</h2>
                <p className="mt-1 text-[13.5px] text-ink-muted max-w-[560px]">{section.description}</p>
              </div>
              {edited[active] ? <Badge tone="gold">Changed {timeAgo(edited[active])}</Badge> : <Badge>Original wording</Badge>}
            </div>
            <div className="space-y-6">
              {section.fields.map(f => (
                <Field key={f.key} label={f.label} help={f.help}>
                  <FieldInput field={f} value={draft[f.key] ?? (COPY_DEFAULTS[active] as Record<string, Value>)[f.key]} onChange={v => setDraft(d => ({ ...d, [f.key]: v }))} />
                </Field>
              ))}
            </div>
          </Card>

          {/* Save bar stays in reach on long sections */}
          <div className="sticky bottom-4 z-10 mt-4 flex flex-wrap items-center justify-between gap-3 rounded-[20px] bg-ink/95 backdrop-blur px-4 py-3 shadow-[0_18px_40px_-16px_rgba(20,14,6,0.6)]">
            <p className="text-[13px] text-white/80">{changed ? 'You have unsaved changes.' : 'Everything here is saved and live.'}</p>
            <div className="flex gap-2">
              {edited[active] && (
                <Button size="sm" variant="quiet" onClick={reset} className="text-white/80 hover:text-white hover:bg-white/10"><ArrowCounterClockwise size={14} /> Original wording</Button>
              )}
              {changed && <Button size="sm" variant="quiet" onClick={() => setDraft(structuredClone(copy[active]))} className="text-white/80 hover:text-white hover:bg-white/10">Undo changes</Button>}
              <Button size="sm" variant="gold" busy={saving} disabled={!changed} onClick={save}>Save</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
