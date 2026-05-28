'use client'

import { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { EASE } from '@/lib/animation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { products, type Product } from '@/lib/data/products'

const WA_SVG = (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
)

const filters = [
  { key: 'all',     label: 'All' },
  { key: 'sports',  label: 'Sports' },
  { key: 'fitness', label: 'Fitness' },
]

function ProductCard({ p, index }: { p: Product; index: number }) {
  const shouldReduce = useReducedMotion()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 })

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (shouldReduce || ('ontouchstart' in window)) return
    const r = e.currentTarget.getBoundingClientRect()
    rawX.set((e.clientX - r.left) / r.width - 0.5)
    rawY.set((e.clientY - r.top) / r.height - 0.5)
  }
  function onLeave() { rawX.set(0); rawY.set(0) }

  const categoryColor = p.category === 'sports' ? '#FF6B00' : '#C89B5E'
  const waUrl = `https://wa.me/917006252334?text=${encodeURIComponent(p.whatsappText)}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.07, duration: 0.6, ease: EASE }}
      style={shouldReduce ? {} : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group"
    >
      <div className="bg-[#0f0f0f] border border-white/[0.06] group-hover:border-[#C89B5E]/25 transition-colors duration-400 rounded-xl overflow-hidden h-full flex flex-col">
        {/* Image */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#111] flex-shrink-0">
          <Image
            src={p.image}
            alt={p.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span
              className="text-[9px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded backdrop-blur-sm border"
              style={{
                background: `${categoryColor}22`,
                color: categoryColor,
                borderColor: `${categoryColor}33`,
              }}
            >
              {p.category === 'sports' ? 'Sports' : p.category}
            </span>
          </div>
          {/* Gold line on hover */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
            style={{ background: categoryColor }}
          />
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <p className="text-[10px] text-white/30 font-bold tracking-[0.15em] uppercase mb-1">{p.brand}</p>
          <h3 className="text-[15px] font-semibold text-white mb-2 leading-snug">{p.name}</h3>
          <p className="text-[12px] text-white/40 leading-relaxed mb-4 flex-1">{p.description}</p>

          {/* WhatsApp Enquire button */}
          <a
            href={waUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.08em] uppercase bg-[#25d366]/10 hover:bg-[#25d366] border border-[#25d366]/30 hover:border-[#25d366] text-[#25d366] hover:text-white px-4 py-2.5 rounded transition-all duration-300 w-full justify-center"
          >
            {WA_SVG}
            Enquire on WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export function FeaturedProducts() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'sports' | 'fitness'>('all')

  const visible = products.filter(p =>
    activeFilter === 'all' ? true : p.category === activeFilter
  )

  return (
    <section id="products" className="bg-[#050505] py-20 md:py-28">
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <p className="overline-gold mb-5">What We Have In Stock</p>
            <h2
              className="text-[36px] md:text-[48px] font-medium text-white leading-[1.05]"
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              Featured Products<span className="text-[#FF6B00]">.</span>
            </h2>
          </div>
          <Link
            href="/products"
            className="text-[12px] font-bold tracking-[0.12em] uppercase text-white/40 hover:text-[#FF6B00] transition-colors flex items-center gap-2 shrink-0"
          >
            View All Products <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 mb-10 flex-wrap">
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key as typeof activeFilter)}
              className={[
                'px-4 py-2 text-[11px] font-bold tracking-[0.12em] uppercase rounded border transition-all duration-200',
                activeFilter === f.key
                  ? 'bg-[#FF6B00] border-[#FF6B00] text-white'
                  : 'bg-transparent border-white/10 text-white/40 hover:border-white/20 hover:text-white/70',
              ].join(' ')}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          style={{ perspective: '1200px' }}
        >
          {visible.map((p, i) => (
            <ProductCard key={p.id} p={p} index={i} />
          ))}
        </div>

        {/* WhatsApp bulk CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-5 border border-[#FF6B00]/15 bg-[#FF6B00]/[0.04] rounded-xl px-8 py-6"
        >
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#FF6B00] mb-1.5">Bulk Orders Welcome</p>
            <p className="text-white/70 text-[15px] font-medium">
              Schools, colleges, clubs — we supply at institutional pricing.
            </p>
          </div>
          <a
            href={`https://wa.me/917006252334?text=${encodeURIComponent('Hi MDF Enterprises, I want to place a bulk order for sports equipment / uniforms. Could you share institutional pricing?')}`}
            target="_blank"
            rel="noreferrer"
            className="btn-orange flex items-center gap-2 shrink-0"
          >
            {WA_SVG} Get Bulk Quote
          </a>
        </motion.div>

      </div>
    </section>
  )
}
