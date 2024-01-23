import { config } from 'dotenv'
import fs from 'fs'
import { Octokit } from 'octokit'

config()

export interface IFormerMember {
  name: string | null
  githubName: string | null
  components: string[] | null
}

async function main() {
  fs.writeFileSync(
    CONFIG_PATH,
    JSON.stringify(await generateFormerMemberData(), null, 2),
  )
}

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

const CONFIG_PATH = './.all-former-membersrc'
const REPO_CONFIG = {
  mediaType: {
    format: 'raw',
  },
  owner: 'chakra-ui',
  repo: 'chakra-ui',
  path: '.notes/previous-maintainers.md',
}

async function generateFormerMemberData() {
  const { data } = await octokit.rest.repos.getContent(REPO_CONFIG)
  const tableLines = (data as any)
    .split('\n')
    .filter((line) => line.startsWith('|'))

  // remove 'table header' lines
  tableLines.splice(0, 2)

  return parseRepoData(tableLines)
}

// removes whitespaces at the beginning and the end
const normalizeString = (s: string) => s.replace(/^\s+|\s+$/g, '')

const parseRepoData = (lines: string[]) => {
  const parsedData: IFormerMember[] = []

  for (const line of lines) {
    const segments = line.split('|').filter((segment) => segment !== '')

    const components = segments[1]
      .split(',')
      .map((component) => normalizeString(component) || null)

    parsedData.push({
      name:
        normalizeString(segments[0].slice(0, segments[0].indexOf('@'))) || null,
      githubName:
        normalizeString(segments[0].slice(segments[0].indexOf('@') + 1)) ||
        null,
      // avoid empty strings in the array
      components: components[0] ? components : null,
    })
  }

  return parsedData
}

try {
  main()
} catch (err) {
  console.log(err)
}
