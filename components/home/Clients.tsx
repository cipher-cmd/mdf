'use client'

import { motion } from 'framer-motion'
import { EASE } from '@/lib/animation'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import Image from 'next/image'

const clients = [
  { name: 'Department of Youth Services & Sports', sector: 'Government',      logo: '/images/clients/dysoLogo.webp' },
  { name: 'University of Kashmir',                 sector: 'University',      logo: '/images/clients/kuLogo.webp' },
  { name: 'J&K Police',                            sector: 'Police',          logo: '/images/clients/jkpLogo.webp' },
  { name: 'CRPF',                                  sector: 'Armed Police',    logo: '/images/clients/crpfLogo.webp' },
  { name: 'Govt. Medical College Srinagar',        sector: 'Medical College', logo: '/images/clients/gmcLogo.webp' },
  { name: 'DSEK',                                  sector: 'School Education', logo: '/images/clients/dsekLogo.webp' },
  { name: 'SKUAST-Kashmir',                        sector: 'University',      logo: '/images/clients/skaustlogo.webp' },
  { name: 'Cluster University Srinagar',           sector: 'University',      logo: '/images/clients/clusterUniLogo.webp' },
  { name: 'School Education Department',           sector: 'Government',      logo: '/images/clients/schoolEduLogo.webp' },
]

type Client = (typeof clients)[number]

// Stacked seal on phones, horizontal seal + name on wider screens
function ClientCard({ item, delay }: { item: Client; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className="group relative bg-white/90 backdrop-blur-sm rounded-[16px] md:rounded-[18px] border border-[#EAE3D6] p-2.5 md:p-3 md:pr-4 flex flex-col md:flex-row items-center gap-2 md:gap-3.5 text-center md:text-left shadow-[0_2px_10px_rgba(60,45,20,0.04)] hover:shadow-[0_16px_32px_-16px_rgba(60,45,20,0.3)] hover:-translate-y-0.5 hover:border-[#DCCBA6] transition-all duration-500 min-h-[104px] md:min-h-0"
    >
      <div className="relative w-11 h-11 md:w-14 md:h-14 flex-shrink-0 rounded-full bg-[#FBF7EF] border border-[#EFE4CC] flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
        <div className="relative w-8 h-8 md:w-10 md:h-10">
          <Image src={item.logo} alt="" fill className="object-contain" sizes="40px" />
        </div>
      </div>
      <div className="min-w-0">
        <p className="text-[10px] md:text-[13px] font-semibold text-[#2A2621] leading-tight line-clamp-2">{item.name}</p>
        <p className="hidden md:block text-[10px] font-bold tracking-[0.16em] uppercase text-[#A88B4F] mt-1">{item.sector}</p>
      </div>
    </motion.div>
  )
}

export function Clients() {
  return (
    <section id="clients" className="relative bg-[#FAF8F5] py-12 sm:py-14 md:py-16 overflow-hidden">

      {/* Background Image: trustedByBg.png with rich sketch lines */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-feather">
        <Image
          src="/BG/trustedByBg.png"
          alt=""
          fill
          className="object-cover object-center opacity-60 select-none"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/60 via-transparent to-[#FAF8F5]/40" />
      </div>

      <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 xl:grid-cols-[28%_minmax(0,1fr)] gap-8 lg:gap-10 items-center">

          <AnimatedSection className="max-w-[400px]">
            <p className="mb-2 text-[11px] tracking-[0.2em] font-semibold text-[#8B6B23] uppercase">
              — TRUSTED BY INSTITUTIONS &amp; DEPARTMENTS
            </p>
            <h2 className="text-[30px] sm:text-[34px] lg:text-[38px] font-bold text-[#141414] leading-[1.08] mb-2.5 font-serif-heading">
              Serving J&amp;K&apos;s<br />
              Institutions &amp; Communities.
            </h2>
            <p className="text-[#554E46] text-[15px] sm:text-[14px] leading-[1.6]">
              Proud to support the growth of sports, education and community infrastructure across Jammu &amp; Kashmir.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-3 gap-2 md:gap-3">
            {clients.map((item, idx) => (
              <ClientCard key={item.name} item={item} delay={(idx % 3) * 0.06 + Math.floor(idx / 3) * 0.1} />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
