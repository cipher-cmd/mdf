export interface Category {
  id: string
  label: string
  /** Compact label for tight spaces (mobile filters, strips) */
  short: string
  tagline: string
  image: string
  href: string
  /** Short list of what the department covers */
  items: string
  /** Department loop + its first frame (shared with the homepage deck) */
  video: string
  poster: string
  enabled: boolean
}

export const categories: Category[] = [
  {
    id: 'sports',
    short: 'Sports',
    label: 'Sports Goods',
    tagline: 'Equip. Perform. Excel.',
    image: '/images/sports.webp',
    href: '/products/sports',
    items: 'Cricket · Football · Badminton · Volleyball · Athletics',
    video: '/videos/departments/sports.mp4',
    poster: '/videos/departments/sports.webp',
    enabled: true,
  },
  {
    id: 'fitness',
    short: 'Fitness',
    label: 'Fitness & Wellness',
    tagline: 'Stronger Every Day.',
    image: '/images/fitness.webp',
    href: '/products/fitness',
    items: 'Gym machines · Free weights · Cardio · Flooring',
    video: '/videos/departments/fitness.mp4',
    poster: '/videos/departments/fitness.webp',
    enabled: true,
  },
  {
    id: 'music',
    short: 'Music',
    label: 'Musical Instruments',
    tagline: 'Sound that Inspires.',
    image: '/images/MusicalInstrumentsNew.webp',
    href: '/products/music',
    items: 'Percussion · Strings · Keys · Band sets',
    video: '/videos/departments/music.mp4',
    poster: '/videos/departments/music.webp',
    enabled: true,
  },
  {
    id: 'awards',
    short: 'Awards',
    label: 'Awards & Trophies',
    tagline: 'Celebrate Excellence.',
    image: '/images/Awards&TrophiesNew.webp',
    href: '/products/awards',
    items: 'Trophies · Medals · Mementos · Engraving',
    video: '/videos/departments/awards.mp4',
    poster: '/videos/departments/awards.webp',
    enabled: true,
  },
]
