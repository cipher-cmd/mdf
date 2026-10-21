'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import { InfiniteMarquee } from '@/components/ui/InfiniteMarquee'
import { useCopy } from '@/providers/SiteProvider'
import type { Category } from '@/lib/data/categories'

const pad = (n: number) => String(n).padStart(2, '0')

/**
 * The shop's directory board: one entry per department, a picture over big serif type.
 * Phones stack the entries; wide screens line them up as a gallery where the one you
 * point at opens wider and runs its film.
 */
export function Categories({ departments }: { departments: Category[] }) {
  const copy = useCopy('home_categories')
  const boardRef = useRef<HTMLDivElement>(null)
  const videos = useRef<(HTMLVideoElement | null)[]>([])
  const [active, setActive] = useState(0)
  const visible = useInView(boardRef, { margin: '-15% 0px' })

  // Only the department on show plays (videos are desktop-only, hidden on phones)
  useEffect(() => {
    videos.current.forEach((v, i) => {
      if (!v) return
      if (i === active && visible && v.offsetParent) {
        v.preload = 'auto'
        v.play().catch(() => {})
      } else v.pause()
    })
  }, [active, visible])

  return (
    <section id="categories" className="relative w-full bg-[#FAF8F5]">
      <div className="relative bg-[#15110C] text-[#F3EBDD]">
        <div ref={boardRef} className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12 pt-24 sm:pt-28 pb-16 sm:pb-24">

          {/* Board header */}
          <div className="flex items-end justify-between gap-6 pb-6 sm:pb-8 lg:pb-10 border-b border-[#F3EBDD]/25 lg:border-0">
            <div>
              <p className="mb-2 text-[11px] tracking-[0.2em] font-semibold text-[#CCA552] uppercase">{copy.eyebrow}</p>
              <h2 className="text-[30px] sm:text-[40px] lg:text-[52px] font-bold leading-[1.02] tracking-[-0.01em] font-serif-heading max-w-[640px]">
                {copy.heading}
              </h2>
            </div>
            <Link href="/products" className="hidden sm:inline-flex items-center gap-1.5 pb-2 text-[13px] font-semibold text-[#CCA552] hover:text-[#E9CF94] transition-colors group flex-shrink-0">
              {copy.all_link}
              <ArrowRight size={13} weight="bold" className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <ol className="lg:flex lg:gap-4 xl:gap-5">
            {departments.map((dep, i) => {
              const on = i === active
              return (
                <li
                  key={dep.id}
                  className={`border-b border-[#F3EBDD]/15 lg:border-0 lg:min-w-0 lg:transition-[flex-grow] lg:duration-700 lg:ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    on ? 'lg:flex-[2.1]' : 'lg:flex-1'
                  }`}
                >
                  <Link
                    href={dep.href}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group block py-6 sm:py-8 lg:py-0 focus:outline-none"
                  >
                    <div className="relative aspect-[16/9] lg:aspect-auto lg:h-[min(58vh,520px)] mb-4 lg:mb-6 overflow-hidden bg-[#221B12] lg:rounded-[4px]">
                      <Image
                        src={dep.poster || dep.image}
                        alt={dep.label}
                        fill
                        className={`object-cover transition-transform duration-[1.2s] ease-out ${on ? 'lg:scale-100' : 'lg:scale-110 lg:grayscale-[40%]'}`}
                        sizes="(max-width: 1024px) 100vw, 45vw"
                      />
                      {dep.video && (
                        <video
                          ref={el => { videos.current[i] = el }}
                          src={dep.video}
                          poster={dep.poster || dep.image}
                          muted
                          loop
                          playsInline
                          preload="none"
                          aria-hidden
                          className={`hidden lg:block absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${on ? 'opacity-100' : 'opacity-0'}`}
                        />
                      )}
                      {/* Desktop: dim the resting panels, shade the open one's foot */}
                      <div className={`hidden lg:block absolute inset-0 bg-[#15110C] transition-opacity duration-700 pointer-events-none ${on ? 'opacity-0' : 'opacity-45'}`} />
                      <div className="hidden lg:block absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />
                      <span className="hidden lg:block absolute top-4 left-4 text-[12px] font-semibold tracking-[0.16em] text-[#F3EBDD]/85 tabular-nums">No.{pad(i + 1)}</span>
                      <span
                        className={`hidden lg:flex absolute bottom-4 right-4 w-11 h-11 rounded-full items-center justify-center transition-all duration-500 ${
                          on ? 'bg-[#CCA552] text-[#1E170A] rotate-45' : 'bg-white/10 text-[#F3EBDD] backdrop-blur-md border border-white/25'
                        }`}
                      >
                        <ArrowUpRight size={18} weight="bold" />
                      </span>
                    </div>

                    <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] lg:block items-baseline gap-x-4 sm:gap-x-6">
                      <span className="lg:hidden text-[12px] font-semibold tracking-[0.16em] text-[#CCA552] tabular-nums">No.{pad(i + 1)}</span>
                      <span
                        className={`block text-[34px] sm:text-[52px] lg:text-[30px] xl:text-[38px] font-bold leading-[0.95] tracking-[-0.02em] font-serif-heading transition-colors duration-500 lg:truncate ${
                          on ? 'text-[#F3EBDD]' : 'text-[#F3EBDD] lg:text-[#F3EBDD]/45'
                        }`}
                      >
                        {dep.label}
                      </span>
                      <ArrowUpRight size={22} weight="light" className="lg:hidden self-center text-[#CCA552]" />
                      <span className="lg:hidden" />
                      <span
                        className={`col-span-2 mt-2 lg:mt-3 block text-[13px] sm:text-[14px] leading-relaxed transition-opacity duration-500 ${
                          on ? 'text-[#F3EBDD]/80' : 'text-[#F3EBDD]/70 lg:opacity-0'
                        }`}
                      >
                        <span className="italic font-serif-heading text-[16px] sm:text-[18px] text-[#E9CF94]">{dep.tagline}</span>
                        <span className="hidden sm:inline lg:hidden"> — </span>
                        <span className="block sm:inline lg:block lg:truncate">{dep.items.split('·').map(s => s.trim()).filter(Boolean).join(', ')}</span>
                      </span>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ol>

          <Link href="/products" className="sm:hidden mt-8 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#CCA552]">
            {copy.all_link}
            <ArrowRight size={13} weight="bold" />
          </Link>
        </div>
      </div>

      {/* Kinetic band of disciplines, a light breath before About */}
      <div className="relative py-10 sm:py-12 lg:py-14" aria-label="Disciplines we equip">
        <InfiniteMarquee speed={60} pauseOnHover={false}>
          {copy.marquee.map((word, i) => (
            <span key={`${word}-${i}`} className="flex items-center">
              <span
                className={`px-5 sm:px-7 text-[34px] sm:text-[44px] lg:text-[52px] leading-none whitespace-nowrap font-serif-heading ${
                  i % 2 ? 'italic text-[#C8A45A]' : 'font-bold text-[#1E1A14]'
                }`}
              >
                {word}
              </span>
              <span className="text-[#CCA552] text-[14px]" aria-hidden>✦</span>
            </span>
          ))}
        </InfiniteMarquee>
      </div>
    </section>
  )
}
