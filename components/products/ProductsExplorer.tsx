'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, MagnifyingGlass, X } from '@phosphor-icons/react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { categories } from '@/lib/data/categories'
import { products, waLink } from '@/lib/data/products'
import { ProductGrid } from './ProductGrid'

const filters = [
  { id: 'all', label: 'All', short: 'All' },
  ...categories.map(c => ({ id: c.id, label: c.label, short: c.short })),
].map(f => ({ ...f, count: f.id === 'all' ? products.length : products.filter(p => p.category === f.id).length }))

export function ProductsExplorer() {
  const [active, setActive] = useState('all')
  const [query, setQuery] = useState('')

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products
      .filter(p => active === 'all' || p.category === active)
      .filter(p => !q || `${p.name} ${p.brand} ${p.description}`.toLowerCase().includes(q))
      .sort((a, b) => Number(b.featured) - Number(a.featured))
  }, [active, query])

  const activeCategory = categories.find(c => c.id === active)
  const reset = () => { setActive('all'); setQuery('') }

  return (
    <section id="collection" className="relative w-full bg-[#FAF8F5] pt-6 sm:pt-10 pb-16 sm:pb-24">
      {/* Engraved Kashmir range, a quiet watermark behind the heading */}
      <div className="absolute inset-x-0 top-0 h-[420px] pointer-events-none select-none bg-feather opacity-70" aria-hidden>
        <Image src="/BG/productsSectionBg.png" alt="" fill className="object-cover object-left" sizes="100vw" />
      </div>

      <div className="relative max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10">
        <AnimatedSection className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 lg:gap-10 mb-6 sm:mb-8">
          <div>
            <p className="mb-2 text-[11px] tracking-[0.2em] font-semibold text-[#8B6B23] uppercase">— The Collection</p>
            <h2 className="text-[30px] sm:text-[38px] lg:text-[44px] font-bold text-[#141414] leading-[1.04] font-serif-heading">
              Genuine Gear,<br className="hidden sm:block" /> Hand-Picked.
            </h2>
          </div>
          <p className="text-[#6B6359] text-[14.5px] lg:text-[14px] lg:text-right max-w-[460px] leading-relaxed">
            A curated selection from our Srinagar showroom. Tap any product for details, or enquire directly for sizes and live pricing.
          </p>
        </AnimatedSection>
      </div>

      {/* Sticky filter bar — sits just under the scrolled navbar */}
      <div className="sticky top-[64px] z-30 bg-[#FAF8F5]/85 backdrop-blur-xl border-y border-[#E8E2D6]/80">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10 py-2.5 flex items-center gap-3">
          <div aria-label="Filter by category" className="flex-1 min-w-0 grid grid-cols-5 sm:flex sm:items-center gap-0.5 sm:gap-1">
            {filters.map(f => {
              const isActive = active === f.id
              return (
                <button
                  key={f.id}
                  aria-pressed={isActive}
                  onClick={() => setActive(f.id)}
                  className={`relative inline-flex items-center justify-center gap-1 sm:gap-1.5 min-h-[40px] px-1 sm:px-4 rounded-full text-[12.5px] sm:text-[13px] font-semibold transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-[#554E46] hover:text-[#141414]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="filter-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-[#141414]"
                    />
                  )}
                  <span className="relative whitespace-nowrap">
                    <span className="lg:hidden">{f.short}</span>
                    <span className="hidden lg:inline">{f.label}</span>
                  </span>
                  <span className={`relative text-[10px] sm:text-[11px] tabular-nums -translate-y-1 sm:translate-y-0 ${isActive ? 'text-[#E9CF94]' : 'text-[#A9A090]'}`}>{f.count}</span>
                </button>
              )
            })}
          </div>

          <label className="relative flex-shrink-0 hidden sm:block">
            <span className="sr-only">Search products</span>
            <MagnifyingGlass size={15} weight="bold" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A9A090] pointer-events-none" />
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search products or brands"
              className="w-[240px] lg:w-[280px] min-h-[40px] pl-9 pr-4 rounded-full bg-white/90 border border-[#E6DCCB] hover:border-[#D6C6A4] focus:border-[#CCA552] focus:ring-4 focus:ring-[#CCA552]/15 text-[13px] text-[#141414] placeholder:text-[#A9A090] outline-none transition-all"
            />
          </label>
        </div>
      </div>

      <div className="relative max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10">
        {/* Mobile search lives under the bar so the chips keep the full width */}
        <label className="relative block sm:hidden mt-4">
          <span className="sr-only">Search products</span>
          <MagnifyingGlass size={15} weight="bold" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A9A090] pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search products or brands"
            className="w-full min-h-[44px] pl-9 pr-4 rounded-full bg-white border border-[#E6DCCB] focus:border-[#CCA552] focus:ring-4 focus:ring-[#CCA552]/15 text-[16px] text-[#141414] placeholder:text-[#A9A090] outline-none transition-all"
          />
        </label>

        <div className="flex items-center justify-between gap-4 mt-5 sm:mt-7 mb-5 sm:mb-7 min-h-[24px]">
          <p className="text-[12.5px] text-[#6B6359]" aria-live="polite">
            {visible.length} {visible.length === 1 ? 'product' : 'products'}
            {activeCategory && <> in <span className="text-[#141414] font-semibold">{activeCategory.label}</span></>}
          </p>
          {activeCategory && (
            <Link href={activeCategory.href} className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#8B6B23] hover:text-[#A47E28] transition-colors group">
              View department
              <ArrowRight size={13} weight="bold" className="group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        {visible.length > 0 ? (
          <ProductGrid items={visible} />
        ) : (
          <div className="py-20 text-center max-w-[420px] mx-auto">
            <p className="text-[26px] font-bold text-[#141414] font-serif-heading">Nothing here — yet.</p>
            <p className="mt-2 text-[14px] text-[#6B6359] leading-relaxed">
              Our showroom stocks far more than we list online. Ask us and we&apos;ll check availability for you.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button onClick={reset} className="inline-flex items-center gap-1.5 min-h-[44px] px-5 rounded-full border border-[#DDD3C0] text-[13px] font-semibold text-[#141414] hover:border-[#CCA552] transition-colors">
                <X size={13} weight="bold" /> Clear filters
              </button>
              <a
                href={waLink(`Hi MDF Enterprises, I am looking for ${query || 'a product'} — is it available?`)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center min-h-[44px] px-5 rounded-full bg-[#141414] text-white text-[13px] font-semibold hover:bg-[#2A241B] transition-colors"
              >
                Ask on WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
