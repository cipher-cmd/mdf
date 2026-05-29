'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { InfiniteMarquee } from '@/components/ui/InfiniteMarquee'

const tickerItems = [
  { text: 'Field Ready.' },
  { text: 'One Call. Every Sport.' },
  { text: 'Built for Champions' },
  { text: "J&K's Equipment Authority" },
  { text: 'Stadium to School' },
  { text: '28 Years in Business' },
  { text: 'Genuine. Fast. Trusted.' },
  { text: '1000+ Venues Equipped' },
  { text: 'Court to Classroom' },
  { text: 'GeM Certified Supply' },
  { text: 'Since 1997 · Srinagar' },
  { text: 'Where Performance Meets Procurement' },
]

interface Badge {
  title: string
  sub: string
  logo?: string
  logoAlt?: string
  logoW?: number
  bigNum?: string
}

const badges: Badge[] = [
  {
    logo:    '/images/gemLogo.webp',
    logoAlt: 'GeM Registered',
    logoW:   56,
    title:   'GeM Registered',
    sub:     'Government e-Marketplace',
  },
  {
    logo:    '/images/msmeLogo.webp',
    logoAlt: 'MSME Certified',
    logoW:   64,
    title:   'MSME Certified',
    sub:     'Ministry of MSME, India',
  },
  {
    bigNum: '28+',
    title:  'Years of Excellence',
    sub:    'Established 1997, Srinagar',
  },
  {
    bigNum: '1000+',
    title:  'Institutions Served',
    sub:    'Across J&K & beyond',
  },
]

export function TrustStrip() {
  return (
    <section className="relative bg-[#0f0f0f] border-y border-white/[0.06] overflow-hidden">
      {/* Sliding gold sheen */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(200,155,94,0.10) 50%, transparent 100%)',
          animation: 'trustBeam 9s linear infinite',
        }}
        aria-hidden
      />
      <style>{`
        @keyframes trustBeam {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-0">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.05]">
          {badges.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.09, duration: 0.5 }}
              className="flex items-center gap-4 px-6 py-6"
            >
              {/* Logo or big number */}
              {b.logo ? (
                <div
                  className="flex-shrink-0 relative"
                  style={{ width: b.logoW ?? 56, height: 36 }}
                >
                  <Image
                    src={b.logo}
                    alt={b.logoAlt ?? b.title}
                    fill
                    className="object-contain"
                    sizes={`${b.logoW ?? 56}px`}
                  />
                </div>
              ) : (
                <span
                  className="text-[26px] font-bold text-[#C89B5E] leading-none flex-shrink-0"
                  style={{ fontFamily: 'var(--font-cormorant), serif' }}
                >
                  {b.bigNum}
                </span>
              )}

              {/* Text */}
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-white leading-tight">{b.title}</p>
                <p className="text-[11px] text-white/35 mt-0.5 leading-tight">{b.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Marquee ticker strip */}
      <div className="border-t border-white/[0.04] py-3">
        <InfiniteMarquee speed={45} pauseOnHover={false} className="py-0">
          {tickerItems.map((item, i) => (
            <span key={i} className="flex items-center gap-5 px-6">
              <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-white/25 whitespace-nowrap">
                {item.text}
              </span>
              <span className="w-[3px] h-[3px] rounded-full bg-[#C89B5E]/35 flex-shrink-0" aria-hidden />
            </span>
          ))}
        </InfiniteMarquee>
      </div>
    </section>
  )
}
