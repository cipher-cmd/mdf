import type { Metadata } from 'next'
import { BlogHero } from '@/components/blog/BlogHero'
import { BlogExplorer } from '@/components/blog/BlogExplorer'
import { CtaBand } from '@/components/home/CtaBand'
import { getPublishedPosts, getSiteCopy } from '@/lib/db/content'

const BASE_URL = 'https://mdfenterprisesjk.in'

// Hourly refresh lets scheduled articles appear on time; admin edits refresh instantly anyway
export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const { blog_page: copy } = await getSiteCopy()
  return {
    title: copy.seo_title,
    description: copy.seo_description,
    alternates: { canonical: `${BASE_URL}/blog` },
    openGraph: {
      url: `${BASE_URL}/blog`,
      title: `${copy.title} — MDF Enterprises Srinagar J&K`,
      description: copy.seo_description,
      images: [{ url: '/opengraph-image.jpg', width: 1200, height: 630 }],
    },
  }
}

export default async function BlogPage() {
  const posts = await getPublishedPosts()

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
    itemListElement: posts.map((post, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: post.title,
      url: `${BASE_URL}/blog/${post.slug}`,
    })),
  }

  return (
    <main className="bg-[#FAF8F5] min-h-screen text-[#141414] overflow-x-clip">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <BlogHero posts={posts} />
      <BlogExplorer initialPosts={posts} />
      <CtaBand />
    </main>
  )
}
