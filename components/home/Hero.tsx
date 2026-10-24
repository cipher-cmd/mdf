'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Odometer } from '@/components/ui/Odometer'
import {
  ArrowRight,
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

export function Hero() {
  const copy = useCopy('home_hero')
  const stats = useCopy('home_stats').items
  const whatsapp = useWhatsApp()
  const heroRef = useRef<HTMLElement>(null)
  // Gentle scroll parallax on the scene only; the copy stays put and readable
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08])
  const headlineLines = lines(copy.heading)

  return (
    <div className="relative w-full bg-[#F7F7F7]">
      {/* ── Top Canvas Hero Section ── */}
      <section ref={heroRef} className="relative w-full min-h-[560px] lg:h-[570px] xl:h-[600px] flex flex-col justify-between pt-24 sm:pt-22 pb-14 sm:pb-12 overflow-hidden">
        
        {/* Background Canvas: Hero Background Video / Fallback Image */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div style={{ scale: sceneScale }} className="relative w-full h-full bg-[#F7F7F7] will-change-transform">
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
              {/* First playable source wins: wide screens get the sharp 720p mp4 (5 MB), everything else the 960px webm (0.8 MB) */}
              <source src="/BG/heroBg.mp4" type="video/mp4" media="(min-width: 1280px)" />
              <source src="/hero.webm" type="video/webm" />
              <source src="/BG/heroBg.mp4" type="video/mp4" />
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
          <div className="md:hidden absolute inset-0 z-[1] bg-gradient-to-b from-[#F7F7F7]/90 via-[#F7F7F7]/75 to-[#F7F7F7]/35" />

          {/* Soft bottom blend where stats strip docks */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F7F7F7] via-[#F7F7F7]/40 to-transparent pointer-events-none z-[1]" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-12 flex flex-col justify-center flex-1">
          <div className="max-w-[580px] relative">

            {/* Subtle local haze ONLY behind the headline & text (NO haze on top nav or wooden gazebo) */}
            <div
              className="absolute -inset-10 sm:-inset-14 -left-10 pointer-events-none -z-10"
              style={{
                background: 'radial-gradient(ellipse 80% 70% at 28% 42%, rgba(255, 255, 255, 0.78) 0%, rgba(255, 255, 255, 0.48) 50%, rgba(255, 255, 255, 0.1) 75%, transparent 100%)',
                filter: 'blur(28px)',
              }}
            />

            <h1 className="text-[38px] sm:text-[48px] lg:text-[54px] xl:text-[58px] font-bold tracking-tight text-[#141414] leading-[0.96] mb-3.5 font-serif-heading">
              {headlineLines.map((line: string, k: number) => (
                <span key={k} className="block">{line}</span>
              ))}
            </h1>

            <p className="text-[#3F3A34] text-[16px] leading-[1.58] mb-5 max-w-[500px]">
              {copy.subtitle}
            </p>

            {/* One coloured action; quote and WhatsApp stay quieter */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3 mb-5 sm:mb-6">
              <Link
                href="/products"
                className="w-full sm:w-auto justify-center flex items-center gap-2 px-6 py-3 bg-[#CCA552] hover:bg-[#BF9744] text-[#1E170A] font-semibold text-[14px] rounded-full group"
              >
                <span>{copy.button_primary}</span>
                <ArrowRight size={14} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/#contact"
                className="flex-1 sm:flex-none justify-center flex items-center px-5 py-3 bg-white hover:bg-[#F4F4F4] text-[#141414] border border-[#D9D9D9] font-semibold text-[14px] rounded-full"
              >
                {copy.button_secondary}
              </Link>
              <a
                href={whatsapp()}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 py-3 px-1 text-[#141414] font-semibold text-[14px] underline-offset-4 hover:underline"
              >
                <WhatsappLogo size={16} weight="fill" className="text-[#25D366]" />
                <span>{copy.button_whatsapp}</span>
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-3 sm:gap-5 pt-3 whitespace-nowrap">
              <div className="flex items-center gap-2">
                <EstBadgeIcon />
                <div>
                  <p className="text-[13px] font-semibold text-[#141414] leading-tight">Est. 1997</p>
                  <p className="text-[12px] text-[#554F47] leading-tight mt-0.5">Srinagar</p>
                </div>
              </div>

              <div className="h-6 w-px bg-[#CCCCCC]" />

              <div className="flex items-center gap-2">
                <Image src="/images/gemLogo.png" alt="" width={24} height={24} className="object-contain" />
                <div>
                  <p className="text-[13px] font-semibold text-[#141414] leading-tight">GeM</p>
                  <p className="text-[12px] text-[#554F47] leading-tight mt-0.5">Registered</p>
                </div>
              </div>

              <div className="h-6 w-px bg-[#CCCCCC]" />

              <div className="flex items-center gap-2">
                <MsmeRosetteIcon />
                <div>
                  <p className="text-[13px] font-semibold text-[#141414] leading-tight">MSME</p>
                  <p className="text-[12px] text-[#554F47] leading-tight mt-0.5">Certified</p>
                </div>
              </div>
            </div>

          </div>
        </div>

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

      {/* ── Stats strip over heroStripBg.png ── */}
      <div className="relative z-20 max-w-[1360px] mx-auto px-4 md:px-6 -mt-8 sm:-mt-10 mb-6 sm:mb-8">
        <div className="relative rounded-[22px] md:rounded-[26px] border border-[#E5E5E5] shadow-[0_12px_32px_-20px_rgba(0,0,0,0.18)] px-5 py-5 sm:px-6 md:px-8 overflow-hidden bg-[#F7F7F7]">
          <Image
            src="/BG/heroStripBg.png"
            alt=""
            fill
            className="object-cover object-right pointer-events-none opacity-60 select-none"
            sizes="(max-width: 1360px) 100vw, 1360px"
          />

          <dl className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-5 lg:divide-x divide-[#E5E5E5]">
            {stats.map((item, idx) => (
              <div key={idx} className={`flex flex-col-reverse ${idx > 0 ? 'lg:pl-6' : ''}`}>
                <dt className="mt-1.5 text-[12px] sm:text-[13px] text-[#5E5850] font-medium leading-snug">{item.label}</dt>
                <dd className="text-[30px] sm:text-[34px] lg:text-[38px] font-normal text-[#141414] leading-none tracking-[-0.03em]">
                  <Odometer value={item.value} suffix="+" />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

    </div>
  )
}

