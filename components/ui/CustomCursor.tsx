'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

type CursorState = 'default' | 'hover' | 'text'

export function CustomCursor() {
  const shouldReduce = useReducedMotion()
  const [state, setState]     = useState<CursorState>('default')
  const [clicking, setClicking] = useState(false)
  const [visible, setVisible]   = useState(false)
  const [mounted, setMounted]   = useState(false)

  // DOM refs — position written directly via RAF, never through React state
  const wrapRef  = useRef<HTMLDivElement>(null)  // ring position wrapper
  const ringRef  = useRef<HTMLDivElement>(null)  // rotating dashed inner ring
  const dotRef   = useRef<HTMLDivElement>(null)  // core dot (exact mouse)
  const labelRef = useRef<HTMLSpanElement>(null) // "VIEW" text

  const mouse  = useRef({ x: -300, y: -300 })
  const smooth = useRef({ x: -300, y: -300 })
  const rafId  = useRef<number>(0)
  const angle  = useRef(0)
  useEffect(() => {
    const handle = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(handle)
  }, [])

  useEffect(() => {
    if (!mounted) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    let last = performance.now()

    const tick = (now: number) => {
      const dt = Math.min(now - last, 50) // cap dt so fast tabs don't jump
      last = now

      // Ease ring toward mouse
      const ease = 1 - Math.pow(0.04, dt / 16)
      smooth.current.x += (mouse.current.x - smooth.current.x) * ease
      smooth.current.y += (mouse.current.y - smooth.current.y) * ease

      // Rotate the inner ring element
      angle.current += (dt / 16) * 0.45  // deg per frame at 60fps
      if (ringRef.current) {
        ringRef.current.style.transform = `rotate(${angle.current}deg)`
      }

      // Position wrappers
      if (wrapRef.current) {
        wrapRef.current.style.transform =
          `translate(calc(${smooth.current.x}px - 50%), calc(${smooth.current.y}px - 50%))`
      }
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(calc(${mouse.current.x}px - 50%), calc(${mouse.current.y}px - 50%))`
      }

      rafId.current = requestAnimationFrame(tick)
    }
    rafId.current = requestAnimationFrame(tick)

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      setVisible(true)
    }
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)
    const onDown  = () => setClicking(true)
    const onUp    = () => setClicking(false)
    const onOver  = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (el.closest('a, button, [role="button"], [data-cursor="pointer"], select, input')) {
        setState('hover')
      } else if (el.closest('p, h1, h2, h3, h4, h5, h6, span, blockquote, li')) {
        setState('text')
      } else {
        setState('default')
      }
    }

    document.addEventListener('mousemove',  onMove,  { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseover',  onOver,  { passive: true })
    document.addEventListener('mousedown',  onDown)
    document.addEventListener('mouseup',    onUp)

    return () => {
      cancelAnimationFrame(rafId.current)
      document.removeEventListener('mousemove',  onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseover',  onOver)
      document.removeEventListener('mousedown',  onDown)
      document.removeEventListener('mouseup',    onUp)
    }
  }, [mounted])

  if (!mounted || shouldReduce) return null

  const isHover = state === 'hover'
  const isText  = state === 'text'

  // Sizes
  const ringSize = clicking ? 26 : isHover ? 56 : isText ? 16 : 34
  const dotSize  = clicking ? 3  : isHover ? 6  : isText ? 2  : 5

  return (
    <>
      {/* ── Ring wrapper (positioned via RAF) ── */}
      <div
        ref={wrapRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0, left: 0,
          zIndex: 9997,
          pointerEvents: 'none',
          width: ringSize,
          height: ringSize,
          opacity: visible ? 1 : 0,
          transition: 'width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Inner rotating ring — separate from wrapper so rotation doesn't fight position */}
        <div
          ref={ringRef}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: isHover
              ? '1.5px solid rgba(200,155,94,0.9)'
              : isText
              ? '1px solid rgba(255,255,255,0.2)'
              : '1px dashed rgba(200,155,94,0.55)',
            boxShadow: isHover
              ? '0 0 20px rgba(200,155,94,0.28), inset 0 0 12px rgba(200,155,94,0.07)'
              : '0 0 8px rgba(200,155,94,0.12)',
            backgroundColor: isHover ? 'rgba(200,155,94,0.04)' : 'transparent',
            transition: 'border 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease',
          }}
        />

        {/* VIEW label — fades in on hover */}
        <span
          ref={labelRef}
          style={{
            position: 'relative',
            zIndex: 1,
            fontSize: '7px',
            fontWeight: 900,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#C89B5E',
            userSelect: 'none',
            lineHeight: 1,
            opacity: isHover ? 1 : 0,
            transform: isHover ? 'scale(1)' : 'scale(0.4)',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
            pointerEvents: 'none',
          }}
        >
          VIEW
        </span>
      </div>

      {/* ── Core dot (exact mouse, zero lag) ── */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0, left: 0,
          zIndex: 9999,
          pointerEvents: 'none',
          width: dotSize,
          height: dotSize,
          borderRadius: '50%',
          backgroundColor: isText ? 'rgba(255,255,255,0.85)' : '#C89B5E',
          boxShadow: isHover
            ? '0 0 14px rgba(200,155,94,1), 0 0 32px rgba(200,155,94,0.5)'
            : '0 0 6px rgba(200,155,94,0.7)',
          opacity: visible ? 1 : 0,
          transition: 'width 0.1s ease, height 0.1s ease, background-color 0.1s ease, box-shadow 0.15s ease, opacity 0.15s ease',
        }}
      />
    </>
  )
}
