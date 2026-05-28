'use client'

import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { EASE } from '@/lib/animation'
import { clients } from '@/lib/data/clients'

function ClientCard({ client, index }: { client: (typeof clients)[0]; index: number }) {
  const shouldReduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  function onMove(e: React.MouseEvent) {
    if (shouldReduce || !ref.current || !glowRef.current) return
    const r = ref.current.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    glowRef.current.style.background = `radial-gradient(circle 150px at ${x}px ${y}px, rgba(200,155,94,0.09), transparent)`
  }
  function onLeave() {
    if (glowRef.current) glowRef.current.style.background = 'transparent'
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 36, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.07, duration: 0.6, ease: EASE }}
      whileHover={{ y: shouldReduce ? 0 : -8 }}
      className="group relative bg-[#111] border border-white/[0.06] hover:border-[#C89B5E]/20 rounded-xl p-7 flex flex-col items-center text-center cursor-default overflow-hidden transition-colors duration-300"
    >
      {/* Spotlight glow */}
      <div ref={glowRef} className="absolute inset-0 pointer-events-none transition-none" aria-hidden />

      {/* Top hover line */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C89B5E]/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" aria-hidden />

      {/* Logo */}
      <div className="relative w-20 h-20 rounded-full bg-white flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-400 flex-shrink-0 shadow-[0_4px_20px_rgba(0,0,0,0.35)]">
        <Image
          src={client.logo}
          alt={client.alt}
          fill
          className="object-contain p-2.5 rounded-full"
          sizes="80px"
        />
      </div>

      <p className="text-[13px] font-semibold text-white/80 leading-snug group-hover:text-white transition-colors">{client.name}</p>
    </motion.div>
  )
}

export function Clients() {
  return (
    <section id="clients" className="bg-[#0f0f0f] py-20 md:py-28">
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12">

        <div className="text-center mb-14">
          <p className="overline-gold justify-center mb-5">Proven Experience</p>
          <h2
            className="text-[36px] md:text-[52px] font-medium text-white leading-[1.05]"
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            Trusted by Institutions<br />
            &amp; Departments<span className="text-[#C89B5E]">.</span>
          </h2>
          <p className="text-white/40 text-[15px] mt-4 max-w-[520px] mx-auto leading-relaxed">
            From J&K Police to universities, government hospitals to defence forces — institutions across the valley rely on MDF.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {clients.map((client, i) => (
            <ClientCard key={client.id} client={client} index={i} />
          ))}
        </div>

        <motion.p
          className="text-center text-white/25 text-[13px] mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          And many more institutions across every district of J&K.
        </motion.p>

      </div>
    </section>
  )
}
