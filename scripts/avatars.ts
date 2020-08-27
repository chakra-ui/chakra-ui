import path from "path"
import { promises as fs } from "fs"
import mkdirp from "mkdirp"
import fetch from "node-fetch"
import { tweets } from "../website/configs/tweets.json"
import ImageCache from "./image-cache"

const websiteDir = path.join(__dirname, "..", "website")
const publicDir = path.join(websiteDir, "public")
const avatarsDir = path.join(publicDir, "avatars")

/**
 * Get all the Open Collective sponsors and
 * arrange them into "individuals" and "organizations"
 */
async function getSponsors() {
  const response = await fetch(
    "https://opencollective.com/chakra-ui/members/all.json",
  )
  const sponsors = await response.json()

  const individuals = sponsors.filter(
    (i: any) => i.type === "USER" && i.image != null,
  )
  const companies = sponsors.filter((i: any) => i.type === "ORGANIZATION")

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
    individuals.map(async (individual: any) => {
      const filename = await individualAvatarsCache.urlToFile(
        individual.image,
        individual.MemberId,
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
    companies.map(async (company: any) => {
      const filename = await companyAvatarsCache.urlToFile(
        company.image,
        company.MemberId,
      )
      return {
        ...company,
        image: `/avatars/${filename}`,
      }
    }),
  )

  const data = { individuals: individualSponsors, companies: companySponsors }
  await fs.writeFile(".all-sponsorsrc", JSON.stringify(data, null, 2))
}

async function buildTweets() {
  const cache = new ImageCache({
    outputDirectory: avatarsDir,
    width: 50,
  })

  await Promise.all(
    tweets.map(async (tweet: any) => {
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
