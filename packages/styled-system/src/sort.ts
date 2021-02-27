import { Dict } from "@chakra-ui/utils"

const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
})

const cssOrder = ["@media", "&:hover", "&:active", "&:focus"]

function byOrder([keyA]: [string, any], [keyB]: [string, any]) {
  const aSortIndex = cssOrder.findIndex((key) => keyA.startsWith(key))
  const bSortIndex = cssOrder.findIndex((key) => keyB.startsWith(key))
  const aOrder = aSortIndex === -1 ? Infinity : aSortIndex
  const bOrder = bSortIndex === -1 ? Infinity : bSortIndex

  const indexDiff = aOrder - bOrder
  if (indexDiff !== 0) return indexDiff
  return collator.compare(keyA, keyB)
}

function sort(styles: Dict) {
  return Object.fromEntries(Object.entries(styles).sort(byOrder))
}

export default sort
