import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import { Navbar }         from '@/components/layout/Navbar'
import { Footer }         from '@/components/layout/Footer'
import { Preloader }      from '@/components/layout/Preloader'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { LenisProvider }  from '@/providers/LenisProvider'
import { ThemeProvider }  from '@/providers/ThemeProvider'
import { CustomCursor }   from '@/components/ui/CustomCursor'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { StickyCtaBand }  from '@/components/ui/StickyCtaBand'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const BASE_URL = 'https://mdfenterprisesjk.in'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'MDF Enterprises | Sports, Fitness, Music & Awards — Srinagar, J&K',
    template: '%s | MDF Enterprises — Srinagar',
  },
  description:
    "J&K's premier sports equipment supplier since 1997. Cricket gear, fitness equipment, musical instruments, custom trophies & awards. GeM-registered, MSME-certified. Supply, installation and AMC service across Jammu & Kashmir — Srinagar, Jammu, Baramulla, Anantnag, Kupwara.",
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
    title: 'MDF Enterprises — Field Ready. Every Need.',
    description:
      "J&K's one-stop supplier of sports goods, fitness equipment, musical instruments and custom awards since 1997. GeM-registered, MSME-certified. Serving 1000+ institutions across Jammu & Kashmir.",
    type: 'website',
    locale: 'en_IN',
    siteName: 'MDF Enterprises',
    url: BASE_URL,
    images: [
      {
        url: `${BASE_URL}/images/mdfFavicon.png`,
        width: 800,
        height: 800,
        alt: 'MDF Enterprises — Sports, Fitness, Music & Awards — Srinagar J&K',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MDF Enterprises | Sports Equipment Supplier J&K',
    description:
      "J&K's premier sports equipment supplier since 1997. GeM-registered, MSME-certified. Cricket, fitness, music, awards.",
    images: [`${BASE_URL}/images/mdfFavicon.png`],
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
  verification: {
    google: '',   // add Google Search Console verification token here
  },
}

// ── Structured data ─────────────────────────────────────────────────────────

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['Store', 'LocalBusiness', 'SportingGoodsStore'],
  '@id': `${BASE_URL}/#organization`,
  name: 'MDF Enterprises',
  alternateName: 'MDF Enterprises Srinagar',
  description:
    "J&K's premier sports equipment, fitness gear, musical instruments and custom awards supplier. GeM-registered, MSME-certified. Founded 1997 in Srinagar.",
  url: BASE_URL,
  logo: `${BASE_URL}/images/mdfFavicon.png`,
  image: `${BASE_URL}/images/sports.png`,
  telephone: '+917006252334',
  email: 'mdfenterprisesjk@gmail.com',
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
  areaServed: [
    { '@type': 'State', name: 'Jammu & Kashmir' },
    { '@type': 'City',  name: 'Srinagar' },
    { '@type': 'City',  name: 'Jammu' },
    { '@type': 'City',  name: 'Baramulla' },
    { '@type': 'City',  name: 'Anantnag' },
    { '@type': 'City',  name: 'Kupwara' },
    { '@type': 'City',  name: 'Sopore' },
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
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Sports Goods & Cricket Equipment' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Fitness & Gymnasium Equipment' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Musical Instruments' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Custom Awards & Trophies' } },
    ],
  },
  award: ['GeM Registered Supplier', 'MSME Certified'],
  knowsAbout: [
    'Sports Equipment Supply',
    'GeM Portal Procurement',
    'Government Tender Supply',
    'Gymnasium Installation',
    'Sports Court Installation',
    'Music Lab Setup',
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is MDF Enterprises a GeM-registered supplier?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. MDF Enterprises is a registered supplier on the Government e-Marketplace (GeM). Government departments, schools, and institutions across J&K can procure sports goods, fitness equipment, musical instruments and awards through the GeM portal.',
      },
    },
    {
      '@type': 'Question',
      name: 'What brands does MDF Enterprises stock?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'MDF Enterprises is an authorised dealer for SG, YONEX, NIVIA, COSCO, STAG, SPARTAN, SS, JONEX, and NETCO — among 25+ premium sports and fitness brands. All stock is genuine and sourced directly.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does MDF Enterprises supply to government institutions in J&K?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. MDF Enterprises supplies sports goods, fitness equipment, and musical instruments to government departments (DYSO, Police, Army), universities, schools, and medical colleges across J&K through direct orders, L1 tenders, and the GeM portal.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is MDF Enterprises located?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'MDF Enterprises is located at SDA Shopping Complex, Opposite Iqbal Park, Srinagar, Jammu & Kashmir — 190008. Established in 1997, we serve all districts of J&K.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does MDF Enterprises do installation of gymnasium and fitness equipment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. MDF Enterprises has an in-house installation team specialised in gymnasium fit-outs, sports court installation, music lab setup, and multi-activity zone commissioning across J&K.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I place a bulk order with MDF Enterprises?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For bulk orders, contact MDF Enterprises on WhatsApp at +91 70062 52334 or email mdfenterprisesjk@gmail.com. We handle bulk procurement for government departments, schools, clubs, and private organisations across J&K.',
      },
    },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Products', item: `${BASE_URL}/products` },
    { '@type': 'ListItem', position: 3, name: 'Blog', item: `${BASE_URL}/blog` },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${cormorant.variable}`} suppressHydrationWarning>
      <head>
        {/* Geo targeting */}
        <meta name="geo.region"    content="IN-JK" />
        <meta name="geo.placename" content="Srinagar, Jammu & Kashmir, India" />
        <meta name="geo.position"  content="34.0836;74.7973" />
        <meta name="ICBM"          content="34.0836, 74.7973" />

        {/* Schema: LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {/* Schema: FAQ (AEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        {/* Schema: Breadcrumb */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </head>
      <body className="bg-[#050505] text-white antialiased min-h-screen flex flex-col" suppressHydrationWarning>
        <ThemeProvider>
          <div className="noise-overlay" aria-hidden />
          <ScrollProgress />
          <CustomCursor />
          <Preloader />
          <LenisProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </LenisProvider>
          <WhatsAppButton />
          <StickyCtaBand />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
