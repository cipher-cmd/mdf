'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface InfiniteMarqueeProps {
  children: ReactNode
  speed?: number
  direction?: 'left' | 'right'
  pauseOnHover?: boolean
  className?: string
}

export function InfiniteMarquee({
  children,
  speed = 30,
  direction = 'left',
  pauseOnHover = true,
  className,
}: InfiniteMarqueeProps) {
  const animName = direction === 'left' ? 'mdf-marquee-left' : 'mdf-marquee-right'

  return (
    <div
      className={cn('overflow-hidden', className)}
      style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)' }}
    >
      <div
        className={cn('flex w-max mdf-marquee', pauseOnHover && 'mdf-marquee-hover')}
        style={{
          animation: `${animName} ${speed}s linear infinite`,
          willChange: 'transform',
        }}
      >
        <div className="flex items-center">{children}</div>
        <div className="flex items-center" aria-hidden>{children}</div>
      </div>
    </div>
  )
}
