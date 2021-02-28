import { Dict } from "@chakra-ui/utils"

const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
})

const cssOrder = ["&", "@media", "&:hover", "&:active", "&:focus"]

function findLastIndex<T>(
  haystack: T[],
  predicate: (value: T, index: number, obj: T[]) => unknown,
) {
  const reversedIndex = haystack.slice().reverse().findIndex(predicate)
  const maxIndex = haystack.length - 1
  return reversedIndex < 0 ? reversedIndex : maxIndex - reversedIndex
}

function byOrder([keyA]: [string, any], [keyB]: [string, any]) {
  const aSortIndex = findLastIndex(cssOrder, (key) => keyA.startsWith(key))
  const bSortIndex = findLastIndex(cssOrder, (key) => keyB.startsWith(key))
  const aOrder = aSortIndex === -1 ? Number.MAX_SAFE_INTEGER : aSortIndex
  const bOrder = bSortIndex === -1 ? Number.MAX_SAFE_INTEGER : bSortIndex

  const indexDiff = aOrder - bOrder
  if (indexDiff !== 0) return indexDiff
  return collator.compare(keyA, keyB)
}

function sort(styles: Dict) {
  return Object.fromEntries(Object.entries(styles).sort(byOrder))
}

export default sort
