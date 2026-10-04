'use client'

import { motion } from 'framer-motion'
import { MagnifyingGlass } from '@phosphor-icons/react'

export interface Filter {
  id: string
  label: string
  /** Shown below lg so up to five filters fit one row on phones — no sideways scroll */
  short: string
  count: number
}

interface FilterBarProps {
  filters: Filter[]
  active: string
  onSelect: (id: string) => void
  query: string
  onQuery: (q: string) => void
  placeholder: string
}

function Search({ query, onQuery, placeholder, className }: Pick<FilterBarProps, 'query' | 'onQuery' | 'placeholder'> & { className: string }) {
  return (
    <label className={className}>
      <span className="sr-only">{placeholder}</span>
      <MagnifyingGlass size={15} weight="bold" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A9A090] pointer-events-none" />
      <input
        type="search"
        value={query}
        onChange={e => onQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full min-h-[44px] sm:min-h-[40px] pl-9 pr-4 rounded-full bg-white/90 border border-[#E6DCCB] hover:border-[#D6C6A4] focus:border-[#CCA552] focus:ring-4 focus:ring-[#CCA552]/15 text-[16px] sm:text-[13px] text-[#141414] placeholder:text-[#A9A090] outline-none transition-all"
      />
    </label>
  )
}

/** Sticky chip bar (sits under the scrolled navbar) + search; on phones the search drops below the bar. */
export function FilterBar({ filters, active, onSelect, query, onQuery, placeholder }: FilterBarProps) {
  return (
    <>
      <div className="sticky top-[64px] z-30 bg-[#FAF8F5]/85 backdrop-blur-xl border-y border-[#E8E2D6]/80">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10 py-2.5 flex items-center gap-3">
          <div aria-label="Filter" className="flex-1 min-w-0 grid grid-cols-5 sm:flex sm:items-center gap-0.5 sm:gap-1">
            {filters.map(f => {
              const isActive = active === f.id
              return (
                <button
                  key={f.id}
                  aria-pressed={isActive}
                  onClick={() => onSelect(f.id)}
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
          <Search query={query} onQuery={onQuery} placeholder={placeholder} className="relative flex-shrink-0 hidden sm:block w-[240px] lg:w-[280px]" />
        </div>
      </div>
      <div className="max-w-[1380px] mx-auto px-4 sm:hidden mt-4">
        <Search query={query} onQuery={onQuery} placeholder={placeholder} className="relative block" />
      </div>
    </>
  )
}
