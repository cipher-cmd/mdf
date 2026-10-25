import type { Metadata } from 'next'
import Link from 'next/link'
import { getCategories, getSiteCopy } from '@/lib/db/content'
import { telHref } from '@/lib/content/copy'

const BASE_URL = 'https://mdfenterprisesjk.in'
const TITLE = 'Brand Partners & Distribution in Jammu & Kashmir'
const DESCRIPTION =
  'Looking for a dealer or distributor in Srinagar and J&K? MDF Enterprises has sold sports, fitness, music and awards brands since 1997, with a showroom, GeM registration and 1000+ institutional buyers.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${BASE_URL}/partners` },
  // Page-level openGraph replaces the root one, so the shared fields are repeated
  openGraph: {
    type: 'website', siteName: 'MDF Enterprises', locale: 'en_IN', url: `${BASE_URL}/partners`,
    title: `${TITLE} | MDF Enterprises`, description: DESCRIPTION,
  },
}

// For brands choosing a J&K dealer. Only facts already stated elsewhere on the site; no margins, volumes or exclusivity claims
export default async function PartnersPage() {
  const [{ contact, home_brands, home_clients }, departments] = await Promise.all([getSiteCopy(), getCategories()])
  const brands = home_brands.brands.map(b => b.name).join(', ')
  const clients = home_clients.clients.map(c => c.name).join(', ')

  return (
    <div className="bg-[#F7F7F7] min-h-dvh pt-28 sm:pt-32 pb-20 text-[#141414]">
      <article className="article-body max-w-[680px] mx-auto px-4 sm:px-6">
        <h1 className="text-[38px] sm:text-[52px] font-bold leading-[1] font-serif-heading mb-3">{TITLE}</h1>
        <p>
          {contact.business_name} is a sports, fitness, music and awards retailer and institutional supplier in Srinagar,
          trading since 1997. If your brand is looking for a dealer or distributor in Jammu &amp; Kashmir, this page sets out
          what we bring.
        </p>

        <h2>A showroom in central Srinagar</h2>
        <p>
          Our showroom is at {contact.address_line1}, {contact.address_line2}. Players, parents, coaches and school buyers walk
          in to see and handle products before they buy, so your range is on display where the region shops for sport.
        </p>

        <h2>Institutional and government buyers</h2>
        <p>
          We are a GeM-registered, MSME-certified supplier and take part in L1 tenders. More than 1000 schools, colleges, clubs
          and departments have bought from us, including {clients}.
        </p>

        <h2>Reach across J&amp;K and Ladakh</h2>
        <p>
          We deliver to every district of Jammu &amp; Kashmir, plus Leh and Kargil. Our in-house team has completed 500+
          installations of gyms, sports courts and music labs, and offers annual maintenance contracts after the sale.
        </p>

        <h2>Brands we already carry</h2>
        <p>{brands}.</p>
        <p>
          Our departments:{' '}
          {departments.map((d, i) => (
            <span key={d.id}>{i > 0 && ', '}<Link href={`/products/${d.id}`}>{d.label}</Link></span>
          ))}
          .
        </p>

        <h2>Talk to us</h2>
        <p>
          Brand and distribution enquiries go to <a href={`mailto:${contact.email}`}>{contact.email}</a> or{' '}
          <a href={telHref(contact.phone_display)}>{contact.phone_display}</a> (also on WhatsApp). Tell us the brand, the
          product range and the territory you have in mind.
        </p>
      </article>
    </div>
  )
}
