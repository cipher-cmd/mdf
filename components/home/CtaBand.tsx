'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { Phone, EnvelopeSimple, WhatsappLogo, PaperPlaneTilt, CheckCircle, Clock, SealCheck } from '@phosphor-icons/react'
import { EASE } from '@/lib/animation'
import { useCopy, useWhatsApp } from '@/providers/SiteProvider'
import { lines, telHref } from '@/lib/content/copy'

const inputClass =
  'w-full bg-white border border-[#D9D9D9] hover:border-[#BDBDBD] focus:border-[#8B6B23] focus:ring-4 focus:ring-[#CCA552]/20 aria-[invalid=true]:border-[#B4412E] text-[#141414] placeholder:text-[#8A857E] text-[16px] sm:text-[14px] px-3.5 py-2.5 rounded-[12px] outline-none transition-colors'
const labelClass = 'block text-[13px] font-medium text-[#3F3A34] mb-1'
const errorClass = 'mt-1 text-[12.5px] text-[#B4412E]'

const emptyForm = { name: '', phone: '', message: '' }
type Field = keyof typeof emptyForm
type Errors = Partial<Record<Field, string>>

function validate(form: typeof emptyForm): Errors {
  const errors: Errors = {}
  if (!form.name.trim()) errors.name = 'Add your name so we know who to reply to.'
  const digits = form.phone.replace(/\D/g, '')
  if (form.phone.trim() && (digits.length < 10 || digits.length > 13)) errors.phone = 'Enter a 10-digit mobile number, with or without +91.'
  if (!form.message.trim()) errors.message = 'Tell us what you need, even one line helps.'
  return errors
}

