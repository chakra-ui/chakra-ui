import { isString } from "@chakra-ui/utils/is"

/**
 * All html and svg elements for chakra components.
 * This is mostly for `chakra.<element>` syntax.
 */
export type DOMElements = keyof JSX.IntrinsicElements

export function isTag(target: any) {
  return (
    isString(target) &&
    (process.env.NODE_ENV !== "production"
      ? target.charAt(0) === target.charAt(0).toLowerCase()
      : true)
  )
}

export function getDisplayName(primitive: any) {
  return isTag(primitive) ? `chakra.${primitive}` : getComponentName(primitive)
}

function getComponentName(primitive: React.ComponentType | string) {
  return (
    (process.env.NODE_ENV !== "production"
      ? isString(primitive) && primitive
      : false) ||
    (!isString(primitive) && primitive.displayName) ||
    (!isString(primitive) && primitive.name) ||
    "ChakraComponent"
  )
}
