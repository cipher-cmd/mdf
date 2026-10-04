import type Lenis from 'lenis'

let lenis: Lenis | null = null

export const setLenis = (instance: Lenis | null) => { lenis = instance }
export const getLenis = () => lenis

/** Height of the fixed navbar, so sections don't land underneath it */
const NAV_OFFSET = -68

/** Smoothly scroll to an element id (or to the top when id is empty). Returns false if the target isn't on this page. */
export function scrollToId(id: string) {
  const el = id ? document.getElementById(id) : null
  if (id && !el) return false

  if (lenis) {
    lenis.scrollTo(el ?? 0, { offset: el ? NAV_OFFSET : 0, duration: 1.3 })
  } else {
    const top = el ? el.getBoundingClientRect().top + window.scrollY + NAV_OFFSET : 0
    window.scrollTo({ top, behavior: 'smooth' })
  }
  history.replaceState(null, '', id ? `#${id}` : window.location.pathname)
  window.dispatchEvent(new CustomEvent('mdf:scrollto', { detail: id }))
  return true
}
