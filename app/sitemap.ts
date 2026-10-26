import type { MetadataRoute } from 'next'
import { LEGAL_UPDATED } from '@/lib/content/legal'
import { SPORT_GUIDES } from '@/lib/content/departments'
import { getCategories, getPublishedPosts } from '@/lib/db/content'

const base = 'https://mdfenterprisesjk.in'
const abs = (path: string) => (path.startsWith('http') ? path : `${base}${encodeURI(path).replace(/&/g, '%26')}`)

// Built per request: the cached copy never picked up admin changes. Only crawlers fetch it, so one query each is cheap
export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, allPosts] = await Promise.all([getCategories(), getPublishedPosts()])
  // Unreviewed AI articles carry noindex, so they stay out of the sitemap too
  const posts = allPosts.filter(p => p.indexable !== false)
  // A lastmod that is always "now" gets ignored; move this date when the page content really changes
  const deployedAt = new Date('2026-10-25')
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
    { url: `${base}/partners`, lastModified: deployedAt, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${base}/privacy`, lastModified: new Date(LEGAL_UPDATED), changeFrequency: 'yearly', priority: 0.2 },
    { url: `${base}/terms`, lastModified: new Date(LEGAL_UPDATED), changeFrequency: 'yearly', priority: 0.2 },
    { url: `${base}/blog`, lastModified: new Date(newestPost), changeFrequency: 'weekly', priority: 0.8 },
    ...categories.map(cat => ({
      url: `${base}/products/${cat.id}`,
      lastModified: deployedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
      images: cat.image ? [abs(cat.image)] : undefined,
    })),
    ...Object.keys(SPORT_GUIDES).map(sport => ({
      url: `${base}/products/sports/${sport}`,
      lastModified: deployedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
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
