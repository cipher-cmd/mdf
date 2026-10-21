'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check, Eye, WhatsappLogo, X } from '@phosphor-icons/react'
import { EASE } from '@/lib/animation'
import type { Product } from '@/lib/data/products'
import { useCopy, useDepartments, useWhatsApp } from '@/providers/SiteProvider'

/** Department name + WhatsApp enquiry link, both from the admin's settings. */
function useProductHelpers() {
  const departments = useDepartments()
  const whatsapp = useWhatsApp()
  const copy = useCopy('products_page')
  return {
    copy,
    categoryLabel: (id: string) => departments.find(c => c.id === id)?.label ?? id,
    productEnquiry: (p: Product) =>
      whatsapp(p.whatsappText || `Hi MDF Enterprises, I am interested in ${p.name}${p.brand ? ` (${p.brand})` : ''}. Could you share sizes, availability and pricing?`),
  }
}

function ProductCard({ product, index, onOpen }: { product: Product; index: number; onOpen: () => void }) {
  const { categoryLabel, productEnquiry } = useProductHelpers()
  const inStock = (product as Product & { inStock?: boolean }).inStock !== false
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.15), ease: EASE }}
      className="group flex flex-col"
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Quick view: ${product.brand} ${product.name}`}
        className="relative block w-full aspect-[4/5] rounded-[20px] sm:rounded-[24px] overflow-hidden bg-[#0E0B07] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#CCA552]/40"
      >
        <Image
          src={product.image}
          alt={`${product.brand} ${product.name}`}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 340px"
        />
        {!inStock && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white text-[12px] font-semibold text-[#554E46]">
            On order
          </span>
        )}
        <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
        <span className="absolute left-1/2 bottom-4 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200 hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/55 border border-white/30 text-white text-[13px] font-semibold whitespace-nowrap">
          <Eye size={14} weight="bold" /> Quick view
        </span>
      </button>

      <div className="pt-3.5 sm:pt-4 px-0.5 flex flex-col flex-1">
        <p className="text-[12px] sm:text-[13px] font-medium text-[#8B6B23]">
          {product.brand}
          <span className="hidden sm:inline"> <span className="text-[#C9B994]">·</span> {categoryLabel(product.category)}</span>
        </p>
        <h3 className="mt-1 text-[19px] sm:text-[22px] font-bold text-[#141414] leading-[1.1] font-serif-heading">
          {product.name}
        </h3>
        <p className="mt-1.5 text-[12.5px] sm:text-[13px] text-[#6B6359] leading-relaxed line-clamp-2 hidden sm:block">
          {product.description}
        </p>
        <a
          href={productEnquiry(product)}
          target="_blank"
          rel="noreferrer"
          className="mt-auto pt-2 self-start inline-flex items-center gap-1.5 min-h-[40px] text-[12.5px] sm:text-[13px] font-semibold text-[#141414] hover:text-[#8B6B23] transition-colors group/cta"
        >
          <WhatsappLogo size={16} weight="fill" className="text-[#25D366]" />
          Enquire
          <ArrowUpRight size={12} weight="bold" className="transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
        </a>
      </div>
    </motion.article>
  )
}

function QuickView({ product, onClose }: { product: Product; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const { categoryLabel, productEnquiry, copy } = useProductHelpers()

  // Lock page scroll, focus the dialog, close on Escape, restore focus after
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    document.documentElement.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
      opener?.focus()
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-6 bg-[#0E0B07]/70 backdrop-blur-sm"
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quickview-title"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0, transition: { duration: 0.2 } }}
        transition={{ duration: 0.3, ease: EASE }}
        onClick={e => e.stopPropagation()}
        className="relative w-full sm:max-w-[880px] max-h-[92svh] overflow-y-auto bg-[#F7F7F7] rounded-t-[28px] sm:rounded-[28px] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)] grid grid-cols-1 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-11 h-11 rounded-full bg-white border border-[#E0E0E0] text-[#141414] flex items-center justify-center hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#CCA552]/40"
        >
          <X size={16} weight="bold" />
        </button>

        <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[540px] bg-[#0E0B07]">
          <Image
            src={product.image}
            alt={`${product.brand} ${product.name}`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 420px"
          />
        </div>

        <div className="p-6 sm:p-8 md:p-10 flex flex-col">
          <p className="text-[13px] font-medium text-[#8B6B23]">
            {product.brand} · {categoryLabel(product.category)}
          </p>
          <h3 id="quickview-title" className="mt-2 text-[32px] sm:text-[38px] font-bold text-[#141414] leading-[1.02] font-serif-heading">
            {product.name}
          </h3>
          <p className="mt-3 text-[14.5px] text-[#554E46] leading-[1.65]">{product.description}</p>

          <ul className="mt-6 space-y-2.5 border-t border-[#E5E5E5] pt-5">
            {product.highlights.map((h, i) => (
              <li key={i} className="flex items-center gap-2.5 text-[13.5px] text-[#2A251F]">
                <Check size={15} weight="bold" className="text-[#8B6B23] flex-shrink-0" />
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-8 flex flex-col gap-3">
            <a
              href={productEnquiry(product)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[50px] px-6 rounded-full bg-[#141414] hover:bg-[#2A241B] text-white text-[14px] font-semibold transition-colors"
            >
              <WhatsappLogo size={18} weight="fill" className="text-[#25D366]" />
              {copy.enquire_button}
            </a>
            <Link
              href={`/products/${product.category}`}
              onClick={onClose}
              className="inline-flex items-center justify-center gap-1.5 min-h-[44px] text-[13px] font-semibold text-[#8B6B23] hover:text-[#A47E28] transition-colors"
            >
              More in {categoryLabel(product.category)}
              <ArrowUpRight size={13} weight="bold" />
            </Link>
            <p className="text-[12.5px] text-center text-[#6B6359]">{copy.trust_line}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ProductGrid({ items }: { items: Product[] }) {
  const [open, setOpen] = useState<Product | null>(null)
  const close = useCallback(() => setOpen(null), [])

  return (
    <>
      <motion.div layout className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-3.5 gap-y-8 sm:gap-x-6 sm:gap-y-12">
        <AnimatePresence mode="popLayout">
          {items.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} onOpen={() => setOpen(p)} />
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {open && <QuickView key={open.id} product={open} onClose={close} />}
      </AnimatePresence>
    </>
  )
}
