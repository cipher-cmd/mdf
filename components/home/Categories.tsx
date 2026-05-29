'use client'

import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE } from '@/lib/animation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Dumbbell, Activity, Music2, Trophy } from 'lucide-react'
import { categories } from '@/lib/data/categories'

const catIcons: Record<string, React.ElementType> = {
  sports:  Dumbbell,
  fitness: Activity,
  music:   Music2,
  awards:  Trophy,
}

function CategoryCard({ cat, index, featured }: { cat: (typeof categories)[0]; index: number; featured?: boolean }) {
  const shouldReduce = useReducedMotion()
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const Icon = catIcons[cat.id] ?? ArrowUpRight

  function onMove(e: React.MouseEvent) {
    if (shouldReduce || !cardRef.current || !glowRef.current) return
    const r = cardRef.current.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    glowRef.current.style.background =
      `radial-gradient(circle 220px at ${x}px ${y}px, rgba(255,107,0,0.1), transparent)`
  }
  function onLeave() {
    if (glowRef.current) glowRef.current.style.background = 'transparent'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: EASE }}
      className={featured ? 'row-span-2' : ''}
    >
      <Link href={cat.href} className="group block h-full">
        <div
          ref={cardRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className="relative w-full overflow-hidden bg-[#0f0f0f] border border-white/[0.06] group-hover:border-[#FF6B00]/25 transition-colors duration-500 rounded-2xl"
          style={{ height: featured ? '100%' : '260px', minHeight: featured ? '540px' : '260px' }}
        >
          {/* Spotlight layer */}
          <div ref={glowRef} className="absolute inset-0 z-10 pointer-events-none transition-none rounded-2xl" aria-hidden />

          <Image
            src={cat.image}
            alt={cat.label}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
            sizes={featured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
          {/* Hover overlay brighten */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[-10] transition-all duration-500" />

          {/* Top sweep line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C89B5E] to-[#FF6B00] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />

          {/* Category pill - top left */}
          <div className="absolute top-5 left-5 z-20">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-[9px] font-bold tracking-[0.2em] uppercase text-white/60">
              <Icon size={10} className="text-[#C89B5E]" strokeWidth={2} />
              {cat.tagline}
            </span>
          </div>

          {/* Bottom content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
            <h3
              className={`font-medium text-white leading-tight mb-3 group-hover:text-white transition-colors ${featured ? 'text-[36px] md:text-[40px]' : 'text-[24px] md:text-[26px]'}`}
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              {cat.label}
            </h3>
            <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.12em] uppercase text-white/40 group-hover:text-[#FF6B00] transition-colors duration-300">
              Explore Range
              <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export function Categories() {
  const enabled = categories.filter(c => c.enabled)
  const [featured, ...rest] = enabled

  return (
    <section id="categories" className="bg-[#050505] py-20 md:py-28">
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="overline-gold mb-5">Categories We Deal In</p>
            <h2
              className="text-[36px] md:text-[52px] font-medium text-white leading-[1.05]"
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              Everything You Need,<br />
              For Every Purpose<span className="text-[#C89B5E]">.</span>
            </h2>
          </div>
          <Link
            href="/products"
            className="text-[12px] font-bold tracking-[0.12em] uppercase text-white/60 hover:text-white transition-colors flex items-center gap-2 shrink-0"
          >
            Browse All Products <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Magazine bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Top row: featured left, one right */}
          <div className="grid grid-cols-1 gap-4 md:row-span-2">
            <CategoryCard cat={featured} index={0} featured />
          </div>
          <div className="grid grid-cols-1 gap-4">
            {rest.map((cat, i) => (
              <CategoryCard key={cat.id} cat={cat} index={i + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
