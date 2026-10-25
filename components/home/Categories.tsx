'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import { CategoryDeck } from './CategoryDeck'
import { useCopy } from '@/providers/SiteProvider'
import type { Category } from '@/lib/data/categories'

const pad = (n: number) => String(n).padStart(2, '0')
const EASE = [0.22, 1, 0.36, 1] as const
const DWELL_S = 6 // seconds each department stays open before the gallery moves on

/**
 * Wide screens: the departments stand side by side as film panels. One is open and running
 * its clip; the rest rest as narrow spines with their names set vertically. Left alone, the
 * gallery walks through them on its own; pointing at one takes over. Smaller screens get the deck.
 */
export function Categories({ departments }: { departments: Category[] }) {
  const copy = useCopy('home_categories')
  const reduce = useReducedMotion()
  const boardRef = useRef<HTMLDivElement>(null)
  const videos = useRef<(HTMLVideoElement | null)[]>([])
  const [active, setActive] = useState(0)
  const [held, setHeld] = useState(false)
  const visible = useInView(boardRef, { margin: '-15% 0px' })
  const N = departments.length

  // The open panel plays from the top; the next one warms up so the hand-off is instant
  useEffect(() => {
    videos.current.forEach((v, i) => {
      if (!v || !v.offsetParent) return
      if (i === active || i === (active + 1) % N) v.preload = 'auto'
      if (i === active && visible) {
        v.currentTime = 0
        v.play().catch(() => {})
      } else v.pause()
    })
  }, [active, visible, N])

  const autoplay = visible && !held && !reduce && N > 1

  return (
    <section id="categories" className="relative w-full bg-[#F7F7F7]">
      <CategoryDeck departments={departments} />

      <div ref={boardRef} className="hidden lg:block max-w-[1400px] mx-auto px-12 pt-28 pb-12">
        <div className="flex items-end justify-between gap-8 mb-10">
          <div>
            <h2 className="text-[44px] xl:text-[52px] font-bold text-[#141414] leading-[1.02] tracking-[-0.015em] font-serif-heading max-w-[680px]">
              {copy.heading}
            </h2>
          </div>
          <div className="flex items-center gap-8 pb-2 flex-shrink-0">
            <p className="text-[12px] font-semibold tracking-[0.2em] tabular-nums text-[#141414]">
              {pad(active + 1)} <span className="text-[#99938B]">/ {pad(N)}</span>
            </p>
            <Link href="/products" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#8B6B23] hover:text-[#A47E28] transition-colors group">
              {copy.all_link}
              <ArrowRight size={13} weight="bold" className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <ol
          className="flex gap-3 h-[clamp(460px,66vh,660px)]"
          onMouseEnter={() => setHeld(true)}
          onMouseLeave={() => setHeld(false)}
        >
          {departments.map((dep, i) => {
            const on = i === active
            return (
              <motion.li
                key={dep.id}
                initial={reduce ? false : { clipPath: 'inset(100% 0% 0% 0% round 24px)' }}
                whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 24px)' }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 1, ease: EASE, delay: i * 0.09 }}
                className={`relative min-w-0 rounded-[24px] overflow-hidden bg-[#1A1712] transition-[flex-grow] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  on ? 'flex-[3.2]' : 'flex-1'
                }`}
              >
                <Link
                  href={dep.href}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-label={`${dep.label}: ${dep.items}`}
                  className="group absolute inset-0 block focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
                >
                  <Image
                    src={dep.poster || dep.image}
                    alt={`${dep.label} at MDF Enterprises, Srinagar`}
                    fill
                    sizes="(max-width: 1400px) 60vw, 840px"
                    className={`object-cover transition-transform duration-[1.4s] ease-out ${on ? 'scale-100' : 'scale-[1.12]'}`}
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
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${on ? 'opacity-100' : 'opacity-0'}`}
                    />
                  )}

                  {/* Resting panels sit back; the open one only shades where its words are */}
                  <div className={`absolute inset-0 bg-black/45 transition-opacity duration-700 ${on ? 'opacity-0' : 'opacity-100'}`} />
                  <div className={`absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-700 ${on ? 'opacity-100' : 'opacity-0'}`} />

                  {/* Spine: the name runs up the narrow panel */}
                  <span
                    aria-hidden
                    className={`absolute bottom-7 left-1/2 -translate-x-1/2 [writing-mode:vertical-rl] rotate-180 whitespace-nowrap text-[22px] xl:text-[24px] font-bold text-white font-serif-heading transition-opacity ${
                      on ? 'opacity-0 duration-200' : 'opacity-100 duration-500 delay-300'
                    }`}
                  >
                    {dep.label}
                  </span>

                  {/* Open panel: fixed-width copy so it never reflows while the panel widens */}
                  <div
                    className={`absolute bottom-0 left-0 w-[400px] xl:w-[500px] p-8 xl:p-10 transition-all ${
                      on ? 'opacity-100 translate-y-0 duration-700 delay-300' : 'opacity-0 translate-y-4 duration-200'
                    }`}
                  >
                    <p className="text-[#E9CF94] text-[20px] xl:text-[22px] mb-1" style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic' }}>
                      {dep.tagline}
                    </p>
                    <h3 className="text-[40px] xl:text-[54px] font-bold text-white leading-[0.95] tracking-[-0.02em] font-serif-heading">{dep.label}</h3>
                    <p className="mt-3 text-[14px] text-white/75">{dep.items}</p>
                    <span className="mt-6 inline-flex items-center gap-3 pl-5 pr-1.5 min-h-[48px] rounded-full bg-white/15 group-hover:bg-white/25 backdrop-blur-md border border-white/30 text-white text-[14px] font-semibold transition-colors">
                      {copy.card_button} {dep.short}
                      <span className="w-9 h-9 rounded-full bg-[#CCA552] text-[#1E170A] flex items-center justify-center">
                        <ArrowUpRight size={16} weight="bold" className="transition-transform duration-300 group-hover:rotate-45" />
                      </span>
                    </span>
                  </div>

                  {/* Timer: when the line fills, the next department opens */}
                  {on && autoplay && (
                    <motion.span
                      key={active}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: DWELL_S, ease: 'linear' }}
                      onAnimationComplete={() => setActive(a => (a + 1) % N)}
                      className="absolute left-0 right-0 bottom-0 h-[3px] bg-[#CCA552] origin-left"
                    />
                  )}
                </Link>
              </motion.li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
