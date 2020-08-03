const fs = require("fs").promises
const path = require("path")
const _ = require("lodash/fp")
const { format, parseISO } = require("date-fns/fp")
const { Octokit } = require("@octokit/rest")

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

const collections = ["main", "theming", "layout", "form", "components", "hooks"]
const compareCollections = (
  { fields: { collection: a } },
  { fields: { collection: b } },
) => {
  const aIndex = collections.indexOf(a)
  const bIndex = collections.indexOf(b)

  if (aIndex === bIndex) return 0
  if (aIndex > bIndex) return 1
  if (aIndex < bIndex) return -1
}

const groupByCollection = _.groupBy("fields.collection")
const orderByOrderThenTitle = _.orderBy(
  ["frontmatter.order", "frontmatter.title"],
  ["asc", "asc"],
)

const sortPostNodes = (nodes) => {
  const collections = groupByCollection(nodes)
  const sortedCollectionNodes = _.values(collections).map(orderByOrderThenTitle)
  const flattened = _.flatten(_.values(sortedCollectionNodes))
  const allSorted = flattened.sort(compareCollections)

  return allSorted
}

const getRelativePagePath = (fileAbsolutePath, source) => {
  if (!fileAbsolutePath) return

  const regex = new RegExp(`website/${source}/.*`)
  const match = fileAbsolutePath.match(regex)
  return match ? match[0] : null
}

/**
 * Gets the commit history for a given node, ordered by the commit's
 * `author.date` field.
 */
const getOrderedCommitsForPath = async (path) => {
  const { data: commits } = await octokit.repos.listCommits({
    owner: "chakra-ui",
    repo: "chakra-ui",
    sha: "master",
    path,
  })
  const orderedCommits = orderByCommitAuthorDate(commits)
  return orderedCommits
}

/** Converts a commit to a flattened contributor object. */
const commitToContributor = (commit) => {
  const {
    commit: {
      author: { name },
    },
    author: { avatar_url: image, html_url: url },
  } = getCommitAuthorDetails(commit)
  return { name, image, url }
}

/** Gets `contributors`, `createdAt`, and `updatedAt` for the given node. */
const getPathGitInfo = async (path) => {
  const commits = await getOrderedCommitsForPath(path)

  const contributors = commits.map(commitToContributor)
  const firstCommit = _.first(commits)
  const latestCommit = _.last(commits)

  return {
    contributors,
    createdAt: formatCommitDate(firstCommit),
    updatedAt: formatCommitDate(latestCommit),
  }
}

const orderByCommitAuthorDate = _.orderBy(["commit.author.date"], ["asc"])
const getCommitAuthorDetails = _.pick([
  "commit.author.name",
  "author.avatar_url",
  "author.html_url",
])

const sortMembers = (a, b) => {
  // segun comes first!
  if (a.login === "segunadebayo") return -1
  if (b.login === "segunadebayo") return 1

  // everything else is alphabetical by login
  return a.login.localeCompare(b.login, "en")
}

const getMemberData = async ({ login }) => {
  const { data: user } = await octokit.users.getByUsername({ username: login })
  const {
    avatar_url: avatarUrl,
    html_url: githubUrl,
    blog: websiteUrl,
    bio,
    name,
    twitter_username: twitterUsername,
  } = user
  return { login, avatarUrl, githubUrl, websiteUrl, bio, name, twitterUsername }
}

const getOrgMembers = async () => {
  const { data: members } = await octokit.orgs.listMembers({ org: "chakra-ui" })
  const sorted = members.sort(sortMembers)
  return await Promise.all(sorted.map(getMemberData))
}

/** Convert a date string to the "MMMM DD, YYYY" format.  */
const formatCommitDate = _.compose(
  format("MMMM dd, yyyy"),
  parseISO,
  _.get("commit.author.date"),
)

const readAllContributorsRc = async () => {
  const rcPath = path.resolve("..", ".all-contributorsrc")
  const contributorsRcData = await fs.readFile(rcPath, "utf-8")
  const { contributors } = JSON.parse(contributorsRcData)
  return contributors
}

module.exports = {
  sortPostNodes,
  getRelativePagePath,
  getOrgMembers,
  readAllContributorsRc,
  getPathGitInfo,
}
