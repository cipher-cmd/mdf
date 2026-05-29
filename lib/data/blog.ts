export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  coverImage: string
  category: 'sports' | 'fitness' | 'awards' | 'gem-guides' | 'news'
  readTime: number
  publishedAt: string
  featured: boolean
  content: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 'b1',
    slug: 'how-to-procure-sports-equipment-through-gem',
    title: 'How to Procure Sports Equipment Through GeM Portal',
    excerpt: 'Step-by-step guide for government institutions and schools to procure sports goods through the Government e-Marketplace with zero paperwork hassle.',
    coverImage: '/images/blog-gem-cover.webp',
    category: 'gem-guides',
    readTime: 6,
    publishedAt: '2026-05-01',
    featured: true,
    content: '<p>The Government e-Marketplace (GeM) has transformed how government institutions procure sports equipment in India. As a GeM-registered supplier, MDF Enterprises has helped over 100 institutions complete their procurement digitally...</p>',
  },
  {
    id: 'b2',
    slug: 'top-5-cricket-drills-for-school-teams-kashmir',
    title: 'Top 5 Cricket Drills for School Teams in Kashmir',
    excerpt: 'Practical drills used by J&K coaching academies to develop young cricket talent. Equipment recommendations included for each drill.',
    coverImage: '/images/blog-cricket-cover.webp',
    category: 'sports',
    readTime: 4,
    publishedAt: '2026-04-15',
    featured: true,
    content: '<p>Cricket is deeply embedded in the culture of Jammu & Kashmir. Schools across the valley are producing talented players who go on to represent the state at national tournaments...</p>',
  },
  {
    id: 'b3',
    slug: 'setting-up-school-gymnasium-what-you-need',
    title: 'Setting Up a School Gymnasium: What You Need to Know',
    excerpt: 'Complete checklist for principals and sports departments planning a new gymnasium — from equipment selection to installation timelines.',
    coverImage: '/images/blog-gym-cover.webp',
    category: 'fitness',
    readTime: 7,
    publishedAt: '2026-03-20',
    featured: true,
    content: '<p>A well-equipped gymnasium is an investment in student health and institutional reputation. Here is everything you need to consider before making your first equipment purchase...</p>',
  },
  {
    id: 'b4',
    slug: 'best-cricket-equipment-brands-india-2026',
    title: 'Best Cricket Equipment Brands in India 2026',
    excerpt: 'SS, SG, TON or COSCO — a practical guide to choosing the right cricket equipment brand for your team, budget and playing level.',
    coverImage: '/images/sportsGoods.webp',
    category: 'sports',
    readTime: 5,
    publishedAt: '2026-05-10',
    featured: false,
    content: '<p>Choosing the right cricket equipment brand matters more than most players realise. In J&K, where cricket culture runs deep, we\'ve helped thousands of players and institutions select the right gear...</p><p>SS (Sareen Sports) has long been a favourite for school and club cricket — their bats offer excellent value and their protective gear is trusted by coaches across the country. SG (Sanspareils Greenlands) is the preferred choice for competitive play, with BCCI-approved balls used in first-class cricket. TON by SS bridges the gap between school and professional equipment with superior craftsmanship...</p>',
  },
  {
    id: 'b5',
    slug: 'gem-portal-sports-procurement-guide-2026',
    title: 'GeM Portal Sports Procurement: Complete 2026 Guide',
    excerpt: 'Everything government schools and departments need to know about procuring sports equipment through GeM — L1 bidding, quality checks, and how to get it right.',
    coverImage: '/images/fitness.webp',
    category: 'gem-guides',
    readTime: 8,
    publishedAt: '2026-04-28',
    featured: false,
    content: '<p>The Government e-Marketplace (GeM) has become the primary procurement channel for government institutions across India. For sports departments in J&K, understanding GeM can mean the difference between a smooth procurement and months of delays...</p><p>As a GeM-registered supplier since the portal\'s early years, MDF Enterprises has processed hundreds of institutional orders through the platform. Here is everything you need to know for 2026...</p>',
  },
  {
    id: 'b6',
    slug: 'setting-up-music-lab-school-kashmir',
    title: 'Setting Up a Music Lab in a J&K School: What It Costs',
    excerpt: 'A realistic breakdown of what a school music lab costs in 2026 — instruments, installation, acoustic treatment and ongoing maintenance.',
    coverImage: '/images/music.webp',
    category: 'fitness',
    readTime: 6,
    publishedAt: '2026-03-05',
    featured: false,
    content: '<p>The National Education Policy (NEP 2020) has made arts and music education mandatory, creating strong demand for school music labs across J&K. MDF Enterprises has installed music labs in 40+ schools across the valley, and the questions we get most are about cost...</p>',
  },
  {
    id: 'b7',
    slug: 'custom-trophies-awards-institutions-kashmir',
    title: 'Custom Trophies & Awards for J&K Institutions: A Buyer\'s Guide',
    excerpt: 'From school sports days to government felicitation ceremonies — how to order custom trophies, shields and medals that actually look premium.',
    coverImage: '/images/awards.webp',
    category: 'awards',
    readTime: 4,
    publishedAt: '2026-02-20',
    featured: false,
    content: '<p>Every institution needs custom awards — from annual sports days to felicitation ceremonies for retiring government officials. Getting the design and quality right is harder than most buyers expect...</p><p>At MDF Enterprises, we\'ve supplied custom trophies and awards to DYSO offices, universities, police departments and private organisations across J&K. Here is what we\'ve learned about what makes a great award...</p>',
  },
]
