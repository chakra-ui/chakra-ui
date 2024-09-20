import { type Dict, isObject } from "../utils"
import { sortAtParams } from "./sort-at-params"

type Query = string
type QueryValue = Dict

function sortQueries(queries: [Query, QueryValue][]): [Query, QueryValue][] {
  return queries.sort(([a], [b]) => sortAtParams(a, b))
}

export function sortAtRules(obj: Dict): Dict {
  const mediaQueries: [Query, QueryValue][] = []
  const containerQueries: [Query, QueryValue][] = []
  const rest: Dict = {}

  // Separate media queries, container queries, and other properties
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith("@media")) {
      mediaQueries.push([key, value])
    } else if (key.startsWith("@container")) {
      containerQueries.push([key, value])
    } else if (isObject(value)) {
      rest[key] = sortAtRules(value)
    } else {
      rest[key] = value
    }
  }

  // Sort queries
  const sortedMediaQueries = sortQueries(mediaQueries)
  const sortedContainerQueries = sortQueries(containerQueries)

  // Combine sorted queries with the rest of the properties
  return {
    ...rest,
    ...Object.fromEntries(sortedMediaQueries),
    ...Object.fromEntries(sortedContainerQueries),
  }
}
