// Long-form copy for each department page. These pages are what people land on when they search
// "cricket bats Srinagar" or "gym equipment Kashmir", so each one answers that search on its own.
// Only facts the business has confirmed (see faq.ts and public/llms.txt). Departments added in the
// admin without an entry here simply skip this section.

export interface DepartmentGuide {
  heading: string
  body: string[]
  /** What the department covers, one line each */
  stock: string[]
  /** Words that tie a blog post to this department */
  keywords: string[]
  faq: { q: string; a: string }[]
}

export const DEPARTMENT_GUIDES: Record<string, DepartmentGuide> = {
  sports: {
    heading: 'Sports goods shop in Srinagar',
    body: [
      'MDF Enterprises has sold sports goods from SDA Shopping Complex, opposite Iqbal Park in Srinagar, since 1997. Walk in for a single cricket bat or send us a list for a whole school sports room. Either way the stock is genuine, bought directly from SG, SS, YONEX, NIVIA, COSCO, STAG, SPARTAN, JONEX, NETCO and other brands.',
      'Most of our sports orders come from schools, colleges, clubs and government departments across Jammu & Kashmir. We quote for bulk orders, supply through the GeM portal and take part in L1 tenders, and our team can install courts and multi-activity zones.',
    ],
    stock: [
      'Cricket: bats, balls, batting pads, gloves, helmets and full protection sets',
      'Football, volleyball and hockey gear',
      'Badminton rackets and shuttles',
      'Table tennis tables and accessories',
      'Athletics equipment and turf shoes',
      'Multi-sport kits for school sports rooms',
    ],
    keywords: ['cricket', 'bat', 'football', 'badminton', 'volleyball', 'hockey', 'athletic', 'table tennis', 'sports goods', 'sports equipment', 'shuttle', 'racket'],
    faq: [
      {
        q: 'Where can I buy cricket equipment in Srinagar?',
        a: 'MDF Enterprises at SDA Shopping Complex, opposite Iqbal Park, Srinagar stocks cricket bats, balls, pads, gloves, helmets and protection sets from SG, SS and other brands. The shop is open Monday to Saturday, 10:00 to 19:00.',
      },
      {
        q: 'Which sports brands does MDF Enterprises sell?',
        a: 'MDF Enterprises is an authorised dealer for SG, SS, YONEX, NIVIA, COSCO, STAG, SPARTAN, JONEX and NETCO, among 25+ brands. All stock is genuine and sourced directly.',
      },
      {
        q: 'Can schools order sports equipment in bulk from MDF Enterprises?',
        a: 'Yes. Schools, colleges and clubs across J&K order in bulk by WhatsApp on +91 70062 52334 or by email at mdfenterprisesjk@gmail.com. Government buyers can also order through the GeM portal.',
      },
      {
        q: 'Does MDF Enterprises deliver sports goods outside Srinagar?',
        a: 'Yes. MDF Enterprises delivers to every district of Jammu & Kashmir, including Jammu, Baramulla, Anantnag, Kupwara and Sopore.',
      },
    ],
  },
  fitness: {
    heading: 'Gym and fitness equipment in Srinagar',
    body: [
      'MDF Enterprises supplies gym machines, cardio equipment, free weights and gym flooring from our Srinagar showroom. We sell single pieces for home gyms and full fit-outs for schools, colleges, police and army units, and private gyms.',
      'Our in-house team installs what we sell, and we offer Annual Maintenance Contracts (AMC) covering preventive servicing, breakdown repairs and spare parts. Government departments can buy through the GeM portal or by tender.',
    ],
    stock: [
      'Treadmills and cardio machines',
      'Multi-gyms and strength machines',
      'Dumbbells, plates, bars and weight sets',
      'Gym flooring',
      'Yoga mats and accessories',
      'Complete gymnasium fit-outs with installation',
    ],
    keywords: ['gym', 'fitness', 'treadmill', 'weight', 'dumbbell', 'cardio', 'gymnasium', 'yoga', 'workout', 'strength'],
    faq: [
      {
        q: 'Where can I buy gym equipment in Srinagar?',
        a: 'MDF Enterprises at SDA Shopping Complex, opposite Iqbal Park, Srinagar sells treadmills, multi-gyms, free weights, gym flooring and yoga mats, and installs complete gymnasiums.',
      },
      {
        q: 'Does MDF Enterprises install gym equipment?',
        a: 'Yes. MDF Enterprises has an in-house installation team for gymnasium fit-outs across J&K and has completed 500+ installations, including gyms, music labs and sports courts.',
      },
      {
        q: 'Is there an AMC for gym equipment in J&K?',
        a: 'Yes. MDF Enterprises offers Annual Maintenance Contracts for gym and fitness equipment across J&K, covering preventive maintenance, breakdown service and spare parts.',
      },
      {
        q: 'Can a government department buy gym equipment from MDF Enterprises on GeM?',
        a: 'Yes. MDF Enterprises is a GeM-registered, MSME-certified supplier, so departments, schools and institutions can buy fitness equipment through the GeM portal or by L1 tender.',
      },
    ],
  },
  music: {
    heading: 'Musical instruments shop in Srinagar',
    body: [
      'MDF Enterprises sells musical instruments in Srinagar: tablas, harmoniums and other percussion, guitars, keyboards and complete band sets.',
      'We also set up music labs for schools, including the instruments and acoustic treatment, which helps schools building music programmes under NEP 2020. Schools and departments can order through the GeM portal.',
    ],
    stock: [
      'Tabla, harmonium and percussion',
      'Guitars and other string instruments',
      'Keyboards',
      'Band sets for schools',
      'School music lab setup with acoustic treatment',
    ],
    keywords: ['music', 'instrument', 'tabla', 'harmonium', 'guitar', 'keyboard', 'band', 'percussion'],
    faq: [
      {
        q: 'Where can I buy a tabla or harmonium in Srinagar?',
        a: 'MDF Enterprises at SDA Shopping Complex, opposite Iqbal Park, Srinagar stocks tablas, harmoniums and other percussion, along with guitars and keyboards.',
      },
      {
        q: 'Does MDF Enterprises set up music labs for schools?',
        a: 'Yes. MDF Enterprises sets up complete school music labs in J&K, supplying the instruments and acoustic treatment, for schools building music programmes under NEP 2020.',
      },
      {
        q: 'Can schools buy musical instruments through GeM from MDF Enterprises?',
        a: 'Yes. MDF Enterprises is a registered GeM supplier, so government schools and institutions in J&K can buy musical instruments through the GeM portal.',
      },
    ],
  },
  awards: {
    heading: 'Trophies, medals and awards in Srinagar',
    body: [
      'MDF Enterprises makes custom trophies, medals, shields and mementos in Srinagar for schools, sports tournaments, government functions and corporate events, with engraving done to order.',
      'For a tournament or annual day, send us the event name, the number of awards and your date. We will quote and confirm the design on WhatsApp before production.',
    ],
    stock: [
      'Trophies and cups',
      'Medals',
      'Shields and plaques',
      'Mementos',
      'Custom engraving',
    ],
    keywords: ['trophy', 'trophies', 'medal', 'award', 'shield', 'memento', 'engraving', 'tournament', 'prize'],
    faq: [
      {
        q: 'Where can I get custom trophies made in Srinagar?',
        a: 'MDF Enterprises at SDA Shopping Complex, opposite Iqbal Park, Srinagar makes custom trophies, medals, shields and mementos with engraving for schools, tournaments and events.',
      },
      {
        q: 'Does MDF Enterprises take bulk orders for medals?',
        a: 'Yes. Send the event, quantity and date on WhatsApp to +91 70062 52334 or email mdfenterprisesjk@gmail.com for a quote on bulk trophies and medals.',
      },
      {
        q: 'Can government departments buy awards from MDF Enterprises?',
        a: 'Yes. MDF Enterprises is GeM-registered and MSME-certified, and supplies awards and trophies to government departments and institutions across J&K.',
      },
    ],
  },
}

/** The department a blog post is mostly about, judged by its title and excerpt; null when nothing matches */
export function departmentFor(text: string): string | null {
  const t = text.toLowerCase()
  let best: string | null = null
  let bestHits = 0
  for (const [id, guide] of Object.entries(DEPARTMENT_GUIDES)) {
    const hits = guide.keywords.filter(k => t.includes(k)).length
    if (hits > bestHits) [best, bestHits] = [id, hits]
  }
  return best
}
