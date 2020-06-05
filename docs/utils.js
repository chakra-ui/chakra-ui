const _ = require("lodash/fp")
const getFileContributors = require("file-contributors").default
require("isomorphic-fetch")

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

const getNodeContributors = async (node) => {
  const relativePath = getRelativePagePath(node.fileAbsolutePath)
  const fileContributors = await getFileContributors(
    "chakra-ui",
    "chakra-ui",
    relativePath,
  )
  const contributors = fileContributors.map(
    ({ login: name, avatar_url: image }) => ({ name, image }),
  )
  return contributors
}

module.exports = { sortPostNodes, getRelativePagePath, getNodeContributors }
