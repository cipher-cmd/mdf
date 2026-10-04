'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * default — small ink dot + soft gold ring trailing behind
 * hover   — over links/buttons: ring opens up and tints gold, dot melts away
 * view    — over [data-cursor="view"] image cards: solid gold disc reading "VIEW"
 * native  — over text fields: get out of the way and let the real caret show
 */
type CursorState = 'default' | 'hover' | 'view' | 'native'

const RING: Record<CursorState, number> = { default: 30, hover: 52, view: 84, native: 0 }
const DOT: Record<CursorState, number> = { default: 6, hover: 4, view: 0, native: 0 }

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [state, setState] = useState<CursorState>('default')
  const [visible, setVisible] = useState(false)
  const [pressed, setPressed] = useState(false)

  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const sync = () => setEnabled(fine.matches)
    sync()
    fine.addEventListener('change', sync)
    return () => fine.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const root = document.documentElement
    root.classList.add('has-custom-cursor')

    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min(now - last, 50)
      last = now
      // Frame-rate independent easing — same trailing feel at 60Hz and 144Hz
      const k = 1 - Math.pow(0.0008, dt / 1000 * 2.2)
      ring.current.x += (mouse.current.x - ring.current.x) * k
      ring.current.y += (mouse.current.y - ring.current.y) * k
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      setVisible(true)
    }
    const onOver = (e: MouseEvent) => {
      const el = e.target as Element | null
      if (!el?.closest) return
      if (el.closest('input, textarea, select, [contenteditable="true"]')) setState('native')
      else if (el.closest('[data-cursor="view"]')) setState('view')
      else if (el.closest('a, button, [role="button"], label, summary')) setState('hover')
      else setState('default')
    }
    const onLeave = () => setVisible(false)
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('blur', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      root.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('blur', onLeave)
    }
  }, [enabled])

  if (!enabled) return null

  const size = RING[state] * (pressed ? 0.86 : 1)
  const show = visible && state !== 'native'

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full flex items-center justify-center"
        style={{
          width: size,
          height: size,
          opacity: show ? 1 : 0,
          border: state === 'view' ? '1px solid #CCA552' : state === 'hover' ? '1px solid rgba(160,122,40,0.75)' : '1px solid rgba(139,107,35,0.4)',
          backgroundColor: state === 'view' ? 'rgba(204,165,82,0.92)' : state === 'hover' ? 'rgba(204,165,82,0.14)' : 'transparent',
          backdropFilter: state === 'view' ? 'blur(4px)' : undefined,
          boxShadow: state === 'view' ? '0 12px 30px -10px rgba(120,90,30,0.55)' : 'none',
          transition:
            'width .45s cubic-bezier(.16,1,.3,1), height .45s cubic-bezier(.16,1,.3,1), background-color .3s ease, border-color .3s ease, box-shadow .3s ease, opacity .25s ease',
          willChange: 'transform',
        }}
      >
        <span
          className="text-[10px] font-bold tracking-[0.22em] text-[#1E170A] select-none"
          style={{
            opacity: state === 'view' ? 1 : 0,
            transform: state === 'view' ? 'scale(1)' : 'scale(0.6)',
            transition: 'opacity .25s ease, transform .4s cubic-bezier(.16,1,.3,1)',
          }}
        >
          VIEW
        </span>
      </div>
      <div
        ref={dotRef}
        aria-hidden
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-[#1E170A]"
        style={{
          width: DOT[state],
          height: DOT[state],
          opacity: show ? 1 : 0,
          boxShadow: '0 0 0 1.5px rgba(250,248,245,0.85)',
          transition: 'width .25s ease, height .25s ease, opacity .2s ease',
          willChange: 'transform',
        }}
      />
    </>
  )
}
