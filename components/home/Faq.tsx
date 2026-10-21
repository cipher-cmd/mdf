import { FAQ, faqSchema } from '@/lib/content/faq'

/** Plain-HTML questions and answers: readable without JavaScript, so crawlers and AI answers can quote them. */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="relative bg-[#FAF8F5] py-16 sm:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="max-w-[1180px] mx-auto px-5 sm:px-6 md:px-10 grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 lg:gap-16">
        <div className="lg:sticky lg:top-28 self-start">
          <p className="mb-1.5 text-[11px] tracking-[0.2em] font-semibold text-[#8B6B23] uppercase">— Questions</p>
          <h2 id="faq-heading" className="text-[28px] sm:text-[36px] lg:text-[42px] font-bold text-[#141414] leading-[1.04] tracking-[-0.01em] font-serif-heading">
            Asked at the counter, answered here.
          </h2>
          <p className="mt-3 text-[#4E4841] text-[14.5px] leading-[1.6] max-w-[380px]">
            Procurement, brands, delivery and installation. If yours is not here, ask us on WhatsApp.
          </p>
        </div>
        <div className="border-t border-[#E2D8C6]">
          {FAQ.map(({ q, a }) => (
            <details key={q} className="group border-b border-[#E2D8C6]">
              <summary className="flex items-start justify-between gap-6 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <h3 className="text-[17px] sm:text-[19px] font-semibold text-[#141414] leading-snug font-serif-heading">{q}</h3>
                <span aria-hidden className="mt-1 text-[#8B6B23] text-[20px] leading-none transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="pb-6 pr-8 text-[14.5px] text-[#4E4841] leading-[1.7]">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
