export interface Category {
  id: string
  label: string
  tagline: string
  image: string
  href: string
  enabled: boolean
}

export const categories: Category[] = [
  {
    id: 'sports',
    label: 'Sports Goods',
    tagline: 'Equip. Perform. Excel.',
    image: '/images/sports.webp',
    href: '/products/sports',
    enabled: true,
  },
  {
    id: 'fitness',
    label: 'Fitness & Wellness',
    tagline: 'Stronger Every Day.',
    image: '/images/fitness.webp',
    href: '/products/fitness',
    enabled: true,
  },
  {
    id: 'music',
    label: 'Musical Instruments',
    tagline: 'Sound that Inspires.',
    image: '/images/MusicalInstrumentsNew.webp',
    href: '/products/music',
    enabled: true,
  },
  {
    id: 'awards',
    label: 'Awards & Trophies',
    tagline: 'Celebrate Excellence.',
    image: '/images/Awards&TrophiesNew.webp',
    href: '/products/awards',
    enabled: true,
  },
]
