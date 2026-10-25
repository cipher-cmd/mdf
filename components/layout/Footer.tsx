'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { MapPin, Phone, EnvelopeSimple } from '@phosphor-icons/react/dist/ssr'
import { useCopy, useDepartments } from '@/providers/SiteProvider'
import { lines, telHref } from '@/lib/content/copy'

const company = [
  { label: 'About Us', href: '/#about' },
  { label: 'Clients',  href: '/#clients' },
  { label: 'Blog',     href: '/blog' },
  { label: 'For Brands', href: '/partners' },
  { label: 'Contact',  href: '/#contact' },
  { label: 'Privacy',  href: '/privacy' },
  { label: 'Terms',    href: '/terms' },
]

export function Footer() {
  const pathname = usePathname()
  const copy = useCopy('footer')
  const contact = useCopy('contact')
  const products = useDepartments().map(d => ({ label: d.label, href: d.href }))
  const weServe = copy.we_serve

  if (pathname?.startsWith('/admin')) {
    return null
  }

  return (
    <footer className="relative bg-[#F7F7F7] border-t border-[#E5E5E5] text-[#222] overflow-hidden">
      
      {/* Background Image: footerBg.png with carved wood on left & sketch on right */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/BG/footerBg.png"
          alt="Footer Background"
          fill
          className="object-cover object-bottom opacity-70 select-none"
        />
        {/* Soft cream wash for 100% crisp typography */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F7F7F7]/90 via-[#F7F7F7]/80 to-[#F7F7F7]/75" />
      </div>

      <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10 pt-8 sm:pt-9 md:pt-10 pb-6">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[240px_1fr_1fr_1.1fr_1.4fr] gap-6 lg:gap-8 mb-7 items-start">

          {/* ── Brand Column ── */}
          <div className="lg:border-r lg:border-[#E5E5E5] lg:pr-6">
            <Link href="/" className="flex items-center gap-3.5 group mb-4 w-fit">
              <div className="relative h-16 w-16 flex-shrink-0">
                <Image src="/images/mdfFavicon.png" alt="MDF Enterprises" fill className="object-contain" sizes="64px" />
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="text-[#141414] font-bold text-[30px] tracking-[0.02em]"
                  style={{ fontFamily: 'var(--font-cormorant), serif' }}
                >
                  MDF
                </span>
                <span className="text-[#8B6B23] text-[11px] font-bold tracking-[0.2em] uppercase mt-1">
                  ENTERPRISES
                </span>
              </div>
            </Link>

            <p className="text-[#5E5850] text-[13px] leading-relaxed">
              {lines(copy.tagline).map((l, i) => <span key={i}>{i > 0 && <br />}{l}</span>)}
            </p>
          </div>

          {/* ── Products Column ── */}
          <div>
            <h2 className="text-[14px] font-semibold text-[#141414] mb-2.5">
              Products
            </h2>
            <ul className="space-y-1.5">
              {products.map(p => (
                <li key={p.href}>
                  <Link href={p.href} className="text-[14px] text-[#554E46] hover:text-[#8B6B23] transition-colors leading-snug">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Company Column ── */}
          <div>
            <h2 className="text-[14px] font-semibold text-[#141414] mb-2.5">
              Company
            </h2>
            <ul className="space-y-1.5">
              {company.map(c => (
                <li key={c.href}>
                  <Link href={c.href} className="text-[14px] text-[#554E46] hover:text-[#8B6B23] transition-colors leading-snug">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── We Serve Column ── */}
          <div>
            <h2 className="text-[14px] font-semibold text-[#141414] mb-2.5">
              We Serve
            </h2>
            <ul className="space-y-1.5">
              {weServe.map(s => (
                <li key={s} className="text-[14px] text-[#554E46] leading-snug">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact Column ── */}
          <div>
            <h2 className="text-[14px] font-semibold text-[#141414] mb-2.5">
              Contact
            </h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-[13px] text-[#554E46]">
                <MapPin size={15} className="text-[#8B6B23] flex-shrink-0 mt-0.5" />
                <span>{contact.address_line1}, {contact.address_line2}</span>
              </li>
              <li className="flex items-center gap-2 text-[13px] text-[#554E46]">
                <Phone size={15} className="text-[#8B6B23] flex-shrink-0" />
                <a href={telHref(contact.phone_display)} className="hover:text-[#8B6B23] transition-colors">{contact.phone_display}</a>
              </li>
              <li className="flex items-center gap-2 text-[13px] text-[#554E46]">
                <EnvelopeSimple size={15} className="text-[#8B6B23] flex-shrink-0" />
                <a href={`mailto:${contact.email}`} className="hover:text-[#8B6B23] transition-colors truncate">
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* ── Bottom Bar ── */}
        <div className="pt-4 border-t border-[#E5E5E5] flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-[#6B6359]">
          <p>© {new Date().getFullYear()} {copy.copyright}</p>
          <div className="flex items-center gap-2">
            <span>{copy.bottom_line}</span>
            <div className="relative w-4 h-3.5 ml-0.5 flex-shrink-0">
              <Image src="/images/mdfFavicon.png" alt="" fill sizes="16px" className="object-contain opacity-75" />
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}
