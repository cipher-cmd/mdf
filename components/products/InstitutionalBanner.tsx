'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { WhatsappLogo, FileText, ArrowRight, ShieldCheck, Check } from '@phosphor-icons/react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function InstitutionalBanner() {
  return (
    <section className="relative w-full bg-[#FAF8F5] py-12 sm:py-16 overflow-hidden">
      <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10">
        <AnimatedSection>
          <div className="relative rounded-[24px] sm:rounded-[30px] border border-[#E2D7C2] bg-gradient-to-br from-[#FAF5EB] via-[#FAF8F5] to-[#F5EEDB] p-6 sm:p-10 md:p-12 overflow-hidden shadow-[0_12px_40px_rgba(30,20,5,0.04)]">
            
            {/* Background Damask Motif Accent */}
            <div className="absolute -right-10 -bottom-10 w-96 h-96 opacity-10 pointer-events-none">
              <Image
                src="/images/mountain_sketch.svg"
                alt=""
                fill
                className="object-contain"
              />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">
              <div className="max-w-[760px]">
                <div className="flex items-center gap-3 mb-3.5">
                  <span className="px-3 py-1 rounded-full bg-[#8B6B23]/10 border border-[#8B6B23]/25 text-[#8B6B23] text-[10.5px] font-bold uppercase tracking-[0.16em]">
                    Institutional Procurement
                  </span>
                  <span className="text-[12px] text-[#7A7266] font-medium hidden sm:inline-block">
                    GeM Registered · MSME Certified
                  </span>
                </div>

                <h3
                  className="text-[28px] sm:text-[36px] md:text-[42px] font-normal text-[#141414] leading-[1.12] mb-3"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  Supplying J&amp;K's Premier Educational Institutions &amp; Departments<span className="text-[#8B6B23]">.</span>
                </h3>

                <p className="text-[14px] sm:text-[15px] text-[#554F47] leading-relaxed mb-6 max-w-[660px]">
                  From Directorate of Youth Services &amp; Sports and University of Kashmir to KV schools and military cantonments, we handle bulk orders, GST-compliant billing, and on-site assembly across all districts.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-2">
                  <div className="flex items-center gap-2 text-[12.5px] text-[#3E3932] font-medium">
                    <div className="w-5 h-5 rounded-full bg-[#8B6B23]/15 text-[#8B6B23] flex items-center justify-center flex-shrink-0">
                      <Check size={12} weight="bold" />
                    </div>
                    <span>Government GeM Billing</span>
                  </div>
                  <div className="flex items-center gap-2 text-[12.5px] text-[#3E3932] font-medium">
                    <div className="w-5 h-5 rounded-full bg-[#8B6B23]/15 text-[#8B6B23] flex items-center justify-center flex-shrink-0">
                      <Check size={12} weight="bold" />
                    </div>
                    <span>Direct Brand Warranties</span>
                  </div>
                  <div className="flex items-center gap-2 text-[12.5px] text-[#3E3932] font-medium">
                    <div className="w-5 h-5 rounded-full bg-[#8B6B23]/15 text-[#8B6B23] flex items-center justify-center flex-shrink-0">
                      <Check size={12} weight="bold" />
                    </div>
                    <span>District-Wide Delivery</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0">
                <a
                  href="https://wa.me/917006252334?text=Hi%20MDF%20Enterprises%2C%20we%20require%20an%20institutional%20quotation%20for%20our%20department%2Fschool."
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#CCA552] hover:bg-[#BF9744] text-[#1E170A] font-bold text-[13px] tracking-wide transition-all duration-200 shadow-sm hover:scale-[1.02]"
                >
                  <WhatsappLogo size={18} weight="fill" className="text-[#1E170A]" />
                  <span>Request Institutional Quote</span>
                </a>

                <Link
                  href="/#contact"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#FAF8F5] text-[#141414] border border-[#DDD5C7] font-semibold text-[13px] tracking-wide transition-all duration-200 shadow-xs hover:scale-[1.02]"
                >
                  <FileText size={16} weight="bold" className="text-[#8B6B23]" />
                  <span>Submit Tender Enquiry</span>
                </Link>
              </div>

            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
