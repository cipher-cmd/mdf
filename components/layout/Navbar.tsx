'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { List, X, WhatsappLogo } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useCopy, useWhatsApp } from '@/providers/SiteProvider'

const navLinks = [
  { label: 'Home',     href: '/' },
  { label: 'About',    href: '/#about' },
  { label: 'Products', href: '/products' },
  { label: 'Clients',  href: '/#clients' },
  { label: 'Blog',     href: '/blog' },
  { label: 'Contact',  href: '/#contact' },
]



export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')
  const pathname = usePathname()
  const copy = useCopy('header')
  const whatsapp = useWhatsApp()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (pathname !== '/') {
      const handle = requestAnimationFrame(() => setActiveSection(''))
      return () => cancelAnimationFrame(handle)
    }
    // Scroll-position based: the active section is the last one whose top has
    // crossed 35% of the viewport. While a nav click is gliding, hold the target
    // so the underline goes straight there instead of stepping through sections.
    const ids = ['categories', 'about', 'brands', 'who-we-serve', 'process', 'clients', 'showroom', 'contact']
    let lockedUntil = 0
    let frame = 0

    const compute = () => {
      frame = 0
      if (performance.now() < lockedUntil) return
      const line = window.innerHeight * 0.35
      let current = ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = 'contact'
      setActiveSection(current)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(compute) }
    const onNavigate = (e: Event) => {
      setActiveSection((e as CustomEvent<string>).detail)
      lockedUntil = performance.now() + 1400
      window.setTimeout(compute, 1450)
    }

    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mdf:scrollto', onNavigate)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mdf:scrollto', onNavigate)
    }
  }, [pathname])

  if (pathname?.startsWith('/admin')) {
    return null
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[#FAF8F5]/90 backdrop-blur-xl border-b border-[#E8E2D6]/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] py-3'
          : 'bg-transparent py-4 md:py-6'
      )}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 select-none group flex-shrink-0">
          <div className="relative h-10 w-10 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
            <Image
              src="/images/mdfFavicon.png"
              alt="MDF"
              fill
              className="object-contain drop-shadow-sm"
              sizes="40px"
              priority
            />
          </div>
          <div className="flex flex-col leading-none">
            <span
              className="text-[#141414] font-bold text-[22px] tracking-[0.02em]"
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              MDF
            </span>
            <span className="text-[#8B6B23] text-[8.5px] font-bold tracking-[0.28em] uppercase mt-[2px]">
              ENTERPRISES
            </span>
          </div>
        </Link>

        {/* Desktop links - positioned over open sky area */}
        <div className="hidden lg:flex items-center gap-5 lg:gap-7 ml-8 lg:ml-12 mr-auto">
          {navLinks.map(link => {
            const sectionId = link.href.replace('/#', '')
            // Sections without their own nav link inherit the nearest parent link
            const navGroup: Record<string, string> = { brands: 'about', 'who-we-serve': 'about', process: 'about', showroom: 'clients' }
            const activeLink = navGroup[activeSection] ?? activeSection
            const isHashLink = link.href.includes('#')
            const isActive =
              (link.href === '/' && pathname === '/' && (activeSection === '' || activeSection === 'categories')) ||
              (isHashLink && pathname === '/' && activeLink === sectionId) ||
              (!isHashLink && link.href !== '/' && pathname.startsWith(link.href))
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative text-[14px] font-medium tracking-[0.01em] transition-colors duration-200 py-1',
                  isActive ? 'text-[#141414] font-semibold' : 'text-[#3E3932] hover:text-[#141414]'
                )}
              >
                <span>{link.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#141414] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </Link>
            )
          })}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          <Link
            href="/#contact"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#CCA552] hover:bg-[#BF9744] text-[#1E170A] text-[13px] font-semibold tracking-wide rounded-full transition-all duration-200 shadow-xs hover:shadow hover:scale-[1.02]"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1E170A]">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span>{copy.quote_button}</span>
          </Link>
          <a
            href={whatsapp()}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-[#FAF8F5] text-[#141414] border border-[#E2DBD0] text-[13px] font-semibold tracking-wide rounded-full transition-all duration-200 shadow-xs hover:shadow hover:scale-[1.02]"
          >
            <WhatsappLogo size={18} weight="fill" className="text-[#25D366]" />
            <span>{copy.whatsapp_button}</span>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-[#141414] p-2 rounded-full hover:bg-black/[0.04] transition-colors"
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden mt-2 bg-[#FAF8F5]/95 backdrop-blur-2xl border border-[#E8E2D6] rounded-[22px] shadow-[0_24px_60px_-20px_rgba(40,28,10,0.35)] overflow-hidden mx-3 origin-top"
          >
            <div className="px-5 py-4 flex flex-col">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.04 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between min-h-[50px] text-[22px] font-semibold text-[#141414] border-b border-[#EDE6D8] font-serif-heading"
                  >
                    {link.label}
                    <span className="text-[#C59B27] text-[15px]" aria-hidden>→</span>
                  </Link>
                </motion.div>
              ))}
              <div className="flex flex-col gap-2.5 pt-4">
                <Link
                  href="/#contact"
                  className="btn-gold w-full justify-center py-3 text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Get a Quote
                </Link>
                <a
                  href={whatsapp()}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-pill-whatsapp w-full justify-center py-3 text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  <WhatsappLogo size={18} weight="fill" className="text-[#25D366]" /> Chat on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
