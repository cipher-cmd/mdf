'use client'

import { useEffect, useRef } from 'react'
import { useInView, animate } from 'framer-motion'
import { EASE } from '@/lib/animation'

interface CountUpProps {
  target: number
  suffix?: string
  /** Where the count starts, as a fraction of target. A short, settling climb reads more precise than racing up from 0. */
  startAt?: number
}

const format = (v: number, suffix: string) => Math.round(v).toLocaleString('en-IN') + suffix

export function CountUp({ target, suffix = '', startAt = 0.8 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const from = Math.round(target * startAt)

  useEffect(() => {
    if (!inView) return
    const controls = animate(from, target, {
      duration: 1.8,
      ease: EASE,
      onUpdate(value) {
        if (ref.current) ref.current.textContent = format(value, suffix)
      },
    })
    return () => controls.stop()
  }, [inView, from, target, suffix])

  // The invisible final value reserves the width, so nothing beside the number shifts while it counts.
  return (
    <span className="inline-grid" style={{ fontVariantNumeric: 'lining-nums tabular-nums' }} aria-label={format(target, suffix)}>
      <span className="invisible col-start-1 row-start-1" aria-hidden>{format(target, suffix)}</span>
      <span ref={ref} className="col-start-1 row-start-1" aria-hidden>{format(from, suffix)}</span>
    </span>
  )
}