export function CtaBand() {
  const copy = useCopy('contact_section')
  const contact = useCopy('contact')
  const whatsapp = useWhatsApp()
  const contactRows = [
    { icon: Phone, label: 'Call', value: contact.phone_display, href: telHref(contact.phone_display) },
    { icon: WhatsappLogo, label: 'WhatsApp', value: copy.whatsapp_line, href: whatsapp() },
    { icon: EnvelopeSimple, label: 'Email', value: copy.email_line, href: `mailto:${contact.email}` },
  ]
  const [form, setForm] = useState(emptyForm)
  const [needs, setNeeds] = useState<string[]>([])
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const toggleNeed = (c: string) => setNeeds(prev => (prev.includes(c) ? prev.filter(n => n !== c) : [...prev, c]))

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const name = e.target.name as Field
    setForm(prev => ({ ...prev, [name]: e.target.value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const found = validate(form)
    setErrors(found)
    const first = (Object.keys(emptyForm) as Field[]).find(k => found[k])
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    const message = [
      `Hi ${contact.business_name},`,
      '',
      `Name: ${form.name}`,
      form.phone && `Phone: ${form.phone}`,
      needs.length > 0 && `Looking for: ${needs.join(', ')}`,
      '',
      form.message,
    ].filter((l): l is string => typeof l === 'string')
    const url = whatsapp(message.join('\n'))
    const tab = window.open(url, '_blank')
    if (tab) tab.opener = null
    else window.location.href = url // popup blocked: open WhatsApp in this tab instead of losing the enquiry
    setSent(true)
  }

  const field = (name: Field) => ({
    name,
    id: `quote-${name}`,
    value: form[name],
    onChange: handleChange,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `quote-${name}-error` : undefined,
    className: inputClass,
  })
  const fieldError = (name: Field) =>
    errors[name] && <p id={`quote-${name}-error`} className={errorClass}>{errors[name]}</p>

  return (
    <section id="contact" className="relative w-full bg-[#F7F7F7] overflow-hidden py-16 sm:py-20 md:py-24">

      {/* Panoramic Dal Lake finale: letsBuildBg.png, washed only behind the copy */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-feather">
        <Image src="/BG/letsBuildBg.png" alt="Houseboats on Dal Lake below snow-capped mountains" fill className="object-cover object-center opacity-90 select-none" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-[#F7F7F7]/92 via-[#F7F7F7]/70 to-[#F7F7F7]/25" />
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px] gap-10 lg:gap-20 items-center">

          {/* Left: invitation + direct lines */}
          <div>
            <h2 className="text-[34px] sm:text-[42px] lg:text-[48px] font-bold text-[#141414] leading-[1.02] mb-4 font-serif-heading">
              {lines(copy.heading).map((l, i) => <span key={i}>{i > 0 && <br />}{l}</span>)}
            </h2>
            <p className="text-[#443E38] text-[16px] leading-[1.65] mb-8 max-w-[440px]">
              {copy.text}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px rounded-[18px] overflow-hidden border border-[#E5E5E5] bg-[#E5E5E5] max-w-[600px]">
              {contactRows.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer' : undefined}
                  className="group flex sm:flex-col items-center sm:items-start gap-3 sm:gap-2 p-3.5 sm:p-4 bg-white hover:bg-[#F4F4F4] transition-colors min-w-0"
                >
                  <Icon size={18} weight={label === 'WhatsApp' ? 'fill' : 'regular'} className={label === 'WhatsApp' ? 'text-[#25D366] flex-shrink-0' : 'text-[#8B6B23] flex-shrink-0'} />
                  <span className="min-w-0">
                    <span className="block text-[12px] text-[#6B6359]">{label}</span>
                    <span className="block text-[14px] font-semibold text-[#141414] group-hover:text-[#8B6B23] transition-colors truncate" title={value}>{value}</span>
                  </span>
                </a>
              ))}
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-5 text-[13px] font-medium text-[#5E564B]">
              <span className="inline-flex items-center gap-1.5"><Clock size={16} className="text-[#8B6B23]" />{copy.note_reply}</span>
              <span className="inline-flex items-center gap-1.5"><SealCheck size={16} className="text-[#8B6B23]" />{copy.note_trust}</span>
            </div>
          </div>

          {/* Right: compact quote card, sends a pre-filled WhatsApp message */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            className="relative w-full max-w-[460px] lg:max-w-none mx-auto bg-white rounded-[24px] border border-[#E5E5E5] shadow-[0_16px_40px_-28px_rgba(0,0,0,0.3)] p-5 sm:p-6"
          >
            <AnimatePresence mode="wait" initial={false}>
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="py-8 text-center flex flex-col items-center"
                  role="status"
                >
                  <CheckCircle size={40} weight="fill" className="text-[#17713F] mb-3" />
                  <h3 className="text-[22px] font-bold text-[#141414] font-serif-heading leading-tight">{copy.success_title}</h3>
                  <p className="text-[14px] text-[#6B6359] mt-1 max-w-[280px]">{copy.success_text}</p>
                  <button
                    type="button"
                    onClick={() => { setSent(false); setForm(emptyForm); setNeeds([]) }}
                    className="mt-4 min-h-[44px] text-[14px] font-semibold text-[#8B6B23] hover:text-[#6E5418] underline underline-offset-4"
                  >
                    {copy.again_link}
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3.5"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-[22px] font-bold text-[#141414] font-serif-heading leading-tight">{copy.form_title}</h3>
                    <span className="inline-flex items-center gap-1 text-[12px] font-medium text-[#6B6359]">
                      <WhatsappLogo size={14} weight="fill" className="text-[#25D366]" /> via WhatsApp
                    </span>
                  </div>

                  <fieldset>
                    <legend className={labelClass}>What do you need?</legend>
                    <div className="flex flex-wrap gap-1.5">
                      {copy.options.map(c => {
                        const on = needs.includes(c)
                        return (
                          <button
                            key={c}
                            type="button"
                            aria-pressed={on}
                            onClick={() => toggleNeed(c)}
                            className={`px-3 min-h-[40px] sm:min-h-[34px] rounded-full text-[13px] font-medium border transition-colors ${
                              on
                                ? 'bg-[#141414] border-[#141414] text-white'
                                : 'bg-white border-[#D9D9D9] text-[#4E473E] hover:border-[#8B6B23]'
                            }`}
                          >
                            {c}
                          </button>
                        )
                      })}
                    </div>
                  </fieldset>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="quote-name" className={labelClass}>Name</label>
                      <input {...field('name')} placeholder={copy.name_placeholder} autoComplete="name" />
                      {fieldError('name')}
                    </div>
                    <div>
                      <label htmlFor="quote-phone" className={labelClass}>Phone <span className="text-[#8A857E] font-normal">(optional)</span></label>
                      <input {...field('phone')} type="tel" inputMode="tel" placeholder={copy.phone_placeholder} autoComplete="tel" />
                      {fieldError('phone')}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="quote-message" className={labelClass}>Requirement</label>
                    <textarea {...field('message')} rows={3} placeholder={copy.message_placeholder} className={`${inputClass} resize-none`} />
                    {fieldError('message')}
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 min-h-[48px] bg-[#CCA552] hover:bg-[#BF9744] active:bg-[#B38A3B] text-[#1E170A] font-semibold text-[14px] rounded-full transition-colors"
                  >
                    <PaperPlaneTilt size={16} weight="bold" />
                    {copy.button}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

        </div>
      </div>
    </section>
  )
}
