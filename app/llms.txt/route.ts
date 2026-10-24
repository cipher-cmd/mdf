import { getCategories, getPublishedPosts, getSiteCopy } from '@/lib/db/content'

const BASE_URL = 'https://mdfenterprisesjk.in'

// Same refresh rhythm as the sitemap; admin saves clear it with the rest of the site
export const revalidate = 3600

/** Plain-text brief for AI assistants (llmstxt.org), built from the same data as the pages. */
export async function GET() {
  const [copy, categories, allPosts] = await Promise.all([getSiteCopy(), getCategories(), getPublishedPosts()])
  const { contact, seo, home_about, home_faq, home_clients, home_brands } = copy
  const posts = allPosts.filter(p => p.indexable !== false)
  const closed = contact.closed_days.join(', ')

  const body = [
    `# ${contact.business_name}`,
    '',
    `> ${seo.site_description}`,
    '',
    '## About',
    '',
    `- [Homepage](${BASE_URL}/): company overview, certifications, institutions served, brands and contact details.`,
    `- Founded: 1997 in Srinagar, Jammu & Kashmir, by ${home_about.founder_name}`,
    '- Certifications: GeM registered supplier (Government e-Marketplace), MSME certified',
    `- Address: ${contact.address_line1}, ${contact.address_line2}`,
    `- Phone and WhatsApp: ${contact.phone_display}`,
    `- Email: ${contact.email}`,
    `- Hours: ${contact.open_time} to ${contact.close_time} IST${closed ? `, closed ${closed}` : ''}`,
    `- Institutions served include: ${home_clients.clients.map(c => c.name).join(', ')}`,
    `- Authorised dealer for: ${home_brands.brands.map(b => b.name).join(', ')}`,
    '- Service area: all districts of Jammu & Kashmir, plus Leh and Kargil in Ladakh',
    '- Services: retail and bulk supply, GeM and tender orders, gymnasium, sports court and music lab installation, AMC',
    '',
    '## Products',
    '',
    ...categories.map(c => `- [${c.label}](${BASE_URL}/products/${c.id}): ${c.items.replace(/ · /g, ', ')}`),
    `- [All products](${BASE_URL}/products)`,
    '',
    '## Common questions',
    '',
    ...home_faq.items.filter(f => f.q.trim() && f.a.trim()).flatMap(f => [`### ${f.q}`, '', f.a, '']),
    '## Articles',
    '',
    ...posts.map(p => `- [${p.title}](${BASE_URL}/blog/${p.slug}): ${p.excerpt}`),
    '',
    '## Policies',
    '',
    `- [Privacy Policy](${BASE_URL}/privacy)`,
    `- [Terms of Use](${BASE_URL}/terms)`,
    '',
  ].join('\n')

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
