import type { Metadata } from 'next'
import { BlogHero } from '@/components/blog/BlogHero'
import { BlogExplorer } from '@/components/blog/BlogExplorer'
import { CtaBand } from '@/components/home/CtaBand'
import { blogPosts } from '@/lib/data/blog'

const BASE_URL = 'https://mdfenterprisesjk.in'

export const metadata: Metadata = {
  title: 'Blog — Buying Guides, Procurement & Stories',
  description:
    'Buying guides, GeM procurement know-how and stories from the world of sport, fitness and music — from MDF Enterprises, Srinagar.',
  alternates: { canonical: `${BASE_URL}/blog` },
  openGraph: {
    url: `${BASE_URL}/blog`,
    title: 'Our Blog — MDF Enterprises Srinagar J&K',
    description:
      'Latest updates, expert insights, product guides and stories from the world of sports, fitness, music and institutional supply.',
    images: [{ url: '/opengraph-image.jpg', width: 1200, height: 630 }],
  },
}

export default function BlogPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
    ],
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'MDF Enterprises Blog Articles',
    description: 'Insights and guides on sports equipment, fitness infrastructure, music labs and procurement across J&K.',
    itemListElement: blogPosts.map((post, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: post.title,
      url: `${BASE_URL}/blog/${post.slug}`,
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

      <BlogHero />
      <BlogExplorer />
      <CtaBand />
    </main>
  )
}
