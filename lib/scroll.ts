/** Height of the fixed navbar, so sections don't land underneath it */
const NAV_OFFSET = -68

/** Scroll to an element id (or to the top when id is empty). Returns false if the target isn't on this page. */
export function scrollToId(id: string) {
  const el = id ? document.getElementById(id) : null
  if (id && !el) return false

  const top = el ? el.getBoundingClientRect().top + window.scrollY + NAV_OFFSET : 0
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
  history.replaceState(null, '', id ? `#${id}` : window.location.pathname)
  window.dispatchEvent(new CustomEvent('mdf:scrollto', { detail: id }))
  return true
}
