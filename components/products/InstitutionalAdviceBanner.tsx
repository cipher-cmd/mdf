'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { WhatsappLogo, ArrowRight } from '@phosphor-icons/react'
import { EASE } from '@/lib/animation'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function InstitutionalAdviceBanner() {
  return (
    <section className="relative w-full py-16 sm:py-20 md:py-24 overflow-hidden bg-[#FAF8F5]">
      
      {/* Background Banner: productsSectionBg.png */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src="/BG/productsSectionBg.png"
          alt="Dal Lake & Kashmir Mountains Landscape"
          fill
          priority
          className="object-cover object-right sm:object-center"
          sizes="100vw"
        />
        {/* Soft Left Alabaster Vignette for 100% Crisp Typography */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/92 via-[#FAF8F5]/75 to-transparent sm:max-w-[62%]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        <AnimatedSection className="max-w-[680px]">
          
          {/* Eyebrow */}
          <p className="text-[#8B6B23] text-[11px] sm:text-[11.5px] font-bold tracking-[0.22em] uppercase mb-3 flex items-center gap-2">
            <span>—</span> 25+ PREMIUM BRANDS
          </p>

          {/* Heading */}
          <h2
            className="text-[36px] sm:text-[46px] md:text-[54px] font-normal text-[#141414] leading-[1.08] tracking-[-0.015em] mb-4"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
          >
            Get Expert Advice for<br />
            Your Institution<span className="text-[#8B6B23]">.</span>
          </h2>

          {/* Description */}
          <p className="text-[14.5px] sm:text-[16px] text-[#463F36] leading-[1.6] mb-8 max-w-[520px]">
            Our team will help you find the right products based on your sport, budget and requirements.
          </p>

          {/* CTA Buttons (Matching Image 3 & 4) */}
          <div className="flex flex-wrap items-center gap-3.5">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#CCA552] hover:bg-[#BF9744] text-[#1E170A] font-bold text-[13px] tracking-wide transition-all duration-200 shadow-sm hover:scale-[1.02]"
            >
              <span>Get a Quote</span>
              <ArrowRight size={14} weight="bold" />
            </Link>

            <a
              href="https://wa.me/917006252334?text=Hi%20MDF%20Enterprises%2C%20I%20would%20like%20to%20get%20expert%20advice%20for%20our%20institution."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#FAF8F5] text-[#141414] border border-[#DDD5C7] font-semibold text-[13px] tracking-wide transition-all duration-200 shadow-xs hover:scale-[1.02]"
            >
              <WhatsappLogo size={18} weight="fill" className="text-[#25D366]" />
              <span>WhatsApp Us</span>
            </a>
          </div>

        </AnimatedSection>
      </div>

    </section>
  )
}
