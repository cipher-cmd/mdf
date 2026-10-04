'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, CheckCircle, Sparkle } from '@phosphor-icons/react'
import { EASE } from '@/lib/animation'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

interface DepartmentItem {
  id: string
  title: string
  tagline: string
  description: string
  image: string
  href: string
  highlights: string[]
  statsBadge: string
}

const departments: DepartmentItem[] = [
  {
    id: 'sports',
    title: 'Sports Goods',
    tagline: 'EQUIP. PERFORM. EXCEL.',
    description: 'Official gear for competitive athletics, tournaments, and institutional sports complexes. Authorized dealer for SS, SG, Cosco, Sega, and Yonex.',
    image: '/images/SportsGoodsNew.webp',
    href: '/products/sports',
    highlights: ['Cricket Bats & Protective Kits', 'Football & Goalposts', 'Badminton & Tennis', 'Volleyball & Basketball', 'Athletics & Field Equipment'],
    statsBadge: '15+ Sports Covered',
  },
  {
    id: 'fitness',
    title: 'Fitness & Wellness',
    tagline: 'STRONGER EVERY DAY.',
    description: 'Commercial gym equipment, functional training stations, free weights, and cardio machinery engineered for universities, armed forces, and club gyms.',
    image: '/images/fitness.webp',
    href: '/products/fitness',
    highlights: ['Commercial Treadmills & Cardio', 'Multi-Gym Stations & Racks', 'Olympic Barbells & Rubber Plates', 'Hex Dumbbells & Benches', 'High-Density Rubber Flooring'],
    statsBadge: '500+ Gym Installations',
  },
  {
    id: 'music',
    title: 'Musical Instruments',
    tagline: 'SOUND THAT INSPIRES.',
    description: 'Complete Indian classical ensembles, western acoustic and digital instruments, and brass band sets for educational institutions and performance halls.',
    image: '/images/MusicalInstrumentsNew.webp',
    href: '/products/music',
    highlights: ['Handmade Harmoniums & Tanpuras', 'Concert Tabla & Dholak Sets', 'Acoustic & Electric Guitars', 'Synthesizers & Digital Pianos', 'School Marching Band Kits'],
    statsBadge: 'Complete Band Sets',
  },
  {
    id: 'awards',
    title: 'Awards & Trophies',
    tagline: 'CELEBRATE EXCELLENCE.',
    description: 'Bespoke crystal awards, wooden walnut mementos, metal cups, and die-cast medals with high-precision custom engraving for state events and ceremonies.',
    image: '/images/Awards&TrophiesNew.webp',
    href: '/products/awards',
    highlights: ['Gold, Silver & Bronze Medals', 'Championship Cups & Trophies', 'Kashmiri Walnut Mementos', 'Crystal & Acrylic Honors', 'Laser Engraving & Personalization'],
    statsBadge: 'Custom Engraving Included',
  },
]

export function CategoryShowcase() {
  return (
    <section id="categories" className="relative w-full bg-[#FAF8F5] py-14 sm:py-18 md:py-22 overflow-hidden">
      <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10">

        {/* Section Header */}
        <AnimatedSection className="max-w-[760px] mb-12 sm:mb-16">
          <p className="text-[#8B6B23] text-[11px] sm:text-[12px] font-bold tracking-[0.22em] uppercase mb-2.5 flex items-center gap-2">
            <span>—</span> EXPLORE OUR RANGE
          </p>
          <h2
            className="text-[34px] sm:text-[44px] md:text-[52px] font-normal text-[#141414] leading-[1.08] tracking-[-0.015em] mb-4"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
          >
            Everything You Need, For Every Discipline<span className="text-[#8B6B23]">.</span>
          </h2>
          <p className="text-[14.5px] sm:text-[15.5px] text-[#554F47] leading-relaxed max-w-[620px]">
            Explore our specialized divisions serving schools, universities, armed forces, sports clubs, and athletes across Jammu &amp; Kashmir since 1997.
          </p>
        </AnimatedSection>

        {/* Categories 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {departments.map((dept, index) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
              className="group flex flex-col bg-white rounded-[22px] sm:rounded-[26px] border border-[#EAE3D6] shadow-[0_4px_24px_rgba(20,15,5,0.03)] hover:shadow-[0_16px_40px_rgba(139,107,35,0.08)] hover:border-[#D5C6A5] transition-all duration-400 overflow-hidden"
            >
              {/* Media banner */}
              <div className="relative w-full h-[220px] sm:h-[260px] overflow-hidden bg-[#F2EDE4]">
                <Image
                  src={dept.image}
                  alt={dept.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* Badge top-left */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#EAE3D6] text-[#8B6B23] text-[10px] font-bold uppercase tracking-[0.14em] shadow-xs">
                    <Sparkle size={11} weight="fill" />
                    {dept.statsBadge}
                  </span>
                </div>

                {/* Bottom title banner over image */}
                <div className="absolute bottom-4 left-5 right-5 z-10 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#EAD8B0] drop-shadow-xs mb-1">
                      {dept.tagline}
                    </p>
                    <h3
                      className="text-[28px] sm:text-[32px] font-medium text-white drop-shadow-sm leading-tight"
                      style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                    >
                      {dept.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 bg-white">
                <div>
                  <p className="text-[13.5px] sm:text-[14px] text-[#554F47] leading-relaxed mb-5">
                    {dept.description}
                  </p>

                  {/* Highlights list */}
                  <div className="space-y-2 mb-6 pt-1 border-t border-[#F0EBE1]">
                    <p className="text-[10.5px] font-bold text-[#8B6B23] uppercase tracking-[0.16em] mb-2.5">
                      Key Offerings
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {dept.highlights.map(item => (
                        <span
                          key={item}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#ECE5D8] text-[12px] text-[#4A4339] font-medium"
                        >
                          <CheckCircle size={13} weight="fill" className="text-[#8B6B23] flex-shrink-0" />
                          <span>{item}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer action */}
                <div className="pt-4 border-t border-[#F0EBE1] flex items-center justify-between">
                  <span className="text-[12px] text-[#7A7266] font-medium">
                    Genuine Stock &amp; Institutional Bulk
                  </span>

                  <Link
                    href={dept.href}
                    className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-full bg-[#FAF5EB] hover:bg-[#8B6B23] text-[#8B6B23] hover:text-white border border-[#D8C7A0] hover:border-[#8B6B23] text-[12px] font-semibold tracking-wide transition-all duration-300 group/btn"
                  >
                    <span>Browse {dept.title.split(' ')[0]}</span>
                    <ArrowUpRight size={14} weight="bold" className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
