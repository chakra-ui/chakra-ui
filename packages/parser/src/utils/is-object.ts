import { isEmptyObject } from "@chakra-ui/utils"

/**
 * Check if a style object is not empty
 */
export function isNotEmpty(value: any): value is object {
  return value && !isEmptyObject(value)
}
