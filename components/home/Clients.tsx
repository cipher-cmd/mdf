'use client'

import Image from 'next/image'
import { useCopy } from '@/providers/SiteProvider'
import { lines } from '@/lib/content/copy'

type Client = { name: string; sector: string; logo: string }

// Stacked seal on phones, horizontal seal + name on wider screens
function ClientCard({ item }: { item: Client }) {
  return (
    <li className="relative bg-white/95 rounded-[16px] md:rounded-[18px] border border-[#E5E5E5] p-2.5 md:p-3 md:pr-4 flex flex-col md:flex-row items-center gap-2 md:gap-3.5 text-center md:text-left min-h-[104px] md:min-h-0"
    >
      <div className="relative w-11 h-11 md:w-14 md:h-14 flex-shrink-0 rounded-full bg-white border border-[#EDEDED] flex items-center justify-center">
        <div className="relative w-8 h-8 md:w-10 md:h-10">
          <Image src={item.logo} alt="" fill className="object-contain" sizes="40px" />
        </div>
      </div>
      <div className="min-w-0">
        <p className="text-[12px] md:text-[13px] font-semibold text-[#2A2621] leading-tight line-clamp-2" title={item.name}>{item.name}</p>
        <p className="hidden md:block text-[12px] text-[#6B6359] mt-1">{item.sector}</p>
      </div>
    </li>
  )
}

export function Clients() {
  const copy = useCopy('home_clients')
  const clients = copy.clients
  return (
    <section id="clients" className="relative bg-[#F7F7F7] py-12 sm:py-14 md:py-16 overflow-hidden">

      {/* Background Image: trustedByBg.png with rich sketch lines */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-feather">
        <Image
          src="/BG/trustedByBg.png"
          alt=""
          fill
          className="object-cover object-center opacity-60 select-none"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F7F7F7]/60 via-transparent to-[#F7F7F7]/40" />
      </div>

      <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 xl:grid-cols-[28%_minmax(0,1fr)] gap-8 lg:gap-10 items-center">

          <div className="max-w-[400px]">
            <h2 className="text-[30px] sm:text-[34px] lg:text-[38px] font-bold text-[#141414] leading-[1.08] mb-2.5 font-serif-heading">
              {lines(copy.heading).map((l, i) => <span key={i}>{i > 0 && <br />}{l}</span>)}
            </h2>
            <p className="text-[#554E46] text-[15px] sm:text-[14px] leading-[1.6]">
              {copy.text}
            </p>
          </div>

          <ul className="grid grid-cols-3 gap-2 md:gap-3">
            {clients.map((item, idx) => (
              <ClientCard key={idx} item={item} />
            ))}
          </ul>

        </div>
      </div>
    </section>
  )
}
