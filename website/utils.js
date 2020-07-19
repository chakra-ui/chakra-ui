const fs = require("fs").promises
const path = require("path")
const _ = require("lodash/fp")
const { format, parseISO } = require("date-fns/fp")
const simpleGit = require("simple-git")
const { Octokit } = require("@octokit/rest")

const git = simpleGit({ baseDir: path.join(process.cwd(), "..") })
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

const orderByCommitAuthorDate = _.orderBy(["commit.author.date"], ["asc"])
const getCommitAuthorDetails = _.pick([
  "commit.author.name",
  "author.avatar_url",
  "author.html_url",
])

const getNodeContributors = async (node) => {
  const relativePath = getRelativePagePath(node.fileAbsolutePath)
  const { data: commits } = await octokit.repos.listCommits({
    owner: "chakra-ui",
    repo: "chakra-ui",
    sha: "master",
    path: relativePath,
  })
  const orderedCommits = orderByCommitAuthorDate(commits)
  const contributors = orderedCommits
    .map(getCommitAuthorDetails)
    .map(
      ({
        commit: {
          author: { name },
        },
        author: { avatar_url: image, html_url: url },
      }) => ({
        name,
        image,
        url,
      }),
    )
  return contributors
}

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

/**
 * Get all commits made to a specific path.
 */
const getPathCommits = async (path) => {
  // --follow allows git to follow a file's history across renames/moves
  // -- makes sure log knows that path is for a file
  const { all: commits } = await git.log(["--follow", "--", path])
  return commits
}

/** Convert a date string to the "MMMM DD, YYYY" format.  */
const formatDateString = _.compose(format("MMMM dd, yyyy"), parseISO)

/**
 * Get the creation and last updated dates for a file. Uses `git` commit
 * history.
 */
const getRelativePathHistoryDates = async (path) => {
  const commits = await getPathCommits(path)

  const firstCommit = _.last(commits)
  const latestCommit = _.first(commits)

  return {
    createdAt: formatDateString(firstCommit.date),
    updatedAt: formatDateString(latestCommit.date),
  }
}

const readAllContributorsRc = async () => {
  const rcPath = path.resolve("..", ".all-contributorsrc")
  const contributorsRcData = await fs.readFile(rcPath, "utf-8")
  const { contributors } = JSON.parse(contributorsRcData)
  return contributors
}

module.exports = {
  sortPostNodes,
  getRelativePagePath,
  getNodeContributors,
  getOrgMembers,
  readAllContributorsRc,
  getRelativePathHistoryDates,
}
