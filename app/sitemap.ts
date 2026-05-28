import type { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/data/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://mdfenterprisesjk.in'

  const blogRoutes = blogPosts.map(post => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    { url: base,               lastModified: new Date(), changeFrequency: 'weekly',  priority: 1 },
    { url: `${base}/products`, lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/blog`,     lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    ...blogRoutes,
  ]
}
