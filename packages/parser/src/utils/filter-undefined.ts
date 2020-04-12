import { Dict } from "@chakra-ui/utils"

export function filterUndefined(object: Dict) {
  const result = { ...object }
  for (const item in result) {
    if (typeof result[item] === "undefined") {
      delete result[item]
    }
  }
  return result
}
