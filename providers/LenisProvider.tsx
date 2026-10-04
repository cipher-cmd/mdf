'use client'

import Lenis from 'lenis'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { setLenis, scrollToId } from '@/lib/scroll'

export function LenisProvider({ children }: { children: React.ReactNode }) {
  // The store-manager panel keeps native scrolling (forms, drawers, long lists)
  const isAdmin = usePathname()?.startsWith('/admin') ?? false

  useEffect(() => {
    // Skip Lenis on touch/mobile — native scroll is faster there
    if (isAdmin || window.matchMedia('(hover: none) and (pointer: coarse)').matches) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    setLenis(lenis)

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      setLenis(null)
      lenis.destroy()
    }
  }, [isAdmin])

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

  return <>{children}</>
}
