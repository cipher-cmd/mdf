'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { Phone, EnvelopeSimple, WhatsappLogo, PaperPlaneTilt, CheckCircle, Clock, SealCheck } from '@phosphor-icons/react'
import { EASE } from '@/lib/animation'

const enquiryCategories = ['Sports', 'Fitness', 'Music', 'Awards', 'Installation', 'GeM']

const contactRows = [
  { icon: Phone,          label: 'Call',     value: '+91 70062 52334',            href: 'tel:+917006252334' },
  { icon: WhatsappLogo,   label: 'WhatsApp', value: 'Chat with us now',           href: 'https://wa.me/917006252334' },
  { icon: EnvelopeSimple, label: 'Email',    value: 'Write to us',                href: 'mailto:mdfenterprisesjk@gmail.com' },
]

const inputClass =
  'w-full bg-white/90 border border-[#E6DCCB] hover:border-[#D6C6A4] focus:border-[#CCA552] focus:bg-white focus:ring-4 focus:ring-[#CCA552]/15 text-[#141414] placeholder:text-[#A9A090] text-[13.5px] px-3.5 py-2.5 rounded-[12px] outline-none transition-all duration-200'

const emptyForm = { name: '', phone: '', message: '' }

export function CtaBand() {
  const [form, setForm] = useState(emptyForm)
  const [needs, setNeeds] = useState<string[]>([])
  const [sent, setSent] = useState(false)

  const toggleNeed = (c: string) => setNeeds(prev => (prev.includes(c) ? prev.filter(n => n !== c) : [...prev, c]))

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const lines = [
      'Hi MDF Enterprises,',
      '',
      `Name: ${form.name}`,
      form.phone && `Phone: ${form.phone}`,
      needs.length > 0 && `Looking for: ${needs.join(', ')}`,
      '',
      form.message,
    ].filter((l): l is string => typeof l === 'string')
    window.open(`https://wa.me/917006252334?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noreferrer')
    setSent(true)
  }

  return (
    <section id="contact" className="relative w-full bg-[#FAF8F5] overflow-hidden py-16 sm:py-20 md:py-24">

      {/* Panoramic Dal Lake finale: letsBuildBg.png */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-feather">
        <Image src="/BG/letsBuildBg.png" alt="" fill className="object-cover object-center opacity-90 select-none" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-[#FAF8F5]/92 via-[#FAF8F5]/70 to-[#FAF8F5]/25" />
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px] gap-10 lg:gap-20 items-center">

          {/* Left: invitation + direct lines */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <p className="text-[11px] tracking-[0.2em] font-semibold text-[#8B6B23] uppercase mb-2">
              — LET&apos;S BUILD A STRONGER TOMORROW
            </p>
            <h2 className="text-[34px] sm:text-[42px] lg:text-[48px] font-bold text-[#141414] leading-[1.02] mb-4 font-serif-heading">
              Ready to Equip<br />Your Space?
            </h2>
            <p className="text-[#443E38] text-[15px] sm:text-[14.5px] leading-[1.65] mb-8 max-w-[440px]">
              A school sports room, a full gym fit-out or a GeM order — tell us what you need and get expert advice with end-to-end support.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px rounded-[18px] overflow-hidden border border-[#EADFC9] bg-[#EADFC9] max-w-[600px] shadow-[0_12px_30px_-20px_rgba(60,45,20,0.35)]">
              {contactRows.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer' : undefined}
                  className="group flex sm:flex-col items-center sm:items-start gap-3 sm:gap-2.5 p-3.5 sm:p-4 bg-white/85 backdrop-blur-sm hover:bg-white transition-colors min-w-0"
                >
                  <span className="w-9 h-9 rounded-full border border-[#E1CFA5] bg-[#FAF5EB] flex items-center justify-center text-[#9E7422] group-hover:bg-[#CCA552] group-hover:text-white group-hover:border-[#CCA552] transition-colors duration-300 flex-shrink-0">
                    <Icon size={16} weight={label === 'WhatsApp' ? 'fill' : 'duotone'} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[9.5px] font-bold tracking-[0.18em] uppercase text-[#A88B4F]">{label}</span>
                    <span className="block text-[13px] font-semibold text-[#141414] group-hover:text-[#8B6B23] transition-colors truncate">{value}</span>
                  </span>
                </a>
              ))}
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-5 text-[12px] font-medium text-[#5E564B]">
              <span className="inline-flex items-center gap-1.5"><Clock size={15} weight="duotone" className="text-[#9E7422]" />Reply within 24 hours</span>
              <span className="inline-flex items-center gap-1.5"><SealCheck size={15} weight="duotone" className="text-[#9E7422]" />GeM registered · MSME certified</span>
            </div>
          </motion.div>

          {/* Right: compact quote card → pre-filled WhatsApp */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
            className="relative w-full max-w-[460px] lg:max-w-none mx-auto bg-white/80 backdrop-blur-xl rounded-[24px] border border-white/80 shadow-[0_30px_60px_-28px_rgba(60,45,20,0.35),0_1px_2px_rgba(0,0,0,0.04)] p-5 sm:p-6"
          >
            <AnimatePresence mode="wait" initial={false}>
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="py-8 text-center flex flex-col items-center"
                >
                  <motion.span
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
                    className="w-14 h-14 rounded-full bg-[#EAF7EF] border border-[#BFE6CD] flex items-center justify-center text-[#17713F] mb-3"
                  >
                    <CheckCircle size={30} weight="fill" />
                  </motion.span>
                  <h3 className="text-[22px] font-bold text-[#141414] font-serif-heading leading-tight">Enquiry ready on WhatsApp</h3>
                  <p className="text-[12.5px] text-[#6B6359] mt-1 max-w-[280px]">Press send in WhatsApp — our team replies within 24 hours.</p>
                  <button
                    type="button"
                    onClick={() => { setSent(false); setForm(emptyForm); setNeeds([]) }}
                    className="mt-4 text-[12.5px] font-semibold text-[#8B6B23] hover:text-[#A47E28] underline underline-offset-4 decoration-[#D9C49A]"
                  >
                    Send another enquiry
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-3"
                >
                  <div className="flex items-baseline justify-between gap-3 pb-1">
                    <h3 className="text-[22px] font-bold text-[#141414] font-serif-heading leading-tight">Quick Quote</h3>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#6B6359]">
                      <WhatsappLogo size={13} weight="fill" className="text-[#25D366]" /> via WhatsApp
                    </span>
                  </div>

                  <fieldset>
                    <legend className="sr-only">What do you need?</legend>
                    <div className="flex flex-wrap gap-1.5">
                      {enquiryCategories.map(c => {
                        const on = needs.includes(c)
                        return (
                          <button
                            key={c}
                            type="button"
                            aria-pressed={on}
                            onClick={() => toggleNeed(c)}
                            className={`px-2.5 py-1 rounded-full text-[11.5px] font-medium border transition-all duration-200 ${
                              on
                                ? 'bg-[#141414] border-[#141414] text-white'
                                : 'bg-white/80 border-[#E2D8C7] text-[#4E473E] hover:border-[#CCA552]'
                            }`}
                          >
                            {c}
                          </button>
                        )
                      })}
                    </div>
                  </fieldset>

                  <div className="grid grid-cols-2 gap-2.5">
                    <label className="block">
                      <span className="sr-only">Your name</span>
                      <input name="name" required placeholder="Your name" autoComplete="name" className={inputClass} value={form.name} onChange={handleChange} />
                    </label>
                    <label className="block">
                      <span className="sr-only">Phone (optional)</span>
                      <input name="phone" type="tel" inputMode="tel" placeholder="Phone (optional)" autoComplete="tel" className={inputClass} value={form.phone} onChange={handleChange} />
                    </label>
                  </div>

                  <label className="block">
                    <span className="sr-only">Requirement</span>
                    <textarea
                      name="message"
                      required
                      rows={2}
                      placeholder="Items, quantity, institution…"
                      className={`${inputClass} resize-none`}
                      value={form.message}
                      onChange={handleChange}
                    />
                  </label>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#CCA552] hover:bg-[#BF9744] text-[#1E170A] font-semibold text-[13.5px] rounded-full shadow-[0_10px_24px_-12px_rgba(204,165,82,0.9)] hover:-translate-y-px transition-all group"
                  >
                    <PaperPlaneTilt size={15} weight="bold" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    Send Enquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>

        </div>
      </div>
    </section>
  )
}
