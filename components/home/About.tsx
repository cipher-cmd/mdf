'use client'

import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { EASE } from '@/lib/animation'
import Image from 'next/image'
import { JourneyModal } from './JourneyModal'
import {
  ArrowRight,
  Package,
  Wrench,
  FileText,
  Compass,
  Medal,
  Headset,
} from '@phosphor-icons/react'

const pillars = [
  {
    icon: Package,
    title: 'Retail & Bulk Orders',
    desc: 'Individual and institutional supply',
  },
  {
    icon: Wrench,
    title: 'Expert Installation',
    desc: 'In-house team for setup',
  },
  {
    icon: FileText,
    title: 'GeM & Tender Ready',
    desc: 'Support for GeM and state tenders',
  },
  {
    icon: Compass,
    title: 'J&K-Wide Coverage',
    desc: 'Serving institutions across J&K',
  },
  {
    icon: Medal,
    title: 'Top Brand Dealerships',
    desc: 'Authorised stock from 25+ leading brands',
  },
  {
    icon: Headset,
    title: 'After-Sales Support',
    desc: 'AMC and service contracts',
  },
]

export function About() {
  const [journeyOpen, setJourneyOpen] = useState(false)
  const closeJourney = useCallback(() => setJourneyOpen(false), [])

  return (
    <section id="about" className="relative w-full overflow-hidden bg-[#FAF8F5] pt-8 sm:pt-10 md:pt-12 pb-12 sm:pb-16">
      
      {/* ── Background: foundedByBg.png flowing from below Founded By towards the top ── */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-feather">
        <Image
          src="/BG/foundedByBg.png"
          alt="MDF Enterprises Heritage Landscape"
          fill
          className="object-cover object-bottom opacity-90 select-none"
          sizes="100vw"
        />
      </div>

      {/* ── Content Container ── */}
      <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10">
        
        {/* ── 1. ABOUT: Individual Floating Card with dedicated aboutBg.png ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative rounded-[22px] md:rounded-[28px] border border-[#E2D8C7] shadow-[0_20px_50px_-12px_rgba(20,20,20,0.10),0_1px_3px_rgba(0,0,0,0.03)] mb-8 sm:mb-12 overflow-hidden"
        >
          {/* Dedicated aboutBg.png inside the About card */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <Image
              src="/BG/aboutBg.png"
              alt="MDF Enterprises Dal Lake About"
              fill
              className="object-cover object-center select-none"
              sizes="(max-width: 1380px) 100vw, 1380px"
            />
            {/* Soft mist on left to ensure high contrast & legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/92 via-[#FAF8F5]/65 to-[#FAF8F5]/15 md:to-transparent" />
          </div>

          {/* Card Content Grid */}
          <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-11 grid grid-cols-1 lg:grid-cols-[46%_54%] gap-8 lg:gap-10 items-center">
            
            {/* Left: About Text */}
            <div className="max-w-[480px]">
              <p className="mb-2 text-[11px] tracking-[0.2em] font-semibold text-[#8B6B23] uppercase">
                — ABOUT MDF ENTERPRISES
              </p>
              <h2
                className="text-[32px] sm:text-[38px] lg:text-[42px] font-bold text-[#141414] leading-[1.06] mb-3.5 font-serif-heading"
              >
                One Supplier.<br />
                Every Need.
              </h2>
              <p className="text-[#3E3831] text-[15px] sm:text-[14px] leading-[1.6] mb-6 font-medium">
                Founded in 1997 in Srinagar, MDF Enterprises has been J&amp;K&apos;s trusted equipment partner for 28+ years — supplying sports goods, fitness equipment, musical instruments, awards and custom solutions across institutions, clubs and communities.
              </p>
              <button
                type="button"
                onClick={() => setJourneyOpen(true)}
                className="inline-flex items-center gap-2 pl-5 pr-2 py-2 bg-[#CCA552] hover:bg-[#BF9744] text-[#1E170A] font-semibold text-[13px] rounded-full shadow-[0_8px_20px_-10px_rgba(204,165,82,0.9)] hover:shadow-[0_12px_26px_-10px_rgba(204,165,82,1)] transition-all group"
              >
                <span>Our Journey</span>
                <span className="w-7 h-7 rounded-full bg-[#1E170A]/10 flex items-center justify-center group-hover:bg-[#1E170A] group-hover:text-[#CCA552] transition-colors">
                  <ArrowRight size={13} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
            </div>

            {/* Right: 6-Pillars in a Clean White Floating Sub-Card */}
            <div className="bg-white/94 backdrop-blur-md rounded-[18px] md:rounded-[22px] border border-[#EAE3D6] shadow-[0_8px_30px_rgba(0,0,0,0.05)] p-5 sm:p-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-7 gap-y-4 sm:gap-y-4.5">
                {pillars.map((p, i) => {
                  const Icon = p.icon
                  return (
                    <motion.div
                      key={p.title}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.25 + i * 0.07, ease: EASE }}
                      className="flex items-start gap-3.5"
                    >
                      <div className="w-10 h-10 rounded-full border border-[#D1AE6C]/70 bg-[#FAF5EB] flex items-center justify-center text-[#9E7422] flex-shrink-0 mt-0.5 shadow-2xs">
                        <Icon size={19} weight="duotone" />
                      </div>
                      <div>
                        <h4 className="text-[13px] sm:text-[13.5px] font-bold text-[#141414] leading-snug">
                          {p.title}
                        </h4>
                        <p className="text-[11.5px] sm:text-[12px] text-[#554E46] leading-snug mt-0.5">
                          {p.desc}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

          </div>
        </motion.div>

        {/* ── 2. FOUNDED BY: At the bottom in its own place on foundedByBg ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative flex items-center justify-between pt-2 pb-4 sm:pb-6 px-2 sm:px-4"
        >
          
          {/* Left Founder Profile Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 max-w-[780px]">
            {/* Monogram Avatar Circle */}
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#B58B38] text-white font-bold text-[22px] sm:text-[24px] flex items-center justify-center flex-shrink-0 shadow-md border-2 border-white/90 font-serif select-none">
              SM
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10.5px] font-bold text-[#8B6B23] uppercase tracking-[0.2em]">
                  FOUNDED BY
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#CCA552]" />
              </div>
              <h3 className="text-[22px] sm:text-[26px] font-bold text-[#141414] leading-snug mb-1 font-serif-heading">
                Mr. Syed Mumtaz
              </h3>
              <p className="text-[#4E4841] text-[15px] sm:text-[14px] leading-[1.6] max-w-[540px]">
                A lifelong passion for sport and education led Mr. Syed Mumtaz to establish MDF Enterprises in 1997 — from a small Srinagar storefront to J&amp;K&apos;s most trusted institutional equipment partner, serving 1000+ institutions across the valley and beyond.
              </p>
            </div>
          </div>

          {/* Vintage 1997 Watermark on right */}
          <div className="hidden lg:block pointer-events-none select-none text-right opacity-[0.16] pr-4">
            <span className="text-[100px] xl:text-[120px] font-bold text-[#8B6B23] font-serif-heading leading-none select-none">
              1997
            </span>
          </div>

        </motion.div>

      </div>

      <JourneyModal open={journeyOpen} onClose={closeJourney} />
    </section>
  )
}
