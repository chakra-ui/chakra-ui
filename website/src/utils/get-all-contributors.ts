import path from 'path'
import fs from 'fs'

/**
 * Read contributors from `.all-contributorsrc` file
 * to avoid overfetching from Github
 */
export function getAllContributors() {
  const contributorsRcPath = path.resolve('.all-contributorsrc')
  const { contributors } = JSON.parse(
    fs.readFileSync(contributorsRcPath, 'utf-8'),
  )
  return contributors
}
