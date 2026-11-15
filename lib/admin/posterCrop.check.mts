// Self-check for the poster contact-strip trim: node lib/admin/posterCrop.check.mts
import assert from 'node:assert/strict'
import { footerTop, posterCrop } from './posterCrop.ts'

const CREAM = [245, 238, 228], NAVY = [18, 28, 62]

/** w×h picture painted by fill(x, y) → colour. */
function picture(w: number, h: number, fill: (x: number, y: number) => number[]) {
  const px = new Uint8ClampedArray(w * h * 4)
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) px.set([...fill(x, y), 255], (y * w + x) * 4)
  return px
}

// Poster: navy title text at 65% height, strip from 76% with its curved top reaching the edges at 74%
const w = 100, h = 150
const poster = picture(w, h, (x, y) => {
  if (y >= 114) return NAVY
  if (y >= 111 && (x < 10 || x >= 90)) return NAVY
  if (y >= 96 && y < 100 && x >= 30 && x < 70 && x % 3 === 0) return NAVY // title line, never solid
  return CREAM
})
assert.equal(footerTop(poster, w, h), 111)
assert.deepEqual(posterCrop(w, h, 111), { sx: 6, sy: 0, sw: 89, sh: 111 })

// Ordinary photos are left alone
assert.equal(footerTop(picture(w, h, () => CREAM), w, h), null)
assert.equal(footerTop(picture(w, h, (x, y) => (y > 120 && x < 50 ? NAVY : CREAM)), w, h), null) // half-width dark area
// A narrow picture keeps its full width
assert.deepEqual(posterCrop(80, 150, 120), { sx: 0, sy: 0, sw: 80, sh: 120 })
console.log('poster trim checks passed')
