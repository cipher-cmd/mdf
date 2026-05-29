'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function Preloader() {
  const [visible, setVisible] = useState(true)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), shouldReduce ? 0 : 350)
    return () => clearTimeout(t)
  }, [shouldReduce])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ pointerEvents: 'none' }}
        >
          <div className="flex flex-col items-center gap-5">

            {/* MDF letters */}
            <div className="flex items-end gap-0.5 select-none">
              {['M', 'D', 'F'].map((letter, i) => (
                <motion.span
                  key={letter}
                  initial={shouldReduce ? {} : { opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.09, duration: 0.55, ease: EASE }}
                  className="text-[80px] font-bold text-white leading-none tracking-tight"
                  style={{ fontFamily: 'var(--font-cormorant), serif' }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Gold underline */}
            <motion.div
              className="h-[1.5px] bg-[#C89B5E] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '72px' }}
              transition={{ delay: 0.38, duration: 0.55, ease: EASE }}
            />

            {/* Tagline — below the line, not through it */}
            <motion.p
              className="text-[8.5px] font-bold tracking-[0.4em] uppercase text-white/28"
              initial={shouldReduce ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              Since 1997 &nbsp;·&nbsp; Srinagar
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
