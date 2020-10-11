export interface Member {
  avatar_url: string
  bio: string
  blog: string
  location: string
  login: string
  name: string
  twitter_username: string
  url: string
}

export type Contribution =
  | "code"
  | "maintenance"
  | "doc"
  | "example"
  | "design"
  | "ideas"

export interface Contributor {
  avatar_url: string
  contributions: Contribution[]
  name: string
  login: string
  profile: string
}

export interface Sponsor {
  MemberId: number
  comapny: null
  createdAt: string
  description: string
  email: null
  github: null
  image: string
  isActive: boolean
  lastTransactionAmount: number
  lastTransactionAt: string
  name: string
  profile: string
  role: string
  totalAmountDonated: number
  twitter: string
  type: string
  website: string
}
