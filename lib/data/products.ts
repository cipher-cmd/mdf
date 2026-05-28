export interface Product {
  id: string
  slug: string
  name: string
  category: 'sports' | 'fitness' | 'music' | 'awards'
  brand: string
  image: string
  description: string
  featured: boolean
  whatsappText: string
  createdAt: string
}

export const products: Product[] = [
  {
    id: 'ce-5',
    slug: 'sega-cricket-shoes',
    name: 'Cricket Shoes',
    category: 'sports',
    brand: 'SEGA',
    image: '/images/Products/Cricket/segaCricketShoes.PNG',
    description: 'Professional cricket shoes with reinforced toe, spike grip sole. Suitable for all playing surfaces. Available in multiple sizes.',
    featured: true,
    whatsappText: 'Hi MDF Enterprises, I am interested in SEGA Cricket Shoes. Could you share sizes and pricing?',
    createdAt: '2026-01-01',
  },
  {
    id: 'ce-6',
    slug: 'ss-batting-pads',
    name: 'SS Batting Pads',
    category: 'sports',
    brand: 'SS',
    image: '/images/Products/Cricket/ssBattingPads.PNG',
    description: 'Lightweight SS batting pads with high-density foam protection. Full front and knee roll coverage. Junior and senior sizes.',
    featured: true,
    whatsappText: 'Hi MDF Enterprises, I am interested in SS Batting Pads. Could you share sizes and pricing?',
    createdAt: '2026-01-01',
  },
  {
    id: 'ce-7',
    slug: 'ss-cricket-balls',
    name: 'SS Cricket Balls',
    category: 'sports',
    brand: 'SS',
    image: '/images/Products/Cricket/ssCricketBalls.PNG',
    description: 'Tournament-grade SS leather cricket balls. Ideal for matches, practice sessions and institutional bulk orders. Red and white options.',
    featured: false,
    whatsappText: 'Hi MDF Enterprises, I am interested in SS Cricket Balls. Could you share bulk pricing and availability?',
    createdAt: '2026-01-01',
  },
  {
    id: 'ce-8',
    slug: 'ss-cricket-pads',
    name: 'SS Cricket Pads',
    category: 'sports',
    brand: 'SS',
    image: '/images/Products/Cricket/ssCricketPads.PNG',
    description: 'Durable SS cricket leg pads with multi-layered protection system. Adjustable straps for secure fit. Used by school and club teams.',
    featured: false,
    whatsappText: 'Hi MDF Enterprises, I am interested in SS Cricket Pads. Could you share more details and pricing?',
    createdAt: '2026-01-01',
  },
  {
    id: 'ce-9',
    slug: 'ss-protection-kit',
    name: 'SS Protection Kit',
    category: 'sports',
    brand: 'SS',
    image: '/images/Products/Cricket/ssProtectionKit.PNG',
    description: 'Complete SS protection kit including abdominal guard, thigh pad, arm guard and chest guard. Ideal for batsmen at all levels.',
    featured: false,
    whatsappText: 'Hi MDF Enterprises, I am interested in SS Protection Kit. Could you share what is included and pricing?',
    createdAt: '2026-01-01',
  },
  {
    id: 'ce-10',
    slug: 'ton-batting-gloves',
    name: 'TON Batting Gloves',
    category: 'sports',
    brand: 'TON',
    image: '/images/Products/Cricket/tonBattingGloves.PNG',
    description: 'High-grip TON batting gloves with padded knuckle protection and moisture-wicking inner. Superior ball feel and protection.',
    featured: true,
    whatsappText: 'Hi MDF Enterprises, I am interested in TON Batting Gloves. Could you share sizes and pricing?',
    createdAt: '2026-01-01',
  },
  {
    id: 'ce-11',
    slug: 'ton-cricket-gloves',
    name: 'TON Cricket Gloves',
    category: 'sports',
    brand: 'TON',
    image: '/images/Products/Cricket/tonCricketaGloves.PNG',
    description: 'TON wicket-keeping gloves with premium palm padding and flexible wrist design. For junior and senior keepers.',
    featured: false,
    whatsappText: 'Hi MDF Enterprises, I am interested in TON Cricket Gloves. Could you share sizes and pricing?',
    createdAt: '2026-01-01',
  },
]
