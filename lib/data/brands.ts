export interface Brand {
  id: string
  name: string
  logo: string
  category: 'sports' | 'fitness' | 'music' | 'awards' | 'multi'
}

export const brands: Brand[] = [
  { id: 'jonex',   name: 'JONEX',   logo: '/images/brands/jonexLogo.png',   category: 'sports' },
  { id: 'yonex',   name: 'YONEX',   logo: '/images/brands/yonexlogo.png',   category: 'sports' },
  { id: 'cosco',   name: 'COSCO',   logo: '/images/brands/coscoLogo.png',   category: 'sports' },
  { id: 'nivia',   name: 'NIVIA',   logo: '/images/brands/niviaLogo.png',   category: 'sports' },
  { id: 'sg',      name: 'SG',      logo: '/images/brands/sglogo.png',      category: 'sports' },
  { id: 'spartan', name: 'SPARTAN', logo: '/images/brands/spartanlogo.png', category: 'sports' },
  { id: 'ss',      name: 'SS',      logo: '/images/brands/ssLogo.png',      category: 'sports' },
  { id: 'stag',    name: 'STAG',    logo: '/images/brands/staglogo.png',    category: 'sports' },
  { id: 'netco',   name: 'NETCO',   logo: '/images/brands/netcoLogo.png',   category: 'sports' },
]
