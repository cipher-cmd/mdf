// Shown on the homepage and marked up as FAQPage there. Search engines and AI answers quote these directly,
// so each answer stands on its own: name the business, the place and the fact.
export const FAQ: { q: string; a: string }[] = [
  {
    q: 'Is MDF Enterprises a GeM-registered supplier?',
    a: 'Yes. MDF Enterprises is a registered supplier on the Government e-Marketplace (GeM). Government departments, schools, and institutions across J&K can procure sports goods, fitness equipment, musical instruments and awards through the GeM portal.',
  },
  {
    q: 'What brands does MDF Enterprises stock?',
    a: 'MDF Enterprises is an authorised dealer for SG, YONEX, NIVIA, COSCO, STAG, SPARTAN, SS, JONEX and NETCO, among 25+ premium sports and fitness brands. All stock is genuine and sourced directly.',
  },
  {
    q: 'Does MDF Enterprises supply to government institutions in J&K?',
    a: 'Yes. MDF Enterprises supplies sports goods, fitness equipment, and musical instruments to government departments (DYSO, Police, Army), universities, schools, and medical colleges across J&K through direct orders, L1 tenders, and the GeM portal.',
  },
  {
    q: 'Where is MDF Enterprises located?',
    a: 'MDF Enterprises is located at SDA Shopping Complex, Opposite Iqbal Park, Srinagar, Jammu & Kashmir 190008. Established in 1997, we serve all districts of J&K.',
  },
  {
    q: 'Does MDF Enterprises do installation of gymnasium and fitness equipment?',
    a: 'Yes. MDF Enterprises has an in-house installation team specialised in gymnasium fit-outs, sports court installation, music lab setup, and multi-activity zone commissioning across J&K.',
  },
  {
    q: 'How can I place a bulk order with MDF Enterprises?',
    a: 'For bulk orders, contact MDF Enterprises on WhatsApp at +91 70062 52334 or email mdfenterprisesjk@gmail.com. We handle bulk procurement for government departments, schools, clubs, and private organisations across J&K.',
  },
  {
    q: 'What sports equipment does MDF Enterprises supply?',
    a: 'MDF Enterprises supplies cricket equipment (bats, balls, pads, helmets), football, badminton, volleyball, hockey, athletics gear, table tennis, and multi-sport equipment for schools, clubs, and government institutions across J&K.',
  },
  {
    q: 'Does MDF Enterprises offer AMC (Annual Maintenance Contract) for fitness equipment?',
    a: 'Yes. MDF Enterprises offers Annual Maintenance Contracts (AMC) for gymnasium and fitness equipment installed across J&K. AMC covers preventive maintenance, breakdown service, and spare parts supply.',
  },
  {
    q: 'Can MDF Enterprises participate in J&K government tenders for sports equipment?',
    a: 'Yes. MDF Enterprises participates in J&K government tenders including JKTENDERS, L1 procurement, and GeM portal orders. As an MSME-certified and GeM-registered supplier, MDF qualifies for government sports equipment tenders across all districts of J&K.',
  },
  {
    q: 'Does MDF Enterprises supply to districts outside Srinagar in J&K?',
    a: 'Yes. MDF Enterprises delivers sports goods and fitness equipment to all districts of Jammu & Kashmir including Baramulla, Anantnag, Kupwara, Sopore and Jammu, and to Leh and Kargil in Ladakh. We serve 1000+ institutions across the region.',
  },
]

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
}
