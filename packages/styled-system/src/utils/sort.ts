import { Dict } from "@chakra-ui/utils"

// String.prototype.localeCompare vs Intl.Collator.compare
// https://stackoverflow.com/a/52369951
const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
})

export const sort = (obj: Dict) => {
  const next: Dict = {}
  Object.keys(obj)
    .sort((a, b) => collator.compare(a, b))
    .forEach((key) => {
      next[key] = obj[key]
    })
  return next
}
