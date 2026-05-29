'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CountUp } from '@/components/ui/CountUp'

const stats = [
  { target: 28,   suffix: '+', label: 'Years of Excellence' },
  { target: 1000, suffix: '+', label: 'Institutions Served' },
  { target: 500,  suffix: '+', label: 'Installations Done' },
  { target: 25,   suffix: '+', label: 'Trusted Brands' },
]

const pillars = [
  { num: '01', title: 'Retail & Bulk Orders',   desc: 'Serving individual buyers and large-scale institutional procurement with equal dedication.' },
  { num: '02', title: 'GeM & Tender Ready',     desc: 'Full support for Government e-Marketplace, L1 procurement, and J&K state tenders.' },
  { num: '03', title: 'Top Brand Dealerships',  desc: 'Authorised dealer for SG, YONEX, NIVIA, COSCO, STAG and 20+ premium brands.' },
  { num: '04', title: 'Expert Installation',    desc: 'In-house team for gymnasium fit-outs, music labs, sports courts and multi-activity zones.' },
  { num: '05', title: 'J&K-Wide Coverage',      desc: 'Delivering to institutions, schools, and government departments across every district of J&K.' },
  { num: '06', title: 'After-Sales Support',    desc: 'AMC and service contracts that keep your equipment running long after delivery.' },
]

