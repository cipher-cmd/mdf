// Long-form copy for each department page. These pages are what people land on when they search
// "cricket bats Srinagar" or "gym equipment Kashmir", so each one answers that search on its own.
// Only facts the business has confirmed (see the home FAQ in lib/content/copy.ts). Departments added in the
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
      'Cricket: English willow and Kashmir willow bats, balls, batting pads, gloves, helmets, full kits and turf mats',
      'Combat sports: boxing and MMA gloves, punching bags, kickboxing pads, shin guards, judo and karate tatami mats',
      'Football: NIVIA and COSCO footballs, turf boots, goalposts and goal nets',
      'Basketball and volleyball: balls, hoops, acrylic backboards, posts and nets, with court installation',
      'Badminton: YONEX rackets, feather and nylon shuttlecocks, nets',
      'Table tennis: STAG tables, bats and balls',
      'Hockey, athletics equipment and multi-sport kits for school sports rooms',
    ],
    keywords: [
      'cricket', 'bat', 'football', 'badminton', 'volleyball', 'hockey', 'athletic', 'table tennis', 'sports goods', 'sports equipment',
      'shuttle', 'racket', 'boxing', 'mma', 'kickboxing', 'judo', 'karate', 'tatami', 'combat', 'basketball', 'hoop', 'turf', 'goalpost',
    ],
    faq: [
      {
        q: 'Where is a good sports shop in Srinagar?',
        a: 'MDF Enterprises is a sports shop at SDA Shopping Complex, opposite Iqbal Park, Srinagar, trading since 1997. It stocks cricket, football, badminton, table tennis, basketball, volleyball and combat sports gear, and is open Monday to Saturday, 10:00 to 19:00.',
      },
      {
        q: 'Which sports brands does MDF Enterprises sell?',
        a: 'MDF Enterprises is an authorised dealer for SG, SS, YONEX, NIVIA, COSCO, STAG, SPARTAN, JONEX and NETCO, among 25+ brands. All stock is genuine and sourced directly.',
      },
      {
        q: 'Can schools order sports equipment in bulk from MDF Enterprises?',
        a: 'Yes. Schools, colleges and clubs across J&K order in bulk by WhatsApp on {phone} or by email at {email}. Government buyers can also order through the GeM portal.',
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
      'Commercial treadmills, elliptical cross trainers and spin bikes',
      'Multi-station gyms and strength machines',
      'Rubber hex dumbbells, Olympic plates, barbells, squat racks and adjustable benches',
      'Rubber gym flooring',
      'Open-air gym equipment for parks and campuses',
      'Yoga mats and accessories',
      'Complete gymnasium fit-outs with installation and AMC',
    ],
    keywords: ['gym', 'fitness', 'treadmill', 'weight', 'dumbbell', 'cardio', 'gymnasium', 'yoga', 'workout', 'strength', 'elliptical', 'barbell', 'bench', 'open gym', 'outdoor gym'],
    faq: [
      {
        q: 'Where can I buy gym equipment in Srinagar?',
        a: 'MDF Enterprises at SDA Shopping Complex, opposite Iqbal Park, Srinagar sells treadmills, multi-gyms, free weights, gym flooring and yoga mats, and installs complete gymnasiums.',
      },
      {
        q: 'Who supplies outdoor open-air gym equipment in J&K?',
        a: 'MDF Enterprises supplies and installs open-air gym equipment for parks, campuses and public spaces across Jammu & Kashmir, and government buyers can order it through the GeM portal.',
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
      'Acoustic and electric guitars, violins and rubabs',
      'Keyboards',
      'Marching brass band sets for schools',
      'School music lab setup with acoustic treatment',
    ],
    keywords: ['music', 'instrument', 'tabla', 'harmonium', 'guitar', 'keyboard', 'band', 'percussion', 'violin', 'rubab'],
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
      'Metal trophies and winners cups',
      'Gold, silver and bronze medals',
      'Institutional shields, wooden plaques and crystal awards',
      'Mementos',
      'Custom engraving',
    ],
    keywords: ['trophy', 'trophies', 'medal', 'award', 'shield', 'memento', 'engraving', 'tournament', 'prize', 'plaque', 'crystal'],
    faq: [
      {
        q: 'Where can I get custom trophies made in Srinagar?',
        a: 'MDF Enterprises at SDA Shopping Complex, opposite Iqbal Park, Srinagar makes custom trophies, medals, shields and mementos with engraving for schools, tournaments and events.',
      },
      {
        q: 'Does MDF Enterprises take bulk orders for medals?',
        a: 'Yes. Send the event, quantity and date on WhatsApp to {phone} or email {email} for a quote on bulk trophies and medals.',
      },
      {
        q: 'Can government departments buy awards from MDF Enterprises?',
        a: 'Yes. MDF Enterprises is GeM-registered and MSME-certified, and supplies awards and trophies to government departments and institutions across J&K.',
      },
    ],
  },
}

