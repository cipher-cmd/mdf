import { CaretRight } from '@phosphor-icons/react/dist/ssr'
import type { DepartmentGuide } from '@/lib/content/departments'

/** Long-form copy, stock list and FAQ under a department or sport page. FAQ answers arrive with contact details already filled in. */
export function GuideSection({ guide }: { guide: Pick<DepartmentGuide, 'heading' | 'body' | 'stock' | 'faq'> }) {
  return (
    <section aria-labelledby="guide-heading" className="mt-16 sm:mt-24 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
      <div>
        <h2 id="guide-heading" className="text-[30px] sm:text-[40px] font-bold leading-[1.05] font-serif-heading">{guide.heading}</h2>
        {guide.body.map(p => <p key={p.slice(0, 24)} className="mt-4 text-[15px] leading-relaxed text-[#554E46]">{p}</p>)}
        <h3 className="mt-8 mb-3 text-[16px] font-semibold text-[#141414]">What we stock</h3>
        <ul className="space-y-2 text-[14.5px] text-[#141414]">
          {guide.stock.map(s => <li key={s} className="relative pl-4 before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#CCA552]">{s}</li>)}
        </ul>
      </div>
      <div>
        <h2 className="text-[22px] sm:text-[26px] font-bold font-serif-heading">Common questions</h2>
        <div className="mt-4 divide-y divide-[#E5E5E5] border-y border-[#E5E5E5]">
          {guide.faq.map(({ q, a }) => (
            <details key={q} className="group py-4">
              <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden flex justify-between gap-4 text-[15px] font-semibold">
                {q}
                <CaretRight size={14} weight="bold" className="mt-1 flex-shrink-0 text-[#B8923F] transition-transform group-open:rotate-90" />
              </summary>
              <p className="mt-2 text-[14.5px] leading-relaxed text-[#554E46]">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
