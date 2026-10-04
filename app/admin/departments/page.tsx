'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { Plus, ArrowUp, ArrowDown, PencilSimple, Trash } from '@phosphor-icons/react'
import { api, Badge, Button, Card, Drawer, Empty, Field, Loading, PageHeader, TextInput, Toggle, useFeedback } from '@/components/admin/ui'
import { ImageField } from '@/components/admin/ImageField'

interface Department {
  id: string
  label: string
  short: string | null
  tagline: string | null
  items: string | null
  image: string | null
  poster: string | null
  video: string | null
  is_active: boolean
  product_count: number
}

const blank: Department = { id: '', label: '', short: '', tagline: '', items: '', image: '', poster: '', video: '', is_active: true, product_count: 0 }

export default function DepartmentsPage() {
  const [items, setItems] = useState<Department[] | null>(null)
  const [editing, setEditing] = useState<Department | null>(null)
  const [saving, setSaving] = useState(false)
  const { notify, confirm } = useFeedback()

  const load = useCallback(() => {
    api<Department[]>('/api/admin/categories').then(r => setItems(r.data)).catch(e => notify(e.message, 'error'))
  }, [notify])
  useEffect(load, [load])

  const toggle = async (d: Department, on: boolean) => {
    if (!on && !(await confirm({
      title: `Hide "${d.label}"?`,
      text: `The department and its ${d.product_count} product(s) will disappear from the website until you switch it back on. Nothing is deleted.`,
      yes: 'Hide department',
    }))) return
    setItems(list => list?.map(x => (x.id === d.id ? { ...x, is_active: on } : x)) ?? null)
    try {
      await api('/api/admin/categories', 'PATCH', { id: d.id, is_active: on })
      notify(on ? `"${d.label}" is back on the website.` : `"${d.label}" is hidden.`)
    } catch (e) {
      notify((e as Error).message, 'error')
      load()
    }
  }

  const move = async (i: number, dir: -1 | 1) => {
    if (!items || !items[i + dir]) return
    const list = [...items]
    ;[list[i], list[i + dir]] = [list[i + dir], list[i]]
    setItems(list)
    try {
      await api('/api/admin/categories', 'PATCH', { order: list.map(x => x.id) })
      notify('Order saved.')
    } catch (e) {
      notify((e as Error).message, 'error')
      load()
    }
  }

  const save = async () => {
    if (!editing) return
    setSaving(true)
    try {
      await api('/api/admin/categories', editing.id ? 'PUT' : 'POST', { ...editing, poster: editing.image })
      notify(editing.id ? 'Department saved. The website is updated.' : 'Department added.')
      setEditing(null)
      load()
    } catch (e) {
      notify((e as Error).message, 'error')
    } finally {
      setSaving(false)
    }
  }

  const remove = async (d: Department) => {
    if (!(await confirm({ title: `Delete "${d.label}"?`, text: 'This cannot be undone. Hiding it is usually safer.', yes: 'Delete department', danger: true }))) return
    try {
      await api(`/api/admin/categories?id=${encodeURIComponent(d.id)}`, 'DELETE')
      notify('Department deleted.')
      setEditing(null)
      load()
    } catch (e) {
      notify((e as Error).message, 'error')
    }
  }

  const set = <K extends keyof Department>(key: K, value: Department[K]) => setEditing(e => (e ? { ...e, [key]: value } : e))

  return (
    <>
      <PageHeader
        eyebrow="How your shop is organised"
        title="Departments"
        intro="The big cards on the home page and the sections of the Products page. The order here is the order on the website."
        actions={<Button variant="gold" onClick={() => setEditing({ ...blank })}><Plus size={16} weight="bold" /> Add a department</Button>}
      />

      {!items ? <Loading /> : items.length === 0 ? (
        <Card><Empty title="No departments yet" text="Add one to start organising your products." /></Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {items.map((d, i) => (
            <Card key={d.id} className={`overflow-hidden ${d.is_active ? '' : 'opacity-70'}`}>
              <div className="relative aspect-[16/8] bg-[#0E0B07]">
                {(d.poster || d.image) && <Image src={(d.poster || d.image)!} alt="" fill className="object-cover opacity-90" sizes="600px" unoptimized={(d.poster || d.image)!.startsWith('/media/')} />}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className="font-serif-heading italic text-[15px] text-[#E9CF94] truncate">{d.tagline}</p>
                  <p className="font-serif-heading text-[30px] font-bold leading-none text-white">{d.label}</p>
                </div>
                <span className="absolute top-3 left-3"><Badge tone={d.is_active ? 'live' : 'draft'}>{d.is_active ? 'On the website' : 'Hidden'}</Badge></span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:px-5">
                <p className="text-[13px] text-ink-muted">{d.product_count} {d.product_count === 1 ? 'product' : 'products'}</p>
                <div className="flex items-center gap-1">
                  <div className="w-[64px]"><Toggle on={d.is_active} onChange={v => toggle(d, v)} label={<span className="sr-only">Show on website</span>} /></div>
                  <button onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move earlier" className="h-10 w-10 rounded-full flex items-center justify-center text-ink-soft hover:bg-vellum disabled:opacity-30"><ArrowUp size={16} /></button>
                  <button onClick={() => move(i, 1)} disabled={i === items.length - 1} aria-label="Move later" className="h-10 w-10 rounded-full flex items-center justify-center text-ink-soft hover:bg-vellum disabled:opacity-30"><ArrowDown size={16} /></button>
                  <Button size="sm" variant="ghost" onClick={() => setEditing({ ...d })}><PencilSimple size={14} /> Edit</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Drawer
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing?.id ? `Edit ${editing.label}` : 'Add a department'}
        footer={editing && (
          <>
            {editing.id && <Button variant="quiet" className="mr-auto text-rust" onClick={() => remove(editing)}><Trash size={15} /> Delete</Button>}
            <Button variant="ghost" onClick={() => setEditing(null)}>Cancel</Button>
            <Button variant="gold" busy={saving} onClick={save}>{editing.id ? 'Save changes' : 'Add department'}</Button>
          </>
        )}
      >
        {editing && (
          <div className="space-y-6">
            <Field label="Department name" help={editing.id ? undefined : 'This also becomes the web address, e.g. /products/sports-goods.'}>
              <TextInput value={editing.label} onChange={e => set('label', e.target.value)} placeholder="e.g. Sports Goods" />
            </Field>
            <Field label="Short name" help="Used on phones where space is tight, e.g. “Sports”.">
              <TextInput value={editing.short ?? ''} onChange={e => set('short', e.target.value)} />
            </Field>
            <Field label="Tagline" help="The small gold line above the name, e.g. “Equip. Perform. Excel.”">
              <TextInput value={editing.tagline ?? ''} onChange={e => set('tagline', e.target.value)} />
            </Field>
            <Field label="What it includes" help="Separate with dots, e.g. Cricket · Football · Badminton">
              <TextInput value={editing.items ?? ''} onChange={e => set('items', e.target.value)} />
            </Field>
            <Field label="Picture" help={editing.video ? 'This department has a moving video on the website; the picture shows while the video loads.' : 'Shown as the big banner for this department.'}>
              <ImageField value={editing.poster || editing.image || ''} onChange={v => setEditing(e => (e ? { ...e, image: v, poster: v } : e))} />
            </Field>
            <Toggle on={editing.is_active} onChange={v => set('is_active', v)} label="Show on the website" />
          </div>
        )}
      </Drawer>
    </>
  )
}
