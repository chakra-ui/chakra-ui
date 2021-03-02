import { Dict } from "@chakra-ui/utils"
import sortMq from "sort-css-media-queries"

const pseudoOrder = [
  "&",
  "&:focus-within",
  "&:hover",
  "&[aria-invalid=true]",
  "&:focus",
  "&:focus-visible",
  "&:active",
  "&:disabled",
]

function getLastIndex<T>(
  arr: T[],
  predicate: (value: T, index: number, obj: T[]) => unknown,
) {
  const reversedIndex = arr.slice().reverse().findIndex(predicate)
  const lastIndex = arr.length - 1
  const index = reversedIndex < 0 ? reversedIndex : lastIndex - reversedIndex
  return index === -1 ? Number.MAX_SAFE_INTEGER : index
}

function byOrder([a]: [string, any], [b]: [string, any]) {
  const aIndex = getLastIndex(pseudoOrder, (key) => a.startsWith(key))
  const bIndex = getLastIndex(pseudoOrder, (key) => b.startsWith(key))
  return aIndex - bIndex
}

function sort(styles: Dict) {
  return Object.fromEntries(
    Object.entries(styles)
      .sort((a, b) => sortMq(a[0], b[0]))
      .sort(byOrder),
  )
}

export default sort