export function About() {
  const shouldReduce = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const handle = requestAnimationFrame(() => setIsMobile(window.innerWidth < 1024))
    return () => cancelAnimationFrame(handle)
  }, [])
  const imgRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] })
  const yImg = useTransform(scrollYProgress, [0, 1], (shouldReduce || isMobile) ? [0, 0] : [-20, 20])

  return (
    <section id="about" className="bg-[#080808] py-24 md:py-32">
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12">

        {/* ── Section header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20">
          <div>
            <motion.p
              className="overline-gold mb-5"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              About MDF Enterprises
            </motion.p>
            <motion.h2
              className="text-[40px] md:text-[56px] lg:text-[64px] font-medium text-white leading-[1.0] tracking-tight"
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08, duration: 0.6 }}
            >
              One Supplier.<br />
              <span className="text-white/40">Every</span> Need
              <span className="text-[#C89B5E]">.</span>
            </motion.h2>
          </div>
          <motion.p
            className="text-white/45 text-[15px] leading-[1.78] max-w-[380px]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Founded in 1997 in Srinagar, MDF Enterprises has spent 28+ years becoming J&K&apos;s most trusted equipment partner — from a single cricket bat to a 500-unit gymnasium order through GeM.
          </motion.p>
        </div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-start mb-16">

          {/* Left: pillars */}
          <div>
            <motion.p
              className="text-white/50 text-[15px] leading-[1.78] mb-10 max-w-[540px]"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.55 }}
            >
              Sports goods, fitness equipment, musical instruments, custom awards — all under one roof. Genuine products, authorised dealerships, and an in-house installation team that stays with you from procurement to commissioning.
            </motion.p>

            {/* Pillars — clean list style, no icon boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-0 gap-x-10 mb-10">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.title}
                  className="flex items-start gap-5 py-5 border-b border-white/[0.05]"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i, duration: 0.5 }}
                >
                  <span
                    className="text-[11px] font-bold text-[#C89B5E]/45 flex-shrink-0 pt-[3px] tabular-nums"
                    style={{ fontFamily: 'var(--font-cormorant), serif', letterSpacing: '0.06em' }}
                  >
                    {p.num}
                  </span>
                  <div>
                    <p className="text-[14px] font-semibold text-white mb-1 leading-tight">{p.title}</p>
                    <p className="text-[12.5px] text-white/40 leading-[1.6]">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Link href="/products" className="btn-gold inline-flex gap-2">
                Browse Our Products <ArrowRight size={15} />
              </Link>
            </motion.div>
          </div>

          {/* Right: image */}
          <div ref={imgRef} className="relative overflow-hidden rounded-2xl lg:sticky lg:top-28">
            <motion.div style={{ y: yImg }}>
              <div className="relative w-full aspect-[4/3] md:aspect-[4/3] lg:aspect-[3/4]">
                <Image
                  src="/images/SportsGoodsNew.webp"
                  alt="MDF Enterprises — sports goods and equipment display"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 420px"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              </div>
            </motion.div>

            {/* Corner accents */}
            <div className="absolute top-4 right-4 w-10 h-10 border-t-[1.5px] border-r-[1.5px] border-[#C89B5E]/30 pointer-events-none" aria-hidden />
            <div className="absolute bottom-4 left-4 w-10 h-10 border-b-[1.5px] border-l-[1.5px] border-[#C89B5E]/30 pointer-events-none" aria-hidden />

            {/* Floating established badge */}
            <div className="absolute bottom-5 right-5 bg-black/80 backdrop-blur-md border border-[#C89B5E]/20 rounded-xl px-5 py-3.5">
              <p className="text-[10px] text-white/35 uppercase tracking-[0.18em] mb-0.5">Established</p>
              <p
                className="text-[22px] font-bold text-[#C89B5E]"
                style={{ fontFamily: 'var(--font-cormorant), serif' }}
              >
                1997
              </p>
            </div>

            {/* Category label bottom-left */}
            <div className="absolute bottom-5 left-5 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
              <p className="text-[10px] text-white/50 uppercase tracking-[0.18em]">Srinagar, J&K</p>
            </div>
          </div>
        </div>

        {/* ── Founder spotlight ── */}
        <motion.div
          className="mt-12 mb-12 relative overflow-hidden rounded-2xl border border-[#C89B5E]/15 bg-gradient-to-r from-[#C89B5E]/[0.04] via-[#C89B5E]/[0.07] to-[#C89B5E]/[0.04] px-8 py-8 md:px-12 md:py-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative corner marks */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-[#C89B5E]/25 pointer-events-none" aria-hidden />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-[#C89B5E]/25 pointer-events-none" aria-hidden />

          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
            {/* Gold monogram */}
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#C89B5E]/10 border border-[#C89B5E]/25 flex items-center justify-center">
              <span
                className="text-[28px] font-bold text-[#C89B5E]"
                style={{ fontFamily: 'var(--font-cormorant), serif' }}
                aria-hidden
              >
                SM
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#C89B5E] mb-2">
                Founded By
              </p>
              <h3
                className="text-[26px] md:text-[32px] font-medium text-white leading-tight mb-1"
                style={{ fontFamily: 'var(--font-cormorant), serif' }}
              >
                Mr. Syed Mumtaz
              </h3>
              <p className="text-[13px] text-white/40 leading-relaxed max-w-[560px]">
                A lifelong passion for sport and education led Mr. Syed Mumtaz to establish MDF Enterprises in 1997 — from a small Srinagar storefront to J&amp;K&apos;s most trusted institutional equipment partner, serving 1000+ institutions across the valley and beyond.
              </p>
            </div>

            <div className="flex-shrink-0 text-right hidden md:block">
              <p
                className="text-[48px] font-bold text-[#C89B5E]/15 leading-none"
                style={{ fontFamily: 'var(--font-cormorant), serif' }}
                aria-hidden
              >
                1997
              </p>
              <p className="text-[10px] text-white/20 tracking-[0.2em] uppercase -mt-1">Est.</p>
            </div>
          </div>
        </motion.div>

        {/* ── Stats bar ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/[0.05] border border-white/[0.05] rounded-2xl overflow-hidden">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="bg-[#080808] hover:bg-[#0d0d0d] px-8 py-8 text-center group transition-colors duration-300"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.09, duration: 0.55 }}
            >
              <div
                className="text-[40px] font-bold text-white leading-none mb-2 group-hover:text-[#C89B5E] transition-colors duration-400"
                style={{ fontFamily: 'var(--font-cormorant), serif' }}
              >
                <CountUp target={s.target} suffix={s.suffix} />
              </div>
              <div className="text-[10px] text-white/30 tracking-[0.15em] uppercase font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
