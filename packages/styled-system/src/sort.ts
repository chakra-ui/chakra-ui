import { Dict } from "@chakra-ui/utils"

const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
})

const pseudoOrder = [
  "&",
  "@media",
  "&:focus-within",
  "&:hover",
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
  const diff = aIndex - bIndex
  if (diff !== 0) return diff
  return collator.compare(a, b)
}

function sort(styles: Dict) {
  return Object.fromEntries(Object.entries(styles).sort(byOrder))
}

export default sort
