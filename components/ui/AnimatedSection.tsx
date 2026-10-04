'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { EASE } from '@/lib/animation'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  once?: boolean
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  y = 24,
  once = true,
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
