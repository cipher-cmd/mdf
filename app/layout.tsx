import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import { Navbar }       from '@/components/layout/Navbar'
import { Footer }       from '@/components/layout/Footer'
import { ClientShell }  from '@/components/layout/ClientShell'
import { LenisProvider } from '@/providers/LenisProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'
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
    "J&K's premier sports equipment supplier since 1997. Cricket gear, fitness equipment, musical instruments & custom awards. GeM-registered, MSME-certified. Serving all districts of Jammu & Kashmir.",
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
        url: `${BASE_URL}/images/SportsGoodsNew.webp`,
        width: 1200,
        height: 630,
        alt: 'MDF Enterprises — Sports, Fitness, Music & Awards — Srinagar J&K',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MDF Enterprises | Sports Equipment Supplier J&K',
    description:
      "J&K's premier sports equipment supplier since 1997. GeM-registered, MSME-certified. Cricket, fitness, music, awards.",
    images: [`${BASE_URL}/images/SportsGoodsNew.webp`],
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
    google: '',        // TODO: add Google Search Console HTML tag token
    other: { 'msvalidate.01': '' }, // TODO: add Bing Webmaster Tools token
  },
}

// ── Structured data ─────────────────────────────────────────────────────────

const localBusinessSchema = {
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
  hasMap: 'https://maps.google.com/?q=34.0836,74.7973',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+917006252334',
      contactType: 'sales',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi', 'Urdu', 'Kashmiri'],
    },
    {
      '@type': 'ContactPoint',
      telephone: '+917006252334',
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
  // Add your verified profiles below — each URL boosts AI entity recognition
  sameAs: [
    // 'https://maps.app.goo.gl/YOUR_GOOGLE_MAPS_LINK',
    // 'https://www.linkedin.com/company/mdf-enterprises-srinagar',
    // 'https://www.facebook.com/mdfenterprisesjk',
    // 'https://www.indiamart.com/mdf-enterprises-srinagar',
    // 'https://mkp.gem.gov.in/seller/YOUR_GEM_SELLER_ID',
  ],
}

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
    {
      '@type': 'Question',
      name: 'What sports equipment does MDF Enterprises supply?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'MDF Enterprises supplies cricket equipment (bats, balls, pads, helmets), football, badminton, volleyball, hockey, athletics gear, table tennis, and multi-sport equipment for schools, clubs, and government institutions across J&K.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does MDF Enterprises offer AMC (Annual Maintenance Contract) for fitness equipment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. MDF Enterprises offers Annual Maintenance Contracts (AMC) for gymnasium and fitness equipment installed across J&K. AMC covers preventive maintenance, breakdown service, and spare parts supply.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can MDF Enterprises participate in J&K government tenders for sports equipment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. MDF Enterprises participates in J&K government tenders including JKTENDERS, L1 procurement, and GeM portal orders. As an MSME-certified and GeM-registered supplier, MDF qualifies for government sports equipment tenders across all districts of J&K.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does MDF Enterprises supply to districts outside Srinagar in J&K?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. MDF Enterprises delivers sports goods and fitness equipment to all districts of Jammu & Kashmir including Baramulla, Anantnag, Kupwara, Sopore, Jammu, and Leh. We serve 1000+ institutions across the entire union territory.',
      },
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${cormorant.variable}`} suppressHydrationWarning>
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        {/* Schema: WebSite entity */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        {/* Schema: FAQ — AEO + AI citation */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </head>
      <body className="bg-[#050505] text-white antialiased min-h-screen flex flex-col" suppressHydrationWarning>
        <ThemeProvider>
          <div className="noise-overlay" aria-hidden />
          <ClientShell />
          <LenisProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </LenisProvider>
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
