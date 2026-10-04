import type { Metadata } from 'next'
import { ProductsHero } from '@/components/products/ProductsHero'
import { ProductsExplorer } from '@/components/products/ProductsExplorer'
import { BrandPartners } from '@/components/home/BrandPartners'
import { CtaBand } from '@/components/home/CtaBand'
import { products } from '@/lib/data/products'

const BASE_URL = 'https://mdfenterprisesjk.in'

export const metadata: Metadata = {
  title: 'Products — Sports, Fitness, Music & Awards',
  description:
    'A complete range of genuine sports goods, fitness equipment, musical instruments, awards and institutional supplies. GeM-registered supplier, MSME-certified. 25+ premium brands across J&K.',
  alternates: { canonical: `${BASE_URL}/products` },
  openGraph: {
    url: `${BASE_URL}/products`,
    title: 'Our Products — MDF Enterprises Srinagar J&K',
    description:
      'Complete range of genuine sports goods, fitness machinery, musical instruments and institutional awards. Trusted supplier across Jammu & Kashmir since 1997.',
    images: [{ url: '/opengraph-image.jpg', width: 1200, height: 630 }],
  },
}

export default function ProductsPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${BASE_URL}/products` },
    ],
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'MDF Enterprises Product Catalogue',
    description: 'Sports equipment, fitness equipment, musical instruments, and institutional trophies available across J&K.',
    itemListElement: products.map((p, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: p.name,
      description: p.description,
      image: `${BASE_URL}${p.image}`,
      brand: { '@type': 'Brand', name: p.brand },
    })),
  }

  return (
    <main className="bg-[#FAF8F5] min-h-screen text-[#141414] overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <ProductsHero />
      <ProductsExplorer />
      <BrandPartners />
      <CtaBand />
    </main>
  )
}
