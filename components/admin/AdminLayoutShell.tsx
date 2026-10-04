'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useState, type ReactNode } from 'react'
import {
  House, Package, SquaresFour, Newspaper, PenNib, TextAa, Images, GearSix, SignOut, ArrowSquareOut,
} from '@phosphor-icons/react'
import { FeedbackProvider } from './ui'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/admin', label: 'Home', icon: House },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/departments', label: 'Departments', icon: SquaresFour },
  { href: '/admin/articles', label: 'Articles', icon: Newspaper },
  { href: '/admin/writer', label: 'Article Writer', icon: PenNib },
  { href: '/admin/text', label: 'Website Text', icon: TextAa },
  { href: '/admin/pictures', label: 'Pictures', icon: Images },
  { href: '/admin/settings', label: 'Settings', icon: GearSix },
]

function Logo() {
  return (
    <Link href="/admin" className="flex items-center gap-3 select-none group">
      <span className="relative h-10 w-10 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
        <Image src="/images/mdfFavicon.png" alt="" fill className="object-contain" sizes="40px" priority />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-serif-heading text-[22px] font-bold tracking-[0.02em] text-ink">MDF</span>
        <span className="mt-[3px] text-[8.5px] font-bold uppercase tracking-[0.28em] text-gold-deep">Store Manager</span>
      </span>
    </Link>
  )
}

export default function AdminLayoutShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [leaving, setLeaving] = useState(false)

  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-parchment text-ink">{children}</div>
  }

  const active = (href: string) => (href === '/admin' ? pathname === '/admin' : pathname === href || pathname.startsWith(`${href}/`))

  const signOut = async () => {
    setLeaving(true)
    await fetch('/api/admin/auth/logout', { method: 'POST' }).catch(() => {})
    router.replace('/admin/login')
    router.refresh()
  }

  return (
    <FeedbackProvider>
      <div className="min-h-screen bg-parchment text-ink antialiased lg:grid lg:grid-cols-[256px_minmax(0,1fr)]">
        {/* Desktop sidebar: same paper as the page, divided by a hairline */}
        <aside className="hidden lg:flex sticky top-0 h-screen flex-col border-r border-hairline px-5 py-6">
          <Logo />
          <nav className="mt-9 flex flex-col gap-0.5" aria-label="Store manager">
            {NAV.map(({ href, label, icon: Icon }) => {
              const on = active(href)
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={on ? 'page' : undefined}
                  className={cn(
                    'relative flex items-center gap-3 rounded-xl px-3 min-h-[42px] text-[14px] transition-colors',
                    on ? 'bg-ledger font-semibold text-ink shadow-[0_0_0_1px_rgba(60,45,20,0.08),0_6px_16px_-10px_rgba(60,45,20,0.3)]' : 'text-ink-soft hover:bg-vellum hover:text-ink'
                  )}
                >
                  {on && <span className="absolute left-0 top-2.5 bottom-2.5 w-[3px] rounded-full bg-gold" aria-hidden />}
                  <Icon size={18} weight={on ? 'fill' : 'regular'} className={on ? 'text-gold-deep' : 'text-ink-faint'} />
                  {label}
                </Link>
              )
            })}
          </nav>

          <div className="mt-auto space-y-3">
            <p className="flex items-start gap-2 rounded-2xl bg-leaf-wash px-3.5 py-3 text-[12px] leading-snug text-leaf">
              <span className="mt-[5px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-leaf" />
              Everything you save here appears on the website straight away.
            </p>
            <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 min-h-[40px] rounded-xl text-[13.5px] font-medium text-ink-soft hover:bg-vellum hover:text-ink">
              <ArrowSquareOut size={17} className="text-gold-deep" /> View the website
            </a>
            <button onClick={signOut} disabled={leaving} className="flex w-full items-center gap-2 px-3 min-h-[40px] rounded-xl text-[13.5px] font-medium text-ink-soft hover:bg-rust-wash hover:text-rust">
              <SignOut size={17} /> {leaving ? 'Signing out…' : 'Sign out'}
            </button>
          </div>
        </aside>

        {/* Phones & tablets: logo bar + swipeable tabs */}
        <header className="lg:hidden sticky top-0 z-40 bg-parchment/95 backdrop-blur-md border-b border-hairline">
          <div className="flex items-center justify-between px-4 h-16">
            <Logo />
            <div className="flex items-center gap-1">
              <a href="/" target="_blank" rel="noreferrer" aria-label="View the website" className="h-11 w-11 rounded-full flex items-center justify-center text-gold-deep hover:bg-vellum">
                <ArrowSquareOut size={20} />
              </a>
              <button onClick={signOut} aria-label="Sign out" className="h-11 w-11 rounded-full flex items-center justify-center text-ink-soft hover:bg-rust-wash hover:text-rust">
                <SignOut size={20} />
              </button>
            </div>
          </div>
          <nav className="flex gap-1.5 overflow-x-auto px-4 pb-3 no-scrollbar" aria-label="Store manager">
            {NAV.map(({ href, label, icon: Icon }) => {
              const on = active(href)
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={on ? 'page' : undefined}
                  className={cn(
                    'flex flex-shrink-0 items-center gap-1.5 rounded-full px-3.5 min-h-[38px] text-[13px] font-medium',
                    on ? 'bg-ink text-white' : 'bg-ledger text-ink-soft shadow-[0_0_0_1px_rgba(60,45,20,0.1)]'
                  )}
                >
                  <Icon size={15} weight={on ? 'fill' : 'regular'} className={on ? 'text-gold' : 'text-ink-faint'} />
                  {label}
                </Link>
              )
            })}
          </nav>
        </header>

        <main className="min-w-0 px-4 sm:px-8 lg:px-12 py-7 sm:py-10 max-w-[1240px] w-full">{children}</main>
      </div>
    </FeedbackProvider>
  )
}
