'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { EASE } from '@/lib/animation'
import { brands } from '@/lib/data/brands'
import { InfiniteMarquee } from '@/components/ui/InfiniteMarquee'

const brandAccent: Record<string, string> = {
  jonex:   '#e63312',
  yonex:   '#0033a0',
  cosco:   '#e84b2f',
  nivia:   '#1565c0',
  sg:      '#c8102e',
  spartan: '#888888',
  ss:      '#c8a217',
  stag:    '#1b3f8f',
  netco:   '#2e7d32',
  gm:      '#ffffff',
  nova:    '#ff4500',
  bdm:     '#1b3f8f',
}

export function BrandPartners() {
  return (
    <section id="brands" className="bg-[#0f0f0f] py-20 md:py-28">
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="overline-gold mb-5">Brands We Deal In</p>
            <h2
              className="text-[36px] md:text-[48px] font-medium text-white leading-[1.05]"
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              25+ Premium Brands,<br />
              Authorised Stock<span className="text-[#C89B5E]">.</span>
            </h2>
          </div>
          <p className="text-white/40 text-[14px] leading-relaxed max-w-[280px]">
            Authorised dealers for India&apos;s most trusted sports, fitness and equipment brands — genuine stock, every time.
          </p>
        </div>

        {/* Brand logo marquee — subtle scrolling strip */}
        <div className="mb-12 -mx-6 md:-mx-12">
          <InfiniteMarquee speed={30} pauseOnHover={false} className="py-5 border-y border-white/[0.05] bg-[#0a0a0a]">
            {[...brands, ...brands].map((brand, i) => (
              <div key={i} className="flex items-center gap-10 px-8">
                <div className="relative h-8 w-20 opacity-30 hover:opacity-60 transition-opacity duration-300 flex-shrink-0">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    className="object-contain"
                    sizes="80px"
                  />
                </div>
              </div>
            ))}
          </InfiniteMarquee>
        </div>

        {/* Brand grid — 2 col mobile, 4 col desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {brands.map((brand, i) => {
            const accentColor = brandAccent[brand.id] ?? '#C89B5E'
            return (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: i * 0.06, duration: 0.45, ease: EASE }}
                whileHover={{ y: -10, scale: 1.06, zIndex: 10 }}
                className="group relative bg-white rounded-2xl overflow-hidden cursor-default"
                style={{
                  boxShadow: `0 4px 20px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)`,
                  transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                }}
              >
                {/* Permanent subtle brand color tint at bottom */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 50% 120%, ${accentColor}18 0%, transparent 65%)`,
                  }}
                  aria-hidden
                />

                {/* Top accent bar — brand color, full opacity always */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] transition-opacity duration-300"
                  style={{ background: accentColor, opacity: 0.7 }}
                  aria-hidden
                />

                {/* Stronger glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 50% 100%, ${accentColor}28 0%, transparent 70%)`,
                    boxShadow: `inset 0 0 0 1.5px ${accentColor}30`,
                  }}
                  aria-hidden
                />

                <div className="px-6 py-7 flex flex-col items-center gap-3">
                  {/* Logo — always full color */}
                  <div className="relative h-16 w-full">
                    <Image
                      src={brand.logo}
                      alt={`${brand.name} — authorised dealer MDF Enterprises`}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-400"
                      sizes="(max-width: 640px) 140px, (max-width: 1024px) 180px, 200px"
                    />
                  </div>
                  {/* Brand name */}
                  <span
                    className="text-[10px] font-bold tracking-[0.22em] uppercase transition-colors duration-300"
                    style={{ color: accentColor, opacity: 0.75 }}
                  >
                    {brand.name}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Partner CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-[#C89B5E]/15 bg-[#C89B5E]/[0.04] rounded-2xl px-8 py-7"
        >
          <div>
            <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#C89B5E] mb-2">For Brand Partners</p>
            <p className="text-white/75 text-[16px] font-medium leading-snug">
              Interested in authorised dealership in J&K?
            </p>
            <p className="text-white/35 text-[13px] mt-1">We distribute across the Kashmir Valley and Ladakh region.</p>
          </div>
          <a
            href={`https://wa.me/917006252334?text=${encodeURIComponent('Hi MDF Enterprises, I am interested in a dealer partnership. Could you share more details?')}`}
            target="_blank"
            rel="noreferrer"
            className="btn-gold shrink-0"
          >
            Partner With Us
          </a>
        </motion.div>

      </div>
    </section>
  )
}
