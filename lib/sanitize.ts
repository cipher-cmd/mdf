/**
 * Article HTML is shown with dangerouslySetInnerHTML, so everything saved from the
 * editor or the AI writer goes through this allow-list first: only simple text tags
 * survive, every attribute is dropped except safe http(s)/mailto/relative link targets.
 */
const ALLOWED = new Set(['p', 'h2', 'h3', 'ul', 'ol', 'li', 'blockquote', 'strong', 'em', 'b', 'i', 'a', 'br'])
const RENAME: Record<string, string> = { b: 'strong', i: 'em', h1: 'h2', h4: 'h3', h5: 'h3', h6: 'h3', div: 'p' }

export function sanitizeHtml(html: string): string {
  const cleaned = html
    .replace(/<(script|style|iframe|object|embed|noscript|template)[\s\S]*?<\/\1>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<\/?([a-z][a-z0-9]*)\b([^>]*)>/gi, (match, rawTag: string, attrs: string) => {
      const closing = match.startsWith('</')
      const tag = RENAME[rawTag.toLowerCase()] ?? rawTag.toLowerCase()
      if (!ALLOWED.has(tag)) return ''
      if (closing) return tag === 'br' ? '' : `</${tag}>`
      if (tag === 'a') {
        const href = attrs.match(/href\s*=\s*("([^"]*)"|'([^']*)')/i)
        const url = (href?.[2] ?? href?.[3] ?? '').trim()
        if (!/^(https?:\/\/|mailto:|\/)/i.test(url)) return '<a>'
        const external = /^https?:\/\//i.test(url)
        return `<a href="${url.replace(/"/g, '&quot;')}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>`
      }
      return tag === 'br' ? '<br>' : `<${tag}>`
    })
  // Drop empty paragraphs the editor tends to leave behind
  return cleaned.replace(/<p>(\s|&nbsp;|<br>)*<\/p>/g, '').trim()
}

export const plainText = (html: string) =>
  html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim()

export function slugify(text: string, max = 80) {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, max)
    .replace(/-+$/, '')
}
