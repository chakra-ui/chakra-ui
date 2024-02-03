interface User {
  name: string
  image: string
  url: string
  type: 'company' | 'project' | 'portfolio'
}

const users: User[] = [
  {
    name: 'Echobind',
    image: '/logos/echobind.svg',
    url: 'https://echobind.com/',
    type: 'company',
  },
  {
    name: 'Lattice',
    image: '/logos/lattice-logo.svg',
    url: 'https://lattice.com/',
    type: 'company',
  },
  {
    name: 'TrustPage',
    image: '/logos/trust-page.svg',
    url: 'https://trustpage.com/',
    type: 'company',
  },
  {
    name: 'Xata',
    image: '/logos/xata.svg',
    url: 'https://xata.io/',
    type: 'company',
  },
  {
    name: 'Shogun',
    image: '/logos/shogun-logo.svg',
    url: 'https://getshogun.com/',
    type: 'company',
  },
  {
    name: 'Brikl',
    image: '/logos/brikl-logo.png',
    url: 'https://www.brikl.com/',
    type: 'company',
  },
  {
    name: 'Lyssna',
    image: '/logos/lyssna.png',
    url: 'https://www.lyssna.com/',
    type: 'company',
  },
  {
    name: 'Shoot Proof',
    image: '/logos/shootproof-logo.png',
    url: 'https://www.shootproof.com/',
    type: 'company',
  },
  {
    name: 'Tuteria',
    image: '/logos/tuteria.png',
    url: 'https://tuteria.com/',
    type: 'company',
  },
  {
    name: 'Virus Cafe',
    image: '🥰 Virus Cafe',
    url: 'https://virus.cafe/',
    type: 'project',
  },
]

export default users
