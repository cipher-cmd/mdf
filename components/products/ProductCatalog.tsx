'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { WhatsappLogo, MagnifyingGlass, Funnel, Sparkle, ArrowRight } from '@phosphor-icons/react'
import { products, type Product } from '@/lib/data/products'
import { EASE } from '@/lib/animation'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

const categoriesFilter = [
  { id: 'all', label: 'All Products' },
  { id: 'sports', label: 'Sports Goods' },
  { id: 'fitness', label: 'Fitness & Wellness' },
]

export function ProductCatalog() {
  const [selectedCat, setSelectedCat] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('all')

  const brands = useMemo(() => {
    const list = Array.from(new Set(products.map(p => p.brand))).filter(Boolean)
    return ['all', ...list]
  }, [])

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchCat = selectedCat === 'all' || p.category === selectedCat
      const matchBrand = selectedBrand === 'all' || p.brand === selectedBrand
      const query = searchQuery.trim().toLowerCase()
      const matchQuery =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      return matchCat && matchBrand && matchQuery
    })
  }, [selectedCat, selectedBrand, searchQuery])

  return (
    <section id="catalogue" className="relative w-full bg-[#FAF8F5] py-12 sm:py-16 md:py-20 border-t border-[#EAE3D6]/70">
      <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10">

        {/* Section Header */}
        <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-[640px]">
            <p className="text-[#8B6B23] text-[11px] sm:text-[12px] font-bold tracking-[0.22em] uppercase mb-2 flex items-center gap-2">
              <span>—</span> VERIFIED CATALOGUE
            </p>
            <h2
              className="text-[32px] sm:text-[40px] md:text-[46px] font-normal text-[#141414] leading-[1.08] tracking-[-0.015em]"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              Curated Stock &amp; Equipment<span className="text-[#8B6B23]">.</span>
            </h2>
            <p className="mt-2.5 text-[14px] sm:text-[15px] text-[#554F47] leading-relaxed">
              Order individual items or submit bulk procurement requests. All items backed by brand warranty and official GeM / institutional invoices.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF5EB] border border-[#E2D5BA] text-[#8B6B23] text-[12px] font-semibold">
              <Sparkle size={13} weight="fill" />
              <span>{filteredProducts.length} Items Listed</span>
            </span>
          </div>
        </AnimatedSection>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-[20px] border border-[#E8E1D3] p-4 sm:p-5 mb-10 shadow-[0_4px_20px_rgba(20,15,5,0.02)] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categoriesFilter.map(tab => {
              const active = selectedCat === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCat(tab.id)}
                  className={`px-4 py-2 rounded-full text-[12.5px] font-semibold transition-all duration-200 cursor-pointer ${
                    active
                      ? 'bg-[#141414] text-white shadow-xs'
                      : 'bg-[#FAF8F5] text-[#554F47] hover:text-[#141414] hover:bg-[#F2EDE4] border border-[#EAE3D6]'
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Search + Brand Filter */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-[240px]">
              <MagnifyingGlass size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B8378]" />
              <input
                type="text"
                placeholder="Search equipment..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#FAF8F5] border border-[#E5DDD0] focus:border-[#8B6B23] focus:bg-white rounded-full text-[12.5px] text-[#141414] placeholder:text-[#9A9287] outline-none transition-all"
              />
            </div>

            {/* Brand Dropdown */}
            {brands.length > 2 && (
              <div className="relative">
                <select
                  value={selectedBrand}
                  onChange={e => setSelectedBrand(e.target.value)}
                  className="appearance-none pl-3.5 pr-8 py-2 bg-[#FAF8F5] border border-[#E5DDD0] rounded-full text-[12px] font-semibold text-[#4A4339] outline-none cursor-pointer hover:bg-[#F2EDE4] transition-colors"
                >
                  <option value="all">All Brands</option>
                  {brands.filter(b => b !== 'all').map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
                <Funnel size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B8378] pointer-events-none" />
              </div>
            )}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-[22px] border border-[#EAE3D6] p-12 text-center max-w-[500px] mx-auto my-8">
            <p className="text-[16px] font-semibold text-[#141414] mb-2">No matching products found</p>
            <p className="text-[13px] text-[#6A6359] mb-5">
              Looking for a specific item? Contact us directly and we will source it for you through our official manufacturer network.
            </p>
            <button
              onClick={() => { setSelectedCat('all'); setSearchQuery(''); setSelectedBrand('all') }}
              className="px-5 py-2 rounded-full bg-[#FAF5EB] border border-[#D8C7A0] text-[#8B6B23] text-[12px] font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((p, idx) => {
                const waUrl = `https://wa.me/917006252334?text=${encodeURIComponent(
                  p.whatsappText || `Hi MDF Enterprises, I would like to enquire about ${p.name} (${p.brand}). Could you share pricing and availability?`
                )}`

                return (
                  <motion.div
                    layout
                    key={p.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: Math.min(idx * 0.04, 0.3), ease: EASE }}
                    className="group flex flex-col bg-white rounded-[20px] border border-[#EAE3D6] hover:border-[#D5C6A5] shadow-[0_3px_14px_rgba(20,15,5,0.02)] hover:shadow-[0_12px_32px_rgba(139,107,35,0.08)] transition-all duration-300 overflow-hidden"
                  >
                    {/* Media Container */}
                    <div className="relative w-full aspect-[4/3] bg-[#F7F4EE] overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-out"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />

                      {/* Brand Pill Badge */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs border border-[#E5DDD0] text-[10px] font-bold text-[#141414] tracking-[0.1em] uppercase shadow-2xs">
                          {p.brand}
                        </span>
                      </div>

                      {/* Category tag */}
                      <div className="absolute top-3 right-3 z-10">
                        <span className="px-2 py-0.5 rounded-full bg-[#FAF5EB] text-[9.5px] font-bold text-[#8B6B23] uppercase tracking-[0.1em]">
                          {p.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="text-[16px] font-semibold text-[#141414] leading-snug mb-1.5 group-hover:text-[#8B6B23] transition-colors">
                          {p.name}
                        </h3>
                        <p className="text-[12.5px] text-[#6A6359] line-clamp-2 leading-relaxed mb-4">
                          {p.description}
                        </p>
                      </div>

                      {/* Action WhatsApp Quote */}
                      <div className="pt-3 border-t border-[#F2ECE1]">
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366] text-[#1E7E34] hover:text-white border border-[#25D366]/25 hover:border-[#25D366] text-[12px] font-bold tracking-wide transition-all duration-200 group/wa"
                        >
                          <WhatsappLogo size={16} weight="fill" className="text-[#25D366] group-hover/wa:text-white transition-colors" />
                          <span>Get Quote / Enquire</span>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </section>
  )
}
