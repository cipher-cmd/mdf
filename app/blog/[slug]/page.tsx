import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, CaretRight, WhatsappLogo } from '@phosphor-icons/react/dist/ssr'
import { blogPosts, categoryLabel, formatDate, readTime } from '@/lib/data/blog'
import { waLink } from '@/lib/data/products'
import { PostCard } from '@/components/blog/PostCard'
import { CtaBand } from '@/components/home/CtaBand'

const BASE_URL = 'https://mdfenterprisesjk.in'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map(p => ({ slug: p.slug }))
}

// Share images come from the sibling opengraph-image / twitter-image routes
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find(p => p.slug === slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `${BASE_URL}/blog/${slug}` },
    openGraph: {
      type: 'article',
      url: `${BASE_URL}/blog/${slug}`,
      title: post.title,
      description: post.excerpt,
      publishedTime: `${post.publishedAt}T00:00:00+05:30`,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = blogPosts.find(p => p.slug === slug)
  if (!post) notFound()

  const label = categoryLabel(post.category)
  const url = `${BASE_URL}/blog/${post.slug}`
  // Same topic first, then the newest of the rest
  const related = blogPosts
    .filter(p => p.slug !== post.slug)
    .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category) || b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 3)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.excerpt,
    image: `${BASE_URL}${post.coverImage}`,
    url,
    datePublished: `${post.publishedAt}T00:00:00+05:30`,
    dateModified: `${post.publishedAt}T00:00:00+05:30`,
    author: { '@type': 'Organization', '@id': `${BASE_URL}/#organization`, name: 'MDF Enterprises', url: BASE_URL },
    publisher: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'MDF Enterprises',
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/images/mdfFavicon.png`, width: 512, height: 512 },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    articleSection: label,
    inLanguage: 'en-IN',
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  }

  return (
    <main className="bg-[#FAF8F5] min-h-screen pt-24 sm:pt-28 text-[#141414] overflow-x-clip">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <article>
        <header className="max-w-[820px] mx-auto px-4 sm:px-6 pt-4 sm:pt-8 text-center">
          <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
            <ol className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-[#6B6359]">
              <li><Link href="/" className="hover:text-[#141414] transition-colors">Home</Link></li>
              <li aria-hidden><CaretRight size={10} weight="bold" className="text-[#B8923F]" /></li>
              <li><Link href="/blog" className="hover:text-[#141414] transition-colors">Blog</Link></li>
              <li aria-hidden><CaretRight size={10} weight="bold" className="text-[#B8923F]" /></li>
              <li><Link href={`/blog#${post.category}`} className="text-[#141414] font-semibold hover:text-[#8B6B23] transition-colors">{label}</Link></li>
            </ol>
          </nav>

          <h1 className="text-[38px] sm:text-[54px] lg:text-[64px] font-bold text-[#141414] leading-[1] tracking-[-0.01em] font-serif-heading text-balance">
            {post.title}
          </h1>
          <p className="mt-5 text-[16px] sm:text-[18px] text-[#554E46] leading-[1.65] max-w-[640px] mx-auto">{post.excerpt}</p>

          <div className="mt-7 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[12.5px] text-[#6B6359]">
            <span className="inline-flex items-center gap-2 font-semibold text-[#141414]">
              <span className="relative w-7 h-7 rounded-full bg-white border border-[#E5DDD0] overflow-hidden">
                <Image src="/images/mdfFavicon.png" alt="" fill className="object-contain p-1" sizes="28px" />
              </span>
              MDF Editorial
            </span>
            <span className="text-[#C9B994]">·</span>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span className="text-[#C9B994]">·</span>
            <span>{readTime(post)} min read</span>
          </div>
        </header>

        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 md:px-10 mt-10 sm:mt-14">
          <div className="relative aspect-[16/10] sm:aspect-[2/1] rounded-[22px] sm:rounded-[30px] overflow-hidden bg-[#EFE8DB] shadow-[0_40px_80px_-40px_rgba(40,28,10,0.55)]">
            <Image src={post.coverImage} alt="" fill priority className="object-cover" sizes="(max-width: 1180px) 100vw, 1100px" />
          </div>
        </div>

        <div className="article-body max-w-[680px] mx-auto px-4 sm:px-6 mt-12 sm:mt-16" dangerouslySetInnerHTML={{ __html: post.content }} />

        <footer className="max-w-[680px] mx-auto px-4 sm:px-6 mt-12 pt-8 border-t border-[#E8E2D6] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${post.title} — ${url}`)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 min-h-[44px] px-5 rounded-full border border-[#DDD3C0] bg-white/70 hover:bg-white hover:border-[#CCA552] text-[13px] font-semibold text-[#141414] transition-colors self-start"
          >
            <WhatsappLogo size={16} weight="fill" className="text-[#25D366]" />
            Share on WhatsApp
          </a>
          <a
            href={waLink(`Hi MDF Enterprises, I just read "${post.title}" and have a question.`)}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#8B6B23] hover:text-[#A47E28] transition-colors"
          >
            Have a question? Ask our team
            <ArrowUpRight size={13} weight="bold" className="transition-transform duration-300 group-hover:rotate-45" />
          </a>
        </footer>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10 mt-20 sm:mt-28 mb-8">
          <div className="flex items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <p className="mb-2 text-[11px] tracking-[0.2em] font-semibold text-[#8B6B23] uppercase">— Keep Reading</p>
              <h2 id="related-heading" className="text-[28px] sm:text-[36px] font-bold text-[#141414] leading-[1.05] font-serif-heading">More from the Journal.</h2>
            </div>
            <Link href="/blog" className="hidden sm:inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#8B6B23] hover:text-[#A47E28] transition-colors group">
              All articles
              <ArrowUpRight size={13} weight="bold" className="transition-transform duration-300 group-hover:rotate-45" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {related.map(r => <PostCard key={r.slug} post={r} />)}
          </div>
        </section>
      )}

      <CtaBand />
    </main>
  )
}
