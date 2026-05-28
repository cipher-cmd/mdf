'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { EASE } from '@/lib/animation'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/layout/ThemeToggle'

const navLinks = [
  { label: 'Home',     href: '/' },
  { label: 'About',    href: '/#about' },
  { label: 'Clients',  href: '/#clients' },
  { label: 'Contact',  href: '/#contact' },
  { label: 'Products', href: '/products' },
  { label: 'Blog',     href: '/blog' },
]

const WA_SVG = (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
)

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection('')
      return
    }
    const sectionIds = ['about', 'categories', 'brands', 'who-we-serve', 'process', 'clients', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.15, rootMargin: '-80px 0px -10% 0px' }
    )
    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [pathname])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-[#050505]/95 backdrop-blur-[24px] shadow-[0_1px_0_rgba(255,255,255,0.06)] py-3'
          : 'bg-gradient-to-b from-black/80 via-black/35 to-transparent py-5'
      )}
    >
      {/* Gold top accent when scrolled */}
      <div
        className={cn(
          'absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C89B5E]/40 to-transparent transition-opacity duration-500',
          scrolled ? 'opacity-100' : 'opacity-0'
        )}
        aria-hidden
      />

      <div className="mx-auto max-w-[1440px] px-6 md:px-12 flex items-center justify-between gap-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3.5 select-none group flex-shrink-0">
          <div className="relative h-11 w-11 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
            <Image
              src="/images/mdfFavicon.png"
              alt="MDF"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col leading-none">
            <span
              className="text-white font-bold text-[19px] tracking-[0.02em] group-hover:text-white transition-colors"
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              MDF
            </span>
            <span className="text-[#C89B5E] text-[8px] font-bold tracking-[0.34em] uppercase mt-[2px]">
              ENTERPRISES
            </span>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {navLinks.map(link => {
            const sectionId = link.href.replace('/#', '')
            const isHashLink = link.href.includes('#')
            const isActive =
              (link.href === '/' && pathname === '/' && activeSection === '') ||
              (isHashLink && pathname === '/' && activeSection === sectionId) ||
              (!isHashLink && link.href !== '/' && pathname.startsWith(link.href)) ||
              (link.href === pathname && !isHashLink)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative px-4 py-2 text-[13.5px] font-medium tracking-[0.025em] transition-colors duration-200 group',
                  isActive ? 'text-white' : 'text-white/50 hover:text-white'
                )}
              >
                {link.label}
                <span
                  className={cn(
                    'absolute bottom-1.5 left-4 right-4 h-[1px] bg-[#C89B5E] transition-all duration-300 origin-left',
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  )}
                />
              </Link>
            )
          })}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          <ThemeToggle />
          <a
            href="https://wa.me/917006252334"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#25d366] hover:bg-[#1fba5c] text-white text-[12px] font-bold tracking-[0.06em] uppercase rounded-md transition-all duration-200 shadow-[0_0_18px_rgba(37,211,102,0.18)] hover:shadow-[0_0_28px_rgba(37,211,102,0.32)]"
          >
            {WA_SVG} WhatsApp
          </a>
          <Link
            href="/#contact"
            className="px-5 py-2.5 border border-white/12 hover:border-[#C89B5E]/55 text-white/55 hover:text-[#C89B5E] text-[12px] font-bold tracking-[0.06em] uppercase rounded-md transition-all duration-200"
          >
            Get Quote
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2.5 rounded-md hover:bg-white/[0.07] transition-colors"
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="md:hidden bg-[#070707]/98 backdrop-blur-[24px] border-t border-white/[0.06] overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-1">
              {navLinks.map((link, i) => {
                const sectionId = link.href.replace('/#', '')
                const isHashLink = link.href.includes('#')
                const isActive =
                  (link.href === '/' && pathname === '/' && activeSection === '') ||
                  (isHashLink && pathname === '/' && activeSection === sectionId) ||
                  (!isHashLink && link.href !== '/' && pathname.startsWith(link.href)) ||
                  (link.href === pathname && !isHashLink)
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.045, ease: EASE }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        'block py-3 text-[17px] font-medium tracking-wide border-b border-white/[0.04] transition-colors',
                        isActive ? 'text-[#C89B5E]' : 'text-white/55 hover:text-white'
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              })}
              <div className="flex flex-col gap-3 pt-6">
                <a
                  href="https://wa.me/917006252334"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold w-full justify-center py-3.5"
                  onClick={() => setMenuOpen(false)}
                >
                  {WA_SVG} Chat on WhatsApp
                </a>
                <Link
                  href="/#contact"
                  className="btn-ghost-dark w-full justify-center py-3.5"
                  onClick={() => setMenuOpen(false)}
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
