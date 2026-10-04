import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, EnvelopeSimple, WhatsappLogo } from '@phosphor-icons/react/dist/ssr'

const products = [
  { label: 'Sports Goods',        href: '/products/sports' },
  { label: 'Fitness Equipment',   href: '/products/fitness' },
  { label: 'Musical Instruments', href: '/products/music' },
  { label: 'Awards & Trophies',   href: '/products/awards' },
]

const company = [
  { label: 'About Us', href: '/#about' },
  { label: 'Clients',  href: '/#clients' },
  { label: 'Blog',     href: '/blog' },
  { label: 'Contact',  href: '/#contact' },
]

const weServe = [
  'Government Departments',
  'Educational Institutions',
  'Sports Clubs & Academies',
  'Private Organisations',
]

export function Footer() {
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
              Sports. Fitness. Music. Awards.<br />
              Serving Jammu &amp; Kashmir since 1997.
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
                <span>SDA Shopping Complex, Opp. Iqbal Park, Srinagar, J&amp;K — 190008</span>
              </li>
              <li className="flex items-center gap-2 text-[12px] text-[#554E46]">
                <Phone size={15} weight="duotone" className="text-[#8B6B23] flex-shrink-0" />
                <a href="tel:+917006252334" className="hover:text-[#B8860B] transition-colors">+91 70062 52334</a>
              </li>
              <li className="flex items-center gap-2 text-[12px] text-[#554E46]">
                <EnvelopeSimple size={15} weight="duotone" className="text-[#8B6B23] flex-shrink-0" />
                <a href="mailto:mdfenterprisesjk@gmail.com" className="hover:text-[#B8860B] transition-colors truncate">
                  mdfenterprisesjk@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* ── Bottom Bar ── */}
        <div className="pt-4 border-t border-[#EAE3D5] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#7A7369]">
          <p>© 2026 MDF Enterprises, Srinagar. All rights reserved.</p>
          <div className="flex items-center gap-2 text-[11px] text-[#7A7369]">
            <span>Sports · Fitness · Music · Awards</span>
            <div className="relative w-4 h-3.5 ml-0.5 flex-shrink-0">
              <Image src="/images/mdfFavicon.png" alt="MDF" fill className="object-contain opacity-75" />
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}
