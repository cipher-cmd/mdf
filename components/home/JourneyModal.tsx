'use client'

import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { X, ArrowRight, MapPin } from '@phosphor-icons/react'
import { EASE } from '@/lib/animation'
import { getLenis, scrollToId } from '@/lib/scroll'

const milestones = [
  {
    mark: '1997',
    title: 'A Storefront in Srinagar',
    text: 'Mr. Syed Mumtaz opens MDF Enterprises at SDA Shopping Complex, opposite Iqbal Park — with a simple promise: the right equipment, honestly supplied.',
  },
  {
    mark: 'The Early Years',
    title: 'Schools, Clubs & Colleges',
    text: 'Word spreads across the valley. Schools, colleges and sports clubs begin equipping their grounds, gyms and music rooms through MDF.',
  },
  {
    mark: 'Partnerships',
    title: 'Authorised Dealerships',
    text: 'Dealerships with 25+ leading brands — SG, SS, Yonex, Nivia, Cosco and more — mean genuine stock at fair prices, every time.',
  },
  {
    mark: 'Beyond the Counter',
    title: 'Installation & Service',
    text: 'An in-house team takes on gym fit-outs, courts and music labs, backed by AMC and after-sales support — 500+ installations and counting.',
  },
  {
    mark: 'Public Sector',
    title: 'GeM Registered · MSME Certified',
    text: 'Government departments procure directly — J&K Police, CRPF, the University of Kashmir, Youth Services & Sports and many more.',
  },
  {
    mark: 'Today',
    title: '1000+ Institutions Served',
    text: 'Four departments under one roof, supplying and installing across every district of Jammu & Kashmir.',
  },
]

export function JourneyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    getLenis()?.stop()
    document.documentElement.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      getLenis()?.start()
      document.documentElement.style.overflow = ''
    }
  }, [open, onClose])

  const goTo = (id: string) => {
    onClose()
    window.setTimeout(() => scrollToId(id), 380)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="journey"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6 bg-[#1A140A]/55 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="journey-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.6, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full sm:max-w-[960px] h-[92svh] sm:h-auto sm:max-h-[86vh] bg-[#FAF8F5] rounded-t-[28px] sm:rounded-[28px] overflow-hidden shadow-[0_40px_100px_-30px_rgba(0,0,0,0.5)] grid grid-rows-[auto_1fr] md:grid-rows-1 md:grid-cols-[38%_62%]"
          >
            <button
              ref={closeRef}
              onClick={onClose}
              className="absolute top-3.5 right-3.5 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-[#E2D8C7] text-[#141414] flex items-center justify-center hover:bg-[#CCA552] hover:border-[#CCA552] transition-colors"
              aria-label="Close our journey"
            >
              <X size={17} weight="bold" />
            </button>

            {/* Left: picture + title */}
            <div className="relative h-[200px] md:h-auto overflow-hidden">
              <motion.div
                initial={{ scale: 1.12 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.6, ease: EASE }}
                className="absolute inset-0"
              >
                <Image src="/images/dal_lake_about.jpg" alt="Dal Lake, Srinagar" fill className="object-cover" sizes="(max-width: 768px) 100vw, 380px" />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/5" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                <p className="text-[10.5px] font-bold tracking-[0.22em] uppercase text-[#E9CF94] mb-1.5">Our Journey</p>
                <h2 id="journey-title" className="text-[30px] sm:text-[38px] font-bold text-white leading-[1.02] font-serif-heading">
                  28 Years.<br />One Valley.
                </h2>
                <p className="hidden md:flex items-center gap-1.5 text-[12px] text-white/75 mt-3">
                  <MapPin size={14} weight="fill" className="text-[#E9CF94]" />
                  Srinagar, Jammu &amp; Kashmir
                </p>
              </div>
            </div>

            {/* Right: timeline */}
            <div data-lenis-prevent className="overflow-y-auto overscroll-contain px-5 sm:px-9 pt-7 sm:pt-10 pb-6">
              <ol className="relative">
                <motion.span
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 1.4, delay: 0.25, ease: EASE }}
                  className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-[#CCA552] via-[#D9C49A] to-[#CCA552]/20 origin-top"
                  aria-hidden
                />
                {milestones.map((m, i) => (
                  <motion.li
                    key={m.title}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: EASE }}
                    className="relative pl-9 pb-7 last:pb-2"
                  >
                    <span
                      className={`absolute left-0 top-1 w-[15px] h-[15px] rounded-full border-2 ${
                        i === 0 || i === milestones.length - 1 ? 'bg-[#CCA552] border-[#CCA552]' : 'bg-[#FAF8F5] border-[#CCA552]'
                      } shadow-[0_0_0_4px_#FAF8F5]`}
                      aria-hidden
                    />
                    <p className="text-[10.5px] font-bold tracking-[0.2em] uppercase text-[#8B6B23] mb-1">{m.mark}</p>
                    <h3 className="text-[20px] sm:text-[22px] font-bold text-[#141414] leading-tight font-serif-heading mb-1">{m.title}</h3>
                    <p className="text-[13px] text-[#554E46] leading-[1.65] max-w-[460px]">{m.text}</p>
                  </motion.li>
                ))}
              </ol>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1, ease: EASE }}
                className="mt-4 pt-5 border-t border-[#EAE3D6] flex flex-wrap gap-2.5"
              >
                <button
                  onClick={() => goTo('contact')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#CCA552] hover:bg-[#BF9744] text-[#1E170A] font-semibold text-[13px] rounded-full transition-colors group"
                >
                  Work With Us
                  <ArrowRight size={14} weight="bold" className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => goTo('showroom')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-[#DDD5C7] hover:border-[#CCA552] text-[#141414] font-semibold text-[13px] rounded-full transition-colors"
                >
                  Visit the Showroom
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
