export interface Brand {
  id: string
  name: string
  logo: string
  category: 'sports' | 'fitness' | 'music' | 'awards' | 'multi'
}

export const brands: Brand[] = [
  { id: 'jonex',   name: 'JONEX',   logo: '/images/brands/jonexLogo.webp',   category: 'sports' },
  { id: 'yonex',   name: 'YONEX',   logo: '/images/brands/yonexlogo.webp',   category: 'sports' },
  { id: 'cosco',   name: 'COSCO',   logo: '/images/brands/coscoLogo.webp',   category: 'sports' },
  { id: 'nivia',   name: 'NIVIA',   logo: '/images/brands/niviaLogo.webp',   category: 'sports' },
  { id: 'sg',      name: 'SG',      logo: '/images/brands/sglogo.webp',      category: 'sports' },
  { id: 'spartan', name: 'SPARTAN', logo: '/images/brands/spartanlogo.webp', category: 'sports' },
  { id: 'ss',      name: 'SS',      logo: '/images/brands/ssLogo.webp',      category: 'sports' },
  { id: 'stag',    name: 'STAG',    logo: '/images/brands/staglogo.webp',    category: 'sports' },
  { id: 'netco',   name: 'NETCO',   logo: '/images/brands/netcoLogo.webp',   category: 'sports' },
  { id: 'gm',      name: 'GM',      logo: '/images/brands/gmLogo.webp',      category: 'sports' },
  { id: 'nova',    name: 'NOVA FITNESS', logo: '/images/brands/novaFitnessLogo.webp', category: 'fitness' },
  { id: 'bdm',     name: 'BDM',     logo: '/images/brands/bdmlogo.webp',     category: 'sports' },
]
