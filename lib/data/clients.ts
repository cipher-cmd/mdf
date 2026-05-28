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
    logo: '/images/clients/dysoLogo.png',
    alt: 'DYSO J&K logo',
  },
  {
    id: 'ku',
    name: 'University of Kashmir',
    type: 'education',
    logo: '/images/clients/kuLogo.png',
    alt: 'University of Kashmir logo',
  },
  {
    id: 'jkp',
    name: 'J&K Police',
    type: 'government',
    logo: '/images/clients/jkpLogo.png',
    alt: 'J&K Police logo',
  },
  {
    id: 'crpf',
    name: 'CRPF',
    type: 'defence',
    logo: '/images/clients/crpfLogo.png',
    alt: 'CRPF logo',
  },
  {
    id: 'gmc',
    name: 'Govt. Medical College, Srinagar',
    type: 'education',
    logo: '/images/clients/gmcLogo.png',
    alt: 'GMC Srinagar logo',
  },
  {
    id: 'skaust',
    name: 'SKUAST-Kashmir',
    type: 'education',
    logo: '/images/clients/skaustlogo.png',
    alt: 'SKUAST Kashmir logo',
  },
  {
    id: 'dsek',
    name: 'DSEK',
    type: 'government',
    logo: '/images/clients/dsekLogo.png',
    alt: 'DSEK logo',
  },
  {
    id: 'cluster',
    name: 'Cluster University Srinagar',
    type: 'education',
    logo: '/images/clients/clusterUniLogo.png',
    alt: 'Cluster University Srinagar logo',
  },
]
