import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { blogPosts, readTime } from '@/lib/data/blog'
import { getPublishedPost } from '@/lib/db/content'

// Share card generated per post — new (automated) posts get a branded preview with no extra work.
// Kept photo-free on purpose: flat colour keeps the PNG small enough for WhatsApp previews.
export const alt = 'MDF Enterprises — Blog'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return blogPosts.map(p => ({ slug: p.slug }))
}

const file = (p: string) => readFile(join(process.cwd(), p))

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPublishedPost(slug)
  const title = post?.title ?? 'Insights from MDF Enterprises'
  const meta = post ? `${readTime(post)} min read` : 'Srinagar, J&K'

  const [serif, sans, shield] = await Promise.all([
    file('assets/fonts/CormorantGaramond-Bold.woff'),
    file('assets/fonts/Inter-SemiBold.woff'),
    file('assets/og-shield.png'),
  ])
  const shieldSrc = `data:image/png;base64,${shield.toString('base64')}`

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#FAF8F5' }}>
        {/* Copy */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '60px 0 56px 72px', width: 790 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontFamily: 'Cormorant', fontSize: 38, color: '#141414', lineHeight: 1 }}>MDF</span>
            <span style={{ fontFamily: 'Inter', fontSize: 12, letterSpacing: 4, color: '#8B6B23', marginTop: 6 }}>ENTERPRISES · SRINAGAR</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontFamily: 'Inter', fontSize: 15, letterSpacing: 3, color: '#8B6B23', marginBottom: 16 }}>— FROM THE BLOG</span>
            <span style={{ fontFamily: 'Cormorant', fontSize: title.length > 60 ? 56 : 64, color: '#141414', lineHeight: 1.04 }}>{title}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Inter', fontSize: 16, color: '#5E5141' }}>
            <span style={{ padding: '8px 18px', borderRadius: 999, background: '#FFFFFF', border: '1px solid #E2D6BE', marginRight: 16 }}>{meta}</span>
            <span>mdfenterprisesjk.in</span>
          </div>
        </div>

        {/* Emblem panel */}
        <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', background: '#F1E9D8', borderLeft: '1px solid #E6D9BD' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 330, height: 330, borderRadius: 999, background: '#FAF4E8', border: '2px solid #DCC69A' }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
            <img src={shieldSrc} width={212} height={256} alt="" />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Cormorant', data: serif, weight: 700, style: 'normal' },
        { name: 'Inter', data: sans, weight: 600, style: 'normal' },
      ],
    },
  )
}
