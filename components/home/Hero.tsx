'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { MagneticButton } from '@/components/ui/MagneticButton'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]


const services = ['Sports', 'Fitness', 'Music', 'Awards']

const stats = [
  { value: '28+',   label: 'Years of Excellence' },
  { value: '1000+', label: 'Institutions Served' },
  { value: '500+',  label: 'Installations Done' },
  { value: '25+',   label: 'Trusted Brands' },
]

const WA_SVG = (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
)

export function Hero() {
  const shouldReduce = useReducedMotion()

  const headVar: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.14, delayChildren: shouldReduce ? 0 : 0.35 } },
  }
  const wordVar: Variants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 68 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  }

  return (
    <section className="relative w-full bg-[#050505] flex flex-row min-h-screen overflow-hidden">

      {/* Ambient glow */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[480px] h-[480px] pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(255,107,0,0.07) 0%, transparent 68%)' }}
        aria-hidden
      />

      {/* ── Mobile video background — absolute, behind content ── */}
      <div className="absolute inset-0 lg:hidden z-0" aria-hidden>
        <video
          src="/heroVideo.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Heavy overlay so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black/85" />
        {/* Gold accent at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent" />
      </div>

      {/* ── LEFT: Content — fixed 48% width, no overlap ── */}
      <div className="relative z-10 flex flex-col w-full lg:w-[48%] flex-shrink-0 px-6 md:px-12 lg:pl-[8%] lg:pr-12 pt-36 lg:pt-[160px] pb-20 lg:pb-0 min-h-screen lg:min-h-0">

        {/* Eyebrow */}
        <motion.p
          className="overline-gold mb-8"
          initial={shouldReduce ? {} : { opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.12, duration: 0.6 }}
        >
          J&K&apos;s Premier Equipment Hub · Est. 1997
        </motion.p>

        {/* H1 */}
        <motion.h1
          variants={headVar}
          initial="hidden"
          animate="show"
          className="mb-8 overflow-hidden"
          style={{ fontFamily: 'var(--font-cormorant), serif' }}
          aria-label="Field Ready."
        >
          <motion.span
            variants={wordVar}
            className="block text-[68px] sm:text-[82px] lg:text-[88px] xl:text-[106px] font-bold leading-[0.87] tracking-tight"
            style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.45)' }}
          >
            FIELD
          </motion.span>
          <motion.span
            variants={wordVar}
            className="block text-[68px] sm:text-[82px] lg:text-[88px] xl:text-[106px] font-bold leading-[0.87] tracking-tight text-[#FF6B00]"
          >
            READY.
          </motion.span>
        </motion.h1>

        {/* Service line — no icons, clean typographic */}
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={shouldReduce ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.88, duration: 0.55 }}
        >
          {services.map((label, i) => (
            <span key={label} className="flex items-center gap-3">
              <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-white/45">{label}</span>
              {i < services.length - 1 && <span className="text-[#C89B5E]/35 text-[8px]">·</span>}
            </span>
          ))}
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-white/50 text-[14px] md:text-[15px] leading-[1.72] mb-10 max-w-[420px]"
          initial={shouldReduce ? {} : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          Srinagar&apos;s trusted supplier of sports goods, fitness equipment, musical instruments &amp; custom awards — serving institutions and clubs across J&amp;K.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap gap-4 items-center mb-12"
          initial={shouldReduce ? {} : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.06, duration: 0.55, ease: EASE }}
        >
          <MagneticButton as="a" href="/products" className="btn-orange gap-2">
            Explore Products <ArrowRight size={15} />
          </MagneticButton>
          <MagneticButton
            as="a"
            href="https://wa.me/917006252334"
            target="_blank"
            rel="noreferrer"
            className="btn-ghost-dark gap-2"
          >
            {WA_SVG} WhatsApp Us
          </MagneticButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="flex flex-wrap items-center gap-x-6 md:gap-x-8 gap-y-3 pt-7 border-t border-white/[0.07]"
          initial={shouldReduce ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.18, duration: 0.55 }}
        >
          {stats.map((s, i) => (
            <div key={s.value} className="flex flex-col">
              <span className="text-[20px] font-bold text-white leading-none">{s.value}</span>
              <span className="text-[9px] text-white/30 font-medium tracking-[0.16em] uppercase mt-0.5">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── RIGHT: Hero video panel ── */}
      <motion.div
        className="hidden lg:block flex-1 relative overflow-hidden"
        style={{ clipPath: 'polygon(7% 0, 100% 0, 100% 100%, 0% 100%)' }}
        initial={shouldReduce ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 1.2, ease: EASE }}
        aria-hidden
      >
        {/* Video — muted autoplay loop */}
        <motion.div
          className="absolute inset-0"
          initial={shouldReduce ? {} : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.25, duration: 2.2, ease: EASE }}
        >
          <video
            src="/heroVideo.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>

        {/* Cinematic overlays */}
        {/* Dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10" />
        {/* Left fade to blend with content panel */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        {/* Subtle gold tint at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#C89B5E]/08 to-transparent" />

        {/* Vertical label strip on right edge */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-[#C89B5E]/40" />
          <span
            className="text-[8px] font-bold tracking-[0.35em] uppercase text-white/30"
            style={{ writingMode: 'vertical-rl' }}
          >
            Est. 1997
          </span>
          <div className="w-[1px] h-16 bg-gradient-to-t from-transparent to-[#C89B5E]/40" />
        </div>

        {/* Bottom-left category tags */}
        <div className="absolute bottom-8 left-8 flex flex-col gap-2">
          {['Sports', 'Fitness', 'Music', 'Awards'].map((tag, i) => (
            <motion.span
              key={tag}
              className="text-[8px] font-bold tracking-[0.28em] uppercase text-white/35"
              initial={shouldReduce ? {} : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 + i * 0.1, duration: 0.4 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Scan line overlay for cinematic texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.015) 2px, rgba(0,0,0,0.015) 4px)',
          }}
        />
      </motion.div>

    </section>
  )
}
