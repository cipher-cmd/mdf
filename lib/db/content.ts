import { cache } from 'react'
import { query, hasDb } from '@/lib/db'
import { mergeCopy, type SiteCopy } from '@/lib/content/copy'
import { categories as defaultCategories, type Category } from '@/lib/data/categories'
import { products as defaultProducts, type Product, type ProductCategory } from '@/lib/data/products'
import { blogPosts as defaultBlogPosts, type BlogPost, type BlogCategory } from '@/lib/data/blog'

/**
 * Public-site readers. Pages are statically cached and refreshed the moment the
 * admin saves (see lib/db/revalidate.ts), so these run rarely. If the database is
 * missing or down they fall back to the built-in content so the site never breaks.
 */

export interface ExtendedBlogPost extends BlogPost {
  id?: string
  status?: 'published' | 'draft'
  aiGenerated?: boolean
  sources?: { title: string; source: string; url: string }[]
  metaTitle?: string
  metaDescription?: string
  updatedAt?: string
}

async function safe<T>(label: string, run: () => Promise<T>, fallback: T): Promise<T> {
  if (!hasDb()) return fallback
  try {
    return await run()
  } catch (err) {
    console.error(`[content] ${label} failed, using built-in content:`, err)
    return fallback
  }
}

const isoDay = (d: unknown) => (d ? new Date(d as string).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10))

export const getSiteCopy = cache((): Promise<SiteCopy> =>
  safe('site copy', async () => {
    const rows = await query<{ key: string; content: Record<string, unknown> }>('SELECT key, content FROM mdf_site_copy')
    return mergeCopy(Object.fromEntries(rows.map(r => [r.key, r.content])))
  }, mergeCopy({}))
)

export function rowToCategory(r: any): Category {
  return {
    id: r.id,
    label: r.label,
    short: r.short || r.label,
    tagline: r.tagline || '',
    image: r.image || `/images/${r.id}.webp`,
    href: `/products/${r.id}`,
    items: r.items || '',
    video: r.video || '',
    poster: r.poster || r.image || '',
    enabled: r.is_active ?? true,
  }
}

/** Visible departments only, in the admin's order. */
export const getCategories = cache((): Promise<Category[]> =>
  safe('categories', async () => {
    const rows = await query('SELECT * FROM mdf_categories WHERE is_active = true ORDER BY sort_order, label')
    return rows.map(rowToCategory)
  }, defaultCategories)
)

export function rowToProduct(r: any): Product & { inStock: boolean } {
  return {
    id: r.id,
    slug: r.slug || r.id,
    name: r.name,
    category: r.category as ProductCategory,
    brand: r.brand || '',
    image: r.image || '/images/sports.webp',
    description: r.description || '',
    highlights: Array.isArray(r.specs) ? r.specs.filter(Boolean) : [],
    featured: r.is_featured ?? false,
    inStock: r.in_stock ?? true,
    whatsappText: r.whatsapp_text || undefined,
  }
}

/** Visible products whose department is also visible. */
export const getProducts = cache((): Promise<Product[]> =>
  safe('products', async () => {
    const rows = await query(
      `SELECT p.* FROM mdf_products p
       JOIN mdf_categories c ON c.id = p.category AND c.is_active = true
       WHERE p.is_visible = true
       ORDER BY p.sort_order, p.name`
    )
    return rows.map(rowToProduct)
  }, defaultProducts)
)

export function rowToPost(r: any): ExtendedBlogPost {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt || '',
    content: r.content || '',
    coverImage: r.cover_image || '/images/sports.webp',
    category: (r.category || 'culture') as BlogCategory,
    featured: r.is_featured ?? false,
    status: r.status === 'published' ? 'published' : 'draft',
    publishedAt: isoDay(r.published_at ?? r.created_at),
    updatedAt: r.updated_at ? new Date(r.updated_at).toISOString() : undefined,
    aiGenerated: r.ai_generated ?? false,
    sources: (Array.isArray(r.source_urls) ? r.source_urls : [])
      .map((s: any) => (typeof s === 'string' ? { title: '', source: '', url: s } : s))
      .filter((s: any) => s && typeof s.url === 'string' && /^https?:\/\//.test(s.url)),
    metaTitle: r.meta_title || undefined,
    metaDescription: r.meta_description || undefined,
  }
}

const POST_COLUMNS =
  'id, slug, title, excerpt, content, cover_image, category, status, published_at, created_at, updated_at, is_featured, ai_generated, source_urls, meta_title, meta_description'

/** Published articles, newest first. Posts scheduled for a future date stay hidden. */
export const getPublishedPosts = cache((): Promise<ExtendedBlogPost[]> =>
  safe('blog posts', async () => {
    const rows = await query(
      `SELECT ${POST_COLUMNS} FROM mdf_blog_posts
       WHERE status = 'published' AND published_at <= now()
       ORDER BY published_at DESC`
    )
    return rows.map(rowToPost)
  }, defaultBlogPosts.map(p => ({ ...p, status: 'published' as const })))
)

export const getPublishedPost = cache((slug: string): Promise<ExtendedBlogPost | null> =>
  safe('blog post', async () => {
    const rows = await query(
      `SELECT ${POST_COLUMNS} FROM mdf_blog_posts
       WHERE slug = $1 AND status = 'published' AND published_at <= now() LIMIT 1`,
      [slug]
    )
    return rows[0] ? rowToPost(rows[0]) : null
  }, (() => {
    const p = defaultBlogPosts.find(b => b.slug === slug)
    return p ? { ...p, status: 'published' as const } : null
  })())
)
