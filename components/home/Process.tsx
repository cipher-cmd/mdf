'use client'

import Image from 'next/image'
import { useCopy } from '@/providers/SiteProvider'
import { lines } from '@/lib/content/copy'

export function Process() {
  const copy = useCopy('home_process')
  const steps = copy.steps.map((s, i) => ({ ...s, step: String(i + 1) }))
  return (
    <section id="process" className="relative w-full bg-[#F7F7F7] py-12 sm:py-14 md:py-16 overflow-hidden">
      
      {/* Background Image: howWeWorkBg.png with subtle mountain sketch on right */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-feather">
        <Image
          src="/BG/howWeWorkBg.png"
          alt="How We Work Background"
          fill
          className="object-cover object-right opacity-45 select-none"
          sizes="100vw"
        />
        {/* Soft left gradient so text on the left is crisp and clear */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F7F7F7] via-[#F7F7F7]/70 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10">

        {/* ── Compact Side-by-Side: Heading Left, 4-Step Pipeline Right ── */}
        <div className="grid grid-cols-1 xl:grid-cols-[28%_minmax(0,1fr)] gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Heading & Text */}
          <div className="max-w-[400px]">
            <h2
              className="text-[30px] sm:text-[34px] lg:text-[38px] font-bold text-[#141414] leading-[1.08] mb-2.5 font-serif-heading"
            >
              {lines(copy.heading).map((l, i) => <span key={i}>{i > 0 && <br />}{l}</span>)}
            </h2>
            <p className="text-[#554E46] text-[15px] sm:text-[14px] leading-[1.6]">
              {copy.text}
            </p>
          </div>

          {/* Right Column: 4-Step Pipeline with connecting roadmap line */}
          <div className="relative">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8 relative z-10">
              {steps.map((item, idx) => {
                const isLast = idx === steps.length - 1
                return (
                  <div key={item.step} className="relative flex flex-col items-start">
                    {/* Connecting line between adjacent steps on desktop (strictly stops at step 4) */}
                    {!isLast && (
                      <div className="hidden lg:block absolute top-[10px] left-[28px] right-[-24px] h-px bg-[#D9D9D9] z-0 origin-left"
                        aria-hidden
                      >
                      </div>
                    )}

                    <div className="relative z-10 flex items-baseline gap-1.5 mb-1 pr-3 bg-[#F7F7F7]">
                      <span className="text-[14px] font-semibold text-[#8B6B23] tabular-nums">{item.step}.</span>
                      <h3 className="text-[14px] font-semibold text-[#141414] leading-snug">{item.title}</h3>
                    </div>

                    <p className="text-[13px] text-[#5E5850] leading-snug max-w-[200px]">
                      {item.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
