'use client'

import Image from 'next/image'
import { InfiniteMarquee } from '@/components/ui/InfiniteMarquee'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

const brandList = [
  { id: 'jonex',   name: 'Jonex',       logo: '/images/brands/jonexLogo.webp' },
  { id: 'yonex',   name: 'Yonex',       logo: '/images/brands/yonexlogo.webp' },
  { id: 'cosco',   name: 'Cosco',       logo: '/images/brands/coscoLogo.webp' },
  { id: 'nivia',   name: 'Nivia',       logo: '/images/brands/niviaLogo.webp' },
  { id: 'sg',      name: 'SG',          logo: '/images/brands/sglogo.webp' },
  { id: 'spartan', name: 'Spartan',     logo: '/images/brands/spartanlogo.webp' },
  { id: 'ss',      name: 'SS',          logo: '/images/brands/ssLogo.webp' },
  { id: 'stag',    name: 'Stag Global', logo: '/images/brands/staglogo.webp' },
  { id: 'netco',   name: 'Netco',       logo: '/images/brands/netcoLogo.webp' },
  { id: 'gm',      name: 'GM',          logo: '/images/brands/gmLogo.webp' },
  { id: 'novas',   name: 'Novas',       logo: '/images/brands/novaFitnessLogo.webp' },
  { id: 'bdm',     name: 'BDM Cricket', logo: '/images/brands/bdmlogo.webp' },
]

function BrandTile({ brand }: { brand: (typeof brandList)[number] }) {
  return (
    <div className="group mx-2 sm:mx-2.5 w-[148px] sm:w-[192px] h-[78px] sm:h-[96px] flex-shrink-0 bg-white/90 rounded-[16px] sm:rounded-[20px] border border-[#EAE3D6] px-5 flex items-center justify-center shadow-[0_2px_10px_rgba(60,45,20,0.04)] hover:shadow-[0_10px_26px_-8px_rgba(60,45,20,0.16)] hover:border-[#D9C9A6] transition-all duration-300">
      <div className="relative w-full h-10 sm:h-12">
        <Image
          src={brand.logo}
          alt={`${brand.name} authorised dealer`}
          fill
          className="object-contain opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
          sizes="192px"
          loading="eager"
        />
      </div>
    </div>
  )
}

export function BrandPartners() {
  return (
    <section id="brands" className="relative bg-[#FAF8F5] py-12 sm:py-14 md:py-16 overflow-hidden">
      {/* Soft gold glow — a quiet interlude between the two image-heavy sections */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 70% at 50% 55%, rgba(204,165,82,0.10), transparent 70%)' }}
        aria-hidden
      />

      <div className="relative max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10">
        <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-3 md:gap-8 mb-8 sm:mb-10">
          <div>
            <p className="mb-2 text-[11px] tracking-[0.2em] font-semibold text-[#8B6B23] uppercase">
              — OUR TRUSTED BRANDS
            </p>
            <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-bold text-[#141414] leading-[1.08] font-serif-heading">
              Genuine Stock from{' '}<br className="hidden sm:block" />India&apos;s Leading Brands.
            </h2>
          </div>
          <p className="text-[#6B6359] text-[15px] md:text-[13.5px] md:text-right max-w-[420px] leading-relaxed">
            Authorised dealership for 25+ trusted sports, fitness and equipment brands — sourced direct, every time.
          </p>
        </AnimatedSection>
      </div>

      {/* Two continuously moving strips, all 12 brands in each, offset so the same logo never lines up */}
      <AnimatedSection delay={0.1} className="relative flex flex-col gap-3 sm:gap-4">
        <InfiniteMarquee pauseOnHover={false} speed={45}>
          {brandList.map(b => <BrandTile key={b.id} brand={b} />)}
        </InfiniteMarquee>
        <InfiniteMarquee pauseOnHover={false} speed={52} direction="right">
          {[...brandList.slice(6), ...brandList.slice(0, 6)].map(b => <BrandTile key={b.id} brand={b} />)}
        </InfiniteMarquee>
      </AnimatedSection>
    </section>
  )
}
