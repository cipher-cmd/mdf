'use client'

import { PageHero, StripItem } from '@/components/ui/PageHero'
import { categories } from '@/lib/data/categories'

export function ProductsHero() {
  return (
    <PageHero
      crumb="Products"
      eyebrow="Equip. Perform. Excel."
      title="Our Products"
      intro="Genuine sports goods, fitness equipment, musical instruments and awards — sourced direct from 25+ leading brands for homes, schools and institutions across J&K."
      video="/BG/productsBg.mp4"
      poster="/BG/productsHeroPoster.webp"
      cta={{ label: 'Browse the collection', target: 'collection' }}
      badge="Authorised dealer · GeM registered"
      stripLabel="Departments"
    >
      {categories.map((c, i) => (
        <StripItem key={c.id} index={i} short={c.short} label={c.label} sub={c.tagline} href={c.href} />
      ))}
    </PageHero>
  )
}
