import path from 'path'
import fs from 'fs'

/**
 * Read the information for each sponsor from `.all-sponsorsrc` file
 */
export function getAllSponsors() {
  const sponsorsRcPath = path.resolve('.all-sponsorsrc')
  const { individuals, companies } = JSON.parse(
    fs.readFileSync(sponsorsRcPath, 'utf-8'),
  )
  const filterFn = (sponsor) => sponsor.isActive
  return {
    individuals: individuals.filter(filterFn),
    companies: companies.filter(filterFn),
  }
}
