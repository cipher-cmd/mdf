import type { Metadata } from 'next'
import Link from 'next/link'
import { getSiteCopy } from '@/lib/db/content'
import { LEGAL_UPDATED_LABEL } from '@/lib/content/legal'

const BASE_URL = 'https://mdfenterprisesjk.in'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'What information mdfenterprisesjk.in collects, how MDF Enterprises uses it, and how to contact us about it.',
  alternates: { canonical: `${BASE_URL}/privacy` },
  // Page-level openGraph replaces the root one, so the shared fields are repeated
  openGraph: {
    type: 'website', siteName: 'MDF Enterprises', locale: 'en_IN', url: `${BASE_URL}/privacy`, title: 'Privacy Policy | MDF Enterprises',
    description: 'What information mdfenterprisesjk.in collects, how MDF Enterprises uses it, and how to contact us about it.',
  },
}

// Every statement here describes what the site actually does; update it if the site starts collecting more
export default async function PrivacyPage() {
  const { contact } = await getSiteCopy()
  return (
    <div className="bg-[#F7F7F7] min-h-dvh pt-28 sm:pt-32 pb-20 text-[#141414]">
      <article className="article-body max-w-[680px] mx-auto px-4 sm:px-6">
        <h1 className="text-[38px] sm:text-[52px] font-bold leading-[1] font-serif-heading mb-3">Privacy Policy</h1>
        <p>Last updated: {LEGAL_UPDATED_LABEL}</p>

        <p>
          This page explains what happens to your information when you use mdfenterprisesjk.in, the website of{' '}
          {contact.business_name}, {contact.address_line1}, {contact.address_line2}. We follow India&apos;s Digital Personal
          Data Protection Act, 2023 in how we handle personal information.
        </p>

        <h2>What we collect</h2>
        <p>
          The website has no accounts, no newsletter and no payment forms. The enquiry form does not send anything to our
          servers. When you press send, it opens WhatsApp with your message already typed, and nothing goes to us until you
          send it there yourself.
        </p>
        <p>
          If you contact us by WhatsApp, phone or email, we receive what you choose to share, such as your name, number and
          what you need. We use it only to answer you, prepare quotes and deliver orders.
        </p>

        <h2>Performance measurement</h2>
        <p>
          The site uses Vercel Speed Insights to measure how quickly pages load. It records page speed figures and the page
          address, without cookies and without identifying you. Like any website host, Vercel also keeps standard server
          logs, such as IP address and browser type, for a short time to keep the site secure.
        </p>

        <h2>Cookies</h2>
        <p>
          Visitors are not given any cookies. The only cookie the site sets is a login cookie for our own staff when they
          sign in to manage the website.
        </p>

        <h2>Sharing</h2>
        <p>
          We do not sell or rent your information. We share it only when needed to complete your order, for example with a
          courier, or when the law requires it. WhatsApp, your email provider and your phone network handle messages under
          their own privacy policies.
        </p>

        <h2>How long we keep it</h2>
        <p>
          We keep enquiry messages and order details for as long as we need them to supply, invoice and support your order, and
          longer only where tax or accounting law requires it. After that we delete them.
        </p>

        <h2>Children</h2>
        <p>
          The website is meant for adults buying for themselves or for an institution. We do not knowingly collect information
          from children.
        </p>

        <h2>Your choices</h2>
        <p>
          You can ask us to tell you what we hold about you, or to delete your messages and details, by writing to{' '}
          <a href={`mailto:${contact.email}`}>{contact.email}</a> or calling {contact.phone_display}. You can also ask us to
          correct anything that is wrong, or withdraw your consent for us to keep contacting you.
        </p>

        <h2>Questions and complaints</h2>
        <p>
          For any question or complaint about your information, contact {contact.business_name} at{' '}
          <a href={`mailto:${contact.email}`}>{contact.email}</a>, {contact.phone_display}, or at the showroom address above.
          We reply as soon as we can. If you are not satisfied with our answer, you will be able to take the matter to the Data
          Protection Board of India once its complaint process comes into force.
        </p>

        <h2>Changes</h2>
        <p>
          If the website starts collecting anything new, we will update this page first and change the date at the top. Terms
          for quotes and orders are on our <Link href="/terms">Terms of Use</Link> page.
        </p>
      </article>
    </div>
  )
}
