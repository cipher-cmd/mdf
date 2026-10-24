import { getSiteCopy } from '@/lib/db/content'

const SHOWN = 6

function Item({ q, a }: { q: string; a: string }) {
  return (
    // One answer open at a time, so the list never balloons
    <details name="faq" className="group border-b border-[#E2D8C6]">
      <summary className="flex items-start justify-between gap-5 py-4 sm:py-[18px] cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <h3 className="text-[15.5px] sm:text-[18px] font-semibold text-[#141414] leading-snug font-serif-heading group-hover:text-[#8B6B23] transition-colors">{q}</h3>
        <span aria-hidden className="mt-0.5 text-[#8B6B23] text-[20px] leading-none transition-transform duration-300 group-open:rotate-45">+</span>
      </summary>
      <p className="pb-5 pr-8 text-[14px] sm:text-[14.5px] text-[#4E4841] leading-[1.65]">{a}</p>
    </details>
  )
}

/** Plain-HTML questions and answers: readable without JavaScript, so crawlers and AI answers can quote them (the folded ones too). */
export async function Faq() {
  const { home_faq: copy } = await getSiteCopy()
  const faq = copy.items.filter(f => f.q.trim() && f.a.trim())
  const rest = faq.slice(SHOWN)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  }
  return (
    <section id="faq" aria-labelledby="faq-heading" className="faq relative bg-[#F7F7F7] py-12 sm:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
      <div className="max-w-[1180px] mx-auto px-5 sm:px-6 md:px-10 grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-6 lg:gap-16">
        <div className="lg:sticky lg:top-28 self-start">
          <h2 id="faq-heading" className="text-[26px] sm:text-[36px] lg:text-[42px] font-bold text-[#141414] leading-[1.04] tracking-[-0.01em] font-serif-heading">
            {copy.heading}
          </h2>
          <p className="mt-3 text-[#4E4841] text-[14px] sm:text-[14.5px] leading-[1.6] max-w-[380px]">
            {copy.text}
          </p>
        </div>
        <div className="border-t border-[#E2D8C6]">
          {faq.slice(0, SHOWN).map(f => <Item key={f.q} {...f} />)}
          {rest.length > 0 && (
            <details className="group/more">
              <summary className="mt-5 inline-flex items-center gap-2.5 pl-5 pr-1.5 min-h-[44px] rounded-full border border-[#E2D8C6] hover:border-[#CCA552] text-[13px] font-semibold text-[#141414] cursor-pointer list-none [&::-webkit-details-marker]:hidden transition-colors">
                <span className="group-open/more:hidden">{rest.length} more questions</span>
                <span className="hidden group-open/more:inline">Fewer questions</span>
                <span aria-hidden className="w-8 h-8 rounded-full bg-[#141414] text-white flex items-center justify-center text-[16px] leading-none transition-transform duration-300 group-open/more:rotate-45">+</span>
              </summary>
              <div className="mt-5 border-t border-[#E2D8C6]">{rest.map(f => <Item key={f.q} {...f} />)}</div>
            </details>
          )}
        </div>
      </div>
    </section>
  )
}
