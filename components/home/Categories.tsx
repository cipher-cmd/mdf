'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import { InfiniteMarquee } from '@/components/ui/InfiniteMarquee'
import { useCopy } from '@/providers/SiteProvider'
import type { Category } from '@/lib/data/categories'

const pad = (n: number) => String(n).padStart(2, '0')
const EASE = [0.22, 1, 0.36, 1] as const

/**
 * The shop's directory board: one ruled row per department, set in big serif type like the
 * brass plaque by a store's stairs. On wide screens the row you point at runs its film in the
 * plate beside the list; on phones every row carries its own picture.
 */
export function Categories({ departments }: { departments: Category[] }) {
  const copy = useCopy('home_categories')
  const reduce = useReducedMotion()
  const boardRef = useRef<HTMLDivElement>(null)
  const videos = useRef<(HTMLVideoElement | null)[]>([])
  const [active, setActive] = useState(0)
  const visible = useInView(boardRef, { margin: '-15% 0px' })

  // Only the department on show plays
  useEffect(() => {
    videos.current.forEach((v, i) => {
      if (!v) return
      if (i === active && visible) {
        v.preload = 'auto'
        v.play().catch(() => {})
      } else v.pause()
    })
  }, [active, visible])

  const current = departments[active] ?? departments[0]

  return (
    <section id="categories" className="relative w-full bg-[#FAF8F5]">
      <div className="relative bg-[#15110C] text-[#F3EBDD]">
        <div ref={boardRef} className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12 pt-24 sm:pt-28 pb-16 sm:pb-24">

          {/* Board header */}
          <div className="flex items-end justify-between gap-6 pb-6 sm:pb-8 border-b border-[#F3EBDD]/25">
            <div>
              <p className="mb-2 text-[11px] tracking-[0.2em] font-semibold text-[#CCA552] uppercase">{copy.eyebrow}</p>
              <h2 className="text-[30px] sm:text-[40px] lg:text-[48px] font-bold leading-[1.02] tracking-[-0.01em] font-serif-heading max-w-[640px]">
                {copy.heading}
              </h2>
            </div>
            <Link href="/products" className="hidden sm:inline-flex items-center gap-1.5 pb-2 text-[13px] font-semibold text-[#CCA552] hover:text-[#E9CF94] transition-colors group flex-shrink-0">
              {copy.all_link}
              <ArrowRight size={13} weight="bold" className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="lg:grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14 xl:gap-20">

            {/* The directory */}
            <ol>
              {departments.map((dep, i) => {
                const on = i === active
                return (
                  <li key={dep.id} className="border-b border-[#F3EBDD]/15">
                    <Link
                      href={dep.href}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      className="group block py-6 sm:py-8 lg:py-7 focus:outline-none"
                    >
                      {/* Phones: each row shows its own picture */}
                      <div className="lg:hidden relative aspect-[16/9] mb-4 overflow-hidden bg-[#221B12]">
                        <Image src={dep.poster || dep.image} alt={dep.label} fill className="object-cover" sizes="100vw" />
                      </div>

                      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-x-4 sm:gap-x-6">
                        <span className="text-[12px] font-semibold tracking-[0.16em] text-[#CCA552] tabular-nums">No.{pad(i + 1)}</span>
                        <motion.span
                          animate={reduce ? undefined : { x: on ? 14 : 0 }}
                          transition={{ duration: 0.5, ease: EASE }}
                          className={`block text-[34px] sm:text-[52px] xl:text-[64px] font-bold leading-[0.95] tracking-[-0.02em] font-serif-heading transition-colors duration-300 ${
                            on ? 'text-[#F3EBDD]' : 'text-[#F3EBDD] lg:text-[#F3EBDD]/35'
                          }`}
                        >
                          {dep.label}
                        </motion.span>
                        <ArrowUpRight
                          size={22}
                          weight="light"
                          className={`self-center transition-all duration-300 ${on ? 'text-[#CCA552] rotate-45' : 'text-[#F3EBDD]/40'}`}
                        />
                        <span />
                        <span
                          className={`col-span-2 mt-2 text-[13px] sm:text-[14px] leading-relaxed transition-colors duration-300 ${
                            on ? 'text-[#F3EBDD]/80' : 'text-[#F3EBDD]/70 lg:text-[#F3EBDD]/30'
                          }`}
                        >
                          <span className="italic font-serif-heading text-[16px] sm:text-[18px] text-[#E9CF94]">{dep.tagline}</span>
                          <span className="hidden sm:inline"> — </span>
                          <span className="block sm:inline">{dep.items.split('·').map(s => s.trim()).filter(Boolean).join(', ')}</span>
                        </span>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ol>

            {/* The plate: shows whichever department is pointed at */}
            <div className="hidden lg:block pt-8">
              <div className="sticky top-28">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#221B12]">
                  {departments.map((dep, i) => (
                    <motion.div
                      key={dep.id}
                      initial={false}
                      animate={{
                        opacity: i === active ? 1 : 0,
                        clipPath: reduce || i === active ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
                      }}
                      transition={{ duration: 0.7, ease: EASE }}
                      className="absolute inset-0"
                      style={{ zIndex: i === active ? 2 : 1 }}
                    >
                      {dep.video ? (
                        <video
                          ref={el => { videos.current[i] = el }}
                          src={dep.video}
                          poster={dep.poster || dep.image}
                          muted
                          loop
                          playsInline
                          preload="none"
                          aria-hidden
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <Image src={dep.poster || dep.image} alt="" fill className="object-cover" sizes="40vw" />
                      )}
                    </motion.div>
                  ))}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 z-[3] bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-4 text-[12px] tracking-[0.12em] uppercase text-[#F3EBDD]/55">
                  <span>Fig. {pad(active + 1)} — {current?.label}</span>
                  <Link href={current?.href ?? '/products'} className="text-[#CCA552] hover:text-[#E9CF94] transition-colors">
                    {copy.card_button} {current?.short} →
                  </Link>
                </div>
              </div>
            </div>
          </div>

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
