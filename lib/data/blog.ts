/**
 * Blog content. Shape mirrors what the admin panel will manage later —
 * swap `blogPosts` for a DB/CMS fetch and every page keeps working.
 */
export const blogCategories = [
  { id: 'guides',       label: 'Product Guides',       short: 'Guides' },
  { id: 'institutions', label: 'Institutional Supply', short: 'Supply' },
  { id: 'culture',      label: 'Sport & Culture',      short: 'Culture' },
  { id: 'inside-mdf',   label: 'Inside MDF',           short: 'MDF' },
] as const

export type BlogCategory = (typeof blogCategories)[number]['id']

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  /** Landscape artwork, ideally 16:10 */
  coverImage: string
  category: BlogCategory
  /** ISO date, e.g. 2026-05-01 */
  publishedAt: string
  featured: boolean
  /** Trusted HTML from our own editors: p, h2, h3, ul/ol, blockquote, a */
  content: string
}

export const categoryLabel = (id: string) => blogCategories.find(c => c.id === id)?.label ?? id

/** ~200 words per minute, never less than one */
export const readTime = (post: BlogPost) =>
  Math.max(1, Math.round(post.content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length / 200))

/** UTC so server and browser render the same string */
export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-to-procure-sports-equipment-through-gem',
    title: 'How to Procure Sports Equipment Through the GeM Portal',
    excerpt: 'A step-by-step guide for government departments and schools buying sports goods through the Government e-Marketplace.',
    coverImage: '/images/blog-gem-cover.webp',
    category: 'institutions',
    publishedAt: '2026-09-18',
    featured: true,
    content: `
      <p>The Government e-Marketplace (GeM) has made public procurement faster and more transparent. For schools, colleges and departments buying sports equipment, it replaces paper tenders with a clear digital process — if you know the steps.</p>
      <h2>Before you start</h2>
      <ul>
        <li>Make sure your buyer account and secondary user (consignee) are active on GeM.</li>
        <li>Prepare a requirement list with quantities, sizes and any brand or quality standards.</li>
        <li>Confirm your sanctioned budget and the financial year it falls under.</li>
      </ul>
      <h2>Choosing how to buy</h2>
      <p>For smaller orders, direct purchase from a listed product is the quickest route. Larger orders usually go through L1 comparison or a bid, where registered sellers quote against your specification.</p>
      <blockquote>Write specifications around quality and use — not a single model number — so you receive comparable, competitive quotes.</blockquote>
      <h2>After the order</h2>
      <p>Once the supply order is placed, the seller delivers and your consignee inspects the goods and issues the receipt (CRAC). Payment is then processed through the portal.</p>
      <p>MDF Enterprises is a GeM-registered supplier. If you are unsure how to frame a specification, our team can walk you through it before you publish.</p>
    `,
  },
  {
    slug: 'how-to-choose-the-right-cricket-bat',
    title: 'How to Choose the Right Cricket Bat for Your Game',
    excerpt: 'Willow grade, weight, handle and size — what actually matters when you pick a bat for yourself or a school team.',
    coverImage: '/images/SportsGoodsNew.webp',
    category: 'guides',
    publishedAt: '2026-08-27',
    featured: false,
    content: `
      <p>A bat that suits your game makes every shot easier. A bat that doesn't can slow your hands and hurt your timing. Here is what to look at.</p>
      <h2>English or Kashmir willow</h2>
      <p>English willow is lighter and more responsive, preferred for leather-ball match play. Kashmir willow is tougher and more affordable — ideal for practice, juniors and tennis-ball cricket.</p>
      <h2>Size and weight</h2>
      <ul>
        <li>Standing in your stance, the bat should reach comfortably to the top of your thigh.</li>
        <li>Pick the lightest bat you can control — a heavy bat rarely adds power if it slows your swing.</li>
        <li>Juniors should always use a junior size; growing into a bat builds bad habits.</li>
      </ul>
      <h2>Knocking in</h2>
      <p>New English willow bats need knocking in before match use. Plan a few hours with a mallet, or ask us to prepare it for you.</p>
      <p>Visit our Srinagar showroom to pick up and swing the options from SS, SG and other leading makers.</p>
    `,
  },
  {
    slug: 'setting-up-school-gymnasium-what-you-need',
    title: 'Setting Up a School Gymnasium: What You Need to Know',
    excerpt: 'A practical checklist for principals and sports departments — from space planning to equipment and installation.',
    coverImage: '/images/blog-gym-cover.webp',
    category: 'institutions',
    publishedAt: '2026-08-06',
    featured: false,
    content: `
      <p>A well-planned gym serves students for years. A rushed one ends up as a storeroom. Start with the space and the people who will use it.</p>
      <h2>Plan the space first</h2>
      <ul>
        <li>Measure the room, ceiling height and door widths before choosing machines.</li>
        <li>Allow clear walkways and safe distances around every station.</li>
        <li>Budget for rubber flooring — it protects students, equipment and the floor.</li>
      </ul>
      <h2>Choose for the users</h2>
      <p>School gyms work best with versatile, low-maintenance equipment: adjustable benches, a multi-station machine, dumbbells, cardio basics and plenty of open floor for bodyweight training.</p>
      <h2>Installation and support</h2>
      <p>Ask for professional installation, staff orientation and a maintenance plan. These are what keep a gym safe and in use.</p>
      <p>Our team handles site visits, layout, supply and installation for institutions across J&amp;K.</p>
    `,
  },
  {
    slug: 'choosing-the-right-sports-shoes',
    title: 'Choosing the Right Sports Shoes for Better Performance',
    excerpt: 'Turf, spikes or court shoes? A quick guide to footwear that protects players and improves grip.',
    coverImage: '/images/products/sega-turf-shoes.webp',
    category: 'guides',
    publishedAt: '2026-07-15',
    featured: false,
    content: `
      <p>The right shoe is the most overlooked piece of equipment. The wrong one costs grip, comfort and, too often, ankles.</p>
      <h2>Match the shoe to the surface</h2>
      <ul>
        <li><strong>Turf shoes</strong> — rubber studs for astro turf and hard grounds.</li>
        <li><strong>Spikes</strong> — metal spikes for grass cricket and athletics tracks.</li>
        <li><strong>Court shoes</strong> — flat, non-marking soles for badminton, basketball and indoor halls.</li>
      </ul>
      <h2>Fit matters more than brand</h2>
      <p>Try shoes on in the afternoon with your playing socks. Leave a thumb's width at the toe, and make sure the heel doesn't lift when you walk.</p>
      <p>We stock turf, spike and court footwear in a full size range — bring your team in for fittings.</p>
    `,
  },
  {
    slug: 'setting-up-music-lab-school-kashmir',
    title: 'Why Every School Needs a Music Room',
    excerpt: 'Why a well-equipped music room supports creativity, focus and confidence — and how to start one.',
    coverImage: '/images/MusicalInstrumentsNew.webp',
    category: 'culture',
    publishedAt: '2026-06-24',
    featured: false,
    content: `
      <p>Music asks students to listen, practise and perform together — skills that carry into every subject.</p>
      <h2>Starting a music room</h2>
      <p>You don't need everything at once. A strong starter set covers rhythm, melody and harmony:</p>
      <ul>
        <li>Tabla and dholak for rhythm</li>
        <li>Harmonium or a keyboard for melody and accompaniment</li>
        <li>Acoustic guitars for older students</li>
      </ul>
      <h2>Care and tuning</h2>
      <p>Instruments last longest in a dry room away from heaters, with covers and a simple tuning routine. Ask about servicing when you buy.</p>
      <p>We help schools choose sets that match their curriculum, space and budget.</p>
    `,
  },
  {
    slug: 'the-growing-sports-culture-in-jammu-and-kashmir',
    title: 'The Growing Sports Culture in Jammu & Kashmir',
    excerpt: 'More grounds, more academies and more young players — how sport is becoming part of everyday life across the region.',
    coverImage: '/BG/stayUpdatedBg.png',
    category: 'culture',
    publishedAt: '2026-06-03',
    featured: false,
    content: `
      <p>From school grounds in Srinagar to academies across the valley, more young people are playing organised sport than ever before.</p>
      <h2>Schools leading the way</h2>
      <p>Schools are adding sports periods, inter-school tournaments and dedicated coaches. Equipment that was once shared between classes is now issued to proper teams.</p>
      <h2>Beyond cricket</h2>
      <p>Cricket remains the favourite, but football, volleyball, badminton and athletics are growing fast — and so is interest in fitness and gym training.</p>
      <blockquote>Good equipment doesn't make a champion, but it removes the excuses — and keeps young players safe.</blockquote>
      <p>We are proud to supply many of the schools and clubs helping that growth.</p>
    `,
  },
  {
    slug: 'top-5-cricket-drills-for-school-teams-kashmir',
    title: 'Top 5 Cricket Drills for School Teams',
    excerpt: 'Simple, effective drills coaches can run with a small squad — and the equipment each one needs.',
    coverImage: '/images/blog-cricket-cover.webp',
    category: 'guides',
    publishedAt: '2026-05-12',
    featured: false,
    content: `
      <p>Short, focused drills build skill faster than long, unstructured nets. These five work with any school squad.</p>
      <ol>
        <li><strong>Throwdowns</strong> — a coach feeds from 15 yards to groove technique. Needs: balls, stumps.</li>
        <li><strong>Target bowling</strong> — mark a good-length zone and score each delivery that lands in it. Needs: cones, balls.</li>
        <li><strong>Relay catching</strong> — teams race to complete catches in a line. Needs: tennis or soft balls.</li>
        <li><strong>Run-out ladder</strong> — pick up and throw at one stump from widening distances. Needs: stumps, balls.</li>
        <li><strong>Running between wickets</strong> — timed pairs, calling clearly on every run. Needs: bats, stumps.</li>
      </ol>
      <p>Protective gear — pads, gloves and helmets — should be standard for every batting drill with a leather ball.</p>
    `,
  },
  {
    slug: 'our-commitment-to-jammu-and-kashmir',
    title: 'Our Commitment to Jammu & Kashmir',
    excerpt: 'Since 1997, MDF Enterprises has equipped the region’s schools, clubs and departments. Here is what guides us.',
    coverImage: '/images/hero_kashmir_scene.jpg',
    category: 'inside-mdf',
    publishedAt: '2026-04-20',
    featured: false,
    content: `
      <p>MDF Enterprises began in Srinagar in 1997 with a simple idea: the region's players and institutions deserve genuine equipment and honest advice.</p>
      <h2>What guides us</h2>
      <ul>
        <li><strong>Genuine stock</strong> — sourced from authorised brands, with full warranty.</li>
        <li><strong>Right-fit advice</strong> — we recommend what suits the user and the budget.</li>
        <li><strong>Support after sale</strong> — installation, servicing and replacements.</li>
      </ul>
      <p>Today we serve schools, colleges, clubs and government departments across Jammu &amp; Kashmir — and we are just as glad to help a single player choose their first bat.</p>
    `,
  },
]
