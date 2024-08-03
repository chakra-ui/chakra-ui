import fs from "fs"
import path from "path"

export type IndividualSponsor = {
  MemberId: number
  profile: string
  website?: string
  name: string
  image: string
}

export type CompanySponsor = {
  MemberId: number
  website: string
  profile?: string
  name: string
  image: string
  tier: string
}

type Sponsors = {
  individuals: IndividualSponsor[]
  companies: CompanySponsor[]
}

/**
 * Read the information for each sponsor from `.all-sponsorsrc` file
 */
export function getAllSponsors(): Sponsors {
  const sponsorsRcPath = path.resolve(".all-sponsorsrc")
  const sponsors = JSON.parse(fs.readFileSync(sponsorsRcPath, "utf-8"))
  return sponsors
}
