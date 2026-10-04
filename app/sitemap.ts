import type { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/data/blog'
import { categories } from '@/lib/data/categories'

const base = 'https://mdfenterprisesjk.in'
const abs = (path: string) => `${base}${encodeURI(path).replace(/&/g, '%26')}`

// Pages without their own date take the deploy time — the build is when their content last changed.
const deployedAt = new Date()

export default function sitemap(): MetadataRoute.Sitemap {
  const newestPost = blogPosts.reduce(
    (latest, p) => (p.publishedAt > latest ? p.publishedAt : latest),
    blogPosts[0]?.publishedAt ?? '2026-01-01',
  )

  const categoryRoutes: MetadataRoute.Sitemap = categories.map(cat => ({
    url: `${base}/products/${cat.id}`,
    lastModified: deployedAt,
    changeFrequency: 'monthly',
    priority: 0.85,
    images: [abs(cat.image)],
  }))

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map(post => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
    images: post.coverImage ? [abs(post.coverImage)] : undefined,
  }))

  return [
    {
      url: base,
      lastModified: deployedAt,
      changeFrequency: 'weekly',
      priority: 1,
      images: [abs('/images/hero_kashmir_scene.jpg'), abs('/images/showroom_interior.jpg')],
    },
    { url: `${base}/products`, lastModified: deployedAt, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/blog`, lastModified: new Date(newestPost), changeFrequency: 'weekly', priority: 0.8 },
    ...categoryRoutes,
    ...blogRoutes,
  ]
}
