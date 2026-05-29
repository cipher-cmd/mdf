import type { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/data/blog'
import { categories } from '@/lib/data/categories'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://mdfenterprisesjk.in'

  const categoryRoutes = categories.map(cat => ({
    url: `${base}/products/${cat.id}`,
    lastModified: new Date('2026-05-01'),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  const blogRoutes = blogPosts.map(post => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    { url: base,               lastModified: new Date('2026-05-29'), changeFrequency: 'weekly',  priority: 1 },
    { url: `${base}/products`, lastModified: new Date('2026-05-01'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/blog`,     lastModified: new Date('2026-05-10'), changeFrequency: 'weekly',  priority: 0.8 },
    ...categoryRoutes,
    ...blogRoutes,
  ]
}
