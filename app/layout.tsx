import type { Metadata, Viewport } from 'next'
import { Hanken_Grotesk, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import { Navbar }       from '@/components/layout/Navbar'
import { Footer }       from '@/components/layout/Footer'
import { ClientShell }  from '@/components/layout/ClientShell'
import { MotionProvider } from '@/providers/MotionProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { SiteProvider } from '@/providers/SiteProvider'
import { getSiteCopy, getCategories } from '@/lib/db/content'
import type { SiteCopy } from '@/lib/content/copy'

// Variable fonts: one file per style instead of one per weight
const hanken = Hanken_Grotesk({
  variable: '--font-hanken',
  subsets: ['latin'],
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  display: 'swap',
  style: ['normal', 'italic'],
})

const BASE_URL = 'https://mdfenterprisesjk.in'

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSiteCopy()
  return {
  metadataBase: new URL(BASE_URL),
  title: {
    default: seo.site_title,
    template: '%s | MDF Enterprises, Srinagar',
  },
  description: seo.site_description,
  keywords: [
    'sports equipment Srinagar',
    'sports goods Srinagar',
    'cricket equipment Kashmir',
    'sports goods J&K',
    'sports goods Jammu Kashmir',
    'GeM supplier Kashmir',
    'GeM registered sports supplier',
    'MSME sports equipment Kashmir',
    'fitness equipment Srinagar',
    'gym equipment Kashmir',
    'gymnasium equipment J&K',
    'musical instruments Srinagar',
    'awards trophies Kashmir',
    'custom trophies Srinagar',
    'sports goods supplier government J&K',
    'bulk sports equipment J&K',
    'MDF Enterprises Srinagar',
    'SG cricket Kashmir',
    'YONEX dealer Kashmir',
    'NIVIA dealer J&K',
    'sports goods tender J&K',
    'GeM sports goods',
  ],
  authors: [{ name: 'MDF Enterprises', url: BASE_URL }],
  creator: 'MDF Enterprises',
  publisher: 'MDF Enterprises',
  category: 'Sports Equipment Retail',
  openGraph: {
    title: seo.share_title,
    description: seo.share_description,
    type: 'website',
    locale: 'en_IN',
    siteName: 'MDF Enterprises',
    url: BASE_URL,
    // Share image comes from app/opengraph-image.jpg (1200×630) and is inherited by every route
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.share_title,
    description: seo.share_description,
    // Image comes from app/twitter-image.jpg
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: '/images/mdfFavicon.png',
    apple: '/images/mdfFavicon.png',
    shortcut: '/images/mdfFavicon.png',
  },
  // Set these env vars once the properties are created (empty values would render empty meta tags)
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#F7F7F7',
}

// ── Structured data ─────────────────────────────────────────────────────────

const localBusinessSchema = (contact: SiteCopy['contact']) => ({
  '@context': 'https://schema.org',
  '@type': ['Store', 'LocalBusiness', 'SportingGoodsStore'],
  '@id': `${BASE_URL}/#organization`,
  name: 'MDF Enterprises',
  legalName: 'MDF Enterprises',
  alternateName: 'MDF Enterprises Srinagar',
  description: "J&K's premier sports equipment, fitness gear, musical instruments and custom awards supplier since 1997. GeM-registered government supplier, MSME-certified. Serving 1000+ institutions across Jammu & Kashmir.",
  url: BASE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/images/mdfFavicon.png`,
    width: 512,
    height: 512,
  },
  image: `${BASE_URL}/images/SportsGoodsNew.webp`,
  telephone: `+${contact.phone_display.replace(/\D/g, '')}`,
  email: contact.email,
  foundingDate: '1997',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, Bank Transfer, GeM Portal, UPI',
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'SDA Shopping Complex, Opposite Iqbal Park',
    addressLocality: 'Srinagar',
    addressRegion: 'Jammu & Kashmir',
    postalCode: '190008',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 34.0836,
    longitude: 74.7973,
  },
  hasMap: 'https://maps.google.com/?q=34.0836,74.7973',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: `+${contact.phone_display.replace(/\D/g, '')}`,
      contactType: 'sales',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi', 'Urdu', 'Kashmiri'],
    },
    {
      '@type': 'ContactPoint',
      telephone: `+${contact.phone_display.replace(/\D/g, '')}`,
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi', 'Urdu', 'Kashmiri'],
    },
  ],
  areaServed: [
    { '@type': 'State', name: 'Jammu & Kashmir' },
    { '@type': 'City',  name: 'Srinagar' },
    { '@type': 'City',  name: 'Jammu' },
    { '@type': 'City',  name: 'Baramulla' },
    { '@type': 'City',  name: 'Anantnag' },
    { '@type': 'City',  name: 'Kupwara' },
    { '@type': 'City',  name: 'Sopore' },
    { '@type': 'State', name: 'Ladakh' },
    { '@type': 'City',  name: 'Leh' },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '10:00',
      closes: '19:00',
    },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Sports, Fitness, Music & Awards Equipment',
    // Sub-catalogues, not Products: a Product without a price trips Search Console's "missing offers" error
    itemListElement: [
      { '@type': 'OfferCatalog', name: 'Sports Goods & Cricket Equipment', url: `${BASE_URL}/products/sports` },
      { '@type': 'OfferCatalog', name: 'Fitness & Gymnasium Equipment', url: `${BASE_URL}/products/fitness` },
      { '@type': 'OfferCatalog', name: 'Musical Instruments', url: `${BASE_URL}/products/music` },
      { '@type': 'OfferCatalog', name: 'Custom Awards & Trophies', url: `${BASE_URL}/products/awards` },
    ],
  },
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'GeM Registered Supplier',
      credentialCategory: 'Government Registration',
      recognizedBy: {
        '@type': 'Organization',
        name: 'Government e-Marketplace (GeM)',
        url: 'https://gem.gov.in',
      },
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'MSME Certified',
      credentialCategory: 'Government Certification',
      recognizedBy: {
        '@type': 'Organization',
        name: 'Ministry of Micro, Small and Medium Enterprises',
        url: 'https://msme.gov.in',
      },
    },
  ],
  knowsAbout: [
    'Sports Equipment Supply',
    'GeM Portal Procurement',
    'Government Tender Supply',
    'Gymnasium Installation',
    'Sports Court Installation',
    'Music Lab Setup',
    'Annual Maintenance Contract (AMC)',
  ],
  // Add your verified profiles below; each URL boosts AI entity recognition
  sameAs: [
    // 'https://maps.app.goo.gl/YOUR_GOOGLE_MAPS_LINK',
    // 'https://www.linkedin.com/company/mdf-enterprises-srinagar',
    // 'https://www.facebook.com/mdfenterprisesjk',
    // 'https://www.indiamart.com/mdf-enterprises-srinagar',
    // 'https://mkp.gem.gov.in/seller/YOUR_GEM_SELLER_ID',
  ],
})

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  name: 'MDF Enterprises',
  url: BASE_URL,
  description: "J&K's premier sports equipment, fitness gear, musical instruments and custom awards supplier since 1997.",
  publisher: { '@id': `${BASE_URL}/#organization` },
  inLanguage: 'en-IN',
}

// ─────────────────────────────────────────────────────────────────────────────

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [copy, departments] = await Promise.all([getSiteCopy(), getCategories()])

  return (
    <html lang="en-IN" className={`${hanken.variable} ${cormorant.variable}`} suppressHydrationWarning>
      <head>
        {/* Performance: preconnect for external origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://va.vercel-scripts.com" />

        {/* Geo targeting */}
        <meta name="geo.region"    content="IN-JK" />
        <meta name="geo.placename" content="Srinagar, Jammu & Kashmir, India" />
        <meta name="geo.position"  content="34.0836;74.7973" />
        <meta name="ICBM"          content="34.0836, 74.7973" />

        {/* Schema: LocalBusiness + SportingGoodsStore */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema(copy.contact)) }} />
        {/* Schema: WebSite entity */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </head>
      <body className="bg-[#F7F7F7] text-[#141414] antialiased min-h-dvh flex flex-col selection:bg-[#C59B27] selection:text-white" suppressHydrationWarning>
        <ThemeProvider>
          <SiteProvider value={{ copy, departments }}>
          <div className="noise-overlay" aria-hidden />
          <ClientShell />
          <MotionProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </MotionProvider>
          <SpeedInsights />
          </SiteProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
