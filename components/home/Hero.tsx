'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Odometer } from '@/components/ui/Odometer'
import { EASE } from '@/lib/animation'
import {
  ArrowRight,
  Play,
  X,
  WhatsappLogo,
} from '@phosphor-icons/react'
import Image from 'next/image'
import Link from 'next/link'
import { useCopy, useWhatsApp } from '@/providers/SiteProvider'
import { lines } from '@/lib/content/copy'

// 1:1 Outline/Rosette Icons matching MDFhome.png trust badges
function EstBadgeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#A47E28] flex-shrink-0 drop-shadow-2xs">
      <path d="M12 2L4 5.5v6c0 5 3.5 9.5 8 10.5 4.5-1 8-5.5 8-10.5v-6L12 2z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 11.5l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="7" r="1.2" fill="currentColor" />
    </svg>
  )
}

function MsmeRosetteIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#A47E28] flex-shrink-0 drop-shadow-2xs">
      <polygon
        points="12 2 14.8 4.8 18.8 4.5 19.2 8.5 22.5 11.2 20.2 14.5 21 18.5 17 19.5 14.8 22.8 12 21.2 9.2 22.8 7 19.5 3 18.5 3.8 14.5 1.5 11.2 4.8 8.5 5.2 4.5 9.2 4.8 12 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  )
}

// 1:1 Stat Icons matching MDFhome.png
function SealMedalIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="9" r="6" />
      <path d="M8.21 13.89L7 22l5-3 5 3-1.21-8.11" />
      <path d="M12 6v4" strokeWidth="1.5" />
      <path d="M10 8h4" strokeWidth="1.5" />
    </svg>
  )
}

function TemplePillarsIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18" />
      <path d="M4 18h16" />
      <path d="M12 3L3 8h18l-9-5z" />
      <path d="M6 10v7" />
      <path d="M10 10v7" />
      <path d="M14 10v7" />
      <path d="M18 10v7" />
    </svg>
  )
}

function InstallationIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
      <path d="M9 10l2 2 4-4" strokeWidth="1.8" />
    </svg>
  )
}

function TrustedBadgeIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.5 13.5L18 21l-6-2.5L6 21l2.5-7.5" />
      <circle cx="12" cy="8" r="2.5" fill="currentColor" fillOpacity="0.2" />
    </svg>
  )
}

const statIcons = [SealMedalIcon, TemplePillarsIcon, InstallationIcon, TrustedBadgeIcon]

