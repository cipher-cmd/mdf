import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, CaretRight, WhatsappLogo } from '@phosphor-icons/react/dist/ssr'
import { categories as defaultCategories } from '@/lib/data/categories'
import { getProducts, getCategories, getSiteCopy } from '@/lib/db/content'
import { waHref } from '@/lib/content/copy'
import { CtaBand } from '@/components/home/CtaBand'
import { ProductGrid } from '@/components/products/ProductGrid'

const BASE_URL = 'https://mdfenterprisesjk.in'
const abs = (src: string) => (src.startsWith('http') ? src : `${BASE_URL}${src}`)
const BUILT_IN_OG = new Set(defaultCategories.map(c => c.id))

interface Props {
  params: Promise<{ category: string }>
}

// Departments added later in the admin are rendered on first visit, then cached
export async function generateStaticParams() {
  return (await getCategories()).map(c => ({ category: c.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const cat = (await getCategories()).find(c => c.id === category)
  if (!cat) return {}
  const ogImage = BUILT_IN_OG.has(category) ? `/og/${category}.jpg` : cat.image
  return {
    title: `${cat.label} in Srinagar, J&K`,
    description: `Buy genuine ${cat.label} in Srinagar, J&K from MDF Enterprises — GeM-registered, MSME-certified. Authorized dealer for 25+ premium brands. Institutional pricing and district-wide delivery.`,
    alternates: { canonical: `${BASE_URL}/products/${category}` },
    openGraph: {
      url: `${BASE_URL}/products/${category}`,
      title: `${cat.label} — MDF Enterprises Srinagar`,
      description: `Genuine ${cat.label} from MDF Enterprises, Srinagar J&K. Authorized dealer for SG, SS, YONEX, NIVIA and 25+ brands. GeM-registered supplier.`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${cat.label} — MDF Enterprises, Srinagar` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${cat.label} — MDF Enterprises Srinagar`,
      images: [ogImage],
    },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const [allCategories, allProducts, copy] = await Promise.all([getCategories(), getProducts(), getSiteCopy()])

  const cat = allCategories.find(c => c.id === category)
  if (!cat) notFound()

  const page = copy.products_page
  const fill = (text: string) => text.replace(/\[department\]/gi, cat.label.toLowerCase())
  const categoryProducts = allProducts.filter(p => p.category === category)

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${BASE_URL}/products/${category}#itemlist`,
    name: cat.label,
    description: cat.tagline,
    url: `${BASE_URL}/products/${category}`,
    numberOfItems: categoryProducts.length,
    itemListOrder: 'https://schema.org/ItemListUnordered',
    itemListElement: categoryProducts.map((p, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: p.name,
        description: p.description,
        brand: { '@type': 'Brand', name: p.brand },
        image: abs(p.image),
        url: `${BASE_URL}/products/${category}`,
        offers: {
          '@type': 'Offer',
          availability: (p as { inStock?: boolean }).inStock === false ? 'https://schema.org/PreOrder' : 'https://schema.org/InStock',
          areaServed: { '@type': 'State', name: 'Jammu & Kashmir' },
          seller: { '@type': 'Organization', '@id': `${BASE_URL}/#organization` },
        },
      },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${BASE_URL}/products` },
      { '@type': 'ListItem', position: 3, name: cat.label, item: `${BASE_URL}/products/${category}` },
    ],
  }

  return (
    <main className="bg-[#FAF8F5] min-h-screen pt-24 sm:pt-28 text-[#141414] overflow-x-clip">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10">
        <nav aria-label="Breadcrumb" className="mb-4 sm:mb-5">
          <ol className="flex items-center gap-1.5 text-[12.5px] font-medium text-[#6B6359]">
            <li><Link href="/" className="hover:text-[#141414] transition-colors">Home</Link></li>
            <li aria-hidden><CaretRight size={10} weight="bold" className="text-[#B8923F]" /></li>
            <li><Link href="/products" className="hover:text-[#141414] transition-colors">Products</Link></li>
            <li aria-hidden><CaretRight size={10} weight="bold" className="text-[#B8923F]" /></li>
            <li aria-current="page" className="text-[#141414] font-semibold">{cat.label}</li>
          </ol>
        </nav>

        {/* Department banner — same cinematic card language as the homepage deck */}
        <header className="relative h-[clamp(340px,52svh,520px)] rounded-[22px] sm:rounded-[28px] overflow-hidden bg-[#0E0B07] shadow-[0_30px_60px_-30px_rgba(20,14,6,0.6)]">
          {cat.video ? (
            <video src={cat.video} poster={cat.poster} autoPlay muted loop playsInline aria-hidden className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <Image src={cat.poster || cat.image} alt="" fill priority className="object-cover" sizes="(max-width: 1380px) 100vw, 1380px" />
          )}
          <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 lg:p-10">
            <p className="text-[#E9CF94] text-[16px] sm:text-[18px] italic font-serif-heading">{cat.tagline}</p>
            <h1 className="text-[40px] sm:text-[56px] lg:text-[68px] font-bold text-white leading-[0.95] tracking-[-0.01em] font-serif-heading">
              {cat.label}
            </h1>
            <p className="mt-2 text-[13px] sm:text-[14px] text-white/75">{cat.items}</p>
          </div>
        </header>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mt-10 sm:mt-14 mb-6 sm:mb-8">
          <p className="text-[#554E46] text-[14.5px] leading-relaxed max-w-[560px]">{fill(page.department_intro)}</p>
          <p className="text-[12.5px] text-[#6B6359] flex-shrink-0">
            {categoryProducts.length} {categoryProducts.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        {categoryProducts.length > 0 ? (
          <ProductGrid items={categoryProducts} />
        ) : (
          <div className="py-16 text-center max-w-[440px] mx-auto">
            <p className="text-[28px] font-bold text-[#141414] font-serif-heading">{page.department_empty_title}</p>
            <p className="mt-2 text-[14px] text-[#6B6359] leading-relaxed">{fill(page.department_empty_text)}</p>
            <a
              href={waHref(copy.contact.whatsapp_number, `Hi ${copy.contact.business_name}, I would like to enquire about your ${cat.label} range and pricing.`)}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 min-h-[48px] px-6 rounded-full bg-[#141414] hover:bg-[#2A241B] text-white text-[13.5px] font-semibold transition-colors"
            >
              <WhatsappLogo size={18} weight="fill" className="text-[#25D366]" />
              {page.enquire_button}
            </a>
          </div>
        )}

        {/* Other departments */}
        {allCategories.length > 1 && (
          <nav aria-label="Other departments" className="mt-16 sm:mt-20 pt-8 border-t border-[#E8E2D6]">
            <p className="mb-4 text-[11px] tracking-[0.2em] font-semibold text-[#8B6B23] uppercase">— Explore other departments</p>
            <div className="flex flex-wrap gap-2.5">
              {allCategories.filter(c => c.id !== cat.id).map(c => (
                <Link
                  key={c.id}
                  href={c.href}
                  className="group inline-flex items-center gap-2 min-h-[44px] px-5 rounded-full border border-[#E0D6C3] bg-white/70 hover:bg-white hover:border-[#CCA552] text-[13.5px] font-semibold text-[#141414] transition-colors"
                >
                  {c.label}
                  <ArrowUpRight size={13} weight="bold" className="text-[#B8923F] transition-transform duration-300 group-hover:rotate-45" />
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>

      <CtaBand />
    </main>
  )
}
