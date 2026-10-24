import type { Metadata } from 'next'
import Link from 'next/link'
import { getSiteCopy } from '@/lib/db/content'
import { LEGAL_UPDATED_LABEL } from '@/lib/content/legal'

const BASE_URL = 'https://mdfenterprisesjk.in'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'The terms for using mdfenterprisesjk.in and for quotes and orders placed with MDF Enterprises, Srinagar.',
  alternates: { canonical: `${BASE_URL}/terms` },
  // Page-level openGraph replaces the root one, so the shared fields are repeated
  openGraph: {
    type: 'website', siteName: 'MDF Enterprises', locale: 'en_IN', url: `${BASE_URL}/terms`, title: 'Terms of Use | MDF Enterprises',
    description: 'The terms for using mdfenterprisesjk.in and for quotes and orders placed with MDF Enterprises, Srinagar.',
  },
}

// Only states how the business already works; refund windows, delivery times and GST details stay out until confirmed
export default async function TermsPage() {
  const { contact } = await getSiteCopy()
  return (
    <div className="bg-[#F7F7F7] min-h-dvh pt-28 sm:pt-32 pb-20 text-[#141414]">
      <article className="article-body max-w-[680px] mx-auto px-4 sm:px-6">
        <h1 className="text-[38px] sm:text-[52px] font-bold leading-[1] font-serif-heading mb-3">Terms of Use</h1>
        <p>Last updated: {LEGAL_UPDATED_LABEL}</p>

        <p>
          These terms cover your use of mdfenterprisesjk.in and any quote or order you place with {contact.business_name},{' '}
          {contact.address_line1}, {contact.address_line2}. By using the website you accept them.
        </p>

        <h2>Product information</h2>
        <p>
          We describe and photograph products as accurately as we can. Pictures are for reference, and the exact model, colour or
          specification can differ from what is shown. Brand names and logos belong to their owners and appear because we sell
          their products.
        </p>

        <h2>Prices and quotes</h2>
        <p>
          The website does not show prices or take payments. Prices are given in a written quote by WhatsApp, email or on paper.
          A quote is an offer, not a confirmed order, and stock and prices can change until we confirm the order with you.
        </p>

        <h2>Orders and payment</h2>
        <p>
          An order is confirmed when we accept it in writing. Delivery, installation, payment terms and any return arrangement
          are agreed for each order and written into the quote or invoice. We accept cash, bank transfer and UPI.
        </p>

        <h2>Government and GeM orders</h2>
        <p>
          Orders placed through the Government e-Marketplace (GeM) or a public tender follow the terms of that portal or tender
          document. Where they differ from this page, the portal or tender terms apply.
        </p>

        <h2>Warranty</h2>
        <p>
          Products that carry a manufacturer&apos;s warranty are covered by that brand&apos;s own terms. We help you raise warranty
          claims with the brand. Installation and maintenance work is covered by what is written in the order or annual
          maintenance contract.
        </p>

        <h2>Using this website</h2>
        <p>
          You may read, share and link to pages on this website. Please do not copy its text, photos or design for commercial
          use without our permission, or try to disrupt the site or reach its admin area. Articles on the blog are general
          guidance, so check specifications and procurement rules for your own situation before you buy.
        </p>

        <h2>Links to other sites</h2>
        <p>
          Some pages link to other websites, such as WhatsApp, Google Maps, GeM or news sources. We do not control those
          sites and are not responsible for their content.
        </p>

        <h2>Liability</h2>
        <p>
          We are not liable for losses caused by relying on the website alone, or by the site being briefly unavailable. Nothing
          in these terms limits your rights as a consumer under Indian law.
        </p>

        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws of India. Any dispute falls under the courts at Srinagar, Jammu &amp; Kashmir.
        </p>

        <h2>Changes and contact</h2>
        <p>
          We update these terms when the way we work changes, and the date at the top shows the latest version. Questions go to{' '}
          <a href={`mailto:${contact.email}`}>{contact.email}</a> or {contact.phone_display}. How we handle your information is
          explained in our <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </article>
    </div>
  )
}
