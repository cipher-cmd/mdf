'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { EASE } from '@/lib/animation'
import { processSteps } from '@/lib/data/process'

export function Process() {
  const shouldReduce = false /* fix hydration */
  const lineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: lineRef, offset: ['start 80%', 'end 20%'] })
  const lineWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="process" className="bg-[#050505] py-20 md:py-28">
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12">

        <div className="text-center mb-16 relative z-10">
          <p className="overline-gold justify-center mb-5">How We Work</p>
          <h2
            className="text-[36px] md:text-[48px] font-medium leading-[1.05]"
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            <span className="text-white/90 drop-shadow-sm">From Enquiry to Excellence</span><span className="text-[#C89B5E] drop-shadow-sm">.</span>
          </h2>
        </div>

        <div ref={lineRef} className="relative">
          {/* Connecting gold line */}
          <div className="absolute top-[28px] left-[10%] right-[10%] h-[1px] bg-white/[0.04] hidden md:block" aria-hidden>
            <motion.div
              className="h-full bg-gradient-to-r from-[#C89B5E]/20 via-[#C89B5E] to-[#C89B5E]/20 origin-left shadow-[0_0_10px_rgba(200,155,94,0.4)]"
              style={shouldReduce ? { width: '100%' } : { width: lineWidth }}
            />
          </div>
          {/* Mobile vertical connector */}
          <div className="absolute top-14 left-7 bottom-0 w-[1px] bg-white/[0.04] md:hidden" aria-hidden>
            <motion.div
              className="w-full bg-gradient-to-b from-[#C89B5E]/20 via-[#C89B5E] to-[#C89B5E]/20 origin-top shadow-[0_0_10px_rgba(200,155,94,0.4)]"
              style={shouldReduce ? { height: '100%' } : { height: lineHeight }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: EASE }}
                className="relative flex flex-col items-start md:items-center text-left md:text-center group cursor-default"
              >
                <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full border border-[#C89B5E]/20 bg-[#050505] group-hover:bg-gradient-to-br group-hover:from-[#C89B5E]/20 group-hover:to-[#050505] group-hover:border-[#C89B5E]/50 transition-all duration-500 mb-6 shadow-[0_0_0_rgba(0,0,0,0)] group-hover:shadow-[0_0_25px_rgba(200,155,94,0.25)]">
                  <span
                    className="text-[18px] font-bold text-[#C89B5E] group-hover:text-[#f3d5a4] transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-cormorant), serif' }}
                  >
                    {step.number}
                  </span>
                </div>
                <h3 className="text-[20px] font-semibold text-white/90 mb-3 group-hover:text-white transition-colors duration-300">{step.title}</h3>
                <p className="text-white/40 text-[13px] leading-relaxed max-w-none md:max-w-[220px] group-hover:text-white/60 transition-colors duration-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
