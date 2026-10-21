import type { Metadata } from 'next'
import { getSiteCopy } from '@/lib/db/content'

const BASE_URL = 'https://mdfenterprisesjk.in'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'What information mdfenterprisesjk.in collects, how MDF Enterprises uses it, and how to contact us about it.',
  alternates: { canonical: `${BASE_URL}/privacy` },
}

// Every statement here describes what the site actually does; update it if the site starts collecting more
export default async function PrivacyPage() {
  const { contact } = await getSiteCopy()
  return (
    <div className="bg-[#F7F7F7] min-h-dvh pt-28 sm:pt-32 pb-20 text-[#141414]">
      <article className="article-body max-w-[680px] mx-auto px-4 sm:px-6">
        <h1 className="text-[38px] sm:text-[52px] font-bold leading-[1] font-serif-heading mb-3">Privacy Policy</h1>
        <p>Last updated: 21 October 2026</p>

        <p>
          This page explains what happens to your information when you use mdfenterprisesjk.in, the website of{' '}
          {contact.business_name}, {contact.address_line1}, {contact.address_line2}.
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

        <h2>Your choices</h2>
        <p>
          You can ask us to tell you what we hold about you, or to delete your messages and details, by writing to{' '}
          <a href={`mailto:${contact.email}`}>{contact.email}</a> or calling {contact.phone_display}.
        </p>
      </article>
    </div>
  )
}
