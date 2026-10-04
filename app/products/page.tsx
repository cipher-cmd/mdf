import type { Metadata } from 'next'
import { ProductsHero } from '@/components/products/ProductsHero'
import { ProductsExplorer } from '@/components/products/ProductsExplorer'
import { BrandPartners } from '@/components/home/BrandPartners'
import { CtaBand } from '@/components/home/CtaBand'
import { getProducts, getCategories, getSiteCopy } from '@/lib/db/content'

const BASE_URL = 'https://mdfenterprisesjk.in'
const abs = (src: string) => (src.startsWith('http') ? src : `${BASE_URL}${src}`)

export async function generateMetadata(): Promise<Metadata> {
  const { products_page: copy } = await getSiteCopy()
  return {
    title: copy.seo_title,
    description: copy.seo_description,
    alternates: { canonical: `${BASE_URL}/products` },
    openGraph: {
      url: `${BASE_URL}/products`,
      title: `${copy.title} — MDF Enterprises Srinagar J&K`,
      description: copy.seo_description,
      images: [{ url: '/opengraph-image.jpg', width: 1200, height: 630 }],
    },
  }
}

export default async function ProductsPage() {
  const [allProducts, allCategories] = await Promise.all([getProducts(), getCategories()])

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
    itemListElement: allProducts.map((p, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: p.name,
      description: p.description,
      image: abs(p.image),
      brand: { '@type': 'Brand', name: p.brand },
    })),
  }

  return (
    <main className="bg-[#FAF8F5] min-h-screen text-[#141414] overflow-x-clip">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <ProductsHero />
      <ProductsExplorer initialProducts={allProducts} initialCategories={allCategories} />
      <BrandPartners />
      <CtaBand />
    </main>
  )
}
