export interface Client {
  id: string
  name: string
  type: 'government' | 'education' | 'sports' | 'defence'
  logo: string
  alt: string
}

export const clients: Client[] = [
  {
    id: 'dyso',
    name: 'Department of Youth Services & Sports',
    type: 'government',
    logo: '/images/clients/dysoLogo.webp',
    alt: 'DYSO J&K logo',
  },
  {
    id: 'ku',
    name: 'University of Kashmir',
    type: 'education',
    logo: '/images/clients/kuLogo.webp',
    alt: 'University of Kashmir logo',
  },
  {
    id: 'jkp',
    name: 'J&K Police',
    type: 'government',
    logo: '/images/clients/jkpLogo.webp',
    alt: 'J&K Police logo',
  },
  {
    id: 'crpf',
    name: 'CRPF',
    type: 'defence',
    logo: '/images/clients/crpfLogo.webp',
    alt: 'CRPF logo',
  },
  {
    id: 'gmc',
    name: 'Govt. Medical College, Srinagar',
    type: 'education',
    logo: '/images/clients/gmcLogo.webp',
    alt: 'GMC Srinagar logo',
  },
  {
    id: 'skaust',
    name: 'SKUAST-Kashmir',
    type: 'education',
    logo: '/images/clients/skaustlogo.webp',
    alt: 'SKUAST Kashmir logo',
  },
  {
    id: 'dsek',
    name: 'DSEK',
    type: 'government',
    logo: '/images/clients/dsekLogo.webp',
    alt: 'DSEK logo',
  },
  {
    id: 'cluster',
    name: 'Cluster University Srinagar',
    type: 'education',
    logo: '/images/clients/clusterUniLogo.webp',
    alt: 'Cluster University Srinagar logo',
  },
  {
    id: 'schooledu',
    name: 'School Education Department',
    type: 'education',
    logo: '/images/clients/schoolEduLogo.webp',
    alt: 'School Education Department logo',
  },
]
