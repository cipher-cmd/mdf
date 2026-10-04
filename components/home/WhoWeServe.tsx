'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { EASE } from '@/lib/animation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Storefront, GraduationCap, Bank, Wrench } from '@phosphor-icons/react'
import { useCopy, useWhatsApp } from '@/providers/SiteProvider'
import { lines } from '@/lib/content/copy'

const cardIcons = [Storefront, GraduationCap, Bank, Wrench]
const LINKS: Record<string, string> = { products: '/products', contact: '/#contact', blog: '/blog' }

export function WhoWeServe() {
  const copy = useCopy('home_who')
  const whatsapp = useWhatsApp()
  const personas = copy.cards.map((c, i) => ({
    ...c,
    icon: cardIcons[i % cardIcons.length],
    tags: c.tags.split(',').map(t => t.trim()).filter(Boolean),
    cta: c.button,
    isExternal: c.link === 'whatsapp',
    href: c.link === 'whatsapp' ? whatsapp(`Hi MDF Enterprises, I am enquiring about: ${c.title}.`) : LINKS[c.link] ?? '/#contact',
  }))
  const trackRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  const [slide, setSlide] = useState(0)

  // How far the card rail must travel sideways = how long the section stays pinned
  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    const measure = () => setDistance(Math.max(0, rail.scrollWidth - rail.clientWidth))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(rail)
    return () => ro.disconnect()
  }, [])

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, v => -v * distance)
  const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  useMotionValueEvent(scrollYProgress, 'change', v => {
    const next = Math.min(personas.length - 1, Math.round(v * (personas.length - 1)))
    setSlide(prev => (prev === next ? prev : next))
  })

  return (
    <section id="who-we-serve" className="relative bg-[#FAF8F5]">
      <div ref={trackRef} data-hide-fab className="relative" style={{ height: `calc(100svh + ${distance}px)` }}>
        <div className="sticky top-0 h-[100svh] overflow-hidden flex flex-col justify-center pt-[64px] sm:pt-[76px] pb-4">

          {/* Background sketch */}
          <div className="absolute inset-0 z-0 pointer-events-none bg-feather">
            <Image src="/BG/whoWeServeBg.png" alt="" fill className="object-cover object-left md:object-left-bottom opacity-35 select-none" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FAF8F5]/35 to-[#FAF8F5]/80" />
          </div>

          {/* Heading */}
          <div className="relative z-10 max-w-[1380px] w-full mx-auto px-5 sm:px-6 md:px-10 mb-5 sm:mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-2 lg:gap-10">
            <div>
              <p className="mb-1.5 text-[11px] tracking-[0.2em] font-semibold text-[#8B6B23] uppercase">— {copy.eyebrow}</p>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-bold text-[#141414] leading-[1.04] tracking-[-0.01em] font-serif-heading">
                {lines(copy.heading).map((l, i) => <span key={i}>{i > 0 && <><br className="hidden sm:block" />{' '}</>}{l}</span>)}
              </h2>
            </div>
            <p className="text-[#4E4841] text-[14.5px] sm:text-[14px] leading-[1.55] max-w-[440px] lg:text-right">
              {copy.text}
            </p>
          </div>

          {/* Card rail: vertical scroll drives it sideways */}
          <div ref={railRef} className="relative z-10 overflow-hidden">
            <motion.div style={{ x }} className="flex gap-3.5 sm:gap-5 w-max px-5 sm:px-6 md:px-10 xl:px-[max(2.5rem,calc((100vw-1380px)/2+2.5rem))] will-change-transform">
              {personas.map((item, i) => {
                const Icon = item.icon
                const body = (
                  <>
                    <span className="absolute top-0 left-6 right-6 h-[2px] rounded-full bg-[#CCA552] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" aria-hidden />

                    <div className="relative aspect-[16/10] w-full rounded-[16px] md:rounded-[18px] bg-[#F5F2EB] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                        sizes="(max-width: 640px) 80vw, 440px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-white/85 backdrop-blur-sm text-[10px] font-bold tracking-[0.16em] text-[#8B6B23]">
                        0{i + 1} / 0{personas.length}
                      </span>
                    </div>

                    <div className="relative -mt-7 ml-4 mb-2 w-14 h-14 rounded-full bg-white border border-[#E8DCC4] shadow-[0_6px_16px_-6px_rgba(60,45,20,0.3)] flex items-center justify-center text-[#9E7422] group-hover:bg-[#CCA552] group-hover:text-white group-hover:border-[#CCA552] transition-colors duration-300">
                      <Icon size={24} weight="duotone" />
                    </div>

                    <div className="flex flex-col flex-1 px-2">
                      <h3 className="text-[20px] sm:text-[22px] font-bold text-[#141414] leading-tight mb-1 font-serif-heading">{item.title}</h3>
                      <p className="text-[14px] text-[#6B6359] leading-snug mb-3">{item.desc}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {item.tags.map(t => (
                          <span key={t} className="px-2.5 py-1 rounded-full bg-[#F7F1E4] border border-[#EDE2CB] text-[11.5px] font-medium text-[#6B5420]">{t}</span>
                        ))}
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-3 border-t border-[#F0E9DC]">
                        <span className="text-[13.5px] font-semibold text-[#141414] group-hover:text-[#8B6B23] transition-colors">{item.cta}</span>
                        <span className="w-10 h-10 rounded-full border border-[#D9C49A] flex items-center justify-center text-[#8B6B23] group-hover:bg-[#CCA552] group-hover:border-[#CCA552] group-hover:text-[#1E170A] transition-all duration-300">
                          <ArrowRight size={14} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </>
                )
                const cardClass = 'group relative h-full bg-white rounded-[22px] md:rounded-[26px] border border-[#EAE3D6] p-2.5 pb-4 shadow-[0_2px_12px_rgba(60,45,20,0.04)] hover:shadow-[0_22px_44px_-20px_rgba(60,45,20,0.28)] hover:border-[#E0D2B4] transition-all duration-500 flex flex-col'
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
                    className="flex-shrink-0 w-[80vw] sm:w-[380px] lg:w-[440px]"
                  >
                    {item.isExternal ? (
                      <a href={item.href} target="_blank" rel="noreferrer" className={cardClass}>{body}</a>
                    ) : (
                      <Link href={item.href} className={cardClass}>{body}</Link>
                    )}
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

          {/* Journey progress */}
          {distance > 0 && (
            <div className="relative z-10 max-w-[1380px] w-full mx-auto px-5 sm:px-6 md:px-10 mt-5 sm:mt-7 flex items-center gap-4">
              <span className="text-[11px] font-semibold tracking-[0.22em] text-[#8B6B23] tabular-nums">0{slide + 1}</span>
              <span className="relative flex-1 max-w-[320px] h-[2px] rounded-full bg-[#E5DCCB] overflow-hidden">
                <motion.span style={{ width: bar }} className="absolute inset-y-0 left-0 bg-[#CCA552] rounded-full" />
              </span>
              <span className="text-[11px] font-semibold tracking-[0.22em] text-[#B5A684] tabular-nums">0{personas.length}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
