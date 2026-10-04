'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { EASE } from '@/lib/animation'

const ROW = 1.15 // em — height of one digit cell
const STRIP = Array.from({ length: 20 }, (_, i) => i % 10) // 0-9 twice, so every digit rolls a full turn

function Digit({ digit, go, delay }: { digit: number; go: boolean; delay: number }) {
  return (
    <span
      className="relative inline-block overflow-hidden align-bottom"
      style={{
        height: `${ROW}em`,
        maskImage: 'linear-gradient(transparent, #000 22%, #000 78%, transparent)',
        WebkitMaskImage: 'linear-gradient(transparent, #000 22%, #000 78%, transparent)',
      }}
    >
      {/* Invisible copy sets the column width */}
      <span className="invisible block" style={{ lineHeight: `${ROW}em` }}>{digit}</span>
      <motion.span
        className="absolute inset-x-0 top-0 flex flex-col"
        initial={{ y: 0 }}
        animate={go ? { y: `-${(10 + digit) * ROW}em` } : undefined}
        transition={{ duration: 2, delay, ease: EASE }}
      >
        {STRIP.map((n, i) => (
          <span key={i} className="block text-center" style={{ height: `${ROW}em`, lineHeight: `${ROW}em` }}>{n}</span>
        ))}
      </motion.span>
    </span>
  )
}

/** Mechanical-counter style number: each digit rolls into place, rightmost first. */
export function Odometer({ value, suffix = '', className }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const go = useInView(ref, { once: true, margin: '-40px' })
  const text = value.toLocaleString('en-IN')
  const digits = text.replace(/\D/g, '').length
  let seen = 0

  return (
    <span
      ref={ref}
      className={`inline-flex items-end ${className ?? ''}`}
      style={{ fontVariantNumeric: 'lining-nums tabular-nums' }}
      aria-label={text + suffix}
      role="img"
    >
      {text.split('').map((ch, i) => {
        if (!/\d/.test(ch)) return <span key={i} aria-hidden style={{ lineHeight: `${ROW}em` }}>{ch}</span>
        const order = digits - 1 - seen++
        return <Digit key={i} digit={Number(ch)} go={go} delay={0.15 + order * 0.12} />
      })}
      {suffix && (
        <motion.span
          aria-hidden
          initial={{ opacity: 0, x: -4 }}
          animate={go ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.6, delay: 1.4, ease: EASE }}
          className="text-[#C59B27] text-[0.62em] self-start ml-[0.08em] font-normal"
          style={{ lineHeight: 1, marginTop: '0.12em' }}
        >
          {suffix}
        </motion.span>
      )}
    </span>
  )
}
