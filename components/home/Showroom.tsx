'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, type Variants } from 'framer-motion'
import Image from 'next/image'
import { MapPin, Clock, ArrowRight, WhatsappLogo } from '@phosphor-icons/react'
import { EASE } from '@/lib/animation'
import { useCopy, useWhatsApp } from '@/providers/SiteProvider'
import { shopStatus, type SiteCopy } from '@/lib/content/copy'

/** Live open/closed status in Srinagar time. Computed on the client only, so SSR never shows a stale state. */
function useShowroomStatus(contact: SiteCopy['contact']) {
  const [status, setStatus] = useState<{ open: boolean; label: string } | null>(null)
  useEffect(() => {
    const update = () => setStatus(shopStatus(contact))
    update()
    const id = window.setInterval(update, 60_000)
    return () => window.clearInterval(id)
  }, [contact])
  return status
}

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}
const rise: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

const photoMask =
  '[mask-image:linear-gradient(to_bottom,transparent,#000_10%,#000_90%,transparent),linear-gradient(to_right,#000_0%,#000_55%,rgba(0,0,0,0.85)_68%,rgba(0,0,0,0.5)_80%,rgba(0,0,0,0.18)_92%,transparent_100%)] [mask-composite:intersect] [-webkit-mask-image:linear-gradient(to_bottom,transparent,#000_10%,#000_90%,transparent),linear-gradient(to_right,#000_0%,#000_55%,rgba(0,0,0,0.85)_68%,rgba(0,0,0,0.5)_80%,rgba(0,0,0,0.18)_92%,transparent_100%)] [-webkit-mask-composite:source-in]'

