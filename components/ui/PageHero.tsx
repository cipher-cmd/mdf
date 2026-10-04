'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight, CaretRight, SealCheck } from '@phosphor-icons/react'
import { EASE } from '@/lib/animation'
import { scrollToId } from '@/lib/scroll'

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE },
})

interface PageHeroProps {
  crumb: string
  eyebrow: string
  title: string
  intro: string
  video: string
  /** First frame of the video — paints instantly while the loop loads */
  poster: string
  cta: { label: string; target: string }
  badge: string
  /** Label for the docked strip's nav landmark */
  stripLabel: string
  children: ReactNode
}

/** Inner-page hero: video scene, copy, CTA and a docked four-up strip (pass StripItems as children). */
export function PageHero({ crumb, eyebrow, title, intro, video, poster, cta, badge, stripLabel, children }: PageHeroProps) {
  const heroRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)
  // The video can be ready before hydration, when onCanPlay would never reach React
  useEffect(() => { if ((videoRef.current?.readyState ?? 0) >= 3) setVideoReady(true) }, [])
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <div className="relative w-full bg-[#FAF8F5]">
      <section
        ref={heroRef}
        className="relative w-full min-h-[560px] sm:min-h-[600px] lg:h-[clamp(620px,82svh,760px)] flex flex-col justify-center pt-28 pb-24 sm:pb-28 overflow-hidden"
      >
        <motion.div style={{ scale: sceneScale }} className="absolute inset-0 pointer-events-none select-none will-change-transform" aria-hidden>
          <Image src={poster} alt="" fill priority className="object-cover object-[72%_center] md:object-center" sizes="100vw" />
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            onCanPlay={() => setVideoReady(true)}
            className={`absolute inset-0 w-full h-full object-cover object-[72%_center] md:object-center transition-opacity duration-1000 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
          >
            <source src={video} type="video/mp4" />
          </video>
          {/* Cream wash keeps the copy crisp; heavier on phones where text overlaps the scene */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/80 to-[#FAF8F5]/10 md:via-[#FAF8F5]/70 md:to-transparent md:max-w-[70%]" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#FAF8F5]/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#FAF8F5] to-transparent" />
        </motion.div>

        <motion.div style={{ y: copyY, opacity: copyOpacity }} className="relative z-10 max-w-[1380px] w-full mx-auto px-4 sm:px-6 md:px-10">
          <motion.nav {...rise(0)} aria-label="Breadcrumb" className="mb-5 sm:mb-7">
            <ol className="flex items-center gap-1.5 text-[12.5px] font-medium text-[#6B6359]">
              <li><Link href="/" className="hover:text-[#141414] transition-colors">Home</Link></li>
              <li aria-hidden><CaretRight size={10} weight="bold" className="text-[#B8923F]" /></li>
              <li aria-current="page" className="text-[#141414] font-semibold">{crumb}</li>
            </ol>
          </motion.nav>

          <motion.p {...rise(0.08)} className="mb-3 text-[11px] tracking-[0.2em] font-semibold text-[#8B6B23] uppercase">
            — {eyebrow}
          </motion.p>
          <motion.h1 {...rise(0.16)} className="text-[48px] sm:text-[64px] lg:text-[80px] font-bold text-[#141414] leading-[0.95] tracking-[-0.015em] font-serif-heading">
            {title}<span className="text-[#B8923F]">.</span>
          </motion.h1>
          <motion.p {...rise(0.26)} className="mt-5 text-[15px] sm:text-[16.5px] text-[#443E38] leading-[1.65] max-w-[500px]">
            {intro}
          </motion.p>

          <motion.div {...rise(0.36)} className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => scrollToId(cta.target)}
              className="inline-flex items-center gap-2.5 pl-6 pr-2 min-h-[50px] rounded-full bg-[#141414] hover:bg-[#2A241B] text-white text-[14px] font-semibold transition-colors group"
            >
              {cta.label}
              <span className="w-9 h-9 rounded-full bg-[#CCA552] text-[#1E170A] flex items-center justify-center">
                <ArrowDown size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-y-0.5" />
              </span>
            </button>
            <span className="inline-flex items-center gap-1.5 px-2 text-[12.5px] font-medium text-[#554E46]">
              <SealCheck size={16} weight="fill" className="text-[#B8923F]" />
              {badge}
            </span>
          </motion.div>
        </motion.div>
      </section>

      <div className="relative z-20 max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10 -mt-16 sm:-mt-20">
        <motion.nav
          aria-label={stripLabel}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
          className="grid grid-cols-4 gap-px rounded-[18px] sm:rounded-[26px] overflow-hidden border border-[#E5DDD0] bg-[#E5DDD0] shadow-[0_24px_50px_-24px_rgba(60,45,20,0.25)]"
        >
          {children}
        </motion.nav>
      </div>
    </div>
  )
}

interface StripItemProps {
  index: number
  short: string
  label: string
  sub: string
  href: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

/** One cell of the docked strip: number + label, with a sub-line on large screens. */
export function StripItem({ index, short, label, sub, href, onClick }: StripItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group relative flex flex-col sm:flex-row sm:items-center items-center justify-center sm:justify-start gap-0.5 sm:gap-4 py-3.5 px-1.5 sm:p-5 bg-[#FAF8F5]/95 backdrop-blur-md hover:bg-white transition-colors text-center sm:text-left"
    >
      <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] text-[#B8923F] tabular-nums">0{index + 1}</span>
      <span className="min-w-0 sm:flex-1">
        <span className="block text-[13px] sm:text-[15px] font-semibold text-[#141414] leading-tight">
          <span className="lg:hidden">{short}</span>
          <span className="hidden lg:inline">{label}</span>
        </span>
        <span className="hidden lg:block mt-0.5 text-[13px] text-[#8B8378] italic font-serif-heading truncate">{sub}</span>
      </span>
      <ArrowUpRight size={14} weight="bold" className="hidden sm:block flex-shrink-0 text-[#B8923F] transition-transform duration-300 group-hover:rotate-45" />
      <span className="absolute inset-x-0 bottom-0 h-[2px] bg-[#CCA552] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" aria-hidden />
    </Link>
  )
}
