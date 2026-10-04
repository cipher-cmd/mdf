'use client'

import { motion } from 'framer-motion'
import { EASE } from '@/lib/animation'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import Image from 'next/image'
import { FileText, Compass, Package, Wrench } from '@phosphor-icons/react'

const steps = [
  {
    step: '01',
    title: 'Consult',
    desc: 'We understand your requirements.',
    icon: FileText,
  },
  {
    step: '02',
    title: 'Source',
    desc: 'We procure from 25+ trusted brands.',
    icon: Compass,
  },
  {
    step: '03',
    title: 'Deliver',
    desc: 'Pan-India delivery with careful packaging.',
    icon: Package,
  },
  {
    step: '04',
    title: 'Install & Support',
    desc: 'In-house installation and ongoing support.',
    icon: Wrench,
  },
]

export function Process() {
  return (
    <section id="process" className="relative w-full bg-[#FAF8F5] py-12 sm:py-14 md:py-16 overflow-hidden">
      
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
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/70 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10">

        {/* ── Compact Side-by-Side: Heading Left, 4-Step Pipeline Right ── */}
        <div className="grid grid-cols-1 xl:grid-cols-[28%_minmax(0,1fr)] gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Heading & Text */}
          <AnimatedSection className="max-w-[400px]">
            <p className="mb-2 text-[11px] tracking-[0.2em] font-semibold text-[#8B6B23] uppercase">
              — HOW WE WORK
            </p>
            <h2
              className="text-[30px] sm:text-[34px] lg:text-[38px] font-bold text-[#141414] leading-[1.08] mb-2.5 font-serif-heading"
            >
              From Enquiry<br />to Excellence.
            </h2>
            <p className="text-[#554E46] text-[15px] sm:text-[14px] leading-[1.6]">
              A simple, reliable process — from understanding your needs to complete installation and support.
            </p>
          </AnimatedSection>

          {/* Right Column: 4-Step Pipeline with connecting roadmap line */}
          <div className="relative">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8 relative z-10">
              {steps.map((item, idx) => {
                const Icon = item.icon
                const isLast = idx === steps.length - 1
                return (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.8, delay: idx * 0.18, ease: EASE }}
                    className="group relative flex flex-col items-start"
                  >
                    {/* Connecting line between adjacent steps on desktop (strictly stops at step 4) */}
                    {!isLast && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.3 + idx * 0.18, ease: EASE }}
                        className="hidden lg:block absolute top-[22px] left-[46px] right-[-32px] h-[1px] bg-[#D5C29D]/75 z-0 origin-left"
                        aria-hidden
                      >
                        {/* Centered accent dot */}
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#C59B27]/80" />
                      </motion.div>
                    )}

                    {/* Step Icon Badge */}
                    <div className="relative z-10 w-11 h-11 rounded-full bg-[#FAF6EE] border border-[#D5C29D] shadow-2xs flex items-center justify-center text-[#9E7422] flex-shrink-0 mb-3 transition-colors duration-300 group-hover:bg-[#CCA552] group-hover:text-white group-hover:border-[#CCA552]">
                      <Icon size={20} weight="duotone" />
                    </div>

                    {/* Step Title with step number inline */}
                    <div className="flex items-baseline gap-1.5 mb-1">
                      <span className="text-[12px] font-bold text-[#A67C2E] tabular-nums">{item.step}</span>
                      <h3 className="text-[13.5px] font-bold text-[#141414] leading-snug">{item.title}</h3>
                    </div>

                    <p className="text-[11.5px] text-[#6B6359] leading-snug max-w-[190px]">
                      {item.desc}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
