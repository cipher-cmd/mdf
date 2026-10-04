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
  { label: 'Contact',  href: '/#contact' },
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
    <footer className="relative bg-[#FAF8F5] border-t border-[#EAE3D5] text-[#222] overflow-hidden">
      
      {/* Background Image: footerBg.png with carved wood on left & sketch on right */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/BG/footerBg.png"
          alt="Footer Background"
          fill
          className="object-cover object-bottom opacity-70 select-none"
        />
        {/* Soft cream wash for 100% crisp typography */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/90 via-[#FAF8F5]/80 to-[#FAF8F5]/75" />
      </div>

      <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10 pt-8 sm:pt-9 md:pt-10 pb-6">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[240px_1fr_1fr_1.1fr_1.4fr] gap-6 lg:gap-8 mb-7 items-start">

          {/* ── Brand Column ── */}
          <div className="lg:border-r lg:border-[#EAE3D5] lg:pr-6">
            <Link href="/" className="flex items-center gap-3.5 group mb-4 w-fit">
              <div className="relative h-16 w-16 flex-shrink-0 transition-transform duration-500 group-hover:scale-105">
                <Image src="/images/mdfFavicon.png" alt="MDF Enterprises" fill className="object-contain drop-shadow-sm" sizes="64px" />
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="text-[#141414] font-bold text-[30px] tracking-[0.02em]"
                  style={{ fontFamily: 'var(--font-cormorant), serif' }}
                >
                  MDF
                </span>
                <span className="text-[#8B6B23] text-[10px] font-bold tracking-[0.3em] uppercase mt-1">
                  ENTERPRISES
                </span>
              </div>
            </Link>

            <p className="text-[#6B6359] text-[12px] leading-relaxed">
              {lines(copy.tagline).map((l, i) => <span key={i}>{i > 0 && <br />}{l}</span>)}
            </p>
          </div>

          {/* ── Products Column ── */}
          <div>
            <h4 className="text-[11.5px] font-bold text-[#141414] uppercase tracking-[0.14em] mb-2.5 font-sans">
              Products
            </h4>
            <ul className="space-y-1.5">
              {products.map(p => (
                <li key={p.href}>
                  <Link href={p.href} className="text-[12.5px] text-[#554E46] hover:text-[#B8860B] transition-colors leading-snug">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Company Column ── */}
          <div>
            <h4 className="text-[11.5px] font-bold text-[#141414] uppercase tracking-[0.14em] mb-2.5 font-sans">
              Company
            </h4>
            <ul className="space-y-1.5">
              {company.map(c => (
                <li key={c.href}>
                  <Link href={c.href} className="text-[12.5px] text-[#554E46] hover:text-[#B8860B] transition-colors leading-snug">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── We Serve Column ── */}
          <div>
            <h4 className="text-[11.5px] font-bold text-[#141414] uppercase tracking-[0.14em] mb-2.5 font-sans">
              We Serve
            </h4>
            <ul className="space-y-1.5">
              {weServe.map(s => (
                <li key={s} className="text-[12.5px] text-[#554E46] leading-snug">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact Column ── */}
          <div>
            <h4 className="text-[11.5px] font-bold text-[#141414] uppercase tracking-[0.14em] mb-2.5 font-sans">
              Contact
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-[12px] text-[#554E46]">
                <MapPin size={15} weight="duotone" className="text-[#8B6B23] flex-shrink-0 mt-0.5" />
                <span>{contact.address_line1}, {contact.address_line2}</span>
              </li>
              <li className="flex items-center gap-2 text-[12px] text-[#554E46]">
                <Phone size={15} weight="duotone" className="text-[#8B6B23] flex-shrink-0" />
                <a href={telHref(contact.phone_display)} className="hover:text-[#B8860B] transition-colors">{contact.phone_display}</a>
              </li>
              <li className="flex items-center gap-2 text-[12px] text-[#554E46]">
                <EnvelopeSimple size={15} weight="duotone" className="text-[#8B6B23] flex-shrink-0" />
                <a href={`mailto:${contact.email}`} className="hover:text-[#B8860B] transition-colors truncate">
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* ── Bottom Bar ── */}
        <div className="pt-4 border-t border-[#EAE3D5] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#7A7369]">
          <p>© {new Date().getFullYear()} {copy.copyright}</p>
          <div className="flex items-center gap-2 text-[11px] text-[#7A7369]">
            <span>{copy.bottom_line}</span>
            <div className="relative w-4 h-3.5 ml-0.5 flex-shrink-0">
              <Image src="/images/mdfFavicon.png" alt="MDF" fill className="object-contain opacity-75" />
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}
