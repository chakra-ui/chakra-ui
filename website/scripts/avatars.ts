import { writeFile } from 'node:fs/promises'
import { mkdirp } from 'mkdirp'
import fetch from 'node-fetch'
import path from 'path'
import tweetsJson from '../configs/tweets.json'
import ImageCache from './image-cache'

const { tweets } = tweetsJson

const publicDir = path.join(process.cwd(), 'public')
const avatarsDir = path.join(publicDir, 'avatars')

interface Sponsor {
  MemberId: number
  createdAt: string
  type: string
  role: string
  tier: string
  isActive: boolean
  totalAmountDonated: number
  currency: string
  lastTransactionAt: string
  lastTransactionAmount: number
  profile: string
  name: string
  company: string | null
  description: string | null
  image: string
  email: string | null
  twitter: string | null
  github: string | null
  website: string | null
}

/**
 * Get all the Open Collective sponsors and
 * arrange them into "individuals" and "organizations"
 */
async function getSponsors() {
  const response = await fetch(
    'https://opencollective.com/chakra-ui/members/all.json',
  )
  const unfilteredSponsors = (await response.json()) as Sponsor[]

  // filter the sponsors by opencollectice profile link to avoid double entries
  const sponsors = unfilteredSponsors.filter(
    (currentSponsor, index, allSponsors) =>
      index ===
      allSponsors.findIndex((s) => s.profile === currentSponsor.profile),
  )

  const individuals = sponsors.filter(
    (sponsor) => sponsor.type === 'USER' && sponsor.image != null,
  )
  const companies = sponsors.filter(
    (sponsor) => sponsor.type === 'ORGANIZATION',
  )

  return { individuals, companies }
}

async function buildSponsors() {
  const { individuals, companies } = await getSponsors()

  // cache individual sponsor image and resize to `40px` width
  const individualAvatarsCache = new ImageCache({
    outputDirectory: avatarsDir,
    width: 40,
  })

  // update the image property from open-collective to use the cached image
  const individualSponsors = await Promise.all(
    individuals.map(async (individual) => {
      const filename = await individualAvatarsCache.urlToFile(
        individual.image,
        individual.MemberId.toString(),
      )
      return {
        ...individual,
        image: `/avatars/${filename}`,
      }
    }),
  )

  const companyAvatarsCache = new ImageCache({
    outputDirectory: avatarsDir,
  })

  const companySponsors = await Promise.all(
    companies.map(async (company) => {
      const filename = await companyAvatarsCache.urlToFile(
        company.image,
        company.MemberId.toString(),
      )
      return {
        ...company,
        image: `/avatars/${filename}`,
      }
    }),
  )

  const data = { individuals: individualSponsors, companies: companySponsors }
  await writeFile('.all-sponsorsrc', JSON.stringify(data, null, 2))
}

async function buildTweets() {
  const cache = new ImageCache({
    outputDirectory: avatarsDir,
    width: 50,
  })

  await Promise.all(
    tweets.map(async (tweet) => {
      await cache.urlToFile(tweet.image, tweet.handle)
    }),
  )
}

async function buildAvatars() {
  // make sure the avatars directory exists
  await mkdirp(avatarsDir)

  await Promise.all([buildSponsors(), buildTweets()])
}

try {
  buildAvatars()
} catch (err) {
  console.log(err)
}
