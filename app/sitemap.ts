import type { MetadataRoute } from 'next'
import { getCategories, getPublishedPosts } from '@/lib/db/content'

const base = 'https://mdfenterprisesjk.in'
const abs = (path: string) => (path.startsWith('http') ? path : `${base}${encodeURI(path).replace(/&/g, '%26')}`)

// Rebuilt with the rest of the site whenever the admin publishes something
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, posts] = await Promise.all([getCategories(), getPublishedPosts()])
  const deployedAt = new Date()
  const newestPost = posts[0]?.publishedAt ?? '2026-01-01'

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
    ...categories.map(cat => ({
      url: `${base}/products/${cat.id}`,
      lastModified: deployedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
      images: cat.image ? [abs(cat.image)] : undefined,
    })),
    ...posts.map(post => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      images: post.coverImage ? [abs(post.coverImage)] : undefined,
    })),
  ]
}