export function Showroom() {
  const copy = useCopy('home_showroom')
  const contact = useCopy('contact')
  const whatsapp = useWhatsApp()
  const status = useShowroomStatus(contact)
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const photoY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  // Triggered from the section: a fully clipped element never registers as "in view" by itself
  const revealed = useInView(sectionRef, { once: true, margin: '-120px' })

  return (
    <section ref={sectionRef} id="showroom" className="relative w-full bg-[#FAF8F5] overflow-hidden">

      {/* Background sketch on the right */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-feather">
        <Image
          src="/BG/ourShowroomBg.png"
          alt=""
          fill
          className="object-cover object-right opacity-75 select-none"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5] via-45% via-[#FAF8F5]/80 via-70% to-transparent" />
      </div>

      {/* Desktop photo: wipes in from the left, then drifts gently with scroll */}
      <motion.div
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={revealed ? { clipPath: 'inset(0 0% 0 0)' } : undefined}
        transition={{ duration: 1.4, ease: EASE }}
        className={`hidden lg:block absolute left-0 top-0 bottom-0 w-[47%] xl:w-[49%] z-10 pointer-events-none overflow-hidden ${photoMask}`}
      >
        <motion.div style={{ y: photoY }} className="absolute -inset-y-[8%] inset-x-0">
          <motion.div
            initial={{ scale: 1.15 }}
            animate={revealed ? { scale: 1 } : undefined}
            transition={{ duration: 2, ease: EASE }}
            className="absolute inset-0"
          >
            <Image src={copy.photo} alt="MDF Enterprises Srinagar showroom" fill className="object-cover object-center" sizes="50vw" />
          </motion.div>
        </motion.div>
        <div className="absolute inset-y-0 right-0 w-44 xl:w-56 bg-gradient-to-r from-transparent via-[#FAF8F5]/30 to-[#FAF8F5]" />
      </motion.div>

      <div className="relative z-20 max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10 py-12 sm:py-14 md:py-20">
        <div className="lg:ml-auto lg:w-[52%] xl:w-[50%]">

          {/* Mobile photo */}
          <motion.div
            initial={{ clipPath: 'inset(8% 8% 8% 8% round 18px)', opacity: 0.4 }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 18px)', opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 1.1, ease: EASE }}
            className="lg:hidden relative aspect-[16/10] w-full rounded-[18px] overflow-hidden mb-6 shadow-[0_14px_34px_-14px_rgba(60,45,20,0.3)]"
          >
            <Image src={copy.photo} alt="MDF Enterprises Srinagar showroom" fill className="object-cover" sizes="100vw" />
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="max-w-[480px]"
          >
            <motion.div variants={rise} className="flex items-center gap-3 mb-2">
              <p className="text-[11px] tracking-[0.2em] font-semibold text-[#8B6B23] uppercase">— {copy.eyebrow}</p>
              {status && (
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold border ${
                    status.open ? 'bg-[#EAF7EF] border-[#BFE6CD] text-[#17713F]' : 'bg-[#F7F1E4] border-[#EADBBD] text-[#7A5E22]'
                  }`}
                >
                  <span className="relative flex w-1.5 h-1.5">
                    {status.open && <span className="absolute inset-0 rounded-full bg-[#25B062] animate-ping opacity-70" />}
                    <span className={`relative w-1.5 h-1.5 rounded-full ${status.open ? 'bg-[#25B062]' : 'bg-[#C59B27]'}`} />
                  </span>
                  {status.label}
                </span>
              )}
            </motion.div>

            <motion.h2 variants={rise} className="text-[30px] sm:text-[34px] lg:text-[40px] font-bold text-[#141414] leading-[1.06] mb-2.5 font-serif-heading">
              {copy.heading}
            </motion.h2>
            <motion.p variants={rise} className="text-[#554E46] text-[15px] sm:text-[14px] leading-[1.6] mb-5">
              {copy.text}
            </motion.p>

            <motion.div
              variants={rise}
              className="grid grid-cols-1 sm:grid-cols-2 gap-px rounded-[18px] overflow-hidden border border-[#EADFC9] bg-[#EADFC9] mb-6 shadow-[0_10px_28px_-18px_rgba(60,45,20,0.3)]"
            >
              <div className="flex items-start gap-3 p-4 bg-white/90 backdrop-blur-sm">
                <span className="w-9 h-9 rounded-full bg-[#FAF5EB] border border-[#EADBBD] flex items-center justify-center text-[#9E7422] flex-shrink-0">
                  <MapPin size={17} weight="duotone" />
                </span>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#A88B4F] mb-0.5">Address</p>
                  <p className="text-[13px] font-semibold text-[#181818] leading-snug">{contact.address_line1}</p>
                  <p className="text-[12px] text-[#6B6359] leading-snug mt-0.5">{contact.address_line2}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white/90 backdrop-blur-sm">
                <span className="w-9 h-9 rounded-full bg-[#FAF5EB] border border-[#EADBBD] flex items-center justify-center text-[#9E7422] flex-shrink-0">
                  <Clock size={17} weight="duotone" />
                </span>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#A88B4F] mb-0.5">Hours</p>
                  <p className="text-[13px] font-semibold text-[#181818] leading-snug">{contact.hours_line1}</p>
                  <p className="text-[12px] text-[#6B6359] leading-snug mt-0.5">{contact.hours_line2}</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise} className="flex flex-wrap items-center gap-3">
              <a
                href={contact.maps_link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 pl-5 pr-2 py-2 bg-[#CCA552] hover:bg-[#BF9744] text-[#1E170A] font-semibold text-[13px] rounded-full shadow-[0_8px_20px_-10px_rgba(204,165,82,0.9)] transition-all group"
              >
                <span>{copy.button_directions}</span>
                <span className="w-7 h-7 rounded-full bg-[#1E170A]/10 flex items-center justify-center group-hover:bg-[#1E170A] group-hover:text-[#CCA552] transition-colors">
                  <ArrowRight size={13} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </a>
              <a
                href={whatsapp(`Hi ${contact.business_name}, I would like to visit your showroom.`)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#25D366]/40 bg-white/80 hover:bg-[#E8F8EE] text-[#0F6B42] font-semibold text-[13px] rounded-full transition-all"
              >
                <WhatsappLogo size={16} weight="fill" className="text-[#25D366]" />
                <span>{copy.button_whatsapp}</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
