'use client'

import { Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Plus, MagnifyingGlass, Star, ArrowUp, ArrowDown, PencilSimple, Trash, X } from '@phosphor-icons/react'
import { api, Badge, Button, Card, Drawer, Empty, Field, Loading, PageHeader, Select, TextArea, TextInput, Toggle, useFeedback } from '@/components/admin/ui'
import { ImageField } from '@/components/admin/ImageField'

interface Product {
  id: string
  name: string
  brand: string
  category: string
  description: string
  specs: string[]
  image: string | null
  whatsapp_text: string | null
  is_featured: boolean
  in_stock: boolean
  is_visible: boolean
  sort_order: number
}
interface Department { id: string; label: string; is_active: boolean }

const blank = (category = ''): Product => ({
  id: '', name: '', brand: '', category, description: '', specs: [], image: '', whatsapp_text: '',
  is_featured: false, in_stock: true, is_visible: true, sort_order: 0,
})

function ProductsScreen() {
  const [items, setItems] = useState<Product[] | null>(null)
  const [departments, setDepartments] = useState<Department[]>([])
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState<Product | null>(null)
  const [saving, setSaving] = useState(false)
  const { notify, confirm } = useFeedback()
  const params = useSearchParams()

  const load = useCallback(async () => {
    try {
      const [p, d] = await Promise.all([api<Product[]>('/api/admin/products'), api<Department[]>('/api/admin/categories')])
      setItems(p.data)
      setDepartments(d.data)
      return d.data
    } catch (e) {
      notify((e as Error).message, 'error')
      return []
    }
  }, [notify])

  useEffect(() => {
    // Fetch on open; state is only set after the network answers
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load().then(d => { if (params.get('new')) setEditing(blank(d[0]?.id)) })
  }, [load, params])

  const deptName = (id: string) => departments.find(d => d.id === id)?.label ?? 'No department'
  const visible = useMemo(() => {
    const q = search.trim().toLowerCase()
    return (items ?? [])
      .filter(p => filter === 'all' || p.category === filter)
      .filter(p => !q || `${p.name} ${p.brand} ${p.description}`.toLowerCase().includes(q))
  }, [items, filter, search])

  const quick = async (p: Product, field: 'is_visible' | 'in_stock' | 'is_featured', value: boolean) => {
    setItems(list => list?.map(x => (x.id === p.id ? { ...x, [field]: value } : x)) ?? null)
    try {
      await api('/api/admin/products', 'PATCH', { id: p.id, field, value })
      notify(
        field === 'is_visible' ? (value ? `"${p.name}" is now on the website.` : `"${p.name}" is hidden from the website.`)
          : field === 'in_stock' ? (value ? `"${p.name}" marked as available.` : `"${p.name}" marked as on order.`)
            : value ? `"${p.name}" will be shown first.` : `"${p.name}" is no longer shown first.`
      )
    } catch (e) {
      notify((e as Error).message, 'error')
      load()
    }
  }

  const move = async (p: Product, dir: -1 | 1) => {
    if (!items) return
    const list = [...items]
    const i = list.findIndex(x => x.id === p.id)
    // Swap with the next product in the same visible list, so filtering still makes sense
    const neighbour = visible[visible.findIndex(x => x.id === p.id) + dir]
    if (!neighbour) return
    const j = list.findIndex(x => x.id === neighbour.id)
    ;[list[i], list[j]] = [list[j], list[i]]
    setItems(list)
    try {
      await api('/api/admin/products', 'PATCH', { order: list.map(x => x.id) })
    } catch (e) {
      notify((e as Error).message, 'error')
      load()
    }
  }

  const save = async () => {
    if (!editing) return
    setSaving(true)
    try {
      const body = { ...editing, highlights: editing.specs.filter(s => s.trim()) }
      await api('/api/admin/products', editing.id ? 'PUT' : 'POST', body)
      notify(editing.id ? 'Product saved. The website is updated.' : 'Product added to the website.')
      setEditing(null)
      load()
    } catch (e) {
      notify((e as Error).message, 'error')
    } finally {
      setSaving(false)
    }
  }

  const remove = async (p: Product) => {
    const yes = await confirm({
      title: `Delete "${p.name}"?`,
      text: 'It will disappear from the website. If you only want to hide it for a while, use "On the website" instead.',
      yes: 'Delete product',
      danger: true,
    })
    if (!yes) return
    try {
      await api(`/api/admin/products?id=${encodeURIComponent(p.id)}`, 'DELETE')
      notify('Product deleted.')
      setEditing(null)
      load()
    } catch (e) {
      notify((e as Error).message, 'error')
    }
  }

  const set = <K extends keyof Product>(key: K, value: Product[K]) => setEditing(e => (e ? { ...e, [key]: value } : e))

  return (
    <>
      <PageHeader
        eyebrow="Your catalogue"
        title="Products"
        intro="Everything customers see on the Products page. Switch a product off to hide it without deleting it."
        actions={<Button variant="gold" onClick={() => setEditing(blank(departments[0]?.id))}><Plus size={16} weight="bold" /> Add a product</Button>}
      />

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <MagnifyingGlass size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
          <TextInput value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or brand" className="pl-10" />
          {search && (
            <button onClick={() => setSearch('')} aria-label="Clear search" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full flex items-center justify-center text-ink-faint hover:text-ink">
              <X size={14} weight="bold" />
            </button>
          )}
        </div>
        <Select
          value={filter}
          onChange={setFilter}
          className="sm:w-[240px]"
          options={[{ value: 'all', label: 'All departments' }, ...departments.map(d => ({ value: d.id, label: d.label }))]}
        />
      </div>

      {!items ? <Loading /> : visible.length === 0 ? (
        <Card>
          <Empty
            title={items.length ? 'No products match' : 'No products yet'}
            text={items.length ? 'Try a different search or department.' : 'Add your first product and it will appear on the website straight away.'}
            action={!items.length && <Button variant="gold" onClick={() => setEditing(blank(departments[0]?.id))}><Plus size={16} weight="bold" /> Add a product</Button>}
          />
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <ul className="divide-y divide-hairline">
            {visible.map((p, idx) => (
              <li key={p.id} className={`flex flex-col xl:flex-row xl:items-center gap-3 xl:gap-5 p-4 sm:px-5 ${p.is_visible ? '' : 'bg-vellum/40'}`}>
                <button onClick={() => setEditing({ ...p, specs: Array.isArray(p.specs) ? p.specs : [] })} className="flex items-center gap-4 min-w-0 flex-1 text-left group">
                  <span className={`relative h-[72px] w-[58px] flex-shrink-0 overflow-hidden rounded-[12px] bg-vellum outline outline-1 -outline-offset-1 outline-black/10 ${p.is_visible ? '' : 'opacity-50'}`}>
                    {p.image && <Image src={p.image} alt="" fill className="object-cover object-top" sizes="60px" unoptimized={p.image.startsWith('/media/')} />}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10.5px] font-semibold uppercase tracking-[0.16em] text-gold-deep">
                      {p.brand || 'No brand'} · {deptName(p.category)}
                    </span>
                    <span className="block font-serif-heading text-[21px] font-bold leading-tight text-ink group-hover:text-[#6E5418] truncate">{p.name}</span>
                    <span className="mt-1 flex flex-wrap gap-1.5">
                      {!p.is_visible && <Badge tone="draft">Hidden</Badge>}
                      {!p.in_stock && <Badge tone="warn">On order</Badge>}
                      {p.is_featured && <Badge tone="gold">Shown first</Badge>}
                    </span>
                  </span>
                </button>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pl-[74px] xl:pl-0 xl:flex-nowrap">
                  <div className="w-[170px]"><Toggle on={p.is_visible} onChange={v => quick(p, 'is_visible', v)} label="On the website" /></div>
                  <div className="w-[150px]"><Toggle on={p.in_stock} onChange={v => quick(p, 'in_stock', v)} label={p.in_stock ? 'Available' : 'On order'} /></div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => quick(p, 'is_featured', !p.is_featured)} title={p.is_featured ? 'Shown first — tap to undo' : 'Show this product first'} aria-label="Show first" className={`h-10 w-10 rounded-full flex items-center justify-center ${p.is_featured ? 'text-gold' : 'text-ink-faint hover:text-gold-deep'} hover:bg-gold-wash`}>
                      <Star size={18} weight={p.is_featured ? 'fill' : 'regular'} />
                    </button>
                    <button onClick={() => move(p, -1)} disabled={idx === 0} aria-label="Move up" title="Move up" className="h-10 w-10 rounded-full flex items-center justify-center text-ink-soft hover:bg-vellum disabled:opacity-30"><ArrowUp size={16} /></button>
                    <button onClick={() => move(p, 1)} disabled={idx === visible.length - 1} aria-label="Move down" title="Move down" className="h-10 w-10 rounded-full flex items-center justify-center text-ink-soft hover:bg-vellum disabled:opacity-30"><ArrowDown size={16} /></button>
                    <button onClick={() => setEditing({ ...p, specs: Array.isArray(p.specs) ? p.specs : [] })} aria-label="Edit" title="Edit" className="h-10 w-10 rounded-full flex items-center justify-center text-ink-soft hover:bg-vellum"><PencilSimple size={17} /></button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Drawer
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing?.id ? 'Edit product' : 'Add a product'}
        footer={editing && (
          <>
            {editing.id && <Button variant="quiet" className="mr-auto text-rust" onClick={() => remove(editing)}><Trash size={15} /> Delete</Button>}
            <Button variant="ghost" onClick={() => setEditing(null)}>Cancel</Button>
            <Button variant="gold" busy={saving} onClick={save}>{editing.id ? 'Save changes' : 'Add to website'}</Button>
          </>
        )}
      >
        {editing && (
          <div className="space-y-6">
            <Field label="Photo" help="A tall photo works best (like a phone photo held upright). It is shrunk automatically.">
              <ImageField value={editing.image ?? ''} onChange={v => set('image', v)} shape="portrait" maxSide={1350} />
            </Field>
            <Field label="Product name"><TextInput value={editing.name} onChange={e => set('name', e.target.value)} placeholder="e.g. English Willow Cricket Bat" /></Field>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Brand"><TextInput value={editing.brand} onChange={e => set('brand', e.target.value)} placeholder="e.g. SS" /></Field>
              <Field label="Department">
                <Select value={editing.category} onChange={v => set('category', v)} options={departments.map(d => ({ value: d.id, label: d.label }))} />
              </Field>
            </div>
            <Field label="Short description" help="One or two sentences customers read on the product card.">
              <TextArea value={editing.description} onChange={e => set('description', e.target.value)} rows={3} />
            </Field>
            <Field label="Key points" help="Short lines shown with a tick in the product's pop-up. Up to 6.">
              <div className="space-y-2">
                {editing.specs.map((s, i) => (
                  <div key={i} className="flex gap-2">
                    <TextInput value={s} onChange={e => set('specs', editing.specs.map((x, j) => (j === i ? e.target.value : x)))} placeholder="e.g. Youth & adult sizes" />
                    <button type="button" onClick={() => set('specs', editing.specs.filter((_, j) => j !== i))} aria-label="Remove point" className="h-11 w-11 flex-shrink-0 rounded-full flex items-center justify-center text-ink-faint hover:text-rust hover:bg-rust-wash"><X size={15} weight="bold" /></button>
                  </div>
                ))}
                {editing.specs.length < 6 && (
                  <Button type="button" size="sm" variant="ghost" onClick={() => set('specs', [...editing.specs, ''])}><Plus size={14} weight="bold" /> Add a point</Button>
                )}
              </div>
            </Field>
            <div className="rounded-[18px] bg-ledger p-4 space-y-3 shadow-[0_0_0_1px_rgba(60,45,20,0.08)]">
              <Toggle on={editing.is_visible} onChange={v => set('is_visible', v)} label="Show on the website" hint="Switch off to hide it without deleting." />
              <Toggle on={editing.in_stock} onChange={v => set('in_stock', v)} label="Available now" hint='When off, the product shows an "On order" label.' />
              <Toggle on={editing.is_featured} onChange={v => set('is_featured', v)} label="Show first" hint="Featured products appear at the top of the list." />
            </div>
            <details className="group">
              <summary className="cursor-pointer text-[13px] font-semibold text-gold-deep select-none">More options</summary>
              <div className="mt-3">
                <Field label="WhatsApp message for this product" help="What the customer's WhatsApp message says when they tap Enquire. Leave empty for the usual message.">
                  <TextArea value={editing.whatsapp_text ?? ''} onChange={e => set('whatsapp_text', e.target.value)} rows={2} />
                </Field>
              </div>
            </details>
          </div>
        )}
      </Drawer>
    </>
  )
}

export default function ProductsPage() {
  return <Suspense fallback={<Loading />}><ProductsScreen /></Suspense>
}
