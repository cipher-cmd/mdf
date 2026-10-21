'use client'

import { MotionConfig } from 'framer-motion'
import { useEffect } from 'react'
import { scrollToId } from '@/lib/scroll'

export function MotionProvider({ children }: { children: React.ReactNode }) {
  // Same-page links ("/#about", "/") glide instead of jumping. Runs in the capture
  // phase so Next's <Link> sees defaultPrevented and skips its own instant scroll.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as Element).closest('a')
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return
      const url = new URL(a.href, window.location.href)
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return
      if (scrollToId(decodeURIComponent(url.hash.slice(1)))) e.preventDefault()
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  // reducedMotion="user": framer drops transform animations when the OS asks for less motion
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
