'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, AnimatePresence, useReducedMotion } from 'framer-motion'
import { EASE } from '@/lib/animation'
import { ArrowRight } from 'lucide-react'

const panels = [
  {
    num: '01',
    label: 'For Retail',
    headline: 'Walk In.\nWalk Out Equipped.',
    body: 'Visit our Srinagar showroom or browse our full catalogue. Wide product range, competitive pricing, and immediate availability on most items.',
    cta: 'Enquire on WhatsApp',
    href: 'https://wa.me/917006252334?text=Hi%20MDF%20Enterprises%2C%20I%20would%20like%20to%20visit%20your%20showroom%20and%20enquire%20about%20your%20products.',
    external: true,
  },
  {
    num: '02',
    label: 'For Institutions',
    headline: 'Built for Schools,\nColleges & Academies.',
    body: 'Bulk supply with institutional pricing, complete tender documentation support, and a dedicated account manager for educational and sports bodies.',
    cta: 'Get a Quote',
    href: '/#contact',
    external: false,
  },
  {
    num: '03',
    label: 'For Government',
    headline: 'GeM Ready.\nMSME Certified.',
    body: 'Registered on the Government e-Marketplace. We support L1 procurement, DGS&D, and J&K state government tenders with complete documentation.',
    cta: 'Enquire on WhatsApp',
    href: 'https://wa.me/917006252334?text=Hi%20MDF%20Enterprises%2C%20I%20am%20interested%20in%20GeM%20procurement.%20Please%20share%20details.',
    external: true,
  },
  {
    num: '04',
    label: 'Installation & Service',
    headline: "We Don't\nJust Sell.",
    body: 'Our in-house installation team handles complete setup — gymnasium fit-outs, music labs, sports courts and multi-activity zones. AMC and after-sales support included.',
    cta: 'Book Installation',
    href: '/#contact',
    external: false,
  },
]

export function WhoWeServe() {
  const shouldReduce = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => {
      setActiveIndex(Math.min(panels.length - 1, Math.floor(v * panels.length)))
    })
    return unsub
  }, [scrollYProgress])

  const active = panels[activeIndex]

  return (
    <section
      id="who-we-serve"
      ref={containerRef}
      className="relative bg-[#050505]"
    >
      {/* Mobile — stacked */}
      <div className="lg:hidden py-20 px-6 md:px-12 max-w-[1440px] mx-auto space-y-16">
        <div>
          <p className="overline-gold mb-6">Who We Serve</p>
          <h2
            className="text-[40px] font-medium text-white leading-[1.05] mb-4"
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            One Partner. Every Buyer<span className="text-[#C89B5E]">.</span>
          </h2>
        </div>
        {panels.map(p => (
          <motion.div
            key={p.num}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border-l-2 border-[#C89B5E]/40 pl-6"
          >
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#C89B5E] uppercase">{p.label}</span>
            <h3
              className="text-[30px] font-medium text-white mt-3 mb-3 leading-tight whitespace-pre-line"
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              {p.headline}
            </h3>
            <p className="text-white/60 text-[15px] leading-relaxed mb-6">{p.body}</p>
            <a
              href={p.href}
              target={p.external ? '_blank' : undefined}
              rel={p.external ? 'noreferrer' : undefined}
              className="btn-gold text-[11px] py-2.5 px-5 inline-flex w-full justify-center sm:w-auto sm:justify-start"
            >
              {p.cta} <ArrowRight size={13} className="ml-1" />
            </a>
          </motion.div>
        ))}
      </div>

      {/* Desktop — scroll-pinned */}
      <div className="hidden lg:flex" style={{ minHeight: '400vh' }}>
        {/* Sticky left */}
        <div className="sticky top-0 self-start w-1/2 h-screen flex flex-col justify-center px-[8%] overflow-hidden">
          <p className="overline-gold mb-8">Who We Serve</p>

          {/* Large decorative number */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.num}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="mb-2"
            >
              <span
                className="block text-[120px] font-bold leading-none select-none"
                style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  color: 'transparent',
                  WebkitTextStroke: '1px rgba(200,155,94,0.25)',
                }}
                aria-hidden
              >
                {active.num}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Label */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`${active.num}-label`}
              className="text-[11px] font-bold tracking-[0.3em] text-[#C89B5E] uppercase mb-4"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.35 }}
            >
              {active.label}
            </motion.p>
          </AnimatePresence>

          {/* Headline */}
          <AnimatePresence mode="wait">
            <motion.h2
              key={`${active.num}-headline`}
              className="text-[48px] xl:text-[58px] font-medium text-white leading-[1.05] mb-5 whitespace-pre-line"
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              {active.headline}
            </motion.h2>
          </AnimatePresence>

          {/* Pip indicators */}
          <div className="flex items-center gap-2 mt-6">
            {panels.map((_, i) => (
              <div
                key={i}
                className="h-[2px] rounded-full transition-all duration-400"
                style={{
                  width: i === activeIndex ? '32px' : '12px',
                  background: i === activeIndex ? '#C89B5E' : 'rgba(255,255,255,0.15)',
                }}
              />
            ))}
          </div>

          <div className="absolute right-0 top-[20%] bottom-[20%] w-[1px] bg-gradient-to-b from-transparent via-[#C89B5E]/20 to-transparent" aria-hidden />
        </div>

        {/* Scrolling right panels */}
        <div className="w-1/2">
          {panels.map(p => (
            <div key={p.num} className="h-screen flex flex-col justify-center px-16 xl:px-24">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-200px' }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <span className="text-[11px] font-bold tracking-[0.25em] text-[#C89B5E] uppercase mb-5 block">
                  {p.label}
                </span>
                <h3
                  className="text-[46px] xl:text-[54px] font-medium text-white leading-[1.05] mb-6 whitespace-pre-line"
                  style={{ fontFamily: 'var(--font-cormorant), serif' }}
                >
                  {p.headline}
                </h3>
                <p className="text-white/60 text-[16px] leading-relaxed max-w-[420px] mb-8">{p.body}</p>
                <a
                  href={p.href}
                  target={p.external ? '_blank' : undefined}
                  rel={p.external ? 'noreferrer' : undefined}
                  className="btn-gold inline-flex text-[11px] py-3 px-6"
                >
                  {p.cta} <ArrowRight size={13} className="ml-2" />
                </a>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
