import path from 'path'
import fs from 'fs'

/**
 * Read the information for each sponsor from `.all-sponsorsrc` file
 */
export function getAllSponsors() {
  const sponsorsRcPath = path.resolve('.all-sponsorsrc')
  const sponsors = JSON.parse(fs.readFileSync(sponsorsRcPath, 'utf-8'))
  return sponsors
}
