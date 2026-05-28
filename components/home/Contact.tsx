'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { EASE } from '@/lib/animation'
import { Send, Phone, MapPin } from 'lucide-react'

const WA_SVG = (
  <svg className="w-4 h-4 text-[#C89B5E]" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
)

const enquiryCategories = [
  'Cricket Equipment',
  'Sports Uniforms / Jerseys',
  'Fitness Equipment',
  'Musical Instruments',
  'Awards & Trophies',
  'Installation / Service',
  'GeM / Tender',
  'Other',
]

export function Contact() {
  const [form, setForm] = useState({ name: '', institution: '', category: '', message: '' })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const text = `Hi MDF Enterprises,\n\nName: ${form.name}\nInstitution / Organisation: ${form.institution}\nEnquiry Category: ${form.category}\n\nMessage:\n${form.message}`
    window.open(`https://wa.me/917006252334?text=${encodeURIComponent(text)}`, '_blank', 'noreferrer')
  }

  const inputClass = 'w-full bg-[#111] border border-white/[0.08] focus:border-[#C89B5E]/50 text-white placeholder-white/20 text-[14px] px-4 py-3.5 rounded-lg outline-none transition-colors duration-200'

  return (
    <section id="contact" className="bg-[#050505] py-20 md:py-28">
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p className="overline-gold mb-6">Get in Touch</p>
            <h2
              className="text-[40px] md:text-[52px] font-medium text-white leading-[1.05] mb-6"
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              Let&apos;s Discuss<br />
              Your Requirements<span className="text-[#C89B5E]">.</span>
            </h2>
            <p className="text-white/45 text-[15px] leading-relaxed mb-10 max-w-[380px]">
              Whether you&apos;re equipping a school, procuring through GeM, or need installation support — we respond within 24 hours.
            </p>

            <div className="space-y-5">
              <a href="tel:+917006252334" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-lg border border-white/[0.08] group-hover:border-[#C89B5E]/30 flex items-center justify-center transition-colors duration-200">
                  <Phone size={16} className="text-[#C89B5E]" />
                </div>
                <div>
                  <p className="text-[11px] text-white/30 font-medium uppercase tracking-[0.1em] mb-0.5">Phone</p>
                  <p className="text-white text-[14px] font-medium group-hover:text-[#C89B5E] transition-colors duration-200">+91 70062 52334</p>
                </div>
              </a>

              <a
                href="https://wa.me/917006252334"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-lg border border-white/[0.08] group-hover:border-[#C89B5E]/30 flex items-center justify-center transition-colors duration-200">
                  {WA_SVG}
                </div>
                <div>
                  <p className="text-[11px] text-white/30 font-medium uppercase tracking-[0.1em] mb-0.5">WhatsApp</p>
                  <p className="text-white text-[14px] font-medium group-hover:text-[#C89B5E] transition-colors duration-200">Chat with us now</p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg border border-white/[0.08] flex items-center justify-center">
                  <MapPin size={16} className="text-[#C89B5E]" />
                </div>
                <div>
                  <p className="text-[11px] text-white/30 font-medium uppercase tracking-[0.1em] mb-0.5">Address</p>
                  <p className="text-white text-[14px] font-medium">SDA Shopping Complex, Opp. Iqbal Park</p>
                  <p className="text-white/40 text-[13px]">Srinagar, J&K — 190008</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg border border-white/[0.08] flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#C89B5E]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] text-white/30 font-medium uppercase tracking-[0.1em] mb-0.5">Email</p>
                  <a href="mailto:mdfenterprisesjk@gmail.com" className="text-white text-[14px] font-medium hover:text-[#C89B5E] transition-colors">
                    mdfenterprisesjk@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
            className="bg-[#0f0f0f] border border-white/[0.06] rounded-2xl p-8 space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-[10px] font-bold tracking-[0.15em] uppercase text-white/40 mb-2">Your Name</label>
                <input id="name" name="name" type="text" required placeholder="e.g. Dr. Tariq Ahmad" className={inputClass} value={form.name} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="institution" className="block text-[10px] font-bold tracking-[0.15em] uppercase text-white/40 mb-2">Institution / Organisation</label>
                <input id="institution" name="institution" type="text" placeholder="e.g. Govt. Degree College" className={inputClass} value={form.institution} onChange={handleChange} />
              </div>
            </div>

            <div>
              <label htmlFor="category" className="block text-[10px] font-bold tracking-[0.15em] uppercase text-white/40 mb-2">Enquiry Category</label>
              <select id="category" name="category" className={inputClass} value={form.category} onChange={handleChange}>
                <option value="" disabled>Select a category…</option>
                {enquiryCategories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-[10px] font-bold tracking-[0.15em] uppercase text-white/40 mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder="Tell us about your requirement — quantity, timeline, budget…"
                className={`${inputClass} resize-none`}
                value={form.message}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn-gold w-full justify-center py-4 text-[13px]">
              <Send size={15} />
              Send via WhatsApp
            </button>

            <p className="text-[11px] text-white/25 text-center leading-relaxed">
              Opens a pre-filled WhatsApp message. We respond within 24 hours.
            </p>
          </motion.form>

        </div>
      </div>
    </section>
  )
}
