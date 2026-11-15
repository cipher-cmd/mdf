/**
 * Product catalogue. Shape mirrors what the admin panel will manage later —
 * swap this array for a DB/API fetch and every page keeps working.
 */
export type ProductCategory = 'sports' | 'fitness' | 'music' | 'awards'

export interface Product {
  id: string
  slug: string
  name: string
  category: ProductCategory
  brand: string
  /** Portrait artwork, ideally 4:5 (1080×1350); taller images crop from the top */
  image: string
  description: string
  highlights: string[]
  featured: boolean
  /** Optional custom WhatsApp opener; a sensible default is generated otherwise */
  whatsappText?: string
}

/**
 * The message pre-filled when someone taps Enquire. Names the exact item and leaves
 * two short blanks, so the shop can quote in one reply instead of asking back.
 */
export function enquiryText(p: Product, business: string) {
  if (p.whatsappText) return p.whatsappText
  const item = p.brand && !p.name.toLowerCase().startsWith(p.brand.toLowerCase()) ? `${p.brand} ${p.name}` : p.name
  return `Hi ${business}, I'm interested in the ${item}.\n\nSize / type: \nQuantity: \n\nPlease share the price and availability.`
}

// Sports items are the shop's own product posters (shopProd/, Nov 2026). Copy states only what the posters show.
export const products: Product[] = [
  {
    id: 'ton-ss-cricket-bats',
    slug: 'ton-ss-cricket-bats',
    name: 'Cricket Bats',
    category: 'sports',
    brand: 'TON & SS',
    image: '/images/products/ton-ss-cricket-bats.webp',
    description: 'TON and SS cricket bats, including the SS Tilak Verma and Shivam Dube player editions. Ask us for sizes, weights and grades in stock.',
    highlights: ['TON and SS bats', 'SS Tilak Verma & Shivam Dube editions', 'Ask for sizes and weights in stock'],
    featured: true,
  },
  {
    id: 'ton-silver-edition-batting-gloves',
    slug: 'ton-silver-edition-batting-gloves',
    name: 'Silver Edition Cricket Batting Gloves',
    category: 'sports',
    brand: 'TON',
    image: '/images/products/ton-silver-edition-cricket-batting-gloves.webp',
    description: 'All-white TON Silver Edition batting gloves with a perforated leather palm and padded finger rolls.',
    highlights: ['All-white match finish', 'Perforated palm', 'Padded finger rolls'],
    featured: true,
  },
  {
    id: 'ton-ultra-lite-batting-gloves',
    slug: 'ton-ultra-lite-batting-gloves',
    name: 'Ultra Lite Cricket Batting Gloves',
    category: 'sports',
    brand: 'TON',
    image: '/images/products/ton-ultra-lite-batting-gloves.webp',
    description: 'TON Ultra Lite batting gloves in white with yellow and navy accents, a perforated palm and a hook-and-loop wrist strap.',
    highlights: ['Ultra Lite model', 'Perforated palm', 'Hook-and-loop wrist strap'],
    featured: false,
  },
  {
    id: 'ss-sunridges-batting-gloves-elbow-guard',
    slug: 'ss-sunridges-batting-gloves-elbow-guard',
    name: 'Sunridges Batting Gloves with Elbow Guard',
    category: 'sports',
    brand: 'SS',
    image: '/images/products/ss-sunridges-batting-gloves-elbow-guard.webp',
    description: 'SS Sunridges cricket batting gloves in white, blue and silver, paired with a matching SS elbow guard.',
    highlights: ['Batting gloves + elbow guard', 'White, blue & silver', 'Bulk sets for teams'],
    featured: false,
  },
  {
    id: 'ss-sunridges-cricket-leg-guards',
    slug: 'ss-sunridges-cricket-leg-guards',
    name: 'Sunridges Cricket Leg Guards',
    category: 'sports',
    brand: 'SS',
    image: '/images/products/ss-sunridges-cricket-leg-guards.webp',
    description: 'SS Sunridges batting leg guards (pads) with a ribbed front and three hook-and-loop straps.',
    highlights: ['Ribbed front padding', 'Three-strap fit', 'Ask for sizes in stock'],
    featured: true,
  },
  {
    id: 'ss-test-league-cricket-balls',
    slug: 'ss-test-league-cricket-balls',
    name: 'Cricket Balls: Match & Practice',
    category: 'sports',
    brand: 'SS, Test & League',
    image: '/images/products/ss-test-league-cricket-balls.webp',
    description: 'Red and white leather cricket balls from SS, Test and League for matches and practice. Ask us for box quantities for teams and academies.',
    highlights: ['Red & white balls', 'Test: Grade A, 5½ oz, water-proofed', 'League: genuine alum hide'],
    featured: true,
    whatsappText: "Hi MDF Enterprises, I'm interested in cricket balls (SS, Test or League).\n\nBrand and colour (red / white): \nQuantity (pieces or boxes): \n\nPlease share the price and availability.",
  },
  {
    id: 'ss-sunridges-cricket-kit-bag',
    slug: 'ss-sunridges-cricket-kit-bag',
    name: 'Sunridges Cricket Kit Bag',
    category: 'sports',
    brand: 'SS',
    image: '/images/products/ss-sunridges-cricket-kit-bag.webp',
    description: 'Blue camo SS Sunridges kit bag with zipped front and side pockets and a separate shoe compartment.',
    highlights: ['Separate shoe compartment', 'Zipped front & side pockets', 'Blue camo finish'],
    featured: false,
  },
  {
    id: 'sega-cricket-spike-shoes',
    slug: 'sega-cricket-spike-shoes',
    name: 'Cricket Shoes with Spike Outsole',
    category: 'sports',
    brand: 'SEGA',
    image: '/images/products/sega-cricket-spike-shoes.webp',
    description: 'White SEGA cricket shoes with a yellow moulded spike outsole for grip on grass.',
    highlights: ['Moulded spike outsole', 'White upper, yellow lining', 'Ask for sizes in stock'],
    featured: true,
  },
]
