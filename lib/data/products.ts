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

export const WHATSAPP_NUMBER = '917006252334'

export const waLink = (text: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`

export const productEnquiry = (p: Product) =>
  waLink(p.whatsappText ?? `Hi MDF Enterprises, I am interested in ${p.name} (${p.brand}). Could you share sizes, availability and pricing?`)

export const products: Product[] = [
  {
    id: 'p-1',
    slug: 'ss-batting-pads',
    name: 'Batting Pads',
    category: 'sports',
    brand: 'SS',
    image: '/images/products/ss-batting-pads.webp',
    description: 'Lightweight batting pads with high-density foam and a contoured knee roll for full-day comfort at the crease.',
    highlights: ['High-density foam protection', 'Lightweight cane-reinforced build', 'Youth & adult sizes'],
    featured: true,
  },
  {
    id: 'p-2',
    slug: 'ss-premium-cricket-balls',
    name: 'Premium Cricket Balls',
    category: 'sports',
    brand: 'SS',
    image: '/images/products/ss-premium-cricket-balls.webp',
    description: 'Hand-stitched leather balls in red and white — match and practice grades for clubs, schools and tournaments.',
    highlights: ['Red & white leather', 'Match and practice grades', 'Bulk boxes for institutions'],
    featured: true,
    whatsappText: 'Hi MDF Enterprises, I am interested in SS Premium Cricket Balls. Could you share grades, box quantities and bulk pricing?',
  },
  {
    id: 'p-3',
    slug: 'ss-cricket-pads',
    name: 'Cricket Pads',
    category: 'sports',
    brand: 'SS',
    image: '/images/products/ss-cricket-pads.webp',
    description: 'Classic Sunridges pads with a traditional profile, triple straps and a secure, stable fit.',
    highlights: ['Traditional profile', 'Triple-strap secure fit', 'Breathable inner lining'],
    featured: false,
  },
  {
    id: 'p-4',
    slug: 'ss-cricket-protection-set',
    name: 'Cricket Protection Set',
    category: 'sports',
    brand: 'SS',
    image: '/images/products/ss-cricket-protection-set.webp',
    description: 'Complete matching kit — pads, gloves and guards — ideal for academies and school teams kitting out together.',
    highlights: ['Pads, gloves & guards', 'Matched team sets', 'Institutional pricing'],
    featured: true,
  },
  {
    id: 'p-5',
    slug: 'ton-silver-edition-batting-gloves',
    name: 'Silver Edition Batting Gloves',
    category: 'sports',
    brand: 'TON',
    image: '/images/products/ton-silver-edition-batting-gloves.webp',
    description: 'Soft-leather palm with segmented finger protection for grip, feel and confidence against pace.',
    highlights: ['Soft leather palm', 'Segmented finger rolls', 'Left & right hand'],
    featured: false,
  },
  {
    id: 'p-6',
    slug: 'ton-batting-gloves',
    name: 'Batting Gloves',
    category: 'sports',
    brand: 'TON',
    image: '/images/products/ton-batting-gloves.webp',
    description: 'Tournament batting gloves with reinforced side bars and a sweat-wicking cuff.',
    highlights: ['Reinforced side bars', 'Sweat-wicking cuff', 'Youth & adult sizes'],
    featured: false,
  },
  {
    id: 'p-7',
    slug: 'sega-turf-shoes',
    name: 'Turf Shoes',
    category: 'sports',
    brand: 'SEGA',
    image: '/images/products/sega-turf-shoes.webp',
    description: 'Rubber-stud turf shoes with superior grip and cushioning for cricket, football and astro surfaces.',
    highlights: ['Multi-surface rubber studs', 'Cushioned midsole', 'Sizes UK 4–11'],
    featured: true,
  },
  {
    id: 'p-8',
    slug: 'strength-free-weights',
    name: 'Strength & Free Weights',
    category: 'fitness',
    brand: 'Cosco',
    image: '/images/fitness.webp',
    description: 'Hex dumbbells, Olympic bars and plates for school gyms, clubs and commercial fit-outs — supplied and installed.',
    highlights: ['Hex dumbbells & plates', 'Olympic & curl bars', 'Full gym fit-outs'],
    featured: true,
    whatsappText: 'Hi MDF Enterprises, I am interested in strength equipment and free weights for a gym setup. Could you share options and a quotation?',
  },
  {
    id: 'p-9',
    slug: 'tabla-harmonium-percussion',
    name: 'Tabla, Harmonium & Percussion',
    category: 'music',
    brand: 'Bina',
    image: '/images/music.webp',
    description: 'Handcrafted classical instruments for music rooms, schools and performers — tuned and ready to play.',
    highlights: ['Handcrafted & tuned', 'School music-room sets', 'Expert guidance'],
    featured: true,
  },
  {
    id: 'p-10',
    slug: 'custom-trophies-medals',
    name: 'Custom Trophies & Medals',
    category: 'awards',
    brand: 'MDF',
    image: '/images/awards.webp',
    description: 'Trophies, medals and mementos for sports days, academic honours and corporate events — with engraving.',
    highlights: ['In-house engraving', 'Sports, academic & corporate', 'Bulk event orders'],
    featured: true,
    whatsappText: 'Hi MDF Enterprises, we need custom trophies and medals for an upcoming event. Could you share designs and engraving options?',
  },
]
