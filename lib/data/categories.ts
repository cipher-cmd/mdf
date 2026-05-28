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
    image: '/images/sports.png',
    href: '/products/sports',
    enabled: true,
  },
  {
    id: 'fitness',
    label: 'Fitness & Wellness',
    tagline: 'Stronger Every Day.',
    image: '/images/fitness.png',
    href: '/products/fitness',
    enabled: true,
  },
  {
    id: 'music',
    label: 'Musical Instruments',
    tagline: 'Sound that Inspires.',
    image: '/images/music.png',
    href: '/products/music',
    enabled: true,
  },
  {
    id: 'awards',
    label: 'Awards & Trophies',
    tagline: 'Celebrate Excellence.',
    image: '/images/awards.png',
    href: '/products/awards',
    enabled: true,
  },
]
