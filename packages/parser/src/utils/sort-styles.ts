import { Dict } from "@chakra-ui/utils"

export function sort(obj: Dict) {
  const next: Dict = {}
  Object.keys(obj)
    .sort((a, b) =>
      a.localeCompare(b, undefined, {
        numeric: true,
        sensitivity: "base",
      }),
    )
    .forEach(key => {
      next[key] = obj[key]
    })
  return next
}
