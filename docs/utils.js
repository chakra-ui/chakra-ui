const fs = require("fs").promises
const path = require("path")
const _ = require("lodash/fp")
const { Octokit } = require("@octokit/rest")

const octokit = new Octokit({
  auth: process.env.GITHUB_API_TOKEN,
})

const compareCollections = (
  { fields: { collection: a } },
  { fields: { collection: b } },
) => {
  // comparison when one or both are "main"
  if (a === "main" && b === "main") return 0
  if (a === "main" && b !== "main") return -1
  if (a !== "main" && b === "main") return 1

  // comparisons when neither are "main"
  if (a < b) return -1
  if (a > b) return 1
  return 0
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

const DOCS_REGEX = /\/docs\/pages\/.*/
const getRelativePagePath = (fileAbsolutePath) => {
  if (!fileAbsolutePath) return
  const match = fileAbsolutePath.match(DOCS_REGEX)
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
  readAllContributorsRc,
}
