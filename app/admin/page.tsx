'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Circle, Package, PenNib, TextAa, SealCheck, Sparkle } from '@phosphor-icons/react'
import { api, Badge, Button, Card, Loading, PageHeader, timeAgo, useFeedback } from '@/components/admin/ui'
import { formatBytes } from '@/components/admin/ImageField'

interface Overview {
  products_live: number
  products_hidden: number
  products_out: number
  departments: number
  articles_live: number
  articles_draft: number
  topics: number
  pictures: number
  picture_bytes: number
  lastRun: { status: string; message: string; created_at: string; trigger: string } | null
  drafts: { id: string; title: string; created_at: string; ai_generated: boolean }[]
  settings: { blog_auto_enabled: boolean; blog_auto_publish: boolean; blog_every_days: number }
}
interface Check { label: string; done: boolean; fix: string }

const greeting = () => {
  const h = Number(new Date().toLocaleString('en-US', { hour: 'numeric', hour12: false, timeZone: 'Asia/Kolkata' }))
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'
}

const every = (n: number) => (n === 1 ? 'every day' : n === 7 ? 'once a week' : `every ${n} days`)

export default function AdminHome() {
  const [data, setData] = useState<Overview | null>(null)
  const [checks, setChecks] = useState<Check[]>([])
  const [error, setError] = useState('')
  const [busyId, setBusyId] = useState('')
  const { notify } = useFeedback()

  const load = useCallback(() => {
    Promise.all([api<Overview>('/api/admin/overview'), api('/api/admin/settings')])
      .then(([o, s]) => { setData(o.data); setChecks(s.checks) })
      .catch(e => setError(e.message))
  }, [])
  useEffect(load, [load])

  const approve = async (id: string) => {
    setBusyId(id)
    try {
      await api('/api/admin/blog', 'PATCH', { id, status: 'published' })
      notify('Article published. It is now on the website.')
      load()
    } catch (e) {
      notify((e as Error).message, 'error')
    } finally {
      setBusyId('')
    }
  }

  if (error) return <Card className="p-8 text-[14px] text-rust">{error}</Card>
  if (!data) return <Loading />

  const missing = checks.filter(c => !c.done)
  const stats = [
    { value: data.products_live, label: 'Products on the website', href: '/admin/products', note: data.products_out ? `${data.products_out} marked "on order"` : data.products_hidden ? `${data.products_hidden} hidden` : 'All in stock' },
    { value: data.departments, label: 'Departments', href: '/admin/departments', note: 'Sports, fitness, music…' },
    { value: data.articles_live, label: 'Articles published', href: '/admin/articles', note: data.articles_draft ? `${data.articles_draft} waiting in drafts` : 'No drafts waiting' },
    { value: data.pictures, label: 'Pictures uploaded', href: '/admin/pictures', note: `${formatBytes(data.picture_bytes)} used` },
  ]

  return (
    <>
      <PageHeader eyebrow="Store Manager" title={greeting()} intro="Here is your website at a glance. Anything you change in this panel shows on the website straight away." />

      {/* Focal: what needs the owner today */}
      <Card className="p-5 sm:p-7 mb-6">
        {missing.length > 0 ? (
          <>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-rust">— Finish setting up</p>
            <h2 className="mt-1 font-serif-heading text-[28px] font-bold leading-tight">A few things to switch on in Vercel</h2>
            <ul className="mt-4 space-y-3">
              {checks.map(c => (
                <li key={c.label} className="flex items-start gap-3">
                  {c.done ? <CheckCircle size={22} weight="fill" className="text-leaf flex-shrink-0" /> : <Circle size={22} className="text-ink-faint flex-shrink-0" />}
                  <div>
                    <p className={`text-[14px] font-semibold ${c.done ? 'text-ink-soft line-through decoration-ink-faint' : 'text-ink'}`}>{c.label}</p>
                    {!c.done && <p className="text-[12.5px] text-ink-muted leading-snug">{c.fix}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : data.drafts.length > 0 ? (
          <>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">— Waiting for you</p>
            <h2 className="mt-1 font-serif-heading text-[28px] font-bold leading-tight">
              {data.drafts.length === 1 ? 'One article is ready for your approval' : `${data.drafts.length} articles are ready for your approval`}
            </h2>
            <ul className="mt-4 divide-y divide-hairline">
              {data.drafts.map(d => (
                <li key={d.id} className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-4 py-3.5">
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-semibold text-ink leading-snug">{d.title}</p>
                    <p className="text-[12.5px] text-ink-muted mt-0.5">
                      {d.ai_generated ? 'Written by the Article Writer' : 'Draft'} · {timeAgo(d.created_at)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/articles/${d.id}`} className="inline-flex items-center min-h-[40px] px-4 rounded-full text-[13px] font-semibold text-ink shadow-[0_0_0_1px_rgba(60,45,20,0.14)] hover:bg-gold-wash">
                      Read &amp; edit
                    </Link>
                    <Button size="sm" variant="gold" busy={busyId === d.id} onClick={() => approve(d.id)} className="min-h-[40px]">Publish</Button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <span className="h-14 w-14 flex-shrink-0 rounded-full bg-leaf-wash text-leaf flex items-center justify-center"><SealCheck size={30} weight="fill" /></span>
            <div>
              <h2 className="font-serif-heading text-[28px] font-bold leading-tight">All caught up</h2>
              <p className="text-[14px] text-ink-muted">Nothing is waiting for you. Your website is live and up to date.</p>
            </div>
          </div>
        )}
      </Card>

      {/* The shop in numbers — echoes the stats strip on the home page */}
      <Card className="mb-6 overflow-hidden">
        <div className="grid grid-cols-2 lg:grid-cols-4 lg:divide-x divide-hairline">
          {stats.map(s => (
            <Link key={s.label} href={s.href} className="group p-5 sm:p-6 hover:bg-gold-wash/60 transition-colors">
              <p className="font-light text-[40px] sm:text-[46px] leading-none tracking-[-0.035em] tabular-nums text-ink">{s.value}</p>
              <p className="mt-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-soft">{s.label}</p>
              <p className="mt-1 text-[12px] text-ink-faint group-hover:text-gold-deep">{s.note}</p>
            </Link>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
        <Card className="p-5 sm:p-7">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">— Article Writer</p>
              <h2 className="mt-1 font-serif-heading text-[26px] font-bold leading-tight">
                {data.settings.blog_auto_enabled ? `Writing ${every(data.settings.blog_every_days)}` : 'Automatic writing is off'}
              </h2>
            </div>
            <Badge tone={data.settings.blog_auto_enabled ? 'live' : 'draft'}>{data.settings.blog_auto_enabled ? 'On' : 'Off'}</Badge>
          </div>
          <p className="mt-2 text-[14px] text-ink-soft leading-relaxed">
            {data.settings.blog_auto_enabled
              ? data.settings.blog_auto_publish
                ? `New articles go live by themselves, about ${data.topics} topics in rotation.`
                : 'New articles wait in Drafts until you press Publish.'
              : 'Turn it on to get a fresh article on your topics without lifting a finger.'}
          </p>
          {data.lastRun && (
            <p className="mt-4 rounded-2xl bg-vellum/70 px-4 py-3 text-[13px] text-ink-soft leading-snug">
              <span className="font-semibold text-ink">Last time ({timeAgo(data.lastRun.created_at)}):</span> {data.lastRun.message}
            </p>
          )}
          <Link href="/admin/writer" className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-gold-deep hover:text-[#A47E28] group">
            Topics, schedule &amp; write now <ArrowRight size={14} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </Card>

        <Card className="p-5 sm:p-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">— Quick jobs</p>
          <ul className="mt-3 space-y-1">
            {[
              { href: '/admin/products?new=1', icon: Package, title: 'Add a product', text: 'Photo, name and a few words' },
              { href: '/admin/writer', icon: Sparkle, title: 'Get an article written', text: 'Pick a topic, the writer does the rest' },
              { href: '/admin/articles/new', icon: PenNib, title: 'Write an article yourself', text: 'Like writing an email' },
              { href: '/admin/text', icon: TextAa, title: 'Change words on the website', text: 'Phone number, headings, anything' },
            ].map(({ href, icon: Icon, title, text }) => (
              <li key={href}>
                <Link href={href} className="group flex items-center gap-3.5 rounded-2xl px-3 py-3 -mx-3 hover:bg-gold-wash/70 transition-colors">
                  <span className="h-10 w-10 flex-shrink-0 rounded-full bg-gold-wash text-gold-deep flex items-center justify-center group-hover:bg-gold group-hover:text-[#1E170A] transition-colors">
                    <Icon size={18} weight="duotone" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14px] font-semibold text-ink">{title}</span>
                    <span className="block text-[12.5px] text-ink-muted">{text}</span>
                  </span>
                  <ArrowRight size={15} className="text-ink-faint group-hover:text-gold-deep" />
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  )
}