export interface SportGuide extends DepartmentGuide {
  /** Short name for links and breadcrumbs */
  label: string
  /** Page heading, written as the search it answers */
  title: string
  /** Shorter <title>, kept under ~65 characters with the brand suffix */
  seoTitle: string
  description: string
}

// One page per sport under /products/sports, so a search for "boxing gloves Srinagar" lands on a page about exactly that.
// Each answers its own search with its own copy and FAQ; keywords pick the matching products and articles.
export const SPORT_GUIDES: Record<string, SportGuide> = {
  cricket: {
    label: 'Cricket',
    title: 'Cricket Bats & Full Kits in Srinagar: English Willow & Kashmir Willow',
    seoTitle: 'Cricket Bats & Kits in Srinagar',
    description: 'Buy English willow and Kashmir willow cricket bats, batting gloves, pads, helmets, balls and turf mats in Srinagar. SG and SS dealer, MDF Enterprises, since 1997.',
    heading: 'Cricket bat seller in Srinagar',
    body: [
      'Kashmir makes the willow, and Srinagar plays a lot of cricket. At our showroom in SDA Shopping Complex, opposite Iqbal Park, you can pick up and knock in English willow and Kashmir willow bats before you buy, then kit out with gloves, pads, a helmet and balls in the same visit.',
      'We are a dealer for SG and SS, and we supply full team kits to schools, colleges and clubs across J&K. Grounds and academies order turf mats from us, and government buyers can order through the GeM portal.',
    ],
    stock: [
      'English willow and Kashmir willow bats, for juniors and seniors',
      'Batting gloves and batting pads',
      'Helmets and full protection sets',
      'Cricket balls',
      'Full cricket kits for schools and clubs',
      'Cricket turf mats for grounds, nets and schools',
    ],
    keywords: ['cricket', 'bat', 'willow', 'batting', 'helmet', 'wicket'],
    faq: [
      {
        q: 'Where can I buy a cricket bat in Srinagar?',
        a: 'MDF Enterprises at SDA Shopping Complex, opposite Iqbal Park, Srinagar sells English willow and Kashmir willow cricket bats from SG, SS and other brands. The shop is open Monday to Saturday, 10:00 to 19:00.',
      },
      {
        q: 'Should I buy an English willow or a Kashmir willow bat?',
        a: 'Kashmir willow is heavier and harder, costs less and suits tennis-ball cricket and beginners. English willow is lighter, gives more ping off the middle and suits leather-ball cricket. Come to the shop and hold both before you decide.',
      },
      {
        q: 'Can a school or club order full cricket kits?',
        a: 'Yes. Send the number of players and the age group on WhatsApp to {phone} or email {email} for a quote. Government institutions can also order through the GeM portal.',
      },
    ],
  },
  'combat-sports': {
    label: 'Combat sports',
    title: 'Boxing, MMA, Kickboxing & Judo Equipment in Srinagar: Gloves, Bags & Tatami Mats',
    seoTitle: 'Boxing, MMA & Judo Equipment in Srinagar',
    description: 'Where to buy boxing gloves, MMA gloves, punching bags, kickboxing pads, shin guards, judo and karate tatami mats and wushu kits in Srinagar. MDF Enterprises, since 1997.',
    heading: 'Boxing, MMA and judo equipment in Srinagar',
    body: [
      'Combat sports have grown fast in Kashmir, and fighters, coaches and academies need gear that holds up to daily training. We stock gloves, bags, pads and protection for boxing, MMA and kickboxing, and tatami mats for judo, karate and wushu, at our Srinagar showroom.',
      'Clubs and academies setting up a training hall can get mats, bags and gloves in one order. We deliver across J&K, and schools and government departments can buy through the GeM portal.',
    ],
    stock: [
      'Boxing gloves',
      'MMA gloves',
      'Punching bags',
      'Kickboxing pads',
      'Shin guards',
      'Judo and karate tatami mats, and wushu kits',
    ],
    keywords: ['boxing', 'mma', 'kickboxing', 'judo', 'karate', 'wushu', 'tatami', 'punching', 'combat', 'martial'],
    faq: [
      {
        q: 'Where can I buy boxing, MMA or judo equipment in Srinagar?',
        a: 'MDF Enterprises in Srinagar stocks boxing and MMA gloves, punching bags, kickboxing pads, shin guards and judo and karate tatami mats, for individual fighters as well as clubs and academies.',
      },
      {
        q: 'Do you supply tatami mats for a judo or karate hall?',
        a: 'Yes. Tell us the size of the hall on WhatsApp at {phone} and we will quote for enough tatami mats to cover it, delivered anywhere in J&K.',
      },
      {
        q: 'Can an academy order gloves and pads in bulk?',
        a: 'Yes. Clubs and academies order gloves, pads and bags in bulk by WhatsApp on {phone} or by email at {email}.',
      },
    ],
  },
  football: {
    label: 'Football',
    title: 'Football, Turf Boots & Goalposts in Kashmir: NIVIA & COSCO Dealer',
    seoTitle: 'Football & Turf Boots in Kashmir: NIVIA, COSCO',
    description: 'Footballs, turf boots, goalposts and goal nets in Srinagar and across Kashmir. Dealer for NIVIA and COSCO, supplying players, schools and clubs since 1997.',
    heading: 'Football and turf supplier in Kashmir',
    body: [
      'More turf grounds open in Kashmir every year, and players need boots that grip on artificial grass. We stock turf boots and footballs, and we are a dealer for NIVIA and COSCO, so the balls and gear are genuine.',
      'For schools, clubs and new grounds we supply goalposts and goal nets alongside balls and team kit, and deliver across J&K. Government buyers can order through the GeM portal.',
    ],
    stock: [
      'NIVIA and COSCO footballs for training and matches',
      'Turf boots and turf shoes',
      'Goalposts and goal nets',
      'Football kits for schools and clubs',
    ],
    keywords: ['football', 'turf', 'goalpost', 'goal net', 'soccer', 'futsal'],
    faq: [
      {
        q: 'Where can I buy football turf boots in Srinagar?',
        a: 'MDF Enterprises at SDA Shopping Complex, opposite Iqbal Park, Srinagar sells turf boots and footballs. The shop is open Monday to Saturday, 10:00 to 19:00.',
      },
      {
        q: 'Is MDF Enterprises a NIVIA and COSCO dealer?',
        a: 'Yes. MDF Enterprises is an authorised dealer for NIVIA and COSCO in Jammu & Kashmir, and all stock is genuine.',
      },
      {
        q: 'Who supplies goalposts in Kashmir?',
        a: 'MDF Enterprises supplies goalposts and goal nets to schools, clubs and grounds across J&K. Ask for a quote on WhatsApp at {phone}.',
      },
    ],
  },
  'badminton-table-tennis': {
    label: 'Badminton & table tennis',
    title: 'Original YONEX Badminton Rackets, Feather Shuttles & STAG TT Tables in Srinagar',
    seoTitle: 'YONEX Badminton & STAG TT Tables, Srinagar',
    description: 'Genuine YONEX badminton rackets, feather and nylon shuttlecocks, nets and STAG table tennis tables in Srinagar. Authorised dealer, MDF Enterprises, since 1997.',
    heading: 'Original YONEX rackets and STAG tables in Srinagar',
    body: [
      'Long winters make Kashmir an indoor-sports place. We sell genuine YONEX badminton rackets and shuttlecocks and STAG table tennis tables, bought directly from the brands, so you are not paying for a copy.',
      'Schools, colleges and clubs order rackets, shuttles, nets and tables from us, delivered anywhere in J&K. Government buyers can order through the GeM portal.',
    ],
    stock: [
      'YONEX badminton rackets for beginners to club players',
      'Feather and nylon shuttlecocks',
      'Badminton nets',
      'STAG table tennis tables',
      'Table tennis bats, balls and nets',
    ],
    keywords: ['badminton', 'shuttle', 'racket', 'racquet', 'yonex', 'table tennis', 'stag', 'indoor'],
    faq: [
      {
        q: 'Where can I buy original YONEX badminton rackets in Srinagar?',
        a: 'MDF Enterprises sells genuine YONEX badminton rackets, feather and nylon shuttlecocks at its showroom in SDA Shopping Complex, opposite Iqbal Park, Srinagar.',
      },
      {
        q: 'Feather or nylon shuttlecocks?',
        a: 'Feather shuttles fly truer and are used in tournaments, but wear out faster. Nylon shuttles last much longer and suit practice, schools and outdoor play.',
      },
      {
        q: 'Where can I buy a STAG table tennis table in Srinagar?',
        a: 'MDF Enterprises sells STAG table tennis tables in Srinagar and delivers them across J&K. Ask for current models and prices on WhatsApp at {phone}.',
      },
    ],
  },
  'basketball-volleyball': {
    label: 'Basketball & volleyball',
    title: 'Basketball Hoops, Acrylic Boards & Volleyball Court Equipment in Jammu & Kashmir',
    seoTitle: 'Basketball Hoops & Volleyball Gear in J&K',
    description: 'Basketball hoops, acrylic backboards, volleyball posts and nets, and balls for schools, colleges and departments across Jammu & Kashmir, with court installation. MDF Enterprises.',
    heading: 'Basketball and volleyball court equipment in J&K',
    body: [
      'A court is only as good as its hoops and posts. We supply basketball hoops and acrylic backboards, volleyball posts and nets, and match balls to schools, colleges, clubs and government departments across Jammu & Kashmir.',
      'Our in-house team installs the court equipment we sell and has completed 500+ installations across J&K, including sports courts. Government buyers can order through the GeM portal or by tender.',
    ],
    stock: [
      'Basketball hoops',
      'Acrylic basketball backboards',
      'Basketballs',
      'Volleyball posts and nets',
      'Volleyballs',
      'Court equipment installation',
    ],
    keywords: ['basketball', 'volleyball', 'hoop', 'backboard', 'court'],
    faq: [
      {
        q: 'Who supplies basketball hoops and volleyball court equipment in J&K?',
        a: 'MDF Enterprises supplies basketball hoops, acrylic backboards, volleyball posts and nets to schools, colleges and departments across Jammu & Kashmir, and its team can install the court equipment.',
      },
      {
        q: 'Can you install a basketball hoop at our school?',
        a: 'Yes. Our in-house team installs hoops, backboards and volleyball posts. Send the court location and what you need on WhatsApp to {phone} for a quote.',
      },
      {
        q: 'Can government departments order court equipment through GeM?',
        a: 'Yes. MDF Enterprises is GeM-registered and MSME-certified, and takes part in L1 tenders for sports court equipment across J&K.',
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
