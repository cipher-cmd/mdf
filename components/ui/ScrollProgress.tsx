'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export function ScrollProgress() {
  const rawProgress = useMotionValue(0)
  const smoothed = useSpring(rawProgress, { stiffness: 400, damping: 50 })
  const scaleX = useTransform(smoothed, [0, 100], [0, 1])

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      rawProgress.set(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [rawProgress])

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9997] h-[2px] w-full origin-left pointer-events-none"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #C89B5E 0%, #D7AE75 50%, #FF6B00 100%)',
      }}
      aria-hidden
    />
  )
}
