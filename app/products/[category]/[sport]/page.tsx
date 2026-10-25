import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowUpRight, CaretRight, WhatsappLogo } from '@phosphor-icons/react/dist/ssr'
import { getProducts, getPublishedPosts, getSiteCopy } from '@/lib/db/content'
import { fillContact, waHref } from '@/lib/content/copy'
import { SPORT_GUIDES } from '@/lib/content/departments'
import { CtaBand } from '@/components/home/CtaBand'
import { ProductGrid } from '@/components/products/ProductGrid'
import { GuideSection } from '@/components/products/GuideSection'
import { PostCard } from '@/components/blog/PostCard'

const BASE_URL = 'https://mdfenterprisesjk.in'

interface Props {
  params: Promise<{ category: string; sport: string }>
}

// Only the sports department has sport pages; anything else is a 404
export const dynamicParams = false

export function generateStaticParams() {
  return Object.keys(SPORT_GUIDES).map(sport => ({ category: 'sports', sport }))
}

const guideFor = (category: string, sport: string) => (category === 'sports' ? SPORT_GUIDES[sport] : undefined)
const mentions = (text: string, keywords: string[]) => keywords.some(k => text.toLowerCase().includes(k))

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, sport } = await params
  const guide = guideFor(category, sport)
  if (!guide) return {}
  const url = `${BASE_URL}/products/sports/${sport}`
  return {
    title: guide.seoTitle,
    description: guide.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website', siteName: 'MDF Enterprises', locale: 'en_IN', url,
      title: guide.title, description: guide.description,
      images: [{ url: '/og/sports.jpg', width: 1200, height: 630, alt: `${guide.label}, MDF Enterprises, Srinagar` }],
    },
    twitter: { card: 'summary_large_image', title: guide.title, images: ['/og/sports.jpg'] },
  }
}

export default async function SportPage({ params }: Props) {
  const { category, sport } = await params
  const base = guideFor(category, sport)
  if (!base) notFound()

  const [allProducts, allPosts, copy] = await Promise.all([getProducts(), getPublishedPosts(), getSiteCopy()])
  const guide = { ...base, faq: base.faq.map(({ q, a }) => ({ q, a: fillContact(a, copy.contact) })) }
  const products = allProducts.filter(p => p.category === 'sports' && mentions(`${p.name} ${p.description}`, guide.keywords))
  const posts = allPosts.filter(p => p.indexable !== false && mentions(`${p.title} ${p.excerpt}`, guide.keywords)).slice(0, 3)
  const url = `${BASE_URL}/products/sports/${sport}`

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${BASE_URL}/products` },
      { '@type': 'ListItem', position: 3, name: 'Sports Equipment', item: `${BASE_URL}/products/sports` },
      { '@type': 'ListItem', position: 4, name: guide.label, item: url },
    ],
  }

  return (
    <div className="bg-[#F7F7F7] min-h-dvh pt-24 sm:pt-28 text-[#141414] overflow-x-clip">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10">
        <nav aria-label="Breadcrumb" className="mb-4 sm:mb-5">
          <ol className="flex flex-wrap items-center gap-1.5 text-[12.5px] font-medium text-[#6B6359]">
            <li><Link href="/" className="hover:text-[#141414] transition-colors">Home</Link></li>
            <li aria-hidden><CaretRight size={10} weight="bold" className="text-[#B8923F]" /></li>
            <li><Link href="/products" className="hover:text-[#141414] transition-colors">Products</Link></li>
            <li aria-hidden><CaretRight size={10} weight="bold" className="text-[#B8923F]" /></li>
            <li><Link href="/products/sports" className="hover:text-[#141414] transition-colors">Sports</Link></li>
            <li aria-hidden><CaretRight size={10} weight="bold" className="text-[#B8923F]" /></li>
            <li aria-current="page" className="text-[#141414] font-semibold">{guide.label}</li>
          </ol>
        </nav>

        <header className="max-w-[860px]">
          <h1 className="text-[34px] sm:text-[48px] lg:text-[56px] font-bold leading-[1] tracking-[-0.01em] font-serif-heading">{guide.title}</h1>
          <p className="mt-4 text-[15px] sm:text-[16px] leading-relaxed text-[#554E46]">{guide.description}</p>
          <a
            href={waHref(copy.contact.whatsapp_number, `Hi ${copy.contact.business_name}, I would like to enquire about ${guide.label.toLowerCase()} equipment and pricing.`)}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 min-h-[48px] px-6 rounded-full bg-[#141414] hover:bg-[#2A241B] text-white text-[13.5px] font-semibold transition-colors"
          >
            <WhatsappLogo size={18} weight="fill" className="text-[#25D366]" />
            {copy.products_page.enquire_button}
          </a>
        </header>

        {products.length > 0 && (
          <div className="mt-12 sm:mt-16">
            <ProductGrid items={products} />
          </div>
        )}

        <GuideSection guide={guide} />

        {posts.length > 0 && (
          <section aria-labelledby="reading-heading" className="mt-16 sm:mt-20">
            <h2 id="reading-heading" className="mb-6 text-[22px] sm:text-[26px] font-bold font-serif-heading">Worth reading</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map(p => <PostCard key={p.slug} post={p} />)}
            </div>
          </section>
        )}

        <nav aria-label="Other sports" className="mt-16 sm:mt-20 pt-8 border-t border-[#E5E5E5]">
          <h2 className="mb-4 text-[22px] sm:text-[26px] font-bold font-serif-heading">Other sports</h2>
          <div className="flex flex-wrap gap-2.5">
            {[...Object.entries(SPORT_GUIDES).filter(([slug]) => slug !== sport).map(([slug, s]) => [`/products/sports/${slug}`, s.label]), ['/products/sports', 'All sports equipment']].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="group inline-flex items-center gap-2 min-h-[44px] px-5 rounded-full border border-[#E0E0E0] bg-white/70 hover:bg-white hover:border-[#CCA552] text-[13.5px] font-semibold text-[#141414] transition-colors"
              >
                {label}
                <ArrowUpRight size={13} weight="bold" className="text-[#B8923F] transition-transform duration-300 group-hover:rotate-45" />
              </Link>
            ))}
          </div>
        </nav>
      </div>

      <CtaBand />
    </div>
  )
}