export function Hero() {
  const copy = useCopy('home_hero')
  const stats = useCopy('home_stats').items.map((s, i) => ({ ...s, icon: statIcons[i % statIcons.length] }))
  const whatsapp = useWhatsApp()
  const [videoModalOpen, setVideoModalOpen] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  // Gentle scroll parallax: scene drifts and deepens, copy lifts away
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 70])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.15])

  // The last " · part" of the eyebrow is hidden on phones, where the line would wrap
  const eyebrowCut = copy.eyebrow.lastIndexOf(' · ')
  const headlineLines = lines(copy.heading)

  useEffect(() => {
    if (!videoModalOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setVideoModalOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [videoModalOpen])

  return (
    <div className="relative w-full bg-[#FAF8F5]">
      {/* ── Top Canvas Hero Section ── */}
      <section ref={heroRef} className="relative w-full min-h-[560px] lg:h-[570px] xl:h-[600px] flex flex-col justify-between pt-24 sm:pt-22 pb-14 sm:pb-12 overflow-hidden">
        
        {/* Background Canvas: Hero Background Video / Fallback Image */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div style={{ scale: sceneScale }} className="relative w-full h-full bg-[#FAF8F5] will-change-transform">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover object-[85%_center] opacity-95 z-0"
              poster="/images/hero_kashmir_scene.jpg"
              onTimeUpdate={(e) => {
                const vid = e.currentTarget
                // Loop smoothly on panoramic Dal Lake establishing shot (0s - 3.8s)
                if (vid.currentTime >= 3.8) {
                  vid.currentTime = 0.1
                }
              }}
            >
              <source src="/BG/heroBg.mp4" type="video/mp4" />
              <source src="/hero.webm" type="video/webm" />
            </video>
            {/* Fallback image */}
            <Image
              src="/images/hero_kashmir_scene.jpg"
              alt="MDF Enterprises Srinagar Kashmir"
              fill
              priority
              className="object-cover object-[85%_center] opacity-95 -z-10"
            />
          </motion.div>

          {/* Mobile: the gazebo sits behind the copy, so wash it out for legibility */}
          <div className="md:hidden absolute inset-0 z-[1] bg-gradient-to-b from-[#FAF8F5]/90 via-[#FAF8F5]/75 to-[#FAF8F5]/35" />

          {/* Soft bottom blend where stats strip docks */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/40 to-transparent pointer-events-none z-[1]" />
        </div>

        {/* Hero Content Container */}
        <motion.div style={{ y: copyY, opacity: copyOpacity }} className="relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-12 flex flex-col justify-center flex-1">
          <div className="max-w-[580px] relative">

            {/* Subtle local haze ONLY behind the headline & text (NO haze on top nav or wooden gazebo) */}
            <div
              className="absolute -inset-10 sm:-inset-14 -left-10 pointer-events-none -z-10"
              style={{
                background: 'radial-gradient(ellipse 80% 70% at 28% 42%, rgba(255, 255, 255, 0.78) 0%, rgba(255, 255, 255, 0.48) 50%, rgba(255, 255, 255, 0.1) 75%, transparent 100%)',
                filter: 'blur(28px)',
              }}
            />

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="mb-2 sm:mb-2.5 flex items-center gap-2"
            >
              <span className="w-5 h-[1.5px] bg-[#8B6B23] inline-block" />
              <span className="text-[11px] md:text-[11.5px] tracking-[0.22em] font-semibold text-[#8B6B23] uppercase">
                {eyebrowCut > 0 ? <>{copy.eyebrow.slice(0, eyebrowCut)}<span className="hidden sm:inline">{copy.eyebrow.slice(eyebrowCut)}</span></> : copy.eyebrow}
              </span>
            </motion.div>

            {/* Display Heading */}
            {/* Each line rises out of its own mask — reads as one confident motion on phones */}
            <h1 className="text-[38px] sm:text-[48px] lg:text-[54px] xl:text-[58px] font-bold tracking-tight text-[#141414] leading-[0.96] mb-3.5 font-serif-heading">
              {headlineLines.map((line: string, k: number) => (
                <span key={k} className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
                  <motion.span
                    className="block"
                    initial={{ y: '105%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 1.1, delay: 0.15 + k * 0.12, ease: EASE }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Subhead Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
              className="text-[#3F3A34] text-[16px] sm:text-[15px] leading-[1.58] mb-5 max-w-[500px]"
            >
              {copy.subtitle}
            </motion.p>

            {/* CTA Button Row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
              className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6"
            >
              <Link
                href="/products"
                className="col-span-2 justify-center flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-2.5 bg-[#CCA552] hover:bg-[#BF9744] text-[#1E170A] font-semibold text-[13px] rounded-full shadow-xs hover:shadow transition-all group"
              >
                <span>{copy.button_primary}</span>
                <ArrowRight size={14} weight="bold" className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/#contact"
                className="justify-center flex items-center gap-2 px-4.5 sm:px-5 py-3 sm:py-2.5 bg-white hover:bg-[#FAF8F5] text-[#141414] border border-[#DDD5C7] font-semibold text-[13px] rounded-full shadow-xs hover:shadow transition-all"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-[#141414]">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <span>{copy.button_secondary}</span>
              </Link>
              <a
                href={whatsapp()}
                target="_blank"
                rel="noreferrer"
                className="justify-center flex items-center gap-2 px-4.5 sm:px-5 py-3 sm:py-2.5 bg-white hover:bg-[#FAF8F5] text-[#141414] border border-[#DDD5C7] font-semibold text-[13px] rounded-full shadow-xs hover:shadow transition-all"
              >
                <WhatsappLogo size={16} weight="fill" className="text-[#25D366]" />
                <span>{copy.button_whatsapp}</span>
              </a>
            </motion.div>

            {/* Trust Badges: Non-solid, transparent, delicate and airy matching MDFhome.png */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-3 sm:gap-5 pt-3 whitespace-nowrap"
            >
              {/* Est Badge: Outlined Gold Crest (not solid) */}
              <div className="flex items-center gap-2 group transition-transform duration-200 hover:scale-[1.02]">
                <EstBadgeIcon />
                <div>
                  <p className="text-[10.5px] font-bold text-[#141414] uppercase tracking-[0.08em] leading-tight">EST. 1997</p>
                  <p className="text-[9.5px] text-[#554F47] font-medium uppercase tracking-[0.05em] leading-tight mt-0.5">SRINAGAR</p>
                </div>
              </div>

              {/* Vertical divider */}
              <div className="h-5 w-[1px] bg-[#CFC4B2]" />

              {/* GeM Badge: Transparent, floating GeM Star (not solid) */}
              <div className="flex items-center gap-2 group transition-transform duration-200 hover:scale-[1.02]">
                <div className="w-6 h-6 flex items-center justify-center">
                  <Image
                    src="/images/gemLogo.png"
                    alt="GeM Registered"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#141414] tracking-[0.04em] leading-tight">GeM</p>
                  <p className="text-[9.5px] text-[#554F47] font-medium uppercase tracking-[0.05em] leading-tight mt-0.5">REGISTERED</p>
                </div>
              </div>

              {/* Vertical divider */}
              <div className="h-5 w-[1px] bg-[#CFC4B2]" />

              {/* MSME Badge: Outlined rosette star emblem (not solid) */}
              <div className="flex items-center gap-2 group transition-transform duration-200 hover:scale-[1.02]">
                <MsmeRosetteIcon />
                <div>
                  <p className="text-[11px] font-bold text-[#141414] uppercase tracking-[0.08em] leading-tight">MSME</p>
                  <p className="text-[9.5px] text-[#554F47] font-medium uppercase tracking-[0.05em] leading-tight mt-0.5">CERTIFIED</p>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>

        {/* Floating "WATCH THE STORY" Video Button over Kashmir Lake gap */}
        <button
          type="button"
          onClick={() => setVideoModalOpen(true)}
          className="absolute left-[53%] lg:left-[55%] top-[41%] -translate-y-1/2 z-20 pointer-events-auto hidden md:flex items-center gap-3 group cursor-pointer text-left focus:outline-none"
          aria-label="Watch the story video"
        >
          <div className="relative">
            <span className="absolute -inset-1 rounded-full bg-white/40 animate-ping" />
            <div className="relative w-11 h-11 rounded-full bg-white/95 backdrop-blur-md shadow-[0_8px_25px_rgba(0,0,0,0.18)] flex items-center justify-center text-[#161616] group-hover:scale-105 transition-transform">
              <Play size={16} weight="fill" className="ml-0.5 text-[#221C11]" />
            </div>
          </div>
          <div className="text-left select-none">
            <p className="text-[11px] font-bold text-white tracking-[0.16em] uppercase leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
              {copy.video_label}
            </p>
            <p className="text-[9px] font-medium text-white/90 tracking-[0.12em] uppercase mt-0.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
              {copy.video_length}
            </p>
          </div>
        </button>

        {/* Cursive Signature in bottom right */}
        <div className="absolute right-8 md:right-14 bottom-8 sm:bottom-12 z-10 pointer-events-none hidden sm:block text-right">
          <p
            className="text-[26px] md:text-[32px] text-white/90 tracking-wide select-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]"
            style={{ fontFamily: 'var(--font-cormorant), cursive', fontStyle: 'italic', fontWeight: 600 }}
          >
            {copy.place_line1}<br />
            <span className="text-[20px] md:text-[26px] font-normal opacity-95">{copy.place_line2}</span>
          </p>
        </div>

      </section>

      {/* ── Floating Overlapping Frosted Stats Strip using heroStripBg.png ── */}
      <div className="relative z-20 max-w-[1360px] mx-auto px-4 md:px-6 -mt-8 sm:-mt-10 mb-6 sm:mb-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
          className="relative rounded-[22px] md:rounded-[26px] border border-[#E5DDD0] shadow-[0_24px_50px_-24px_rgba(60,45,20,0.25)] px-4 py-5 sm:px-6 md:px-8 md:py-5 overflow-hidden bg-[#FAF8F5]/92 backdrop-blur-md"
        >
          {/* Background image: heroStripBg.png showing painted mountain peaks on the right & watercolor mist on the left */}
          <Image
            src="/BG/heroStripBg.png"
            alt="MDF Mountain Panorama"
            fill
            className="object-cover object-right pointer-events-none opacity-60 select-none"
            sizes="(max-width: 1360px) 100vw, 1360px"
          />

          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-4 md:gap-4 lg:divide-x divide-[#E5DDD0]">
            {stats.map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} className={`flex items-center gap-2.5 sm:gap-4 ${idx > 0 ? 'lg:pl-6' : ''}`}>
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-[#C5A059] bg-[#FAF5EB]/90 backdrop-blur-xs flex items-center justify-center text-[#966F23] flex-shrink-0 shadow-2xs">
                    <Icon />
                  </div>
                  <div>
                    <h3 className="text-[28px] sm:text-[34px] lg:text-[38px] font-light text-[#141414] leading-none tracking-[-0.035em]">
                      <Odometer value={item.value} suffix="+" />
                    </h3>
                    <p className="mt-1 min-h-[2.75em] lg:min-h-0 text-[9.5px] sm:text-[10.5px] text-[#6B6359] font-semibold uppercase tracking-[0.12em] sm:tracking-[0.14em] leading-snug">
                      {item.label}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      {videoModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setVideoModalOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors"
              aria-label="Close story video modal"
            >
              <X size={20} weight="bold" />
            </button>
            <div className="aspect-video w-full bg-black flex items-center justify-center">
              <video autoPlay controls playsInline className="w-full h-full object-contain">
                <source src="/BG/heroBg.mp4" type="video/mp4" />
                <source src="/hero.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

