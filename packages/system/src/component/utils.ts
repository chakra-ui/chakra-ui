import { Dict, isEmptyObject } from "@chakra-ui/utils"
/**
 * Check if a theme key refers to a components
 * or sub-component
 */
export function isSubcomponent(themeKey: string) {
  return themeKey.split(".").length > 1
}

/**
 * Check if a style object is not empty
 */
export function isNotEmpty(value: any): value is object {
  return value && !isEmptyObject(value)
}

export function filterUndefined(object: Dict) {
  const result = { ...object }
  for (const item in result) {
    if (typeof result[item] === "undefined") {
      delete result[item]
    }
  }
  return result
}
