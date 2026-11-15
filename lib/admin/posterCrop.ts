/**
 * The shop's product posters end in a dark navy contact strip (name, phones, address).
 * On a product card that strip looks cut off, so uploads drop it and keep the card's 4:5 shape.
 */

const isNavy = (r: number, g: number, b: number) => r + g + b < 230 && b > r + 10

/** Top row of the navy strip, or null when the picture has none (an ordinary photo). */
export function footerTop(px: Uint8ClampedArray, w: number, h: number): number | null {
  const share = (y: number, x0: number, x1: number) => {
    let n = 0
    for (let x = x0; x < x1; x++) {
      const i = (y * w + x) * 4
      if (isNavy(px[i], px[i + 1], px[i + 2])) n++
    }
    return n / Math.max(1, x1 - x0)
  }
  const start = Math.round(h * 0.5)
  // The strip is a solid navy band across the full width; a navy title line never is
  let solid = -1
  for (let y = start; y < h; y++) if (share(y, 0, w) > 0.6) { solid = y; break }
  if (solid < 0) return null
  // Its curved top reaches the outer edges first, so cut where either edge turns navy
  const side = Math.max(1, Math.round(w * 0.1))
  for (let y = start; y < solid; y++) {
    if (share(y, 0, side) > 0.5 || share(y, w - side, w) > 0.5) return y
  }
  return solid
}

/** Source rectangle: everything above the strip, centred and narrowed to 4:5 when wide enough. */
export function posterCrop(w: number, h: number, top: number) {
  const sh = Math.max(1, top - Math.round(h * 0.003))
  const sw = Math.min(w, Math.round(sh * 0.8))
  return { sx: Math.round((w - sw) / 2), sy: 0, sw, sh }
}
