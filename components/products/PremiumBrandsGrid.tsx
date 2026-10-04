'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { EASE } from '@/lib/animation'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

interface BrandItem {
  id: string
  name: string
  logo?: string
  textStyle?: string
  isMore?: boolean
}

const brandList: BrandItem[] = [
  // Row 1
  {
    id: 'jonex',
    name: 'JONEX',
    logo: '/images/brands/jonexLogo.webp',
  },
  {
    id: 'yonex',
    name: 'YONEX',
    logo: '/images/brands/yonexlogo.webp',
  },
  {
    id: 'cosco',
    name: 'COSCO',
    logo: '/images/brands/coscoLogo.webp',
  },
  {
    id: 'nivia',
    name: 'NIVIA',
    logo: '/images/brands/niviaLogo.webp',
  },
  {
    id: 'sg',
    name: 'SG',
    logo: '/images/brands/sglogo.webp',
  },
  {
    id: 'spartan',
    name: 'SPARTAN',
    logo: '/images/brands/spartanlogo.webp',
  },
  {
    id: 'ss',
    name: 'SS',
    logo: '/images/brands/ssLogo.webp',
  },
  // Row 2
  {
    id: 'stag',
    name: 'STAG GLOBAL',
    logo: '/images/brands/staglogo.webp',
  },
  {
    id: 'netco',
    name: 'NETCO',
    logo: '/images/brands/netcoLogo.webp',
  },
  {
    id: 'gm',
    name: 'GM',
    logo: '/images/brands/gmLogo.webp',
  },
  {
    id: 'bdm',
    name: 'BDM CRICKET',
    logo: '/images/brands/bdmlogo.webp',
  },
  {
    id: 'vixen',
    name: 'Vixen',
    textStyle: 'font-black tracking-tight text-[19px] italic text-[#141414]',
  },
  {
    id: 'bina',
    name: 'BĪNA',
    textStyle: 'font-serif font-black tracking-wider text-[20px] text-[#A62626]',
  },
  {
    id: 'more',
    name: '+ More',
    isMore: true,
  },
]

export function PremiumBrandsGrid() {
  return (
    <section className="relative w-full py-14 sm:py-18 overflow-hidden bg-[#FAF8F5]">
      
      {/* Background Image: premiumBrandsBg.png */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src="/BG/premiumBrandsBg.png"
          alt="Premium Brands Background"
          fill
          className="object-cover object-center opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/80 via-transparent to-[#FAF8F5]/80" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        
        {/* Eyebrow: — 25+ PREMIUM BRANDS */}
        <AnimatedSection className="mb-6 sm:mb-8">
          <p className="text-[#8B6B23] text-[11px] sm:text-[12px] font-bold tracking-[0.22em] uppercase flex items-center gap-2">
            <span>—</span> 25+ PREMIUM BRANDS
          </p>
        </AnimatedSection>

        {/* 14 Brands Grid (7 per row on desktop matching Image 3 & 4) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-3.5">
          {brandList.map((brand, idx) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.03, ease: EASE }}
              className="group bg-white rounded-[14px] sm:rounded-[16px] border border-[#EAE3D6] hover:border-[#D5C6A5] shadow-[0_2px_8px_rgba(20,15,5,0.02)] hover:shadow-[0_8px_20px_rgba(139,107,35,0.08)] transition-all duration-300 flex items-center justify-center p-3 sm:p-4 min-h-[66px] sm:min-h-[74px] cursor-default"
            >
              {brand.isMore ? (
                <span className="text-[13px] sm:text-[14px] font-bold text-[#6A6359] group-hover:text-[#141414] transition-colors">
                  + More
                </span>
              ) : brand.logo ? (
                <div className="relative w-full h-8 sm:h-9 flex items-center justify-center">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={100}
                    height={36}
                    className="max-h-8 sm:max-h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ) : (
                <span className={brand.textStyle || 'text-[14px] font-bold text-[#141414]'}>
                  {brand.name}
                </span>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
