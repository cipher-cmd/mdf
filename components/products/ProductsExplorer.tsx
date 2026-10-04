'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, X } from '@phosphor-icons/react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { FilterBar } from '@/components/ui/FilterBar'
import { categories as defaultCategories, type Category } from '@/lib/data/categories'
import { products as defaultProducts, type Product } from '@/lib/data/products'
import { useCopy, useWhatsApp } from '@/providers/SiteProvider'
import { lines } from '@/lib/content/copy'
import { ProductGrid } from './ProductGrid'

export function ProductsExplorer({
  initialProducts,
  initialCategories
}: {
  initialProducts?: Product[]
  initialCategories?: Category[]
}) {
  const currentProducts = initialProducts ?? defaultProducts
  const currentCategories = initialCategories ?? defaultCategories
  const copy = useCopy('products_page')
  const waLink = useWhatsApp()

  const [active, setActive] = useState('all')
  const [query, setQuery] = useState('')

  const filters = useMemo(() => {
    return [
      { id: 'all', label: 'All', short: 'All' },
      ...currentCategories.map(c => ({ id: c.id, label: c.label, short: c.short })),
    ].map(f => ({
      ...f,
      count: f.id === 'all' ? currentProducts.length : currentProducts.filter(p => p.category === f.id).length
    }))
  }, [currentCategories, currentProducts])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return currentProducts
      .filter(p => active === 'all' || p.category === active)
      .filter(p => !q || `${p.name} ${p.brand} ${p.description}`.toLowerCase().includes(q))
      .sort((a, b) => Number(b.featured) - Number(a.featured))
  }, [currentProducts, active, query])

  const activeCategory = currentCategories.find(c => c.id === active)
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
            <p className="mb-2 text-[11px] tracking-[0.2em] font-semibold text-[#8B6B23] uppercase">— {copy.section_eyebrow}</p>
            <h2 className="text-[30px] sm:text-[38px] lg:text-[44px] font-bold text-[#141414] leading-[1.04] font-serif-heading">
              {lines(copy.section_heading).map((l, i) => <span key={i}>{i > 0 && <><br className="hidden sm:block" />{' '}</>}{l}</span>)}
            </h2>
          </div>
          <p className="text-[#6B6359] text-[14.5px] lg:text-[14px] lg:text-right max-w-[460px] leading-relaxed">
            {copy.section_text}
          </p>
        </AnimatedSection>
      </div>

      <FilterBar
        filters={filters}
        active={active}
        onSelect={setActive}
        query={query}
        onQuery={setQuery}
        placeholder="Search products or brands"
      />

      <div className="relative max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10">
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
            <p className="text-[26px] font-bold text-[#141414] font-serif-heading">{copy.empty_title}</p>
            <p className="mt-2 text-[14px] text-[#6B6359] leading-relaxed">
              {copy.empty_text}
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
