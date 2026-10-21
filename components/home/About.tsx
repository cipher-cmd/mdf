'use client'

import { useCallback, useState } from 'react'
import Image from 'next/image'
import { JourneyModal } from './JourneyModal'
import { useCopy } from '@/providers/SiteProvider'
import { lines } from '@/lib/content/copy'
import {
  ArrowRight,
  Package,
  Wrench,
  FileText,
  Compass,
  Medal,
  Headset,
} from '@phosphor-icons/react'

const pillarIcons = [Package, Wrench, FileText, Compass, Medal, Headset]

export function About() {
  const copy = useCopy('home_about')
  const pillars = copy.pillars.map((p, i) => ({ ...p, icon: pillarIcons[i % pillarIcons.length] }))
  const [journeyOpen, setJourneyOpen] = useState(false)
  const closeJourney = useCallback(() => setJourneyOpen(false), [])

  return (
    <section id="about" className="relative w-full overflow-hidden bg-[#F7F7F7] pt-8 sm:pt-10 md:pt-12 pb-12 sm:pb-16">
      
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
        <div className="relative rounded-[22px] md:rounded-[28px] border border-[#E5E5E5] mb-8 sm:mb-12 overflow-hidden"
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
            <div className="absolute inset-0 bg-gradient-to-r from-[#F7F7F7]/92 via-[#F7F7F7]/65 to-[#F7F7F7]/15 md:to-transparent" />
          </div>

          {/* Card Content Grid */}
          <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-11 grid grid-cols-1 lg:grid-cols-[46%_54%] gap-8 lg:gap-10 items-center">
            
            {/* Left: About Text */}
            <div className="max-w-[480px]">
              <h2
                className="text-[32px] sm:text-[38px] lg:text-[42px] font-bold text-[#141414] leading-[1.06] mb-3.5 font-serif-heading"
              >
                {lines(copy.heading).map((l, i) => <span key={i}>{i > 0 && <br />}{l}</span>)}
              </h2>
              <p className="text-[#3E3831] text-[15px] leading-[1.6] mb-6">
                {copy.text}
              </p>
              <button
                type="button"
                onClick={() => setJourneyOpen(true)}
                className="inline-flex items-center gap-2 pl-5 pr-2 py-2 bg-[#CCA552] hover:bg-[#BF9744] text-[#1E170A] font-semibold text-[13px] rounded-full group"
              >
                <span>{copy.button}</span>
                <span className="w-7 h-7 rounded-full bg-[#1E170A]/10 flex items-center justify-center group-hover:bg-[#1E170A] group-hover:text-[#CCA552] transition-colors">
                  <ArrowRight size={13} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
            </div>

            {/* Right: 6-Pillars in a Clean White Floating Sub-Card */}
            <div className="bg-white/95 rounded-[16px] md:rounded-[20px] p-5 sm:p-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-7 gap-y-4 sm:gap-y-4.5">
                {pillars.map((p, i) => {
                  const Icon = p.icon
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <Icon size={20} className="text-[#8B6B23] flex-shrink-0 mt-px" />
                      <div>
                        <h3 className="text-[14px] font-semibold text-[#141414] leading-snug">
                          {p.title}
                        </h3>
                        <p className="text-[13px] text-[#554E46] leading-snug mt-0.5">
                          {p.desc}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

          </div>
        </div>

        {/* ── 2. FOUNDED BY: At the bottom in its own place on foundedByBg ── */}
        <div className="relative flex items-center justify-between pt-2 pb-4 sm:pb-6 px-2 sm:px-4"
        >
          
          {/* Left Founder Profile Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 max-w-[780px]">

            <div>
              <p className="text-[13px] font-medium text-[#8B6B23] mb-1">{copy.founder_label}</p>
              <h3 className="text-[22px] sm:text-[26px] font-bold text-[#141414] leading-snug mb-1 font-serif-heading">
                {copy.founder_name}
              </h3>
              <p className="text-[#4E4841] text-[15px] sm:text-[14px] leading-[1.6] max-w-[540px]">
                {copy.founder_text}
              </p>
            </div>
          </div>
        </div>

      </div>

      <JourneyModal open={journeyOpen} onClose={closeJourney} />
    </section>
  )
}
