const _ = require("lodash/fp")

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

module.exports.sortPostNodes = nodes => {
  const collections = groupByCollection(nodes)
  const sortedCollectionNodes = _.values(collections).map(orderByOrderThenTitle)
  const flattened = _.flatten(_.values(sortedCollectionNodes))
  const allSorted = flattened.sort(compareCollections)

  return allSorted
}
