import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { products } from '@/lib/data/products'
import { categories } from '@/lib/data/categories'

const BASE_URL = 'https://mdfenterprisesjk.in'

interface Props { params: Promise<{ category: string }> }

export async function generateStaticParams() {
  return categories.map(c => ({ category: c.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const cat = categories.find(c => c.id === category)
  if (!cat) return {}
  return {
    title: `${cat.label} — Sports Equipment Srinagar J&K | MDF Enterprises`,
    description: `Buy ${cat.label} in Srinagar, J&K from MDF Enterprises — GeM-registered, MSME-certified. Authorized dealer for 25+ premium brands. Genuine stock, institutional pricing. Enquire via WhatsApp.`,
    alternates: { canonical: `${BASE_URL}/products/${category}` },
    openGraph: {
      url: `${BASE_URL}/products/${category}`,
      title: `${cat.label} — MDF Enterprises Srinagar`,
      description: `Genuine ${cat.label} from MDF Enterprises, Srinagar J&K. Authorized dealer for SG, YONEX, NIVIA and 25+ brands. GeM-registered supplier.`,
    },
  }
}

const WA_SVG = (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
)

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const cat = categories.find(c => c.id === category)
  if (!cat) notFound()

  const categoryProducts = products.filter(p => p.category === category)

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
        image: `${BASE_URL}${p.image}`,
        url: `${BASE_URL}/products/${category}`,
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
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
      { '@type': 'ListItem', position: 1, name: 'Home',     item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${BASE_URL}/products` },
      { '@type': 'ListItem', position: 3, name: cat.label,  item: `${BASE_URL}/products/${category}` },
    ],
  }

  return (
    <main className="bg-[#050505] min-h-screen pt-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16">

        <nav aria-label="Breadcrumb" className="mb-10">
          <Link href="/products" className="inline-flex items-center gap-2 text-[12px] font-bold uppercase text-white/40 hover:text-[#C89B5E] transition-colors">
            <ArrowLeft size={13} /> All Products
          </Link>
        </nav>

        <p className="overline-gold mb-5">{cat.tagline}</p>
        <h1 className="text-[48px] md:text-[60px] font-medium text-white leading-[1.0] mb-4"
          style={{ fontFamily: 'var(--font-cormorant), serif' }}>
          {cat.label}<span className="text-[#C89B5E]">.</span>
        </h1>
        <p className="text-white/45 text-[15px] mb-14">
          Genuine {cat.label.toLowerCase()} from MDF Enterprises, Srinagar — authorised dealer for 25+ premium brands. GeM-registered supplier for J&K institutions.
        </p>

        {categoryProducts.length === 0 ? (
          <div className="text-center py-24 border border-white/[0.06] rounded-2xl">
            <p className="text-[20px] text-white/40 mb-4">Products coming soon</p>
            <p className="text-[14px] text-white/25 mb-8">Contact us on WhatsApp to enquire about {cat.label}.</p>
            <a
              href={`https://wa.me/917006252334?text=${encodeURIComponent(`Hi MDF Enterprises, I am interested in ${cat.label}. Could you share more details?`)}`}
              target="_blank"
              rel="noreferrer"
              className="btn-gold inline-flex"
            >
              {WA_SVG} Enquire on WhatsApp
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categoryProducts.map(p => (
              <div key={p.id} className="group bg-[#0f0f0f] border border-white/[0.06] group-hover:border-[#C89B5E]/25 rounded-xl overflow-hidden transition-colors duration-300">
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#111]">
                  <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 640px) 100vw, 33vw" />
                </div>
                <div className="p-5">
                  <p className="text-[10px] text-white/30 font-bold tracking-[0.15em] uppercase mb-1">{p.brand}</p>
                  <h2 className="text-[15px] font-semibold text-white mb-2 leading-snug">{p.name}</h2>
                  <p className="text-[12px] text-white/40 leading-relaxed mb-4">{p.description}</p>
                  <a
                    href={`https://wa.me/917006252334?text=${encodeURIComponent(p.whatsappText)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.08em] uppercase bg-[#25d366]/10 hover:bg-[#25d366] border border-[#25d366]/30 hover:border-[#25d366] text-[#25d366] hover:text-white px-4 py-2.5 rounded transition-all duration-300 w-full justify-center"
                  >
                    {WA_SVG} Enquire on WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
