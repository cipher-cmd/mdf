'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValueEvent, useScroll, useTransform, type MotionValue } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import { InfiniteMarquee } from '@/components/ui/InfiniteMarquee'
import { getLenis } from '@/lib/scroll'
import { useCopy } from '@/providers/SiteProvider'
import type { Category } from '@/lib/data/categories'

const STEP_VH = 80   // scroll distance per card
const DWELL = 0.9    // last 10% of the track holds the final card before release
const PEEK = 12      // px of each buried card left showing at the top of the deck

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const easeOut = (e: number) => 1 - Math.pow(1 - e, 3)


/** One card in the deck. `t` runs 0 → N-1: card i slides in while t goes i-1 → i, then sinks as later cards land on it. */
function DeptCard({ dep, index, N, t, videoRef, cta }: { dep: Category; index: number; N: number; t: MotionValue<number>; videoRef: (el: HTMLVideoElement | null) => void; cta: string }) {
  const y = useTransform(t, v => `${index === 0 ? 0 : (1 - easeOut(clamp01(v - (index - 1)))) * 115}%`)
  const depth = useTransform(t, v => Math.min(N - 1 - index, Math.max(0, v - index)))
  const scale = useTransform(depth, d => 1 - d * 0.05)
  const dim = useTransform(depth, d => Math.min(0.6, d * 0.4))

  return (
    <motion.div
      style={{ y, scale, top: index * PEEK, zIndex: index, height: `calc(100% - ${(N - 1) * PEEK}px)` }}
      className="absolute inset-x-0 origin-top rounded-[22px] sm:rounded-[28px] overflow-hidden bg-[#0E0B07] shadow-[0_-18px_40px_-20px_rgba(20,14,6,0.55)] will-change-transform"
    >
      {/* Phones: blurred scene fills the tall card, the clip sits in a wide band so most of the frame stays visible */}
      <div className="sm:hidden absolute inset-0">
        <Image src={dep.poster || dep.image} alt="" fill className="object-cover scale-125 blur-2xl opacity-70" sizes="50vw" />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {!dep.video && <Image src={dep.poster || dep.image} alt="" fill className="object-cover" sizes="(max-width: 640px) 100vw, 1400px" />}
      {dep.video && <video
        ref={videoRef}
        src={dep.video}
        poster={dep.poster}
        muted
        playsInline
        preload="none"
        aria-hidden
        className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 w-[165%] max-w-none aspect-video object-cover
          [mask-image:linear-gradient(to_bottom,transparent,#000_14%,#000_86%,transparent)]
          sm:[mask-image:none] sm:inset-0 sm:left-0 sm:top-0 sm:translate-x-0 sm:translate-y-0 sm:w-full sm:h-full sm:aspect-auto"
      />}

      {/* Shade only where text sits */}
      <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 lg:p-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="max-w-[560px]">
          <p className="text-[11px] font-semibold tracking-[0.22em] text-white/70 mb-2 tabular-nums">0{index + 1} / 0{N}</p>
          <p className="text-[#E9CF94] text-[15px] sm:text-[17px] mb-0.5" style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic' }}>
            {dep.tagline}
          </p>
          <h3 className="text-[34px] sm:text-[48px] lg:text-[58px] font-bold text-white leading-[0.98] tracking-[-0.01em] font-serif-heading">
            {dep.label}
          </h3>
          <p className="text-[13px] sm:text-[13.5px] text-white/75 mt-2">{dep.items}</p>
        </div>
        <Link
          href={dep.href}
          className="self-start sm:self-end inline-flex items-center gap-2 pl-4 pr-1.5 min-h-[44px] rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white text-[13px] font-semibold transition-colors group/cta flex-shrink-0"
        >
          {cta} {dep.short}
          <span className="w-8 h-8 rounded-full bg-[#CCA552] text-[#1E170A] flex items-center justify-center">
            <ArrowUpRight size={14} weight="bold" className="transition-transform duration-300 group-hover/cta:rotate-45" />
          </span>
        </Link>
      </div>

      {/* Buried cards dim as the deck grows */}
      <motion.div style={{ opacity: dim }} className="absolute inset-0 bg-[#0E0B07] pointer-events-none" />
    </motion.div>
  )
}

/** Header progress segment for card i */
function Segment({ t, index, onClick, label }: { t: MotionValue<number>; index: number; onClick: () => void; label: string }) {
  const fill = useTransform(t, v => (index === 0 ? 1 : clamp01(v - (index - 1))))
  return (
    <button onClick={onClick} aria-label={`Go to ${label}`} className="w-8 sm:w-12 py-3 -my-3">
      <span className="block h-[3px] rounded-full bg-[#E2D8C4] overflow-hidden">
        <motion.span style={{ scaleX: fill }} className="block h-full bg-[#B8923F] origin-left" />
      </span>
    </button>
  )
}

export function Categories({ departments }: { departments: Category[] }) {
  const copy = useCopy('home_categories')
  const N = Math.max(1, departments.length)
  const trackRef = useRef<HTMLDivElement>(null)
  const deckRef = useRef<HTMLDivElement>(null)
  const videos = useRef<(HTMLVideoElement | null)[]>([])
  const [active, setActive] = useState(0)
  const visible = useInView(deckRef, { margin: '-10% 0px' })

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] })
  const t = useTransform(scrollYProgress, v => Math.min(N - 1, (v / DWELL) * Math.max(1, N - 1)))
  useMotionValueEvent(t, 'change', v => {
    const next = Math.min(N - 1, Math.floor(v + 0.5))
    setActive(prev => (prev === next ? prev : next))
  })

  // The top card plays from the start, so its scene lights up as it lands; the next one preloads
  useEffect(() => {
    videos.current.forEach((v, i) => {
      if (!v) return
      if (i <= active + 1 && v.preload !== 'auto') v.preload = 'auto'
      if (i === active && visible) {
        v.currentTime = 0
        v.play().catch(() => {})
      } else {
        v.pause()
      }
    })
  }, [active, visible])

  const goTo = (i: number) => {
    const track = trackRef.current
    if (!track) return
    const top = track.getBoundingClientRect().top + window.scrollY
    const y = top + (track.offsetHeight - window.innerHeight) * ((i / Math.max(1, N - 1)) * DWELL)
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(y, { duration: 1.1 })
    else window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return (
    <section id="categories" className="relative w-full bg-[#FAF8F5]">
      <div ref={trackRef} data-hide-fab className="relative" style={{ height: `calc(100svh + ${((N - 1) * STEP_VH) / DWELL}svh)` }}>
        <div className="sticky top-0 h-[100svh] overflow-hidden flex flex-col pt-[72px] sm:pt-[84px] pb-3 sm:pb-6 px-3 sm:px-6 md:px-12">

          {/* Heading + deck progress */}
          <div className="max-w-[1400px] w-full mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-2.5 sm:gap-4 px-2 sm:px-0 mb-4 sm:mb-6">
            <div>
              <p className="mb-1 text-[10.5px] sm:text-[11px] tracking-[0.2em] font-semibold text-[#8B6B23] uppercase">— {copy.eyebrow}</p>
              <h2 className="text-[26px] sm:text-[34px] lg:text-[40px] font-bold text-[#141414] leading-[1.04] tracking-[-0.01em] font-serif-heading">
                {copy.heading}
              </h2>
            </div>
            <div className="flex items-center gap-4 sm:gap-5 flex-shrink-0">
              <div className="flex items-center gap-1.5">
                {departments.map((dep, i) => (
                  <Segment key={dep.id} t={t} index={i} onClick={() => goTo(i)} label={dep.label} />
                ))}
              </div>
              <Link href="/products" className="hidden sm:inline-flex items-center gap-1.5 py-1 text-[13px] font-semibold text-[#8B6B23] hover:text-[#A47E28] transition-colors group">
                {copy.all_link}
                <ArrowRight size={13} weight="bold" className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* The deck */}
          <div ref={deckRef} className="relative flex-1 min-h-0 max-w-[1400px] w-full mx-auto">
            {departments.map((dep, i) => (
              <DeptCard key={dep.id} dep={dep} index={i} N={N} t={t} cta={copy.card_button} videoRef={el => { videos.current[i] = el }} />
            ))}
          </div>
        </div>
      </div>

      {/* Kinetic band of disciplines — a light breath before About */}
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
