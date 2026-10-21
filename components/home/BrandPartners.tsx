'use client'

import Image from 'next/image'
import { useCopy } from '@/providers/SiteProvider'
import { lines } from '@/lib/content/copy'

function BrandTile({ brand }: { brand: { name: string; logo: string } }) {
  return (
    <li className="h-[78px] sm:h-[96px] bg-white rounded-[16px] sm:rounded-[20px] border border-[#E5E5E5] px-5 flex items-center justify-center">
      <div className="relative w-full h-10 sm:h-12">
        <Image src={brand.logo} alt={`${brand.name} authorised dealer`} fill className="object-contain" sizes="192px" />
      </div>
    </li>
  )
}

export function BrandPartners() {
  const copy = useCopy('home_brands')
  return (
    <section id="brands" className="relative bg-[#F7F7F7] py-12 sm:py-14 md:py-16">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 md:gap-8 mb-8 sm:mb-10">
          <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-bold text-[#141414] leading-[1.08] font-serif-heading">
            {lines(copy.heading).map((l, i) => <span key={i}>{i > 0 && <><br className="hidden sm:block" />{' '}</>}{l}</span>)}
          </h2>
          <p className="text-[#5E5850] text-[15px] md:text-right max-w-[420px] leading-relaxed">
            {copy.text}
          </p>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {copy.brands.map(b => <BrandTile key={b.name} brand={b} />)}
        </ul>
      </div>
    </section>
  )
}
