import { Octokit, RestEndpointMethodTypes } from "@octokit/rest"
import fs from "fs"

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

/* -----------------------------------------------------------------------------
 * Types
 * -----------------------------------------------------------------------------*/

type PullRequests = RestEndpointMethodTypes["pulls"]["list"]["response"]["data"]
type PullRequest = PullRequests[number]

export type PrData = {
  id: number
  url: string
  body: string
  date: string
  version: string | undefined
}

/* -----------------------------------------------------------------------------
 *  Get details of a pull request
 * -----------------------------------------------------------------------------*/

const dateFormatOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
}

export function getPrData(pr: PullRequest): PrData | undefined {
  if (!pr.body) return

  let content = pr.body ?? ""
  const parts = content.split("# Releases")
  content = parts[1] || content

  const date = new Date(pr.merged_at ?? pr.updated_at).toLocaleDateString(
    "en-US",
    dateFormatOptions,
  )

  const match = content.match(/## @chakra-ui\/react\@(?<version>\d.+)/)
  const version = match?.groups?.version

  const sanitized = content
    .replace(/<(https?:\/\/.+)>/g, (_, group) => {
      return `[${group}](${group})`
    })
    .replace(/-\s+(Updated dependencies(?:\n.+)*]):(?:\n.+)*/gm, (_, group) => {
      return `- ${group}`
    })
    .replace(/-\s+(Updated dependencies) \\\[\]:(?:\n.+)*/gm, (_, group) => {
      return `- ${group}`
    })

  const body = [
    "---",
    `title: Version ${version}`,
    `description: Explore the changelog for Chakra UI version ${version}. Learn about the latest features, bug fixes, and improvements.`,
    `releaseUrl: ${pr.html_url}`,
    `releaseDate: ${date}`,
    `version: ${version}`,
    "---",
    "\n",
    `${sanitized}`,
  ]

  return {
    id: pr.number,
    url: pr.html_url,
    body: body.join("\n"),
    date: date,
    version,
  }
}

/* -----------------------------------------------------------------------------
 * Pull request related helpers
 * -----------------------------------------------------------------------------*/

export async function getPrByNumber(num: number): Promise<PullRequest> {
  const { data } = await octokit.pulls.get({
    owner: "chakra-ui",
    repo: "chakra-ui",
    pull_number: num,
  })

  return data as any
}

export async function getLatestPr(): Promise<PullRequest> {
  const { data } = await octokit.pulls.list({
    state: "closed",
    owner: "chakra-ui",
    repo: "chakra-ui",
    base: "main",
    head: "chakra-ui:changeset-release/main",
    per_page: 1,
  })

  return data[0]
}

export async function getMergedPrs(): Promise<PullRequests> {
  const { data } = await octokit.pulls.list({
    state: "all",
    owner: "chakra-ui",
    repo: "chakra-ui",
    base: "main",
    head: "chakra-ui:changeset-release/main",
    per_page: 100,
  })

  return data.filter((pr) => pr.merged_at)
}

export async function writePrFile(pr: PrData | undefined) {
  if (!pr) return
  if (!fs.existsSync(".changelog")) {
    fs.mkdirSync(".changelog")
  }
  return fs.promises.writeFile(`.changelog/v${pr.version}.mdx`, pr.body)
}

/* -----------------------------------------------------------------------------
 * The manifest file helpers
 * -----------------------------------------------------------------------------*/

export const manifest = {
  path: ".changelog/manifest.json",
  async write(data: PrData[]) {
    const sortedData = data.sort((a, b) => b.id - a.id)
    return fs.promises.writeFile(this.path, JSON.stringify(sortedData, null, 2))
  },
  async read(): Promise<PrData[]> {
    try {
      return JSON.parse(await fs.promises.readFile(this.path, "utf8"))
    } catch (error) {
      return []
    }
  },
  async update(data: PrData) {
    const prevData = await this.read()
    const newData = [data, ...prevData]
    return this.write(newData)
  },
}

/* -----------------------------------------------------------------------------
 * The readme file helpers
 * -----------------------------------------------------------------------------*/

export async function writeReadme() {
  const data = await manifest.read()
  const sortedData = data.map(
    (pr) => `### ${pr.date}: [v${pr.version}](/.changelog/v${pr.version}.mdx)`,
  )
  const [latestRelease, ...otherReleases] = sortedData

  const readme = [
    "# Changelog",
    "\n",
    "## Latest Release",
    latestRelease,
    "\n",
    "## Previous Releases",
    ...otherReleases,
  ].join("\n")

  await fs.promises.writeFile("CHANGELOG.md", readme)
}
