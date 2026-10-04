'use client'

import { PageHero, StripItem } from '@/components/ui/PageHero'
import { useCopy, useDepartments } from '@/providers/SiteProvider'

export function ProductsHero() {
  const copy = useCopy('products_page')
  const departments = useDepartments()
  return (
    <PageHero
      crumb="Products"
      eyebrow={copy.eyebrow}
      title={copy.title}
      intro={copy.intro}
      video="/BG/productsBg.mp4"
      poster="/BG/productsHeroPoster.webp"
      cta={{ label: copy.button, target: 'collection' }}
      badge={copy.badge}
      stripLabel="Departments"
    >
      {departments.slice(0, 4).map((c, i) => (
        <StripItem key={c.id} index={i} short={c.short} label={c.label} sub={c.tagline} href={c.href} />
      ))}
    </PageHero>
  )
}
